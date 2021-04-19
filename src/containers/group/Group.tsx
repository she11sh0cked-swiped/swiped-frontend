import { Box, Typography } from '@material-ui/core'
import { Add, ArrowBack, Edit } from '@material-ui/icons'
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

  const isMember = useMemo(
    () => group?.membersId?.includes(user?._id ?? '') ?? false,
    [group?.membersId, user?._id]
  )

  useEffect(() => {
    app.navigation = {
      left: {
        icon: ArrowBack,
        to: '/groups',
      },
      right: isMember
        ? {
            icon: Edit,
            to: `/g/${groupId}/edit`,
          }
        : {
            icon: Add,
            onClick: () => {
              console.log('join!')
            },
          },
    }
  }, [groupId, isMember])

  if (isLoading) return <Loading />

  return (
    <Box>
      <Typography variant="h4">{group?.name}</Typography>
      <List groupId={groupId} />
    </Box>
  )
}

export default Group
