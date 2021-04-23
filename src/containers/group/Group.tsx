import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import JoinLeaveButton from './components/joinLeaveButton/JoinLeaveButton'
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

  const isOwner = useMemo(() => group?.ownerId === user?._id, [
    group?.ownerId,
    user?._id,
  ])

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
        <JoinLeaveButton group={group} user={user} />
      </Grid>
      <List
        matches={group?.matches ?? []}
        membersCount={group?.membersId?.length ?? 0}
      />
    </Box>
  )
}

export default Group
