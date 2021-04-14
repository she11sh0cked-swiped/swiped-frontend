import { Box, CircularProgress } from '@material-ui/core'
import { FC } from 'react'

const Loading: FC = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      minHeight="100%"
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
