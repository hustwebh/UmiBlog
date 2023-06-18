import { Outlet } from '@umijs/max'

export default function Index(props: any) {
  const {
    location: { pathname },
  } = window
  return (
    <>
      <div
        style={{
          height: '100vh',
        }}
      >
        <Outlet />
      </div>
    </>
  )
}
