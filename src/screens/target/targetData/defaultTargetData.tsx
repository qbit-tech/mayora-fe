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
import { initialTargetDefault, TargetDefaultProps } from '../../../types/targetDefault.type';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';
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


const DefaultTargetData = () => {

    const {
        data,
    } = useCustomDataFetcher<TargetDefaultProps>({
        endpoint: 'defaultTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });

    const [visibleInputDefaultTarget, setVisibleInputDefaultTarget] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetDefaultProps>(initialTargetDefault);
    const [dataTarget, setDataTarget] = React.useState<TargetDefaultProps[]>([]);
    const [onSuccess, setOnSuccess] = React.useState<boolean>(false);
    const [onSuccessChild, setOnSuccessChild] = React.useState<boolean>(false);

    const openInputDefaultTargetModal = () => {
        setVisibleInputDefaultTarget(true);
    };

    const onCancelInputDefaultTarget = () => {
        setVisibleInputDefaultTarget(false);
    };

    // const createTarget = async (props: Omit<TargetCurrentProps, 'statusLoading'>) => {
    //     try {
    //         setIsLoadingAction(true);
    //         const dataToSent = {
    //             target: field.target,
    //             // activeTarget: field.activeTarget,
    //             machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
    //             activeTarget: new Date().toISOString().slice(0, 10) + 'T' + field.activeTarget + '.000Z',
    //             createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
    //             updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
    //         };

    //         console.log(props);

    //         await httpRequest.post('/productionTargets', dataToSent)

    //         message.success('Success create new target');


    //     }
    //     catch (err) {
    //         message.error('Failed create new target');
    //     }
    //     finally {
    //         setIsLoadingAction(false);
    //         // visibleInputDefaultTarget = false;
    //         setOnSuccess(true);
    //         onCancelInputCurrentTarget();
    //     }
    // };

    // const editTarget = async (props: Omit<TargetCurrentProps, 'statusLoading'>) => {
    //     try {
    //         setIsLoadingAction(true);
    //         const dataToSent = {
    //             target: field.target,
    //             // activeTarget: field.activeTarget,
    //             machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
    //             activeTarget: new Date().toISOString().slice(0, 10) + 'T' + field.activeTarget + '.000Z',
    //             createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
    //             updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
    //         };

    //         console.log(props);

    //         // await httpRequest.put('/productionTargets/' + data[0].id, dataToSent)

    //         // message.success('Success edit target');


    //         // data[0].target = field.target;

    //         const response = await axios.put<axiosPutResponse>('/productionTargets/' + data[0].id, dataToSent);
    //         if (response.data.code === 'success' && response.data.payload.isSuccess) {    
    //             data[0].id = response.data.payload.id;
    //             data[0].target = field.target;
    //             message.success('Success edit target');
    //             console.log(data);
    //             setOnSuccess(true);
    //         } else {
    //             message.error(response.data.message || 'Failed to edit target');
    //         }

    //     }
    //     catch (err : any) {
    //         message.error(err.message);
    //     }
    //     finally {
    //         setIsLoadingAction(false);
    //         // visibleInputDefaultTarget = false;
    //         // fetchList();
    //         // setOnSuccess(false);
    //         onCancelInputCurrentTarget();
    //     }
    // }

    const createTarget = async (props: Omit<TargetDefaultProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                // activeTarget: field.activeTarget,
                machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            // await httpRequest.post('/defaultTargets', dataToSent)

            // message.success('Success create new target');

            const response = await axios.post<axiosPutResponse>('/defaultTargets', dataToSent);
            if (response.data.code === 'success' && response.data.payload.isSuccess) {
                data[0].id = response.data.payload.id;
                data[0].target = field.target;
                message.success('Success create new target');
                console.log(data);
                setOnSuccess(true);
            } else {
                message.error(response.data.message || 'Failed to create new target');
            }

        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            setOnSuccess(true);
            onCancelInputDefaultTarget();
        }
    }

    const editTarget = async (props: Omit<TargetDefaultProps, 'statusLoading'>) => {
        try {
            setIsLoadingAction(true);
            const dataToSent = {
                target: field.target,
                // activeTarget: field.activeTarget,
                machineId: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.machines[0]?.machine.id,
                createdBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
                updatedBy: JSON.parse(localStorage.getItem('_auth_state') || '{}')?.userId,
            };

            console.log(props);

            // await httpRequest.put('/defaultTargets/' + data[0].id, dataToSent)

            // message.success('Success edit target');


            // data[0].target = field.target;

            const response = await axios.put<axiosPutResponse>('/defaultTargets/' + data[0].id, dataToSent);
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
        catch (err: any) {
            message.error(err.message);
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            // fetchList();
            // setOnSuccess(false);
            onCancelInputDefaultTarget();
        }
    }

    return (
        <React.Fragment>

            <Modal
                title={<div className='text-start'>Set New Default Target</div>}
                centered
                visible={visibleInputDefaultTarget}
                onCancel={onCancelInputDefaultTarget}
                onOk={() => form.submit()}
            >

                <Text>Target</Text>
                <Form
                    form={form}
                    name="defaultTargetForm"
                    layout="vertical"
                    onFinish={data.length === 0 ? createTarget : editTarget}
                    autoComplete="off"
                >
                    <Form.Item
                        name="target"
                        label="Target"
                        rules={[{ required: true, message: 'Please input target' }]}
                    >
                        <Input
                            placeholder="Default Target"
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

            <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                <Row>
                    <Text style={{ fontSize: 15 }}>Default Target</Text>
                </Row>
                <Row style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)", marginBottom: 5 }}>
                    <Col>
                        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                            {
                                data[0]?.target ? parseFloat(data[0]?.target).toLocaleString('id-ID') : '-'
                            }
                        </Text>
                    </Col>
                    <Col offset={1}>
                        <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }} onClick={openInputDefaultTargetModal}>
                            Edit
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Text type='secondary' style={{ fontSize: 11 }}>Default Target akan berlaku seterusnya sebagai nilai awal apabila tidak ada pergantian nilai target</Text>
                </Row>
            </Col>

        </React.Fragment>
    );

};

export default DefaultTargetData;