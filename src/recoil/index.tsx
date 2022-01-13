import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

export const loginState: RecoilState<ILoginState> = atom({
  key: 'loginState',
  default: {
    username: process.env.REACT_APP_USERNAME || '',
    password: '',
  },
})

export const attendRecordState: RecoilState<Array<IAttendenceData>> = atom({
  key: 'attendRecordState',
  default: [] as Array<IAttendenceData>,
})

// 排序過的出席紀錄 （先用出席時間
export const sortAttendRecordState: RecoilValueReadOnly<
  Array<IAttendenceData>
> = selector({
  key: 'sortAttendRecordState',
  get: ({ get }) => {
    const records = get(attendRecordState)
    const sortFn = (a: IAttendenceData, b: IAttendenceData): number =>
      a.date.isBefore(b.date) ? 1 : -1

    return records.slice().sort(sortFn)
  },
})
