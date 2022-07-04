import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'antd';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import styles from './index.less';
import './markdown.css';

export default function Index() {
  const [checked, setChecked] = useState(false);

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkedContainer}>
        <div
          onClick={() => {
            setChecked(false);
          }}
        >
          关于我
        </div>
        <Switch onChange={onChange} checked={checked} />
        <div
          onClick={() => {
            setChecked(true);
          }}
        >
          关于博客
        </div>
      </div>
      <div className={styles.msgContainer}>
        {/* {checked
        ?(<div>关于博客</div>)
        :(<div>关于我</div>)
        } */}
      </div>
    </div>
  );
}
