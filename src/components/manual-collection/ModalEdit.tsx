/** => import package */
import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, Table, Button, Input, Select, message } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { InputWithLabel } from "../InputWithLabel";
import axios from "axios";
import { IManualollectionListItem } from "../../data/model/manual-collection";


interface ModalAddCompanyProps {
    isModal?: boolean;
    isModalOpen?: boolean;
    onClose: () => void;
    onModalCancel?: () => void;
    iShipment?: number;
    onSuccess?: () => void;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export const ModalEdit: React.FC<ModalAddCompanyProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Modal
      title="Edit Value"
      visible={props.isModalOpen}
      onCancel={props.onModalCancel}
      footer={null}
      okText={"Save"}
      okButtonProps={{
        style: { color: "#FFFFFF", backgroundColor: "#060606" },
      }}
    >
        <InputWithLabel label="Category">
            <Input
                style={{ marginBottom: 10 }}
                onChange={(e)=>props.setValue(e.target.value)}
                placeholder="Category"
                value={props.value}
            />
        </InputWithLabel>

        <div style={{display:'flex', justifyContent:'flex-end', width:'100%', marginTop:'20px'}}>
            <Button style={{marginRight:'5px'}} onClick={props.onModalCancel}>Cancel</Button>
            <Button type="primary" onClick={()=>props.onClose()} disabled={isLoading}>{isLoading ? 'Loading...' : 'Save'}</Button>
        </div>
    </Modal>
  );
};
