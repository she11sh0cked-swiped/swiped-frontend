import { IconButton, TextField } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import SubmitButton from 'components/submitButton/SubmitButton'
import Loading from 'containers/loading/Loading'
import app from 'store/App'
import { MutationGroup_CreateOneArgs } from 'types/api.generated'

import { useCreateGroupMutation, useGroupQuery } from './GroupEdit.generated'

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

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<MutationGroup_CreateOneArgs>()

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

  const handleFormValid = useCallback<
    SubmitHandler<MutationGroup_CreateOneArgs>
  >(
    (data) => {
      if (isNew)
        void createGroup({ variables: data }).then(({ data }) => {
          const groupId = data?.group_createOne?.recordId ?? ''
          history.replace(`/g/${groupId}`)
        })
    },
    [createGroup, history, isNew]
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
    <Center component="form" onSubmit={handleSubmit(handleFormValid)}>
      <Controller
        control={control}
        name="record.name"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            autoFocus
            error={error?.message != null}
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
      <SubmitButton loading={createGroupResult.loading}>Save</SubmitButton>
    </Center>
  )
}

export default GroupEdit
