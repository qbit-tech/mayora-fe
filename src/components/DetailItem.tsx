import React from 'react';
import { Typography } from 'antd';

type Props = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};
const { Text } = Typography;
const DetailItem: React.FC<Props> = ({ label, value, children }) => {
	return (
		<div style={{ margin: '10px 0px' }}>
			<Text
				style={{
					display: 'block',
					marginBottom: 2,
					fontSize: 14,
					fontWeight: 400,
					color: '#768499',
				}}>
				{label}
			</Text>
			{value ? (
				<Text style={{ display: 'block', fontSize: 14 }}>{value}</Text>
			) : !children ? (
				<Text style={{ display: 'block', color: '#8C8C8C', fontSize: 14 }}>Not Set</Text>
			) : (
				<React.Fragment></React.Fragment>
			)}
			{children}
		</div>
	);
};
export default DetailItem;
