import HeaderSection from '../../components/HeaderSection';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  FormInstance,
  Input,
  message,
  Space,
  Button,
  Card,
  Spin,
} from 'antd';
import React from 'react';
import { IChangePassword } from '../../types/user.type';
import { httpRequest } from '../../helpers/api';
import { getErrorMessage } from '@qbit-tech/libs-react';

type IParams = {
  userId: string;
};

const ChangePasswordUser: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<IParams>();
  const formRef = React.useRef<FormInstance<IChangePassword>>(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = (values: IChangePassword) => {
    if (values.newPassword !== values.retypePassword) {
      message.error(
        'New Password and Retype Password is not same. Please check!'
      );
    } else {
      setIsLoading(true);
      httpRequest
        .patch('/auth/' + userId + '/change-password', {
          newPassword: values.newPassword,
        })
        .then(() => {
          message.success('Password updated succesfully.');
          setIsLoading(false);
          navigate(-1);
        })
        .catch((err) => {
          setIsLoading(false);
          message.error('Failed. ' + getErrorMessage(err));
          formRef.current?.resetFields();
        });
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title="Change Password"
        subtitle="Manage password"
        rightAction={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              loading={isLoading}
              type="primary"
              onClick={() => formRef?.current?.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />

      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <Form
            ref={formRef}
            name="passwordForm"
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              newPassword: '',
              retypePassword: '',
            }}
            autoComplete="off"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              // rules={generateFormRules("Old Password", [
              //   "required",
              //   "password",
              // ])}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Retype Password"
              name="retypePassword"
              // rules={generateFormRules("Old Password", [
              //   "required",
              //   "password",
              // ])}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </React.Fragment>
  );
};

export default ChangePasswordUser;
