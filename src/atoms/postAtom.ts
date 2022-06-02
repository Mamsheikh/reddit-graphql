import { atom } from 'recoil';
import { Post } from '../../generated/graphql';

// export type Post = {
//   id: string;
//   communtityId: string;
//   userId: string;
//   title: string;
//   body: string;
//   numberOfComments: number;
//   image?: string;
//   createdAt: string;
// };

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});
