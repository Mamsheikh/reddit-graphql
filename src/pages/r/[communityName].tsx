import { prisma } from '../../lib/prisma';
import { GetServerSidePropsContext } from 'next';
// import { Props } from 'next/script';
import React, { useEffect, useState } from 'react';
import {
  GetCommunityDocument,
  GetCommunityQuery,
} from '../../../generated/graphql';
import { Community } from '../../atoms/communityAtom';
// import { ImplicitLoginQuery, ImplicitLoginDocument } from '../../../generated/graphql';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';
import NotFound from '../../modules/components/Community/NotFound';
import Header from '../../modules/components/Community/Header';

// type CommunityPageProps = {
//   communityData: Community;
// };

const CommunityPage = ({
  id,
  name,
  creatorId,
  numberOfMembers,
  privacyType,
  createdAt,
  imageURL,
}: Community) => {
  //   console.log(communityData);
  const [communityData, setCommunityData] = useState({
    id: '',
    name: '',
    creatorId: '',
    numberOfMembers: '',
    privacyType: '',
    createdAt,
    imageURL,
  });
  useEffect(() => {
    setCommunityData({
      id,
      name,
      creatorId,
      numberOfMembers,
      privacyType,
      createdAt,
      imageURL,
    });
  }, []);

  if (!id || !name) return <NotFound />;
  return (
    <>
      <Header communityData={communityData} />
    </>
  );
};

export const getServerSideProps = async ({
  res,
  req,
  query,
}: GetServerSidePropsContext) => {
  try {
    const apolloClient = initializeApollo({ ctx: { res, req, prisma } });
    const { data } = await apolloClient.query<GetCommunityQuery>({
      query: GetCommunityDocument,
      variables: {
        communityName: query.communityName as string,
      },
    });

    // if (!data.getCommunity) {
    //   return {
    //     props: {
    //       id: null,
    //       creatorId: null,
    //       name: null,
    //     },
    //   };
    // }
    return addApolloState(apolloClient, {
      props: {
        id: data.getCommunity?.id,
        creatorId: data.getCommunity?.creatorId,
        name: data.getCommunity?.name,
        numberOfMembers: data.getCommunity?.numberOfMembers,
        imageURL: data.getCommunity?.image,
        privacyType: data.getCommunity?.privacyType,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
export default CommunityPage;
