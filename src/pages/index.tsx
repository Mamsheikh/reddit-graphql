import { gql, useQuery } from '@apollo/client';
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';

import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';

const testQuery = gql`
  {
    test(bool: false)
  }
`;

const Home = () => {
  const { data } = useQuery(testQuery, {
    notifyOnNetworkStatusChange: true,
  });
  return <div>{JSON.stringify(data?.test)}</div>;
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx: { req, prisma } });

  await apolloClient.query({ query: testQuery });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
