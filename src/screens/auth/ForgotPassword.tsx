import { MailOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button } from 'antd'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import AuthHeaderCard from '../../components/AuthHeaderCard'
import AuthLayout from '../layout/AuthLayout'
import styled from 'styled-components';

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [isInvalid, setInvalid] = React.useState<'empty' | 'invalid' | undefined>()
  const [message, setMessage] = React.useState<string>('')

  const submit = async ({ email }: { email: string}) => {
    try {
      setIsLoading(true)
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/auth/forgot-password/confirmation-link',
        {
          platform: 'cms',
          email
        }
      );
      setIsSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setIsSuccess(false)
      setIsLoading(false)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = ({ email }: { email: string }) => {
    const rule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email === '') {
      setInvalid('empty')
    } else if (!rule.test(email)) {
      setInvalid('invalid')
    } else {
      setInvalid(undefined)
      submit({ email })
    }
  }

  React.useEffect(() => {
    if (isInvalid === 'empty') {
      setMessage('Email address is required')
    } else {
      setMessage('Please enter correct email format')
    }
  }, [isInvalid])


  const handleClickTryAgain = () => {
    setIsSuccess(false)
  }

  return (
    <AuthLayout variant="secondary">
      <Card style={{ width: 500 }} bordered={false}>
        {isSuccess ? (
          <div>
            <AuthHeaderCard
              showBackButon={true}
              title="Check your email"
              subtitle="We have sent instructions to reset the password to your email, please follow the steps to reset password"
              status="email"
            />
            <InfoText>Did not recieve the email? try check your spam inbox or<br/>Try another email address</InfoText>
            <Button onClick={handleClickTryAgain} type="primary" style={{ width: '100%' }}>
              Resend Email
            </Button>
          </div>
        ) : (
          <AuthHeaderCard
            title="Lupa Password"
            subtitle="If you forget your password, please enter the email used to sign in, then our system will send a link to reset your password via email"
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
              name="email"
              label="Email"
              validateStatus={isInvalid ? 'error' : ''}
              help={isInvalid && message}
            >
              <Input type="email" prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>


            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
                Send Reset Password
              </Button>
            </Form.Item>

            <Link style={{ display: 'block', textAlign: 'center', marginTop: '20px'}} to="/login">Back to Login Page</Link>

          </Form>
        )}
      </Card>
    </AuthLayout>
  )
}

const InfoText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.smallText};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.charcoal400};
  text-align: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`

export default ForgotPassword