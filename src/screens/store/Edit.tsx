
import {
    Form,
    FormInstance,
    Input,
    Typography,
    message,
    Modal,
    Radio,
    Select,
    Space,
    Upload,
    Image,
    Button,
    Card,
    Spin,
    Row,
    Col,
    InputNumber,
    Divider,
    Switch,
    Table,
    TableProps,
  } from 'antd';
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { getErrorMessage } from '@qbit-tech/libs-react';
import { StoreProps, initialStore } from '../../types/store.type';

interface ILocation {
    storeId: string;
}

interface ResponseProps extends BaseResponseProps<StoreProps> {
    payload: Omit<StoreProps, 'createdAt' | 'updatedAt'>;
  }
  const { Title, Text } = Typography;
const StoreEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
	const { storeId } = useParams<keyof ILocation>() as ILocation;
	const [form] = Form.useForm();

    
	const { Option } = Select;
    
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false)
	const [venueData, setVenueData] = React.useState<StoreProps>(initialStore)
	const [cityOption, setCityOption] = React.useState<any[]>([])
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const createStore = async (value: StoreProps) => {
		try {
			setIsLoadingAction(true)

			const formData = {
				storeId: value.storeId,
				storeName: value.storeName,
				address: value.address,
				city: value.city,
				district: value.district,
				province: value.province,
				phone: value.phone,
				email: value.email,
				// province: value.province,
				isPublished: value.isPublished? value.isPublished: true,
				postalCode: value.postalCode,
				// mapUrl: value.mapUrl,
				// coordinate: value.coordinate
			}

			const post = await httpRequest.post('/venues', formData)

			message.success('Success create ' + value.storeName)

			navigate('/venue')

		} catch (error) {
			if(getErrorMessage(error).includes('venueName must be unique')){
			  message.error('Venue Name already registered')
			} else {
			  message.error(getErrorMessage(error))
			}
			setIsLoadingAction(false);
		}
	}

    return (
        <></>
    )
}


export default StoreEdit