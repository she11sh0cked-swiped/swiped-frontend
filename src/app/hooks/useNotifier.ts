import { autorun } from 'mobx'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import app from 'store/App'

export default function useNotifier(): void {
  const { enqueueSnackbar } = useSnackbar()

  const [displayed, setDisplayed] = useState<number[]>([])

  useEffect(() => {
    autorun(() => {
      app.notifications.forEach((notification) => {
        // Do nothing if snackbar is already displayed
        if (displayed.includes(notification.key)) return
        // Display snackbar using notistack
        enqueueSnackbar(notification.message, notification.options)
        // Keep track of snackbars that we've displayed
        setDisplayed((prevDisplayed) => [...prevDisplayed, notification.key])
        // Dispatch action to remove snackbar from mobx store
        app.removeSnackbar(notification.key)
      })
    })
  }, [displayed, enqueueSnackbar])
}
