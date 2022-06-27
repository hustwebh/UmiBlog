import React, { useEffect } from 'react'
import { connect } from 'dva'
import { Comment, Divider, Tooltip, List, Card, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import LoginCommentForm from '@/components/BlogComponents/AddComment/LoginCommentForm'
import NoLoginCommentForm from '@/components/BlogComponents/AddComment/NoLoginCommentForm'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn')

const Content = ({ content }:{content:any}) => <p>{content}</p>

const Datetime = ({time}:{ time:any }) => {
  return (
    <Tooltip title={time}>
      <span>过了多长时间</span>
    </Tooltip>
  )
}
const UserAvatar = (props: any) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

const AddComment = (props:any) => {
  const { account, dispatch, id, author, comments, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/comments', payload: { id } })
    }
  }, [])
  return (
    <Card
      title="评论"
      bordered={false}
      loading={loading}
      className="mtb-20"
      id="comment"
    >
      <List
        className="comment-list"
        itemLayout="horizontal"
        split={false}
        dataSource={comments}
        renderItem={(item:any) => (
          <List.Item>
            <Comment
              author={item.user.nickname}
              avatar={<UserAvatar src={item.user.avatar} />}
              content={<Content content={item.content} />}
              datetime={<Datetime time={item.createdAt} />}
            />
          </List.Item>
        )}
      />
      <Divider />
      {account && account.id ? (
        <Comment
          avatar={<UserAvatar src={account.avatar} />}
          content={<LoginCommentForm id={id} author={author} />}
        />
      ) : (
        <NoLoginCommentForm id={id} author={author} />
      )}
    </Card>
  )
}

export default connect(
  ({ article: { comments }, user: { account }, loading }
    :{
      article:{
        comments:any
      },
      user:{
        account:any
      },
      loading:any
    }) => ({
    comments,
    account,
    loading: loading.effects['article/comments'],
  }),
)(AddComment)
