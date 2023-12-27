import { UserOutlined } from '@ant-design/icons';
import HeaderSection from '../../components/HeaderSection';
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Divider,
  message,
  FormInstance,
  List,
  Tree,
} from 'antd';
import { Key, useContext, useEffect, useRef, useState } from 'react';
import SectionContent from '../../components/SectionContent';
import { generateFormRules } from '../../helpers/formRules';
import { BaseResponseProps } from '../../types/config.type';
import { IChangePassword, UserProperties } from '../../types/user.type';
import { httpRequest } from '../../helpers/api';
import authContext from '../../context/AuthContext';
import styled from 'styled-components';
import { getErrorMessage } from '@qbit-tech/libs-react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import DetailItem from '../../components/DetailItem';
import { DataNode } from 'antd/es/tree';
import { mapPermissionToTree } from '../../helpers/tree';

const Profile = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingChangePassword, setIsLoadingChangePassword] =
    useState<boolean>(false);

  const formRef = useRef<FormInstance<IChangePassword>>(null);

  const auth = useAuthUser();
  const signOut = useSignOut();

  const [permissionsTree, setPermissionsTree] = useState<DataNode[]>([]);

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['0-0-0']);

  useEffect(() => {
    const listPermission = { ...auth()?.role.permissions };
    const mappedList = mapPermissionToTree(listPermission);
    setPermissionsTree(mappedList.mappedPermissionsTree);
    setExpandedKeys(mappedList.expandedKeys);
    setCheckedKeys(mappedList.checkedKeys);
  }, [auth])

  const updateProfile = async (values: Partial<UserProperties>) => {
    setIsLoading(true);

    try {
      const resultUpdate = await httpRequest.patch<
        BaseResponseProps<UserProperties>
      >('/users/' + auth()?.user.userId, values);

      // setAuth({
      //   ...auth,
      //   user: resultUpdate.data.payload,
      // });
      message.success('Update profile successfully');
    } catch (err) {
      message.error(getErrorMessage(err));
    }
    setIsLoading(false);
  };

  const changePassword = (values: IChangePassword) => {
    if (values.newPassword !== values.retypePassword) {
      message.error(
        'New Password and Retype Password is not same. Please check!'
      );
    } else {
      setIsLoadingChangePassword(true);
      httpRequest
        .post(process.env.REACT_APP_BASE_URL + '/auth/me/change-password', {
          email: auth()?.email,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
        .then(() => {
          message.success('Password updated succesfully. Please re-login.');
          setIsLoadingChangePassword(false);

          signOut();
        })
        .catch((err) => {
          setIsLoadingChangePassword(false);
          message.error('Failed. ' + getErrorMessage(err));
          formRef.current?.resetFields();
        });
    }
  };
  return (
    <>
      <HeaderSection icon={<UserOutlined />} title="My Profile" />
      <div style={{ padding: '20px 4px 120px' }}>
        <Form
          name="form"
          autoComplete="off"
          layout="vertical"
          onFinish={updateProfile}
          initialValues={{
            name: auth()?.name,
            email: auth()?.email,
          }}
          form={form}
        >
          <SectionContent
            groupTitle="Data Profile"
            subTitle="These are data profile, you can change anything"
          >
            <Row justify="space-between">
              <Col span={21}>
                <CustomFormItem name="name" label="Name" className="mb-3">
                  <Input placeholder="Enter name" />
                </CustomFormItem>
              </Col>
              <Col span={21}>
                <Form.Item name="email" label="Email" className="mb-3">
                  <Input placeholder="Enter email for login" disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Update
                </Button>
              </Col>
            </Row>
          </SectionContent>
        </Form>
        <Divider />
        <SectionContent
          groupTitle="Role & Permission"
          subTitle="Your role & permission detail"
        >
          <DetailItem label="Role" value={auth()?.role.roleName} />
          <DetailItem label="Permission" value={' '} />
          <Tree
            autoExpandParent
            checkable
            showLine
            showIcon={false}
            selectable={false}
            expandedKeys={expandedKeys}
            checkedKeys={checkedKeys}
            treeData={permissionsTree}
          />
        </SectionContent>
        <Divider />
        {/* <Form
          name="form"
          autoComplete="off"
          layout="vertical"
          form={form2}
          onFinish={changePassword}
          initialValues={{
            oldPassword: '',
            newPassword: '',
            retypePassword: '',
          }}
        >
          <SectionContent
            groupTitle="Change Password"
            subTitle="These are change password, you can change anything"
          >
            <Row justify="space-between">
              <Col span={21}>
                <CustomFormItem
                  className="mb-3"
                  name="oldPassword"
                  label="Old Password"
                  rules={generateFormRules('Old Password', ['required'])}
                >
                  <Input.Password placeholder="Enter your old password" />
                </CustomFormItem>
              </Col>
              <Col span={21}>
                <CustomFormItem
                  className="mb-3"
                  name="newPassword"
                  label="New Password"
                  rules={generateFormRules('New Password', [
                    'required',
                    'password',
                  ])}
                >
                  <Input.Password placeholder="Enter your new password" />
                </CustomFormItem>
              </Col>
              <Col span={21}>
                <CustomFormItem
                  className="mb-3"
                  label="Retype Password"
                  name="retypePassword"
                  rules={generateFormRules('Retype Password', [
                    'required',
                    'password',
                  ])}
                >
                  <Input.Password placeholder="Enter your new password" />
                </CustomFormItem>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingChangePassword}
                >
                  Update Password
                </Button>
              </Col>
            </Row>
          </SectionContent>
        </Form> */}
      </div>
    </>
  );
};

export default Profile;

const CustomFormItem = styled(Form.Item)`
  .ant-form-item-label > label.ant-form-item-required::after {
    content: none;
  }

  .ant-form-item-label {
    padding-bottom: 4px;
    label {
      font-size: 12px;
      color: ${(props) => props.theme.colors.gray_dark};
      font-weight: 400;
    }
  }
`;
