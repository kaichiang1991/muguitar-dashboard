import { useEffect, useState } from 'react'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  attendRecordState,
  courseListState,
  loginState,
  studentListState,
  teacherListState,
} from '../../recoil'
import records from '../../mock/attendence'
import teacherList from '../../mock/teacher'
import studentList from '../../mock/student'
import courses from '../../mock/course'
import { eErrorCode, IResponseData, request } from '../../server'
import { message } from 'antd'

const useMockData: boolean =
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TESTDATA === 'true'

export const useLoadDataOnce = () => {
  const setTeacherList: SetterOrUpdater<Array<ITeacherData>> =
    useSetRecoilState(teacherListState)

  const setStudentList: SetterOrUpdater<Array<IStudentData>> =
    useSetRecoilState(studentListState)

  useEffect(() => {
    ;(async () => {
      // 取得 teacher 列表
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
    ;(async () => {
      // 取得 student 列表
      const { data }: { data: Array<IStudentData> } = await request(
        '/api/student'
      )
      setStudentList(
        useMockData
          ? studentList
          : data.map(student => ({ ...student, key: student.id }))
      )
    })()
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

/**
 * 取得教師的學生列表
 * @param {string} teacher_name 教師名字
 * @returns {Array<IStudentData>}
 */
export const useStudentOfTeacher = (
  teacher_name: string
): Array<IStudentData> => {
  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)

  const [students, setStudents] = useState<Array<IStudentData>>([])
  useEffect(() => {
    console.log('use student of teacher')
    ;(async () => {
      const teacher: ITeacherData = teacherList.find(
        ({ name }) => name === teacher_name
      )!
      if (!teacher) {
        message.error(`找不到教師 ${teacher_name} 的資料`)
        return
      }

      const { code, data }: IResponseData = await request(
        `/api/find/student/${teacher_name}/teacher_name`
      )
      if (code < eErrorCode.success) {
        message.warn(`找不到 ${teacher_name} 的學生 ${code}`)
        return
      }

      setStudents(data)
    })()
  }, [teacherList, setStudents])

  return students
}
