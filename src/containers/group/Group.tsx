import { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import List from './components/list/List'

type IProps = RouteComponentProps<{ groupId: string }>

const Group: FC<IProps> = ({
  match: {
    params: { groupId },
  },
}) => {
  return (
    <div>
      <List groupId={groupId} />
    </div>
  )
}

export default Group
