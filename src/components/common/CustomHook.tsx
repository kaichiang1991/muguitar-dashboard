import moment from 'moment'
import { useEffect } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { attendRecordState } from '../../recoil'
import { record } from '../../mock/attendence'

// 重新取得出席紀錄
export const useReloadAttendence = () => {
  const setArr: SetterOrUpdater<Array<IAttendenceData>> =
    useSetRecoilState(attendRecordState)

  useEffect(() => {
    // ToDo 從server取得資料
    console.log('reload')
    setArr([
      ...record,
      { key: 'abc', teacher: 'Kai', student: 'CC', date: moment([2022, 0, 1]) }, // 2022-1-1
    ])
  }, [setArr])
}
