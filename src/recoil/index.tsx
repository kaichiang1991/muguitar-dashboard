import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

export const loginState: RecoilState<ILoginState> = atom({
  key: 'loginState',
  default: {
    username: process.env.REACT_APP_USERNAME || '',
    password: '',
  },
})

//#region 出席紀錄
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
//#endregion 出席紀錄

//#region 教師資料
export const teacherListState: RecoilState<Array<ITeacherData>> = atom({
  key: 'teacherListState',
  default: [] as Array<ITeacherData>,
})
//#endregion 教師資料

//#region 學生資料
export const studentListState: RecoilState<Array<IStudentData>> = atom({
  key: 'studentListState',
  default: [] as Array<IStudentData>,
})
//#endregion 學生資料
