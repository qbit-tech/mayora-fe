import React from 'react';
import styled from 'styled-components';
import AuthContentLeft from './AuthContentLeft';
import AuthContentLeftSecondary from './AuthContentLeftSecondary';
import { MainCheckHealth } from '@qbit-tech/libs-react';
import AuthContentRight from './AuthContentRight';

interface Props {
  variant?: 'primary' | 'secondary';
  formPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({
  children,
  variant = 'primary',
  formPosition = 'right',
}) => {
  return (
    <div>
      {!!process.env.REACT_APP_CHECK_HEALTH && (
        <MainCheckHealth url={process.env.REACT_APP_CHECK_HEALTH || '/'} />
      )}
      <Container>
        {formPosition === 'right' ? (
          <>
            {/* {variant === 'primary' ? (
              <AuthContentLeft />
            ) : (
              <AuthContentLeftSecondary />
            )} */}
            <ContentRight>{children}</ContentRight>
          </>
        ) : (
          <>
            <ContentRight>{children}</ContentRight>
          </>
        )}
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentRight = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: center;
`;

export default AuthLayout;
