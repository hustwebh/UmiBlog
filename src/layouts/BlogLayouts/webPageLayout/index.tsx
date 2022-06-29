import React, { useRef } from 'react';
import {
  Row,
  Col,
  Input,
  Popover,
  Button,
  Dropdown,
  Drawer,
  List,
  Tag
} from 'antd';
import {
  CaretDownOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import styles from './index.less';


export default function Index(props: any) {
  const { location: { pathname } } = props
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          className={styles.withoutMarginTop}
        >
          {props.children}
        </div>
      </div>
    </>
  )
}
