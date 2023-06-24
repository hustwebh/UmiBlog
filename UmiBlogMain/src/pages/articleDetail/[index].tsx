import React, { useEffect, useState } from 'react'
import {
  Layout,
  Card,
  Avatar,
  Row,
  Col,
  Divider,
  Tooltip,
  message,
} from 'antd'
import {
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  GlobalOutlined,
  GithubOutlined,
  WeiboCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import hljs from 'highlight.js'
import ArticleAnchor from '@/components/ArticleAnchor'
import Comments from '@/components/Comments'

import styles from './index.less'
import './markdown.css'
import { connect, useDispatch, useLocation} from '@umijs/max'
import storageHelper from '@/utils/storage'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn')

const { Content } = Layout

const UserAvatar = (props: any) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  )

const Index: React.FC = (props: any) => {
  const {
    isFavorite,
    favorite_count,
    detail,
    comments,
  } = props
  const location = useLocation()
  const dispatch = useDispatch()
  const account = storageHelper.get('account');
  const markdownRenderer = new MarkdownIt()
  markdownRenderer
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        symbol: '§',
        space: false,
        placement: 'before',
      })
    })
    .use(markdownItTocDoneRight, {
      containerClass: 'toc',//生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
      containerId: 'toc',//生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
      listType: 'ul',//导航列表使用ul还是ol
      listClass: 'listClass',//li标签的样式名
      linkClass: 'linkClass',//a标签的样式名
      callback: function (html: any,ast:any) {
        //把目录单独列出来
        console.log(ast)
        let anchorDiv = document.getElementById('anchor');
        if (anchorDiv) anchorDiv.innerHTML = html
      }
    })
  const article_id = Number.parseInt(location.pathname.split('/').pop()|| "")
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { article_id } })
      dispatch({ type: 'article/comments', payload: { article_id } })
      if (account?.id) {
        dispatch({
          type: 'article/isFavorite',
          payload: { article_id, user_id: account.id },
        })
      }
    }
  }, [])

  const handleFavorite = () => {
    if (account?.id) {
      dispatch({
        type: 'article/favorite',
        payload: { article_id, user_id: account.id },
      })
    } else {
      message.warning('请先登录!')
    }
  }

  return (
    <Content className={styles.articleContainer}>
      <div className={styles.articleContainerWrapper}>
        <div className={styles.articleContainerDetail}>
          <Card
            size="small"
            bordered={false}
            // loading={loading}
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

              {detail.content && (
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: markdownRenderer.render(detail.content),
                  }}
                ></div>
              )}
            </div>
          </Card>
          <Divider />
          <Comments
            id={article_id}
            author={detail.uid}
            // loading={loading2}
            comments={comments}
            // account={account}
            dispatch={dispatch}
          />
        </div>
        <div className={styles.articleContainerSider}>
          <Card
            title="关于作者"
            bordered={false}
            size="small"
          // loading={loading}
          >
            <div style={{ display: 'flex', marginBottom: 10 }}>
              {detail && detail.user && (
                <UserAvatar size="large" src={detail.user.avatar} />
              )}
              <div className="pl-1m">
                <h5>{detail.user && detail.user.nickname}</h5>
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
          <div id='anchor' style={{ position: 'fixed' }}>TODO:生成文章锚点</div>
          {/* <div dangerouslySetInnerHTML={{__html:markdownRenderer.render(`$<toc{"listType":"ul"}>\n\n${detail.content}`)}}></div> */}
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
              <span>{favorite_count}</span>
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
  )
}

const mapStateToProps = ({
  article: { detail, isFavorite, favorite_count, comments },
  loading,
  loading2,
}: {
  article: {
    detail: object
    isFavorite: any
    favorite_count: number
    comments: any[]
  }
  loading: any
  loading2: any
}) => {
  return {
    detail,
    isFavorite,
    favorite_count,
    comments,
    // loading: loading.effects['article/detail'],
    // loading2: loading.effects['article/comments'],
  }
}

export default connect(mapStateToProps)(Index)
