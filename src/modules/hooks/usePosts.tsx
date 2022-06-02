import { useRecoilState } from 'recoil';
import { postState } from '../../atoms/postAtom';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  return {
    postStateValue,
    setPostStateValue,
  };
};
export default usePosts;
