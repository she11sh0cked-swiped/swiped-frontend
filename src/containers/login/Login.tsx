import { Button, Link as MaterialLink, TextField } from '@material-ui/core'
import { FC, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import app from 'store/App'
import { MutationUser_LoginArgs } from 'types/api.generated'

import { useLoginMutation } from './Login.generated'
import useStyles from './Login.styles'

type IProps = RouteComponentProps

const Login: FC<IProps> = ({ history }) => {
  const classes = useStyles()

  const [login] = useLoginMutation()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<MutationUser_LoginArgs>()

  const handleFormValid = useCallback<SubmitHandler<MutationUser_LoginArgs>>(
    (data) => {
      void login({ variables: data }).then(({ data }) => {
        const token = data?.user_login?.token
        if (token == null) return
        localStorage.setItem('token', token)
        history.replace('/')
      })
    },
    [history, login]
  )

  useEffect(() => {
    app.navigation = {}
  }, [])

  return (
    <Center component="form" onSubmit={handleSubmit(handleFormValid)}>
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
        autoComplete="current-password"
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
        className={classes.link}
        component={Link}
        to="/register"
        variant="body2"
      >
        Don&apos;t have an account? Sign Up
      </MaterialLink>
    </Center>
  )
}

export default Login
