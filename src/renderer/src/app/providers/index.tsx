import WithAntdConfig from './WithAntdConfig'
import { FC, PropsWithChildren } from 'react'
import WithTheme from './WithTheme'
import GlobalStyle from '../styles/globalStyles'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WithTheme>
      <WithAntdConfig>
        <GlobalStyle />
        <>{children}</>
      </WithAntdConfig>
    </WithTheme>
  )
}

export default Providers
