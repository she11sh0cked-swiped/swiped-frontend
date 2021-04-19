import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { FC, useCallback, useMemo, useState } from 'react'

import LoadingButton from 'components/loadingButton/LoadingButton'
import useSharedStyles from 'utils/sharedStyles'

import { GroupQuery, UserQuery } from '../../Group.generated'
import {
  useJoinGroupMutation,
  useLeaveGroupMutation,
} from './JoinLeaveButton.generated'

interface IProps {
  group: GroupQuery['group_findById']
  user: UserQuery['user_findMe']
}

const JoinLeaveButton: FC<IProps> = ({ group, user }) => {
  const sharedClasses = useSharedStyles()

  const isMember = useMemo(
    () => group?.membersId?.includes(user?._id ?? '') ?? false,
    [group?.membersId, user?._id]
  )

  const [dialogOpen, setDialogOpen] = useState(false)

  const [joinGroup, joinGroupResult] = useJoinGroupMutation()
  const [leaveGroup, leaveGroupResult] = useLeaveGroupMutation()

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const handleDialogConfirm = useCallback(() => {
    void leaveGroup({ variables: { id: group?._id ?? '' } }).then(() => {
      handleDialogClose()
    })
  }, [group?._id, handleDialogClose, leaveGroup])

  const handleClick = useCallback(() => {
    if (isMember) setDialogOpen(true)
    else void joinGroup({ variables: { id: group?._id ?? '' } })
  }, [group?._id, isMember, joinGroup])

  return (
    <>
      <LoadingButton
        className={sharedClasses.rightAlign}
        color="primary"
        loading={joinGroupResult.loading}
        onClick={handleClick}
        variant="contained"
      >
        {isMember ? 'Leave' : 'Join'}
      </LoadingButton>
      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <DialogTitle>Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={leaveGroupResult.loading}
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <LoadingButton
            autoFocus
            color="primary"
            loading={leaveGroupResult.loading}
            onClick={handleDialogConfirm}
          >
            Leave
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default JoinLeaveButton
