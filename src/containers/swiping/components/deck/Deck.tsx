import { CardActionArea, CardContent, Typography } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { animated, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import ImageCard from 'components/imageCard/ImageCard'
import * as mock from 'utils/mock'

import useStyles from './Deck.styles'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  delay: i * 100,
  rot: -2 + Math.random() * 4,
  scale: 1,
  x: 0,
  y: 0,
})
const from = () => ({
  rot: 0,
  scale: 1.5,
  x: -window.innerWidth + Math.random() * (window.innerWidth * 2), // This creates a shuffle-like animation
  y: -window.innerHeight * 2,
})

interface IControls {
  dislike: () => void
  like: () => void
}

interface IProps {
  registerControls(controls: IControls): void
}

interface ICard {
  data: IMovie
  i: number
  like?: boolean
  visible: boolean
}

const Deck: FC<IProps> = ({ registerControls }) => {
  const classes = useStyles()

  const [movies, setMovies] = useState(mock.movies())
  const [cards, setCards] = useState<ICard[]>([])

  useEffect(() => {
    setCards(movies.map((movie, i) => ({ data: movie, i, visible: true })))
  }, [movies])

  const currentCard = useMemo(
    () =>
      cards
        .slice()
        .reverse()
        .find((card) => card.like == null),
    [cards]
  )

  // Create a bunch of springs using the helpers above
  const [props, refs] = useSprings(
    cards.length,
    (i) => ({
      ...to(i),
      from: from(),
    }),
    [movies]
  )

  const currentRef = currentCard != null ? refs.current[currentCard.i] : null

  const handleVote = useCallback(
    (like: boolean, animation: Partial<{ rot: number }> = {}) => {
      if (currentCard == null || currentRef == null) {
        refs.stop()
        return
      }

      const dir = like ? 1 : -1
      animation.rot = animation.rot ?? 10 * dir

      void currentRef
        .start({
          config: {
            friction: 50,
            tension: 200,
          },
          delay: undefined,
          rot: animation.rot,
          scale: 1.1,
          x: (200 + window.innerWidth) * dir,
        })
        .then(() => {
          setCards((prevCards) => {
            prevCards[currentCard.i].visible = false
            return prevCards.slice()
          })
        })

      setCards((prevCards) => {
        prevCards[currentCard.i].like = like
        return prevCards.slice()
      })
    },
    [currentCard, currentRef, refs]
  )

  const handleSendVote = useCallback(() => {
    const vote = {
      votes: cards.map((card) => ({
        like: card.like,
        movieId: card.data.id,
      })),
    }

    return new Promise<void>((resolve) => {
      console.log(vote)
      resolve()
    })
  }, [cards])

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ down, movement: [xMove, yMove], direction: [xDir], velocity }) => {
      if (currentCard == null || currentRef == null) return

      const trigger = !down && velocity > 0.2 // If you flick hard enough and the finger is up it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      if (trigger) {
        handleVote(dir === 1, {
          rot: dir * 10 * velocity, // How much the card tilts, flicking it harder makes it rotate faster
        })
      } else {
        void currentRef.start({
          config: {
            friction: 50,
            tension: down ? 800 : 500,
          },
          delay: undefined,
          rot: xMove / 100,
          scale: down ? 1.1 : 1, // Active cards lift up a bit
          x: down ? xMove : 0,
          y: down ? yMove / 50 : 0, // Go back to zero if finger's up
        })
      }
    },
    { useTouch: true }
  )

  useEffect(() => {
    registerControls({
      dislike: () => handleVote(false),
      like: () => handleVote(true),
    })
  }, [handleVote, registerControls])

  useEffect(() => {
    if (cards.length <= 0 || cards.some((card) => card.visible)) return

    console.log('vote time')
    void handleSendVote().then(() => {
      console.log('refill time')
      refs.current.forEach((ref) => ref.set(from()))
      setMovies(mock.movies())
    })
  }, [cards, handleSendVote, refs])

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className={classes.root}>
      {props.map(({ rot, scale, x, y }, i) => {
        const card = cards[i]

        return (
          card.visible && (
            <animated.div key={i} style={{ x, y }}>
              {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
              <animated.div
                {...(card.i === currentCard?.i ? bind() : {})} // We're only interested in changing spring-data for the current spring
                style={{ rotateZ: rot, scale }}
              >
                <ImageCard image={card.data.image} className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {card.data.title}
                      </Typography>
                      <Info className={classes.info} />
                    </CardContent>
                  </CardActionArea>
                </ImageCard>
              </animated.div>
            </animated.div>
          )
        )
      })}
    </div>
  )
}

export type { IProps as IDeck, IControls as IDeckControls }
export default Deck
