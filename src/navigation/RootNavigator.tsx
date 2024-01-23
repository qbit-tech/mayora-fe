import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntegrationBC from '../screens/integrationBC';
import AppLayout from '../screens/layout/AppLayout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Spin } from 'antd';

const NotFound = React.lazy(() => import('../NotFound'));
const TncPrivacy = React.lazy(() => import('../screens/tncPrivacy'));
const AboutUs = React.lazy(() => import('../screens/aboutUs'));

const Login = React.lazy(() => import('../screens/auth/NewLogin'));
const LoginAzure = React.lazy(() => import('../screens/auth/LoginAzure'));
const ForgotPassword = React.lazy(
  () => import('../screens/auth/ForgotPassword'),
);
const ResetPassword = React.lazy(() => import('../screens/auth/ResetPassword'));

const Dashboard = React.lazy(() => import('../screens/dashboard'));
const Profile = React.lazy(() => import('../screens/profile'));
const EditProfile = React.lazy(() => import('../screens/profile/Edit'));
const ChangeMyPassword = React.lazy(
  () => import('../screens/profile/ChangeMyPassword'),
);
const ChangePasswordUser = React.lazy(
  () => import('../screens/user/ChangePassword'),
);
const User = React.lazy(() => import('../screens/user'));
const UserEdit = React.lazy(() => import('../screens/user/Edit'));
const UserDetail = React.lazy(() => import('../screens/user/Detail'));

const Banner = React.lazy(() => import('../screens/banner'));
const BannerEdit = React.lazy(() => import('../screens/banner/Edit'));
const BannerDetail = React.lazy(() => import('../screens/banner/Detail'));

const BasicConfig = React.lazy(() => import('../screens/basicConfig'));

const Role = React.lazy(() => import('../screens/role'));
const RoleEdit = React.lazy(() => import('../screens/role/Edit'));
const RoleDetail = React.lazy(() => import('../screens/role/Detail'));

const TroubleList = React.lazy(() => import('../screens/troubleList'));
const TroubleListEdit = React.lazy(() => import('../screens/troubleList/Edit'));
const TroubleListSelect = React.lazy(() => import('../screens/troubleList/Select'));

const ManualCollection = React.lazy(() => import('../screens/manualCollection'));
const ManualCollectionDetail = React.lazy(() => import('../screens/manualCollection/Detail'));
const ManualCollectionEdit = React.lazy(() => import('../screens/manualCollection/Edit'));

const Release = React.lazy(() => import('../screens/release'))

const Report = React.lazy(() => import('../screens/report'))

const MasterCategory = React.lazy(() => import('../screens/masterCategory'));

const Target = React.lazy(() => import('../screens/target'));

const NotifSchedule = React.lazy(() => import('../screens/notifSchedule'));
const NotifScheduleEdit = React.lazy(
  () => import('../screens/notifSchedule/Edit'),
);

const Subscription = React.lazy(() => import('../screens/subscription'));

// const PromotionDetail = React.lazy(() => import('../screens/promotion/Detail'));/

const RootNavigator: React.FC = () => {
  // const isLoggedIn = useIsAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Suspense fallback={<Spin spinning={true} />}>
                <Login />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Suspense fallback={<Spin spinning={true} />}>
                <Login />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/login-azure"
          element={
            <PublicRoute>
              <Suspense fallback={<Spin spinning={true} />}>
                <LoginAzure />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <Suspense fallback={<Spin spinning={true} />}>
                <ForgotPassword />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:sessionId"
          element={
            <PublicRoute>
              <Suspense fallback={<Spin spinning={true} />}>
                <ResetPassword />
              </Suspense>
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute loginPath="/login">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PrivateRoute loginPath="/login">
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute loginPath="/login">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute loginPath="/login">
                <ChangeMyPassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute loginPath="/login">
                <User userType="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <PrivateRoute loginPath="/login">
                <UserEdit userType="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/:userId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <UserEdit userType="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/:userId"
            element={
              <PrivateRoute loginPath="/login">
                <UserDetail userType="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/:userId/change-password"
            element={
              <PrivateRoute loginPath="/login">
                <ChangePasswordUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <PrivateRoute loginPath="/login">
                <User userType="customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/add"
            element={
              <PrivateRoute loginPath="/login">
                <UserEdit userType="customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/:userId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <UserEdit userType="customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/:userId"
            element={
              <PrivateRoute loginPath="/login">
                <UserDetail userType="customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/:userId/change-password"
            element={
              <PrivateRoute loginPath="/login">
                <ChangePasswordUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/basic-configurations"
            element={
              <PrivateRoute loginPath="/login">
                <BasicConfig />
              </PrivateRoute>
            }
          />
          <Route
            path="/banner"
            element={
              <PrivateRoute loginPath="/login">
                <Banner />
              </PrivateRoute>
            }
          />
          <Route
            path="/banner/add"
            element={
              <PrivateRoute loginPath="/login">
                <BannerEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/banner/:bannerId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <BannerEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/banner/:bannerId"
            element={
              <PrivateRoute loginPath="/login">
                <BannerDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/trouble-list"
            element={
              <PrivateRoute loginPath="/login">
                <TroubleList />
              </PrivateRoute>
            }
          />
          <Route
            path="/trouble-list/edit/:id/:idCategory"
            element={
              <PrivateRoute loginPath="/login">
                <TroubleListEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/trouble-list/edit/:id/:idCategory/select"
            element={
              <PrivateRoute loginPath="/login">
                <TroubleListSelect />
              </PrivateRoute>
            }
          />
          <Route
            path="/manual-collection"
            element={
              <PrivateRoute loginPath="/login">
                <ManualCollection />
              </PrivateRoute>
            }
          />
           <Route
            path="/manual-collection/edit/:idCategory/:shift/:idMachine"
            element={
              <PrivateRoute loginPath="/login">
                <ManualCollectionEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/manual-collection/detail/:idCategory"
            element={
              <PrivateRoute loginPath="/login">
                <ManualCollectionDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/release"
            element={
              <PrivateRoute loginPath="/login">
                <Release />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute loginPath="/login">
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/master-category"
            element={
              <PrivateRoute loginPath="/login">
                <MasterCategory />
              </PrivateRoute>
            }
          />
          <Route
            path='/target'
            element={
              <PrivateRoute loginPath="/login">
              <Target />
            </PrivateRoute>
            }
          />
          <Route
            path="/notification-schedules"
            element={
              <PrivateRoute loginPath="/login">
                <NotifSchedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification-schedules/add"
            element={
              <PrivateRoute loginPath="/login">
                <NotifScheduleEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification-schedules/:id/edit"
            element={
              <PrivateRoute loginPath="/login">
                <NotifScheduleEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/email-subscriptions"
            element={
              <PrivateRoute loginPath="/login">
                <Subscription />
              </PrivateRoute>
            }
          />
          <Route
            path="/tnc-privacy"
            element={
              <PrivateRoute loginPath="/login">
                <TncPrivacy />
              </PrivateRoute>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoute loginPath="/login">
                <Role />
              </PrivateRoute>
            }
          />
          <Route
            path="/role/add"
            element={
              <PrivateRoute loginPath="/login">
                <RoleEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/role/:roleId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <RoleEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/role/:roleId"
            element={
              <PrivateRoute loginPath="/login">
                <RoleDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <PrivateRoute loginPath="/login">
                <AboutUs />
              </PrivateRoute>
            }
          />
          <Route
            path="/bc-integration-logs"
            element={
              <PrivateRoute loginPath="/login">
                <IntegrationBC />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigator;
