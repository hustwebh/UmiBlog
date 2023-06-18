import HeadMenu from '@/components/HeaderMenu'
import { Outlet } from '@umijs/max'
import ReactCanvasNest from 'react-canvas-nest'
import styles from './index.less'

export default function Index() {
  const {
    location: { pathname },
  } = window
  const isSpecial = pathname === '/tags' || pathname === '/classes'
  return (
    <div style={{height:'100%'}}>
      <div className={styles.head}>
        <HeadMenu />
        <div className={styles.container}>
          <h1>-Mr.Quit's Blog-</h1>
          <h3>欢迎到访</h3>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ReactCanvasNest />
        {isSpecial ? (
          <div className={styles.withoutMarginTop}>
            <Outlet />
          </div>
        ) : (
          <div className={styles.normal}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}
