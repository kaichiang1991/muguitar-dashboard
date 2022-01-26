import { useEffect, useState } from 'react'
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  attendRecordState,
  courseListWithTeacherState,
  studentListState,
  teacherListState,
} from '../../recoil'
import records from '../../mock/attendence'
import mockTeacherList from '../../mock/teacher'
import studentList from '../../mock/student'
import { eErrorCode, IResponseData, request } from '../../server'
import { message } from 'antd'
import moment from 'moment'
import { teacherColorArr, teacherColorMap } from '../../data/constants'

const useMockData: boolean =
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TESTDATA === 'true'

export const useLoadDataOnce = () => {
  const [teacherList, setTeacherList] =
    useRecoilState<Array<ITeacherData>>(teacherListState)

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
          ? mockTeacherList
          : data.map(teacher => ({ ...teacher, key: teacher.id }))
      )
    })()
  }, [setTeacherList])

  // 設定每個教師用的顏色
  useEffect(() => {
    teacherList.forEach(({ name }, index) => {
      teacherColorMap[name] = teacherColorArr[index]
    })
  }, [teacherList])

  useEffect(() => {}, [])

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

  const setCourseWithTeacher: SetterOrUpdater<Array<ICourseTableData>> =
    useSetRecoilState(courseListWithTeacherState)

  useEffect(() => {
    ;(async () => {
      const { code, data }: IResponseData = await request(
        '/api/find/course/withTeacher'
      )
      if (code < eErrorCode.success) {
        message.error(`找所有出席紀錄錯誤 ${code}`)
        return
      }

      const newCourseData: Array<ICourseTableData> = data.map(
        (_data: ICourseWithTeacher) => {
          const {
            id,
            time,
            Student: {
              name: student,
              Teacher: { name: teacher },
            },
          } = _data
          const date: moment.Moment = moment(time)
          return { id, teacher, student, date }
        }
      )

      setCourseWithTeacher(newCourseData)
    })()
  }, [setCourseWithTeacher])
}

/**
 * 取得教師的學生列表
 * @param {number} teacher_id 教師id
 * @returns {Array<IStudentData>}
 */
export const useStudentOfTeacher = (
  teacher_id: number
): Array<IStudentData> => {
  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)

  const [students, setStudents] = useState<Array<IStudentData>>([])
  useEffect(() => {
    ;(async () => {
      const teacher: ITeacherData = teacherList.find(
        ({ id }) => id === teacher_id
      )!
      if (!teacher) {
        message.error(`找不到教師id ${teacher_id} 的資料`)
        return
      }

      const { code, data }: IResponseData = await request(
        `/api/find/student/${teacher_id}/teacher_id`
      )
      if (code < eErrorCode.success) {
        message.warn(`找不到 id ${teacher_id} 的學生 ${code}`)
        return
      }

      setStudents(data)
    })()
  }, [teacher_id, teacherList, setStudents])

  return students
}
