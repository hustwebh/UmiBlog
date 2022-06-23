import React, { useEffect } from 'react'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import { connect } from 'dva'

export default function Index(props: any) {
  const [form] = Form.useForm()
  const { dispatch, title, typeHandler } = props
  const onFinish = (values: FormData) => {
    console.log(values);
  }
  return (
    <>
      <h3 className="tc mt-10m">{`${title}`}</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: '不是有效的电子邮箱',
            },
            {
              required: true,
              message: '电子邮箱必填',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="输入您的电子邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入你的密码"
          />
        </Form.Item>
        {title === '登录'
          ? (<Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox checked>自动登录</Checkbox>
            </Form.Item>
            <a className="fr" href="#">
              忘记密码
            </a>
          </Form.Item>)
          : (<Form.Item
            name="repassword"
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次密码不一致')
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>)
        }
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {`${title}`}
          </Button>
        </Form.Item>
        {/* <Link to="/register">注册账户</Link> */}
        {title === '登录'
          ? <Button type="link" onClick={() => (typeHandler('注册'))}>注册用户</Button>
          : <Button type="link" onClick={() => (typeHandler('登录'))}>前往登录</Button>
        }

      </Form>
    </>
  )
}
