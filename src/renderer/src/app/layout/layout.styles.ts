import styled from 'styled-components'
import { Layout } from 'antd'

export const SLayout = styled(Layout)`
  display: grid;
  grid-template-columns: 200px auto;

  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  padding: 15px;
`

export const SContainer = styled.div`
  padding: 0 15px;
`
