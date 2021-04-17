import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

import List from './components/list/List'

type IProps = RouteComponentProps<{ groupId: string }>

const Group: FC<IProps> = ({
  match: {
    params: { groupId },
  },
}) => {
  useEffect(() => {
    app.navigation = {
      left: {
        icon: ArrowBack,
        to: '/groups',
      },
      right: {
        icon: Edit,
        to: `/g/${groupId}/edit`,
      },
    }
  }, [groupId])

  return (
    <div>
      <List groupId={groupId} />
    </div>
  )
}

export default Group
