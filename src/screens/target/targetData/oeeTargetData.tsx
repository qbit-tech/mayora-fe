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
import { initialTargetOEE, TargetOEEProps } from '../../../types/targetOEE.type';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';
import { httpRequest } from '../../../helpers/api';
import dayjs from 'dayjs';
import ProductionTargetLog from './targetTable/productionTargetLog';
import axios from 'axios';
import OEETargetLog from './targetTable/oeeTargetLog';

const { Text, Link } = Typography;


type axiosPutResponse = {
    code: any;
    message: any;
    payload: {
        isSuccess: any;
        id: any;
    }
}


const OEETargetData = ({ onSuccessCallback }: { onSuccessCallback: (value: boolean) => void }) => {

    const {
        data,
    } = useCustomDataFetcher<TargetOEEProps>({
        endpoint: 'oeeTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });

    const [visibleInputOEETarget, setVisibleInputOEETarget] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetOEEProps>(initialTargetOEE);

    const [dataTarget, setDataTarget] = React.useState<TargetOEEProps[]>([]);
    const [onSuccess, setOnSuccess] = React.useState<boolean>(false);
    const [onSuccessChild, setOnSuccessChild] = React.useState<boolean>(false);

    const openInputOEETargetModal = () => {
        setVisibleInputOEETarget(true);
    };

    const onCancelInputOEETarget = () => {
        setVisibleInputOEETarget(false);
    };

    const createTarget = async (props: Omit<TargetOEEProps, 'statusLoading'>) => {
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

            await httpRequest.post('/oeeTargets', dataToSent)

            message.success('Success create new target');

        } catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            setOnSuccess(true);
            onCancelInputOEETarget();
        }
    }

    const editTarget = async (props: Omit<TargetOEEProps, 'statusLoading'>) => {
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

            // await httpRequest.put('/productionTargets/' + data[0].id, dataToSent)

            // message.success('Success edit target');


            // data[0].target = field.target;

            const response = await axios.put<axiosPutResponse>('/oeeTargets/' + data[0].id, dataToSent);
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
            onCancelInputOEETarget();
        }
    }

    // console.log(data);

    React.useEffect(() => {
        if (onSuccess == true) {
            setOnSuccessChild(true);
            onSuccessCallback(true);
        }
    }, [onSuccess, setOnSuccessChild, onSuccessCallback]);


    // const checkNumber = (_: any, value: { target: number }) => {
    //     if (value.target > 0) {
    //       return Promise.resolve();
    //     }
    //     return Promise.reject(new Error('Price must be greater than zero!'));
    //   };

    return (
        <React.Fragment>

            <Modal
                title={<div className='text-start'>Set New OEE Target</div>}
                centered
                visible={visibleInputOEETarget}
                onCancel={onCancelInputOEETarget}
                onOk={() => form.submit()}
            >

                {/* <Text>OEE Target</Text> */}
                <Form
                    form={form}
                    name="oeeTargetForm"
                    layout="vertical"
                    onFinish={data.length === 0 ? createTarget : editTarget}
                    autoComplete="off"
                >
                   
                   <Form.Item
                        name="target"
                        label="Target"
                        rules={[
                            { required: true, message: 'Please input target' },
                            { type: 'number', message: 'The target should be a number' },
                            // { validator: checkNumber}
                        ]}
                    >

                        <InputNumber
                            min={1}
                            max={100}
                            placeholder="OEE Target in %"
                            value={field.target}
                            onChange={(e) =>
                                setField({
                                    ...field,
                                    target: e !== null ? e : 0
                                })
                            }
                            style={{ width: '100%' }}
                        />

                        {/* <Input
                            type="number"
                            placeholder="OEE Target in %"
                            value={field.target}
                            onChange={(e) =>
                                setField({
                                    ...field,
                                    target: parseInt(e.target.value),
                                })
                            }
                        /> */}



                    </Form.Item>
                </Form>

            </Modal>

            <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                <Row>
                    <Text style={{ fontSize: 15 }}>OEE Target</Text>
                </Row>
                <Row style={{ marginBottom: 5 }}>
                    <Col>
                        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                            {
                                data[0]?.target ? data[0]?.target : '-'
                            }
                            %
                        </Text>
                    </Col>
                    <Col offset={1}>
                        <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }} onClick={openInputOEETargetModal}>
                            Edit
                        </Link>
                    </Col>
                </Row>
            </Col>

            <OEETargetLog onSuccess={onSuccess} setOnSuccess={setOnSuccess} display={false} />

        </React.Fragment>
    );

};

export default OEETargetData;