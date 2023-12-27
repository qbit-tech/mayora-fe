import React, {
	useState,
	useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Card, Button, message, Row, Col } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import AuthLayout from '../layout/AuthLayout'
import AuthHeaderCard from '../../components/AuthHeaderCard'
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { getErrorMessage } from '@qbit-tech/libs-react';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

const LoginPhone = () => {
	const navigate = useNavigate();
	const signIn = useSignIn();
	const isLoggedIn = useIsAuthenticated();
	const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
	const [isAuthLoading, setIsAuthLoading] = useState(false);
	const [sessionId, setSessionId] = useState('');
	const [form] = Form.useForm();

	// useEffect(() => {
	// 	if (!isLoading && isLoggedIn) {
	// 		navigate('/dashboard')
	// 	}

	// 	// eslint-disable-next-line
	// }, [isLoggedIn, isLoading]);

	const _handleSendOTP = async()=>{
		let value = form.getFieldValue('phone');
		if(!value || value.length < 1){
			return message.error('Phone number invalid!')
		}
		setIsSendOTPLoading(true);

		try {
			let response = await httpRequest.post<BaseResponseProps<{sessionId: string}>>('/auth/phone/send-otp',{
				phoneNumber: value
			});
			setSessionId(response.data.payload.sessionId);
			message.success("OTP Successfully send, check your phone!");
		}catch(error){
			message.error('Can\'t send OTP, make sure you alredy registered!');
			console.error(error);
		}
		setIsSendOTPLoading(false);
	}

	const _handleVerifyOTP = async({otp}:{otp: string})=>{
		setIsAuthLoading(true);
		try {
			let response = await httpRequest.post<BaseResponseProps<{
			  token: string;
			  isNewAccount: boolean;
			}>>('/auth/phone/login',{
				sessionId,
				otp
			});
			let token = response.data.payload.token;
			// login({token});
		}catch(error){
			message.error(getErrorMessage(error));
			console.error(error);
		}
		setIsAuthLoading(false);
	}

	return (
		<AuthLayout>
			<Card style={{ width: 500 }} bordered={false}>
				<AuthHeaderCard
					title="Masuk"
					subtitle="Welcome! Please fill the phone number and otp to Sign in into Vines CMS System"
				/>
				<Form
				form={form}
				layout="vertical"
				name="basic"
				onFinish={_handleVerifyOTP}
				autoComplete="off"
				>
					<Row align="middle" wrap={false}>
						<Col flex="auto">
							<Form.Item name="phone" label="Phone">
								<Input
									type="phone"
									prefix={<PhoneOutlined style={{color: "#A5B2BD"}} />}
									placeholder="Enter your phone"
								/>
							</Form.Item>
						</Col>
						<Col flex="100px">
							<Button
							loading={isSendOTPLoading}
							onClick={_handleSendOTP}
							type="default"
							>
								Send OTP
							</Button>
						</Col>
					</Row>

					<Form.Item name="otp" label="OTP Code">
						<Input
						prefix={<LockOutlined style={{color: "#A5B2BD"}} />}
						placeholder="Enter your OTP"
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
				</Form>
			</Card>
		</AuthLayout>
	);
}

export default LoginPhone