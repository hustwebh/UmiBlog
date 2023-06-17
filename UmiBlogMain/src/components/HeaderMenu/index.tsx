import React, { useState, useEffect, createContext } from 'react';
import { Menu, Drawer, Button, Dropdown, Modal, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { connect } from 'dva';
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
} from '@ant-design/icons';
import { Link } from 'umi';
// import UserAvatar from '@/components/UserAvatar'
import storageHelper from '@/utils/storage';
import ModalForm from '../ModalForm';

import styles from './index.less';

const items: MenuProps['items'] = [
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
];

const Index: React.FC = (props: any) => {
  const { dispatch, account, history, location } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const showDrawer = () => {
    setMenuOpen(true);
  };
  const onClose = () => {
    setMenuOpen(false);
  };
  const logout = () => {
    storageHelper.clear('user');
    if (dispatch) {
      dispatch({ type: 'user/logout' });
    }
  };
  const handleClick: MenuProps['onClick'] = (e) => {
    history.push(`/${e.key}`);
  };

  const userEvent = (type: string) => {
    setModalOpen(true);
    setModalType(type);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const typeHandler = (type: string) => {
    console.log('type', type)
    setModalType(type);
  };

  return (
    <>
      {/* // <ReachableContext.Provider value={}> */}
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
                items={items}
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
          {account && account.email && account.id ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="write-article-key">
                    <Link to="/write/new">写文竄1�7</Link>
                  </Menu.Item>
                  <Menu.Item key="drafts-key">
                    <Link to="/drafts">草稿箄1�7</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  {/* <Menu.Item key="write-course-key">
                    <Link to="/write/course">写教稄1�7</Link>
                  </Menu.Item> */}
                  {/* <Menu.Divider /> */}
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
                    逢�凄1�7
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {account.avatar ? (
                  <Avatar src={account.avatar} />
                ) : (
                  <Avatar icon={<UserOutlined />}/>
                )}
              </a>
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
            <span>导航栄1�7</span>
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
  );
};

const mapStateToProps = ({
  user: { account },
}: {
  user: {
    account: any;
  };
}) => {
  return {
    account,
  };
};

export default connect(mapStateToProps)(Index);
