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

const FAQs = React.lazy(() => import('../screens/faqs'));
const FAQsEdit = React.lazy(() => import('../screens/faqs/edit'));

const FAQGroup = React.lazy(() => import('../screens/faqGroup'));
const FAQGroupEdit = React.lazy(() => import('../screens/faqGroup/edit'));

const Role = React.lazy(() => import('../screens/role'));
const RoleEdit = React.lazy(() => import('../screens/role/Edit'));
const RoleDetail = React.lazy(() => import('../screens/role/Detail'));

const Product = React.lazy(() => import('../screens/product'));
const ProductEdit = React.lazy(() => import('../screens/product/Edit'));
const ProductDetail = React.lazy(() => import('../screens/product/Detail'));

const Category = React.lazy(() => import('../screens/category'));
const CategoryEdit = React.lazy(() => import('../screens/category/Edit'));
const CategoryDetail = React.lazy(() => import('../screens/category/Detail'));

const Store = React.lazy(() => import('../screens/store'));
const StoreEdit = React.lazy(() => import('../screens/store/Edit'));
const StoreDetail = React.lazy(() => import('../screens/store/Detail'));

const Region = React.lazy(() => import('../screens/region'));
const RegionEdit = React.lazy(() => import('../screens/region/Edit'));

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
            path="/products"
            element={
              <PrivateRoute loginPath="/login">
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <PrivateRoute loginPath="/login">
                <ProductEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:productId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <ProductEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <PrivateRoute loginPath="/login">
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute loginPath="/login">
                <Category />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/add"
            element={
              <PrivateRoute loginPath="/login">
                <CategoryEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/:categoryId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <CategoryEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/:categoryId"
            element={
              <PrivateRoute loginPath="/login">
                <CategoryDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <PrivateRoute loginPath="/login">
                <Store />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/add"
            element={
              <PrivateRoute loginPath="/login">
                <StoreEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/:storeId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <StoreEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/:storeId"
            element={
              <PrivateRoute loginPath="/login">
                <StoreDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/regions"
            element={
              <PrivateRoute loginPath="/login">
                <Region />
              </PrivateRoute>
            }
          />
          <Route
            path="/regions/add"
            element={
              <PrivateRoute loginPath="/login">
                <RegionEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/regions/:id/edit"
            element={
              <PrivateRoute loginPath="/login">
                <RegionEdit />
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
            path="/faqs"
            element={
              <PrivateRoute loginPath="/login">
                <FAQs />
              </PrivateRoute>
            }
          />
          <Route
            path="/faqs/add"
            element={
              <PrivateRoute loginPath="/login">
                <FAQsEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/faqs/:faqId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <FAQsEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq-group"
            element={
              <PrivateRoute loginPath="/login">
                <FAQGroup />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq-group/add"
            element={
              <PrivateRoute loginPath="/login">
                <FAQGroupEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq-group/:faqGroupId/edit"
            element={
              <PrivateRoute loginPath="/login">
                <FAQGroupEdit />
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
