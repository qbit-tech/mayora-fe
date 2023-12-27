import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons'
import { Card, Form, Input, Modal, Button } from 'antd'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthHeaderCard from '../../components/AuthHeaderCard'
import AuthLayout from '../layout/AuthLayout'
import styled from 'styled-components';

interface URLProps {
  sessionId: string
}

interface ResetPasswordProps {
  password: string
  retypePassword: string
}

const ResetPassword: React.FC = () => {

  const navigate = useNavigate()
  const { sessionId } = useParams<keyof URLProps>() as URLProps;

  const [ isLoading, setIsLoading ]  = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [retypeNewPassword, setRetypeNewPassword] = React.useState<string>('')
  const [isInvalid, setInvalid] = React.useState<'empty' | 'invalid' | undefined>(undefined)
  const [messageValidation, setMessageValidation] = React.useState<string>('')
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)

  const submit = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/auth/v3/change-password/session',
        {
          newPassword,
          sessionId,
        }
      );
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error: any) {
      setIsSuccess(false);
      setIsModalVisible(true);
      setIsLoading(false);
    }
  };

  const onSubmit = ({ password, retypePassword }: ResetPasswordProps) => {
    setRetypeNewPassword(retypePassword)
    setNewPassword(password)
    if (!password) {
      setInvalid('empty')
    } else if (retypePassword !== newPassword) {
      setInvalid('invalid')
    } else {
      setInvalid(undefined)
      submit()
    }
  }

  const validateRetypePassword = (value: string) => {
    setRetypeNewPassword(value)
    if (!value) {
      setInvalid('empty')
    } else if (value !== newPassword) {
      setInvalid('invalid')
    } else {
      setInvalid(undefined)
    }
  }

  React.useEffect(() => {
    if (isInvalid === 'empty') {
      setMessageValidation('Field is required')
    } else if (isInvalid === 'invalid') {
      setMessageValidation('Retype password doesn`t match with new password')
    } else {
      setMessageValidation('')
    }
  }, [isInvalid])

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setInvalid('empty')
  };

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <AuthLayout variant="secondary">
      <Card style={{ width: 500 }}>
        {isSuccess ? (
          <div>
            <AuthHeaderCard
              title="Sucessfully Reset Password"
              subtitle="Your password has been successfully reset, now you can sign in with new password"
              status="password"
            />
            <Button
              onClick={handleClick}
              type="primary"
              style={{ width: '100%' }}
            >
              Sign In With New Password
            </Button>
          </div>
        ) : (
          <AuthHeaderCard
            title="Reset Password"
            subtitle={
              'Enter the new password that you will use to sign in ' +
              process.env.REACT_APP_WEBSITE_NAME
            }
          />
        )}

        {!isSuccess && (
          <Form
            layout="vertical"
            name="basic"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="password"
              label="New Password"
              validateStatus={
                isInvalid === 'empty' && !newPassword ? 'error' : ''
              }
              help={isInvalid === 'empty' && !newPassword && messageValidation}
            >
              <Input.Password
                onChange={(e) => setNewPassword(e.target.value)}
                prefix={<LockOutlined />}
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              name="retypePassword"
              label="Retype New Password"
              validateStatus={isInvalid ? 'error' : ''}
              help={messageValidation}
            >
              <Input.Password
                onChange={(e) => validateRetypePassword(e.target.value)}
                prefix={<LockOutlined />}
                placeholder="Retype Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={isLoading}
                disabled={newPassword !== retypeNewPassword}
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}

        <Modal
          title={
            <TitleModel>
              <InfoCircleOutlined
                style={{ marginRight: 10, color: '#D81F64' }}
              />
              <div>Invalid Session</div>
            </TitleModel>
          }
          style={{ top: 20 }}
          open={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>
            Your session for resetting password is Invalid. If you want to reset
            password, please go to{' '}
            <Link
              style={{ textDecoration: 'underline', color: '#D81F64' }}
              to={'/forgot-password'}
            >
              <b>Forgot Password Page</b>
            </Link>{' '}
            and create new forgot password request.
          </p>
        </Modal>
      </Card>
    </AuthLayout>
  );
}

const TitleModel = styled.div`
  display: flex;
  align-items: center;
`

export default ResetPassword