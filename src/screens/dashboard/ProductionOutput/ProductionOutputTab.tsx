import React from 'react';
import { Row, Typography } from 'antd';

const { Text } = Typography;

const ProductionOutputTab: React.FC = () => {
  return (
    <div style={{ height: 'auto', width: '100%', backgroundColor: 'white', padding: '20px' }}>
      <Row gutter={20}>
        <Text style={{ fontWeight: 'bold' }}>Production Output</Text>
      </Row>
    </div>
  );
};

export default ProductionOutputTab;
