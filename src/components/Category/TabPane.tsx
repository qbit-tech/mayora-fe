import { PlusSquareOutlined } from '@ant-design/icons'
import { Tree } from 'antd'
import { DataNode } from 'antd/es/tree';
import { Key } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

interface TabPaneProps {
    treeData: DataNode[]
}
function TabPane(props:TabPaneProps) {
    return(
        <ContainerStyle>
            <Tree
              showLine={ true }
              showIcon={true}
              defaultExpandedKeys={['0-0-0']}
              treeData={props.treeData}
            />
        </ContainerStyle>
      )
}

const ContainerStyle = styled.div`
  height: 500px;
  background-color: white;

  .ant-tree-switcher-leaf-line{
    opacity: 0;
  }
`;

export default TabPane