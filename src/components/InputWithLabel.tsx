/** => import package */
import React from "react";
/** => types */
export type InputWithLabelProps = {
  label: string;
  note?: JSX.Element;
  style?: React.CSSProperties;
  children?: React.ReactNode
};

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  note,
  children,
  style,
}) => {
  return (
    <div style={style}>
      <span style={{ fontSize: 12, marginBottom:'5px' }}>{label}</span>
      <div style={{fontSize: 15}}>{children}</div>
      {note ? note : null}
    </div>
  );
};
