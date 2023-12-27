import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface InfoProps {
  title: string;
  content: string;
}

interface SectionContentProps {
  groupTitle: string;
  helpers?: InfoProps[];
  children?: any;
  subTitle?: string;
}

const CustomFormGroup = ({ column, children }: any) => {
  if (column === 2) {
    return <FormGroupTwoColumn>{children}</FormGroupTwoColumn>;
  } else {
    return <FormGroup>{children}</FormGroup>;
  }
};

const SectionContent: React.FC<SectionContentProps> = ({
  groupTitle,
  subTitle,
  helpers,
  children,
}) => {
  return (
    <CustomFormGroup column={helpers ? 3 : 2}>
      <FormGroupTitle>
        <Typography.Text className="block text-3.5 font-semibold mb-2.5">
          {groupTitle}
        </Typography.Text>
        <Typography.Text className="text-3 text-gray">
          {subTitle}
        </Typography.Text>
      </FormGroupTitle>

      <FormContent>{children}</FormContent>
      {helpers ? (
        <FormGroupHelper>
          {helpers &&
            helpers?.map((item, idx) => {
              return (
                <div key={idx}>
                  <div id="title">{item.title}</div>
                  <div id="subtitle">{item.content}</div>
                </div>
              );
            })}
        </FormGroupHelper>
      ) : (
        false
      )}
    </CustomFormGroup>
  );
};

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 300px;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const FormGroupTwoColumn = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 36px;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const FormGroupTitle = styled.div`
  /* font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme }) => theme.fontWeight.bold}; */
`;

export const FormContent = styled.div`
  width: 100%;
`;

export const FormGroupHelper = styled.div`
  margin-bottom: 15px;

  #title {
    font-size: ${({ theme }) => theme.fontSize.body};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  #subtitle {
    font-size: ${({ theme }) => theme.fontSize.smallText};
    color: ${({ theme }) => theme.colors.charcoal200};
  }
`;

export default SectionContent;
