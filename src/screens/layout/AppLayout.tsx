import React, { Suspense } from 'react';
import { Button, Layout, Space, Spin, Tooltip, Typography } from 'antd';
import {
  BellOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LeftCircleOutlined,
  PictureOutlined,
  RightCircleOutlined,
  TableOutlined,
  TagOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import UserAvatar from '../../components/UserAvatar';
import { appVersion, now, thisYear } from '../../helpers/constant';
import useConfigApp from '../../hooks/useConfigApp';
import Sidebar from '../../components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { theme } from '../../assets/theme';
import { useAuthUser } from 'react-auth-kit';

const APP_LABEL = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: (
      <HomeOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/categories',
    label: 'Category',
    icon: <TagOutlined style={{ fontSize: 18, color: theme.colors.primary }} />,
  },
  {
    key: '/products',
    label: 'Product',
    icon: (
      <TableOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/stores',
    label: 'Merchant / Store',
    icon: (
      <FileTextOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/banner',
    label: 'Banner',
    icon: (
      <PictureOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/about-us',
    label: 'About Us',
    icon: (
      <InfoCircleOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/tnc-privacy',
    label: 'Tnc & Privacy Policy',
    icon: (
      <InfoCircleOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/faq-group',
    label: 'FAQ Group',
    icon: (
      <InfoCircleOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/faqs',
    label: 'FAQs',
    icon: (
      <InfoCircleOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/regions',
    label: 'Region',
    icon: (
      <EnvironmentOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/email-subscriptions',
    label: 'Email Subscription',
    icon: (
      <BellOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/notification-schedules',
    label: 'Notification Schedule',
    icon: (
      <CalendarOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/admin',
    label: 'Admin',
    icon: (
      <UsergroupDeleteOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/customer',
    label: 'Customer',
    icon: (
      <UsergroupDeleteOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
  {
    key: '/role',
    label: 'Role & Permission',
    icon: (
      <UserOutlined style={{ fontSize: 18, color: theme.colors.primary }} />
    ),
  },
  {
    key: '/bc-integration-logs',
    label: 'BC Integration Logs',
    icon: (
      <InfoCircleOutlined
        style={{ fontSize: 18, color: theme.colors.primary }}
      />
    ),
  },
];

const { Header, Sider, Content } = Layout;

type Props = {};

const AppLayout: React.FC<Props> = () => {
  const { sidebarCollapsed, toggleSidebar } = useConfigApp();
  const location = useLocation();
  const auth = useAuthUser();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

  return (
    <div style={{height: '100vh', }}>
      <Layout>
      <AppHeader>
            <img src="/mayora.svg" alt="mayora" height="20"/>
            <AppHeaderAccount>
              <DateNow>
                <CalendarOutlined style={{marginRight: '7px'}}/>
                {weekday[new Date().getDay()]+ ", " + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()}
                <ClockCircleOutlined style={{marginRight: '7px', marginLeft: '12px'}}/>
                {new Date().getHours() + ":" + (new Date().getMinutes() + 1) + ":" + new Date().getSeconds()}
              </DateNow>
              <DividerTitle />
              <UserAvatar />
            </AppHeaderAccount>
      </AppHeader>
      </Layout>
      <Layout style={{ flexDirection: 'row'}}>
        <AppSider
          onCollapse={toggleSidebar}
          trigger={null}
          collapsible
          collapsed={sidebarCollapsed}
          collapsedWidth={70}
          width={250}
          style={{ paddingLeft: sidebarCollapsed ? 0 : '0', height: '100vh' }}
        >
          {/* <AppLogo collapsed={sidebarCollapsed} /> */}
          <Sidebar />
        {sidebarCollapsed ? (
          <Tooltip placement="right" title={'Expand Sidebar'}>
            <Button
              style={{
                position: 'absolute',
                bottom: 0,
                height: 40,
                width: 66,
                backgroundColor: theme.colors.background,
              }}
              onClick={toggleSidebar}
              type="text"
              icon={
                <RightCircleOutlined
                  style={{ color: theme.colors.white }}
                  className="icon-collapsed"
                />
              }
            />
          </Tooltip>
        ) : (
          <MinimizeButton
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              bottom: 0,
              height: 40,
              width: "100%",
            }}
          >
            <div>
              v{appVersion} · ©{thisYear}
            </div>
            <LeftCircleOutlined color={theme.colors.white} />
          </MinimizeButton>
        )}
        </AppSider>

        <Layout
          id="scroll-content"
          className="site-layout"
          style={{ minHeight: '100vh', overflowY: 'scroll', backgroundColor: "#EEEFEF", paddingTop: '5px'}}
        >
          <AppContent>
            <Space size="middle" direction="vertical">
              <Suspense fallback={<Spin spinning={true} />}>
                <Outlet />
              </Suspense>
            </Space>
          </AppContent>
        </Layout>
      </Layout>
    </div>
  );
};

const AppContent = styled(Content)`
  height: 100%;
  padding: 0px 20px 20px 20px;
`;

const AppSider = styled(Sider)`
  background-color: ${({ theme }) => theme.colors.primary};
  overflow: auto;
  overflow-x: hidden;
  padding-left: 10px;
`;

const AppHeader = styled(Header)`
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
`;

const DateNow = styled.div`
  color: ${({ theme }) => theme.colors.black};
  text-align: right;
`;

const AppHeaderAccount = styled.div`
  flex: 1;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  justify-content: flex-end;
`;

const AppHeaderLabel = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DividerTitle = styled.div`
  width: 2.5px;
  height: 100%;
  background-color: #eef0f6;
  opacity: 0.4;
  margin: 0 10px;
`;

const MinimizeButton = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  cursor: pointer;

  div {
    color: ${({ theme }) => theme.colors.white};
    font-size: 10px;
  }

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export default AppLayout;
