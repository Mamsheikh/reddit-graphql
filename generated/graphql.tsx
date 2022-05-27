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
  createUser?: Maybe<RegisterResponse>;
  googleLogin?: Maybe<RegisterResponse>;
  login?: Maybe<RegisterResponse>;
};


export type MutationCreateCommunityArgs = {
  communityName: Scalars['String'];
  communityType?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  credentials: CreateUserInput;
};


export type MutationGoogleLoginArgs = {
  code: Scalars['String'];
};


export type MutationLoginArgs = {
  credentials: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getCommunity?: Maybe<Community>;
  googleAuthUrl?: Maybe<Scalars['String']>;
  implicitLogin?: Maybe<ImplicitLoginResponse>;
};


export type QueryGetCommunityArgs = {
  communityName: Scalars['String'];
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