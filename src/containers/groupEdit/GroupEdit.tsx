import { ArrowBack, Save } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

type IProps = RouteComponentProps<{ groupId: string }>

const GroupEdit: FC<IProps> = ({
  location: { pathname },
  match: {
    params: { groupId },
  },
}) => {
  const isNew = useMemo(() => pathname === '/g/new', [pathname])

  useEffect(() => {
    app.navigation = {
      left: {
        icon: ArrowBack,
        to: isNew ? '/groups' : `/g/${groupId}`,
      },
      right: {
        icon: Save,
        to: `/g/${groupId}`,
      },
    }
  }, [groupId, isNew])

  return <div>:)</div>
}

export default GroupEdit
