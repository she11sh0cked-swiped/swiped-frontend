import { Card, CardProps, withStyles } from '@material-ui/core'
import { common } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { FC } from 'react'

interface IProps extends CardProps {
  image: string
}

const ImageCard: FC<IProps> = ({ image, ...props }) => (
  <Card
    {...props}
    style={{ backgroundImage: `url("${image}")`, ...props.style }}
  />
)

export default withStyles(() => ({
  root: {
    '& .MuiCardContent-root': {
      backgroundImage: `linear-gradient(0deg, ${fade(
        common.black,
        0.5
      )}, rgba(0,0,0,0))`,
      color: common.white,
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}))(ImageCard)
