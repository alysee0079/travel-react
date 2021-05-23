import React from 'react'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GifOutlined } from '@ant-design/icons'

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((n, index) => {
        return (
          <Menu.SubMenu
            key={`side-menu-${index}`}
            title={
              <span>
                <GifOutlined />
                {n.title}
              </span>
            }
          >
            {n.subMenu.map((sm, smindex) => {
              return (
                <Menu.SubMenu
                  key={`sub-menu-${smindex}`}
                  title={
                    <span>
                      <GifOutlined />
                      {sm.title}
                    </span>
                  }
                >
                  {sm.subMenu.map((sms, smsindex) => {
                    return (
                      <Menu.Item
                        key={`sub-sub-ment-${smsindex}`}
                        title={
                          <span>
                            <GifOutlined />
                            {sms}
                          </span>
                        }
                      ></Menu.Item>
                    )
                  })}
                </Menu.SubMenu>
              )
            })}
          </Menu.SubMenu>
        )
      })}
    </Menu>
  )
}
