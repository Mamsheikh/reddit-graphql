import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Community,
  useGetUsersCommunitiesLazyQuery,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} from '../../../generated/graphql';
import { authModalState } from '../../atoms/authModalAtom';
import { communityState } from '../../atoms/communityAtom';
import useUserData from './useUserData';

const useCommunityData = () => {
  const { userStateValue } = useUserData();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  //Join Community Mutation
  const [joinCommunity, { loading: joinLoading }] = useJoinCommunityMutation({
    onCompleted(data) {
      setCommunityStateValue((prev) => ({
        ...prev,
        communities: [...prev.communities, data.joinCommunity] as Community[],
      }));
    },
  });

  //Leave Community Mutation
  const [leaveCommunity, { loading: leaveLoading }] = useLeaveCommunityMutation(
    {
      onCompleted(data) {
        setCommunityStateValue((prev) => ({
          ...prev,
          communities: prev.communities.filter(
            (item) => item.id !== data.leaveCommunity?.id
          ),
        }));
      },
    }
  );

  //get users communities query
  const [getUsersCommunities, { loading, data: communities }] =
    useGetUsersCommunitiesLazyQuery({
      onCompleted(data) {
        setCommunityStateValue((prev) => ({
          ...prev,
          communities: data.getUsersCommunities as Community[],
        }));
      },
    });

  const onJoinOrLeaveCommunity = (communityId: string, isJoined: boolean) => {
    if (userStateValue.loggedIn === false) {
      setAuthModalState({ view: 'login', open: true });
      return;
    }
    if (isJoined) {
      leaveCommunity({
        variables: {
          communityId,
        },
      });
      return;
    }
    joinCommunity({
      variables: {
        communityId,
      },
    });
  };

  useEffect(() => {
    // if (!userStateValue.loggedIn === false) return;
    getUsersCommunities();
  }, [userStateValue.loggedIn]);

  return {
    communityStateValue,
    loading,
    communities,
    joinLoading,
    leaveLoading,
    onJoinOrLeaveCommunity,
  };
};

export default useCommunityData;
