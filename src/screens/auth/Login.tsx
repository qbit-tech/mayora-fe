import React, {
	useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Card, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import AuthLayout from '../layout/AuthLayout'
import AuthHeaderCard from '../../components/AuthHeaderCard'
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { useSignIn } from 'react-auth-kit';
import { getErrorMessage, saveToken } from '@qbit-tech/libs-react';
import axios from 'axios';
import Paragraph from 'antd/es/typography/Paragraph';
import AppVersion from '../../components/AppVersion';

const Login = () => {
	const navigate = useNavigate()
  const signIn = useSignIn();
  
	const [isAuthLoading, setIsAuthLoading] = useState(false);

	const _doLogin = async(data:{email: string, password: string})=>{
		setIsAuthLoading(true);
		try {
			const resultAuthLogin = await httpRequest.post<
        BaseResponseProps<{
          access_token: string;
          refresh_token: string;
        }>
      >(process.env.REACT_APP_BASE_URL + '/auth/email/signin', data);

      if (!resultAuthLogin) {
        //
        message.error('Login failed. Empty response.');
        return;
      }

      if(resultAuthLogin){
        saveToken(resultAuthLogin.data.payload.access_token)
      }

      console.log(resultAuthLogin)
      const resProfile = await axios.get<
        BaseResponseProps<{
          token: string;
        }>
      >(process.env.REACT_APP_BASE_URL + '/users/me', {
        headers: {
          Authorization: 'Bearer ' + resultAuthLogin.data.payload.access_token,
        }
      });

      if (!resProfile) {
        message.error('Login failed. No profile.');
        return;
      }

      if (
        signIn({
          token: resultAuthLogin.data.payload.access_token,
          expiresIn: 10000,
          tokenType: 'Bearer',
          authState: resProfile.data.payload,
          // authState: { token: resultAuthLogin.data.payload.token },
          // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
          // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
        })
      ) {

        // Redirect or do-something
        // console.log(resProfile)
        navigate('/dashboard', { replace: true });
        message.success('Welcome to ' + process.env.REACT_APP_WEBSITE_NAME);
      } else {
        message.error('Login failed.');
        //Throw error
      }
		} catch (err) {
			message.error('Login failed. ' + getErrorMessage(err));
		}

		setIsAuthLoading(false);
	}

	return (
    <AuthLayout>
      <Card style={{ width: 500 }} bordered={false}>
        <AuthHeaderCard
          title="Masuk"
          subtitle={
            'Welcome! Please fill the Username and Password to Sign in into ' +
            process.env.REACT_APP_WEBSITE_NAME
          }
        />
        <Form
          layout="vertical"
          name="basic"
          onFinish={_doLogin}
          autoComplete="off"
          initialValues={{
            email: 'aditia.prasetio@qbit.co.id',
            password: 'Secret*123',
          }}
        >
          <Form.Item name="email" label="Email">
            <Input
              type="email"
              prefix={<MailOutlined style={{ color: '#A5B2BD' }} />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password
              prefix={<LockOutlined style={{ color: '#A5B2BD' }} />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isAuthLoading}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Login
            </Button>
          </Form.Item>

          <Link
            style={{
              display: 'block',
              textAlign: 'center',
            }}
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </Form>
        <AppVersion />
      </Card>
    </AuthLayout>
  );
}

export default Login