import { Box, BoxProps } from '@material-ui/core'
import { FC } from 'react'

type IProps = BoxProps

const Center: FC<IProps> = (props) => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      {...props}
    />
  )
}

export default Center
