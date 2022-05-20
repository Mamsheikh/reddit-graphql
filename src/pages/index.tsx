import { gql } from '@apollo/client';
import type { NextPage, GetServerSidePropsContext } from 'next';
import { useTestQuery } from '../../generated/graphql';

import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';

const testQuery = gql`
  {
    test(bool: false)
  }
`;

const Home = () => {
  const { data } = useTestQuery({
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
