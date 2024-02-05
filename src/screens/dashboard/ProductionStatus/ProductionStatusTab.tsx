import React, { useEffect, useState } from 'react';
import { message, Row, Typography } from 'antd';
import ProductionStatusCard, { Item } from '../../../components/ProductionStatus';
import { DetailUserWithMachine, ProductionStatus } from '../../../data/model/machines';
import { HttpParam } from '../../../types/config.type';
import { useAuthUser } from 'react-auth-kit';
import moment from 'moment';
import { Http } from '../../../utility/http';

const { Text } = Typography;

const ProductionStatusTab: React.FC = () => {
  const [production, setProduction] = useState<ProductionStatus | null>()
  const [productionBar, setProductionBar] = useState<Item[]>([])
  const [isLoading, setIsLoadingGet] = useState<boolean>(false)
  const auth = useAuthUser();
  let machines: DetailUserWithMachine[] = auth()?.machines
  const [selectedMachine, setSelectedMachine] = useState<DetailUserWithMachine>(machines[0])
  
  const fetchData = async() =>{
    try {
      setIsLoadingGet(true)
      const params: HttpParam = {
        method: "get",
        path: "machines/production/" + (selectedMachine ? selectedMachine.machineId : '') + '/' + moment().format('YYYY-MM-DD'),
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
  },[])

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

    setProductionBar([
      ...statusMachine,
      ...startup,
      ...trouble,
    ])
  }

  return (
    <ProductionStatusCard
      productionBar={productionBar}
      seletedMachine={selectedMachine}
    />
  );
};

export default ProductionStatusTab;
