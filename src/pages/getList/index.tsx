import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd';
import styles from './index.less';

const SearchBox = (props: any) => {
  const { title, createAt, showDetail, articleId } = props;
  return (
    <>
      <div
        className={styles.articleBtn}
        onClick={() => {
          showDetail(articleId);
        }}
      >
        <div style={{ marginLeft: 20, fontSize: 20 }}>{title}</div>
        <div style={{ marginRight: 20, fontSize: 20 }}>{createAt}</div>
      </div>
    </>
  );
};

const Index: React.FC = (props: any) => {
  const {
    dispatch,
    articleList,
    articleCount,
    history,
    location: { query },
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (dispatch) {
      if (query.categroy) {
        dispatch({
          type: 'article/getByClass',
          payload: {
            currentPage,
            pageSize: 5,
            class: query.category,
          },
        });
      }
      if (query.tag) {
        dispatch({
          type: 'article/getByTag',
          payload: {
            currentPage,
            pageSize: 5,
            tag: query.tag,
          },
        });
      }
    }
  }, []);

  const showDetail = (articleId: number) => {
    history.push(`/detail/${articleId}`);
  };

  const pageChange = (pageNum: number, pageSize = 5) => {
    setCurrentPage(pageNum);
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { currentPage: pageNum, pageSize },
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: 600,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className={styles.title}>
        {query.categroy && `${query.categroy}`}
        {query.tag && `${query.tag}`}
      </div>
      <div className={styles.container}>
        {articleList &&
          articleList.map((item: any, index: number) => {
            return (
              <SearchBox
                title={item.title}
                articleId={item.articleId}
                createAt={item.createAt}
                key={index}
                showDetail={showDetail}
              />
            );
          })}
        <Pagination
          style={{ marginBottom: 10 }}
          total={articleCount}
          showTotal={(articleCount: number) => `共有${articleCount}篇文章`}
          defaultPageSize={5}
          defaultCurrent={currentPage}
          onChange={pageChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  article: { articleList, articleCount },
}: {
  article: {
    articleList: any;
    articleCount: number;
  };
}) => ({
  articleList,
  articleCount,
});

export default connect(mapStateToProps)(Index);
