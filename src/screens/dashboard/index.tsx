import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import HeaderSection from '../../components/HeaderSection';

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <HeaderSection
        icon={<UserOutlined />}
        title="Dasboard" // optional
        subtitle="Lorem ipsum dashboard"
      />
    </React.Fragment>
  );
};
export default Dashboard;
