import React from 'react'
import { Row, Col, Affix } from 'antd'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { ProductList, PaymentCard } from '../../components'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice'
import { useHistory } from 'react-router-dom'

export const ShoppingCartPage: React.FC = props => {
  const loading = useSelector(s => s.shoppingCart.loading)
  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const jwt = useSelector(s => s.user.token) as string
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <div className={styles['payment-card-container']}>
            <Affix>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems.map(s => s.originalPrice).reduce((a, b) => a + b, 0)}
                price={shoppingCartItems.map(s => (s.originalPrice ? s.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (!shoppingCartItems.length) return
                  dispatch(checkout(jwt))
                  history.push('/placeOrder')
                }}
                onShoppingCartClear={() => {
                  dispatch(clearShoppingCartItem({ jwt, itemIds: shoppingCartItems.map(s => s.id) }))
                }}
              />
            </Affix>
          </div>
        </Col>
      </Row>
    </MainLayout>
  )
}
