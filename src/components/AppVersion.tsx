import React from 'react'
import styled from 'styled-components'
import { appVersion, thisYear } from '../helpers/constant'

const AppVersion = () => {
  return (
    <VersionApp>
      v{appVersion} · © {thisYear}. {process.env.REACT_APP_WEBSITE_NAME}
    </VersionApp>
  );
}

const VersionApp = styled.div`
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.smallText};
  color: ${({ theme }) => theme.colors.charcoal400};
`
export default AppVersion