import { Avatar, Button, TextField } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { FC, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router-dom'

import { MutationUser_RegisterArgs } from 'types/api.generated'

import { useRegisterMutation } from './Register.generated'
import useStyles from './Register.styles'

type TFields = MutationUser_RegisterArgs & { confirmPassword: string }

type IProps = RouteComponentProps

const Register: FC<IProps> = ({ history }) => {
  const classes = useStyles()

  const [register] = useRegisterMutation()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register: formRegister,
  } = useForm<TFields>()

  const handleFormValid = useCallback<SubmitHandler<TFields>>(
    (data) => {
      void register({ variables: data }).then(({ data }) => {
        const token = data?.user_register?.token
        if (token == null) return
        localStorage.setItem('token', token)
        history.replace('/')
      })
    },
    [history, register]
  )

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <form onSubmit={handleSubmit(handleFormValid)}>
        <TextField
          {...formRegister('username')}
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
