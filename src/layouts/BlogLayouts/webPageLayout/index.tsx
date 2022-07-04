import HeadMenu from '@/components/BlogComponents/HeaderMenu';
import styles from './index.less';
import ReactCanvasNest from 'react-canvas-nest';

export default function Index(props: any) {
  const {
    location: { pathname },
  } = props;
  const isSpecial = pathname === '/tags' || pathname === '/classes';
  return (
    <div>
      <div className={styles.head}>
        <HeadMenu {...props} />
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
          <div className={styles.withoutMarginTop}>{props.children}</div>
        ) : (
          <div className={styles.normal}>{props.children}</div>
        )}
      </div>
    </div>
  );
}
