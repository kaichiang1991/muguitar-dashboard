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

export const useLoadDataOnce = () => {
  const setTeacherList: SetterOrUpdater<Array<ITeacherData>> =
    useSetRecoilState(teacherListState)

  const setStudentList: SetterOrUpdater<Array<IStudentData>> =
    useSetRecoilState(studentListState)

  useEffect(() => {
    // ToDo 從server取得資料
    setTeacherList(teacherList)
  }, [setTeacherList])

  useEffect(() => {
    setStudentList(studentList)
  }, [setStudentList])
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
