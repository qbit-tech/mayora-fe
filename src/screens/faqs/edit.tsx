import {
  Form,
  Input,
  Typography,
  message,
  Radio,
  Space,
  Upload,
  Button,
  Spin,
  Row,
  Col,
  Select,
} from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponsePaginationProps, BaseResponseProps } from '../../types/config.type';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import SectionContent from '../../components/SectionContent';
import { FAQSProps, initialFaqs } from '../../types/faqs.type';
import { getErrorMessage } from '@qbit-tech/libs-react';

interface ResponsePropsTag 
  extends BaseResponsePaginationProps<any> {}
interface ILocation {
  faqId: string;
}

const FAQsEdit: React.FC = () => {
  const navigate = useNavigate();
  const { faqId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();
  const { Option } = Select;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);

  const [faqs, setFaqs] = React.useState<FAQSProps>(initialFaqs);
	const [faqGroup, setFaqGroup] = React.useState<any[]>([])
  const groupChildren: React.ReactNode[] = [...faqGroup];

  const createFAQ = async (props: Omit<FAQSProps, 'statusLoading'>) => {
    try {
      setIsLoadingAction(true);
      const dataToSent = {
        groupName: props.groups[0],
        question: faqs.question,
        answer: faqs.answer,
        isPublished: faqs.isPublished,
      };

      console.log(props)

      await httpRequest.post('/faqs', dataToSent);

      message.success('Success create FAQ');
      navigate(-1);
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setIsLoadingAction(false);
    }
  };

  const updateFAQ = async (props: Omit<FAQSProps, 'statusLoading'>) => {
    try {
      setIsLoadingAction(true);

      const dataToSent = {
        question: faqs.question,
        answer: faqs.answer,
        isPublished: faqs.isPublished,
      };

      await httpRequest.patch('/faqs/' + faqId, dataToSent);

      message.success('Success update FAQ');
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

  const handleSubmit = async (values: Omit<FAQSProps, 'statusLoading'>) => {
    console.log(values)
    if (faqId) {
      updateFAQ(values);
    } else {
      createFAQ(values);
    }
  };

  React.useEffect(() => {
    if (faqId) {
      const fetchFAQDetail = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get<BaseResponseProps<FAQSProps>>(
            '/faqs/' + faqId
          );

          if (res && res?.data && res?.data?.payload) {
            setFaqs(res.data.payload);

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
  }, [faqId]);
  
  React.useEffect(() => {
    const fetchOption = async () => {
      try {
        const resGroup = await httpRequest.get<ResponsePropsTag>("/faq-groups");
        const groups = resGroup.data.payload.results;
        const filterGroup = groups.filter(group => group.isPublished === true)
        const pushGroup = filterGroup.map((group) => {
          return <Option key={group.groupName}>{group.groupName}</Option>;
        });
        setFaqGroup(pushGroup);
      } catch (error) {
        message.error(getErrorMessage(error));
      }
    };
    fetchOption();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={(faqId ? 'Edit' : 'Add') + ' FAQs'}
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
            groupTitle="FAQ Data"
            subTitle="These are FAQ details, you can change anything"
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
                    label=" "
                    name="groups"
                  >
                    <Typography.Text className="text-gray mb-1 text-3.5 block">
                    FAQ Group
                    </Typography.Text>
                    <Select 
                    onChange={(e) => {
                      if(e.length > 1 ) {
                      //   form.setFieldsValue({
                      //     groups: form.getFieldValue('groups').slice(0, 1),
                      // });
                      // e.shift()
                        console.log(form.getFieldsValue())
                      }
                    }}
                    // onSelect={handleSelect} 
                    mode="tags" 
                    style={{ width: '100%' }} 
                    placeholder="Choose FAQ Group">
                      {groupChildren}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    // label="Category name"
                    name="question"
                    // rules={generateFormRules("Category Name", ["required"])}
                  >
                    <Typography.Text className="text-gray mb-1 text-3.5 block">
                      Question
                    </Typography.Text>
                    <Input
                      placeholder="Enter label name"
                      width="100%"
                      value={faqs.question}
                      onChange={(e) =>
                        setFaqs({
                          ...faqs,
                          question: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    // label="Category name"
                    name="answer"
                    // rules={generateFormRules("Category Name", ["required"])}
                  >
                    <Typography.Text className="text-gray mb-1 text-3.5 block">
                      Answer
                    </Typography.Text>
                    <Input.TextArea
                      rows={6}
                      //   width="100%"
                      value={faqs.answer}
                      onChange={(e) =>
                        setFaqs({
                          ...faqs,
                          answer: e.target.value,
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
                        setFaqs({
                          ...faqs,
                          isPublished: e.target.value,
                        })
                      }
                      // defaultValue={true}
                      value={faqs.isPublished}
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

export default FAQsEdit;

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
