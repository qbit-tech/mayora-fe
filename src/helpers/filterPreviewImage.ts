import { FileProperties } from '../types/file.type';

const filterPreviewImage = (file?: FileProperties)=>{
	if(!file) return undefined;
	let allowedMime = ['image/jpeg','image/png'];
	if(file.mimeType && allowedMime.includes(file.mimeType)){
		return file.fileUrl;
	}
	return undefined;
}
export { filterPreviewImage };