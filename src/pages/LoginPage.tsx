import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { loginState } from '../recoil'

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
}

const LoginPage = () => {
  const setLoginState = useSetRecoilState(loginState)
  const [form] = useForm()

  const handleFinish = (values: unknown) => {
    const { username, password } = values as IFormValues

    // ToDo 檢查帳號密碼
    if (false) {
      form.resetFields()
      message.error('帳號或密碼錯誤')
    } else {
      setLoginState({
        username,
        password,
      })
    }
  }

  return (
    <StyledLoginPageContainer>
      <StyledForm
        form={form}
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </StyledForm>
    </StyledLoginPageContainer>
  )
}

export default LoginPage
