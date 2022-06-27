import React from 'react'
import { Button, Input, Form } from 'antd'

export default function NoLoginCommentForm  (props:any)  {
  const { dispatch, id, author } = props
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  const onFinish = (values:FormData) => {
    if (dispatch) {
      dispatch({
        type: 'article/addNoLoginComment',
        payload: { ...values, article_id: id, author },
      })
    }
    form.resetFields()
  }
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        {...formItemLayout}
        name="email"
        label="你的邮箱"
        rules={[
          {
            type: 'email',
            message: '不是有效的电子邮箱',
          },
          {
            required: true,
            message: '请输入您的邮箱,不会公开',
          },
        ]}
      >
        <Input placeholder="输入您的电子邮箱" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="nickname"
        label="您的名字"
        rules={[
          {
            required: true,
            message: '名字不能为空',
          },
        ]}
      >
        <Input placeholder="输入您的名字" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="website"
        label="您的网站"
        rules={[
          {
            type: 'url',
            message: '不是有效的电子邮箱',
          },
        ]}
      >
        <Input placeholder="输入您的网址" />
      </Form.Item>
      <Form.Item
        name="content"
        label="您的留言"
        rules={[
          {
            required: true,
            message: '请输入您的邮箱,不会公开',
          },
        ]}
      >
        <Input.TextArea rows={6} placeholder="发表您的看法" />
      </Form.Item>
      <Form.Item {...formItemLayout}>
        <Button type="primary" htmlType="submit">
          发表看法
        </Button>
      </Form.Item>
    </Form>
  )
}