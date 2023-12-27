import { UserOutlined } from "@ant-design/icons";
import HeaderSection from "../../components/HeaderSection";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Space,
  Button,
  Spin,
  Card,
  Row,
  Col,
  message,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import { generateFormRules } from "../../helpers/formRules";
import { UserProperties } from "../../types/user.type";
import ChangeEmail from "./ChangeEmail";
import ChangePhone from "./ChangePhone";
import CONFIG from "../../const/config";
import UploadComponent from "../../components/UploadComponent";
import AuthContext from "../../context/AuthContext";
import { httpRequest } from "../../helpers/api";
import { BaseResponseProps } from "../../types/config.type";
import { getErrorMessage } from '@qbit-tech/libs-react';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.user.email) {
      form.setFieldValue("email", auth.user.email);
    }
    if (auth.user.phone) {
      form.setFieldValue("phone", auth.user.phone);
    }

    // eslint-disable-next-line
  }, [auth.user.email, auth.user.phone]);

  const _handleSave = async (data: Partial<UserProperties>) => {
    setIsLoading(true);
    const fullName = `${data.firstName} ${data.middleName} ${data.lastName}`;
    const formData = {
      name: CONFIG.isEditFullName ? undefined : fullName,
      firstName: CONFIG.isEditFullName ? undefined : data.firstName,
      middleName: CONFIG.isEditFullName ? undefined : data.middleName,
      lastName: CONFIG.isEditFullName ? undefined : data.lastName,
      email:
        CONFIG.showEditEmail && !CONFIG.changeEmailWithOTP
          ? data.email
          : undefined,
      phone:
        CONFIG.showEditPhone && !CONFIG.changePhoneWithOTP
          ? data.phone
          : undefined,
    };

    try {
      if (selectedImage) {
        let formData = new FormData();
        formData.append("image", selectedImage);
        await httpRequest.put("users/" + auth.user.userId + "/photo", formData);
      }
      const resultUpdate = await httpRequest.patch<
        BaseResponseProps<UserProperties>
      >("/users/" + auth.user.userId, formData);
      setAuth({
        ...auth,
        user: resultUpdate.data.payload,
      });
      message.success("Update profile successfully");
      navigate("/profile");
    } catch (err) {
      message.error(getErrorMessage(err));
    }
    setIsLoading(false);
  };
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <React.Fragment>
      <HeaderSection
        icon={<UserOutlined />}
        title="Edit Profile"
        subtitle="Manage your profile"
        rightAction={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              loading={isLoading}
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
            onFinish={_handleSave}
            initialValues={{
              name: auth.user.name,
              email: auth.user.email,
              phone: auth.user.phone,
              firstName: auth.user.firstName || auth.user.name,
              middleName: auth.user.middleName,
              lastName: auth.user.lastName,
            }}
            autoComplete="off"
          >
            <UploadComponent
              title="Profile Picture"
              currentPreview={auth.user?.profilePic}
              onSelectFile={setSelectedImage}
            />
            <br />
            {CONFIG.isEditFullName ? (
              <Form.Item
                label="Name"
                name="name"
                rules={generateFormRules("Name", [
                  "required",
                  "letter-and-space",
                ])}
              >
                <Input />
              </Form.Item>
            ) : (
              <React.Fragment>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={generateFormRules("First Name", ["required"])}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Middle Name" name="middleName">
                  <Input />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input />
                </Form.Item>
              </React.Fragment>
            )}
            {CONFIG.showEditPhone ? (
              <Row gutter={[24, 0]} wrap={false} align="middle">
                <Col flex="auto">
                  <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={generateFormRules(
                      "Phone number",
                      CONFIG.phoneRequired
                        ? ["required", "phoneNumber"]
                        : ["phoneNumber"]
                    )}
                  >
                    <Input disabled={CONFIG.changePhoneWithOTP} />
                  </Form.Item>
                </Col>
                {CONFIG.changePhoneWithOTP ? (
                  <Col flex="100px">
                    <Button
                      type="link"
                      onClick={() => setShowChangePhone(true)}
                      block={true}
                    >
                      Change
                    </Button>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {CONFIG.showEditEmail ? (
              <Row gutter={[24, 0]} wrap={false} align="middle">
                <Col flex="auto">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={generateFormRules(
                      "Email",
                      CONFIG.emailRequired ? ["required", "email"] : ["email"]
                    )}
                  >
                    <Input disabled={CONFIG.changeEmailWithOTP} />
                  </Form.Item>
                </Col>
                {CONFIG.changeEmailWithOTP ? (
                  <Col flex="100px">
                    <Button
                      type="link"
                      onClick={() => setShowChangeEmail(true)}
                      block={true}
                    >
                      Change
                    </Button>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Form>
        </Card>
      </Spin>
      <ChangeEmail
        visible={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
      />

      <ChangePhone
        visible={showChangePhone}
        onClose={() => setShowChangePhone(false)}
      />
    </React.Fragment>
  );
};

export default EditProfile;
