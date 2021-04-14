import { FetchResult, gql, useMutation } from '@apollo/client'
import { Avatar, Button, TextField } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { FC, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { Mutation, MutationUser_RegisterArgs } from 'types/api'

import useStyles from './Register.styles'

type TRegisterData = Pick<Mutation, 'user_register'>

type IProps = RouteComponentProps

const Register: FC<IProps> = () => {
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
          autoComplete="email"
          autoFocus
          fullWidth
          label="Username"
          margin="normal"
          required
          size="small"
          variant="outlined"
        />
        <TextField
          {...register('record.password')}
          autoComplete="current-password"
          fullWidth
          label="Password"
          margin="normal"
          required
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
          autoComplete="current-password"
          fullWidth
          label="Confirm Password"
          margin="normal"
          required
          size="small"
          type="password"
          variant="outlined"
        />
        <Button
          className={classes.submit}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register
