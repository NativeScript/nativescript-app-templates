import { Route, StackRouter } from 'solid-navigation'
import Home from './components/home.jsx'

const App = () => {
  return (
    <StackRouter initialRouteName="Home">
      <Route name="Home" component={Home} />
    </StackRouter>
  )
}

export { App }
