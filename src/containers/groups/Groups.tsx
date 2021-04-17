import { List, ListItem, ListItemText } from '@material-ui/core'
import { Add, ArrowBack } from '@material-ui/icons'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import { useUserQuery } from './Groups.generated'

type IProps = RouteComponentProps

const Groups: FC<IProps> = () => {
  const userResult = useUserQuery()

  const user = userResult.data?.user_findMe

  useEffect(() => {
    app.navigation = {
      left: { icon: ArrowBack, to: '/' },
      right: { icon: Add, to: '/g/new' },
    }
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
