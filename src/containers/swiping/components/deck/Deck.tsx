import { FC, useCallback, useEffect } from 'react'
import { animated, useSprings } from 'react-spring'
import { GestureState, useGesture } from 'react-with-gesture'

import { movies } from 'utils/mock'

import Card from '../card/Card'
import useStyles from './Deck.styles'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  delay: i * 100,
  rot: -2 + Math.random() * 4,
  scale: 1,
  x: 0,
  y: i, //* -2,
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

  // Create a bunch of springs using the helpers above
  const [props, refs] = useSprings(movies.length, (i) => ({
    ...to(i),
    from: from(),
  }))

  const handleVote = useCallback(
    (like: boolean, animation: Partial<{ rot: number }> = {}) => {
      console.log(like ? 'like' : 'dislike')

      const dir = like ? 1 : -1
      animation.rot = animation.rot ?? 10 * dir

      void refs.current[refs.current.length - 1]
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
          console.log('left')
        })
    },
    [refs]
  )

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity,
    }: Omit<GestureState, 'args'> & { args: [number] }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const out = !down && trigger // If finger's up and trigger velocity is reached, we flag the card ready to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

      if (out) {
        handleVote(dir === 1, {
          rot: dir * 10 * velocity, // How much the card tilts, flicking it harder makes it rotate faster
        })
      } else {
        // We're only interested in changing spring-data for the current spring
        void refs.current[index].start({
          config: {
            friction: 50,
            tension: down ? 800 : 500,
          },
          delay: undefined,
          rot: xDelta / 100,
          scale: down ? 1.1 : 1, // Active cards lift up a bit
          x: down ? xDelta : 0, // Go back to zero if finger's up
        })
      }
    }
  )

  useEffect(() => {
    registerControls({
      dislike: () => handleVote(false),
      like: () => handleVote(true),
    })
  }, [handleVote, registerControls])

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className={classes.root}>
      {props.map(({ rot, scale, x, y }, i) => {
        return (
          <animated.div key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...bind(i)} style={{ rotateZ: rot, scale }}>
              <Card key={movies[i].id} {...movies[i]} />
            </animated.div>
          </animated.div>
        )
      })}
    </div>
  )
}

export type { IProps as IDeck, IControls as IDeckControls }
export default Deck
