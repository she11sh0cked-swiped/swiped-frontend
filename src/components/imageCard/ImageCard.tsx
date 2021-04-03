import { Card, CardProps } from '@material-ui/core'
import { FC } from 'react'

import useStyles from './ImageCard.styles'

interface IProps extends CardProps {
  image: string
}

const ImageCard: FC<IProps> = ({ image, ...props }) => {
  const classes = useStyles()

  return (
    <Card
      {...props}
      classes={classes}
      style={{ ...props.style, backgroundImage: `url("${image}")` }}
    />
  )
}

export default ImageCard
