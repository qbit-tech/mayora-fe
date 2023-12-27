import React, {
	useState,
	useContext
} from 'react';
import {
	Modal,
	Form,
	Input,
	Button,
	message,
	Row,
	Col,
	Typography
} from 'antd';
import { generateFormRules } from '../../helpers/formRules';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import useCountDown from 'react-countdown-hook';
import AuthContext from '../../context/AuthContext';
import { getErrorMessage } from '@qbit-tech/libs-react';

type Props = {
	visible: boolean;
	onClose: ()=>void;
}

const { Text } = Typography;
const ChangePhone: React.FC<Props> = ({visible, onClose})=>{
	const [form] = Form.useForm();
	const [sessionId,setSessionId] = useState('');
	const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
	const [isVerifyLoading, setIsVerifyLoading] = useState(false);
	const [timeLeft, { start, reset }] = useCountDown(0);
	const [phone, setPhone] = useState('');

	const { auth, setAuth } = useContext(AuthContext);

	const _handleClose = ()=>{
		onClose();
		reset();
		setSessionId('');
		setPhone('');
		form.resetFields();
	}

	const _resetWaitOTP = ()=>{
		let time = 60 * 1000;
		start(time);
	}

	const _handleSendOTP=async()=>{
		let newPhone = form.getFieldValue('newPhone');
		if(!newPhone){
			message.error('Email can\'t be empty!');
		}
		setIsSendOTPLoading(true);
		try {
			let result = await httpRequest.patch<BaseResponseProps<{sessionId: string}>>('/auth/me/change-phone/send-otp',{
				newPhone
			});
			_resetWaitOTP();
			setSessionId(result.data.payload.sessionId);
			setPhone(newPhone);
			message.success('OTP Send, check your inbox!');
		}catch(err){
			message.error(getErrorMessage(err));
			console.error(err);
		}
		setIsSendOTPLoading(false);
	}

	const _handleVerifyOTP=async({otp}:{otp: string})=>{
		setIsVerifyLoading(true);
		try {
			await httpRequest.patch('/auth/me/change-phone/verify-otp',{
				sessionId,
				otp
			});
			message.success('Phone updated succesfully!');
			setAuth({
				...auth,
				user:{
					...auth.user,
					phone
				}
			});
			_handleClose();

		}catch(err){
			message.error(getErrorMessage(err));
			console.error(err);
		}
		setIsVerifyLoading(false);
	}

	return (
		<Modal
		open={visible}
		onCancel={_handleClose}
		title="Change Phone"
		footer={[
			<Button
			onClick={form.submit}
			loading={isVerifyLoading}
			type="primary"
			block={true}
			>
				Change My Phone
			</Button>
		]}
		>
			<Form
			form={form}
			onFinish={_handleVerifyOTP}
			layout="vertical"
			>
				<Row align="middle" wrap={false} gutter={[5,0]}>
					<Col flex="auto">
						<Form.Item
						label="New Phone"
						name="newPhone"
						rules={generateFormRules('New Phone',['required','phoneNumber'])}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col flex="115px">
						{timeLeft
							?(
								<Text
								type="secondary"
								style={{marginLeft: 5, fontSize: 11}}
								>
									Wait {timeLeft / 1000}s to Resend
								</Text>
							):(
								<Button
								loading={isSendOTPLoading}
								onClick={_handleSendOTP}
								type="link"
								block={true}
								>
									{sessionId? 'Resend OTP':'Send OTP'}
								</Button>
							)}
					</Col>
				</Row>
				<Form.Item
				label="Input OTP"
				name="otp"
				rules={generateFormRules('OTP',['required','numeric'])}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}
export default ChangePhone;