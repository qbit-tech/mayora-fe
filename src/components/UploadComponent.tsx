import React, {
	useState
} from 'react';
import FileUpload from '../assets/icons/FileUpload';
import {
	Upload,
	message
} from 'antd';
import {
	FilePdfFilled,
	FileTextFilled
} from '@ant-design/icons';

const { Dragger } = Upload;

export type UploadComponentProps = {
	maxFileSize?: number;
	allowedMime?: string[];
	additionalHint?: string;
	currentPreview?: string;
	currentFileName?: string;
	onSelectFile?: (file: File)=>void;
	onChangeImagePreview?: (url: string)=>void;
	customPreview?: boolean;
	customPreviewImage?: string;
	customPreviewFileName?: string;
	title?: string;
}
const defaultProps = {
	maxFileSize: 2,
	allowedMime: ['image/png','image/jpeg'],
	additionalHint: 'Extensi JPG, PNG',
	onSelectFile: ()=>{},
	onChangeImagePreview: ()=>{},
	title: 'Drag and drop it here'
}
const UploadComponent: React.FC<UploadComponentProps> = (props) => {

	const {
		maxFileSize,
		allowedMime,
		additionalHint,
		currentPreview,
		onSelectFile,
		currentFileName,
		onChangeImagePreview,
		customPreview,
		customPreviewImage,
		customPreviewFileName,
		title
	} = {
		...defaultProps,
		...props
	}

	const [previewImage, setPreviewImage] = useState<string>('');
	const [selectedFileName, setSelectedFileName] = useState<string>('');

	const _handleSelectImage = (file: File)=>{
	    const isValid = allowedMime.includes(file.type);
	    if (!isValid) {
			message.error(`${file.name} format is not allowed.`);
		    return Upload.LIST_IGNORE;
	    }

	    const isLimitSize = file.size / 1024 / 1024 < maxFileSize;
		if (!isLimitSize) {
			message.error(`Image must smaller than ${maxFileSize}MB!`);
			return Upload.LIST_IGNORE;
		}

		if(file){

			if(file.type === 'image/png' || file.type === 'image/jpeg'){
				const reader = new FileReader();
			    reader.onloadend = () => {
			    	if(!customPreview){
				    	setPreviewImage((reader.result as string));
				    }
			    	onChangeImagePreview((reader.result as string));
			    }
				reader.readAsDataURL(file);
			}else{
				if(!customPreview){
					setPreviewImage('');
					setSelectedFileName(file.name);
				}else{
					onChangeImagePreview('');
				}
			}
	    	onSelectFile(file);
	    }
	    return true;
	}

	let currentPreviewImage = (customPreview ? customPreviewImage : previewImage);
	let currentPreviewFileName = (customPreview ? customPreviewFileName : selectedFileName);

	const PreviewIcon = ({fileName}:{fileName: string})=> {
		let ext = fileName.split('.').pop();

		switch(ext){
			case 'pdf':
			return <FilePdfFilled style={{fontSize: 60, marginBottom: 20, color: '#DF2A2A'}} />

			default:
			return <FileTextFilled style={{fontSize: 60, marginBottom: 20}} />
		}
	}
	return (
		<Dragger
		accept={allowedMime.join(',')}
		maxCount={1}
		showUploadList={false}
		beforeUpload={_handleSelectImage}
		customRequest={({onSuccess})=>onSuccess && onSuccess('OK')}
		>
			<div className="ant-upload-preview-container">
				{currentPreviewImage
					? <img className="ant-upload-preview" alt="preview" src={currentPreviewImage}/>
					: currentPreviewFileName
					? <React.Fragment>
						<PreviewIcon fileName={currentPreviewFileName} />
						<span className="ant-upload-file-name">{currentPreviewFileName}</span>
					</React.Fragment>
					: currentPreview
					? <img className="ant-upload-preview" alt="preview" src={currentPreview}/>
					: currentFileName
					? <React.Fragment>
						<PreviewIcon fileName={currentFileName} />
						<span className="ant-upload-file-name">{currentFileName}</span>
					</React.Fragment>
					:(<div className="ant-upload-drag-icon">
						<FileUpload />
						<p>{title}</p>
					</div>
				)}
			</div>
			<p className="ant-upload-hint">Maksimum file {maxFileSize}Mb. {additionalHint}</p>
		</Dragger>
	);
}
export default UploadComponent;