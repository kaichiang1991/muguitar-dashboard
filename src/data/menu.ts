import Icon, {
  AppleFilled,
  CalendarOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { MenuItemProps } from 'antd'

type IconType = typeof Icon

interface IBrandDef {
  name: string // 品牌名稱
  icon: IconType // Logo 圖標
}

export const brandDef: IBrandDef = {
  name: 'BRAND',
  icon: AppleFilled,
}

interface IMenuObj extends MenuItemProps {
  key: string // MenuItem key
  IconElement: IconType // Icon
  name: string // 顯示名稱
  to: string // router 路徑
}

const menu: Array<IMenuObj> = [
  {
    key: '0',
    IconElement: DashboardOutlined,
    name: '123',
    to: '/123',
  },
  {
    key: '1',
    IconElement: CalendarOutlined,
    name: '456',
    to: '/456',
  },
]

export default menu
