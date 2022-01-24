import React, { FC, HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import { Calendar, Badge, Popover, PopoverProps } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { useReloadData } from '../components/common/CustomHook'
import { useRecoilValue } from 'recoil'
import { courseListState, teacherListState } from '../recoil'
import { teacherColorMap } from '../data/constants'

//#region Popover 移到項目上的提示
const StyledContent = styled.div`
  width: 100px;
  text-align: right;
`

interface IContentProps extends HTMLAttributes<HTMLDivElement> {
  student: string
}

const Content: FC<IContentProps> = ({ student }) => {
  return (
    <StyledContent>
      <span>學生： {student}</span>
    </StyledContent>
  )
}

interface IListPopoverProps extends PopoverProps {
  teacher?: string
  student: string
}

const ListPopOver: FC<IListPopoverProps> = ({ children, teacher, student }) => {
  return (
    <Popover
      placement={'topLeft'}
      title={teacher}
      content={() => <Content student={student} />}
    >
      {children}
    </Popover>
  )
}
//#endregion Popover

//#region List 自定義行事曆上點下去的項目
interface IListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  content: string
}

const CalenderListItem: FC<IListItemProps> = props => {
  const [teacher, student] = props.content.split('/')
  const handleClick = (e: any) => {
    console.log('handle click', props, teacher, student)
  }
  return (
    <ListPopOver teacher={teacher} student={student}>
      <li {...props} onClick={handleClick} />
    </ListPopOver>
  )
}
//#endregion List

//#region dateCellRender 每天行事曆的自定義元件
interface IListData {
  key: number
  teacherId: number
  student: string
}

// 取得每天行事曆資料
const getListData = (
  value: moment.Moment,
  records: Array<ICourseData>
): Array<IListData> => {
  return records
    .filter(({ time }) => value.isSame(time, 'day')) // 判斷同一天
    .map(({ key, teacherId, studentName }) => ({
      key,
      teacherId,
      student: studentName,
    }))
}

// 每日行事曆中的ul
const StyledDateUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

// li 裡面每個提示的顯示
const StyledBadge = styled(Badge)`
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    border-radius: 10px;
    background-color: ${props => props.color};
  }
`

const dateCellRender = (
  _moment: moment.Moment,
  records: Array<ICourseData>,
  teachers: Array<ITeacherData>
): ReactNode => {
  const listData: Array<IListData> = getListData(_moment, records)

  return (
    <StyledDateUl>
      {listData.map(({ teacherId, student }) => {
        const content: string = [
          teachers.find(({ id }) => id === teacherId)?.name,
          student,
        ].join(' / ')
        return (
          <CalenderListItem key={content} content={content}>
            <StyledBadge color={teacherColorMap[teacherId]} text={content} />
          </CalenderListItem>
        )
      })}
    </StyledDateUl>
  )
}
//#endregion dateCellRender

const SteyldCalenderContainer = styled(Calendar)`
  padding-right: 8px;
`

const CalenderPage: FC = () => {
  useReloadData()
  const courses: Array<ICourseData> = useRecoilValue(courseListState)
  const teachers: Array<ITeacherData> = useRecoilValue(teacherListState)

  return (
    <SteyldCalenderContainer
      dateCellRender={v => dateCellRender(v, courses, teachers)}
    />
  )
}

export default CalenderPage
