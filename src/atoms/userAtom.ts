import { atom } from 'recoil';

export interface UserModalState {
  loggedIn: boolean;
  email: string | undefined | null;
  displayName?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
}

const defaultModalState: UserModalState = {
  loggedIn: false,
  email: undefined,
};

export const userState = atom<UserModalState>({
  key: 'userState',
  default: defaultModalState,
});
