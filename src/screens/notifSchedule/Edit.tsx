import {
    CloseOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import React, { useRef } from 'react';
import {
  Form,
  FormInstance,
  Input,
  Typography,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  Image,
  Button,
  Card,
  Spin,
  Row,
  Col,
  InputNumber,
  Divider,
  Switch,
  Table,
  TableProps,
  DatePicker,
} from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { NotifScheduleProps, initialNotifSchedule } from '../../types/notifSchedule.type';
import { BaseResponseProps } from '../../types/config.type';
import type { RangePickerProps } from 'antd/es/date-picker';
// import moment from "moment";
import styled from 'styled-components';
import { getErrorMessage } from '@qbit-tech/libs-react';
import TextArea from 'antd/es/input/TextArea';

interface ILocation {
  id: string;
}

interface ResponseProps extends BaseResponseProps<NotifScheduleProps> {
  payload: NotifScheduleProps;
}

const { Title, Text } = Typography;

const NotifScheduleEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

	const { Option } = Select;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [schedule, setSchedule] = React.useState<NotifScheduleProps>(
    initialNotifSchedule
  );
  const [userData, setUserData] = React.useState<
  any[]
  >([]);
	const [isForSpesificUser, setIsForSpesificUser] = React.useState<boolean>(false)

	const createSchedule = async (value: NotifScheduleProps) => {
		try {
			setIsLoadingAction(true)

			const formData = {
        title: value.title,
        message: value.message,
				type: isForSpesificUser? 'SPESIFIC_USERS' : 'ALL_USER',
				receiverUserIds: value.receiverUserIds,
        body: {
          name: 'user'
        },
        status: 'created',
        scheduledAt: value.scheduledAt
			}

			await httpRequest.post('/notification-schedules', formData)

			message.success('Success create schedule')

			navigate('/notification-schedules')

		} catch (error) {
      message.error(getErrorMessage(error))
			setIsLoadingAction(false);
		}
	}

	const updateSchedule = async (value: NotifScheduleProps) => {
		try {
			setIsLoadingAction(true)

			const formData = {
        title: value.title,
        message: value.message,
				type: isForSpesificUser? 'SPESIFIC_USERS' : 'ALL_USER',
				receiverUserIds: value.receiverUserIds,
        body: {
          name: 'user'
        },
        status: 'created',
        scheduledAt: value.scheduledAt
			}

			await httpRequest.patch('/notification-schedules/' + id, formData)

			message.success('Success create schedule')

			navigate('/notification-schedules')

		} catch (error) {
      message.error(getErrorMessage(error))
			setIsLoadingAction(false);
		}
	}
  
	const handleSubmit = async (values: NotifScheduleProps) => {
		if (id) {
			updateSchedule(values)
		} else {
			createSchedule(values)
		}
	}

	const showModalBack = () => {
	  setIsModalOpen(true);
	};
  
	const handleOkModalBack = () => {
	  navigate(-1);
	  setIsModalOpen(false);
	};
  
	const handleCancelModalBack = () => {
	  setIsModalOpen(false);
	};
  
	React.useEffect(() => {
		if (id) {
			const fetchSchedule = async () => {
				try {
					setIsLoading(true)

					const res = await httpRequest.get<ResponseProps>('/notification-schedules/' + id)
          const resData = res.data.payload
					setSchedule(resData);
          setIsForSpesificUser(resData.type === 'SPESIFIC_USERS')
					form.setFieldsValue({
              ...resData,
              // scheduledAt: moment(resData.scheduledAt),
          });
					setIsLoading(false)

				} catch (error) {
					setIsLoading(false)
				}
			}

			fetchSchedule()
		}

	}, [id])
    
  React.useEffect(() => {
    const fetchOption = async () => {
      try {
        const resUser = await httpRequest.get<any>("/users");
        const users = resUser.data.payload.results
        const filterUser = users.filter((user:any) => user.status === "active")
        setUserData(filterUser);
      } catch (error) {
        message.error(getErrorMessage(error));
      }
    };
    fetchOption();
    // eslint-disable-next-line
  }, []);

	return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={(id ? 'Edit' : 'Add') + ' Notif Schedule'}
        // subtitle="Manage your menu data"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              style={{ padding: '0px 32px' }}
              loading={isLoadingAction}
              type="primary"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />

      
      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Row>
              <Col span={5}>
                <Title level={5}>Notif Schedule</Title>
                <Text style={{ color: '#768499' }}>
                  These are add notif schedule, you can change anything
                </Text>
              </Col>
              <Col offset={1} span={16}>
                <Row>
                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Title
                    </Title>
                    <Form.Item
                      name="title"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Input
                        width="100%"
                        // value={category?.categoryName}
                        onChange={(e) =>
                          setSchedule({
                            ...schedule,
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Message
                    </Title>
                    <Form.Item
                      name="message"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <TextArea
                        autoSize={{ minRows: 4, maxRows: 7 }}
                        onChange={(e) =>
                          setSchedule({
                            ...schedule,
                            message: e.target.value,
                          })
                        }
								      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Are this for Specific User?
                    </Title>
                    <Form.Item
                      style={{width: '30%'}}
                      name="isForSpesificUser"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Radio.Group 
                          onChange={(e) => {
                              setIsForSpesificUser(e.target.value)
                          }}
                          value={isForSpesificUser}>
                          <CustomRadio value={true}>Yes</CustomRadio>
                          <CustomRadio value={false}>No</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Customer Name
                    </Title>
                    <Form.Item
                      name="receiverUserIds"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Select
                          mode="multiple"
                          disabled={isForSpesificUser? false : true}
                          showSearch
                          placeholder="Select Customer"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                          }
                      >
                          {userData.map((user) => (
                              <Option value={user.userId}>{`${user.name}`}</Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Notification Schedule
                    </Title>
                    <Form.Item
                      name="scheduledAt"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <DatePicker
                        style={{width: '100%'}}
                        format="YYYY-MM-DD HH:mm"
                        showTime
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
      </Spin>

      <Modal
			title="Cancel Confirmation"
			open={isModalOpen}
			onOk={handleOkModalBack}
			onCancel={handleCancelModalBack}
			>
			<p>Are you sure ? Your data won't be save.</p>
			</Modal>
    </React.Fragment>

  )
}
export default NotifScheduleEdit;

const CustomRadio = styled(Radio)`
  margin-right: 5rem;
  .ant-radio-checked .ant-radio-inner {
    border-color: #1e1e1e;
    border-width: 2px;
    box-shadow: none;
  }
  .ant-radio:hover .ant-radio-inner {
    background-color: white;
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: #1e1e1e;
  }
`;