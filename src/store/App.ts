import { makeAutoObservable } from 'mobx'
import { OptionsObject, SnackbarMessage } from 'notistack'

import { INavigation } from 'app/components/navigation/Navigation'

interface INotification {
  key: number
  message: SnackbarMessage
  options?: OptionsObject
}

class App {
  navigation: INavigation = {}
  notifications: INotification[] = []

  enqueueSnackbar(
    message: INotification['message'],
    options?: INotification['options']
  ) {
    this.notifications.push({
      key: new Date().getTime() + Math.random(),
      message,
      options,
    })
  }

  removeSnackbar(key: INotification['key']) {
    this.notifications = this.notifications.filter(
      (notification) => notification.key !== key
    )
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const app = new App()

export default app
