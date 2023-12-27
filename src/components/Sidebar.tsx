import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
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
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { EUserRole } from '../types/user.type';
import { FEATURE_PERMISSIONS } from '../helpers/featureAndPermission.constant';
import { hasPermissionFromRoles } from '../helpers/featureAndPermissionHelper';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';

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
      icon: <HomeOutlined />,
    },
    {
      type: 'group',
      label: 'MASTER DATA',
      children: [
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.PRODUCT_CATEGORY.__type,
            FEATURE_PERMISSIONS.PRODUCT_CATEGORY.LIST.__type
          ),
          key: '/categories',
          label: 'Category',
          icon: <TagOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.PRODUCT.__type,
            FEATURE_PERMISSIONS.PRODUCT.LIST.__type
          ),
          key: '/products',
          label: 'Product',
          icon: <TableOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.STORE.__type,
            FEATURE_PERMISSIONS.STORE.LIST.__type
          ),
          key: '/stores',
          label: 'Merchant / Store',
          icon: <FileTextOutlined />,
        },
      ],
    },
    {
      type: 'group',
      label: 'CONFIGURATION',
      children: [
        {
          key: '/banner',
          label: 'Banner',
          icon: <PictureOutlined />,
        },
        {
          key: '/about-us',
          label: 'About Us',
          icon: <InfoCircleOutlined />,
        },
        {
          key: '/tnc-privacy',
          label: 'Tnc & Privacy Policy',
          icon: <InfoCircleOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.FAQ_GROUP.__type,
            FEATURE_PERMISSIONS.FAQ_GROUP.LIST.__type
          ),
          key: '/faq-group',
          label: 'FAQ Group',
          icon: <InfoCircleOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.FAQ.__type,
            FEATURE_PERMISSIONS.FAQ.LIST.__type
          ),
          key: '/faqs',
          label: 'FAQs',
          icon: <InfoCircleOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.REGION.__type,
            FEATURE_PERMISSIONS.REGION.LIST.__type
          ),
          key: '/regions',
          label: 'Region',
          icon: <EnvironmentOutlined />,
        },
        // {
        //   key: '/basic-configurations',
        //   label: 'Basic Configuration',
        //   icon: <LaptopOutlined />,
        // },
      ],
    },
    {
      type: 'group',
      label: 'TRANSACTION',
      children: [
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.SUBSCRIPTION.__type,
            FEATURE_PERMISSIONS.SUBSCRIPTION.LIST.__type
          ),
          key: '/email-subscriptions',
          label: 'Email Subscription',
          icon: <BellOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.NOTIFICATION_SCHEDULE.__type,
            FEATURE_PERMISSIONS.NOTIFICATION_SCHEDULE.LIST.__type
          ),
          key: '/notification-schedules',
          label: 'Notification Schedule',
          icon: <CalendarOutlined />,
        },
      ],
    },
    {
      type: 'group',
      label: 'USERS',
      children: [
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.USER.__type,
            FEATURE_PERMISSIONS.USER.LIST.__type
          ),
          key: '/admin',
          label: 'Admin',
          icon: <UsergroupDeleteOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.USER.__type,
            FEATURE_PERMISSIONS.USER.LIST.__type
          ),
          key: '/customer',
          label: 'Customer',
          icon: <UsergroupDeleteOutlined />,
        },
        {
          permission: hasPermissionFromRoles(
            user?.role,
            FEATURE_PERMISSIONS.ROLE.__type,
            FEATURE_PERMISSIONS.ROLE.LIST.__type
          ),
          key: '/role',
          label: 'Role & Permission',
          icon: <UserOutlined />,
        },
      ],
    },
    {
      type: 'group',
      label: 'INTEGRATION',
      children: [
        {
          key: '/bc-integration-logs',
          label: 'BC Integration Logs',
          icon: <InfoCircleOutlined />,
        },
      ],
    },
  ];

  const items = filterPermission(MENUS) as MenuProps['items'];

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
    <Menu
      mode='inline'
      style={{ paddingBottom: 40 }}
      defaultSelectedKeys={[convertPathName()]}
      defaultOpenKeys={getSelectedParent()}
      items={items}
      onClick={({ key }) => {
        navigate(key);
      }}
    />
  );
};
export default Sidebar;
