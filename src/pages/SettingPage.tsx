import StudentEditList from '../components/StudentEditList'
import TeacherEditList from '../components/TeacherEditList'

interface Props {}

const SettingPage = (props: Props) => {
  return (
    <>
      <TeacherEditList />
      <StudentEditList />
    </>
  )
}

export default SettingPage
