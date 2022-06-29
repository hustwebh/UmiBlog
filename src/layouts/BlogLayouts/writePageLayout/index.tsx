import React from 'react';
import styles from './index.less';


export default function Index(props: any) {
  const { location: { pathname } } = props
  
  return (
    <>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          height:'100vh',
        }}
      >
        {props.children}
      </div>
    </>
  )
}
