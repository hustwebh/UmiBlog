declare module '*.css'
// declare module '*.less'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement
  const url: string
  export default url
}
declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.js'
declare module 'js-cookie'
declare module 'markdown-it'
