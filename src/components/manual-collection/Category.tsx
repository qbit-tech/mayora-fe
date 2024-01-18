import { EditOutlined, TagOutlined } from '@ant-design/icons'
import { Button, message, Table, TableProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import { CategoryList } from '../../data/model';
import { IManualollectionListItem } from '../../data/model/manual-collection';
import { ModalEdit } from './ModalEdit';

interface ManualTableProps{
  data:IManualollectionListItem[],
  fetchList: () => Promise<void>;
}
function ManualTable(props: ManualTableProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedManual, setSelectedManual] = useState<IManualollectionListItem>(props.data[0])
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const editManual = async() =>{
    if (selectedValue === "" || selectedValue === null || selectedValue === undefined) {
        return message.error("Value Name is required");
    }

    try {
        setIsLoading(true)
        await axios.patch(
          process.env.REACT_APP_BASE_URL + '/manual-collection/' + selectedManual.id,
          {
            ...selectedManual,
            value:selectedValue
          }
        );
        message.success("Successfully edit value manual collection");
        setIsLoading(false)
        await props.fetchList()
    } catch (error) {
        setIsLoading(false)
        return message.error("Error edit value manual collection");
    }
  }

  const columns = [
    {
        title: 'Name',
        dataIndex: 'id',
        width: 200,
        key: 'id',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
                <div className="">
                    {manual.id ? manual.id : '-'}
                </div>
            );
        }
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'target',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
                <div className="">
                    {manual.value ? manual.value : '-'}
                    <EditOutlined onClick={()=>{
                      setSelectedManual(manual); 
                      setSelectedValue(manual.value)
                      setIsModalOpen(true);
                    }} style={{marginLeft:'5px'}}/>
                </div>
            );
        }
    },
    {
        title: 'Total',
        dataIndex: 'value',
        key: 'total',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
                <div className="">
                    {manual.value ? manual.value : '-'}
                </div>
            );
        }
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
        key: 'detail',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
              <Button type="link" onClick={()=>{console.log('button')}}>Detail</Button>
            );
        }
    },
];

  return (
    <ContainerStyle>
      <ModalEdit
          setValue={setSelectedValue}
          value={selectedValue}
          isModal={true}
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            editManual()
          } }
          onSuccess={() => {
            setIsModalOpen(false);
          } }
          onModalCancel={() => setIsModalOpen(false)}
        />
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            style={{ marginTop: 10, width: '100%' }}
        />
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 950px;
  border-bottom: 1px solid #eeefef;
`;

export default ManualTable