import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Tag, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const Article = (props:any) => {
  const { dispatch, articles, articleCount, loading } = props
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/articles', payload: { page, pageSize: 10 } })
    }
  }, [])

  const pageChange = (pageNum:number) => {
    setPage(pageNum)
    if (dispatch) {
      dispatch({
        type: 'admin/articles',
        payload: { page: pageNum, pageSize: 10 },
      })
    }
  }
  const deleteArticle = (id:number) => {
    if (dispatch) {
      dispatch({ type: 'admin/deleteArticle', payload: { id } })
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: '标题',
      width: 150,
      ellipsis: true,
      render(article:any) {
        return (
          <Link to={`/detail/${article.id}`}>
            {article.title}
          </Link>
        )
      },
    },
    {
      title: '分类',
      dataIndex: 'category',
      render(category:string) {
        return <Tag color="warning">{category}</Tag>
      },
    },
    {
      title: '点赞数',
      dataIndex: 'favorite',
    },
    {
      title: '浏览量',
      dataIndex: 'view',
    },
    {
      title: '评论数',
      dataIndex: 'comment',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render(date:string) {
        return <span>{dayjs(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      render(id:number) {
        return (
          <Popconfirm
            title="确定要删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => deleteArticle(id)}
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
    <>
      <Card size="small">
        <Table
          columns={columns}
          dataSource={articles}
          rowKey={() => uuidv4()}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: articleCount,
            current: page,
            onChange: pageChange,
          }}
        />
      </Card>
    </>
  )
}

export default connect(({ admin: { articles, articleCount }, loading }:
  {
    admin:{
      articles:any[],
      articleCount:number
    },
    loading:any
  }) => ({
  articles,
  articleCount,
  loading: loading.effects['admin/articles'],
}))(Article)
