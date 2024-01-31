import React, { useState } from 'react';
import {
    Typography,
    Row,
    Col,
    Modal,
    Form,
    Input,
    message,
    TimePicker,
    InputNumber,
} from 'antd';
import { formatDate, PAGE_SIZE_OPTIONS } from '../../../helpers/constant';
import { initialRelease, ReleaseProps } from '../../../types/release.type';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';
import { httpRequest } from '../../../helpers/api';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const { Text, Link } = Typography;

interface ModalComponentProps {
    visibleInputRelease: boolean;
    onCancelInputRelease: () => void;
    onCreateSuccess: () => void;
}

dayjs.extend(utc);

const ReleaseAddModal: React.FC<ModalComponentProps> = ({ visibleInputRelease, onCancelInputRelease, onCreateSuccess }) => {

    const [visibleInputDefaultRelease, setVisibleInputDefaultRelease] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<ReleaseProps>(initialRelease);
    const [dataRelease, setDataRelease] = React.useState<ReleaseProps[]>([]);

    // const openInputDefaultReleasetModal = () => {
    //     setVisibleInputRelease(true);
    // };

    const createRelease = async (props: Omit<ReleaseProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                amount: field.amount,
                time: new Date().toISOString().slice(0, 10) + ' ' + field.time + ' +0700',
                machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            await httpRequest.post('/releases', dataToSent)

            message.success('Success create new value');

            onCreateSuccess();
        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);

            onCancelInputRelease();
        }
    }

    return (
        <React.Fragment>

            <Modal
                title={<div className='text-start'>Add New Testing Data For Output</div>}
                centered
                visible={visibleInputRelease}
                onCancel={onCancelInputRelease}
                onOk={() => form.submit()}
            >

                <Text>Output</Text>
                <Form
                    form={form}
                    name="releaseForm"
                    layout="vertical"
                    onFinish={createRelease}
                    autoComplete="off"
                >
                    <Form.Item
                        name="amount"
                        label="Output"
                        rules={[{ required: true, message: 'Please input all the reserved field' }]}
                    >
                         <InputNumber
                            placeholder="Output Amount"
                            value={field.amount}
                            onChange={(e) =>
                                setField({
                                    ...field,
                                    amount: e !== null ? e : 0
                                })
                            }
                            style={{ width: '100%' }}
                        />

                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Time For Output"
                        rules={[{ required: true, message: 'Please input Time' }]}
                    >
                        <TimePicker
                            placeholder="Output Time"
                            value={dayjs(field.time)}
                            onChange={(value) =>
                                setField({
                                    ...field,
                                    time: value?.format('HH:mm:ss') || '',
                                })
                            }
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                </Form>

            </Modal>

        </React.Fragment>
    );

};

export default ReleaseAddModal;