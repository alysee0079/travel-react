import React, { useEffect } from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage, Searchpage, ShoppingCartPage, PlaceOrderPage } from './pages'
import { useSelector } from './redux/hooks'
import { useDispatch } from 'react-redux'
import { getShoppingCart } from './redux/shoppingCart/slice'

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = props => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/signIn',
        }}
      />
    )
  }
  return <Route render={routeComponent} {...rest} />
}

function App() {
  const jwt = useSelector(s => s.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keyword?" component={Searchpage} />
          <PrivateRoute path="/shoppingCart" isAuthenticated={jwt !== null} component={ShoppingCartPage} />
          <PrivateRoute path="/placeOrder" isAuthenticated={jwt !== null} component={PlaceOrderPage} />
          <Route render={() => <h1>not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
