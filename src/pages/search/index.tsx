import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { Pagination, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import styles from './index.less';
import articles from '../admin/articles';

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
  const { dispatch, articles, articleCount, history } = props;

  const searchInput = useRef<InputRef>(null);
  const [keywords, setKeywords] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: {
          currentPage,
          pageSize: 5,
        },
      });
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
        payload: { currentPage: pageNum, pageSize, keywords },
      });
    }
  };

  const inputChange = (e: any) => {
    if (searchInput.current?.input?.value) {
      setKeywords(searchInput.current?.input?.value);
    }
  };

  const searchByTitle = (e: any) => {
    dispatch({
      type: 'article/articles',
      payload: { currentPage, pageSize: 10, keywords },
    });
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
      <div className={styles.title}>搜索文章</div>
      <div className={styles.container}>
        <div className={styles.searchInputContainer}>
          <Input
            onChange={inputChange}
            defaultValue={keywords}
            ref={searchInput}
            className={styles.searchInput}
            bordered={false}
            placeholder="请输入想搜索文章的标题"
          />
          <div className={styles.searchBtn} onClick={searchByTitle}>
            <SearchOutlined style={{ fontSize: '30px' }} />
          </div>
        </div>
        {articles &&
          articles.map((item: any, index: number) => {
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
  article: { articles, articleCount },
}: {
  article: {
    articles: any[];
    articleCount: number;
  };
}) => ({
  articles,
  articleCount,
});

export default connect(mapStateToProps)(Index);
