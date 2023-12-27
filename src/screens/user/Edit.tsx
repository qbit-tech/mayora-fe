import {
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Button,
  Card,
  Spin,
  Row,
  Col,
} from 'antd';
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { generateFormRules } from '../../helpers/formRules';
import styled from 'styled-components';
import { RoleList, ICreateUser, initialUser } from '../../types/user.type';
import CONFIG from '../../const/config';
import SectionContent from '../../components/SectionContent';
import { getErrorMessage } from '@qbit-tech/libs-react';

interface ILocation {
  userId: string;
}

type Props = {
  userType?: 'admin' | 'customer';
};

interface ResponseProps extends BaseResponseProps<ICreateUser> {}

const { Option } = Select;

const UserEdit = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [customer, setCustomer] = React.useState<ICreateUser>(initialUser);

  const createCustomer = async (value: ICreateUser) => {
    try {
      setIsLoadingAction(true);

      let fullName = `${value.firstName} ${value.middleName} ${value.lastName}`;

      if (value.firstName && value.middleName && value.lastName) {
        fullName = `${value.firstName} ${value.middleName} ${value.lastName}`;
      } else if (value.firstName && !value.middleName && value.lastName) {
        fullName = `${value.firstName} ${value.lastName}`;
      } else if (value.firstName && value.middleName && !value.lastName) {
        fullName = `${value.firstName} ${value.middleName}`;
      } else if (value.firstName && !value.middleName && !value.lastName) {
        fullName = `${value.firstName}`;
      }
      const formData = {
        name: CONFIG.isEditFullName ? value.name : fullName,
        firstName: CONFIG.isEditFullName ? undefined : value.firstName,
        middleName: CONFIG.isEditFullName ? undefined : value.middleName,
        lastName: CONFIG.isEditFullName ? undefined : value.lastName,
        email: value.email,
        password: value.password,
        phone: value.phone,
        userType: props.userType === 'customer' ? 'customer' : value.userType,
        status: value.status,
      };

      await httpRequest.post('/auth/register', formData);

      // await httpRequest.post('/users', formData);

      message.success(
        `Success create ${CONFIG.isEditFullName ? value.name : fullName}`
      );
      navigate('/' + props.userType);
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setIsLoadingAction(false);
    }
  };

  const updateCustomer = async (value: ICreateUser) => {
    try {
      setIsLoadingAction(true);
      const fullName = `${value.firstName} ${value.middleName} ${value.lastName}`;
      const formData = {
        name: CONFIG.isEditFullName ? value.name : fullName,
        firstName: CONFIG.isEditFullName ? undefined : value.firstName,
        middleName: CONFIG.isEditFullName ? undefined : value.middleName,
        lastName: CONFIG.isEditFullName ? undefined : value.lastName,
        email: value.email,
        phone: value.phone,
        userType: props.userType === 'customer' ? 'customer' : value.userType,
        status: value.status,
      };

      await httpRequest.patch('/users/' + userId, formData);

      message.success(
        `Success update ${CONFIG.isEditFullName ? value.name : fullName} data`
      );
      navigate('/' + props.userType);
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleSubmit = async (values: ICreateUser) => {
    if (userId) {
      updateCustomer(values);
    } else {
      createCustomer(values);
    }
  };

  React.useEffect(() => {
    if (userId) {
      const fetchCustomer = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get<ResponseProps>('/users/' + userId);
          if (res && res.data) {
            setCustomer(res.data.payload);
            form.setFieldsValue(res.data.payload);
          } else {
            message.error('Something went wrong');
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchCustomer();
    }

    // eslint-disable-next-line
  }, [userId, location]);

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={
          (userId ? 'Edit' : 'Add') +
          ' ' +
          (props.userType === 'admin' ? 'Admin' : 'Customer')
        }
        subtitle={userId ? 'Manage your user data' : 'Create new user'}
        rightAction={
          <Space>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              loading={isLoadingAction}
              type="primary"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />
      <SectionContent
        groupTitle="Admin Information"
        subTitle="These are data admin information, you can change anything"
      >
        <Row>
          <Col span={20}>
            <Form
              form={form}
              name="profileForm"
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              {CONFIG.isEditFullName ? (
                <Form.Item
                  label="Name"
                  name="name"
                  rules={generateFormRules('Name', [
                    'required',
                    'letter-and-space',
                    'max-text-length',
                  ])}
                >
                  <Input placeholder="Input name" />
                </Form.Item>
              ) : (
                <React.Fragment>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={generateFormRules('First Name', ['required'])}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Middle Name" name="middleName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input />
                  </Form.Item>
                </React.Fragment>
              )}

              {/* {props.userType === "admin" ? (
              <Form.Item
                label="Email"
                name="email"
                rules={generateFormRules("Email", ["required", "email"])}
              >
                <Input
                  onChange={(event) =>
                    setCustomer({ ...customer, email: event.target.value })
                  }
                  placeholder="Input email address"
                />
              </Form.Item>
            ) : (
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={generateFormRules("Phone number", [
                  "required",
                  "phoneNumber",
                ])}
              >
                <Input
                  onChange={(event) =>
                    setCustomer({ ...customer, phone: event.target.value })
                  }
                  placeholder="Input number"
                />
              </Form.Item>
            )} */}

              <Form.Item
                label="Email"
                name="email"
                rules={generateFormRules('Email', ['required', 'email'])}
              >
                <Input
                  onChange={(event) =>
                    setCustomer({ ...customer, email: event.target.value })
                  }
                  placeholder="Input email address"
                />
              </Form.Item>

              {!userId && (
                <Form.Item
                  label="Password"
                  name="password"
                  rules={generateFormRules('Password', [
                    'required',
                    'password',
                  ])}
                >
                  <Input.Password
                    onChange={(event) =>
                      setCustomer({ ...customer, password: event.target.value })
                    }
                    placeholder="Input password"
                  />
                </Form.Item>
              )}

              {props.userType === 'admin' ? (
                <Form.Item
                  label="Role"
                  name="userType"
                  rules={[
                    {
                      message: 'The Role is required.',
                      required: true,
                    },
                  ]}
                >
                  <Select style={{ width: '100%' }}>
                    {Object.keys(RoleList)
                      .filter((item) => item !== 'customer')
                      .map((key) => (
                        <Option key={key} value={key}>
                          {RoleList[key]}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              ) : (
                <React.Fragment></React.Fragment>
              )}

              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    message: 'The Status is required.',
                  },
                ]}
              >
                <Radio.Group value={customer.status || 'active'}>
                  <CustomRadio value="active">Active</CustomRadio>
                  <CustomRadio value="inactive">Non Active</CustomRadio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </SectionContent>
    </React.Fragment>
  );
};

export default UserEdit;

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
