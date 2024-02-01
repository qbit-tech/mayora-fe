/** => import package */
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal, Table, Button, Input, Select, message, Divider, Space, InputRef } from "antd";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { InputWithLabel } from "./InputWithLabel";
import axios from "axios";
import { Http } from "../utility/http";
import { HttpParam } from "../types/config.type";
import moment from "moment";


interface ModalAddCompanyProps {
    isModal?: boolean;
    isModalOpen?: boolean;
    onClose: () => void;
    onModalCancel?: () => void;
    iShipment?: number;
    onSuccess: () => void;
    machineId?: number;
}

export const TroubleSimulator: React.FC<ModalAddCompanyProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const randomize = (min:number, max:number) =>{
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleStatusMachine = async (status: string) =>{
        if (props.machineId === 0 || props.machineId === null || props.machineId === undefined) {
            return message.error("Please selectc machine first!!!!");
        }

        try {
            setIsLoading(true)
            const params: HttpParam = {
              data: {
                machineId : props.machineId,
                status
              },
              method: "post",
              path: "status-machine",
            };
      
            const result = await Http(params);
            if (result.code === "success") {
              props.onSuccess()
              message.success("Successfully created status machine");
            } else {
             
            }
            setIsLoading(false)
            // await props.fetchList()
        } catch (error) {
            setIsLoading(false)
            return message.error("Error create status machine");
        }
    }

    const handleAddTrouble = async () =>{
      if (props.machineId === 0 || props.machineId === null || props.machineId === undefined) {
          return message.error("Please selectc machine first!!!!");
      }

      try {
          setIsLoading(true)
          const params: HttpParam = {
            data: {
              machineId : props.machineId,
              categoryId: randomize(1,9),
              startTime: moment().subtract(randomize(10,60), 'minutes'),
              endTime: moment()
            },
            method: "post",
            path: "troubles",
          };
    
          const result = await Http(params);
          if (result.code === "success") {
            props.onSuccess()
            message.success("Successfully created trouble");
          } else {
           
          }
          setIsLoading(false)
          // await props.fetchList()
      } catch (error) {
          setIsLoading(false)
          return message.error("Error create trouble");
      }
  }

  const handleAddStartup = async () =>{
    if (props.machineId === 0 || props.machineId === null || props.machineId === undefined) {
        return message.error("Please selectc machine first!!!!");
    }

    try {
        setIsLoading(true)
        const params: HttpParam = {
          data: {
            machineId : props.machineId,
            startTime: moment().subtract(randomize(10,60), 'minutes'),
            endTime: moment()
          },
          method: "post",
          path: "startup",
        };
  
        const result = await Http(params);
        if (result.code === "success") {
          props.onSuccess()
          message.success("Successfully created startup");
        } else {
         
        }
        setIsLoading(false)
        // await props.fetchList()
    } catch (error) {
        setIsLoading(false)
        return message.error("Error create startup");
    }
}


  return (
    <Modal
      title="Simulator"
      visible={props.isModalOpen}
      onCancel={props.onModalCancel}
      footer={null}
      okText={"Save"}
      okButtonProps={{
        style: { color: "#FFFFFF", backgroundColor: "#060606" },
      }}
    >   
        Select Action Button
        <div style={{display:'flex', justifyContent:'space-between', width:'100%', marginTop:'20px'}}>
            <Button onClick={()=>handleStatusMachine('off')}>Trigger Machine OFF</Button>
            <Button onClick={()=>handleAddStartup()}>Startup</Button>
            <Button onClick={()=>handleStatusMachine('on')}>Running</Button>
            <Button onClick={()=>handleAddTrouble()}>Down</Button>
        </div>
    </Modal>
  );
};
