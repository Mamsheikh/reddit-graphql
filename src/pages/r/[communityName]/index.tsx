import { prisma } from '../../../lib/prisma';
import { GetServerSidePropsContext } from 'next';
// import { Props } from 'next/script';
import React, { useEffect, useState } from 'react';
import {
  Community,
  GetCommunityDocument,
  GetCommunityQuery,
  useGetUsersCommunitiesQuery,
} from '../../../../generated/graphql';
// import { Community } from '../../../atoms/communityAtom';
// import { ImplicitLoginQuery, ImplicitLoginDocument } from '../../../generated/graphql';
import { initializeApollo, addApolloState } from '../../../lib/apolloClient';
import NotFound from '../../../modules/components/Community/NotFound';
import Header from '../../../modules/components/Community/Header';
import PageContent from '../../../modules/components/Layout/PageContent';
import useCommunityData from '../../../modules/hooks/useCommunityData';
import CreatePostLink from '../../../modules/components/Community/CreatePostLink';
// import NotFound from '../../../modules/components/Community/NotFound';
// import Header from '../../../modules/components/Community/Header';

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
  image,
}: Community) => {
  //   console.log(communityData);
  // const { data } = useGetUsersCommunitiesQuery();
  const { communityStateValue } = useCommunityData();
  // console.log('here is data', communityStateValue.communities);
  const [communityData, setCommunityData] = useState<Community>();
  useEffect(() => {
    setCommunityData({
      id,
      name,
      creatorId,
      numberOfMembers,
      privacyType,
      createdAt,
      image,
    });
  }, []);

  if (!id || !name) return <NotFound />;
  return (
    <>
      {communityData && <Header communityData={communityData} />}
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>RHS</>
      </PageContent>
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
