import React, { useState } from 'react';
import {
    Modal,
    Input,
    Typography,
    message,
    Form,
    TimePicker,
} from 'antd';
import {
    BaseResponseProps,
} from '../../../types/config.type';
import styled from 'styled-components';
import { initialProduct, ProductProps } from '../../../types/products.type';
import { initialTarget, TargetProps } from '../../../types/target.type';
import { initialTargetDefault, TargetDefaultProps } from '../../../types/targetDefault.type';
import { initialTargetOEE, TargetOEEProps } from '../../../types/targetOEE.type';
import { httpRequest } from '../../../helpers/api';
import { useNavigate } from 'react-router-dom';
import { TargetCurrentProps, initialTargetCurrent } from '../../../types/targetCurrent.type';
import dayjs from 'dayjs';

interface ResponseProps extends BaseResponseProps<ProductProps> {
    payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text, Link } = Typography;

interface ModalComponentProps {
    visibleInputCurrentTarget: boolean;
    onCancelInputCurrentTarget: () => void;
}


const InputCurrentTarget: React.FC<ModalComponentProps> = ({ visibleInputCurrentTarget, onCancelInputCurrentTarget }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetCurrentProps>(initialTargetCurrent);
    const navigate = useNavigate();

    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );

    const createTarget = async (props: Omit<TargetCurrentProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                // activeTarget: field.activeTarget,
                activeTarget: new Date().toISOString().slice(0, 10) + 'T' + field.activeTarget + '.000Z',
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            await httpRequest.post('/productionTargets', dataToSent)

            message.success('Success create new target');
            navigate(0)
        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            onCancelInputCurrentTarget();
        }
    };



    return (
        <React.Fragment>

            <Modal
                title={<div className='text-start'>Set New Production Target</div>}
                centered
                visible={visibleInputCurrentTarget}
                onCancel={onCancelInputCurrentTarget}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    name="currentTargetForm"
                    layout="vertical"
                    onFinish={createTarget}
                    autoComplete="off"
                >
                    <Text>Target</Text>
                    <Form.Item
                        name="target"
                        label="Target"
                        rules={[{ required: true, message: 'Please input target' }]}
                    >
                        <Input
                            placeholder="Current Target"
                            value={field.target}
                            onChange={(e) =>
                                // setTempRelease({
                                //     ...tempRelease,
                                //     name: e.target.value,
                                // })
                                setField({
                                    ...field,
                                    target: e.target.value,
                                })
                            }
                        />
                    </Form.Item>

                    <br />

                    <Text>Active Target</Text>
                    <Form.Item
                        name="activeTarget"
                        label="Active Target"
                        rules={[{ required: true, message: 'Please input active target' }]}
                    >
                        <TimePicker 
                            placeholder="Active Target" 
                            value={dayjs(field.activeTarget)}
                            onChange={(value) =>
                                setField({
                                  ...field,
                                  activeTarget: value?.format('HH:mm:ss') || '',
                                })
                              }
                        />
                    </Form.Item>
                </Form>

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
