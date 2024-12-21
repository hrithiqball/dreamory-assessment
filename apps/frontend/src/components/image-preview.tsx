import { CSSProperties } from 'react'

export function ImagePreview(props: { path: string; styles?: CSSProperties }) {
  const { path, styles } = props
  const prefix = 'http://localhost:3000/'
  const style = { width: '100%', height: 'auto', ...styles }

  return <img src={`${prefix}${path}`} alt="" style={style} />
}
