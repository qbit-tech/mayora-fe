import React, { ReactNode, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import HeaderSection from '../../components/HeaderSection';
import { Button } from 'antd';
import styled from 'styled-components';
import { Row, Typography } from 'antd';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import '../../assets/app.css';
import ProductionStatusTab from './ProductionStatus/ProductionStatusTab';
import ProductionOutputTab from './ProductionOutput/ProductionOutputTab';
import OeeVsTargetTab from './OEEVSTarget/OeeVsTargetTab';
import OeeTab from './OEE/OeeTab';
// import { roductionStatusTab } from './ProductionStatus/ProductionStatusTab';

const { Text } = Typography;

const Dashboard: React.FC = () => {
  type ButtonProps = {
    children?: ReactNode,
    active?: boolean,
    id?: string,
    onClick?: React.MouseEventHandler

  };

  type Props = {
    children?: ReactNode,
    active?: string | null
    id?: string,
    onClick?: React.MouseEventHandler

    // any props that come into the component
  }

  const [active, setActive] = useState<string>("1")

  const Button = styled.button<ButtonProps>`
    color: ${({ active }) => (active ? 'white' : '#757575')};
    background-color: ${({ active }) => (active ? '#0961CA' : 'white')};
    padding: 4px 15px;
    font-weight: 600;
    height: 32px;
    border-radius: 6px;
    border-color:  ${({ active }) => (active ? '' : '#C7C7C7')};
    border-width: thin !important;
    border: solid;
    margin: 1px;
    margin-left: ${({ id }) => (id === '1' ? '0' : '-20px')}; // Adjust margin-left based on the tab index
    border-bottom: none !important;
  `;

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Production Target',
      children: <ProductionStatusTab />,
    },
    {
      key: '2',
      label: 'Production Output',
      children: <ProductionOutputTab />,
    },
    {
      key: '3',
      label: 'OEE VS Target',
      children: <OeeVsTargetTab />,
    },
    {
      key: '4',
      label: 'OEE',
      children: <OeeTab />,
    },

  ];

  
  return (
    <React.Fragment>
      <Tabs activeKey={active} onChange={(key) => setActive(key)} style={{outline: "none"}} defaultActiveKey='1'>
        {tabItems.map((item) => (
          <Tabs.TabPane key={item.key}
            tab={
              <Button id={item.key} active={active === item.key} onClick={() => setActive(item.key)} style={{outline: "none", border: "none"}}>
                {item.label}
              </Button>}
          >
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </React.Fragment>
  );
};
export default Dashboard;
