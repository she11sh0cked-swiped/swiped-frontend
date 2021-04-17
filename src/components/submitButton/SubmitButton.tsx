import { Button, ButtonProps, withStyles } from '@material-ui/core'
import { FC } from 'react'

type IProps = ButtonProps

const SubmitButton: FC<IProps> = (props) => (
  <Button
    color="primary"
    fullWidth
    type="submit"
    variant="contained"
    {...props}
  />
)

export default withStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
  },
}))(SubmitButton)
