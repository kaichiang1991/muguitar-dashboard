import React, { FC, HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import { Calendar, Badge, Popover, PopoverProps } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { PresetStatusColorType } from 'antd/lib/_util/colors'
import { useReloadAttendence } from '../components/common/CustomHook'
import { useRecoilValue } from 'recoil'
import { attendRecordState } from '../recoil'

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
  const [teacher, student] = props.content.split('-')
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
  type: PresetStatusColorType | string
  content: string
}

// 取得每天行事曆資料
const getListData = (
  value: moment.Moment,
  records: Array<IAttendenceData>
): Array<IListData> => {
  const mapRecord = records
    .filter(({ date }) => value.isSame(date, 'day'))
    .map(({ teacher, student }) => ({
      type:
        teacher === 'Run' ? 'success' : teacher === 'Kai' ? 'warning' : 'error',
      content: `${teacher} - ${student}`,
    }))

  return mapRecord || []
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
    background-color: ${({ status }) =>
      status === 'success'
        ? '#52c41a'
        : status === 'warning'
        ? '#faad14'
        : status === 'error'
        ? '#ff4d4f'
        : 'gray'};
  }
`

const dateCellRender = (
  _moment: moment.Moment,
  records: Array<IAttendenceData>
): ReactNode => {
  const listData = getListData(_moment, records)

  return (
    <StyledDateUl>
      {listData.map(({ content, type }) => (
        <CalenderListItem key={content} content={content}>
          <StyledBadge status={type as PresetStatusColorType} text={content} />
        </CalenderListItem>
      ))}
    </StyledDateUl>
  )
}
//#endregion dateCellRender

const SteyldCalenderContainer = styled(Calendar)`
  padding-right: 8px;
`

const CalenderPage: FC = () => {
  useReloadAttendence()
  const records: Array<IAttendenceData> = useRecoilValue(attendRecordState)
  return (
    <SteyldCalenderContainer dateCellRender={v => dateCellRender(v, records)} />
  )
}

export default CalenderPage
