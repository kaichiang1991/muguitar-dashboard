import 'antd/dist/antd.css'
import GlobalStyle from './components/styles/global'
import DefaultLayout from './components/layout/DefaultLayout'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <GlobalStyle />
        Content
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default App
