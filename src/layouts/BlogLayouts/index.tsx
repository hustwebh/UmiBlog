import React from 'react';
import HeadMenu from '@/components/BlogComponents/HeaderMenu';


export default function Index(props: any) {
  return (
    <>
      <HeadMenu {...props} />
    <div
    style={{
      display:'flex',
      justifyContent:'center'
    }}
    >
      <div
      style={{
        width:'80%',
        borderRadius: 10,
        height:700,
        backgroundColor:'gray',
        marginTop:'15%'
      }}>
        {props.children}
      </div>
    </div>    
    </>
  )
}
