import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  UsergroupDeleteOutlined,
  PictureOutlined,
  LaptopOutlined,
  InfoCircleOutlined,
  UserOutlined,
  TableOutlined,
  TagOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  ProfileOutlined,
  FundOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EUserRole } from '../types/user.type';
import { FEATURE_PERMISSIONS } from '../helpers/featureAndPermission.constant';
import { hasPermissionFromRoles } from '../helpers/featureAndPermissionHelper';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import Icon from '@ant-design/icons/lib/components/Icon';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuthUser();
  // const header = useAuthHeader();
  const user = auth()

  // console.log(header())
  // const hasPermission = (finds: EUserRole[] = []) => {
  //   const user = auth()

  //   if(user?.role) {
  //     return finds.includes(user.role.roleName.toLowerCase())
  //   }

  //   return false
  // 	// return finds.includes(role);
  // 	// return true;
  // };

  // const hasPermission = (feature: string, permission: string) => {
  //   const user = auth()

  //   if(user?.role) {
  //     return finds.includes(user.role.roleName.toLowerCase())
  //   }

  //   return false
  // 	// return finds.includes(role);
  // 	// return true;
  // };

  const filterPermission = (items: any[]) => {
    return items
      .map((item) => {
        if (item?.permission === undefined || item.permission === true) {
          let newObject = item;
          delete item.permission;
          if (newObject.children) {
            newObject.children = filterPermission(newObject.children);
          }
          return newObject;
        } else {
          return null;
        }
      })
      .filter(Boolean);
  };

  const MENUS = [
    {
      key: '/dashboard',
      label: 'Dashboard',
      icon: <AppstoreOutlined />,
    },
    {
      type: 'divider',
      label: 'DIVIDER'
    },
    {
      key: '/trouble-list',
      label: 'Trouble List',
      icon: <WarningOutlined />,
    },
    {
      key: '/manual-collection',
      label: 'Manual Collection',
      icon: <FileTextOutlined />,
    },
    {
      key: '/target',
      label: 'Target',
      icon: <FundOutlined />,
    },
    {
      key: '/release',
      label: 'Output',
      icon: <CheckCircleOutlined />,
    },
    {
      type: 'divider',
      label: 'DIVIDER'
    },
    {
      key: '/report',
      label: 'Report',
      icon: <FileDoneOutlined />,
    },
    {
      key: '/master-category',
      label: 'Master Category',
      icon: <ProfileOutlined />,
    },
    {
      key: '/User',
      label: 'User',
      icon: <UserOutlined />,
    },
  ];

  
  const items = filterPermission(MENUS) as MenuProps['items'];
  console.log(items)

  const convertPathName = () => {
    const pathname = location.pathname.split('/');
    const res = '/' + pathname[1];
    return res;
  };

  const getSelectedParent = () => {
    const currentMenu = convertPathName();
    var parent: string[] = [];
    if (items) {
      for (const group of items) {
        if (group && 'children' in group && group.children) {
          for (const submenu of group.children) {
            var current = String(submenu?.key ? submenu.key : '');
            if (submenu && 'children' in submenu && submenu.children) {
              for (const item of submenu.children) {
                if (
                  item &&
                  'path' in item &&
                  (item as any).path === currentMenu &&
                  current !== undefined
                ) {
                  parent.push(current);
                }
              }
            }
          }
        }
      }
    }
    return parent;
  };

  return (
    <>
      <Menu
        mode='inline'
        style={{ paddingBottom: 40, width: '100%' }}
        defaultSelectedKeys={[convertPathName()]}
        defaultOpenKeys={getSelectedParent()}
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
        >
        </Menu>
    </>
  );
};
export default Sidebar;
