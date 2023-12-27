import { Badge, Button, message, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderSection from '../../components/HeaderSection';
import AppLayout from '../layout/AppLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
];
const tnc = 'TERMS_AND_CONDITIONS'
const privacyPolicy = 'PRIVACY_AND_POLICY'

export default function TncPrivacy() {
  const [terms, setTerms] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resTerms = await httpRequest.get<
          BaseResponseProps<{ value: '' }>
        >(`/app-configs/${tnc}`);
        const resPrivacy = await httpRequest.get<
          BaseResponseProps<{ value: '' }>
        >(`/app-configs/${privacyPolicy}`);

        if (resTerms && resTerms.data) {
          setTerms(resTerms?.data?.payload?.value);
        } else {
          message.error('Something went wrong');
        }

        if (resPrivacy && resPrivacy.data) {
          setPrivacy(resPrivacy?.data?.payload?.value);
        } else {
          message.error('Something went wrong');
        }

        setIsLoadingAction(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const items = [
    {
      label: <div className="flex items-center gap-2">Terms & Conditions</div>,
      key: 'tnc',
      children: (
        <div className="my-6">
          <ReactQuill
            theme="snow"
            value={terms}
            onChange={(val) => setTerms(val)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
      ),
    },
    {
      label: <div className="flex items-center gap-2">Privacy Policy</div>,
      key: 'privacy',
      children: (
        <div className="my-6">
          <ReactQuill
            theme="snow"
            value={privacy}
            onChange={(val) => setPrivacy(val)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
      ),
    },
  ];
  const [keyTab, setKeyTab] = useState('tnc');

  const onChangeTab = (key: string) => {
    setKeyTab(key);
  };

  const updateTerms = async () => {
    setIsLoadingUpdate(true);
    try {
      const dataToSent = {
        value: terms,
      };
      await httpRequest.patch(`/app-configs/${tnc}`, dataToSent);
      message.success('Success update terms and conditions');

      setIsLoadingUpdate(false);
      setIsLoadingAction(!isLoadingAction);
    } catch (error) {
      setIsLoadingUpdate(false);
      console.log(error);
    }
  };

  const updatePrivacy = async () => {
    setIsLoadingUpdate(true);
    try {
      const dataToSent = {
        value: privacy,
      };
      await httpRequest.patch(`/app-configs/${privacyPolicy}`, dataToSent);
      message.success('Success update privacy policy');

      setIsLoadingUpdate(false);
      setIsLoadingAction(!isLoadingAction);
    } catch (error) {
      setIsLoadingUpdate(false);
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (keyTab === 'tnc') {
      updateTerms();
    } else {
      updatePrivacy();
    }
  };
  return (
    <>
      <HeaderSection
        title="TnC & Privacy Policy"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              type="primary"
              onClick={handleSubmit}
              loading={isLoadingUpdate}
            >
              Update
            </Button>
          </Space>
        }
      />

      <CustomTabs
        items={items}
        onChange={onChangeTab}
        defaultActiveKey="tnc"
        activeKey={keyTab}
      />
    </>
  );
}

const CustomTabs = styled(Tabs)`
  .ant-tabs-tab {
    width: 50% !important;
    display: flex;
    justify-content: center;
  }

  .ant-tabs-nav-list {
    width: 100% !important;
  }
`;
