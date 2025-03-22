import { antdTheme } from './antdTheme'
import { ConfigProvider } from 'antd'
import { FC, PropsWithChildren } from 'react'

const WithAntdConfig: FC<PropsWithChildren> = ({ children }) => (
  <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
)

export default WithAntdConfig
