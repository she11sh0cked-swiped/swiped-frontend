import { FetchResult, gql, useMutation } from '@apollo/client'
import { Avatar, Button, TextField } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { FC, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Mutation, MutationUser_RegisterArgs } from 'types/api'

import useStyles from './Register.styles'

type TRegisterData = Pick<Mutation, 'user_register'>

const Register: FC = () => {
  const classes = useStyles()

  const { getValues, handleSubmit, register } = useForm<
    MutationUser_RegisterArgs & { confirmPassword: string }
  >()

  const [userRegister] = useMutation<TRegisterData, MutationUser_RegisterArgs>(
    gql`
      mutation($record: CreateOneuserInput!) {
        user_register(record: $record) {
          recordId
        }
      }
    `
  )

  const handleRegisterResponse = useCallback(
    ({ data }: FetchResult<TRegisterData>) => {
      //TODO login after (required api change)
      console.log(data)
    },
    []
  )

  const handleForm = useMemo(
    () =>
      handleSubmit((data) => {
        void userRegister({ variables: { record: data.record } }).then(
          handleRegisterResponse
        )
      }),
    [handleRegisterResponse, handleSubmit, userRegister]
  )

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <form onSubmit={handleForm}>
        <TextField
          {...register('record.username')}
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          required
          autoComplete="email"
          size="small"
          variant="outlined"
        />
        <TextField
          {...register('record.password')}
          fullWidth
          margin="normal"
          required
          label="Password"
          autoComplete="current-password"
          size="small"
          type="password"
          variant="outlined"
        />
        <TextField
          {...register('confirmPassword', {
            validate: (value) =>
              value === getValues('record.password') ||
              'The passwords do not match',
          })}
          fullWidth
          required
          margin="normal"
          label="Confirm Password"
          autoComplete="current-password"
          size="small"
          type="password"
          variant="outlined"
        />
        <Button
          className={classes.submit}
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register
