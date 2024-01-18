import React, { useState } from 'react';
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
    visibleInputCurrentTarget: boolean;
    onCancelInputCurrentTarget: () => void;
}


const InputCurrentTarget: React.FC<ModalComponentProps> = ({ visibleInputCurrentTarget, onCancelInputCurrentTarget }) => {



    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );





    return (
        <React.Fragment>

            <Modal 
                title={ <div className='text-start'>Set New Production Target</div> }
                centered 
                visible={visibleInputCurrentTarget}
                onCancel={onCancelInputCurrentTarget}
            >
                
                <Text>Target</Text>
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

                <br />

                <Text>Active Target</Text>

                <Input
                    placeholder="Active Target"
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

export default InputCurrentTarget;
