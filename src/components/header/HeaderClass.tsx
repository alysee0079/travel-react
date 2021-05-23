import React from 'react'
import logo from '../../assets/images/logo.svg'
import { GlobalOutlined } from '@ant-design/icons'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import styles from './Header.module.css'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { withTranslation, WithTranslation } from 'react-i18next'
import { changeLanguageCreator, addLanguageCreator } from '../../redux/language/languageActions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispathcToProps>

class HeaderComponent extends React.Component<PropsType> {
  menuHandleClick = e => {
    if (e.key === 'new') {
      this.props.addLanguage('new_lang', '新语言')
      return
    }
    this.props.changeLanguage(e.key)
  }

  render() {
    const { history, t } = this.props
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuHandleClick}>
                  {this.props.languageList.map(item => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  })}
                  <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : '英文'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img className={styles['App-logo']} src={logo} alt="" />
            <Typography.Title className={styles.title} level={3}>
              {t('header.title')}
            </Typography.Title>
          </span>

          <Input.Search className={styles['search-input']} placeholder="请输入目的地" />
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
}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  }
}

const mapDispathcToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'en' | 'zh') => {
      dispatch(changeLanguageCreator(code))
    },
    addLanguage: (name: string, code: string) => {
      dispatch(addLanguageCreator(name, code))
    },
  }
}

export const Header = connect(mapStateToProps, mapDispathcToProps)(withTranslation()(withRouter(HeaderComponent)))
