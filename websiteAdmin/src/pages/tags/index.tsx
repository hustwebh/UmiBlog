import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Select,
} from 'antd'
import { connect } from '@umijs/max'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'

const { Option } = Select

const Tag = (props: any) => {
  const { dispatch, categories, tags, loading } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/categories' })
      dispatch({ type: 'admin/tags' })
    }
  }, [])
  const handleCancel = () => {
    setVisible(false)
  }
  const showModal = () => {
    setVisible(true)
  }
  const onSubmit = (values: string) => {
    if (dispatch) {
      dispatch({ type: 'admin/createTag', payload: values })
    }
    form.resetFields()
  }
  const deleteTag = (id: number) => {
    if (dispatch) {
      dispatch({ type: 'admin/deleteTag', payload: { id } })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render(date: string) {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '操作',
      render(tag: any) {
        return (
          <Popconfirm
            title="确定要删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => deleteTag(tag.id)}
          >
            <Button size="small" danger>
              删除
            </Button>
          </Popconfirm>
        )
      },
    },
  ]
  return (
    <PageContainer>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          添加标签
        </Button>
      </Space>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table
          columns={columns}
          dataSource={tags}
          rowKey={() => uuidv4()}
          loading={loading}
          pagination={false}
        />
      </Card>
      <Modal
        title="添加标签"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={400}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="标签名称"
            rules={[
              {
                required: true,
                message: '标签名不能为空',
              },
            ]}
          >
            <Input placeholder="输入标签名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}

export default connect(
  ({
    admin: { categories, tags },
    loading,
  }: {
    admin: {
      categories: any[]
      tags: string[]
    }
    loading: any
  }) => ({
    tags,
    categories,
    loading: loading.effects['admin/tags'],
  }),
)(Tag)
