import HeadMenu from '@/components/BlogComponents/HeaderMenu';
import styles from './index.less';
import ReactCanvasNest from 'react-canvas-nest';

export default function Index(props: any) {
  const {
    location: { pathname },
  } = props;
  const isSpecial = pathname === '/tags' || pathname === '/classes';
  return (
    <>
      <HeadMenu {...props} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className={styles.head}>
          <div className={styles.container}>
            <h1>-Do Work That Matters-</h1>
            <h3>.....</h3>
          </div>
        </div>
        <ReactCanvasNest />
        {isSpecial ? (
          <div className={styles.withoutMarginTop}>{props.children}</div>
        ) : (
          <div className={styles.normal}>{props.children}</div>
        )}
      </div>
    </>
  );
}
