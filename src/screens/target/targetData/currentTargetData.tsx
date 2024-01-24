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
} from 'antd';
import { formatDate, PAGE_SIZE_OPTIONS } from '../../../helpers/constant';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';
import { TargetCurrentProps, initialTargetCurrent } from '../../../types/targetCurrent.type';
import { httpRequest } from '../../../helpers/api';
import dayjs from 'dayjs';
import ProductionTargetLog from './targetTable/productionTargetLog';
import axios from 'axios';

const { Text, Link } = Typography;


type axiosPutResponse = {
    code: any;
    message: any;
    payload: {
        isSuccess: any;
        id: any;
    }
}

const CurrentTargetData = ({ onSuccessCallback }: { onSuccessCallback: (value: boolean) => void }) => {

    const {
        data,
    } = useCustomDataFetcher<TargetCurrentProps>({
        endpoint: 'productionTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });

    const [visibleInputCurrentTarget, setVisibleInputCurrentTarget] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetCurrentProps>(initialTargetCurrent);
    const [dataTarget, setDataTarget] = React.useState<TargetCurrentProps[]>([]);
    const [onSuccess, setOnSuccess] = React.useState<boolean>(false);
    const [onSuccessChild, setOnSuccessChild] = React.useState<boolean>(false);

    const openInputCurrentTargetModal = () => {
        setVisibleInputCurrentTarget(true);
    };

    const onCancelInputCurrentTarget = () => {
        setVisibleInputCurrentTarget(false);
    };

    const createTarget = async (props: Omit<TargetCurrentProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                // activeTarget: field.activeTarget,
                machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
                activeTarget: new Date().toISOString().slice(0, 10) + 'T' + field.activeTarget + '.000Z',
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            await httpRequest.post('/productionTargets', dataToSent)

            message.success('Success create new target');


        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            setOnSuccess(true);
            onCancelInputCurrentTarget();
        }
    };

    const editTarget = async (props: Omit<TargetCurrentProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                // activeTarget: field.activeTarget,
                machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
                activeTarget: new Date().toISOString().slice(0, 10) + 'T' + field.activeTarget + '.000Z',
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            // await httpRequest.put('/productionTargets/' + data[0].id, dataToSent)

            // message.success('Success edit target');
            

            // data[0].target = field.target;

            const response = await axios.put<axiosPutResponse>('/productionTargets/' + data[0].id, dataToSent);
            if (response.data.code === 'success' && response.data.payload.isSuccess) {    
                data[0].id = response.data.payload.id;
                data[0].target = field.target;
                message.success('Success edit target');
                console.log(data);
                setOnSuccess(true);
            } else {
                message.error(response.data.message || 'Failed to edit target');
            }

        }
        catch (err : any) {
            message.error(err.message);
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            // fetchList();
            // setOnSuccess(false);
            onCancelInputCurrentTarget();
        }
    }

    // console.log(data);

    React.useEffect(() => {
        if (onSuccess == true) {
            setOnSuccessChild(true);
            onSuccessCallback(true);
        }
    }, [onSuccess, setOnSuccessChild, onSuccessCallback]);



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
                    onFinish={data.length === 0 ? createTarget : editTarget}
                    autoComplete="off"
                >
                    {/* <Text>Target</Text> */}
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


                    {/* <Text>Active Target</Text> */}
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
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>

            </Modal>
                            
            <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px" }}>
                <Row>
                    <Col span={12}>
                        <Text style={{ fontSize: 15 }}>Current Target</Text>
                    </Col>
                    <Col span={12} className='text-right'>
                        <Text type='danger' style={{ fontSize: 15, fontWeight: "bold" }}>
                            {new Date().getDate() + " " + new Date().toLocaleString('default', { month: 'short' }) + " " + new Date().getFullYear()}
                        </Text>
                    </Col>
                </Row>
                <Row style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)", marginBottom: 5 }}>
                    <Col>
                        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                            {
                                data[0]?.target ? data[0]?.target : '-'
                            }
                        </Text>
                    </Col>
                    <Col offset={1}>
                        <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }}
                        onClick={openInputCurrentTargetModal}
                        >
                            Edit
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Text type='secondary' style={{ fontSize: 11 }}>Default Target akan berlaku seterusnya sebagai nilai awal apabila tidak ada pergantian nilai target</Text>
                </Row>
            </Col>
            
            <ProductionTargetLog onSuccess={onSuccess} setOnSuccess={setOnSuccess} display={false}/>

        </React.Fragment>
    );

};

export default CurrentTargetData;