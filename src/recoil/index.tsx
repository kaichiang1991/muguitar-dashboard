import { atom, RecoilState } from 'recoil'

export interface ILoginState {
  username: string
  password: string
}

export const loginState: RecoilState<ILoginState> = atom({
  key: 'loginState',
  default: {
    username: process.env.REACT_APP_USERNAME || '',
    password: '',
  },
})
