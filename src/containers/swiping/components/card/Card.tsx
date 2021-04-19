import { CardActionArea, CardContent, Typography } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import { FC } from 'react'

import ImageCard from 'components/imageCard/ImageCard'

import useStyles from './Card.styles'

interface IProps {
  image: string
  title: string
}

const Card: FC<IProps> = ({ image, title }) => {
  const classes = useStyles()

  return (
    <ImageCard className={classes.root} image={image}>
      <CardActionArea>
        <CardContent>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <Info className={classes.info} />
        </CardContent>
      </CardActionArea>
    </ImageCard>
  )
}

export default Card
