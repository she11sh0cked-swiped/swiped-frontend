import { Link as MaterialLink, TextField } from '@material-ui/core'
import { FC, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import SubmitButton from 'components/submitButton/SubmitButton'
import app from 'store/App'
import { MutationUser_CreateOneArgs } from 'types/api.generated'

import { useCreateUserMutation, useLoginMutation } from './Register.generated'
import useStyles from './Register.styles'

type IProps = RouteComponentProps

const Register: FC<IProps> = ({ history }) => {
  const classes = useStyles()

  const [createUser] = useCreateUserMutation()
  const [login] = useLoginMutation()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register: formRegister,
  } = useForm<MutationUser_CreateOneArgs>()

  const handleFormValid = useCallback<
    SubmitHandler<MutationUser_CreateOneArgs>
  >(
    (data) => {
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
    },
    [createUser, history, login]
  )

  useEffect(() => {
    app.navigation = {}
  }, [handleFormValid, handleSubmit])

  return (
    <Center component="form" onSubmit={handleSubmit(handleFormValid)}>
      <TextField
        {...formRegister('record.username')}
        autoComplete="username"
        autoFocus
        error={errors.record?.username != null}
        fullWidth
        helperText={errors.record?.username?.message}
        label="Username"
        margin="normal"
        required
        size="small"
        variant="outlined"
      />
      <TextField
        {...formRegister('password')}
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
        {...formRegister('confirmPassword', {
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
      <SubmitButton>Sign Up</SubmitButton>
      <MaterialLink
        className={classes.link}
        component={Link}
        to="/login"
        variant="body2"
      >
        Already have an account? Sign In
      </MaterialLink>
    </Center>
  )
}

export default Register
