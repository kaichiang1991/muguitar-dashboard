import React, { FC, HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import { Calendar, Badge, Popover, PopoverProps } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { useReloadData } from '../components/common/CustomHook'
import { useRecoilValue } from 'recoil'
import { courseListWithTeacherState } from '../recoil'
import { teacherColorMap } from '../data/constants'

//#region Popover 移到項目上的提示
const StyledContent = styled.div`
  width: 100px;
  text-align: right;
  display: flex;
  flex-direction: column;
`

interface IContentProps extends HTMLAttributes<HTMLDivElement> {
  student: string
  date: moment.Moment
}

const Content: FC<IContentProps> = ({ student, date }) => {
  return (
    <StyledContent>
      <span>學生： {student}</span>
      <span>時間： {date.format('hh:mm')}</span>
    </StyledContent>
  )
}

interface IListPopoverProps extends PopoverProps {
  teacher: string
  student: string
  date: moment.Moment
}

const ListPopOver: FC<IListPopoverProps> = ({
  children,
  teacher,
  student,
  date,
}) => {
  return (
    <Popover
      placement={'topLeft'}
      title={teacher}
      content={() => <Content student={student} date={date} />}
    >
      {children}
    </Popover>
  )
}
//#endregion Popover

//#region List 自定義行事曆上點下去的項目
interface IListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  teacher: string
  student: string
  date: moment.Moment
}

const CalenderListItem: FC<IListItemProps> = props => {
  const handleClick = (e: any) => {
    // console.log('handle click', teacher, student)
  }

  const { teacher, student, date } = props
  return (
    <ListPopOver teacher={teacher} student={student} date={date}>
      <li {...props} onClick={handleClick} />
    </ListPopOver>
  )
}
//#endregion List

//#region dateCellRender 每天行事曆的自定義元件
interface IListData {
  id: number
  teacher: string
  student: string
  date: moment.Moment
}

// 取得每天行事曆資料
const getListData = (
  value: moment.Moment,
  courseList: Array<ICourseTableData>
): Array<IListData> =>
  courseList.filter(({ date }) => value.isSame(date, 'day')) // 判斷同一天

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

/**
 * 每天的行事曆 render 格式
 * @param _moment
 * @param courseList
 * @param teachers
 * @returns
 */
const dateCellRender = (
  _moment: moment.Moment,
  courseList: Array<ICourseTableData>
): ReactNode => {
  const listData: Array<IListData> = getListData(_moment, courseList)

  return (
    <StyledDateUl>
      {listData.map(({ id, teacher, student, date }) => {
        return (
          <CalenderListItem
            key={id}
            teacher={teacher}
            student={student}
            date={date}
          >
            <StyledBadge
              color={teacherColorMap[teacher]}
              text={[teacher, student].join(' / ')}
            />
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

  const courseList: Array<ICourseTableData> = useRecoilValue(
    courseListWithTeacherState
  )

  return (
    <SteyldCalenderContainer
      dateCellRender={v => dateCellRender(v, courseList)}
    />
  )
}

export default CalenderPage
