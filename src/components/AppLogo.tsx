import { Avatar, Image, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

type AppLogoProps = {
  collapsed: boolean;
};

const { Text } = Typography;

const AppLogo: React.FC<AppLogoProps> = ({ collapsed }) => {
  return (
    <LogoEtanaContainer collapsed={collapsed}>
      {collapsed ? (
        // <AppAvatar size="large">APP</AppAvatar>
        <Image
          preview={false}
          width={40}
          src={'/logo.png'}
          style={{
            objectFit: 'cover',
          }}
        />
      ) : (
        <AppTitle>
          <Image
            preview={false}
            width={40}
            src={'/logo.png'}
            style={{
              objectFit: 'cover',
            }}
          />

          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            {process.env.REACT_APP_WEBSITE_NAME}
          </Text>
        </AppTitle>
      )}
    </LogoEtanaContainer>
  );
};

type LogoEtanaContainerProps = {
  collapsed: boolean;
};

const LogoEtanaContainer = styled.div<LogoEtanaContainerProps>`
  padding: ${({ collapsed }) => (collapsed ? '0' : '3rem 16px')};
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
`;

const AppTitle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const AppAvatar = styled(Avatar)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default AppLogo;
