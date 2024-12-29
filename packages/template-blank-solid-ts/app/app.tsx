import { Route, RouteDefinition, StackRouter } from 'solid-navigation'
import Home from './components/home'

declare module 'solid-navigation' {
  export interface Routers {
    Default: {
      Home: RouteDefinition
    }
  }
}

const App = () => {
  return (
    <StackRouter initialRouteName="Home">
      <Route name="Home" component={Home} />
    </StackRouter>
  )
}

export { App }
