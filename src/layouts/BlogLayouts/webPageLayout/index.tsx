import HeadMenu from '@/components/BlogComponents/HeaderMenu';
import styles from './index.less';


export default function Index(props: any) {
  const { location: { pathname } } = props
  const isSpecial = pathname === "/tags" || pathname === "/classes"
  return (
    <>
      <HeadMenu {...props} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {isSpecial
          ? (<div
            className={styles.withoutMarginTop}
          >
            {props.children}
          </div>)
          : (<div
            className={styles.normal}
          >
            {props.children}
          </div>)
        }
      </div>
    </>
  )
}
