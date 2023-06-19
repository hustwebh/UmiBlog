import Input from "@/components/ChatPage/input"
import Message from "@/components/ChatPage/message"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { message } from "antd"

import Cookies from 'js-cookie'
import storageHelper from "@/utils/storage"

import "./index.less"

// interface IChatParams {
//   token: strings
//   userInfo: IUserInfo
// }

interface IMessageInfo {
  user: {
    id: number
    email: string
  }
  message_content: string
  send_time: number // 秒
}

function Chat() {
  const { id, email, avatar } = storageHelper.get('account') || {};
  const [connectReady, setConnectReady] = useState<boolean>(false)
  const [msgList, setMsgList] = useState<IMessageInfo[]>([])
  const [userToken, setUserToken] = useState<String>(Cookies.get('token') || '')
  const ws = useRef<WebSocket | null>(null)
  const msgWindow = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (userToken !== "") {
      ws.current = new WebSocket("ws://175.178.43.145:4001/ws" + "/?token=" + userToken)
      ws.current.onopen = () => {
        setConnectReady(true)
      }
      ws.current.close = () => {
        setConnectReady(false)
      }
      ws.current.onerror = (e) => {
        message.error(JSON.stringify(e), 2)
      }
      ws.current.onmessage = handleReceiveMsg
    }

    return () => {
      ws.current?.close()
    }
  }, [ws, userToken])

  useEffect(() => {
    if (msgWindow.current) {
      msgWindow.current.scrollTop = msgWindow?.current?.scrollHeight
    }
  }, [msgList])

  const nowTime = new Date()
  const sendMsg = (Content: string) => {
    ws.current?.send(
      JSON.stringify({
        message_content: Content,
      })
    )
    let msgData: IMessageInfo = {
      user: {
        id: id,
        email: email,
      },
      message_content: Content,
      send_time: new Date().getTime(),
    }
    setMsgList((list) => list.concat([msgData]))
  }

  const handleReceiveMsg = (event: MessageEvent) => {
    let data = JSON.parse(event.data) as IMessageInfo
    data.send_time *= 1000
    if (data.user.id === id) {
      // 如果接收到的消息是自己发送的则忽略
      return
    }
    let nextMsgList = [...msgList]
    nextMsgList.push(data)
    setMsgList((list) => list.concat([data]))
  }

  return (
    <div className="chat">
      <div className="messages" ref={msgWindow}>
        {msgList.map((msg, index) => (
          <Message
            key={index}
            content={msg.message_content}
            nickname={msg.user.email}
            nowTime={nowTime}
            sentTime={msg.send_time}
            status={
              msg.user.id === id ? "sent" : "receive"
            }
          />
        ))}
      </div>
      <Input sendMessage={sendMsg} />
    </div>
  )
}

export default Chat