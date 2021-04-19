import { withStyles } from '@material-ui/core'
import { FC } from 'react'

import LoadingButton, {
  ILoadingButtonProps,
} from 'components/loadingButton/LoadingButton'

type IProps = ILoadingButtonProps

const SubmitButton: FC<IProps> = (props) => (
  <LoadingButton
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
