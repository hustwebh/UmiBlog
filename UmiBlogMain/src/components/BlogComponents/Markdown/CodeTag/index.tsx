/*
 * @Author: 柒叶
 * @Date: 2020-04-16 06:35:02
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 16:32:50
 */

import React from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import SyntaxHighlighter from 'react-syntax-highlighter';

import {
  docco,
  a11yDark,
  a11yLight,
  agate,
  anOldHope,
  arduinoLight,
  ascetic,
  github,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeTag = (props: any) => {
  const { value, language } = props;
  if (!value) return null;
  return (
    <SyntaxHighlighter
      language={language}
      style={github}
      // showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeTag;
