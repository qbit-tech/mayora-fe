import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  Space,
  Upload,
  Button,
  Typography,
  Image,
  message,
  Row,
  Col,
} from 'antd';
import styled from 'styled-components';
import { DEFAULT_IMG } from '../../const/config';

type Props = {
  maxSizeInMB?: number; // default 2MB
  imageUrl: string;
  onChange: (file: File) => void;
  onPreviewChange?: (previewUrl: string) => void;
  recommendedResolution?: string; // default 500x300px
};

export default function SingleUploadMedium(props: Props) {
  const [imageUrl, setImageUrl] = React.useState(props.imageUrl);

  const maxSizeInMB = props.maxSizeInMB ? props.maxSizeInMB : 2;
  const recommendedResolution = props.recommendedResolution
    ? props.recommendedResolution
    : '500x300px';

  return (
    <div>
      <Image
        preview={false}
        width={550}
        height={300}
        src={imageUrl || DEFAULT_IMG}
        fallback={DEFAULT_IMG}
        placeholder={
          <Image preview={false} src={DEFAULT_IMG} width={137} height={132} />
        }
      />
      <CustomUpload
        style={{
          width: '100%',
          display: 'block',
        }}
        name="file"
        accept=".jpg,.jpeg,.png"
        showUploadList={false}
        beforeUpload={(file) => {
          const isLtMaxSize = file.size / 1024 / 1024 < maxSizeInMB;
          if (!isLtMaxSize) {
            message.error(`Image must smaller than ${maxSizeInMB}MB!`);
          } else {
            // generate preview image
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
              if (e.target && e.target.result) {
                setImageUrl(e.target.result as string);
                if (props.onPreviewChange) {
                  props.onPreviewChange(e.target.result as string);
                }
              }
            };
            // end generate preview image
          }

          props.onChange(file);

          return false;
        }}
        maxCount={1}
      >
        <Button
          type="primary"
          block
          // danger
          icon={<UploadOutlined />}
          style={{
            marginBottom: '20px',
            backgroundColor: '#ffffff',
            color: '#00133B',
          }}
        >
          Choose Image
        </Button>
      </CustomUpload>
    </div>
  );
}

const CustomSpace = styled(Space)`
  width: 100%;
`;

const CustomUpload = styled(Upload)`
  width: 100%;
  .ant-upload {
    width: 100%;
  }
`;
