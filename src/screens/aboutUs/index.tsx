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

const aboutUs = 'ABOUT_US'

export default function AboutUs() {
  const [about, setAbout] = useState('');
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resAbout = await httpRequest.get<
          BaseResponseProps<{ value: '' }>
        >(`/app-configs/${aboutUs}`);

        if (resAbout && resAbout.data) {
          setAbout(resAbout?.data?.payload?.value);
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
      label: <div className="flex items-center gap-2">About Us</div>,
      key: 'aboutus',
      children: (
        <div className="my-12">
          <ReactQuill
            theme="snow"
            value={about}
            onChange={(val) => setAbout(val)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
      ),
    },
  ];
  const [keyTab, setKeyTab] = useState('aboutus');

  const onChangeTab = (key: string) => {
    setKeyTab(key);
  };

  const updateAbout = async () => {
    setIsLoadingUpdate(true);
    try {
      const dataToSent = {
        value: about,
      };
      await httpRequest.patch(`/app-configs/${aboutUs}`, dataToSent);
      message.success('Success update about us');

      setIsLoadingUpdate(false);
      setIsLoadingAction(!isLoadingAction);
    } catch (error) {
      setIsLoadingUpdate(false);
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (keyTab === 'aboutus') {
      updateAbout();
    }
  };
  return (
    <>
      <HeaderSection
        title="About Us"
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
        defaultActiveKey="aboutus"
        activeKey={keyTab}
      />
    </>
  );
}

const CustomTabs = styled(Tabs)`
  .ant-tabs-tab {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }

  .ant-tabs-nav-list {
    width: 100% !important;
  }
`;
