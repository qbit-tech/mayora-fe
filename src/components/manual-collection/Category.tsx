import { EditOutlined, TagOutlined } from '@ant-design/icons'
import { Button, message, Table, TableProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import { CategoryList } from '../../data/model';
import { IManualollectionListItem } from '../../data/model/manual-collection';
import { ModalEdit } from './ModalEdit';
import { useNavigate } from "react-router-dom";

type TableManualType = {
  id: String;
  name: String;
  value1: IManualollectionListItem | undefined;
  value2: IManualollectionListItem | undefined;
  value3: IManualollectionListItem | undefined;
  total: Number;
  unit: String;
}

type SingleManual = {
  value : Number;
  id : String | undefined;
}

interface ManualTableProps{
  data:CategoryList[],
  fetchList: () => Promise<void>;
  idMachine: number | undefined;
}
function ManualTable(props: ManualTableProps) {
  const navigate = useNavigate();

  const convertedData = () : TableManualType[] => {
    return [
      ...props.data
      .map(item=>{
        const shift1 = item.manualCollection.find(manual => manual.shift === 1)
        const shift2 = item.manualCollection.find(manual => manual.shift === 2)
        const shift3 = item.manualCollection.find(manual => manual.shift === 3)

        return {
            id: item.id,
            name: item.name,
            value1: shift1,
            value2: shift2,
            value3: shift3,
            total: 
              (shift1 && shift1.machineId === props.idMachine ? Number(shift1.value) : 0) + 
              (shift2 && shift2.machineId === props.idMachine ? Number(shift2.value) : 0) + 
              (shift3 && shift3.machineId === props.idMachine ? Number(shift3.value) : 0),
            unit: item.unit
          }
      })
    ]
  }

  const columns = [
    {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, category: TableManualType) => {
            return (
                <div className="">
                    {category.name ? category.name : '-'}
                </div>
            );
        }
    },
    {
        title: 'Value (Shift 1)',
        dataIndex: 'value1',
        key: 'value1',
        render: (text: string, category: TableManualType) => {
            return (
                <div className="">
                  {category.value1 && category.value1.machineId === props.idMachine ? `${category.value1.value} ${category.unit}` : '-'}
                  {
                    (category.value1 === undefined || category.value1.machineId === props.idMachine) &&
                    <EditOutlined 
                      style={{color:'blue'}}
                      onClick={
                        ()=>props.idMachine && navigate(`edit/${category.id}/1/${props.idMachine}`)
                    }/>
                  }
                </div>
            );
        }
    },
    {
      title: 'Value (Shift 2)',
      dataIndex: 'value2',
      key: 'value2',
      render: (text: string, category: TableManualType) => {
          return (
              <div className="">
                  {category.value2 && category.value2.machineId === props.idMachine ? `${category.value2.value} ${category.unit}` : '-'}
                  {
                    (category.value2 === undefined || category.value2.machineId === props.idMachine) &&
                    <EditOutlined 
                      style={{color:'blue'}}
                      onClick={
                        ()=>props.idMachine && navigate(`edit/${category.id}/2/${props.idMachine}`)
                    }/>
                  }
              </div>
          );
      }
  },
  {
    title: 'Value (Shift 3)',
    dataIndex: 'value3',
    key: 'value3',
    render: (text: string, category: TableManualType) => {
        return (
            <div className="">
              {category.value3 && category.value3.machineId === props.idMachine ? `${category.value3.value} ${category.unit}` : '-'}
              {
                (category.value3 === undefined || category.value3.machineId === props.idMachine) &&
                <EditOutlined 
                  style={{color:'blue'}}
                  onClick={
                    ()=>props.idMachine && navigate(`edit/${category.id}/3/${props.idMachine}`)
                }/>
              }
            </div>
        );
    }
},
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text: string, category: TableManualType) => {
            return (
                <div className="">
                    {category.total ? category.total.toString() + " " + category.unit : '-'}
                </div>
            );
        }
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
        key: 'detail',
        render: (text: string, category: TableManualType) => {
            return (
              <>
                {
                  props.idMachine &&
                  <Button type="link" onClick={()=>navigate('detail/'+category.id+'/'+props.idMachine)}>Detail</Button>
                }
              </>
              
            );
        }
    },
];

  return (
    <ContainerStyle>
        <Table
            columns={columns}
            dataSource={convertedData()}
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