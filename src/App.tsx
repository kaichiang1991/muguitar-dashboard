import 'antd/dist/antd.css'
import GlobalStyle from './components/styles/global'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import MainPage from './pages/MainPage'
import { useRecoilValue } from 'recoil'
import LoginPage from './pages/LoginPage'
import { useEffect } from 'react'
import { ILoginState, loginState } from './recoil'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'

const App = () => {
  const history = useHistory()
  const { username }: ILoginState = useRecoilValue(loginState)
  useEffect(() => {
    console.log('username', username)
    if (username) {
      history.push('/dashboard')
    } else {
      history.push('/login')
    }
  }, [history, username])
  return (
    <ConfigProvider locale={zhTW}>
      <GlobalStyle />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/dashboard' component={MainPage} />
        <Route path='/dashboard/:subtitle' />
        <Redirect to='/dashboard' />
      </Switch>
    </ConfigProvider>
  )
}

export default App
