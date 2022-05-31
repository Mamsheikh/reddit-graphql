import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Community,
  useGetUsersCommunitiesLazyQuery,
  useGetUsersCommunitiesQuery,
} from '../../../generated/graphql';
import { communityState } from '../../atoms/communityAtom';
import useUserData from './useUserData';

const useCommunityData = () => {
  const { userStateValue } = useUserData();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [getUsersCommunities, { loading }] = useGetUsersCommunitiesLazyQuery({
    onCompleted(data) {
      setCommunityStateValue((prev) => ({
        ...prev,
        communities: data.getUsersCommunities as Community[],
      }));
    },
  });

  useEffect(() => {
    // if (!userStateValue.loggedIn === false) return;
    getUsersCommunities();
  }, []);

  return {
    communityStateValue,
    loading,
  };
};

export default useCommunityData;
