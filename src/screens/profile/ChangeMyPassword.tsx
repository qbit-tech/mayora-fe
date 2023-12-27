import { UserOutlined } from '@ant-design/icons'
import HeaderSection from '../../components/HeaderSection'
import { useNavigate } from 'react-router-dom';
import { Form, FormInstance, Input, message, Space, Button, Spin, Card } from 'antd';
import React from 'react';
import { generateFormRules } from '../../helpers/formRules';
import { IChangePassword } from '../../types/user.type';
import { httpRequest } from '../../helpers/api';
import { getErrorMessage } from '@qbit-tech/libs-react';
import { useAuthUser, useSignOut } from 'react-auth-kit';

const ChangeMyPassword: React.FC = () => {
  const navigate = useNavigate()
  const formRef =
    React.useRef<FormInstance<IChangePassword>>(
      null
    );

  const auth = useAuthUser();
  const signOut = useSignOut();
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSave = (values: IChangePassword) => {
    if (values.newPassword !== values.retypePassword) {
      message.error('New Password and Retype Password is not same. Please check!')
    } else {
      setIsLoading(true);
      httpRequest
        .post(
          process.env.REACT_APP_BASE_URL + '/auth/me/change-password',
          {
            email: auth()?.user.email,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          }
        )
        .then(() => {
          message.success('Password updated succesfully. Please re-login.');
          setIsLoading(false);

          signOut();
        })
        .catch((err) => {
          setIsLoading(false);
          message.error('Failed. ' + getErrorMessage(err));
          formRef.current?.resetFields();
        });
    }
  }
  const handleCancel = () => {
    navigate('/profile')
  }

  return (
    <React.Fragment>
      <HeaderSection
        icon={<UserOutlined />}
        title="Change Password"
        subtitle="Manage your password"
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
              oldPassword: '',
              newPassword: '',
              retypePassword: ''
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={generateFormRules('Old Password', [
                'required',
              ])}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={generateFormRules('New Password', [
                'required',
                'password'
              ])}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Retype Password"
              name="retypePassword"
              rules={generateFormRules('Retype Password', [
                'required',
                'password'
              ])}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </React.Fragment>
  );
}

export default ChangeMyPassword