import React from 'react';
import styles from './index.less';


export default function Index(props: any) {
  const { location: { pathname } } = props
  
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'red'
        }}
      >
        {props.children}
      </div>
    </>
  )
}
