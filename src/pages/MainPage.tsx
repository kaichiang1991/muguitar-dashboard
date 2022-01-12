import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../components/layout/DefaultLayout'
import CalenderPage from './CalenderPage'
import Dashboard from './Dashboard'

interface Props {}

const MainPage = (props: Props) => {
  return (
    <DefaultLayout>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/calender' component={CalenderPage} />
      </Switch>
    </DefaultLayout>
  )
}

export default MainPage
