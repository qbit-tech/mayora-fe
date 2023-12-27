import React from 'react'
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export default function TooltipBCInfoData() {
  return (
    <Tooltip title="Use BC System to change this data" placement="right">
      <InfoCircleOutlined />
    </Tooltip>
  );
}