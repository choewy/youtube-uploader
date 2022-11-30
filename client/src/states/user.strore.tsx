import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

export type UserStore = {
  userId: string;
  clientId: string;
};

export const userStore = atom<UserStore>({
  key: 'userState',
  default: {
    userId: '',
    clientId: '',
  },
});

export const useUserState = () => useRecoilState(userStore);
export const useUserValue = () => useRecoilValue(userStore);
export const useSetUser = () => useSetRecoilState(userStore);
export const useResetUser = () => useResetRecoilState(userStore);
