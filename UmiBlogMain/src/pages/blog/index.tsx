import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Popover, Pagination } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import { connect, history, useLocation, useDispatch } from '@umijs/max'
import styles from './index.less'
import ArticleBox from '../../components/ArticleBox'
import type { ArticleBoxType } from '../../utils/const.type'

const accountList = [
  { icon: <GithubOutlined />, link: 'https://github.com/hustwebh' },
  {
    icon: <QqOutlined />,
    content: (
      <img src={'QQ二维砄1�7'} style={{ width: '120px', height: '120px' }} />
    ),
  },
  {
    icon: <WechatOutlined />,
    content: (
      <img src={'微信二维砄1�7'} style={{ width: '120px', height: '120px' }} />
    ),
  },
]

const Index: React.FC = (props: any) => {
  const {
    articles,
    article_count,
    tags,
  } = props
  const location = useLocation()
  const dispatch = useDispatch()
  // const { category, tag } = location.state || {}
  const [currentPage, setCurrentPage] = useState(1)
console.log(articles,article_count)
  //获取博客文章列表
  useEffect(
    () => {
      dispatch({
        type: 'article/articles',
        payload: { currentPage, pageSize: 5, keywords: '' },
      })
    }, [])

  // //获取博客标签列表
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/tags',
      })
    }
  }, [])

  const pageChange = (pageNum: number, pageSize = 5) => {
    setCurrentPage(pageNum)
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { currentPage: pageNum, pageSize, keywords: '' },
      })
    }
  }

  onclick = props.onClick

  const showDetail = (articleId: number) => {
    history.push(`/detail/${articleId}`)
  }

  return (
    <>
      <Row
        style={{
          width: '100%',
        }}
        justify="space-evenly"
      >
        <Col span={16}>
          {articles.map((item: ArticleBoxType, index: number) => {
            return <ArticleBox {...item} key={index} showDetail={showDetail} />
          })}
        </Col>
        <Col span={6} className={styles.sider}>
          <Card className={styles.siderBlocks}>
            <p>
              我是<span>张跃焄1�7</span>
              <br />
              现在是HUST在校大学牲一各1�7,欢迎到访我的<span>个人博客网站</span>
            </p>
          </Card>
          <Card
            className={styles.siderBlocks}
            bodyStyle={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {/* <div className={styles.iconBtn}> */}
            {accountList.map((item, index) => {
              const { icon, link = undefined, content = undefined } = item
              return (
                <div key={index} style={{ display: 'inline' }}>
                  {link ? (
                    <Button
                      style={{ width: 50, height: 40 }}
                      onClick={() => {
                        window.location.replace(link)
                      }}
                    >
                      {icon}
                    </Button>
                  ) : (
                    <Popover content={content} trigger="hover">
                      <Button style={{ width: 50, height: 40 }}>{icon}</Button>
                    </Popover>
                  )}
                </div>
              )
            })}
            {/* </div> */}
          </Card>
          <Card
            title="标签集合"
            className={styles.siderBlocks}
            bodyStyle={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}
          >
            {tags && tags.length ? (
              tags.map((item: { name: string, tag_id: number }) => {
                return (
                  <div key={item.tag_id} className={styles.tagBox}>
                    {item.name}
                  </div>
                )
              })
            ) : (
              <span>标签加载中</span>
            )}
            {/* </div> */}
          </Card>
        </Col>
      </Row>
      <Row>
        <Pagination
          total={article_count}
          showTotal={(article_count) => `共有${article_count}篇文章`}
          defaultPageSize={5}
          defaultCurrent={currentPage}
          onChange={pageChange}
        />
      </Row>
    </>
  )
}

const mapStateToProps = ({
  article: { articles, article_count, tags },
}: {
  article: {
    articles: any
    article_count: number
    tags: string[]
  }
}) => ({
  articles,
  article_count,
  tags,
  // loading:
  //   loading.effects['article/tags'] && loading.effects['article/articles'],
})

export default connect(mapStateToProps)(Index)
