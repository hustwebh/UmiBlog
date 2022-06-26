import React, { useState, useEffect } from 'react';
import { Tooltip, List, Skeleton, Tag, Card } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import Link from 'umi';
import styles from './index.less';
import type { ArticleBoxType } from '../../../utils/const.type';

const IconText = ({ icon, text }: { icon: any; text: number }) => (
  <span style={{ marginLeft: 8 }}>
    {React.createElement(icon)}
    {text}
  </span>
);

export default function Index(props: ArticleBoxType) {
  const {
    title,
    createAt,
    tag = [],
    view,
    favorite,
    comment,
    articleId,
    showDetail,
  } = props;

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          // if(showDetail) {
          showDetail(articleId);
          // }
        }}
      >
        <Skeleton
          avatar
          title={false}
          loading={false}
          active
          style={{ height: '100%' }}
        >
          <div className={styles.articleContainer}>
            <h2>{title}</h2>
            <div className={styles.contentContainer}>
              文章内容长文本文章w内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本文章内容长文本
            </div>
            <div className={styles.footTagsContainer}>
              <div className={styles.createTimeContainer}>{createAt}</div>
              <div className={styles.TagsContainer}>
                {tag.length &&
                  tag.map((item, index) => {
                    return (
                      <div key={index}>
                        <Tag>{item}</Tag>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.iconContainer}>
                <IconText icon={EyeOutlined} text={view} />
                <IconText icon={LikeOutlined} text={favorite} />,
                <IconText icon={MessageOutlined} text={comment} />,
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
}
