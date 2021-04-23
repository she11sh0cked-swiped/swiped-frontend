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
import { FC } from 'react'

import ImageCard from 'components/imageCard/ImageCard'
import { Group, Movie, Tv } from 'types/api.generated'
import getTMDBImage from 'utils/getTMDBImage'
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
  matches: Group['matches']
  membersCount: number
}

const List: FC<IProps> = ({ matches, membersCount }) => {
  const classes = useStyles()

  return (
    <MaterialList>
      {matches.map((match) => {
        const rating = ((match.count ?? 1) / membersCount) * 5

        const image = match.media.backdrop_path ?? match.media.poster_path ?? ''
        const title =
          (match.media as Movie).title ?? (match.media as Tv).name ?? ''

        return (
          <ListItem disableGutters key={match.media.id}>
            <ImageCard
              className={classes.card}
              image={getTMDBImage(image, 'w780')}
            >
              <CardActionArea>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {title}
                  </Typography>
                  <div className={classes.rating}>
                    <StyledRating
                      color={rating < 5 ? 'red' : 'default'}
                      icon={<Favorite fontSize="inherit" />}
                      precision={0.1}
                      readOnly
                      value={rating}
                    />
                    <Typography>{match.count} likes</Typography>
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
