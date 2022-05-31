import { useRecoilState } from 'recoil';

import { userState } from '../../atoms/userAtom';

const useUserData = () => {
  const [userStateValue, setUserStateValue] = useRecoilState(userState);
  return {
    userStateValue,
    setUserStateValue,
  };
};

export default useUserData;
