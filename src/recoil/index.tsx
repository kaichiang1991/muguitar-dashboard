import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

export const loginState: RecoilState<ILoginState> = atom({
  key: 'loginState',
  default: {
    account: process.env.REACT_APP_USERNAME || '',
    password: '',
    username: '',
    teacher_id: -1,
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

//#region 課程資料
export const courseListState: RecoilState<Array<ICourseData>> = atom({
  key: 'courseListState',
  default: [] as Array<ICourseData>,
})

export const courseListWithTeacherState: RecoilState<Array<ICourseTableData>> =
  atom({
    key: 'courseListWithTeacherState',
    default: [] as Array<ICourseTableData>,
  })

export const sortCourseListState: RecoilValueReadOnly<Array<ICourseTableData>> =
  selector({
    key: 'sortCourseListState',
    get: ({ get }) => {
      const courseList: Array<ICourseTableData> = get(
        courseListWithTeacherState
      )

      // 從最後的排到最前的
      const sortFn = (a: ICourseTableData, b: ICourseTableData): number =>
        a.date.isBefore(b.date) ? 1 : -1

      return courseList.slice().sort(sortFn)
    },
  })
//#endregion 課程資料
