import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import List from './components/list/List'
import { useGroupQuery, useUserQuery } from './Group.generated'

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

  const userResult = useUserQuery()

  const group = groupResult.data?.group_findById
  const user = userResult.data?.user_findMe

  const isLoading = useMemo(() => groupResult.loading || userResult.loading, [
    groupResult.loading,
    userResult.loading,
  ])

  const isOwner = useMemo(
    () => (isLoading ? false : group?.ownerId === user?._id),
    [group?.ownerId, isLoading, user?._id]
  )

  useEffect(() => {
    app.navigation = {
      left: {
        icon: ArrowBack,
        to: '/groups',
      },
      right: isOwner
        ? {
            icon: Edit,
            to: `/g/${groupId}/edit`,
          }
        : undefined,
    }
  }, [groupId, isOwner])

  if (isLoading) return <Loading />

  return (
    <div>
      <List groupId={groupId} />
    </div>
  )
}

export default Group
