import {
    CloseOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
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
import React, { useRef } from 'react';
import {
    UploadChangeParam,
    RcFile,
    UploadProps,
    UploadFile,
} from 'antd/lib/upload/interface';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import AppLayout from '../layout/AppLayout';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import styled from 'styled-components';
import { generateFormRules } from '../../helpers/formRules';
import { generateQueryString } from '../../helpers/generateQueryString';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getErrorMessage } from '@qbit-tech/libs-react';
// import {
//     RegionProps,
//     initialProductCategories,
// } from '../../types/region.type';
import { RegionProps, initialRegion } from '../../types/region.type';
import { formatYearToTime } from '../../helpers/constant';
  
  interface ILocation {
    id: string;
  }
  
  interface ResponseProps extends BaseResponseProps<RegionProps> {
    payload: RegionProps;
  }
  const { Title, Text } = Typography;
  
  const RegionEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<keyof ILocation>() as ILocation;
    const [form] = Form.useForm();
  
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [region, setRegion] = React.useState<RegionProps>(
        initialRegion
    );
    const [regions, setRegions] = React.useState<RegionProps[]>([]);
  
    const showModalBack = () => {
      setIsModalOpen(true);
    };
  
    const handleOkModalBack = () => {
      navigate(-1);
      setIsModalOpen(false);
    };
  
    const handleCancelModalBack = () => {
      setIsModalOpen(false);
    };
  
    const createRegion = async (
      props: Omit<
        RegionProps,
        'createdAt' | 'updatedAt' | 'id' | 'statusLoading'
      >
    ) => {
      try {
        setIsLoadingAction(true);
  
        await httpRequest.post('/region', {
            data: [
                {
                    provinceName: region.provinceName,
                    regencyName: region.regencyName,
                    districtName: region.districtName,
                    zipCode: region.zipCode,
                    jneCode: region.jneCode,
                }
            ],
            isReplace: false
        });
  
  
        message.success('Success create ' + region.districtName);
        navigate(-1);
      } catch (error) {
        setIsLoadingAction(false);
        message.error(getErrorMessage(error));
      }
    };
  
    const updateRegion = async (
      props: Omit<RegionProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
    ) => {
      try {
        setIsLoadingAction(true);
  
        const dataToBeSent = {
            data: [
                ...regions,
                {
                    provinceName: region.provinceName,
                    regencyName: region.regencyName,
                    districtName: region.districtName,
                    zipCode: region.zipCode,
                    jneCode: region.jneCode,
                }
            ],
            isReplace: true
        };
        if (id) {
          await httpRequest.post('/region', dataToBeSent)

        }
  
        message.success('Success update ' + props.districtName + ' data');
        navigate(-1);
      } catch (error) {
        setIsLoadingAction(false);
        message.error(getErrorMessage(error));
      }
    };
  
    const handleSubmit = async (
      values: Omit<RegionProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
    ) => {
      if (id) {
        updateRegion(values);
      } else {
        createRegion(values);
      }
    };
  
    React.useEffect(() => {
      if (id) {
        const fetchCategoryDetail = async () => {
          try {
            setIsLoading(true);
  
            const res = await httpRequest.get<ResponseProps>(
              '/region/' + id
            );

            const resRegionList = await httpRequest.get('/region')
            const filterOutRegion = resRegionList.data.payload.results.filter(
                (region:RegionProps) => region.id != id
            )
            console.log('region object : ', res.data.payload);
            form.setFieldsValue(
              res.data.payload
            );
            console.log(filterOutRegion)
            setRegion(res.data.payload)
            setRegions(filterOutRegion)
  
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
          }
        };
        fetchCategoryDetail();
      }
    }, [id, location]);
  
  
    return (
      <React.Fragment>
        <HeaderSection
          icon="back"
          title={(id ? 'Edit' : 'Add') + ' Region'}
          // subtitle="Manage your menu data"
          rightAction={
            <Space>
              <Button
                style={{ padding: '0px 32px' }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                style={{ padding: '0px 32px' }}
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
              name="regionForm"
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Row>
                <Col span={5}>
                  <Title level={5}>Region</Title>
                  <Text style={{ color: '#768499' }}>
                    These are add region, you can change anything
                  </Text>
                </Col>
                <Col offset={1} span={16}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        // label="Category name"
                        name="provinceName"
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
                          Province Name
                        </Title>
                        <Input
                          width="100%"
                          value={region?.provinceName}
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              provinceName: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="regencyName"
                        // rules={generateFormRules("Regency Name", ["required"])}
                      >
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 2,
                            fontSize: 14,
                          }}
                        >
                          Regency Name
                        </Title>
                        <Input
                          width="100%"
                          value={region?.regencyName}
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              regencyName: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="districtName"
                        // rules={generateFormRules("District Name", ["required"])}
                      >
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 2,
                            fontSize: 14,
                          }}
                        >
                          District Name
                        </Title>
                        <Input
                          width="100%"
                          value={region?.districtName}
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              districtName: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <Form.Item
                        name="zipCode"
                        // rules={generateFormRules("ZIP Code", ["required"])}
                      >
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 2,
                            fontSize: 14,
                          }}
                        >
                          ZIP Code
                        </Title>
                        <Input
                          width="100%"
                          value={region?.zipCode}
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              zipCode: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={10}>
                      <Form.Item
                        name="jneCode"
                        // rules={generateFormRules("JNE Code", ["required"])}
                      >
                        <Title
                          level={5}
                          style={{
                            color: '#768499',
                            marginBottom: 2,
                            fontSize: 14,
                          }}
                        >
                          JNE Code
                        </Title>
                        <Input
                          width="100%"
                          value={region?.jneCode}
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              jneCode: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Spin>
  
        <Modal
          title="Cancel Confirmation"
          open={isModalOpen}
          onOk={handleOkModalBack}
          onCancel={handleCancelModalBack}
        >
          <p>Are you sure ? Your data won't be save.</p>
        </Modal>
      </React.Fragment>
    );
  };
  
  export default RegionEdit;
