import { Menu as MenuAntd, MenuProps } from 'antd'
import { Routes } from '@shared/config'
import { useNavigate } from 'react-router-dom'
import { MenuInfo } from 'rc-menu/lib/interface'

export const Menu = () => {
  const navigate = useNavigate()

  const handlerChange: MenuProps['onClick'] = (e: MenuInfo) => {
    navigate(e.key)
  }

  return (
    <MenuAntd
      onClick={handlerChange}
      items={[
        { key: Routes.excelToPdf, label: 'Excel -> Pdf' },
        { key: Routes.books, label: 'Электронная книга' }
      ]}
    />
  )
}
