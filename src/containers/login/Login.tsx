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
          {...register('password')}
          autoComplete="current-password"
          fullWidth
          label="Password"
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
          Sign In
        </Button>
        <MaterialLink
          className={classes.register}
          component={Link}
          to="/register"
          variant="body2"
        >
          Don&apos;t have an account? Sign Up
        </MaterialLink>
      </form>
    </div>
  )
}

export default Login
