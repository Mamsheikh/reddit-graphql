import { gql } from '@apollo/client';
import type { NextPage, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useTestQuery } from '../../generated/graphql';
import { authModalState } from '../atoms/authModalAtom';

import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';

const testQuery = gql`
  {
    test(bool: false)
  }
`;

const Home = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const { code } = router.query;
  // console.log('code', code);
  const { data } = useTestQuery({
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (code) {
      setAuthModalState({ view: 'login', open: true });
    }
  }, [code]);

  return <div>{JSON.stringify(data?.test)}</div>;
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx: { res, req, prisma } });

  await apolloClient.query({ query: testQuery });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
