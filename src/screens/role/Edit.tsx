import { Form, Input,Radio, message, Modal, Space, Button, Card, Spin, Tree } from 'antd';
import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import { generateFormRules } from '../../helpers/formRules';
import { getErrorMessage } from '@qbit-tech/libs-react';
import styled from 'styled-components';
import { RoleProperties, initialRole } from '../../types/role.type';
import { DataNode } from 'antd/lib/tree';
import { mapPermissionToTree, mapTreeToPermission } from '../../helpers/tree';
// import useAuth from "../../hooks/useAuth";
interface ILocation {
  roleId: string;
}

interface ResponseProps extends BaseResponseProps<RoleProperties> {}

interface ResponsePropsPermission extends BaseResponseProps<any> {}

const RoleEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { user } = useAuth();
  const { roleId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [roleData, setRoleData] = React.useState<RoleProperties>(initialRole);
  const [permissions, setPermissions] = React.useState<any>({});
  const [permissionLists, setPermissionLists] = React.useState<any>({});
  const [permissionsTree, setPermissionsTree] = React.useState<DataNode[]>([]);

	const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
	const [checkedKeys, setCheckedKeys] = React.useState<React.Key[]>([]);
	const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const createRole = async (value: RoleProperties) => {
    try {
      setIsLoadingAction(true);

			const formData = {
				roleName: value.roleName,
				roleDescription: value.roleDescription,
				isActive: typeof value.isActive !== 'undefined' ? value.isActive: true,
				permissions
			}
      console.log(formData)
      // await httpRequest.post("/roles", formData);

      message.success("Success create " + value.roleName);

      // navigate("/role");
    } catch (error) {
      message.error(getErrorMessage(error));
      setIsLoadingAction(false);
    }
  };

  const updateRole = async (value: RoleProperties) => {
    try {
      setIsLoadingAction(true);

			const formData = {
				roleName: value.roleName,
				roleDescription: value.roleDescription,
				isActive: value.isActive,
				permissions
			}

      // console.log(formData)
			await httpRequest.patch('/roles/' + roleId, formData);
      
      message.success("Success update " + value.roleName + " data");
      navigate("/role");
      } catch (error) {
      message.error(getErrorMessage(error));
      setIsLoadingAction(false);
      }
      };

  const handleSubmit = async (values: RoleProperties) => {
    if (roleId) {
      updateRole(values);
    } else {
      createRole(values);
    }
  };

  React.useEffect(() => {
    const fetchPermission = async () => {
      try {
        setIsLoading(true);

        const resPermission = await httpRequest.get<ResponsePropsPermission>(
          "/permissions/default/full-access"
        );

        if (resPermission && resPermission.data && resPermission.data.payload) {
          setPermissions(resPermission.data.payload);
          const mappedData = mapPermissionToTree(resPermission.data.payload);
          setPermissionsTree(mappedData.mappedPermissionsTree);
          // setSelectedKeys(mappedData.selectedKeys);
          setCheckedKeys(mappedData.checkedKeys);
          setExpandedKeys(mappedData.expandedKeys);
        }

        setIsLoading(false);
      } catch (error) {
        message.error(getErrorMessage(error));
        setIsLoadingAction(false);
      }
    };

    if (!roleId) {
      fetchPermission();
    }
  }, []);

  React.useEffect(() => {
    if (roleId) {
      const fetchCustomer = async () => {
        try {
          setIsLoading(true);
          const resPermission = await httpRequest.get<ResponsePropsPermission>(
            "/permissions/default/full-access"
          );
          if (resPermission && resPermission.data && resPermission.data.payload) {
            // console.log(resPermission.data.payload)
            const listPermission = {...resPermission.data.payload}
            const mappedList = mapPermissionToTree(listPermission);
            // setPermissions(listPermission);
            setPermissionLists(listPermission)
            setPermissionsTree(mappedList.mappedPermissionsTree);
            setExpandedKeys(mappedList.expandedKeys);
          }
          const res = await httpRequest.get<ResponseProps>("/roles/" + roleId);

          if (res && res.data && res.data.payload) {
            setRoleData(res.data.payload);
            console.log(res.data.payload.permissions)
            const permissionData = { ...res.data.payload.permissions };
            setPermissions(permissionData);
            const mappedData = mapPermissionToTree(permissionData);
            // setPermissionsTree(mappedData.mappedPermissionsTree);
            // setSelectedKeys(mappedData.selectedKeys);
            setCheckedKeys(mappedData.checkedKeys);
            // setExpandedKeys(mappedData.expandedKeys);

            form.setFieldsValue(res.data.payload);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchCustomer();
    }

    // eslint-disable-next-line
  }, [roleId, location]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
  };

  const onCheck = (checkedKeysValue: any) => {
    console.info("checkedKeysValue,", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);

    const newPermissions = mapTreeToPermission(checkedKeysValue, permissionLists);
    console.info("newPermissions", newPermissions);
    setPermissions(newPermissions);
  };

	const onSelect = (selectedKeysValue: React.Key[], info: any) => {
		console.info('selectedKeysValue,', selectedKeysValue);
		setSelectedKeys(selectedKeysValue);
	};

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

	return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        // backAction={showModalBack}
        title={(roleId ? "Edit" : "Add") + " Role"}
        subtitle={roleId ? "Manage role data" : "Create new role"}
        rightAction={
          <Space>
            <Button onClick={() => {
                showModalBack();
				// navigate(-1)
			}
				}>Cancel</Button>
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
            name="profileForm"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Role Name"
              name="roleName"
              rules={[{
                required:true, message: 'wajib diisi, data tidak boleh kosong'
              }]}
            >
              <Input
                onChange={(event) =>
                  setRoleData({ ...roleData, roleName: event.target.value })
                }
                placeholder="Input role name"
              />
            </Form.Item>
            <Form.Item
              label="Role Description"
              name="roleDescription"
              rules={generateFormRules("Role Description", [
                "letter-and-space",
              ])}
            >
              <Input
                onChange={(event) =>
                  setRoleData({
                    ...roleData,
                    roleDescription: event.target.value,
                  })
                }
                placeholder="Input role description"
              />
            </Form.Item>
            <Form.Item
              label="Permission"
              name="permissions"
              // rules={generateFormRules('Permission', [
              // 	'required'
              // ]
              // )}
            >
              <Tree
                autoExpandParent
                checkable
                showLine
				        showIcon={false}
                selectable={false}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                // onSelect={onSelect}
                // selectedKeys={selectedKeys}
                treeData={permissionsTree}
              />
            </Form.Item>
			<Form.Item
			label="Status"
			name="isActive"
		>
			<Radio.Group
			defaultValue={true}>
				<CustomRadio value={true}>Active</CustomRadio>
				<CustomRadio value={false}>Inactive</CustomRadio>
			</Radio.Group>
			</Form.Item>
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

export default RoleEdit

const CustomRadio = styled(Radio)`
  margin-right: 1rem;
  .ant-radio-checked .ant-radio-inner{
    border-color: #264284;
    box-shadow : none;
  }
  .ant-radio:hover .ant-radio-inner {
    background-color: white;
  }
  .ant-radio-checked .ant-radio-inner:after{
    background-color: #264284;
  }
`;
