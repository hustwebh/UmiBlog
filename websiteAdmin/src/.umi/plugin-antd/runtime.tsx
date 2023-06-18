// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react'
import {
  Modal,
  message,
  notification,
} from 'antd'
import { ApplyPluginsType } from 'umi'
import { getPluginManager } from '../core/plugin'

let cacheAntdConfig = null

const getAntdConfig = () => {
  if(!cacheAntdConfig){
    cacheAntdConfig = getPluginManager().applyPlugins({
      key: 'antd',
      type: ApplyPluginsType.modify,
      initialValue: {
      },
    })
  }
  return cacheAntdConfig
}

export function rootContainer(rawContainer) {
  const {
    appConfig,
    ...finalConfigProvider
  } = getAntdConfig()
  let container = rawContainer


  return container
}
