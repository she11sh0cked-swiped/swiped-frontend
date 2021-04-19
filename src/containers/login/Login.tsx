import { Link as MaterialLink, TextField } from '@material-ui/core'
import { FC, useCallback, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import SubmitButton from 'components/submitButton/SubmitButton'
import app from 'store/App'
import { MutationUser_LoginArgs } from 'types/api.generated'
import useSharedStyles from 'utils/sharedStyles'

import { useLoginMutation } from './Login.generated'

type IProps = RouteComponentProps

const Login: FC<IProps> = ({ history }) => {
  const sharedClasses = useSharedStyles()

  const [login, loginResult] = useLoginMutation()

  const { control, handleSubmit } = useForm<MutationUser_LoginArgs>()

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
      <Controller
        control={control}
        name="username"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            autoComplete="username"
            autoFocus
            error={error != null}
            fullWidth
            helperText={error?.message}
            label="Username"
            margin="normal"
            required
            size="small"
            variant="outlined"
            {...field}
            ref={ref}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            autoComplete="current-password"
            error={error != null}
            fullWidth
            helperText={error?.message}
            label="Password"
            margin="normal"
            required
            size="small"
            type="password"
            variant="outlined"
            {...field}
            ref={ref}
          />
        )}
      />
      <SubmitButton loading={loginResult.loading}>Sign In</SubmitButton>
      <MaterialLink
        className={sharedClasses.rightAlign}
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
