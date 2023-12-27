import React from 'react';

const NotSet: React.FC<{ value: string }> = ({ value }) => (
	<span style={{ color: '#8C8C8C', fontStyle: 'italic' }}>{value}</span>
);

export default NotSet;
