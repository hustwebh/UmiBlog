import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Popover, Pagination } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import { connect,useLocation } from '@umijs/max';
import styles from './index.less';
import ArticleBox from '../../components/ArticleBox';
import type { ArticleBoxType } from '../../utils/const.type';

const accountList = [
  { icon: <GithubOutlined />, link: 'https://github.com/hustwebh' },
  {
    icon: <QqOutlined />,
    content: (
      <img src={'QQ浜岀淮鐮�'} style={{ width: '120px', height: '120px' }} />
    ),
  },
  {
    icon: <WechatOutlined />,
    content: (
      <img src={'寰俊浜岀淮鐮�'} style={{ width: '120px', height: '120px' }} />
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
    // location: { state = {} },
  } = props;
  const location = useLocation();
  // const { category, tag } = location.state || {};

  const [currentPage, setCurrentPage] = useState(1);

  //鑾峰彇鍗氬鏂囩珷鍒楄〃
  useEffect(
    () => {
      if (dispatch) {
        dispatch({
          type: 'article/articles',
          payload: { currentPage, pageSize: 5, keywords: '' },
        });
      }
    });

  //鑾峰彇鍗氬鏍囩鍒楄〃
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/tags',
      });
    }
  }, []);

  const pageChange = (pageNum: number, pageSize = 5) => {
    setCurrentPage(pageNum);
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { currentPage: pageNum, pageSize, keywords: '' },
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
        <Col span={16}>
          {articles.map((item: ArticleBoxType, index: number) => {
            return <ArticleBox {...item} key={index} showDetail={showDetail} />;
          })}
        </Col>
        <Col span={6} className={styles.sider}>
          <Card className={styles.siderBlocks}>
            <p>
              鎴戞槸<span>寮犺穬鐒�</span>
              <br />
              鐜板湪鏄疕UST鍦ㄦ牎澶у鐗蹭竴鍚�,娆㈣繋鍒拌鎴戠殑<span>涓汉鍗氬缃戠珯</span>
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
              const { icon, link = undefined, content = undefined } = item;
              return (
                <div key={index} style={{ display: 'inline' }}>
                  {link ? (
                    <Button
                      style={{ width: 50, height: 40 }}
                      onClick={() => {
                        window.location.replace(link);
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
              );
            })}
            {/* </div> */}
          </Card>
          {/* <Card loading={loading}>
            <div className={s.notice}>{data?.data[0].notice}</div>
          </Card> */}
          <Card
            title="鏍囩闆嗗悎"
            className={styles.siderBlocks}
            bodyStyle={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}
          >
            {/* <div> */}
            {tags && tags.length ? (
              tags.map((item: string, index: number) => {
                return (
                  <div key={index} className={styles.tagBox}>
                    {item}
                  </div>
                );
              })
            ) : (
              <span>鏍囩鍔犺浇涓�...</span>
            )}
            {/* </div> */}
          </Card>
        </Col>
      </Row>
      <Row>
        <Pagination
          total={articleCount}
          showTotal={(articleCount) => `鍏辨湁${articleCount}绡囨枃绔燻}
          defaultPageSize={5}
          defaultCurrent={currentPage}
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
