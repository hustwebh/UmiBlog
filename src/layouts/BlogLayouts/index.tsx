import React from 'react';
import HeadMenu from '@/components/BlogComponents/HeaderMenu';


export default function Index(props:any) {
  return (
    <div>
      <HeadMenu {...props}/>
      {props.children}
    </div>
  )
}
