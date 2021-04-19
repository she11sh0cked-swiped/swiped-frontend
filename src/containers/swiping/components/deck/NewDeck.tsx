import { Box } from '@material-ui/core'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { FC, useCallback, useEffect, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { FullGestureState } from 'react-use-gesture/dist/types'

import { movies } from 'utils/mock'

import Card from '../card/Card'
import useStyles from './NewDeck.styles'

const cards = movies()

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

interface IDeckControls {
  dislike: () => void
  like: () => void
}

interface IProps {
  registerControls(controls: IDeckControls): void
}

const Deck: FC<IProps> = ({ registerControls }) => {
  const classes = useStyles()

  const [gone, setGone] = useState<Record<number, IGoneState>>({}) // The set flags all the cards that are flicked out

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
      const [index] = args as [number]

      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

      const isGone = !down && trigger

      if (isGone)
        setGone((prevGone) => ({
          ...prevGone,
          [index]: { dir, visible: true },
        })) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit

      // We're only interested in changing spring-data for the current spring
      void api.current[index]
        .start({
          config: {
            friction: 50,
            tension: down ? 800 : isGone ? 200 : 500,
          },
          delay: undefined,
          rot,
          scale,
          x,
        })
        .then(() => {
          if (!isGone) return

          setGone((prevGone) => ({
            ...prevGone,
            [index]: { dir, visible: false },
          }))
        })
    },
    [api]
  )

  const bind = useDrag(handleDrag)

  useEffect(() => {
    const goneCardsN = Object.values(gone).filter((card) => !card.visible)
      .length

    if (goneCardsN === cards.length)
      setTimeout(() => {
        setGone({})
        api.start((i) => to(i))
      }, 600)
  }, [api, gone])

  useEffect(() => {
    const commonDragState = {
      args: [0],
      down: false,
      movement: [1000, 0],
      velocity: 1,
    } as TDragState

    registerControls({
      dislike: () => handleDrag({ ...commonDragState, direction: [-1, 0] }),
      like: () => handleDrag({ ...commonDragState, direction: [1, 0] }),
    })
  }, [handleDrag, registerControls])

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <Box position="relative">
      {props.map(({ rot, scale, x, y }, i) => {
        if (!(gone[i]?.visible ?? true)) return

        return (
          <animated.div className={classes.card} key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
            >
              <Card {...cards[i]} />
            </animated.div>
          </animated.div>
        )
      })}
    </Box>
  )
}

export type { IDeckControls }
export default Deck
