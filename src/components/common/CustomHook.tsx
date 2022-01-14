import { useEffect } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import {
  attendRecordState,
  studentListState,
  teacherListState,
} from '../../recoil'
import records from '../../mock/attendence'
import teacherList from '../../mock/teacher'
import studentList from '../../mock/student'

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

// 重新取得出席紀錄
export const useReloadAttendence = () => {
  const setArr: SetterOrUpdater<Array<IAttendenceData>> =
    useSetRecoilState(attendRecordState)

  useEffect(() => {
    // ToDo 從server取得資料
    console.log('reload')
    setArr(records)
  }, [setArr])
}
