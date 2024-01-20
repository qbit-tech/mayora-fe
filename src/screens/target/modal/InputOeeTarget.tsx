import React, { useState } from 'react';
import {
    Modal,
    Input,
    Typography,
    message,
    Form,
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


interface ResponseProps extends BaseResponseProps<ProductProps> {
    payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text, Link } = Typography;

interface ModalComponentProps {
    visibleInputOeeTarget: boolean;
    onCancelInputOeeTarget: () => void;
}


const InputOeeTarget: React.FC<ModalComponentProps> = ({ visibleInputOeeTarget, onCancelInputOeeTarget }) => {


    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetOEEProps>(initialTargetDefault);
    const navigate = useNavigate();

    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );

    const createTarget = async (props: Omit<TargetOEEProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            await httpRequest.post('/oeeTargets', dataToSent)

            message.success('Success create new target');
            navigate(0)
        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            onCancelInputOeeTarget();
        }
    };



    return (
        <React.Fragment>

            <Modal
                title={<div className='text-start'>Set New OEE Target</div>}
                centered
                visible={visibleInputOeeTarget}
                onCancel={onCancelInputOeeTarget}
                onOk={() => form.submit()}
            >

                <Text>OEE Target</Text>
                <Form
                    form={form}
                    name="oeeTargetForm"
                    layout="vertical"
                    onFinish={createTarget}
                    autoComplete="off"
                >
                    <Form.Item
                        name="target"
                        label="Target"
                        rules={[{ required: true, message: 'Please input target' }]}
                    >
                        <Input
                            placeholder="OEE Target in %"
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
                </Form>

            </Modal>

        </React.Fragment>
    );

};

export default InputOeeTarget;
