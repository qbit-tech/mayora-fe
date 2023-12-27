import { Divider, Space, message, Modal, Button, Card, Spin, Tree } from 'antd'
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { useParams, useNavigate } from 'react-router-dom';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type'
import DetailItem from '../../components/DetailItem'
import { formatDate } from "../../helpers/constant";
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import { RoleProperties, initialRole } from '../../types/role.type';
import { mapPermissionToTree } from "../../helpers/tree";
import { DataNode } from "antd/lib/tree";
// import useAuth from "../../hooks/useAuth";

interface ILocation {
  roleId: string;
}

interface ResponseProps extends BaseResponseProps<RoleProperties> {}

const RoleDetail = () => {
    const navigate = useNavigate()
    const { roleId } = useParams<keyof ILocation>() as ILocation;
    const {setBreadcrumbDetails} = useDetailBreadcrumbs()
    // const { user } = useAuth();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<RoleProperties>(initialRole);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [confirmationType, setConfirmationType] = React.useState<string>("");

  const [permissions, setPermissions] = React.useState<any>({});
  const [permissionsTree, setPermissionsTree] = React.useState<DataNode[]>([]);

  const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = React.useState<React.Key[]>(["0-0-0"]);

  React.useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoading(true);

        const resPermission = await httpRequest.get<any>(
          "/permissions/default/full-access"
        );
        if (resPermission && resPermission.data && resPermission.data.payload) {
          // console.log(resPermission.data.payload)
          const listPermission = {...resPermission.data.payload}
          const mappedList = mapPermissionToTree(listPermission);
          setPermissionsTree(mappedList.mappedPermissionsTree);
          setExpandedKeys(mappedList.expandedKeys);
        }

        const res = await httpRequest.get<ResponseProps>("/roles/" + roleId);

        if (res && res.data && res.data.payload) {
          setRole(res.data.payload);

                  const permissionData = { ...res.data.payload.permissions };
                  setPermissions(permissionData);
                  const mappedData = mapPermissionToTree(permissionData);
                  // setPermissionsTree(mappedData.mappedPermissionsTree);
                  // setSelectedKeys(mappedData.selectedKeys);
                  setCheckedKeys(mappedData.checkedKeys);
                  // setExpandedKeys(mappedData.expandedKeys);
                }

                const bcDetails = [
                  {
                    field: 'roleId',
                    value: roleId,
                    label: res.data.payload.roleName,
                  },
                ];
                setBreadcrumbDetails(bcDetails);


                setIsLoading(false)

            
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchRole();

    // eslint-disable-next-line
  }, [roleId]);

  const handleClickEdit = () => {
    navigate("/role/" + roleId + "/edit");
  };

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={role?.roleName}
        subtitle="Manage role"
        rightAction={
          // user.roles
          //   .map((item) => item.permissions["ROLE"]["UPDATE"]["value"])
          //   .includes(true) ? (
            <Space>
              <Button onClick={() => navigate("/role")}>Cancel</Button>
              <Button type="primary" onClick={handleClickEdit}>
                Edit
              </Button>
            </Space>
          // ) : (
          //   false
          // )
        }
      />
      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <DetailItem label="Role Description" children={
                <div className="table-link"
                style={{textDecoration: 'none'}}
                onClick={() => {
                  setConfirmationType("description");
                  setIsModalVisible(true);
                }}
                  >
                  {role.roleDescription? role.roleDescription.length > 400 ? role.roleDescription.split(/\s+/,75).join(' ') + '...' : role.roleDescription : 'Not Set'}
                </div>} />
          <DetailItem label="Created At" value={formatDate(role.createdAt)} />
          <DetailItem label="Updated At" value={formatDate(role.updatedAt)} />
          <DetailItem label="Permission" value={" "} />
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
        </Card>
        {confirmationType === 'description' ?
            <Modal
              title="Description"
              open={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
              }}
              footer={null}
            >
              <div style={{ textAlign: "center" }}>
                {role.roleDescription}
              </div>
            </Modal>
          : <></>
        }
      </Spin>
    </React.Fragment>
  );
};

export default RoleDetail;
