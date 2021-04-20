import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'

import app from 'store/App'

const history = syncHistoryWithStore(createBrowserHistory(), app.router)

export default history
