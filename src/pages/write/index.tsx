import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'dva';
import moment from 'moment';
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Dropdown,
  Menu,
  Drawer,
  List,
  Modal,
  Table,
  Avatar,
  message,
} from 'antd';
import type { InputRef } from 'antd';
import {
  CaretDownOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, Link } from 'umi';
import MathJax from 'react-mathjax';

import Editor, { Plugins } from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import dayjs from 'dayjs';
import hljs from 'highlight.js';
import 'react-markdown-editor-lite/lib/index.css';

import styles from './index.less';

const UserAvatar = (props: any) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

const Content = (props: any) => {
  const { tags, category, onPublish } = props;

  return (
    <div>
      <h4 style={{ marginBottom: 16 }}>分类</h4>
      <div>
        <Input placeholder="请输入文章所属类别" ref={category} />
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
      <div>
        <Input
          placeholder="请输入文章所带标签，多个标签以逗号分隔"
          ref={tags}
        />
      </div>
      <div>
        <Button type="primary" onClick={onPublish}>
          发布文章
        </Button>
      </div>
    </div>
  );
};

const Index: React.FC = (props: any) => {
  console.log(props);

  const {
    dispatch,
    title,
    drafts,
    account,
    loading,
    markdown,
    match: {
      params: { key },
    },
  } = props;

  const [visible, setVisible] = useState(false);
  const [value, setValue] = React.useState(markdown);
  const inputRef = useRef<InputRef>(null) || undefined;
  const category = useRef<InputRef>(null);
  const tags = useRef<InputRef>(null);
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  const mdEditor = useRef(null);
  Editor.use(Plugins.TabInsert, {
    tabMapValue: 1,
  });
  Editor.unuse(Plugins.FullScreen);

  useEffect(() => {
    if (!account || !account.id) {
      message.info('请先登录');
      history.push('/blog');
    }
    if (dispatch) {
      // dispatch({ type: 'write/category' })
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({ type: 'write/draft', payload: { id: key } });
      } else {
        dispatch({ type: 'write/setMarkdown', payload: { markdown: '' } });
        dispatch({ type: 'write/setTitle', payload: { title: null } });
      }
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [key]);

  const onChangeTitle = (e: any) => {
    if (dispatch) {
      dispatch({ type: 'write/setTitle', payload: { title: e.target.value } });
    }
  };

  const saveDraft = () => {
    if (dispatch) {
      const markdownCurrent = mdEditor.current && mdEditor.current.getMdValue();
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({
          type: 'write/updateDraft',
          payload: { markdown: markdownCurrent, title, id: key },
        });
      } else {
        dispatch({
          type: 'write/saveDraft',
          payload: { markdown: markdownCurrent, title },
        });
      }
    }
  };

  const onPublish = () => {
    // if (dispatch) {
    if (tags?.current?.input && category?.current?.input) {
      const articleTags = tags.current.input.value.split(',');
      const articleCategory = category.current.input.value;
      dispatch({
        type: 'write/publish',
        payload: {
          markdown: mdEditor.current && mdEditor.current.getMdValue(),
          id: key === 'new' ? null : key,
          title,
          articleTags,
          articleCategory,
        },
      });
    }
    // }
  };

  const writeNew = () => {
    dispatch({ type: 'write/setMarkdown', payload: { markdown: '' } });
    dispatch({ type: 'write/setTitle', payload: { title: null } });
    history.push('/write/new');
  };

  const showDrawer = () => {
    if (dispatch) {
      dispatch({ type: 'write/drafts' });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setValue(text);
  };

  const writeMenu = (
    <Menu className="mt-20">
      <Menu.Item key="0">
        <a onClick={writeNew}>新文章</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={showDrawer}>草稿箱</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to="/blog">回到首页</Link>
      </Menu.Item>
    </Menu>
  );

  const ShortCutKey = () => {
    const columns = [
      {
        title: 'Markdown',
        dataIndex: 'markdown',
        key: 'markdown',
      },
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain',
      },
      {
        title: '快捷键',
        dataIndex: 'keybord',
        key: 'keybord',
      },
    ];
    const dataSource = [
      {
        markdown: '**文本**',
        explain: '加粗',
        keybord: 'Ctrl / ⌘ + B',
      },
      {
        markdown: '[描述](链接)',
        explain: '链接',
        keybord: 'Ctrl / ⌘ + L',
      },
      {
        markdown: '![描述](链接)',
        explain: '插入图片',
        keybord: 'Ctrl / ⌘ + I',
      },
      {
        markdown: '> 引用',
        explain: '引用',
        keybord: 'Ctrl / ⌘ + Q',
      },
      {
        markdown: '```code```',
        explain: '代码块',
        keybord: 'Ctrl / ⌘ + Alt + C',
      },
      {
        markdown: '`code`',
        explain: '行代码块',
        keybord: 'Ctrl / ⌘ + Alt + K',
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <>
      <Row justify="start">
        <Col span={18}>
          <Input
            value={title}
            onChange={onChangeTitle}
            bordered={false}
            size="large"
            placeholder="请输入标题"
            style={{ backgroundColor: '#fff', borderRight: '3px soild gray' }}
            ref={inputRef}
          />
        </Col>
        <Col span={6} style={{ background: '#fff' }}>
          <Popover
            placement="bottom"
            title={<strong>快捷键</strong>}
            overlayStyle={{ width: 350 }}
            content={<ShortCutKey />}
          >
            <QuestionCircleOutlined />
          </Popover>
          <Popover
            placement="bottom"
            title={<strong>发布文章</strong>}
            content={
              <Content tags={tags} category={category} onPublish={onPublish} />
            }
            overlayStyle={{ width: 300 }}
            trigger="click"
          >
            <Button type="link">
              发布
              <CaretDownOutlined />
            </Button>
          </Popover>
          <Button
            loading={loading}
            type="primary"
            onClick={saveDraft}
            style={{
              marginRight: 20,
              marginLeft: 10,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            保存草稿
          </Button>
          <Dropdown overlay={writeMenu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserAvatar src={account.avatar} />
            </a>
          </Dropdown>
          {visible && (
            <Drawer title="草稿箱" onClose={onClose} visible={visible}>
              <List
                itemLayout="horizontal"
                dataSource={drafts}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <a
                          onClick={() => {
                            history.push(`/write/draft/${item.id}`);
                            onClose();
                          }}
                        >
                          {item.title}
                          {item.is_publish ? (
                            <Tag color="success" className="ml-10">
                              已发表
                            </Tag>
                          ) : null}
                        </a>
                      }
                      description={`${dayjs(item.updatedAt).format(
                        'YYYY[年]MM[月]DD[日] HH:mm',
                      )}`}
                    />
                  </List.Item>
                )}
              />
            </Drawer>
          )}
        </Col>
      </Row>
      <Row style={{ borderTop: '1px solid #ccc' }}>
        <Editor
          shortcuts
          placeholder={`在此处编辑markdown语法`}
          ref={mdEditor}
          value={value}
          className={styles.editor}
          syncScrollMode={['rightFollowLeft']}
          onChange={handleEditorChange}
          renderHTML={(text) => mdParser.render(text)}
        />
      </Row>
    </>
  );
};

const mapStateToProps = ({
  write: {
    title,
    markdown,
    drafts,
    category,
    tags,
    selectedCategory,
    selectedTag,
  },
  user: { account },
  loading,
}: {
  write: {
    title: string;
    markdown: string;
    drafts: any[];
    category: string;
    tags: string[];
    selectedCategory: any;
    selectedTag: any;
  };
  user: { account: any };
  loading: any;
}) => {
  return {
    category,
    tags,
    title,
    markdown,
    drafts,
    selectedCategory,
    selectedTag,
    account,
    loading: loading.effects['write/updateDraft'],
  };
};

// dispatch,
// title,
// drafts,
// account,
// loading,
// match: {
//   params: { key },
// },

export default connect(mapStateToProps)(Index);
