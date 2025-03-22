import { SContainer, SLayout } from './layout.styles'
import { Outlet } from 'react-router-dom'
import { Menu } from '@features/Menu'

export const Layout = () => {
  return (
    <SLayout>
      <Menu />
      <SContainer>
        <Outlet />
      </SContainer>
    </SLayout>
  )
}
