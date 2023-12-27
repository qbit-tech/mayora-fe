import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	MoreOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	Row,
	Col,
	Table,
	Switch,
	Modal,
	message,
	Input,
	Select,
	Dropdown,
	Menu,
	Tag,
	Button,
	Typography,
	Skeleton,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponsePaginationProps, BaseResponseProps } from '../../types/config.type';
import { UserProperties, initialUser } from '../../types/user.type';
import useFetchList from '../../hooks/useFetchList';
import { PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import Text from 'antd/lib/typography/Text';
import { showRoleName, getAdminRoles } from '../../helpers/auth';
import type { TableProps } from 'antd';
import styled from 'styled-components';
import { TransactionProps } from '../../types/transaction';
import { LoyaltyProps } from '../../types/loyaltyPoint.type';
import { PointProps } from '../../types/point.type';
import CustomPagination from '../../components/CustomPagination';
import dayjs from 'dayjs';
import { getErrorMessage } from '@qbit-tech/libs-react';

interface ResponseProps
	extends BaseResponseProps<Omit<UserProperties, 'createdAt' | 'updatedAt'>> {}

type Props = {
	userType?: 'admin' | 'customer';
};

const User = (props: Props) => {
	const navigate = useNavigate();

	const [listLoyalty, setListLoyalty] = useState<LoyaltyProps[]>([]);
	const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
	const [tmpData, setTmpData] = React.useState<UserProperties>(initialUser);
	const filterUserType = useMemo(
		() => (props.userType === 'admin' ? getAdminRoles().join(',') : 'customer'),
		[props.userType]
	);
	const {
		isLoading,
		data,
		pagination,
		query,
		setData,
		setSearch,
		setQuery,
		changePage,
		changeLimit,
	} = useFetchList<UserProperties>({
		endpoint: 'users',
		limit: +PAGE_SIZE_OPTIONS[0],
		initialQuery: {
			filterUserType,
		},
	});

	React.useEffect(() => {
		setQuery({
			...query,
			filterUserType,
		} as any);

		// eslint-disable-next-line
	}, [props.userType]);

	React.useEffect(() => {
		(async () => {
			const res = await httpRequest.get<BaseResponsePaginationProps<LoyaltyProps>>('/loyalty');
			if (res && res.data) {
				setListLoyalty(res.data.payload.results);
			} else {
				message.error('Something went error');
			}
		})();
	}, []);

	const handleStatusChange = async () => {
		try {
			setIsLoadingUpdate(true);
			let newData = [];
			newData = data.map((item) => {
				if (item.userId === tmpData.userId) {
					return {
						...item,
						statusLoading: true,
					};
				}
				return item;
			});

			const newStatus = tmpData.status === 'active' ? 'inactive' : 'active';

			const res = await httpRequest.patch<ResponseProps>('/users/' + tmpData.userId, {
				userId: tmpData.userId,
				status: newStatus,
			});

			newData = data.map((item) => {
				if (item.userId === res.data.payload.userId) {
					return {
						...item,
						status: res.data.payload.status,
						statusLoading: false,
					};
				}
				return item;
			});
			setData(newData);

			message.success('Success change ' + tmpData.name + ' status.');
			setIsModalVisible(false);
			setTmpData(initialUser);
			setIsLoadingUpdate(false);
		} catch (error: any) {
			message.error(error.data.message);
			setIsModalVisible(false);
			setTmpData(initialUser);
			setIsLoadingUpdate(false);
		}
	};

	const handleClickDetail = (e: UserProperties) => {
		navigate('/' + props.userType + '/' + e.userId);
	};

	const { Option } = Select;

	const handleChangeStatus = (status: string) => {
		console.log(data);
		if (status !== 'all') {
			setQuery((oldVal) => ({ ...oldVal, filterStatus: status }));
		} else {
			setQuery((oldVal) => ({ ...oldVal, filterStatus: '' }));
		}
	};

	const handleFilterLoyaltyChange = (loyalty: string) => {
		console.log(loyalty);
		if (loyalty !== 'all') {
			setQuery((oldVal) => ({ ...oldVal, filterLoyaltyName: loyalty }));
		} else {
			setQuery((oldVal) => ({ ...oldVal, filterLoyaltyName: '' }));
		}
	};

	const handleChangeRoleFilter = (role: string) => {
		setQuery((oldVal) => ({ ...oldVal, filterUserType: role }));
	};
	console.log(listLoyalty);
	const handleCreateUser = () => {
		navigate({ pathname: '/' + props.userType + '/add' });
	};

	const RowComp = ({
		record,
		type,
	}: {
		record: UserProperties;
		type: 'loyalty' | 'totalTransaction';
	}) => {
		const [res, setRes] = useState<any>();
		const [isLoadingRow, setIsLoadingRow] = useState(false);

		useEffect(() => {
			(async () => {
				setIsLoadingRow(true);
				try {
					if (type === 'loyalty') {
						const resLoyalty = await httpRequest.get<BaseResponseProps<PointProps>>(
							`/points/${record.userId}`
						);
						setRes({
							loyaltyName: resLoyalty.data.payload.loyalty.loyaltyName,
							color: resLoyalty.data.payload.loyalty.color,
						});
					} else if (type === 'totalTransaction') {
						const resTransactions = await httpRequest.get<
							BaseResponsePaginationProps<TransactionProps>
						>(`/transactions?buyerId=${record.userId}`);
						const transactionUsers = resTransactions.data.payload;
						setRes(transactionUsers.results.length);
					}
					setIsLoadingRow(false);
				} catch (error) {
					// console.log(error);
					setIsLoadingRow(false);
				}
			})();
		}, [record?.userId, type]);

		return isLoadingRow ? (
			<Skeleton.Button
				active={true}
				size={'small'}
			/>
		) : (
			<div>
				{type === 'totalTransaction' ? (
					<Row gutter={10}>
						<Col>
							<Typography.Text className='text-3'>({res})</Typography.Text>
						</Col>
						<Col>
							<Link
								to='/transactions'
								state={{ buyerId: record.userId }}
								className='underline text-3'
								style={{ textDecoration: 'underline' }}>
								See Transaction
							</Link>
						</Col>
					</Row>
				) : type === 'loyalty' ? (
					<CustomBadge bgColor={res?.color}>{res?.loyaltyName}</CustomBadge>
				) : null}
			</div>
		);
	};

	const columns = [
		{
			title: 'NAME',
			dataIndex: 'name',
			key: 'name',
			render: (text: string, record: UserProperties) => {
				if (record.firstName && record.middleName && record.lastName) {
					return (
						<Row
							gutter={10}
							className='items-center'>
							<Col>
								<div
									className='table-link'
									onClick={() => handleClickDetail(record)}>
									{text}
								</div>
							</Col>
							{record.userType === 'customer' && (
								<Col>
									<RowComp
										record={record}
										type='loyalty'
									/>
								</Col>
							)}
						</Row>
					);
				} else if (record.firstName && !record.middleName && record.lastName) {
					return (
						<Row
							gutter={10}
							className='items-center'>
							<Col>
								<div
									className='table-link'
									onClick={() => handleClickDetail(record)}>
									{record.firstName} {record.lastName}{' '}
								</div>
							</Col>
							{record.userType === 'customer' && (
								<Col>
									<RowComp
										record={record}
										type='loyalty'
									/>
								</Col>
							)}
						</Row>
					);
				} else if (record.firstName && record.middleName && !record.lastName) {
					return (
						<Row
							gutter={10}
							className='items-center'>
							<Col>
								<div
									className='table-link'
									onClick={() => handleClickDetail(record)}>
									{record.firstName} {record.middleName}{' '}
								</div>
							</Col>
							{record.userType === 'customer' && (
								<Col>
									<RowComp
										record={record}
										type='loyalty'
									/>
								</Col>
							)}
						</Row>
					);
				} else if (record.firstName && !record.middleName && !record.lastName) {
					return (
						<Row
							gutter={10}
							className='items-center'>
							<Col>
								<div
									className='table-link'
									onClick={() => handleClickDetail(record)}>
									{record.firstName}
								</div>
							</Col>
							{record.userType === 'customer' && (
								<Col>
									<RowComp
										record={record}
										type='loyalty'
									/>
								</Col>
							)}
						</Row>
					);
				} else {
					return (
						<Row
							gutter={10}
							className='items-center'>
							<Col>
								<div
									className='table-link'
									onClick={() => handleClickDetail(record)}>
									{text}
								</div>
							</Col>
							{record.userType === 'customer' && (
								<Col>
									<RowComp
										record={record}
										type='loyalty'
									/>
								</Col>
							)}
						</Row>
					);
				}
			},
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			render: (email: string, record: UserProperties) => {
				return <div>{email}</div>;
			},
		},
		props.userType === 'customer'
			? {
					title: 'PHONE NUMBER',
					dataIndex: 'phone',
					key: 'phone',
					render: (phone: string, record: UserProperties) => (
						<Text>
							{record.phone ? (
								record.phone.charAt(0) === '+' ? (
									<Text>{record.phone}</Text>
								) : (
									<Text>+{record.phone}</Text>
								)
							) : (
								<Text>-</Text>
							)}
						</Text>
					),
			  }
			: {
					title: 'ROLE',
					dataIndex: 'userType',
					key: 'userType',
					render: (userType: any, record: UserProperties) => (
						<div>
							<Tag
								style={{
									border: '2px solid #D81F64',
									color: '#D81F64',
									marginBottom: '7%',
								}}>
								{showRoleName(record.userType)}
							</Tag>
							<br />
						</div>
					),
			  },

		props.userType === 'customer'
			? {
					title: 'TOTAL TRANSACTION',
					key: '',
					dataIndex: '',
					render: (status: any, record: UserProperties) => (
						<RowComp
							record={record}
							type='totalTransaction'></RowComp>
					),
			  }
			: {
					title: 'STATUS',
					key: 'status',
					dataIndex: 'status',
					render: (status: any, record: UserProperties) => (
						<>
							<Switch
								checked={status === 'active'}
								onChange={() => {
									setIsModalVisible(true);
									setTmpData(record);
								}}
							/>
						</>
					),
			  },
		{
			title: 'CREATED AT',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt: any) => <div>{dayjs(createdAt).format('DD MMM YYYY, HH:mm')}</div>,
		},
		props.userType === 'admin' && {
			title: 'UPDATED AT',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (updatedAt: any) => <div>{dayjs(updatedAt).format('DD MMM YYYY, HH:mm')}</div>,
		},
		{
			title: '',
			key: 'action',
			render: (_: any, record: UserProperties) => (
				<Dropdown
					overlay={() => menu(record)}
					placement='bottomRight'>
					<MoreOutlined style={{ cursor: 'pointer' }} />
				</Dropdown>
			),
		},
	].filter(Boolean) as TableProps<UserProperties>['columns'];

	const handleClick = (key: string, record: UserProperties) => {
		if (key === 'edit') {
			navigate({
				pathname: '/' + props.userType + '/' + record.userId + '/edit',
			});
		} else if (key === 'change-password') {
			navigate({
				pathname: '/' + props.userType + '/' + record.userId + '/change-password',
			});
		} else if (key === 'send-email-verification-link') {
			//
			sendEmailVerificationLink(record.email);
		} else if (key === 'send-email-forgot-password') {
			//
			sendEmailForgotPasswordLink(record.email);
		}
	};

	const sendEmailVerificationLink = (email: string) => {
		setIsLoadingUpdate(true);
		httpRequest
			.post('/auth/send-email-verification/confirmation-link', {
				platform: 'web',
				email,
			})
			.then((res) => {
				setIsLoadingUpdate(false);
				message.success('Email verification link has been sent successfully');
			})
			.catch((err) => {
				message.success('Failed to send email verification link. ' + getErrorMessage(err));
				setIsLoadingUpdate(false);
			});
	};

	const sendEmailForgotPasswordLink = (email: string) => {
		setIsLoadingUpdate(true);
		httpRequest
			.post('/auth/forgot-password/confirmation-link', {
				platform: 'web',
				email,
			})
			.then((res) => {
				setIsLoadingUpdate(false);
				message.success('Link reset password has been sent successfully');
			})
			.catch((err) => {
				message.success('Failed to send link reset password. ' + getErrorMessage(err));
				setIsLoadingUpdate(false);
			});
	};

	const menu = (record: UserProperties) => (
		<Menu onClick={(e) => handleClick(e.key, record)}>
			<Menu.Item key='edit'>Edit {props.userType === 'admin' ? 'Admin' : 'Customer'}</Menu.Item>

			{props.userType === 'admin' ? (
				<>
					<Menu.Item key='change-password'>Change Password</Menu.Item>
					<Menu.Item key='send-email-forgot-password'>Send Link Reset Password</Menu.Item>
				</>
			) : (
				false
			)}
		</Menu>
	);

	return (
		<React.Fragment>
			<HeaderSection
				// icon={<UserOutlined />}
				title={props.userType === 'admin' ? 'Admin' : 'Customer'}
				// subtitle={
				//   props.userType === "admin"
				//     ? "Manage your admin"
				//     : "Manage your customer"
				// }
				rightAction={[
					<Button
						type='primary'
						onClick={handleCreateUser}>
						{props.userType === 'admin' ? 'Add Admin' : 'Add Customer'}
					</Button>,
				]}
			/>

			{props.userType === 'customer' && (
				<Row
					gutter={{ xs: 8, sm: 15 }}
					className='mb-7.5'>
					<Col span={18}>
						<Typography.Text className='text-3 text-gray block font-semibold mb-1'>
							Search
						</Typography.Text>
						<Input
							placeholder='Search by Name, Phone number or Email'
							suffix={<SearchOutlined />}
							allowClear
							onChange={(e) => setSearch(e.target.value)}
						/>
					</Col>
					<Col span={6}>
						<Typography.Text className='text-3 text-gray block font-semibold mb-1'>
							Loyalty
						</Typography.Text>
						<Select
							allowClear
							placeholder='Status'
							defaultValue='all'
							onChange={handleFilterLoyaltyChange}>
							<Option value='all'>All</Option>
							{listLoyalty.map((loyalty) => (
								<Option value={loyalty.loyaltyName}>{loyalty.loyaltyName}</Option>
							))}
						</Select>
					</Col>
				</Row>
			)}

			<Row style={{ paddingBottom: 24 }}>
				<Col span={24}>
					<Table
						rowKey='userId'
						loading={isLoading}
						columns={columns}
						dataSource={data && data}
						pagination={{
							pageSize: pagination.perPage,
							current: pagination.page,
							style: { display: 'none' },
						}}
					/>
				</Col>
				<CustomPagination
					data={data && data}
					pagination={pagination}
					changeLimit={changeLimit}
					changePage={changePage}
				/>
			</Row>

			<Modal
				title='Update status confirmation'
				open={isModalVisible}
				onOk={handleStatusChange}
				onCancel={() => {
					setIsModalVisible(false);
					setTmpData(initialUser);
				}}
				okText='Yes'
				confirmLoading={isLoadingUpdate}
				okButtonProps={{ type: 'primary' }}>
				<p>
					Are you sure want to change <b>"{tmpData.name}"</b> status to{' '}
					<b>"{tmpData.status === 'active' ? 'Inactive' : 'Active'}"</b>?.{' '}
					{tmpData.status === 'active'
						? 'If this user status is changed to "Inactive", then this user cannot login to the MedEasy'
						: 'If this user status is changed to "Active", then this user can Sign In to MedEasy'}
				</p>
			</Modal>
		</React.Fragment>
	);
};
export default User;

export const ContainerFilter = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	margin-bottom: 15px;
`;

const CustomBadge = styled.div<{ bgColor?: string }>`
	background-color: ${(props) => props.bgColor};
	border-radius: 9999px;
	padding: 0px 6px;
	color: #fff;
	font-weight: 600;
	font-size: 12px;
	width: max-content;
`;
