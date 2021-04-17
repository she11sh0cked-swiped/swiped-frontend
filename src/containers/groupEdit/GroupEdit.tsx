import { TextField } from '@material-ui/core'
import { ArrowBack, Save } from '@material-ui/icons'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router-dom'

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

  const groupResult = useGroupQuery({
    onError: () => {
      history.replace('/404')
    },
    skip: isNew,
    variables: { id: groupId },
  })

  const [createGroup] = useCreateGroupMutation()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<MutationGroup_CreateOneArgs>()

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
      left: {
        icon: ArrowBack,
        to: isNew ? '/groups' : `/g/${groupId}`,
      },
      right: {
        icon: Save,
        onClick: handleSubmit(handleFormValid),
      },
    }
  }, [groupId, handleFormValid, handleSubmit, isNew])

  if (groupResult.loading) return <Loading />

  return (
    <form onSubmit={handleSubmit(handleFormValid)}>
      <TextField
        {...register('record.name')}
        autoFocus
        error={errors.record?.name != null}
        fullWidth
        helperText={errors.record?.name?.message}
        label="Gruppen Name"
        margin="normal"
        required
        size="small"
        variant="outlined"
      />
    </form>
  )
}

export default GroupEdit
