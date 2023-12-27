import React from 'react';
import {
	Typography
} from 'antd';

type Props = {
	label: string;
	value?: string;
	children?: React.ReactNode;
}
const { Text } = Typography;
const ItemList: React.FC<Props> = ({label, value, children})=>{
	return (
		<div style={{margin: '10px 0px'}}>
			<Text style={{display: 'block', color: '#8C8C8C'}}>{label}</Text>
			{value ? <Text style={{display: 'block'}}>{value}</Text>
				: !children
				? <Text style={{display: 'block', color: '#8C8C8C'}}>Not Set</Text>
				: <React.Fragment></React.Fragment>
			}
			{children}
		</div>
	)
}
export default ItemList;