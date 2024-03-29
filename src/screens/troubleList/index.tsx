import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import {
  Pagination,
  Space,
  Table,
  Switch,
  Dropdown,
  Menu,
  Modal,
  message,
  Input,
  Select,
  Image,
  Tag,
  Typography,
  Button,
  Col,
  Row,
  DatePicker,
  Spin,
  Card,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import {
  BaseResponseProps, HttpParam,
} from '../../types/config.type';
import styled from 'styled-components';
import { ITroubleListItem } from '../../data/model/trouble';
import moment from 'moment';
import useAuthUser from 'react-auth-kit/dist/hooks/useAuthUser';
import { DetailUserWithMachine, ProductionStatus, Startup, StatusMachine } from '../../data/model/machines';
import 'react-calendar-timeline/lib/Timeline.css'
import { TroubleSimulator } from '../../components/TroubleSimulator';
import dayjs, {Dayjs} from 'dayjs';
import { Http } from '../../utility/http';
import ProductionStatusCard, { Item } from '../../components/ProductionStatus';

const Categories = () => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  let machines: DetailUserWithMachine[] = auth()?.machines
  const [selectedMachine, setSelectedMachine] = useState<DetailUserWithMachine>(machines[0])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoadingAdd, setIsLoading] = useState<boolean>(false)
  const [isLoading, setIsLoadingGet] = useState<boolean>(false)
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [production, setProduction] = useState<ProductionStatus | null>()
  const [productionBar, setProductionBar] = useState<Item[]>([])

  const groups = [{ id: 1, title: 'group 1' }]

  const fetchData = async() =>{
    try {
      setIsLoadingGet(true)
      const params: HttpParam = {
        method: "get",
        path: "machines/production/" + (selectedMachine ? selectedMachine.machineId : '') + '/' + date,
      };

      const result = await Http(params);
      if (result.code === "success") {
        setProduction(result.payload)
      } else {
       
      }
      setIsLoadingGet(false)
    } catch (error) {
        setIsLoadingGet(false)
        return message.error("Error create status machine");
    }
  }

  useEffect(()=>{
    fetchData()
  },[selectedMachine, date])

  useEffect(()=>{
    generateProductionStatus()
  },[production])

  function generateProductionStatus(){
    let trouble: Item[] = []
    let statusMachine: Item[] = []
    let startup: Item[] = []
    
    if(production){
      trouble = production?.trouble.map((item)=>({
        id: 'trouble' + item.id,
        start_time: moment(item.startTime),
        end_time: moment(item.endTime),
        group: 1,
        itemProps:{
          style: {
            background: "#E92548",
            border: 'none',
            height: '40px'
          }
        }
      }))
    }

    if(production){
      startup = production?.startup.map((item)=>({
        id: 'startup' + item.id,
        start_time: moment(item.startTime),
        end_time: moment(item.endTime),
        group: 1,
        itemProps:{
          style: {
            background: "#FABB43",
            border: 'none',
            height: '40px'
          }
        }
      }))
    }

    if(production){
      statusMachine = production?.statusMachine.map((item)=>({
        id: 'statusMachine' + item.id,
        start_time: moment(item.createdAt),
        end_time: moment(),
        group: 1,
        itemProps:{
          style: {
            background: item.status === 'off' ? '#9E9E9E' : '#0AC46B',
            border: 'none',
            height: '40px'
          }
        }
      }))
    }

    console.log("hgyui",startup,trouble)

    setProductionBar([
      ...statusMachine,
      ...startup,
      ...trouble,
    ])
  }

  const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text: string, trouble: ITroubleListItem) => {
            return (
                <div className="">
                  {trouble.startTime && moment(trouble.startTime).format('HH:mm')} - {trouble.endTime &&  moment(trouble.endTime).format('HH:mm')}
                </div>
            );
        }
    },
    {
        title: 'Duration',
        dataIndex: 'Duration',
        key: 'Duration',
        render: (text: string, trouble: ITroubleListItem) => {
          const inputMoment = moment(trouble.endTime);
          const duration = moment.duration(inputMoment.diff(trouble.startTime));

            return (
                <div className="">
                  {duration.asMinutes()}
                </div>
            );
        }
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
      render: (text: string, trouble: ITroubleListItem) => {
          return (
              <div className="">
                {trouble.categoryParent.name}
              </div>
          );
      }
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, trouble: ITroubleListItem) => {
          return (
              <div className="">
                {trouble.user.name}
              </div>
          );
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      render: (text: string, trouble: ITroubleListItem) => {
          return (
              <div className="">
                {moment(trouble.updatedAt).format('DD MMM YYYY HH:mm')}
              </div>
          );
      }
    },
    {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        render: (text: string, trouble: ITroubleListItem) => {
            return (
              <Button type="link" onClick={()=>navigate('edit/'+trouble.id+'/'+trouble.categoryParent.id)}>Edit</Button>
            );
        }
    },
];

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Trouble List"
        rightAction={
          <React.Fragment>
            <Dropdown overlay={
              <Menu>             
                {
                  machines.map((record) => (
                    <Menu.Item key={record.machineId} onClick={() => setSelectedMachine(record)}>
                      {record.machine.name}
                    </Menu.Item>
                  ))
                }
              </Menu>
            }>
              <Button>
                <span className="mr-2">
                  {selectedMachine?.machine.name}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker style={{ marginLeft: 10 }} value={dayjs(date, 'YYYY-MM-DD')} onChange={(value, stringValue)=>setDate(stringValue)}/>
            <Button type='primary' onClick={()=>setIsModalOpen(true)}>
              Add Data
            </Button>
          </React.Fragment>
        }
      />
        <ProductionStatusCard
          productionBar={productionBar}
          seletedMachine={selectedMachine}
        />
       <Table
          columns={columns}
          dataSource={production?.trouble}
          pagination={false}
          style={{ marginTop: 10, width: '100%' }}
          loading={isLoading}
        />
        
        <TroubleSimulator
          machineId={selectedMachine.machineId}
          isModal={true}
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          } }
          onSuccess={() => {
            fetchData()
          } }
          onModalCancel={() => setIsModalOpen(false)}
        />
    </React.Fragment>
  );
};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export default Categories;

