import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import {
	Row,
	Col,
	Table,
	message,
	Modal,
	Button,
	Typography,
	Divider,
	Form,
	InputNumber,
	Radio,
	Input,
	Space,
	TimePicker,
	Select,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import useFetchList from '../../hooks/useFetchList';
import { httpRequest } from '../../helpers/api';
import { formatDate } from '../../helpers/constant';
import type { TableProps } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const BasicConfig = () => {
	const [form] = Form.useForm();
	const { isLoading, data, setIsLoading, fetchList } = useFetchList<any>({
		endpoint: 'app-configs',
		initialQuery: {
			keys: encodeURIComponent(
				'POINT_REGISTERED_NEW_USER,POINT_MAX_POINT_PER_TRANSASCTION,POINT_LIMIT_POINT_USAGE,FEE_ADMIN,FEE_TAX,SHOW_FORM_UPLOAD_KTP,SHOW_FORM_UPLOAD_KTP_AGE_CONFIRMATION,PHONE_NUMBER,EMAIL,HELP_EMAIL,INSTAGRAM,FACEBOOK,TWITTER,JNE_SERVICE,JNE_PICKUP_TIME,JNE_PICKUP_SERVICE,JNE_PICKUP_VEHICLE,JNE_INSURANCE_FLAG,JNE_TYPE'
			),
		},
	});

	const JNE_PICKUP_SERVICE = ['Domestik', 'Reguler'];
	const JNE_PICKUP_VEHICLE = ['Motor', 'Mobil', 'Truck'];
	const JNE_INSURANCE_FLAG = ['Y', 'N'];
	const JNE_TYPE_TYPE = ['DROP', 'PICKUP'];
	const JNE_SERVICE = ['REG', 'OKE', 'YES', 'SPS', 'JTR'];

	const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

	const [points, setPoints] = React.useState<any[]>([
		{
			key: '',
		},
	]);
	const [fees, setFees] = React.useState<any[]>([
		{
			key: '',
		},
	]);
	const [generalList, setGeneralList] = React.useState<any[]>([
		{
			key: '',
		},
	]);
	const [jneList, setJneList] = React.useState<any[]>([
		{
			key: '',
		},
	]);

	const [tmpData, setTmpData] = React.useState<any>({
		key: '',
	});

	const fetchCategoryPointAmount = async () => {
		try {
			const listPoints =
				data.length > 0
					? data.filter(
							(data) =>
								data.key.toLowerCase().includes('point_registered_new_user') ||
								data.key.toLowerCase().includes('point_max_point_per_transasction') ||
								data.key.toLowerCase().includes('point_limit_point_usage')
					  )
					: [];
			const listFees =
				data.length > 0
					? data
							.filter(
								(data) =>
									data.key.toLowerCase().includes('admin') || data.key.toLowerCase().includes('tax')
							)
							.map((data: any) => {
								if (testJSON(data.value)) {
									return {
										...data,
										value: JSON.parse(data.value),
									};
								} else {
									return {
										...data,
									};
								}
							})
					: [];
			const listGeneral =
				data.length > 0
					? data
							.filter(
								(data) =>
									data.key.toLowerCase().includes('show_form_upload_ktp') ||
									data.key.toLowerCase().includes('show_form_upload_ktp_age_confirmation') ||
									data.key.toLowerCase().includes('phone_number') ||
									data.key.toLowerCase().includes('email') ||
									data.key.toLowerCase().includes('list_socmed') ||
									data.key.toLowerCase().includes('help_email') ||
									data.key.toLowerCase().includes('instagram') ||
									data.key.toLowerCase().includes('facebook') ||
									data.key.toLowerCase().includes('twitter')
							)
							.sort(
								(a: any, b: any) =>
									new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
							)
							.map((data: any) => {
								if (testJSON(data.value)) {
									return {
										...data,
										value: JSON.parse(data.value),
									};
								} else {
									return {
										...data,
									};
								}
							})
					: [];

			const listJne =
				data.length > 0
					? data
							.filter((data) => data.key.toLowerCase().includes('jne'))
							.sort(
								(a: any, b: any) =>
									new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
							)
							.map((data: any) => {
								if (testJSON(data.value)) {
									return {
										...data,
										value: JSON.parse(data.value),
									};
								} else {
									return {
										...data,
									};
								}
							})
					: [];

			setGeneralList(listGeneral);
			setPoints(listPoints);
			setFees(listFees);
			setJneList(listJne);

			// console.log(fees)
		} catch (error) {
			setIsLoading(false);
		}
	};
	// console.log(JSON.parse(list[0].value));
	React.useEffect(() => {
		fetchCategoryPointAmount();
	}, [data]);

	const updateConfig = async () => {
		try {
			setIsLoadingUpdate(true);

			const dataToSent = {
				value: tmpData.value,
			};

			await httpRequest.patch('/app-configs/' + tmpData.key, dataToSent);

			message.success('Updated successfully');

			form.resetFields();
			setIsLoadingUpdate(false);
			setIsModalVisible(false);

			setTmpData({
				key: '',
			});

			fetchList();
		} catch (error: any) {
			message.error(error.data.message);
			setIsModalVisible(false);
			setTmpData(null);
			setIsLoadingUpdate(false);
		}
	};

	const updateFee = async () => {
		try {
			setIsLoadingUpdate(true);

			const dataValue = {
				// iconUrl: JSON.parse(tmpData.value).iconUrl ? JSON.parse(tmpData.value).iconUrl : '',
				amount: tmpData.value.amount,
				feeType: tmpData.value.feeType,
			};

			const dataToSent = {
				value: JSON.stringify(dataValue),
			};

			await httpRequest.patch('/app-configs/' + tmpData.key, dataToSent);

			message.success('Updated successfully');

			form.resetFields();
			setIsLoadingUpdate(false);
			setIsModalVisible(false);
			setTmpData({
				key: '',
			});

			fetchList();
		} catch (error: any) {
			message.error(error.data.message);
			setIsModalVisible(false);
			setTmpData(null);
			setIsLoadingUpdate(false);
		}
	};

	const updateList = async () => {
		try {
			setIsLoadingUpdate(true);

			const dataToSent = {
				value: JSON.stringify(tmpData.value),
			};

			await httpRequest.patch('/app-configs/' + tmpData.key, dataToSent);

			message.success('Updated successfully');

			form.resetFields();
			setIsLoadingUpdate(false);
			setIsModalVisible(false);

			setTmpData({
				key: '',
			});

			fetchList();
		} catch (error: any) {
			message.error(error.data.message);
			setIsModalVisible(false);
			setTmpData(null);
			setIsLoadingUpdate(false);
		}
	};

	const handleSubmit = async () => {
		if (tmpData.key.toLowerCase().includes('tax') || tmpData.key.toLowerCase().includes('admin')) {
			updateFee();
		} else if (tmpData.key.toLowerCase().includes('list_socmed')) {
			updateList();
		} else {
			updateConfig();
		}
	};

	const testJSON = (text: any) => {
		if (typeof text !== 'string') {
			return false;
		}
		try {
			JSON.parse(text);
			return true;
		} catch (error) {
			return false;
		}
	};

	const pointColumns = [
		{
			title: 'NAME',
			dataIndex: 'key',
			key: 'key',
			align: 'left',
			width: 250,
			render: (key: string, record: any) => {
				if (key.includes('_')) {
					return (
						<Typography.Text>
							{key
								.split('_')
								.slice(1)
								.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
								.join(' ')}
						</Typography.Text>
					);
				} else {
					return (
						<Typography.Text>
							{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
						</Typography.Text>
					);
				}
			},
		},
		{
			title: 'POINT',
			dataIndex: 'value',
			key: 'value',
			align: 'left',
			width: 250,
			render: (value: string, record: any) => {
				if (record.key.toLowerCase().includes('usage')) {
					return (
						<>
							{value ? (
								<Typography.Text>
									{Number(value).toLocaleString('id-ID')}{' '}
									<span style={{ color: '#748494' }}>Years</span>{' '}
								</Typography.Text>
							) : (
								<span style={{ color: '#748494' }}>Not Set</span>
							)}
						</>
					);
				} else {
					return (
						<>
							{value ? (
								<Typography.Text>
									{Number(value).toLocaleString('id-ID')}{' '}
									<span style={{ color: '#748494' }}>Points</span>{' '}
								</Typography.Text>
							) : (
								<span style={{ color: '#748494' }}>Not Set</span>
							)}
						</>
					);
				}
			},
		},
		{
			title: 'UPDATED AT',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			align: 'left',
			render: (updatedAt: any) => <div>{formatDate(updatedAt)}</div>,
		},
		{
			title: 'ACTION',
			key: 'action',
			align: 'center',
			render: (_: any, record: any) => (
				<Button
					onClick={() => {
						setIsModalVisible(true);
						setTmpData(record);
					}}
					style={{ background: 'transparent', border: 'none' }}
					icon={<EditOutlined style={{ color: '#A5B2BD' }} />}></Button>
			),
		},
	] as TableProps<any>['columns'];

	const feeColumns = [
		{
			title: 'NAME',
			dataIndex: 'key',
			key: 'key',
			align: 'left',
			width: 250,
			render: (key: string, record: any) => {
				if (key.includes('_')) {
					return (
						<Typography.Text>
							{key
								.split('_')
								.slice(1)
								.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
								.join(' ')}
						</Typography.Text>
					);
				} else {
					return (
						<Typography.Text>
							{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
						</Typography.Text>
					);
				}
			},
		},
		{
			title: 'NOMINAL',
			dataIndex: 'value',
			key: 'value',
			align: 'left',
			width: 250,
			render: (value: any, record: any) => {
				if (typeof value === 'object' && value.amount && value.feeType) {
					if (value.feeType.toLowerCase() === 'nominal') {
						return <Typography.Text>Rp. {value.amount.toLocaleString('id-ID')}</Typography.Text>;
					} else {
						return <Typography.Text>{value.amount}%</Typography.Text>;
					}
				} else {
					return <></>;
				}
			},
		},
		{
			title: 'UPDATED AT',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			align: 'left',
			render: (updatedAt: any) => <div>{formatDate(updatedAt)}</div>,
		},
		{
			title: 'ACTION',
			key: 'action',
			align: 'center',
			render: (_: any, record: any) => (
				<Button
					onClick={() => {
						setIsModalVisible(true);
						console.log(record);
						setTmpData(record);
					}}
					style={{ background: 'transparent', border: 'none' }}
					icon={<EditOutlined style={{ color: '#A5B2BD' }} />}></Button>
			),
		},
	] as TableProps<any>['columns'];

	const generalColumns = [
		{
			title: 'NAME',
			dataIndex: 'key',
			key: 'key',
			align: 'left',
			width: 250,
			render: (key: string, record: any) => {
				if (key.includes('_')) {
					return (
						<Typography.Text>
							{key
								.split('_')
								.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
								.join(' ')}
						</Typography.Text>
					);
				} else {
					return (
						<Typography.Text>
							{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
						</Typography.Text>
					);
				}
			},
		},
		{
			title: 'VALUE',
			dataIndex: 'value',
			key: 'value',
			align: 'left',
			width: 250,
			render: (value: any, record: any) => {
				let valResult;
				if (value === true) {
					valResult = 'SHOW';
				} else if (value === false) {
					valResult = 'HIDE';
				} else if (record.key === 'PHONE_NUMBER') {
					valResult = `+62 ${value}`;
				} else if (record.key === 'LIST_SOCMED') {
					valResult = value?.map(
						(v: any, idx: number) => `${v.name}${value.length - 1 === idx ? '' : ', '}`
					);
				} else {
					valResult = value;
				}
				return <Typography.Text>{valResult}</Typography.Text>;
			},
		},
		{
			title: 'UPDATED AT',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			align: 'left',
			render: (updatedAt: any) => <div>{formatDate(updatedAt)}</div>,
		},
		{
			title: 'ACTION',
			key: 'action',
			align: 'center',
			render: (_: any, record: any) => (
				<Button
					onClick={() => {
						setIsModalVisible(true);
						console.log(record);
						setTmpData(record);
					}}
					style={{ background: 'transparent', border: 'none' }}
					icon={<EditOutlined style={{ color: '#A5B2BD' }} />}></Button>
			),
		},
	] as TableProps<any>['columns'];

	const jneColumns = [
		{
			title: 'NAME',
			dataIndex: 'key',
			key: 'key',
			align: 'left',
			width: 250,
			render: (key: string, record: any) => {
				if (key.includes('_')) {
					return (
						<Typography.Text>
							{key
								.split('_')
								.slice(1)
								.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
								.join(' ')}
						</Typography.Text>
					);
				} else {
					return (
						<Typography.Text>
							{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
						</Typography.Text>
					);
				}
			},
		},
		{
			title: 'VALUE',
			dataIndex: 'value',
			key: 'value',
			align: 'left',
			width: 250,
			render: (value: any, record: any) => {
				return <Typography.Text>{value}</Typography.Text>;
			},
		},
		{
			title: 'UPDATED AT',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			align: 'left',
			render: (updatedAt: any) => <div>{formatDate(updatedAt)}</div>,
		},
		{
			title: 'ACTION',
			key: 'action',
			align: 'center',
			render: (_: any, record: any) => (
				<Button
					onClick={() => {
						setIsModalVisible(true);
						console.log(record);
						setTmpData(record);
					}}
					style={{ background: 'transparent', border: 'none' }}
					icon={<EditOutlined style={{ color: '#A5B2BD' }} />}></Button>
			),
		},
	] as TableProps<any>['columns'];

	const [isEditAnotherList, setIsEditAnotherList] = React.useState('');
	const deleteAnotherList = (name: string) => {
		const newData = tmpData.value.filter((v: any) => v.name !== name);

		setTmpData((prev: any) => ({
			...prev,
			value: newData,
		}));
	};

	return (
		<React.Fragment>
			<HeaderSection title={'Basic Configuration'} />
			<Row>
				<Col span={5}>
					<Title level={5}>Point</Title>
					<Text style={{ color: '#768499' }}>These are point list details in web</Text>
				</Col>
				<Col
					offset={1}
					span={16}>
					<Table
						rowKey='configId'
						loading={isLoading}
						columns={pointColumns}
						dataSource={points}
						pagination={false}
						bordered
					/>
				</Col>
			</Row>
			<Row>
				<Col span={22}>
					<Divider />
				</Col>
			</Row>
			<Row>
				<Col span={5}>
					<Title level={5}>Fees</Title>
					<Text style={{ color: '#768499' }}>These are fees list details in web</Text>
				</Col>
				<Col
					offset={1}
					span={16}>
					<Table
						rowKey='configId'
						loading={isLoading}
						columns={feeColumns}
						dataSource={fees}
						pagination={false}
						bordered
					/>
				</Col>
			</Row>
			<Row>
				<Col span={22}>
					<Divider />
				</Col>
			</Row>
			<Row style={{ paddingBottom: 24 }}>
				<Col span={5}>
					<Title level={5}>General</Title>
					<Text style={{ color: '#768499' }}>These are general list details in web</Text>
				</Col>
				<Col
					offset={1}
					span={16}>
					<Table
						rowKey='configId'
						loading={isLoading}
						columns={generalColumns}
						dataSource={generalList}
						pagination={false}
						bordered
					/>
				</Col>
			</Row>
			<Row style={{ paddingBottom: 24 }}>
				<Col span={5}>
					<Title level={5}>JNE</Title>
					<Text style={{ color: '#768499' }}>These are jne list details</Text>
				</Col>
				<Col
					offset={1}
					span={16}>
					<Table
						rowKey='configId'
						loading={isLoading}
						columns={jneColumns}
						dataSource={jneList}
						pagination={false}
						bordered
					/>
				</Col>
			</Row>

			{(() => {
				if (
					(tmpData && tmpData.key && tmpData.key.toLowerCase().includes('admin')) ||
					tmpData.key.toLowerCase().includes('tax')
				) {
					return (
						<Modal
							width={700}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
								setTmpData({
									key: '',
								});
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{ marginBottom: 20 }}>
								Edit{' '}
								{tmpData.key
									.split('_')
									.slice(1)
									.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
									.join(' ')}
							</Title>
							<Form
								form={form}
								name='form'
								layout='vertical'
								autoComplete='off'>
								<Form.Item>
									<Title
										level={5}
										style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}>
										Fee Type
									</Title>
									<Radio.Group
										onChange={(e) => {
											setTmpData({
												...tmpData,
												value: {
													...tmpData.value,
													feeType: e.target.value,
												},
											});
										}}
										// defaultValue={'percentage'}
										value={tmpData.value.feeType}>
										<CustomRadio value={'percentage'}>Percentage</CustomRadio>
										<CustomRadio value={'nominal'}>Nominal</CustomRadio>
									</Radio.Group>
								</Form.Item>
								<Form.Item>
									<Title
										level={4}
										style={{ marginBottom: 20 }}>
										Amount
									</Title>
									{(tmpData.value.feeType && tmpData.value.feeType.includes('percentage')) ||
									(tmpData.feeType && tmpData.feeType.includes('percentage')) ? (
										<InputNumber
											style={{ width: '100%' }}
											value={tmpData.value.amount}
											controls={false}
											onChange={(e: any) => {
												setTmpData({
													...tmpData,
													value: {
														...tmpData.value,
														amount: e,
													},
												});
											}}
											addonAfter={<p style={{ marginBottom: 0, color: '#9FACBF' }}>%</p>}
										/>
									) : (
										<InputNumber
											style={{ width: '100%' }}
											value={tmpData.value.amount}
											controls={false}
											onChange={(e: any) => {
												setTmpData({
													...tmpData,
													value: {
														...tmpData.value,
														amount: e,
													},
												});
											}}
											addonBefore={<p style={{ marginBottom: 0, color: '#9FACBF' }}>IDR</p>}
										/>
									)}
								</Form.Item>
							</Form>
						</Modal>
					);
				} else if (
					tmpData &&
					tmpData.key &&
					(tmpData.key.toLowerCase().includes('show_form_upload_ktp') ||
						tmpData.key.toLowerCase().includes('jne_pickup_service') ||
						tmpData.key.toLowerCase().includes('jne_pickup_vehicle') ||
						tmpData.key.toLowerCase().includes('jne_type') ||
						tmpData.key.toLowerCase().includes('jne_insurance'))
				) {
					return (
						<Modal
							width={700}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{ marginBottom: 20 }}>
								Edit{' '}
								{tmpData.key
									.split('_')
									.slice(1)
									.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
									.join(' ')}
							</Title>
							<Form
								form={form}
								name='form'
								layout='vertical'
								autoComplete='off'>
								<Form.Item>
									<Title
										level={5}
										style={{
											color: '#768499',
											marginBottom: 6,
											fontSize: 14,
										}}>
										Value
									</Title>

									<Radio.Group
										onChange={(e: any) => {
											setTmpData({
												...tmpData,
												value: e.target.value,
											});
										}}
										value={tmpData.value}>
										{tmpData.key.toLowerCase().includes('show_form_upload_ktp') && (
											<>
												<CustomRadio value={true}>SHOW</CustomRadio>
												<CustomRadio value={false}>HIDE</CustomRadio>
											</>
										)}
										{tmpData.key.toLowerCase().includes('jne_pickup_vehicle') &&
											JNE_PICKUP_SERVICE.map((item) => (
												<CustomRadio
													key={item}
													value={item}>
													{item}
												</CustomRadio>
											))}
										{tmpData.key.toLowerCase().includes('jne_pickup_service') &&
											JNE_PICKUP_VEHICLE.map((item) => (
												<CustomRadio
													key={item}
													value={item}>
													{item}
												</CustomRadio>
											))}
										{tmpData.key.toLowerCase().includes('jne_insurance') &&
											JNE_INSURANCE_FLAG.map((item) => (
												<CustomRadio
													key={item}
													value={item}>
													{item}
												</CustomRadio>
											))}
										{tmpData.key.toLowerCase().includes('jne_type') &&
											JNE_TYPE_TYPE.map((item) => (
												<CustomRadio
													key={item}
													value={item}>
													{item}
												</CustomRadio>
											))}
									</Radio.Group>
								</Form.Item>
							</Form>
						</Modal>
					);
				} else if (
					(tmpData && tmpData.key && tmpData.key.toLowerCase().includes('email')) ||
					tmpData.key.toLowerCase().includes('phone_number') ||
					tmpData.key.toLowerCase().includes('help_email') ||
					tmpData.key.toLowerCase().includes('instagram') ||
					tmpData.key.toLowerCase().includes('facebook') ||
					tmpData.key.toLowerCase().includes('twitter')
				) {
					return (
						<Modal
							width={700}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{ marginBottom: 20, textTransform: 'capitalize' }}>
								Edit{' '}
								{tmpData.key
									.split('_')
									.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
									.join(' ')}
							</Title>
							<Form
								form={form}
								name='form'
								layout='vertical'
								autoComplete='off'>
								<Form.Item>
									<Title
										level={5}
										style={{
											color: '#768499',
											marginBottom: 6,
											fontSize: 14,
										}}>
										Value
									</Title>

									{tmpData.key === 'PHONE_NUMBER' ? (
										<Input
											type='text'
											addonBefore={'+62'}
											value={tmpData.value}
											onChange={(e) => {
												const regex = /^[0-9\s]+$/; // matches only numbers and spaces
												const value = e.target.value;
												if (e.target.value === '' || regex.test(value)) {
													setTmpData({
														...tmpData,
														value: e.target.value,
													});
												}
											}}
										/>
									) : (
										<Input
											value={tmpData.value}
											onChange={(e) => {
												setTmpData({
													...tmpData,
													value: e.target.value,
												});
											}}
											type='text'
										/>
									)}
								</Form.Item>
							</Form>
						</Modal>
					);
				} else if (
					tmpData &&
					tmpData.key &&
					(tmpData.key.toLowerCase().includes('jne_pickup_time') ||
						tmpData.key.toLowerCase().includes('jne_service'))
				) {
					return (
						<Modal
							width={700}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{ marginBottom: 20, textTransform: 'capitalize' }}>
								Edit {tmpData.key.split('_').join(' ')}
							</Title>
							<Form
								form={form}
								name='form'
								layout='vertical'
								autoComplete='off'>
								<Form.Item>
									<Title
										level={5}
										style={{
											color: '#768499',
											marginBottom: 6,
											fontSize: 14,
										}}>
										Value
									</Title>
									{tmpData.key.toLowerCase().includes('jne_pickup_time') && (
										<TimePicker
											value={dayjs(tmpData.value || '00:00', 'HH:mm')}
											format={'HH:mm'}
											showNow={false}
											onChange={(time: any, timeString: string) => {
												setTmpData({
													...tmpData,
													value: timeString,
												});
											}}
										/>
									)}
									{tmpData.key.toLowerCase().includes('jne_service') && (
										<Select
											style={{ width: '90%' }}
											mode='multiple'
											showSearch
											placeholder='Service'
											value={tmpData.value ? tmpData.value?.split(',') : []}
											onChange={(value) => {
												setTmpData({
													...tmpData,
													value: value?.join(','),
												});
											}}
											optionFilterProp='children'
											filterOption={(input, option) =>
												(option!.children as unknown as string)
													.toLowerCase()
													.includes(input.toLowerCase())
											}>
											{JNE_SERVICE?.map((service) => (
												<Option value={service}>{service}</Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Form>
						</Modal>
					);
				} else if (tmpData && tmpData.key && tmpData.key.toLowerCase().includes('list_socmed')) {
					return (
						<Modal
							width={'60%'}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
								form.resetFields();
								setIsEditAnotherList('');
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{
									marginBottom: 20,
									textTransform: 'uppercase',
									fontSize: 25,
								}}>
								List Socmed
							</Title>
							{/* <Form
                form={form}
                name="basic"
                autoComplete="off"
                layout="vertical"
                onFinish={(values: any) => {
                  if (isEditAnotherList !== '') {
                    const res = tmpData.value.map((v: { name: string }) =>
                      v.name === isEditAnotherList
                        ? {
                            ...values,
                            name: values?.name,
                            key: values?.key.toLowerCase(),
                          }
                        : v
                    );

                    setTmpData({
                      ...tmpData,
                      value: res,
                    });
                  } else {
                    setTmpData({
                      ...tmpData,
                      value: [
                        ...tmpData.value,
                        {
                          ...values,
                          name: values?.name,
                          key: values?.key.toLowerCase(),
                        },
                      ],
                    });
                  }

                  form.resetFields();
                  setIsEditAnotherList('');
                }}
              >
                <Row className="items-center" gutter={16}>
                  <Col span={10}>
                    <Form.Item
                      label="Key"
                      name="key"
                      rules={generateFormRules('Key', ['required'])}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={generateFormRules('Name', ['required'])}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Url"
                      name="url"
                      rules={generateFormRules('Url', ['required'])}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form> */}
							<Table
								columns={[
									{
										title: 'Key',
										dataIndex: 'key',
										key: 'key',
										render: (text: string) => <div>{text.split('_').join(' ')}</div>,
									},
									{
										title: 'Name',
										dataIndex: 'name',
										key: 'name',
									},
									{
										title: 'Url',
										dataIndex: 'url',
										key: 'url',
										width: '40%',
									},
									{
										title: '',
										key: 'action',
										render: (_, record) => (
											<Space>
												<Button
													icon={<EditOutlined />}
													onClick={() => {
														setIsEditAnotherList(record.name);
														form.setFieldValue('name', record.name);
														form.setFieldValue('url', record.url);
													}}
												/>
												{/* <Button
                          icon={<DeleteOutlined />}
                          onClick={() => deleteAnotherList(record.name)}
                        />{' '} */}
											</Space>
										),
										align: 'right',
									},
								]}
								dataSource={tmpData.value}
								pagination={false}
							/>
						</Modal>
					);
				} else {
					return (
						<Modal
							width={700}
							open={isModalVisible}
							onOk={() => {
								handleSubmit();
							}}
							onCancel={() => {
								setIsModalVisible(false);
							}}
							okText='Save'
							confirmLoading={isLoadingUpdate}
							okButtonProps={{ type: 'primary' }}>
							<Title
								level={4}
								style={{ marginBottom: 20 }}>
								Edit{' '}
								{tmpData.key
									.split('_')
									.slice(1)
									.map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
									.join(' ')}
							</Title>
							<Form
								form={form}
								name='form'
								layout='vertical'
								autoComplete='off'>
								{tmpData.key.toLowerCase().includes('limit') ? (
									<Form.Item>
										<Title
											level={5}
											style={{
												color: '#768499',
												marginBottom: 2,
												fontSize: 14,
											}}>
											Expired in years
										</Title>
										<InputNumber
											style={{ width: '100%' }}
											value={tmpData.value}
											controls={false}
											onChange={(e: any) => {
												setTmpData({
													...tmpData,
													value: e,
												});
											}}
											addonAfter={<p style={{ marginBottom: 0, color: '#9FACBF' }}>Years</p>}
										/>
									</Form.Item>
								) : (
									<Form.Item>
										<Title
											level={5}
											style={{
												color: '#768499',
												marginBottom: 2,
												fontSize: 14,
											}}>
											Point
										</Title>
										<InputNumber
											style={{ width: '100%' }}
											value={tmpData.value}
											controls={false}
											onChange={(e: any) => {
												setTmpData({
													...tmpData,
													value: e,
												});
											}}
										/>
									</Form.Item>
								)}
							</Form>
						</Modal>
					);
				}
			})()}
		</React.Fragment>
	);
};
export default BasicConfig;

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
