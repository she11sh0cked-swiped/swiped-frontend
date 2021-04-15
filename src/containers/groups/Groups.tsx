import { List, ListItem, ListItemText } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import { useMeQuery } from './api/user.generated'

type IProps = RouteComponentProps

const Groups: FC<IProps> = () => {
  const userResult = useMeQuery()

  const user = userResult.data?.user_findMe

  useEffect(() => {
    app.navigation = { left: { icon: ArrowBack, to: '/' } }
  }, [])

  if (userResult.loading) return <Loading />

  return (
    <List>
      {user?.groups.map((group) => (
        <ListItem
          button
          component={Link}
          key={group?._id}
          to={`/g/${group?._id ?? ''}`}
        >
          <ListItemText
            primary={group?.name}
            secondary={`${group?.members.length ?? ''} Members`}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default Groups
