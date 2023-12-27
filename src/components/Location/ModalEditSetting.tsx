import { Input, Modal, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useState } from 'react';
import { initialShipmentSetting, shipmentSettingProps } from '../../types/store.type';
import { httpRequest } from '../../helpers/api';

interface Props {
	isVisible: boolean;
	onOk: () => void;
	isLoading: boolean;
	setVisible: any;
	data: shipmentSettingProps;
	setData: any;
}

const ModalEditSetting: React.FC<Props> = ({ isVisible, onOk, isLoading, setVisible, data, setData }) => {
	const [searchOrigin, setSearchOrigin] = React.useState<string>('');
	const [searchBranch, setSearchBranch] = React.useState<string>('');

	const [jneListOriginCode, setJneListOriginCode] = React.useState<any>([]);
	const [jneListBranchCode, setJneListBranchCode] = React.useState<any>([]);

	React.useEffect(() => {
		const fetchlistJneOriginAndBranch = async () => {
			const resListOrigin = await httpRequest.get<any>('/jne/list-origin');
			const resListBranch = await httpRequest.get<any>('/jne/list-branch');
			if (resListOrigin && resListOrigin.data.payload) {
				setJneListOriginCode(resListOrigin.data.payload);
			}
			if (resListBranch && resListBranch.data.payload) {
				setJneListBranchCode(resListBranch.data.payload);
			}
		};
		fetchlistJneOriginAndBranch();
	}, []);
	return (
		<Modal
			title='Edit Setting Location'
			open={isVisible}
			onOk={onOk}
			onCancel={() => {
				setVisible(false);
				setData(initialShipmentSetting);
			}}
			okText='Save'
			confirmLoading={isLoading}
			okButtonProps={{ type: 'primary' }}
		>
			<div style={{ marginBottom: 20 }}>
				<div style={{ marginBottom: 20 }}>
					<h3>JNE</h3>
					<div>
						<Select
							showSearch
							allowClear
							autoClearSearchValue
							placeholder='Origin Code'
							optionFilterProp='children'
							style={{ marginBottom: 20 }}
							value={data.jne.originCode ? jneListOriginCode?.find((item: any) => item.originCode === data.jne.originCode)?.originName : undefined}
							searchValue={searchOrigin}
							onChange={(e) => setData((prev: shipmentSettingProps) => ({ ...prev, jne: { ...prev.jne, originCode: e } }))}
							onSearch={(value) => setSearchOrigin(value)}
						>
							{jneListOriginCode.map((item: any) => {
								return (
									<Select.Option
										key={item.originCode}
										value={item.originCode}
									>
										{item.originName}
									</Select.Option>
								);
							})}
						</Select>
						<Select
							showSearch
							allowClear
							autoClearSearchValue
							placeholder='Branch Code'
							optionFilterProp='children'
							searchValue={searchBranch}
							value={data.jne.branchCode ? jneListBranchCode?.find((item: any) => item.branchCode === data.jne.branchCode)?.branchName : undefined}
							onChange={(e) => setData((prev: shipmentSettingProps) => ({ ...prev, jne: { ...prev.jne, branchCode: e } }))}
							onSearch={(value) => setSearchBranch(value)}
						>
							{jneListBranchCode.map((item: any) => {
								return (
									<Select.Option
										key={item.branchCode}
										value={item.branchCode}
									>
										{item.branchName}
									</Select.Option>
								);
							})}
						</Select>
					</div>
				</div>
				<div style={{ marginBottom: 20 }}>
					<h3>RPX</h3>
					<Input
						placeholder='Zip Origin'
						allowClear
						value={data.rpx.originCode}
						onChange={(e) => setData((prev: shipmentSettingProps) => ({ ...prev, rpx: { originCode: e.target.value } }))}
					/>
				</div>
				<div style={{ marginBottom: 20 }}>
					<h3>REX</h3>
					<Input
						placeholder='Origin Code'
						allowClear
						value={data.rex.originCode}
						onChange={(e) => setData((prev: shipmentSettingProps) => ({ ...prev, rex: { originCode: e.target.value } }))}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ModalEditSetting;
