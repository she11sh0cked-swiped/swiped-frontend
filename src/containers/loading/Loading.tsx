import { Box, CircularProgress } from '@material-ui/core'
import { FC } from 'react'

const Loading: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
