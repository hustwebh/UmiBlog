import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'antd';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import styles from './index.less';
import './markdown.css';

const aboutWebsite = `# 关于博客

这个博客网站最初版本由**张跃然(本人)**,**何洛昌**,**汪张萌**作为小组实训项目构建而成.后续将会由本人長期维护并不断完善功能.
`;
const aboutMe = `# 关于我

好像也没什么好说的,稍微介绍一下,我就是

+ 一名HUST普通的大学牲
+ 目前主要学习领域是前端开发
+ 想去大厂搬砖

你所在的网站是我的**个人博客**,感谢你的光临.

如果想查看本人更多作品,请点击**[这里](localhost:8000/)**前往个人网站主页

## 联系方式

1. QQ:1112233456
2. github:[https://www.github.com/hustwebh](https://www.github.com/hustwebh)`;

export default function Index() {
  const markdownRenderer = new MarkdownIt();
  const [checked, setChecked] = useState(false);
  const [staticMarkdown, setStaticMarkdown] = useState(aboutMe);

  const onChange = (checked: boolean) => {
    setChecked(checked);
    let markdown = checked ? aboutWebsite : aboutMe;
    setStaticMarkdown(markdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkedContainer}>
        <div
          onClick={() => {
            setChecked(false);
            setStaticMarkdown(aboutMe);
          }}
        >
          关于我
        </div>
        <Switch onChange={onChange} checked={checked} />
        <div
          onClick={() => {
            setChecked(true);
            setStaticMarkdown(aboutWebsite);
          }}
        >
          关于博客
        </div>
      </div>
      <div className={styles.markdownContainer}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: markdownRenderer.render(staticMarkdown),
          }}
        ></div>
      </div>
    </div>
  );
}
