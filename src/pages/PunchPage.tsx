import { Button, DatePicker, Form, message, Select, TimePicker } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { useStudentOfTeacher } from '../components/common/CustomHook'
import { loginState } from '../recoil'
import { eErrorCode, IResponseData, request } from '../server'
const { Option } = Select

interface ISubject {
  key: number
  name: string
}

const subjects: Array<ISubject> = [
  { key: 0, name: '木吉他' },
  { key: 1, name: '電吉他' },
  { key: 2, name: '編曲' },
]

interface IPunchFormData {
  student: string
  subject: string
  date: moment.Moment
  time: moment.Moment
}

const StyledPunchPageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const StyledFrom = styled(Form)`
  background-color: #fff;
  border: 1px solid #000;
  padding: 28px;
  padding-bottom: 0;
  max-width: 300px;
  width: 50%;

  .login-form-button {
    width: 100%;
  }
`

const PunchPage = () => {
  const { username }: ILoginState = useRecoilValue(loginState)
  const students: Array<IStudentData> = useStudentOfTeacher(username)

  const [form] = useForm()
  const handleFinish = async (values: unknown) => {
    const { student, subject, date, time }: IPunchFormData =
      values as IPunchFormData

    const { code, data }: IResponseData = await request('/api/course', 'POST', {
      data: {
        student_name: student,
        subject,
        time: moment(date).hour(time.hour()).minute(time.minute()).second(0),
      },
    })
    if (code < eErrorCode.success) {
      message.error(`新增課程失敗 ${code}`)
      return
    }

    message.success(
      '打卡成功' + moment(data.time).format('YYYY-MM-DD, HH:mm:ss')
    )
  }

  return (
    <StyledPunchPageContainer>
      <StyledFrom
        form={form}
        name='punch_form'
        initialValues={{
          subject: subjects[0].name,
          date: moment(),
          time: moment().minute(0),
        }}
        onFinish={handleFinish}
      >
        <Form.Item label='老師'>
          <span style={{ paddingLeft: 12, textDecoration: 'underline' }}>
            {username}
          </span>
        </Form.Item>
        {/* 學生 */}
        <Form.Item name='student' label='學生' rules={[{ required: true }]}>
          <Select>
            {students.map(({ id, name }) => (
              <Option key={id} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* 課程 */}
        <Form.Item name='subject' label='課程' rules={[{ required: true }]}>
          <Select>
            {subjects.map(({ key, name }) => (
              <Option key={key} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* 打卡時間 */}
        <Form.Item name='date' label='日期' rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name='time' label='時間' rules={[{ required: true }]}>
          <TimePicker format='HH:mm' minuteStep={15} />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            打卡
          </Button>
        </Form.Item>
      </StyledFrom>
    </StyledPunchPageContainer>
  )
}

export default PunchPage
