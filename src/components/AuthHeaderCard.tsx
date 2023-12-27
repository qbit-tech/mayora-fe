import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import {
  useNavigate
} from 'react-router-dom';

interface Props {
  title?: string
  subtitle: string
  status?: 'email' | 'password'
  showBackButon?: boolean;
}

const AuthHeaderCard: React.FC<Props> = ({ title, subtitle, status, showBackButon }) => {
  const navigate = useNavigate();

  return (
    <AuthWrapperHeader style={{textAlign: status?'center':'left'}}>
      {showBackButon?(
        <HeaderContainer>
          <Button
          size="large"
          type="default"
          style={{height: '50px'}}
          onClick={()=>navigate(-1)}
          >
            <ArrowLeftOutlined/>
          </Button>
          <Center>
            <img height="40" src="/logo.png" alt="Logo" />
          </Center>
        </HeaderContainer>
      ):(
        <img height="40" src="/logo.png" alt="Logo" />
      )}
      {
        status === 'email' ? (
          <IconStatus src="/images/send-reset-password-success.svg" alt="icon-send-reset-password-success" />
        ) : status === 'password' ? (
          <IconStatus src="/images/reset-password-success.svg" alt="icon-reset-password-success" />
        ) : <></>
      }
      {title && <AuthTitleCard>{title}</AuthTitleCard>}
      <AuthSubTitleCard>{subtitle}</AuthSubTitleCard>
    </AuthWrapperHeader>
  )
}
const Center = styled.div`
  text-align: center;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50px minmax(10px, 1fr) 50px;
`;

export const AuthWrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin-bottom: 20px;
`

export const IconStatus = styled.img`
  margin-top: 40px;
`;

export const AuthTitleCard = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 20px;
`

export const AuthSubTitleCard = styled.div`
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.charcoal400};
  margin-top: 10px;
  width: 100%;
`

export default AuthHeaderCard