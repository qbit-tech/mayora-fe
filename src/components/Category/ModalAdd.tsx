/** => import package */
import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, Table, Button, Input, Select, message } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { InputWithLabel } from "../InputWithLabel";
import axios from "axios";


interface ModalAddCompanyProps {
    isModal?: boolean;
    isModalOpen?: boolean;
    onClose: () => void;
    onModalCancel?: () => void;
    iShipment?: number;
    onSuccess?: () => void;
    name?: string | undefined;
    categoryType?: string | undefined;
    unit?: string | undefined;
    setName: Dispatch<SetStateAction<string>>;
	setCategoryType: Dispatch<SetStateAction<string>>;
    setUnit: Dispatch<SetStateAction<string>>;
}

export const ModalAddCategoryView: React.FC<ModalAddCompanyProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Modal
      title="Add New Category"
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
                onChange={(e)=>props.setName(e.target.value)}
                placeholder="Category"
                value={props.name}
            />
        </InputWithLabel>

        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
            <InputWithLabel label="Unit/Satuan" style={{ flex: "45%", marginRight:'5px' }}>
                <Input
                    defaultValue="kg"
                    onChange={(e)=>props.setUnit(e.target.value)}
                    value={props.unit}
                />
            </InputWithLabel>
            <InputWithLabel label="Category Type" style={{ flex: "45%", marginLeft:'5px' }}>
                <Select
                    defaultValue="manualcollection"
                    onChange={(value)=>props.setCategoryType(value)}
                    options={[{ value: 'manualcollection', label: 'Manual Collection' }, { value: 'trouble', label: 'Trouble' }]}
                    value={props.categoryType}
                />
            </InputWithLabel>
        </div>

        <div style={{display:'flex', justifyContent:'flex-end', width:'100%', marginTop:'20px'}}>
            <Button style={{marginRight:'5px'}} onClick={props.onModalCancel}>Cancel</Button>
            <Button type="primary" onClick={()=>props.onClose()} disabled={isLoading}>{isLoading ? 'Loading...' : 'Save'}</Button>
        </div>
    </Modal>
  );
};
