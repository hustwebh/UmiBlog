import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';

export default function LoginCommentForm(props: any) {
  const { id, author, dispatch } = props;
  const [form] = Form.useForm();
  const onFinish = (values: FormData) => {
    console.log('FormData', ...values);
    if (dispatch) {
      dispatch({
        type: 'article/addComment',
        payload: { ...values, articleId: id, author },
      });
    }
    form.resetFields();
  };
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: '输入你的评论',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="发表您的看法" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            评论
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
