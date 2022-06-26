import React, { useEffect, useState } from 'react';
import { Layout, Card, Avatar } from 'antd';
import { UserOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import MathJax from 'react-mathjax';
import Markdown from '@/components/BlogComponents/Markdown';
import ArticleAnchor from '@/components/BlogComponents/ArticleAnchor';

import styles from './index.less';
import './markdown.css';
import { connect } from 'umi';

const { Content } = Layout;

const UserAvatar = (props: any) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

const Index: React.FC = (props: any) => {
  const {
    match: {
      params: { articleId },
    },
    dispatch,
    isFavorite,
    favoriteCount,
    detail,
    loading,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { articleId } });
      dispatch({ type: 'article/isFavorite', payload: { articleId } });
    }
  }, []);

  const handleFavorite = () => {
    if (dispatch) {
      dispatch({
        type: 'article/favorite',
        payload: { articleId, author: detail.uid },
      });
    }
  };

  return (
    <Content className={styles.articleContainer}>
      <div className={styles.articleContainerWrapper}>
        <div className={styles.articleContainerDetail}>
          <Card
            size="small"
            bordered={false}
            loading={loading}
            className="p-1m"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex' }}>
                  {detail && detail.user && detail.user.avatar && (
                    <UserAvatar size="large" src={detail.user.avatar} />
                  )}
                  <div>
                    <h4>{detail.user && detail.user.nickname}</h4>
                    <small>
                      {/* {moment(detail.createdAt).format( */}
                      'YYYY[年]MM[月]DD[日]',
                      {/* )} */}
                      <span className="ml-10">{detail.view}阅读</span>
                    </small>
                  </div>
                </div>
              </div>

              <h1>{detail.title}</h1>
              <div className="markdown-body">
                <MathJax.Provider>
                  <Markdown markdown={detail.markdown} />
                </MathJax.Provider>
              </div>
            </div>
          </Card>
          评论区，评论区
        </div>
        <div className={styles.articleContainerSider}>
          作者信息
          {detail && detail.anchor && (
            <ArticleAnchor anchors={JSON.parse(detail.anchor || '[]')} />
          )}
        </div>
        <div className={styles.articlePanel}>
          <div className={styles.articlePanelItem}>
            <div className={styles.articlePanelIcon}>
              <LikeOutlined
                style={{ color: isFavorite ? '#007bff' : '#ccc' }}
                onClick={handleFavorite}
              />
            </div>
            <div className={styles.articlePanelCount}>
              <span>{favoriteCount}</span>
            </div>
          </div>
          <div className={styles.articlePanelItem}>
            <div className={styles.articlePanelIcon}>
              <MessageOutlined style={{ color: '#ccc' }} />
            </div>
            <div className={styles.articlePanelCount}>
              <span>{detail.comment}</span>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = ({
  article: { detail, isFavorite, favoriteCount },
  loading,
}: {
  article: { detail: object; isFavorite: any; favoriteCount: number };
  loading: any;
}) => {
  return {
    detail,
    isFavorite,
    favoriteCount,
    loading: loading.effects['article/detail'],
    loading2: loading.effects['article/hot'],
  };
};

export default connect(mapStateToProps)(Index);
