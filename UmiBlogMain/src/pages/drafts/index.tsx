import React, { useEffect } from 'react';
import { Card, List, Skeleton, Tag, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import { Link } from 'umi';
import HeaderMenu from '@/components/HeaderMenu';
// import moment from 'moment'
import dayjs from 'dayjs';
import styles from './index.less';

const Draft = (props: any) => {
  const { dispatch, drafts, loading, account, history } = props;
  useEffect(() => {
    if (!account || !account.id) {
      message.info('请先完成登录');
      history.push('/blog');
    }
    if (dispatch) {
      dispatch({ type: 'write/drafts' });
    }
  }, []);

  const deleteDraft = (id: number) => {
    if (dispatch) {
      dispatch({ type: 'write/deleteDraft', payload: { id } });
    }
  };
  return (
    <>
      <HeaderMenu />
      <div className={styles.homeContainer}>
        <Card bordered={false}>
          <List
            loading={loading}
            dataSource={drafts}
            itemLayout="horizontal"
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Link key="draft-edit" to={`/write/${item.id}`}>
                    编辑
                  </Link>,
                  <Popconfirm
                    key="draft-delete"
                    title="你确定要删除吗？"
                    onConfirm={() => deleteDraft(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Link to={`/write/${item.id}`}>
                        <strong>{item.title}</strong>
                        {item.isPublish ? (
                          <Tag color="success" className="ml-10">
                            已发衄1�7
                          </Tag>
                        ) : null}
                      </Link>
                    }
                    description={`上次修改亄1�7${dayjs(item.updatedAt).format(
                      'YYYY[年]MM[月]DD[日] HH:mm',
                    )}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          ></List>
        </Card>
      </div>
    </>
  );
};

export default connect(
  ({
    write: { drafts },
    user: { account },
    loading,
  }: {
    write: {
      drafts: any[];
    };
    user: {
      account: any;
    };
    loading: any;
  }) => ({
    drafts,
    account,
    loading: loading.effects['write/drafts'],
  }),
)(Draft);
