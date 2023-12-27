import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  message,
  Image,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
  Space,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import {
  BaseResponseProps,
  BaseResponsePaginationProps,
} from '../../types/config.type';
import DetailItem from '../../components/DetailItem';
import { CategoryProps } from '../../types/category.type';
import { formatDate, formatTime } from '../../helpers/constant';
import {
  StoreProps,
  initialStore,
  initialShipmentSetting,
  shipmentSettingProps,
  LocationImageProps,
} from '../../types/store.type';
import ModalEditSetting from '../../components/Location/ModalEditSetting';
import styled from 'styled-components';
import SectionContent from '../../components/SectionContent';
import { IconTrash } from '../../assets/icons';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';

interface ResponseProps extends BaseResponseProps<StoreProps> {
  payload: Omit<StoreProps, 'createdAt' | 'updatedAt'>;
}

interface ILocation {
  storeId: string;
}

const { Title } = Typography;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const LocationEdit: React.FC = () => {
  const { storeId } = useParams<keyof ILocation>() as ILocation;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [location, setLocation] =
    React.useState<StoreProps>(initialStore);

  const [isLoadingEditSetting, setIsLoadingEditSetting] =
    React.useState<boolean>(false);
  const [isModalEditSettingVisible, setIsModalEditSettingVisible] =
    React.useState<boolean>(false);
  const [tmpEditSetting, setTmpEditSetting] =
    React.useState<shipmentSettingProps>(initialShipmentSetting);

  // const [image, setImage] = React.useState(null);
  const [isLoadingUploadImg, setIsLoadingUploadImg] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [isFetch, setIsFetch] = useState(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle('Image Store'); // file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
  };

  const handleCancel = () => setPreviewOpen(false);
  const handleChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 0) {
      if (
        !(
          newFileList[0]?.type === 'image/png' ||
          newFileList[0]?.type === 'image/jpg' ||
          newFileList[0]?.type === 'image/jpeg'
        )
      ) {
        const err = `Unaccepted file format. Type: ${newFileList[0]?.type}`;

        message.error(err);
        return;
      }

      const MAX_FILE_SIZE = 2048;

      if (!newFileList || newFileList.length === 0) return;
      const fileSizeKiloBytes = newFileList[0]?.size! / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        message.error('File size is greater than 2mb');

        return;
      }
    }

    if (newFileList.length > 0) {
      setIsLoadingUploadImg(true);
      const formData = new FormData();
      newFileList.forEach((image) =>
        formData.append('images', image.originFileObj as RcFile)
      );
      const post = await httpRequest.post(
        `/location-images/upload/${storeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      let list = newFileList
        .filter((value: any) => value.hasOwnProperty('imageId'))
        .map((value: any, idx: number) => {
          return {
            ...value,
            order: idx + 1,
          };
        });

      if (post) {
        const getList = newFileList
          .map((value: any, idx: number) => {
            if (!value.hasOwnProperty('imageId')) {
              return {
                ...value,
                order: idx + 1,
              };
            }
          })
          .filter((value: any) => value !== undefined)
          .map((value: any, idx: number) => {
            return {
              ...value,
              ...post.data.payload.map(({ order, ...rest }: any) => {
                return rest;
              })[idx],
            };
          });
        // console.log(getList)
        list.push(...getList);
      }
      await httpRequest.post(
        `/location-images/adjust-list/${storeId}`,
        {
          images: list,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // console.log(formData)
      setIsLoadingUploadImg(false);
      setIsFetch(!isFetch);
      message.success('Success update image');
    }

    // setFileList(newFileList);
  };
  const btnUploadRef = React.useRef<any>(null);
  const uploadButton = (
    <div ref={btnUploadRef}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  React.useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        setIsLoading(true);

        const res = await httpRequest.get<ResponseProps>(
          '/locations/' + storeId
        );

        const resImage = await httpRequest.get<
          BaseResponseProps<LocationImageProps[]>
        >('/location-images/' + storeId);

        if (resImage.data.payload) {
          const dataImages = resImage.data.payload.map(
            (item: any, idx: number) => ({
              ...item,
              url: item.imageUrl,
              uid: item.imageId,
              order: item.order,
            })
          );

          if (dataImages.length > 0) {
            setFileList(dataImages);
          }
        }
        setLocation(res.data.payload);
        setIsFetch(false);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchLocationDetail();
  }, [storeId, isFetch]);

  const handleEditSettingSave = async () => {
    setIsLoadingEditSetting(true);
    const newLocation = { ...location, shipmentSetting: tmpEditSetting };
    const res = await httpRequest.patch<ResponseProps>(
      '/locations/' + location.storeId,
      newLocation
    );
    if (res && res.data.payload) {
      setLocation(newLocation);
      message.success(
        'Success change ' + newLocation.storeName + ' edit setting.'
      );
    } else {
      message.success(
        'failed change ' + newLocation.storeName + ' edit setting.'
      );
    }
    setIsModalEditSettingVisible(false);
    setIsLoadingEditSetting(false);
  };

  console.log(location);

  return (
    <Wrapper>
      <HeaderSection icon="back" title="Details Store" />

      {isLoading ? (
        <Spin spinning />
      ) : (
        <div style={{ padding: '20px 4px 120px' }}>
          <SectionContent
            groupTitle="Details"
            subTitle="This is details store, you can't change here"
          >
            <Row justify="space-between" gutter={[15, 15]}>
              <Col span={24}>
                <Row className="items-center" gutter={16}>
                  <Col>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Image
                    </Title>

                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                    {fileList.length === 0 && (
                      <Image
                        width={144}
                        height={166}
                        fallback={'/images/select-image.jpg'}
                        style={{ objectFit: 'cover' }}
                        src={'/images/select-image.jpg'}
                        placeholder={
                          <Image
                            preview={false}
                            src="/images/no-image.jpeg"
                            width={144}
                            height={166}
                            style={{ objectFit: 'cover' }}
                          />
                        }
                      />
                    )}
                    <CustomUpload
                      accept="image/png, image/jpeg, image/jpg"
                      name="avatar"
                      fileList={fileList}
                      onPreview={handlePreview}
                      listType="picture-card"
                      className="avatar-uploader"
                      // showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleChange}
                      maxCount={1}
                      onRemove={() => false}
                    >
                      {/* {image.length > 0 ? null : uploadButton} */}
                      {uploadButton}
                    </CustomUpload>
                  </Col>
                  <Col span={12}>
                    <Button
                      // disabled={image.length > 0}
                      size="small"
                      type="primary"
                      className="block"
                      onClick={() => {
                        if (
                          btnUploadRef.current != undefined &&
                          btnUploadRef.current.click != undefined
                        )
                          btnUploadRef.current.click();
                      }}
                    >
                      Upload Image
                    </Button>
                    <Typography.Text className="text-2.5 text-gray bloc">
                      Recommended file resolution 1700x800 pixel, Extension
                      allowed are .jpg and .png and Max file size is 2 Mb.
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Store Name
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.storeName ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Store Code
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.storeCode ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Store URL
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.siteUrl ? location?.siteUrl : 'Not Set'}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Address
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.address ?? 'Not Set'},{' '}
                      {location?.city ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      City
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.city ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Postal Code
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.postalCode ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Phone
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.phone ?? 'Not Set'}
                    </Typography.Text>
                  </Col>
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Email
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.email ?? 'Not Set'}
                    </Typography.Text>
                  </Col>{' '}
                  <Col span={6}>
                    <Typography.Text className="text-3 text-gray block">
                      Description
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {location?.description
                        ? location?.description
                        : 'Not Set'}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </SectionContent>{' '}
        </div>
      )}
    </Wrapper>
  );
};

export default LocationEdit;

const Wrapper = styled.div`
  /* div.ant-card-body {
    padding: 0 !important;
    box-shadow: none;
  } */
`;

const CustomUpload = styled(Upload)`
  .ant-upload {
    text-align: left;
    display: none;
  }
  /* .ant-upload-list {
    display: flex;
    align-items: center;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 400px;
    margin-right: 0px;
    margin-bottom: 0px;
    text-align: left;
    background-color: none;
    border: none;
    border-radius: 0px;
    cursor: none;
    transition: none;
  } */

  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
    border: none;
  }

  .ant-upload-list-picture-card-container {
    width: 144px !important;
    height: 166px;
  }

  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover !important;
  }

  /* .ant-upload-list-picture-card .ant-upload-list-item-info::before {
    background-color: none;
  } */

  button.ant-btn.ant-btn-text.ant-btn-sm.ant-btn-icon-only.ant-upload-list-item-card-actions-btn {
    display: none;
  }
`;
