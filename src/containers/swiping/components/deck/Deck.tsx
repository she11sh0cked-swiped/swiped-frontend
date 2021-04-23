import { Box } from '@material-ui/core'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { useDrag } from 'react-use-gesture'
import { FullGestureState } from 'react-use-gesture/dist/types'

import Loading from 'containers/loading/Loading'
import { Movie, Tv } from 'types/api.generated'
import getTMDBImage from 'utils/getTMDBImage'

import Card from '../card/Card'
import { useRecommendationsQuery, useUserVoteMutation } from './Deck.generated'
import useStyles from './Deck.styles'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  delay: i * 100,
  rot: -2 + Math.random() * 4,
  scale: 1,
  x: 0,
  y: 0,
})
const from = (_i: number) => ({
  rot: 0,
  scale: 1.5,
  x: 0,
  y: -window.innerHeight * 1.25,
})

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

type TDragState = Pick<
  FullGestureState<'drag'>,
  'args' | 'direction' | 'down' | 'movement' | 'velocity'
>

interface IGoneState {
  dir: -1 | 1
  visible: boolean
}

interface IRef {
  swipe: (dir: 'left' | 'right') => void
}

const Deck: ForwardRefRenderFunction<IRef> = (_, ref) => {
  const classes = useStyles()

  const [userVote, userVoteResult] = useUserVoteMutation()

  const recommendationsResult = useRecommendationsQuery({
    variables: { count: 10 },
  })

  const isLoading = useMemo(
    () => userVoteResult.loading || recommendationsResult.loading,
    [recommendationsResult.loading, userVoteResult.loading]
  )

  const cards = useMemo(
    () => recommendationsResult.data?.media_recommendations ?? [],
    [recommendationsResult.data?.media_recommendations]
  )

  const [gone, setGone] = useState<Record<number, IGoneState>>({}) // The set flags all the cards that are flicked out

  const nextIndex = useMemo(
    () => Math.min(...Object.keys(gone).map(Number), cards.length) - 1,
    [gone, cards.length]
  )

  // Create a bunch of springs using the helpers above
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  // Create a gesture handler, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const handleDrag = useCallback(
    ({
      args,
      down,
      movement: [mx],
      direction: [xDir],
      velocity,
    }: TDragState) => {
      const [i] = args as [number]

      if (gone[i] != null) return // We don't need to move a card that's already gone
      if (cards[i] == null) return // We also don't need to move a card if it doesn't exist

      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

      const isGone = !down && trigger

      if (isGone)
        setGone((prevGone) => {
          prevGone[i] = { dir, visible: true } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
          return { ...prevGone }
        })

      const x = isGone ? window.innerWidth * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.05 : 1 // Active cards lift up a bit

      // We're only interested in changing spring-data for the current spring
      void api.current[i]
        .start({
          config: {
            friction: 50,
            tension: down ? 800 : isGone ? 200 : 500,
          },
          delay: undefined,
          rot,
          scale,
          x,
          y: down ? 50 : 0,
        })
        .then(() => {
          if (!isGone) return

          setGone((prevGone) => {
            prevGone[i].visible = false
            return { ...prevGone }
          })
        })
    },
    [api, gone, cards]
  )

  const bind = useDrag(handleDrag)

  const handleUserVote = useCallback(() => {
    const votes = Object.keys(gone)
      .map(Number)
      .map((i) => ({
        like: gone[i].dir === 1,
        mediaId: { id: cards[i]?.id, media_type: cards[i]?.media_type },
      }))

    return userVote({ variables: { votes } })
  }, [cards, gone, userVote])

  useEffect(() => {
    if (recommendationsResult.loading || cards.length === 0) return

    const goneCardsN = Object.values(gone).filter((card) => !card.visible)
      .length

    if (goneCardsN < cards.length) return

    setGone({})
    api.start((i) => ({
      ...from(i),
      from: from(i),
    }))

    void handleUserVote().then(() =>
      recommendationsResult.refetch().then(() =>
        api.start((i) => ({
          ...to(i),
          from: from(i),
        }))
      )
    )
  }, [api, cards.length, gone, handleUserVote, recommendationsResult])

  const handleSwipe = useCallback<IRef['swipe']>(
    (dir) => {
      handleDrag({
        args: [nextIndex],
        direction: [dir === 'left' ? -1 : 1, 0],
        down: false,
        movement: [1000, 0],
        velocity: 1,
      })
    },
    [handleDrag, nextIndex]
  )

  useImperativeHandle(ref, () => ({ swipe: handleSwipe }))

  if (isLoading) return <Loading />

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <Box position="relative">
      {props.map(({ rot, scale, x, y }, i) => {
        const isVisible = gone[i]?.visible ?? true
        const card = cards[i]

        if (!isVisible || card == null) return

        const image = card.poster_path ?? ''
        const title = (card as Movie).title ?? (card as Tv).name ?? ''

        return (
          <animated.div className={classes.card} key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
            >
              <Card image={getTMDBImage(image, 'w780')} title={title} />
            </animated.div>
          </animated.div>
        )
      })}
    </Box>
  )
}

export type { IRef as IDeckRef }
export default forwardRef(Deck)
