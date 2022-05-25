import { atom } from 'recoil';

export interface UserModalState {
  loggedIn: boolean;
  email: string | null;
  displayName?: string;
  image?: string;
  id?: string;
}

const defaultModalState: UserModalState = {
  loggedIn: false,
  email: null,
};

export const userState = atom<UserModalState>({
  key: 'userState',
  default: defaultModalState,
});
