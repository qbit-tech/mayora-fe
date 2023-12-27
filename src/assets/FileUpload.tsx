import React from "react"

type Props = {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const defaultProps = {
  color: '#A9B6C1',
  size: 81,
  strokeWidth: 5
}

const FileUpload: React.FC<Props> = (props) => {
  const {
    color,
    size,
    strokeWidth
  } = {
    ...defaultProps,
    ...props
  };

  return (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 81 81"
  >
    <path
      d="M40.5 60.75V40.5M30.5 47.25l10-6.75 10 6.75"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M60.501 70.875h-40c-1.84 0-3.333-1.511-3.333-3.375v-54c0-1.864 1.492-3.375 3.333-3.375h25.21c.93 0 1.816.392 2.447 1.082l14.79 16.173c.57.623.887 1.442.887 2.293V67.5c0 1.864-1.493 3.375-3.334 3.375Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M63.832 30.375H47.165c-1.84 0-3.333-1.511-3.333-3.375V10.125"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
}

export default FileUpload;