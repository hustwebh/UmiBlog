import { useState } from "react"
import { message } from "antd"
import "./input.less"

import Cookies from 'js-cookie'

interface IInputParams {
  sendMessage: (content: string) => void
}

export default function Input(params: IInputParams) {
  const [text, setText] = useState<string>("")
  const handleSendMsg = () => {
    if (text === "") {
      message.warning("发送消息不能为空", 1)
    } else {
      if (Cookies.get('token')) {
        params.sendMessage(text)
        setText("")
      } else {
        message.info("请先行登陆")
      }
    }
  }
  return (
    <div className="input">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMsg()
          }
        }}
      />
      <button onClick={handleSendMsg}>发 送</button>
    </div>
  )
}
