import { useEffect } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import {
  attendRecordState,
  courseListState,
  studentListState,
  teacherListState,
} from '../../recoil'
import records from '../../mock/attendence'
import teacherList from '../../mock/teacher'
import studentList from '../../mock/student'
import courses from '../../mock/course'
import { IResponseData, request } from '../../server'

const useMockData: boolean =
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TESTDATA === 'true'

export const useLoadDataOnce = () => {
  const setTeacherList: SetterOrUpdater<Array<ITeacherData>> =
    useSetRecoilState(teacherListState)

  const setStudentList: SetterOrUpdater<Array<IStudentData>> =
    useSetRecoilState(studentListState)

  useEffect(() => {
    // ToDo 從server取得資料
    ;(async () => {
      // 取得 api 列表
      const { data }: { data: Array<ITeacherData> } = await request(
        '/api/teacher'
      )
      setTeacherList(
        useMockData
          ? teacherList
          : data.map(teacher => ({ ...teacher, key: teacher.id }))
      )
    })()
  }, [setTeacherList])

  useEffect(() => {
    setStudentList(studentList)
  }, [setStudentList])

  useEffect(() => {
    ;(async () => {
      // 取得 api 列表
      const apiList: IResponseData = await request('/api')
      console.log('apiList', apiList)
    })()
  }, [])
}

// 重新取得紀錄
export const useReloadData = () => {
  const setArr: SetterOrUpdater<Array<IAttendenceData>> =
    useSetRecoilState(attendRecordState)

  useEffect(() => {
    // ToDo 從server取得資料
    console.log('reload')
    setArr(records)
  }, [setArr])

  const setCourseList: SetterOrUpdater<Array<ICourseData>> =
    useSetRecoilState(courseListState)

  useEffect(() => {
    setCourseList(courses)
  }, [setCourseList])
}
