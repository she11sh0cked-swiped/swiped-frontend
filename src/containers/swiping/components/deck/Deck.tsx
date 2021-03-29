import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { animated, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import * as mock from 'utils/mock'

import Card from '../card/Card'
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
  like: () => void
  dislike: () => void
}

interface IProps {
  groupId: string
  registerControls(controls: IControls): void
}

const Deck: FC<IProps> = ({ registerControls }) => {
  const classes = useStyles()

  const [cards, setCards] = useState(mock.movies())
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1)

  // Create a bunch of springs using the helpers above
  const [props, refs] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(),
  }))

  const currentRef = useMemo(
    () => refs.current[currentIndex],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refs.current[currentIndex]]
  )

  const handleVote = useCallback(
    (like: boolean, animation: Partial<{ rot: number }> = {}) => {
      if (currentIndex < 0) {
        refs.stop()
        return
      }

      console.log(like ? '+' : '-', currentIndex)

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
            console.log('x', prevCards.length - 1)
            return prevCards.slice(0, -1)
          })
        })

      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex - 1)
    },
    [currentIndex, currentRef, refs]
  )

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [xMove, yMove],
      direction: [xDir],
      velocity,
    }) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== currentIndex) return

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

          scale: down ? 1.1 : 1,
          // Active cards lift up a bit
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
    if (cards.length === 0) {
      console.log('refill time')

      const movies = mock.movies()

      setCards(movies)
      setCurrentIndex(movies.length - 1)
    }
  }, [cards.length])

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className={classes.root}>
      {props.map(({ rot, scale, x, y }, i) => {
        return (
          <animated.div key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...bind(i)} style={{ rotateZ: rot, scale }}>
              <Card key={cards[i].id} {...cards[i]} />
            </animated.div>
          </animated.div>
        )
      })}
    </div>
  )
}

export type { IProps as IDeck, IControls as IDeckControls }
export default Deck
