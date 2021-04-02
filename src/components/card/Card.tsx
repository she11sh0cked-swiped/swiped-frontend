import {
  Card as MaterialCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { FC } from 'react'

import useStyles from './Card.styles'

interface IProps {
  image: string
  title: string
}

const Card: FC<IProps> = ({ children, image, title }) => {
  const classes = useStyles()

  return (
    <MaterialCard className={classes.root} raised>
      <CardActionArea>
        <CardMedia image={image} />
        <CardContent className={classes.content}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          {children}
        </CardContent>
      </CardActionArea>
    </MaterialCard>
  )
}

export type { IProps as ICard }
export default Card
