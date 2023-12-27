import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
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
  Divider,
} from 'antd';
import React, { useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import styled from 'styled-components';
import { RcFile, UploadProps, UploadFile } from 'antd/lib/upload/interface';
import 'react-quill/dist/quill.snow.css';
import {
  BannerProps,
  initialBanner,
  EBannerType,
} from '../../types/banner.type';
import { DEFAULT_IMG } from '../../const/config';
import BannerItemContent from '../../components/BannerItemContent';
import { getErrorMessage } from '@qbit-tech/libs-react';

interface ILocation {
  bannerId: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
];

const { Title, Text } = Typography;

const BannerEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bannerId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [image, setImage] = React.useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const [banner, setBanner] = React.useState<BannerProps>(initialBanner);
  const [selectedContent, setSelectedContent] = React.useState<any>();

  const [isShowModalPromotion, setIsShowModalPromotion] =
    React.useState<boolean>(false);
  const [isShowModalProduct, setIsShowModalProduct] =
    React.useState<boolean>(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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

      // setImage(newFileList);
    }
    setImage(newFileList);
  };

  const btnUploadRef = useRef<any>(null);
  const uploadButton = (
    <div ref={btnUploadRef}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const createBanner = async (
    props: Omit<
      BannerProps,
      'createdAt' | 'updatedAt' | 'articleId' | 'statusLoading'
    >
  ) => {
    try {
      setIsLoadingAction(true);

      const formData = new FormData();
      formData.append('title', banner.title);
      formData.append('subtitle', banner.subtitle);
      formData.append('isPublished', banner.isPublished === false ? '0' : '1');
      formData.append('bannerType', banner.bannerType);
      formData.append(
        'relatedContentId',
        selectedContent?.promoId
          ? selectedContent?.promoId
          : selectedContent?.productId
          ? selectedContent?.productId
          : ''
      );
      banner.relatedContentUrl &&
        formData.append('relatedContentUrl', banner?.relatedContentUrl || '');

      if (image.length > 0) {
        console.log(image[0]);
        console.log(formData);
        formData.append('image', image[0].originFileObj as RcFile);
      }

      await httpRequest.post('/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Success create ' + banner.title);
      navigate('/banner');
    } catch (error) {
      setIsLoadingAction(false);
      message.error(getErrorMessage(error));
    }
  };

  const updateBanner = async (
    props: Omit<BannerProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    try {
      setIsLoadingAction(true);

      const formData = new FormData();
      formData.append('title', banner.title);
      formData.append('subtitle', banner.subtitle);
      formData.append('isPublished', banner.isPublished === false ? '0' : '1');
      formData.append('bannerType', banner.bannerType);
      formData.append(
        'relatedContentId',
        selectedContent?.promoId
          ? selectedContent?.promoId
          : selectedContent?.productId
          ? selectedContent?.productId
          : ''
      );
      banner.relatedContentUrl &&
        formData.append('relatedContentUrl', banner?.relatedContentUrl || '');

      if (image.length > 0 && !image[0].hasOwnProperty('imageId')) {
        // console.log(image[0]);
        // console.log(formData);
        formData.append('image', image[0].originFileObj as RcFile);
      }

      await httpRequest.patch('/banners/' + bannerId, formData);

      message.success('Success update ' + props.title + ' data');
      navigate('/banner');
    } catch (error) {
      setIsLoadingAction(false);
      message.error(getErrorMessage(error));
    }
  };

  const handleSubmit = async (
    values: Omit<BannerProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    if (bannerId) {
      updateBanner(values);
    } else {
      createBanner(values);
    }
  };

  React.useEffect(() => {
    if (bannerId) {
      const fetchCategoryDetail = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get<any>('/banners/' + bannerId);
          console.log('product object : ', res.data.payload);
          if (res && res?.data) {
            setBanner(res?.data?.payload);

            const images: any = res?.data?.payload?.bannerImageUrl;
            if (images) {
              const dataImages = {
                imageId: res.data.payload.title,
                name: res.data.payload.title,
                url: images,
                uid: res.data.payload.title,
              };

              setImage([dataImages]);
            }
            form.setFieldsValue(res.data.payload);

            const bcDetails = [
              {
                field: 'articleId',
                value: bannerId,
                label: res.data.payload.title,
              },
            ];
          } else {
            message.error('Something went wrong');
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchCategoryDetail();
    }
  }, [bannerId, location]);

  React.useEffect(() => {
    if (bannerId && banner.relatedContentId) {
      const fetchDetail = async () => {
        try {
          setIsLoading(true);

          const url =
            banner.bannerType === EBannerType.promotions
              ? `/promotions/${banner.relatedContentId}`
              : banner.bannerType === EBannerType.product
              ? `/products/${banner.relatedContentId}`
              : '';

          let res = await httpRequest.get<any>(url);

          if (res && res?.data) {
            setSelectedContent(res?.data?.payload);
          } else {
            message.error('Something went wrong');
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchDetail();
    }
  }, [bannerId, banner.relatedContentId, banner.bannerType]);

  const bannerType = [
    { value: 'PROMOTIONS', label: 'Promotions' },
    { value: 'PRODUCT', label: 'Product' },
    { value: 'URL', label: 'URL' },
  ];

  const renderLabelBannerType = (type: string) => {
    let result = '';

    if (type === EBannerType.promotions) {
      result = 'Promotion';
    } else if (type === EBannerType.product) {
      result = 'Product';
    } else if (type === EBannerType.url) {
      result = 'URL';
    }

    return result;
  };

  const isPromotion = banner.bannerType === EBannerType.promotions;

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={(bannerId ? 'Edit' : 'Add') + ' Banner'}
        rightAction={
          <Space>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              loading={isLoadingAction}
              type="primary"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />

      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Row>
              <Col span={5}>
                <Title level={5}>Banner Information</Title>
                <Text style={{ color: '#768499' }}>
                  These are {bannerId ? 'edit' : 'add'} news, you can change
                  anything
                </Text>
              </Col>
              <Col offset={1} span={16}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Category name"
                      name="title"
                      // rules={generateFormRules("Category Name", ["required"])}
                    >
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
                          {image?.length === 0 && (
                            <Image
                              width={144}
                              height={104}
                              fallback={DEFAULT_IMG}
                              // style={{ objectFit: 'cover' }}
                              src={DEFAULT_IMG}
                              placeholder={
                                <Image
                                  preview={false}
                                  src={DEFAULT_IMG}
                                  width={144}
                                  height={104}
                                  style={{ objectFit: 'cover' }}
                                />
                              }
                            />
                          )}
                          <CustomUpload
                            name="avatar"
                            fileList={image}
                            onPreview={handlePreview}
                            listType="picture-card"
                            className="avatar-uploader"
                            // showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleChange}
                            maxCount={1}
                          >
                            {/* {image.length > 0 ? null : uploadButton} */}
                            {uploadButton}
                          </CustomUpload>
                        </Col>
                        <Col span={16}>
                          <Button
                            // disabled={image.length > 0}
                            size="small"
                            type="primary"
                            className="block mt-4"
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
                            Recommended file resolution 1700x800 pixel,
                            Extension allowed are .jpg and .png and Max file
                            size is 2 Mb.
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Category name"
                      name="content"
                      // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Title
                      </Title>
                      <Input
                        width="100%"
                        value={banner?.title}
                        onChange={(e) =>
                          setBanner({
                            ...banner,
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Point"
                      name="subtitle"
                      // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Subtitle
                      </Title>
                      <Input
                        width="100%"
                        value={banner?.subtitle}
                        onChange={(e) =>
                          setBanner({
                            ...banner,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item name="bannerType">
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Banner Type
                      </Title>
                      <Select
                        value={banner.bannerType}
                        onChange={(value) => {
                          setBanner({
                            ...banner,
                            bannerType: value,
                          });
                          setSelectedContent(undefined);
                        }}
                        allowClear
                        options={bannerType}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {(banner.bannerType === EBannerType.promotions ||
                  banner.bannerType === EBannerType.product) && (
                  <Row>
                    <Col span={24}>
                      <Form.Item name="bannerType">
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 4,
                            fontSize: 14,
                          }}
                        >
                          Choose {renderLabelBannerType(banner.bannerType)}
                        </Title>
                        {selectedContent && (
                          <BannerItemContent
                            banner={banner}
                            data={selectedContent}
                          />
                        )}
                        <Button
                          block
                          danger
                          onClick={() => {
                            if (banner.bannerType === EBannerType.product) {
                              setIsShowModalProduct(true);
                            } else if (
                              banner.bannerType === EBannerType.promotions
                            ) {
                              setIsShowModalPromotion(true);
                            }
                          }}
                        >
                          Choose {renderLabelBannerType(banner.bannerType)}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                {banner.bannerType === EBannerType.url && (
                  <Row>
                    <Col span={24}>
                      <Form.Item name="bannerType">
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 4,
                            fontSize: 14,
                          }}
                        >
                          URL
                        </Title>
                        <Input
                          width="100%"
                          value={banner?.relatedContentUrl}
                          onChange={(e) =>
                            setBanner({
                              ...banner,
                              relatedContentUrl: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Status*"
                      name="isPublished"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Status
                      </Title>
                      <Radio.Group
                        onChange={(e) =>
                          setBanner({
                            ...banner,
                            isPublished: e.target.value,
                          })
                        }
                        defaultValue={true}
                        value={banner?.isPublished}
                      >
                        <CustomRadio value={true}>Active</CustomRadio>
                        <CustomRadio value={false}>Inactive</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={22}>
              <Divider />
            </Col>
          </Row>
        </Card>
      </Spin>
    </React.Fragment>
  );
};

export default BannerEdit;

const CustomRadio = styled(Radio)`
  margin-right: 5rem;
  .ant-radio-checked .ant-radio-inner {
    border-color: #1e1e1e;
    border-width: 2px;
    box-shadow: none;
  }
  .ant-radio:hover .ant-radio-inner {
    background-color: white;
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: #1e1e1e;
  }
`;

const CustomUpload = styled(Upload)`
  .ant-upload {
    text-align: left;
    display: none;
  }

  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
    border: none;
  }

  .ant-upload-list-picture-card-container {
    width: 144px !important;
    height: 104px;
  }

  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover !important;
  }
`;
