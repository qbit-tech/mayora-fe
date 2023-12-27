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
  import { useNavigate, useParams, useLocation } from 'react-router-dom';
  import HeaderSection from '../../components/HeaderSection';
  import AppLayout from '../layout/AppLayout';
  import { httpRequest } from '../../helpers/api';
  import { BaseResponsePaginationProps, BaseResponseProps } from '../../types/config.type';
  import styled from 'styled-components';
  import { generateFormRules } from '../../helpers/formRules';
  import { generateQueryString } from '../../helpers/generateQueryString';
  import {
    UploadChangeParam,
    RcFile,
    UploadProps,
    UploadFile,
  } from 'antd/lib/upload/interface';
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import { getErrorMessage } from '@qbit-tech/libs-react';
  import { initialNews, NewsProps } from '../../types/news.type';
  import { formatYearToTime } from '../../helpers/constant';
  import { ReactComponent as IconTrash } from '../../assets/icons/icon-trash.svg';
  import SectionContent from '../../components/SectionContent';
  import { FAQGroupProps, FAQSProps, initialFaqGroup, initialFaqs } from '../../types/faqs.type';
  
  interface ResponsePropsTag 
    extends BaseResponsePaginationProps<any> {}
  interface ILocation {
    faqGroupId: string;
  }
  
  const FAQGroupEdit: React.FC = () => {
    const navigate = useNavigate();
    const { faqGroupId } = useParams<keyof ILocation>() as ILocation;
    const [form] = Form.useForm();
    const { Option } = Select;
  
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  
    const [faqGroup, setFaqGroup] = React.useState<FAQGroupProps>(initialFaqGroup);
  
    const createFAQ = async (props: Omit<FAQGroupProps, 'statusLoading'>) => {
      try {
        setIsLoadingAction(true);
        const dataToSent = {
          groupName: faqGroup.groupName,
          isPublished: faqGroup.isPublished,
        };
  
        console.log(props)
  
        await httpRequest.post('/faq-groups', dataToSent);
  
        message.success('Success create FAQ Group');
        navigate(-1);
      } catch (error) {
        message.error(getErrorMessage(error));
      } finally {
        setIsLoadingAction(false);
      }
    };
  
    const updateFAQ = async (props: Omit<FAQGroupProps, 'statusLoading'>) => {
      try {
        setIsLoadingAction(true);
  
        const dataToSent = {
            groupName: faqGroup.groupName,
            isPublished: faqGroup.isPublished,
        };
  
        await httpRequest.patch('/faq-groups/' + faqGroupId, dataToSent);
  
        message.success('Success update FAQ Group');
        navigate(-1);
      } catch (error) {
        message.error(getErrorMessage(error));
      } finally {
        setIsLoadingAction(false);
      }
    };
  
    
    const handleSelect = () => {
      form.setFieldsValue({
          groups: form.getFieldValue('groups').slice(0, 1),
      });
    };
  
    const handleSubmit = async (values: Omit<FAQGroupProps, 'statusLoading'>) => {
      if (faqGroupId) {
        updateFAQ(values);
      } else {
        createFAQ(values);
      }
    };
  
    React.useEffect(() => {
      if (faqGroupId) {
        const fetchFAQDetail = async () => {
          try {
            setIsLoading(true);
  
            const res = await httpRequest.get<BaseResponseProps<FAQGroupProps>>(
              '/faq-groups/' + faqGroupId
            );
  
            if (res && res?.data && res?.data?.payload) {
              setFaqGroup(res.data.payload);
  
              form.setFieldsValue(res.data.payload);
            } else {
              message.error('Something went wrong');
            }
  
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
          }
        };
        fetchFAQDetail();
      }
    }, [faqGroupId]);
  
    return (
      <React.Fragment>
        <HeaderSection
          icon="back"
          title={(faqGroupId ? 'Edit' : 'Add') + ' FAQ Group'}
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
  
        {isLoading ? (
          <Spin spinning />
        ) : (
          <div style={{ paddingBottom: '24px 24px 120px' }}>
            <SectionContent
              groupTitle="FAQ Group Data"
              subTitle="These are FAQ Group details, you can change anything"
            >
              <Form
                form={form}
                name="productForm"
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Row>
                  <Col span={18}>
                    <Form.Item
                      // label="Category name"
                      name="groupName"
                      // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Typography.Text className="text-gray mb-1 text-3.5 block">
                        Group Name
                      </Typography.Text>
                      <Input
                        placeholder="Enter label name"
                        width="100%"
                        value={faqGroup.groupName}
                        onChange={(e) =>
                          setFaqGroup({
                            ...faqGroup,
                            groupName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="isPublished">
                      <Typography.Text className="text-gray mb-1 text-3.5 block">
                        Status
                      </Typography.Text>
                      <Radio.Group
                        onChange={(e) =>
                          setFaqGroup({
                            ...faqGroup,
                            isPublished: e.target.value,
                          })
                        }
                        // defaultValue={true}
                        value={faqGroup.isPublished}
                      >
                        <CustomRadio value={true}>Active</CustomRadio>
                        <CustomRadio value={false}>Inactive</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </SectionContent>
          </div>
        )}
      </React.Fragment>
    );
  };
  
  export default FAQGroupEdit;
  
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
      margin-right: 0;
    }
  
    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
      object-fit: cover !important;
    }
  `;
  