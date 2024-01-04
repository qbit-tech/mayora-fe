import React, { ReactNode, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import HeaderSection from '../../components/HeaderSection';
import { Button } from 'antd';
import styled from 'styled-components';

const Dashboard: React.FC = () => {
  type ButtonProps = {
    children?: ReactNode,
    active?: boolean,
    id?: string,
    onClick?: React.MouseEventHandler

  };

  type Props = {
    children?: ReactNode,
    active?: string|null
    id?: string,
    onClick?: React.MouseEventHandler

    // any props that come into the component
  }

  const [active, setActive] = useState<string|null>("productionStatus")
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.id);
 }
  const Button = styled.button<ButtonProps>`
    color: ${({ active }) => (active ? 'white': '#757575')};
    background-color: ${({ active }) => (active ? '#0961CA': 'white')};
    padding: 4px 15px;
    font-weight: 600;
    height: 32px;
    border-radius: 6px;
    border-color:  ${({ active }) => (active ? '': '#C7C7C7')};
    border-width: thin !important;
    border: solid;
    margin: 3px;
  `;
  const Buttons = ({ children, active, id, onClick }: Props) => {
    return (
      <Button id={id} onClick={onClick} active={active === id ? true:false}>
        {children}
      </Button>
    );
  }
  return (
    <React.Fragment>
      {/* <HeaderSection
        icon={<UserOutlined />}
        title="Dasboardx`" // optional
        subtitle="Lorem ipsum dashboard"
      /> */}
      <div style={{display: 'flex'}}>
        <Buttons id="productionStatus" active={active} onClick={()=>setActive("productionStatus")}>Production Status</Buttons>
        <Buttons id="productionOutput" active={active} onClick={()=>setActive("productionOutput")}>Production Output</Buttons>
        <Buttons id="OEEVSTARGET" active={active} onClick={()=>setActive("OEEVSTARGET")}>OEE VS Target</Buttons>
        <Buttons id="OEE" active={active} onClick={()=>setActive("OEE")}>OEE</Buttons>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
