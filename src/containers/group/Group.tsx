import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'
import useSharedStyles from 'utils/sharedStyles'

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
  const sharedClasses = useSharedStyles()

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

  const isOwner = useMemo(() => group?.ownerId === user?._id, [
    group?.ownerId,
    user?._id,
  ])

  const isMember = useMemo(
    () => group?.membersId?.includes(user?._id ?? '') ?? false,
    [group?.membersId, user?._id]
  )

  const [joinGroup] = useJoinGroupMutation()

  const handleClick = useCallback(() => {
    if (!isMember) void joinGroup({ variables: { id: groupId } })
  }, [groupId, isMember, joinGroup])

  useEffect(() => {
    app.navigation = {
      Left: (
        <IconButton component={Link} to="/groups">
          <ArrowBack />
        </IconButton>
      ),
      Right: isOwner ? (
        <IconButton component={Link} to={`/g/${groupId}/edit`}>
          <Edit />
        </IconButton>
      ) : undefined,
    }
  }, [groupId, isOwner])

  if (isLoading) return <Loading />

  return (
    <Box>
      <Grid container>
        <Typography variant="h4">{group?.name}</Typography>
        <Button
          className={sharedClasses.rightAlign}
          color="primary"
          onClick={handleClick}
          variant="contained"
        >
          {isMember ? 'Leave' : 'Join'}
        </Button>
      </Grid>
      <List groupId={groupId} />
    </Box>
  )
}

export default Group
