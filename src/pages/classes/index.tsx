import React, { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
// import { Card } from 'antd';
import { connect } from 'dva';

const ClassesBtn = ({
  name,
  number,
  isLast,
}: {
  name: string | null;
  number: number | null;
  isLast: boolean;
}) => {
  const containerClassName = isLast ? styles.LastClassBtn : styles.classBtn;
  return (
    <div
      className={containerClassName}
      onClick={() => {
        history.push(`/getList?category=${name}`);
      }}
    >
      <div style={{ marginLeft: 20, fontSize: 20 }}>{name}</div>
      <div style={{ marginRight: 20, fontSize: 20 }}>{number}</div>
    </div>
  );
};

const Index: React.FC = (props: any) => {
  const { dispatch, classesList, history } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/classes',
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
      <div className={styles.title}>分类</div>
      <div className={styles.container}>
        {classesList &&
          classesList.map((item: any, index: number) => {
            if (classesList.length % 2) {
              const isLast = index === classesList.length - 1;
              while (isLast)
                return (
                  <>
                    <ClassesBtn
                      number={item.number}
                      name={item.name}
                      key={index}
                      isLast={false}
                    />
                    <ClassesBtn
                      number={null}
                      name={null}
                      key={index + 1}
                      isLast={true}
                    />
                  </>
                );
              return (
                <ClassesBtn
                  number={item.number}
                  name={item.name}
                  key={index}
                  isLast={false}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  article: { classesList },
}: {
  article: {
    classesList: object[];
  };
}) => ({
  classesList,
});

export default connect(mapStateToProps)(Index);
