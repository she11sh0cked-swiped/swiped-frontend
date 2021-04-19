import {
  CardActionArea,
  CardContent,
  List as MaterialList,
  ListItem,
  Typography,
  withStyles,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Favorite } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import { FC, useMemo, useState } from 'react'

import ImageCard from 'components/imageCard/ImageCard'
import * as mock from 'utils/mock'
import styledBy from 'utils/styledBy'

import useStyles from './List.styles'

const StyledRating = withStyles({
  iconFilled: {
    color: styledBy('color', {
      default: undefined,
      red: red[400],
    }),
  },
})(Rating)

interface IProps {
  groupId: string
}

const List: FC<IProps> = () => {
  const classes = useStyles()

  const [movies] = useState(mock.movies())

  const matches = useMemo(
    () =>
      movies
        .map((data) => ({
          data,
          likes: Math.floor(2 + Math.random() * 9),
        }))
        .sort((a, b) => b.likes - a.likes),
    [movies]
  )

  return (
    <MaterialList>
      {matches.map((match) => {
        const rating = (match.likes / 10) * 5

        return (
          <ListItem disableGutters key={match.data.id}>
            <ImageCard className={classes.card} image={match.data.image}>
              <CardActionArea>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {match.data.title}
                  </Typography>
                  <div className={classes.rating}>
                    <StyledRating
                      color={rating < 5 ? 'red' : 'default'}
                      icon={<Favorite fontSize="inherit" />}
                      precision={0.1}
                      readOnly
                      value={rating}
                    />
                    <Typography>{match.likes} likes</Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </ImageCard>
          </ListItem>
        )
      })}
    </MaterialList>
  )
}

export default List
