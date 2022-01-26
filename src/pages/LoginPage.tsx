import { LockOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input, message, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { FC, Fragment, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { useLoadDataOnce } from '../components/common/CustomHook'
import { loginState, teacherListState } from '../recoil'
import { eErrorCode, IResponseData, request } from '../server'

const RegisterFragment: FC = () => {
  useLoadDataOnce()
  const teacherList: Array<ITeacherData> = useRecoilValue(teacherListState)

  return (
    <Fragment>
      <Divider>註冊</Divider>
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input username' }]}
      >
        <Input prefix={<UserAddOutlined />} placeholder='使用者名稱' />
      </Form.Item>
      <Form.Item
        name='teacher_id'
        rules={[{ required: true, message: 'Please Select Teacher' }]}
      >
        <Select>
          {teacherList.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Fragment>
  )
}

const StyledLoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);

  display: flex;
  justify-content: space-around;
  align-items: center;
`

const StyledForm = styled(Form)`
  background-color: #fff;
  border: 1px solid #000;
  padding: 28px;
  padding-bottom: 0;
  max-width: 300px;

  .login-form-button {
    width: 100%;
  }
`

interface IFormValues extends ILoginState {
  remember?: boolean
  teacher_id: number
}

const LoginPage = () => {
  const setLoginState = useSetRecoilState(loginState)
  const [form] = useForm()
  const [isRegistered, setIsRegistered] = useState(true)

  const handleFinish = async (values: unknown) => {
    const { account, password, username, teacher_id } = values as IFormValues
    let loginData: ILoginState

    if (isRegistered) {
      // 登入
      // 檢查帳號密碼
      const { code, data }: IResponseData = await request(
        `/api/user/identify/${account}/${password}`
      )

      if (code < eErrorCode.success) {
        message.error('登入訊息錯誤')
        return
      }

      loginData = data
    } else {
      // 註冊
      const { code, data }: IResponseData = await request(`/api/user`, 'POST', {
        data: {
          teacher_id,
          account,
          password,
          username,
        },
      })

      if (code < eErrorCode.success) {
        message.error(
          code === eErrorCode.notFound
            ? '教師不存在'
            : data === 'SequelizeUniqueConstraintError'
            ? '老師已有帳號'
            : `其他錯誤 ${data}`
        )
        return
      }

      loginData = data
    }

    if (loginData) {
      setLoginState(loginData)
    }
  }

  return (
    <StyledLoginPageContainer>
      <StyledForm
        form={form}
        name='normal_login'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <Form.Item
          name='account'
          rules={[{ required: true, message: 'Please input your account!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder='Account' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        {isRegistered ? (
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
        ) : (
          <RegisterFragment />
        )}

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            {isRegistered ? '登入' : '註冊'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type='link'
            htmlType='button'
            className='login-form-button'
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? '註冊' : '登入'}
          </Button>
        </Form.Item>
      </StyledForm>
    </StyledLoginPageContainer>
  )
}

export default LoginPage
