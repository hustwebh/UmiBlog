import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Comment, Divider, Tooltip, List, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LoginCommentForm from '@/components/BlogComponents/Comments/LoginCommentForm';
import NoLoginCommentForm from '@/components/BlogComponents/Comments/NoLoginCommentForm';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // 使用插件
dayjs.locale('zh-cn');

const Content = ({ content }: { content: any }) => <p>{content}</p>;

const Datetime = ({ time }: { time: any }) => {
  return (
    <Tooltip title={time}>
      <span>过了多长时间</span>
    </Tooltip>
  );
};
const UserAvatar = (props: any) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

export default function Comments(props: any) {
  const { account, id, author, comments, loading, dispatch } = props;
  return (
    <Card title="评论" bordered={false} loading={loading}>
      <List
        itemLayout="horizontal"
        split={false}
        locale={{ emptyText: '暂无评论' }}
        dataSource={comments}
        renderItem={(item: any) => (
          <List.Item>
            <Comment
              author={item.author.nickname}
              avatar={<UserAvatar src={item.author.avatar} />}
              content={<Content content={item.content} />}
              datetime={<Datetime time={item.createdAt} />}
            />
          </List.Item>
        )}
      />
      <Divider />
      {/* {account && account.id ? (
        <Comment
          avatar={<UserAvatar src={account.avatar} />}
          content={<LoginCommentForm id={id} author={author} />}
        />
      ) : (
        <NoLoginCommentForm id={id} author={author} />
      )} */}
      <Comment
        avatar={<UserAvatar src={account.avatar} />}
        content={
          <LoginCommentForm id={id} author={author} dispatch={dispatch} />
        }
      />
    </Card>
  );
}
