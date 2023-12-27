import React from 'react';
import { DEFAULT_IMG } from '../const/config';

type Props = {
  url?: string;
  width?: number;
};

const Avatar: React.FC<Props> = ({ url, width }) => {
  let image = url ? url : DEFAULT_IMG;

  let props = {
    style: {
      width: width ? width + 'px' : '',
    },
  };
  return <img className="avatar-remax" src={image} alt="Avatar" {...props} />;
};
export default Avatar;
