import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Modal,
    Input,
    Typography,
} from 'antd';
import {
    BaseResponseProps,
} from '../../../types/config.type';
import styled from 'styled-components';

import { initialProduct, ProductProps } from '../../../types/products.type';
import { initialTarget, TargetProps } from '../../../types/target.type';


interface ResponseProps extends BaseResponseProps<ProductProps> {
    payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text, Link } = Typography;

interface ModalComponentProps {
    visibleInputOeeTarget: boolean;
    onCancelInputOeeTarget: () => void;
}


const InputOeeTarget: React.FC<ModalComponentProps> = ({ visibleInputOeeTarget, onCancelInputOeeTarget }) => {


    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );





    return (
        <React.Fragment>

            <Modal 
                title={ <div className='text-start'>Set New OEE Target</div> }
                centered 
                visible={visibleInputOeeTarget}
                onCancel={onCancelInputOeeTarget}
            >
                
                <Text>OEE Target</Text>
                <Input
                    placeholder="Default Target"
                    value={tempRelease.name}
                    onChange={(e) =>
                        setTempRelease({
                            ...tempRelease,
                            name: e.target.value,
                        })
                    }
                />

            </Modal>

        </React.Fragment>
    );

};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export default InputOeeTarget;
