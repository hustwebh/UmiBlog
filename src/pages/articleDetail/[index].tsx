import React, { useEffect, useState } from 'react';
import { Layout, Card, Avatar, Row, Col, Divider, Tooltip } from 'antd';
import { UserOutlined, MessageOutlined, LikeOutlined, GlobalOutlined, GithubOutlined, WeiboCircleOutlined, createFromIconfontCN } from '@ant-design/icons';
import MathJax from 'react-mathjax';
// import Markdown from '@/components/BlogComponents/Markdown';
import MarkdownIt from 'markdown-it';
import hljs from "highlight.js"
// import Markdown from 'react-markdown';
import ArticleAnchor from '@/components/BlogComponents/ArticleAnchor';
import Comments from '@/components/BlogComponents/Comments'

import styles from './index.less';
import './markdown.css';
import { connect } from 'dva';

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn')

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
    comments,
    account,
    loading2
  } = props;

  const markdownRenderer = new MarkdownIt();

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { articleId } });
      dispatch({ type: 'article/isFavorite', payload: { articleId } });
      dispatch({ type: 'article/comments',payload: { articleId } });
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
                  {detail && detail.user && (
                    <UserAvatar size="large" src={detail.user.avatar} />
                  )}
                  <div>
                    <h4>{detail.user && detail.user.nickname}</h4>
                    <small>
                      {dayjs(detail.createdAt).format('YYYY[年]MM[月]DD[日]')}
                      <span className="ml-10">{detail.view}阅读</span>
                    </small>
                  </div>
                </div>
              </div>

              <h1>{detail.title}</h1>
              { detail.markdown && (<div
                className="markdown-body"
                dangerouslySetInnerHTML={{__html:markdownRenderer.render(detail.markdown)}}
                >
                </div>) }
            </div>
          </Card>
          <Divider />
          <Comments id={articleId} author={detail.uid} loading={loading2} comments={comments} account={account}/>
        </div>
        <div className={styles.articleContainerSider}>
          <Card
            title="关于作者"
            bordered={false}
            size="small"
            loading={loading}
          >
            <div style={{ display: 'flex', marginBottom: 10 }}>
              {detail && detail.user && (
                <UserAvatar size="large" src={detail.user.avatar} />
              )}
              <div className="pl-1m">
                <h5>{detail.user && detail.user.nickname}</h5>
                <small>{detail.user && detail.user.profession}</small>
              </div>
            </div>
            <Row
              className="tc"
              // type="flex"
              typeof="flex"
              align="middle"
              justify="space-between"
            >
              <Col span={8}>
                <h2 className="m-0">
                  <b>{detail.user && detail.user.total_view}</b>
                </h2>
                <small>浏览</small>
              </Col>
              <Col span={8}>
                <h2 className="m-0">
                  <b>{detail.user && detail.user.total_like}</b>
                </h2>
                <small>点赞</small>
              </Col>
              <Col span={8}>
                <h2 className="m-0">
                  <b>{detail.user && detail.user.total_comment}</b>
                </h2>
                <small>评论</small>
              </Col>
            </Row>
          </Card>
          TODO：生成文章锚点
          {detail && detail.anchor && (
            <ArticleAnchor anchors={[]} />
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
  article: { detail, isFavorite, favoriteCount, comments },
  user: { account },
  loading,
  loading2
}: {
  article: { detail: object; isFavorite: any; favoriteCount: number;comments:any[] };
  user: { account:object }
  loading:any;
  loading2:any;
}) => {
  return {
    detail,
    isFavorite,
    favoriteCount,
    account,
    comments,
    loading: loading.effects['article/detail'],
    loading2: loading.effects['article/comments']
  };
};

export default connect(mapStateToProps)(Index);
