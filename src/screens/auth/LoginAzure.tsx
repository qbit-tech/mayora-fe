import React, {
  useEffect,
	useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Card, Button, message } from 'antd';
import AuthLayout from '../layout/AuthLayout'
import AuthHeaderCard from '../../components/AuthHeaderCard'
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { useSignIn } from 'react-auth-kit';
import { getErrorMessage, saveToken } from '@qbit-tech/libs-react';
import axios from 'axios';
import AppVersion from '../../components/AppVersion';
import { loginRequest } from '../../authConfig';
import { useMsal } from '@azure/msal-react';

const LoginAzure = () => {
  const { instance } = useMsal();
  let activeAccount = instance.getActiveAccount()
	const navigate = useNavigate()
  const signIn = useSignIn();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log("error login",e);
    });
  }

  const handleLogout = () => {
    instance.logoutPopup().catch((e)=>{
      console.log("error logout",e)
    })
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
        
        <Form.Item>
          {!activeAccount ? (
            <Button
              onClick={handleLogin}
              loading={isAuthLoading}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Login with microsoft
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              loading={isAuthLoading}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Logout
            </Button>
          )}
        </Form.Item>
        <AppVersion />
      </Card>
    </AuthLayout>
  );
}

export default LoginAzure