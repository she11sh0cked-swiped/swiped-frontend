import * as Types from '../../../../types/api.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RecommendationsQueryVariables = Types.Exact<{
  count: Types.Scalars['Int'];
}>;


export type RecommendationsQuery = (
  { __typename?: 'Query' }
  & { media_recommendations?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'movie' }
    & Pick<Types.Movie, 'title' | 'id' | 'poster_path' | 'media_type'>
  ) | (
    { __typename?: 'tv' }
    & Pick<Types.Tv, 'name' | 'id' | 'poster_path' | 'media_type'>
  )>>> }
);

export type UserVoteMutationVariables = Types.Exact<{
  votes: Array<Types.UserVotesInput> | Types.UserVotesInput;
}>;


export type UserVoteMutation = (
  { __typename?: 'Mutation' }
  & { user_vote?: Types.Maybe<(
    { __typename?: 'UpdateByIduserPayload' }
    & Pick<Types.UpdateByIduserPayload, 'recordId'>
  )> }
);


export const RecommendationsDocument = gql`
    query recommendations($count: Int!) {
  media_recommendations(count: $count) {
    id
    poster_path
    media_type
    ... on movie {
      title
    }
    ... on tv {
      name
    }
  }
}
    `;

/**
 * __useRecommendationsQuery__
 *
 * To run a query within a React component, call `useRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationsQuery({
 *   variables: {
 *      count: // value for 'count'
 *   },
 * });
 */
export function useRecommendationsQuery(baseOptions: Apollo.QueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, options);
      }
export function useRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, options);
        }
export type RecommendationsQueryHookResult = ReturnType<typeof useRecommendationsQuery>;
export type RecommendationsLazyQueryHookResult = ReturnType<typeof useRecommendationsLazyQuery>;
export type RecommendationsQueryResult = Apollo.QueryResult<RecommendationsQuery, RecommendationsQueryVariables>;
export const UserVoteDocument = gql`
    mutation userVote($votes: [userVotesInput!]!) {
  user_vote(votes: $votes) {
    recordId
  }
}
    `;
export type UserVoteMutationFn = Apollo.MutationFunction<UserVoteMutation, UserVoteMutationVariables>;

/**
 * __useUserVoteMutation__
 *
 * To run a mutation, you first call `useUserVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userVoteMutation, { data, loading, error }] = useUserVoteMutation({
 *   variables: {
 *      votes: // value for 'votes'
 *   },
 * });
 */
export function useUserVoteMutation(baseOptions?: Apollo.MutationHookOptions<UserVoteMutation, UserVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserVoteMutation, UserVoteMutationVariables>(UserVoteDocument, options);
      }
export type UserVoteMutationHookResult = ReturnType<typeof useUserVoteMutation>;
export type UserVoteMutationResult = Apollo.MutationResult<UserVoteMutation>;
export type UserVoteMutationOptions = Apollo.BaseMutationOptions<UserVoteMutation, UserVoteMutationVariables>;