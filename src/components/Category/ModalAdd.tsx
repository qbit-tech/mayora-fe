/** => import package */
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal, Table, Button, Input, Select, message, Divider, Space, InputRef } from "antd";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
    const [items, setItems] = useState(['kg', 'm','gr','min','hr'])
    const inputRef = useRef<InputRef>(null);
    const [newItem, setNewItem] = useState<string>('')

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, newItem]);
        setNewItem('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      };

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
            <InputWithLabel label="Unit/Satuan">
                <Select
                    style={{ width: 300 }}
                    placeholder="Unit"
                    value={props.unit}
                    onChange={(value)=>props.setUnit(value)}
                    dropdownRender={(menu) => (
                        <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                                placeholder="Add new unit"
                                ref={inputRef}
                                value={newItem}
                                onChange={(e)=>setNewItem(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Add item
                            </Button>
                        </Space>
                        </>
                    )}
                    options={items.map((item) => ({ label: item, value: item }))}
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
