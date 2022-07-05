import React, { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
// import { Card } from 'antd';
import { connect } from 'dva';

const ClassesBtn = ({ name }: { name: string | null }) => {
  return (
    <div
      className={styles.tagsBtn}
      onClick={() => {
        history.push(`/getList?category=${name}`);
      }}
    >
      {name}
    </div>
  );
};

const Index: React.FC = (props: any) => {
  const { dispatch, tags } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/tags',
      });
    }
  }, []);

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
      <div className={styles.title}>标签</div>
      <div className={styles.container}>
        {tags &&
          tags.map((item: any, index: number) => {
            return <ClassesBtn name={item} key={index} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  article: { tags },
}: {
  article: {
    tags: object[];
  };
}) => ({
  tags,
});

export default connect(mapStateToProps)(Index);
