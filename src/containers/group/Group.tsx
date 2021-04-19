import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ArrowBack, Edit } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'
import useSharedStyles from 'utils/sharedStyles'

import List from './components/list/List'
import { useGroupQuery, useUserQuery } from './Group.generated'

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

  const isOwner = useMemo(
    () => (isLoading ? false : group?.ownerId === user?._id),
    [group?.ownerId, isLoading, user?._id]
  )

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
    <Box>
      <Grid container item justify="space-between">
        <Typography variant="h4">{group?.name}</Typography>
        <Button
          className={sharedClasses.rightAlign}
          color="primary"
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
