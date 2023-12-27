import { Button, Modal, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { IconWarning } from '../assets/icons';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
  title: string;
  subTitle: string;
  btnText: string;
  onClick?: any;
  isLoading?: boolean;
};

export default function ConfirmModal(props: Props) {
  let icon = props.icon ? props.icon : <IconWarning />;
  return (
    <CustomModal
      width={472}
      open={props.isModalVisible}
      footer={null}
      onCancel={() => {
        props.setIsModalVisible(false);
      }}
    >
      <div className="content">
        {props.icon && <div className="icon">{icon}</div>}

        <Typography.Text className="title">{props.title}</Typography.Text>
        <Typography.Text className="sub-title">
          {props.subTitle}
        </Typography.Text>
      </div>

      <CustomBtn
        type="primary"
        onClick={props.onClick}
        loading={props.isLoading}
      >
        {props.btnText}
      </CustomBtn>
    </CustomModal>
  );
}

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 18px 20px;
    .content {
      display: flex;
      padding: 30px 0px 24px;
      flex-direction: column;
      align-items: center;
      .icon {
        margin-bottom: 24px;
      }
      .title {
        font-size: 20px;
        font-weight: 600;
        color: #1e1e1e;
        margin-bottom: 5px;
        text-align: center;
      }
      .sub-title {
        font-size: 14px;
        font-weight: 400;
        color: #9facbf;
      }
    }
  }
  .ant-modal-close {
    color: black;
  }
`;

const CustomBtn = styled(Button)`
  width: 100%;
  height: 48px;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;
