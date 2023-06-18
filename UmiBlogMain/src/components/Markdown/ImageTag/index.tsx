import React from 'react'
import Zmage from 'react-zmage'

const ImageTag = (props: any) => {
  const { src } = props
  return (
    <Zmage
      src={src}
      style={{ width: '100%' }}
      controller={{
        rotate: false,
        zoom: false,
      }}
    />
  )
}

export default ImageTag
