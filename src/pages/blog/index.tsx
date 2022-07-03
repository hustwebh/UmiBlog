import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Popover, Pagination } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less';
import ArticleBox from '../../components/BlogComponents/ArticleBox';
import type { ArticleBoxType } from '../../utils/const.type';

const accountList = [
  { icon: <GithubOutlined />, link: 'https://github.com/hustwebh' },
  {
    icon: <QqOutlined />,
    content: (
      <img src={'QQ二维码'} style={{ width: '120px', height: '120px' }} />
    ),
  },
  {
    icon: <WechatOutlined />,
    content: (
      <img src={'微信二维码'} style={{ width: '120px', height: '120px' }} />
    ),
  },
];

const Index: React.FC = (props: any) => {
  const {
    dispatch,
    articles,
    articleCount,
    tags,
    loading,
    history,
    location: { state = {} },
  } = props;
  const { category, tag } = state;

  const [page, setPage] = useState(1);

  //获取博客文章列表
  useEffect(
    () => {
      if (dispatch) {
        dispatch({
          type: 'article/articles',
          payload: { page, pageSize: 5, keywords: '' },
        });
      }
    },
    tag ? [tag] : [],
  );

  //获取博客标签列表
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/tags',
      });
    }
  }, []);

  const pageChange = (pageNum: number, pageSize = 5) => {
    setPage(pageNum);
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { page: pageNum, pageSize, keywords: '' },
      });
    }
  };

  onclick = props.onClick;

  const showDetail = (articleId: number) => {
    history.push(`/detail/${articleId}`);
  };

  return (
    <>
      <Row
        style={{
          width: '100%',
        }}
        justify="space-evenly"
      >
        <Col span={17}>
          {articles.map((item: ArticleBoxType, index: number) => {
            return <ArticleBox {...item} key={index} showDetail={showDetail} />;
          })}
        </Col>
        <Col span={5}>
          <div className={styles.sider}>
            <Card className={styles.siderBlocks}>
              <p>
                我是张跃然
                <br />
                目标是去大厂前端搬砖，详细发展方向未定 现在是普通大学牲一名
                欢迎到访我的个人博客网站
              </p>
            </Card>
            <Card className={styles.siderBlocks}>
              <div className={styles.iconBtn}>
                {accountList.map((item, index) => {
                  const { icon, link = undefined, content = undefined } = item;
                  return (
                    <div key={index}>
                      {link ? (
                        <Button
                          style={{ minWidth: 50, minHeight: 40 }}
                          onClick={() => {
                            window.location.replace(link);
                          }}
                        >
                          {icon}
                        </Button>
                      ) : (
                        <Popover content={content} trigger="hover">
                          <Button style={{ minWidth: 50, minHeight: 40 }}>
                            {icon}
                          </Button>
                        </Popover>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
            {/* <Card loading={loading}>
            <div className={s.notice}>{data?.data[0].notice}</div>
          </Card> */}
            <Card title="标签集合" className={styles.siderBlocks}>
              <div style={{ display: 'flex' }}>
                {tags && tags.length ? (
                  tags.map((item: string, index: number) => {
                    return (
                      <div key={index} className={styles.tagBox}>
                        {item}
                      </div>
                    );
                  })
                ) : (
                  <span>标签加载中...</span>
                )}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <Pagination
          total={articleCount}
          showTotal={(articleCount) => `共有${articleCount}篇文章`}
          defaultPageSize={5}
          defaultCurrent={page}
          onChange={pageChange}
        />
      </Row>
    </>
  );
};

const mapStateToProps = ({
  article: { articles, articleCount, tags },
  loading,
}: {
  article: {
    articles: any;
    articleCount: number;
    tags: string[];
  };
  loading: any;
}) => ({
  articles,
  articleCount,
  tags,
  loading:
    loading.effects['article/tags'] && loading.effects['article/articles'],
});

export default connect(mapStateToProps)(Index);
