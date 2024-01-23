import { TagOutlined } from '@ant-design/icons'
import { Button, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import { CategoryList } from '../../data/model';
import { ModalAddCategoryView } from './ModalAdd';

interface CategoryProps extends CategoryList{
  fetchList: () => Promise<void>;
  parentId: string;
}

function Category(props: CategoryProps) {
  const [name, setName] = useState<string>(props.name)
  const [categoryType, setCategoryType] = useState<string>(props.categoryType)
  const [unit, setUnit] = useState<string>(props.unit)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async() =>{
    try {
        setIsLoading(true)
        await axios.delete(process.env.REACT_APP_BASE_URL + '/categories/' + props.id);

        message.success("Successfully created category");
        setIsLoading(false)
        await props.fetchList()
    } catch (error) {
        setIsLoading(false)
        message.error("Error create category");
    }
  }

  const editCategory = async() =>{
    if (name === "" || name === null || name === undefined) {
        return message.error("Category Name is required");
    }

    if (categoryType === "" || categoryType === null || categoryType === undefined) {
        return message.error("Category Type is required");
    }

    if (unit === "" || unit === null || unit === undefined) {
        return message.error("Unit is required");
    }

    try {
        setIsLoading(true)
        await axios.patch(
          process.env.REACT_APP_BASE_URL + '/categories/' + props.id,
          {
            name,
            categoryType,
            unit
          }
        );
        message.success("Successfully created category");
        setIsLoading(false)
        await props.fetchList()
    } catch (error) {
        setIsLoading(false)
        return message.error("Error create category");
    }
  }

  return (
    <ContainerStyle>
        <div>
          <TagOutlined />
          <span style={{marginLeft:'10px'}}>{props.name}</span>
        </div>

        <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>setIsModalOpen(true)}>Edit</Button>
            <Button type="link" onClick={()=>handleDelete()} disabled={isLoading}>{isLoading ? 'Loading...' : 'Delete'}</Button>
        </div>

        <ModalAddCategoryView
          setName={setName}
          setUnit={setUnit}
          setCategoryType={setCategoryType}
          name={name}
          categoryType={categoryType}
          unit={unit}
          isModal={true}
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            editCategory()
          } }
          onSuccess={() => {
            setIsModalOpen(false);
          } }
          onModalCancel={() => setIsModalOpen(false)}
        />
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  height: 40px;
  border-bottom: 1px solid #eeefef;
`;

export default Category