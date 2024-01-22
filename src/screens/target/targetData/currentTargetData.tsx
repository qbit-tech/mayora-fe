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
import { TargetCurrentProps, initialTargetCurrent } from '../../../types/targetCurrent.type';
import { httpRequest } from '../../../helpers/api';
import dayjs from 'dayjs';

const { Text, Link } = Typography;

const CurrentTargetData = () => {

    const {
        isLoading,
        setIsLoading,
        data,
        pagination,
        // setData,
        setSearch,
        fetchList,
        setQuery,
        changePage,
        changeLimit,
    } = useCustomDataFetcher<TargetCurrentProps>({
        endpoint: 'productionTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });

    const [visibleInputCurrentTarget, setVisibleInputCurrentTarget] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
    const [field, setField] = React.useState<TargetCurrentProps>(initialTargetCurrent);

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

            fetchList();

        }
        catch (err) {
            message.error('Failed create new target');
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            fetchList();
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

            await httpRequest.put('/productionTargets/' + data[0].id, dataToSent)

            message.success('Success edit target');

            fetchList();

        }
        catch (err : any) {
            message.error(err.message);
        }
        finally {
            setIsLoadingAction(false);
            // visibleInputDefaultTarget = false;
            fetchList();
            onCancelInputCurrentTarget();
        }
    }

    console.log(data);



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
                                data.length === 0 ? 'NaN' : data[0].target
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


        </React.Fragment>
    );

};

export default CurrentTargetData;