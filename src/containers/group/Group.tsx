import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import List from './components/list/List'
import { useGroupQuery } from './Group.generated'

type IProps = RouteComponentProps<{ groupId: string }>

const Group: FC<IProps> = ({
  history,
  match: {
    params: { groupId },
  },
}) => {
  const groupResult = useGroupQuery({
    onError: () => {
      history.replace('/404')
    },
    variables: { id: groupId },
  })

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

  if (groupResult.loading) return <Loading />

  return (
    <div>
      <List groupId={groupId} />
    </div>
  )
}

export default Group
