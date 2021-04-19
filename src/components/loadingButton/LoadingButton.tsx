import {
  Button,
  ButtonProps,
  CircularProgress,
  withStyles,
} from '@material-ui/core'
import { FC } from 'react'

interface IProps extends ButtonProps {
  loading?: boolean
}

const StyledCircularProgress = withStyles({
  root: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
  },
})(CircularProgress)

const LoadingButton: FC<IProps> = ({ children, loading, ...props }) => (
  <Button disabled={loading} {...props}>
    {children}
    {loading && <StyledCircularProgress size={24} />}
  </Button>
)

export default withStyles(() => ({
  root: {
    position: 'relative',
  },
}))(LoadingButton)
