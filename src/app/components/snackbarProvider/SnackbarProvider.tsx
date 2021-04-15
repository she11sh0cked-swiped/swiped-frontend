import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { autorun } from 'mobx'
import { SnackbarKey, SnackbarProvider as Snackbar } from 'notistack'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useRef } from 'react'
import { useEffect } from 'react'

import app from 'store/App'

const Notifier: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const displayed: number[] = []

    autorun(() => {
      app.notifications.forEach((notification) => {
        // Do nothing if snackbar is already displayed
        if (displayed.includes(notification.key)) return
        // Display snackbar using notistack
        enqueueSnackbar(notification.message, notification.options)
        // Keep track of snackbars that we've displayed
        displayed.push(notification.key)
        // Dispatch action to remove snackbar from mobx store
        app.removeSnackbar(notification.key)
      })
    })
  }, [enqueueSnackbar])

  return null
}

const SnackbarProvider: FC = ({ children }) => {
  const snackbarRef = useRef<Snackbar>(null)

  const handleClose = useCallback(
    (key: SnackbarKey) => () => snackbarRef.current?.closeSnackbar(key),
    []
  )

  return (
    <Snackbar
      action={(key) => (
        <IconButton color="inherit" onClick={handleClose(key)} size="small">
          <Close fontSize="small" />
        </IconButton>
      )}
      maxSnack={3}
      ref={snackbarRef}
    >
      <Notifier />
      {children}
    </Snackbar>
  )
}

export default SnackbarProvider
