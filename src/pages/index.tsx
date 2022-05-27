import type { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery,
} from '../../generated/graphql';
import { authModalState } from '../atoms/authModalAtom';

import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';
import { userState } from '../atoms/userAtom';

interface Props {
  loggedIn: boolean;
  displayName: string;
  email: string;
  id: string;
  image?: string;
}
const Home = ({ displayName, email, id, loggedIn, image }: Props) => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const setUserState = useSetRecoilState(userState);
  const { code } = router.query;

  useEffect(() => {
    if (loggedIn) {
      setUserState({
        loggedIn: loggedIn,
        email: email,
        displayName: displayName,
        id: id,
        image: image,
      });
    }
  }, [loggedIn]);
  useEffect(() => {
    if (code) {
      setAuthModalState({ view: 'login', open: true });
    }
  }, [code]);

  return <div>{displayName}</div>;
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req });
  if (!cookies.sid) {
    return {
      props: {
        loggedIn: false,
      } as Props,
    };
  }
  const apolloClient = initializeApollo({ ctx: { res, req, prisma } });
  const { data } = await apolloClient.query<ImplicitLoginQuery>({
    query: ImplicitLoginDocument,
  });

  if (!data.implicitLogin?.loggedIn) {
    return {
      props: {
        loggedIn: false,
      } as Props,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      loggedIn: data.implicitLogin?.loggedIn,
      email: data.implicitLogin?.email,
      displayName: data.implicitLogin?.displayName,
      image: data.implicitLogin?.image,
      id: data.implicitLogin?.id,
    } as Props,
  });
};

export default Home;
