import React, {
	useState
} from 'react';
import { UploadRequestOption } from 'rc-upload/es/interface';
import { httpRequest } from '../helpers/api';
import {
	Button,
	Upload,
	message
} from 'antd';
import FileUpload from '../assets/FileUpload';

type BodyParam = {
	[key: string]: any;
}

export interface UploadButtonProps {
	uploadUrl: string;
	body?: BodyParam;
	onSuccess?: (data: any)=>void;
	onError?: (err: Error)=>void;
	maxFileSize?: number;
	allowedMime?: string[];
}

const UploadButton: React.FC<UploadButtonProps> = ({
	uploadUrl,
	body,
	onSuccess,
	onError,
	maxFileSize,
	allowedMime
}) => {
	const [loading, setLoading] = useState(false);
	const mimes = allowedMime
		? allowedMime
		: ['image/jpeg','image/png', 'application/pdf'];

	const _handleSelect = (file: File)=>{
		let max = maxFileSize
			? maxFileSize
			: 2;
	    const isValid = mimes.includes(file.type);
	    if (!isValid) {
			message.error(`${file.name} format is not allowed.`);
		    return Upload.LIST_IGNORE;
	    }

	    const isLimitSize = file.size / 1024 / 1024 < max;
		if (!isLimitSize) {
			message.error(`Image must smaller than ${max}MB!`);
			return Upload.LIST_IGNORE;
		}
		return true;
	}

	const uploadRequest = async(param: UploadRequestOption) => {
		setLoading(true);
		let formData = new FormData();
		formData.append('file', param.file);
		if(body){
			Object.keys(body).forEach((key)=>{
				formData.append(key, body[key]);
			})
		}
		try {
			const { data } = await httpRequest.post(uploadUrl, formData);
			if(param.onSuccess){
				param.onSuccess(data);
			}

			if(onSuccess){
				onSuccess(data);
			}
		}catch(err){
			if(param.onError){
				param.onError(err as Error);
			}
			if(onError){
				onError(err as Error);
			}
		}
		setLoading(false);
	}
	return (
		<Upload
		customRequest={uploadRequest}
		beforeUpload={_handleSelect}
		accept={mimes.join(',')}
		maxCount={1}
		showUploadList={false}
		>
			<Button
			loading={loading}
			className="btn-secondary"
			style={{display:'flex',alignItems:'center',justifyContent:'center'}}
			>
				<span style={{marginRight: 5}}>Upload</span>
				<FileUpload
				color="#00133B"
				size={22}
				/>
			</Button>
		</Upload>
	);
}
export default UploadButton;