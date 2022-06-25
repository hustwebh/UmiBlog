import React from 'react';
import styles from './index.less';
import classesName from 'classnames';
import HeadMenu from '@/components/BlogComponents/HeaderMenu';
import classNames from 'classnames';


export default function Index(props: any) {
  const { location:{pathname} } = props
  const isSpecial = pathname==="/classes"||pathname==="/tags";
  return (
    <>
      <HeadMenu {...props} />
    <div
    style={{
      display:'flex',
      justifyContent:'center'
    }}
    >
      {isSpecial
      ?(<div
        className={styles.withoutMarginTop}
      >
        {props.children}
      </div>)
    :(<div
      className={styles.normal}
    >
      {props.children}
    </div>)
    }
    </div>    
    </>
  )
}
