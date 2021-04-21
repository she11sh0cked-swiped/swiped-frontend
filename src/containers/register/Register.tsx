import { Link as MaterialLink, TextField } from '@material-ui/core'
import { FC, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import SubmitButton from 'components/submitButton/SubmitButton'
import Tmdb from 'components/tmdb/Tmdb'
import app from 'store/App'
import useSharedStyles from 'utils/sharedStyles'

import {
  CreateUserMutationVariables,
  useCreateUserMutation,
  useLoginMutation,
} from './Register.generated'

type IProps = RouteComponentProps

const Register: FC<IProps> = ({ history }) => {
  const sharedClasses = useSharedStyles()

  const [createUser, createUserResult] = useCreateUserMutation()
  const [login, loginResult] = useLoginMutation()

  const {
    control,
    getValues,
    handleSubmit,
  } = useForm<CreateUserMutationVariables>()

  const handleFormSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        void createUser({ variables: data }).then(({ errors }) => {
          if (errors != null) return

          void login({
            variables: {
              password: data.password,
              username: data.record.username,
            },
          }).then(({ data }) => {
            const token = data?.user_login?.token
            if (token == null) return

            localStorage.setItem('token', token)

            history.replace('/')
          })
        })
      }),
    [createUser, handleSubmit, history, login]
  )

  useEffect(() => {
    app.navigation = {}
  }, [])

  return (
    <>
      <Center component="form" onSubmit={handleFormSubmit}>
        <Controller
          control={control}
          name="record.username"
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextField
              autoComplete="new-password"
              error={error != null}
              fullWidth
              helperText={error?.message}
              label="Confirm Password"
              margin="normal"
              required
              size="small"
              type="password"
              variant="outlined"
              {...field}
              ref={ref}
            />
          )}
          rules={{
            validate: (value) =>
              value === getValues('password') || 'The passwords do not match',
          }}
        />
        <SubmitButton loading={createUserResult.loading || loginResult.loading}>
          Sign Up
        </SubmitButton>
        <MaterialLink
          className={sharedClasses.rightAlign}
          component={Link}
          to="/login"
          variant="body2"
        >
          Already have an account? Sign In
        </MaterialLink>
      </Center>
      <Tmdb />
    </>
  )
}

export default Register
