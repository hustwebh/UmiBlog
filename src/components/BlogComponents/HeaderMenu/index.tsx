import React, { useState, useEffect, createContext } from 'react'
import { Menu, Drawer, Button, Dropdown, Modal } from 'antd'
import type { MenuProps } from 'antd';
import { connect } from 'dva'
import {
  MenuOutlined,
  HomeOutlined,
  BookTwoTone,
  SearchOutlined,
  UnorderedListOutlined,
  HighlightOutlined,
  TagsOutlined,
  MessageOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { Link } from 'umi'
// import UserAvatar from '@/components/UserAvatar'
import storageHelper from '@/utils/storage'
import ModalForm from '../ModalForm'

import styles from './index.less'


const items: MenuProps["items"] = [
  {
    label: '文章',
    key: 'artical',
    icon: <BookTwoTone />,
    children: [
      { label: '搜索', key: 'search', icon: <SearchOutlined /> },
      { label: '分类', key: 'classes', icon: <UnorderedListOutlined /> },
      { label: '标签', key: 'tags', icon: <TagsOutlined /> }
    ]
  },
  {
    label: '说说',
    key: 'shortSpeak',
    icon: <MessageOutlined />,
  },
  {

    label: '友链',
    key: 'friends',
    icon: <SmileOutlined />,

  },
  {
    label: '关于',
    key: 'about',
    icon: <HighlightOutlined />
  }
]

const Index: React.FC = (props: any) => {
  const { dispatch, account, history } = props

  const [menuVisible, setMenuVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalLoading,setModalLoading] = useState(false)

  useEffect(() => { }, [])

  const showDrawer = () => {
    setMenuVisible(true)
  }
  const onClose = () => {
    setMenuVisible(false)
  }
  const logout = () => {

  }
  const handleClick: MenuProps['onClick'] = e => {
    history.push(`/${e.key}`)
  }

  const userEvent = (type: string) => {
    setModalVisible(true)
    setModalType(type)
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  const typeHandler = (type:string)=>{
    setModalType(type);
  }

  return (
    <>
    {/* // <ReachableContext.Provider value={}> */}
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderLeft}>
          <div className={styles.homeHeaderPc}>
            <Link to="/" className={styles.brand} style={{ height: 64 }}>
              <HomeOutlined />
            </Link>
            <Menu
              mode="horizontal"
              style={{ height: '64px', borderBottom: 'none', marginLeft: 40, minWidth: 552 }}
              items={items}
              onClick={handleClick}
              builtinPlacements={{
                bottomLeft: {
                  points: ['tc', 'bc'],
                  overflow: {
                    adjuxtX: 1,
                    adjuxtY: 1
                  },
                  offset: [0, 5]
                }
              }}
            >
            </Menu>
          </div>
          <div className={styles.homeHeaderMobile}>
            <Button type="link" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <span>用户名</span>
          </div>
        </div>
        <div className={styles.homeHeaderRight}>
          {account && account.email && account.id ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="write-article-key">
                    <Link to="/write/draft/new">写文章</Link>
                  </Menu.Item>
                  <Menu.Item key="drafts-key">
                    <Link to="/write/drafts">草稿箱</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="write-course-key">
                    <Link to="/write/course">写教程</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  {account.account_type === 'ADMIN' ? (
                    <Menu.Item key="manager-center-key">
                      <Link to="/admin">管理中心</Link>
                    </Menu.Item>
                  ) : (
                    ''
                  )}
                  <Menu.Item key="user-center-key">
                    <Link to="/account">个人中心</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout-key" onClick={logout}>
                    退出
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                {/* <UserAvatar src={account.avatar} size="large" /> */}
              </a>
            </Dropdown>
          ) : (
            <span>
              {/* <Link to="/login">登录</Link> */}
              <Button onClick={() => (userEvent('登录'))}>登录</Button>
              <span className="pd-5">·</span>
              <Button onClick={() => (userEvent('注册'))}>注册</Button>
              {/* <Link to="/register">注册</Link> */}
            </span>
          )}
        </div>
      </div>
      <Drawer
        title={
          <>
            <Link to="/" className="brand mr-10">
              <HomeOutlined />
            </Link>
            <span>导航栏</span>
          </>
        }
        placement="left"
        closable
        onClose={onClose}
        visible={menuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          onClick={handleClick}
          // selectedKeys={['artical']}
          mode="inline"
          items={items}
        >
        </Menu>
      </Drawer>
      
        <Modal 
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}>
        <ModalForm title={modalType} dispatch={dispatch} typeHandler={typeHandler}/>
        </Modal>
      {/* </ReachableContext.Provider> */}
      </>
  );
};

export default Index;