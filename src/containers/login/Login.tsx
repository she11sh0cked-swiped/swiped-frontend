import { FetchResult, gql, useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Link as MaterialLink,
  TextField,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { FC, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'

import { Mutation, MutationUser_LoginArgs } from 'types/api'

import useStyles from './Login.styles'

type TLoginData = Pick<Mutation, 'user_login'>

type IProps = RouteComponentProps

const Login: FC<IProps> = () => {
  const classes = useStyles()

  const history = useHistory()

  const { handleSubmit, register } = useForm<MutationUser_LoginArgs>()

  const [userLogin] = useMutation<TLoginData, MutationUser_LoginArgs>(
    gql`
      mutation($username: String!, $password: String!) {
        user_login(username: $username, password: $password) {
          token
        }
      }
    `
  )

  const handleLoginResponse = useCallback(
    ({ data }: FetchResult<TLoginData>) => {
      const token = data?.user_login?.token
      if (token == null) return
      sessionStorage.setItem('token', token)
      history.replace('/')
    },
    [history]
  )

  const handleForm = useMemo(
    () =>
      handleSubmit((data) => {
        void userLogin({ variables: data }).then(handleLoginResponse)
      }),
    [handleLoginResponse, handleSubmit, userLogin]
  )

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <form onSubmit={handleForm}>
        <TextField
          {...register('username')}
          margin="normal"
          fullWidth
          label="Username"
          required
          autoFocus
          autoComplete="email"
          size="small"
          variant="outlined"
        />
        <TextField
          {...register('password')}
          fullWidth
          margin="normal"
          label="Password"
          required
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
          Sign In
        </Button>
        <MaterialLink
          to="/register"
          component={Link}
          variant="body2"
          className={classes.register}
        >
          Don&apos;t have an account? Sign Up
        </MaterialLink>
      </form>
    </div>
  )
}

export default Login
