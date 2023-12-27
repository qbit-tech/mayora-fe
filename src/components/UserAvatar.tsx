import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
  NotificationFilled,
  BellOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { generateInitialFromName } from '../helpers/generator';
import { getFullName } from '../helpers/name';
import { capitalizeFirstLetter } from '../helpers/text';
import { useAuthUser, useSignOut } from 'react-auth-kit';

const UserAvatar: React.FC = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const auth = useAuthUser();
  console.info('auth()', auth());

  const initial = generateInitialFromName(auth()?.name!);
  // const role = capitalizeFirstLetter(auth()?.userType!);
  let name = auth()?.name ? getFullName(auth()) : '';
  name = name
    ? name
        .split(' ')
        .map((value: any) => capitalizeFirstLetter(value))
        .join(' ')
    : '';

  const handleMenuClick = (e: any) => {
    if (e.key === 'profile') {
      navigate('/profile');
    } else if (e.key === 'change-password') {
      navigate('/change-password');
    } else {
      signOut();
      navigate('/login');
    }
  };

  const items: MenuProps = {
    onClick: handleMenuClick,
    items: [
      {
        key: '1',
        type: 'group',
        label:
          'Welcome, ' +
          (auth()?.name!.length > 15
            ? auth()?.name!.substring(0, 15) + '...'
            : auth()?.name),
        children: [
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'My Profile',
          },
          {
            key: 'change-password',
            icon: <LockOutlined />,
            label: 'Change Password',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
          },
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Button type="text">
        <Badge count={5}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </Button>

      <Dropdown menu={items}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <AppAvatar size="large">{initial}</AppAvatar>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                marginBottom: 0,
                fontSize: 12,
                color: '#768499',
              }}
            >
              {/* {role} */}
            </span>
            <span
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {name}
            </span>
          </div>

          <Icon />
        </div>
      </Dropdown>
    </div>
  );
};

const AppAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.ash500};
  color: ${({ theme }) => theme.colors.black};
  margin-right: 7px;
`;

const Icon = styled(DownOutlined)`
  color: ${({ theme }) => theme.colors.charcoal800};
`;

export default UserAvatar;
