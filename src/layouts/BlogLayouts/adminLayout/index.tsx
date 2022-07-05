import React, { useEffect } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import ProLayout from '@ant-design/pro-layout';
import { message } from 'antd';
import {
  FileTextOutlined,
  TagsOutlined,
  CommentOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

const routes = {
  routes: [
    {
      exact: true,
      name: '分类管理',
      icon: <ClusterOutlined />,
      path: '/admin/categories',
    },
    {
      exact: true,
      name: '标签管理',
      icon: <TagsOutlined />,
      path: '/admin/tags',
    },
    {
      exact: true,
      name: '文章管理',
      icon: <FileTextOutlined />,
      path: '/admin/articles',
    },
    {
      exact: true,
      name: '评论管理',
      icon: <CommentOutlined />,
      path: '/admin/comments',
    },
  ],
};

const Admin = (props: any) => {
  const { account, history } = props;
  useEffect(() => {
    // if (!account || !account.id) {
    //   message.info("请先完成登录")
    //   history.push('/blog')
    // }
    // if (account.account_type !== 'ADMIN') {
    //   history.push('/404')
    // }
  }, []);
  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        title="后台管理中心"
        logo={null}
        siderWidth={200}
        contentWidth="Fluid"
        navTheme="light"
        fixSiderbar={true}
        fixedHeader={true}
        route={routes}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
      >
        {props.children}
      </ProLayout>
    </div>
  );
};

export default connect(
  ({
    user: { account },
    loading,
  }: {
    user: {
      account: any;
    };
    loading: any;
  }) => ({
    account,
    loading,
  }),
)(Admin);
