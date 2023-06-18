import React, { useState, useEffect, createContext } from 'react'
import { Menu, Drawer, Button, Dropdown, Modal, Avatar, Divider } from 'antd'
import type { MenuProps } from 'antd'
import { connect } from 'dva'
import {
  MenuOutlined,
  HomeOutlined,
  CopyOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  HighlightOutlined,
  TagsOutlined,
  MessageOutlined,
  SmileOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, history, useDispatch } from '@umijs/max'
// import UserAvatar from '@/components/UserAvatar'
import storageHelper from '@/utils/storage'
import ModalForm from '../ModalForm'

import styles from './index.less'

const topMenuItems: MenuProps['items'] = [
  {
    label: '文章',
    key: 'artical',
    icon: <CopyOutlined />,
    children: [
      { label: '首页', key: 'blog', icon: <EnvironmentOutlined /> },
      { label: '分类', key: 'classes', icon: <UnorderedListOutlined /> },
      { label: '标签', key: 'tags', icon: <TagsOutlined /> },
    ],
  },
  {
    label: '搜索',
    key: 'search',
    icon: <SearchOutlined />,
  },
  {
    label: '友链',
    key: 'friends',
    icon: <SmileOutlined />,
  },
  {
    label: '关于',
    key: 'about',
    icon: <HighlightOutlined />,
  },
]

const Index: React.FC = (props: any) => {
  const { account, location } = props
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    setModalOpen(false)
  }, [account])
  const showDrawer = () => {
    setMenuOpen(true)
  }
  const onClose = () => {
    setMenuOpen(false)
  }
  const logout = () => {
    dispatch({ type: 'user/logout' })
  }
  const handleClick: MenuProps['onClick'] = (e) => {
    history.push(`/${e.key}`)
  }

  const userEvent = (type: string) => {
    setModalOpen(true)
    setModalType(type)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const typeHandler = (type: string) => {
    setModalType(type)
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to='/write/new'>
          写文章
        </Link>
      ),
      key: "/write/new"
    },
    {
      label: (
        <Link to='/drafts'>
          草稿箱
        </Link>
      ),
      key: "/drafts"
    },
    {
      label: (
        account?.account_type === 'ADMIN' && <Link to="/admin">管理中心</Link>
      ),
      key: '/admin'
    },
    {
      label: (
        <div>
          <Divider style={{ margin: 0, marginBottom: 10 }} />
          <div onClick={logout}>
            退出登录
          </div>
        </div>
      ),
      key: "logout"
    },
  ]

  return (
    <>
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderLeft}>
          <div className={styles.homeHeaderPc}>
            <div>
              <Link to="/" className={styles.brand} style={{ height: 60 }}>
                <HomeOutlined />
              </Link>
            </div>
            <div>
              <Menu
                mode="horizontal"
                style={{
                  height: '64px',
                  borderBottom: 'none',
                  marginLeft: 40,
                  minWidth: 552,
                }}
                items={topMenuItems}
                onClick={handleClick}
                builtinPlacements={{
                  bottomLeft: {
                    points: ['tc', 'bc'],
                    overflow: {
                      adjuxtX: 1,
                      adjuxtY: 1,
                    },
                    offset: [0, 5],
                  },
                }}
              ></Menu>
            </div>
          </div>
          <div className={styles.homeHeaderMobile}>
            <Button type="link" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <span>用户各1�7</span>
          </div>
        </div>
        <div className={styles.homeHeaderRight}>
          {account && account.avatar ? (
            <Dropdown
              trigger={['click']}
              menu={{ items }}
            >
              {account.avatar ? (
                <Avatar src={account.avatar} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </Dropdown>
          ) : (
            <span>
              <Button
                onClick={() => userEvent('登录')}
                type="dashed"
                className={styles.linkBtn}
              >
                登录
              </Button>
              <span className="pd-5"> </span>
              <Button
                onClick={() => userEvent('注册')}
                type="dashed"
                className={styles.linkBtn}
              >
                注册
              </Button>
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
        open={menuOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          onClick={handleClick}
          // selectedKeys={['artical']}
          mode="inline"
          items={items}
        ></Menu>
      </Drawer>

      <Modal open={modalOpen} onCancel={handleCancel} footer={null}>
        <ModalForm
          title={modalType}
          typeHandler={typeHandler}
          handleCancel={handleCancel}
          location={location}
        />
      </Modal>
      {/* </ReachableContext.Provider> */}
    </>
  )
}

const mapStateToProps = ({
  user: { account },
}: {
  user: {
    account: any
  }
}) => {
  return {
    account,
  }
}

export default connect(mapStateToProps)(Index)
