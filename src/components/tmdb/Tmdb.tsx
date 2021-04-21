import { Box, Typography } from '@material-ui/core'
import { FC } from 'react'

import { ReactComponent as Logo } from './tmdb-logo.svg'

const Tmdb: FC = () => (
  <Box
    bottom={0}
    left={0}
    margin="0 auto"
    paddingBottom={2}
    position="absolute"
    right={0}
    width="50%"
    zIndex={-1}
  >
    <Typography variant="overline">Powered By</Typography>
    <Logo />
  </Box>
)

export default Tmdb
