import { IconButton, TextField } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import SubmitButton from 'components/submitButton/SubmitButton'
import Loading from 'containers/loading/Loading'
import app from 'store/App'

import {
  CreateGroupMutationVariables,
  UpdateGroupMutationVariables,
  useCreateGroupMutation,
  useGroupQuery,
  useUpdateGroupMutation,
} from './GroupEdit.generated'

type IProps = RouteComponentProps<{ groupId: string }>

const GroupEdit: FC<IProps> = ({
  history,
  location: { pathname },
  match: {
    params: { groupId },
  },
}) => {
  const isNew = useMemo(() => pathname === '/g/new', [pathname])

  const [createGroup, createGroupResult] = useCreateGroupMutation()
  const [updateGroup, updateGroupResult] = useUpdateGroupMutation()

  const { control, handleSubmit, setValue } = useForm<
    CreateGroupMutationVariables & UpdateGroupMutationVariables
  >({ defaultValues: { id: groupId } })

  const groupResult = useGroupQuery({
    onCompleted: (data) => {
      const group = data?.group_findById
      setValue('record.name', group?.name ?? '')
    },
    onError: () => {
      history.replace('/404')
    },
    skip: isNew,
    variables: { id: groupId },
  })

  const handleFormSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        if (isNew)
          void createGroup({ variables: { record: data.record } }).then(
            ({ data }) => {
              const groupId = data?.group_createOne?.recordId ?? ''
              history.replace(`/g/${groupId}`)
            }
          )
        else
          void updateGroup({ variables: data }).then(() => {
            history.replace(`/g/${groupId}`)
          })
      }),
    [createGroup, groupId, handleSubmit, history, isNew, updateGroup]
  )

  useEffect(() => {
    app.navigation = {
      Left: (
        <IconButton component={Link} to={isNew ? '/groups' : `/g/${groupId}`}>
          <ArrowBack />
        </IconButton>
      ),
    }
  }, [groupId, isNew])

  if (groupResult.loading) return <Loading />

  return (
    <Center component="form" onSubmit={handleFormSubmit}>
      <Controller
        control={control}
        name="record.name"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            autoFocus
            error={error != null}
            fullWidth
            helperText={error?.message}
            label="Gruppen Name"
            margin="normal"
            required
            size="small"
            variant="outlined"
            {...field}
            ref={ref}
          />
        )}
      />
      <SubmitButton
        loading={createGroupResult.loading || updateGroupResult.loading}
      >
        Save
      </SubmitButton>
    </Center>
  )
}

export default GroupEdit
