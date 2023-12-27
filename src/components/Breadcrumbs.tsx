import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import useDetailBreadcrumbs from '../hooks/useDetailBreadcrumbs';
import { capitalizeFirstLetter } from '../helpers/text';
import { theme } from '../assets/theme';

interface IProps {
  marginTop?: number;
}

const Breadcrumbs: React.FC<IProps> = ({ marginTop }) => {
  const { breadcrumbDetails } = useDetailBreadcrumbs();
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();

  const renderLabel = (label: any) => {
    const labels = label.props.children.split('-');
    if (labels.length > 0) {
      const findInBreadcrumbDetails = breadcrumbDetails.find(
        (item) =>
          item.value.split('-').join(' ').toLowerCase() ===
          label.props.children.toLowerCase(),
      );
      if (findInBreadcrumbDetails) {
        return findInBreadcrumbDetails.label;
      } else {
        const newLabel = labels.join(' ').toString();
        return newLabel.length > 20
          ? newLabel.substr(0, 20) + '...'
          : newLabel
              .split(' ')
              .map((value: any) => capitalizeFirstLetter(value))
              .join(' ');
      }
    } else {
      return label.props.children;
    }
  };

  const handleBreadcrumb = (e: any, link: string, locationState: any) => {
    e.preventDefault();

    navigate(link, {
      state: {
        ...locationState,
      },
    });
  };

  return (
    <Breadcrumb
      style={{ marginTop }}
      // separator={<img src="/images/breadcrumb-separator.svg" alt="breadcrumb-separator" width="5" />}
    >
      {breadcrumbs.map(({ breadcrumb, match, location }, index) => {
        if (match.pathname === '/') {
          return (
            <Breadcrumb.Item key={match.pathname}>
              <div
                style={{ display: 'flex', alignItems: 'start', height: 22 }}
                key={index}
                onClick={(e) =>
                  handleBreadcrumb(e, '/dashboard', location.state)
                }
              >
                <HomeOutlined style={{ fontSize: 16 }} />
              </div>
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item key={match.pathname}>
              <div
                key={index}
                onClick={(e) =>
                  handleBreadcrumb(e, match.pathname, location.state)
                }
              >
                {renderLabel(breadcrumb)}
              </div>
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
