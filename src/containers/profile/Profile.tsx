import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'

import { Query } from 'types/api'

type TUserData = Pick<Query, 'user_findMe'>

const Profile: FC = () => {
  const userResponse = useQuery<TUserData>(
    gql`
      query {
        user_findMe {
          _id
        }
      }
    `
  )

  console.log(userResponse)

  return <div />
}

export default Profile
