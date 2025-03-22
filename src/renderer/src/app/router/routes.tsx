import { ExcelToPdf } from '@pages/ExcelToPdf'
import { Routes } from '@shared/config'
import { Books } from '@pages/Books'

import { createHashRouter } from 'react-router-dom'
import { Layout } from '../layout'

export const routes = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: Routes.excelToPdf,
        element: <ExcelToPdf />
      },
      {
        path: Routes.books,
        element: <Books />
      }
    ]
  }
])
