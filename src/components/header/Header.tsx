import React, { useState, useEffect } from 'react'
import logo from '../../assets/images/logo.svg'
import { GlobalOutlined } from '@ant-design/icons'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import styles from './Header.module.css'
import { useHistory } from 'react-router-dom'
// useLocation, useParams, useRouteMatch
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { addLanguageCreator, changeLanguageCreator } from '../../redux/language/languageActions'
import { useTranslation } from 'react-i18next'
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { userSlice } from '../../redux/user/slice'

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const history = useHistory()
  // const location = useLocation()
  // const params = useParams()
  // const match = useRouteMatch()
  const language = useSelector(state => state.language.language)
  const languageList = useSelector(state => state.language.languageList)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const jwt = useSelector(s => s.user.token)
  const [username, setUsername] = useState('')
  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const menuHandleClick = e => {
    if (e.key === 'new') {
      dispatch(addLanguageCreator('new_lang', '新语言'))
      return
    }
    dispatch(changeLanguageCreator(e.key))
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    history.push('/')
    window.location.reload()
  }

  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuHandleClick}>
                {languageList.map(item => {
                  return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                })}
                <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : '英文'}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles['button-group']}>
              <span>
                {t('header.welcome')}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={() => history.push('/shoppingCart')}>
                {t('header.shoppingCart')}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t('header.signOut')}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => history.push('/')}>
          <img className={styles['App-logo']} src={logo} alt="" />
          <Typography.Title className={styles.title} level={3}>
            {t('header.title')}
          </Typography.Title>
        </span>

        <Input.Search className={styles['search-input']} placeholder="请输入目的地" onSearch={keywords => history.push('/search/' + keywords)} />
      </Layout.Header>
      <Menu className={styles['main-menu']} mode={'horizontal'}>
        <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
        <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
        <Menu.Item key={3}>{t('header.group')}</Menu.Item>
        <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
        <Menu.Item key="5"> {t('header.private')} </Menu.Item>
        <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
        <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
        <Menu.Item key="8"> {t('header.local')} </Menu.Item>
        <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
        <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
        <Menu.Item key="11"> {t('header.study')} </Menu.Item>
        <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
        <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
        <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
        <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
        <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
      </Menu>
    </div>
  )
}
