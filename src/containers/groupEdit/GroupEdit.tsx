import { ArrowBack, Save } from '@material-ui/icons'
import { FC, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import { useGroupQuery } from './GroupEdit.generated'

type IProps = RouteComponentProps<{ groupId: string }>

const GroupEdit: FC<IProps> = ({
  history,
  location: { pathname },
  match: {
    params: { groupId },
  },
}) => {
  const isNew = useMemo(() => pathname === '/g/new', [pathname])

  const groupResult = useGroupQuery({
    onError: () => {
      history.replace('/404')
    },
    skip: isNew,
    variables: { id: groupId },
  })

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

  if (groupResult.loading) return <Loading />

  return <div>:)</div>
}

export default GroupEdit
