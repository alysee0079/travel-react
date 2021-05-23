import React from 'react'
import styles from './SearchPage.module.css'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layouts/mainLayout'

interface MathParams {
  keywords: string
}

export const Searchpage: React.FC = () => {
  const { keywords } = useParams<MathParams>()

  const loading = useSelector(state => state.productSearch.loading)
  const error = useSelector(state => state.productSearch.error)
  const pagination = useSelector(state => state.productSearch.pagination)
  const productList = useSelector(state => state.productSearch.data)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(
      searchProduct({
        nextPage: 1,
        pageSize: 10,
        keywords,
      })
    )
  }, [location])

  const onPageChange = (nextPage, pageSize) => {
    dispatch(
      searchProduct({
        nextPage,
        pageSize,
        keywords,
      })
    )
  }

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    )
  }
  if (error) {
    return <div>'网站出错'</div>
  }
  return (
    <MainLayout>
      <div className={styles['page-content']}>
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        <div className={styles['product-list-container']}>
          <ProductList data={productList} paging={pagination} onPageChange={onPageChange} />
        </div>
      </div>
    </MainLayout>
  )
}
