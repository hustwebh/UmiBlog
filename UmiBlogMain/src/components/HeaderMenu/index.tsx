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
    label: '鏂囩珷',
    key: 'artical',
    icon: <CopyOutlined />,
    children: [
      { label: '棣栭〉', key: 'blog', icon: <EnvironmentOutlined /> },
      { label: '鍒嗙被', key: 'classes', icon: <UnorderedListOutlined /> },
      { label: '鏍囩', key: 'tags', icon: <TagsOutlined /> },
    ],
  },
  {
    label: '鎼滅储',
    key: 'search',
    icon: <SearchOutlined />,
  },
  {
    label: '鍙嬮摼',
    key: 'friends',
    icon: <SmileOutlined />,
  },
  {
    label: '鍏充簬',
    key: 'about',
    icon: <HighlightOutlined />,
  },
];

const Index: React.FC = (props: any) => {
  const { dispatch, account, history, location } = props;

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const showDrawer = () => {
    setMenuVisible(true);
  };
  const onClose = () => {
    setMenuVisible(false);
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
    setModalVisible(true);
    setModalType(type);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const typeHandler = (type: string) => {
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
            <span>鐢ㄦ埛鍚�</span>
          </div>
        </div>
        <div className={styles.homeHeaderRight}>
          {account && account.email && account.id ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="write-article-key">
                    <Link to="/write/new">鍐欐枃绔�</Link>
                  </Menu.Item>
                  <Menu.Item key="drafts-key">
                    <Link to="/drafts">鑽夌ǹ绠�</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  {/* <Menu.Item key="write-course-key">
                    <Link to="/write/course">鍐欐暀绋�</Link>
                  </Menu.Item> */}
                  {/* <Menu.Divider /> */}
                  {account.account_type === 'ADMIN' ? (
                    <Menu.Item key="manager-center-key">
                      <Link to="/admin">绠＄悊涓績</Link>
                    </Menu.Item>
                  ) : (
                    ''
                  )}
                  <Menu.Item key="user-center-key">
                    <Link to="/account">涓汉涓績</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout-key" onClick={logout}>
                    閫€鍑�
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {/* <UserAvatar src={account.avatar} size="large" /> */}
                {account.avatar ? (
                  <Avatar size={props.size || 'default'} src={account.avatar} />
                ) : (
                  <Avatar
                    size={props.size || 'default'}
                    icon={<UserOutlined />}
                  />
                )}
              </a>
            </Dropdown>
          ) : (
            <span>
              <Button
                onClick={() => userEvent('鐧诲綍')}
                type="dashed"
                className={styles.linkBtn}
              >
                鐧诲綍
              </Button>
              <span className="pd-5"> </span>
              <Button
                onClick={() => userEvent('娉ㄥ唽')}
                type="dashed"
                className={styles.linkBtn}
              >
                娉ㄥ唽
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
            <span>瀵艰埅鏍�</span>
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
        ></Menu>
      </Drawer>

      <Modal visible={modalVisible} onCancel={handleCancel} footer={null}>
        <ModalForm
          title={modalType}
          dispatch={dispatch}
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
