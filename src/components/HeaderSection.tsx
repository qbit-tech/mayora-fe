import { Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IconBack } from '../assets/icons';

interface HeaderSectionProps {
  icon?: React.ReactNode | 'back' | undefined;
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  icon,
  title,
  subtitle,
  rightAction,
}) => {
  const navigate = useNavigate();
  return (
    <Container
      style={{
        background: '#F4F6F9',
        marginLeft: '-20px',
        marginRight: '-20px',
        padding: '10px 24px',
      }}
    >
      <WrapperTitle>
        {icon === 'back' && (
          <WrapperIcon
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            {/* <ArrowLeftOutlined style={{ fontSize: 18 }} /> */}

            <IconBack />
          </WrapperIcon>
        )}

        <Title>{title}</Title>
        {/* {subtitle && (
          <Divider
            type="vertical"
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 15,
              marginRight: 15,
              height: 30,
            }}
          />
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>} */}
      </WrapperTitle>
      <WrapperAction>{rightAction}</WrapperAction>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const WrapperAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const WrapperIcon = styled.div`
  /* width: 35px;
  height: 35px;
  width: 20px;
  height: 20px; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px; */
  /* background-color: ${({ theme }) => theme.colors.ash400}; */
  padding-top: 5px;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.body};
  color: ${({ theme }) => theme.colors.charcoal300};
`;

export default HeaderSection;
