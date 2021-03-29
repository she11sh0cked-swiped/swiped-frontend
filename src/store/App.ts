import { makeAutoObservable } from 'mobx'

import { INavigation } from 'app/components/navigation/Navigation'

class App {
  navigation: INavigation = {}

  constructor() {
    makeAutoObservable(this)
  }
}

const app = new App()

export default app
