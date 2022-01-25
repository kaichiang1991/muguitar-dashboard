import Icon, {
  AppleFilled,
  BarcodeOutlined,
  CalendarOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { MenuItemProps } from 'antd'

type IconType = typeof Icon

interface IBrandDef {
  name: string // 品牌名稱
  Icon: IconType // Logo 圖標
}

export const brandDef: IBrandDef = {
  name: 'MuGuitar',
  Icon: AppleFilled,
}

export interface IMenuObj extends MenuItemProps {
  key: string // MenuItem key
  IconElement: IconType // Icon
  name: string // 顯示名稱
  to: string // router 路徑
}

const menuData: Array<IMenuObj> = [
  {
    key: '0',
    IconElement: DashboardOutlined,
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    key: '1',
    IconElement: CalendarOutlined,
    name: 'Calender',
    to: '/dashboard/calender',
  },
  {
    key: '2',
    IconElement: BarcodeOutlined,
    name: '打卡',
    to: '/dashboard/punch',
  },
  {
    key: '3',
    IconElement: SettingOutlined,
    name: 'Setting',
    to: '/dashboard/setting',
  },
]

export default menuData
