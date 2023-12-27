import SingleUploadLarge from './SingleUploadLarge';
import SingleUploadSmall from './SingleUploadSmall';
import SingleUploadMedium from './SingleUploadMedium';

type Props = {
  mode?: 'single-large' | 'single-small' | 'single-medium';
  maxSizeInMB?: number; // default 2MB
  imageUrl: string;
  onChange: (file: File) => void;
  onPreviewChange?: (previewUrl: string) => void;
  recommendedResolution?: string; // default 500x300px
};

export default function FormUploadImage(props: Props) {
  if (props.mode === 'single-large') {
    return <SingleUploadLarge {...props} />
  } else if (props.mode === 'single-medium') {
    return <SingleUploadMedium {...props} />
  } else {
    return <SingleUploadSmall {...props} />
  }
}
