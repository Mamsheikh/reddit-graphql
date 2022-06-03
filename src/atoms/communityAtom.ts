import { atom } from 'recoil';
import { Community } from '../../generated/graphql';

// export interface Community {
//   id: string;
//   creatorId: string;
//   name: string;
//   numberOfMembers: string;
//   privacyType: string;
//   createdAt?: string;
//   imageURL?: string;
// }

interface CommunityState {
  communities: Community[];
  currentCommunity?: Community;
}

const defaultCommunityState: CommunityState = {
  communities: [],
};

export const communityState = atom<CommunityState>({
  key: 'communityState',
  default: defaultCommunityState,
});
