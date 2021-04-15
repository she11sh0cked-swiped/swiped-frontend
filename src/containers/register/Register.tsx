import { FetchResult, gql, useMutation } from '@apollo/client'
import { Avatar, Button, TextField } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { FC, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { Mutation, MutationUser_RegisterArgs } from 'types/api'

import useStyles from './Register.styles'

type TRegisterData = Pick<Mutation, 'user_register'>

type TFields = MutationUser_RegisterArgs & { confirmPassword: string }

type IProps = RouteComponentProps

const Register: FC<IProps> = ({ history }) => {
  const classes = useStyles()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<TFields>()

  const [userRegister] = useMutation<TRegisterData, MutationUser_RegisterArgs>(
    gql`
      mutation($username: String!, $password: String!) {
        user_register(username: $username, password: $password) {
          token
        }
      }
    `
  )

  const handleRegisterResponse = useCallback(
    ({ data }: FetchResult<TRegisterData>) => {
      const token = data?.user_register?.token as string
      if (token == null) return
      sessionStorage.setItem('token', token)
      history.replace('/')
    },
    [history]
  )

  const handleFormValid = useCallback<SubmitHandler<TFields>>(
    (data) => {
      void userRegister({ variables: data }).then(handleRegisterResponse)
    },
    [handleRegisterResponse, userRegister]
  )

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <form onSubmit={handleSubmit(handleFormValid)}>
        <TextField
          {...register('username')}
          autoComplete="username"
          autoFocus
          error={errors.username != null}
          fullWidth
          helperText={errors.username?.message}
          label="Username"
          margin="normal"
          required
          size="small"
          variant="outlined"
        />
        <TextField
          {...register('password')}
          autoComplete="new-password"
          error={errors.password != null}
          fullWidth
          helperText={errors.password?.message}
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
              value === getValues('password') || 'The passwords do not match',
          })}
          autoComplete="new-password"
          error={errors.confirmPassword != null}
          fullWidth
          helperText={errors.confirmPassword?.message}
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
