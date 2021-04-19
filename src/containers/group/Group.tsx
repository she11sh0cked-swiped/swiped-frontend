import { Box, IconButton, Typography } from '@material-ui/core'
import { Add, ArrowBack, Edit } from '@material-ui/icons'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import List from './components/list/List'
import {
  useGroupQuery,
  useJoinGroupMutation,
  useUserQuery,
} from './Group.generated'

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

  const [joinGroup] = useJoinGroupMutation()

  const handleJoinGroup = useCallback(() => {
    if (user == null) return
    void joinGroup({ variables: { id: groupId } })
  }, [groupId, joinGroup, user])

  useEffect(() => {
    let Right

    if (isMember)
      Right = (
        <IconButton component={Link} to={`/g/${groupId}/edit`}>
          <Edit />
        </IconButton>
      )
    else if (!isLoading)
      Right = (
        <IconButton onClick={handleJoinGroup}>
          <Add />
        </IconButton>
      )

    app.navigation = {
      Left: (
        <IconButton component={Link} to="/groups">
          <ArrowBack />
        </IconButton>
      ),
      Right,
    }
  }, [groupId, handleJoinGroup, isLoading, isMember])

  if (isLoading) return <Loading />

  return (
    <Box>
      <Typography variant="h4">{group?.name}</Typography>
      <List groupId={groupId} />
    </Box>
  )
}

export default Group
