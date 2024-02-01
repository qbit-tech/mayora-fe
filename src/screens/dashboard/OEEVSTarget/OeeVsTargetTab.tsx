import React from 'react';
import { Row, Typography } from 'antd';

const { Text } = Typography;

const OeeVsTargetTab: React.FC = () => {
  return (
    <div style={{ height: 'auto', width: '100%', backgroundColor: 'white', padding: '20px' }}>
      <Row gutter={20}>
        <Text style={{ fontWeight: 'bold' }}>Oee Vs Target</Text>
      </Row>
    </div>
  );
};

export default OeeVsTargetTab;
