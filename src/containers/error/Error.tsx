import { Button, Divider, Grid, Hidden, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { FC, useCallback, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import app from 'store/App'

import useStyles from './Error.styles'

type IProps = RouteComponentProps

const errorMap: Record<string, string> = {
  '404': "The page you're looking for was not found.",
}

function getErrorMessage(pathname: string) {
  return errorMap[pathname]
}

const Error: FC<IProps> = ({ history, location: { pathname } }) => {
  const classes = useStyles()

  const errorCode = pathname.slice(1)
  const errorMessage = getErrorMessage(errorCode)

  const handleGoBack = useCallback(() => {
    const canGoBack = history.length > 2
    if (canGoBack) history.goBack()
    else history.push('/')
  }, [history])

  useEffect(() => {
    app.navigation = {}
  }, [])

  return (
    <Center>
      <Grid alignItems="center" container spacing={4}>
        <Grid item>
          <Typography variant="h1">{errorCode}</Typography>
        </Grid>
        <Hidden only="xs">
          <Divider flexItem orientation="vertical" />
        </Hidden>
        <Grid item>
          <Typography variant="h3">Sorry!</Typography>
          <Typography variant="body1">{errorMessage}</Typography>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleGoBack}
            startIcon={<ArrowBack />}
            variant="contained"
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Center>
  )
}

export default Error
