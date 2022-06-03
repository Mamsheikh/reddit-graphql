import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Community = {
  __typename?: 'Community';
  createdAt?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberOfMembers?: Maybe<Scalars['Int']>;
  privacyType?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  success: Scalars['Boolean'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
};

export type ImplicitLoginResponse = {
  __typename?: 'ImplicitLoginResponse';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  loggedIn: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCommunity?: Maybe<Community>;
  createImageSignature?: Maybe<ImageSignature>;
  createPost?: Maybe<Post>;
  createUser?: Maybe<RegisterResponse>;
  deletePost?: Maybe<DeletePostResponse>;
  googleLogin?: Maybe<RegisterResponse>;
  joinCommunity?: Maybe<Community>;
  leaveCommunity?: Maybe<Community>;
  login?: Maybe<RegisterResponse>;
  updateCommunityImage?: Maybe<Community>;
};


export type MutationCreateCommunityArgs = {
  communityName: Scalars['String'];
  communityType?: InputMaybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateUserArgs = {
  credentials: CreateUserInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationGoogleLoginArgs = {
  code: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationLeaveCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationLoginArgs = {
  credentials: CreateUserInput;
};


export type MutationUpdateCommunityImageArgs = {
  communityId: Scalars['String'];
  image: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  community?: Maybe<Community>;
  communityId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getCommunity?: Maybe<Community>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getUsersCommunities?: Maybe<Array<Maybe<Community>>>;
  googleAuthUrl?: Maybe<Scalars['String']>;
  implicitLogin?: Maybe<ImplicitLoginResponse>;
};


export type QueryGetCommunityArgs = {
  communityName: Scalars['String'];
};


export type QueryGetPostsArgs = {
  communityId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CreatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  communityId: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'registerResponse';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type CreateCommunityMutationVariables = Exact<{
  communityName: Scalars['String'];
  communityType?: InputMaybe<Scalars['String']>;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity?: { __typename?: 'Community', name?: string | null, creatorId?: string | null, image?: string | null, numberOfMembers?: number | null } | null };

export type GetCommunityQueryVariables = Exact<{
  communityName: Scalars['String'];
}>;


export type GetCommunityQuery = { __typename?: 'Query', getCommunity?: { __typename?: 'Community', id?: string | null, name?: string | null, creatorId?: string | null, image?: string | null, numberOfMembers?: number | null, createdAt?: string | null, privacyType?: string | null } | null };

export type GetUsersCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersCommunitiesQuery = { __typename?: 'Query', getUsersCommunities?: Array<{ __typename?: 'Community', name?: string | null, id?: string | null, image?: string | null, numberOfMembers?: number | null, privacyType?: string | null, creatorId?: string | null, createdAt?: string | null } | null> | null };

export type LeaveCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type LeaveCommunityMutation = { __typename?: 'Mutation', leaveCommunity?: { __typename?: 'Community', id?: string | null, name?: string | null, image?: string | null, numberOfMembers?: number | null, createdAt?: string | null } | null };

export type JoinCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity?: { __typename?: 'Community', id?: string | null, name?: string | null, image?: string | null, numberOfMembers?: number | null, createdAt?: string | null } | null };

export type UpdateCommunityImageMutationVariables = Exact<{
  communityId: Scalars['String'];
  image: Scalars['String'];
}>;


export type UpdateCommunityImageMutation = { __typename?: 'Mutation', updateCommunityImage?: { __typename?: 'Community', id?: string | null, name?: string | null, privacyType?: string | null, creatorId?: string | null, image?: string | null, numberOfMembers?: number | null, createdAt?: string | null } | null };

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature?: { __typename?: 'ImageSignature', signature?: string | null, timestamp?: number | null } | null };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', title?: string | null, body?: string | null, communityId?: string | null, image?: string | null, userId?: string | null } | null };

export type GetPostsQueryVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'Post', title?: string | null, communityId?: string | null, body?: string | null, image?: string | null, userId?: string | null, createdAt?: string | null, id?: string | null, community?: { __typename?: 'Community', image?: string | null, numberOfMembers?: number | null, createdAt?: string | null, privacyType?: string | null, creatorId?: string | null, id?: string | null, name?: string | null } | null, user?: { __typename?: 'User', id?: string | null, email?: string | null, displayName?: string | null, image?: string | null } | null } | null> | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'DeletePostResponse', success: boolean } | null };

export type LoginMutationVariables = Exact<{
  credentials: CreateUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'registerResponse', message: string } | null };

export type CreateUserMutationVariables = Exact<{
  credentials: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'registerResponse', message: string } | null };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', googleAuthUrl?: string | null };

export type GoogleLoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin?: { __typename?: 'registerResponse', message: string } | null };

export type ImplicitLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type ImplicitLoginQuery = { __typename?: 'Query', implicitLogin?: { __typename?: 'ImplicitLoginResponse', loggedIn: boolean, email?: string | null, displayName?: string | null, id?: string | null, image?: string | null } | null };


export const CreateCommunityDocument = gql`
    mutation CreateCommunity($communityName: String!, $communityType: String) {
  createCommunity(communityName: $communityName, communityType: $communityType) {
    name
    creatorId
    image
    numberOfMembers
  }
}
    `;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      communityName: // value for 'communityName'
 *      communityType: // value for 'communityType'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const GetCommunityDocument = gql`
    query GetCommunity($communityName: String!) {
  getCommunity(communityName: $communityName) {
    id
    name
    creatorId
    image
    numberOfMembers
    createdAt
    privacyType
  }
}
    `;

/**
 * __useGetCommunityQuery__
 *
 * To run a query within a React component, call `useGetCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityQuery({
 *   variables: {
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useGetCommunityQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityQuery, GetCommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityQuery, GetCommunityQueryVariables>(GetCommunityDocument, options);
      }
export function useGetCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityQuery, GetCommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityQuery, GetCommunityQueryVariables>(GetCommunityDocument, options);
        }
export type GetCommunityQueryHookResult = ReturnType<typeof useGetCommunityQuery>;
export type GetCommunityLazyQueryHookResult = ReturnType<typeof useGetCommunityLazyQuery>;
export type GetCommunityQueryResult = Apollo.QueryResult<GetCommunityQuery, GetCommunityQueryVariables>;
export const GetUsersCommunitiesDocument = gql`
    query GetUsersCommunities {
  getUsersCommunities {
    name
    id
    image
    numberOfMembers
    privacyType
    creatorId
    createdAt
  }
}
    `;

/**
 * __useGetUsersCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetUsersCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersCommunitiesQuery, GetUsersCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersCommunitiesQuery, GetUsersCommunitiesQueryVariables>(GetUsersCommunitiesDocument, options);
      }
export function useGetUsersCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersCommunitiesQuery, GetUsersCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersCommunitiesQuery, GetUsersCommunitiesQueryVariables>(GetUsersCommunitiesDocument, options);
        }
export type GetUsersCommunitiesQueryHookResult = ReturnType<typeof useGetUsersCommunitiesQuery>;
export type GetUsersCommunitiesLazyQueryHookResult = ReturnType<typeof useGetUsersCommunitiesLazyQuery>;
export type GetUsersCommunitiesQueryResult = Apollo.QueryResult<GetUsersCommunitiesQuery, GetUsersCommunitiesQueryVariables>;
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($communityId: String!) {
  leaveCommunity(communityId: $communityId) {
    id
    name
    image
    numberOfMembers
    createdAt
  }
}
    `;
export type LeaveCommunityMutationFn = Apollo.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, options);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = Apollo.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = Apollo.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($communityId: String!) {
  joinCommunity(communityId: $communityId) {
    id
    name
    image
    numberOfMembers
    createdAt
  }
}
    `;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const UpdateCommunityImageDocument = gql`
    mutation UpdateCommunityImage($communityId: String!, $image: String!) {
  updateCommunityImage(communityId: $communityId, image: $image) {
    id
    name
    privacyType
    creatorId
    image
    numberOfMembers
    createdAt
  }
}
    `;
export type UpdateCommunityImageMutationFn = Apollo.MutationFunction<UpdateCommunityImageMutation, UpdateCommunityImageMutationVariables>;

/**
 * __useUpdateCommunityImageMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityImageMutation, { data, loading, error }] = useUpdateCommunityImageMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateCommunityImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityImageMutation, UpdateCommunityImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityImageMutation, UpdateCommunityImageMutationVariables>(UpdateCommunityImageDocument, options);
      }
export type UpdateCommunityImageMutationHookResult = ReturnType<typeof useUpdateCommunityImageMutation>;
export type UpdateCommunityImageMutationResult = Apollo.MutationResult<UpdateCommunityImageMutation>;
export type UpdateCommunityImageMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityImageMutation, UpdateCommunityImageMutationVariables>;
export const CreateImageSignatureDocument = gql`
    mutation CreateImageSignature {
  createImageSignature {
    signature
    timestamp
  }
}
    `;
export type CreateImageSignatureMutationFn = Apollo.MutationFunction<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>;

/**
 * __useCreateImageSignatureMutation__
 *
 * To run a mutation, you first call `useCreateImageSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImageSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImageSignatureMutation, { data, loading, error }] = useCreateImageSignatureMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateImageSignatureMutation(baseOptions?: Apollo.MutationHookOptions<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(CreateImageSignatureDocument, options);
      }
export type CreateImageSignatureMutationHookResult = ReturnType<typeof useCreateImageSignatureMutation>;
export type CreateImageSignatureMutationResult = Apollo.MutationResult<CreateImageSignatureMutation>;
export type CreateImageSignatureMutationOptions = Apollo.BaseMutationOptions<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: createPostInput!) {
  createPost(input: $input) {
    title
    body
    communityId
    image
    userId
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($communityId: String!) {
  getPosts(communityId: $communityId) {
    title
    communityId
    body
    image
    userId
    community {
      image
      numberOfMembers
      createdAt
      privacyType
      creatorId
      id
      name
    }
    user {
      id
      email
      displayName
      image
    }
    createdAt
    id
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    success
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: CreateUserInput!) {
  login(credentials: $credentials) {
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($credentials: CreateUserInput!) {
  createUser(credentials: $credentials) {
    message
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  googleAuthUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($code: String!) {
  googleLogin(code: $code) {
    message
  }
}
    `;
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const ImplicitLoginDocument = gql`
    query ImplicitLogin {
  implicitLogin {
    loggedIn
    email
    displayName
    id
    image
  }
}
    `;

/**
 * __useImplicitLoginQuery__
 *
 * To run a query within a React component, call `useImplicitLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useImplicitLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImplicitLoginQuery({
 *   variables: {
 *   },
 * });
 */
export function useImplicitLoginQuery(baseOptions?: Apollo.QueryHookOptions<ImplicitLoginQuery, ImplicitLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImplicitLoginQuery, ImplicitLoginQueryVariables>(ImplicitLoginDocument, options);
      }
export function useImplicitLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImplicitLoginQuery, ImplicitLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImplicitLoginQuery, ImplicitLoginQueryVariables>(ImplicitLoginDocument, options);
        }
export type ImplicitLoginQueryHookResult = ReturnType<typeof useImplicitLoginQuery>;
export type ImplicitLoginLazyQueryHookResult = ReturnType<typeof useImplicitLoginLazyQuery>;
export type ImplicitLoginQueryResult = Apollo.QueryResult<ImplicitLoginQuery, ImplicitLoginQueryVariables>;