import {
  Row,
  Col,
  Typography,
  Card,
  Image,
  Space,
  Button,
  Spin,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import {
  initialBanner,
  BannerProps,
  EBannerType,
} from '../../types/banner.type';
import { formatYearToTime } from '../../helpers/constant';
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import { BaseResponseProps } from '../../types/config.type';
import { PromotionProps } from '../../types/promotion.type';
import { DEFAULT_IMG } from '../../const/config';
import { ProductProps } from '../../types/products.type';
import BannerItemContent from '../../components/BannerItemContent';

interface ILocation {
  bannerId: string;
}

const { Title, Text } = Typography;

const BannerDetail: React.FC = () => {
  const { bannerId } = useParams<keyof ILocation>() as ILocation;
  const { setBreadcrumbDetails } = useDetailBreadcrumbs();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [banner, setBanner] = React.useState<BannerProps>(initialBanner);

  React.useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        setIsLoading(true);

        const res = await httpRequest.get<any>('/banners/' + bannerId);
        if (res && res?.data) {
          setBanner(res?.data?.payload);
        } else {
          message.error('Something went wrong');
        }

        const bcDetails = [
          {
            field: 'bannerId',
            value: bannerId,
            label: 'Detail Banner',
          },
        ];
        setBreadcrumbDetails(bcDetails);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [bannerId]);

  const handleEditNews = () => {
    navigate('/banner/' + bannerId + '/edit');
  };

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (banner.bannerType === EBannerType.promotions) {
      (async () => {
        const res = await httpRequest.get<BaseResponseProps<PromotionProps>>(
          `/promotions/${banner.relatedContentId}`
        );

        setData(res.data.payload);
      })();
    }

    if (banner.bannerType === EBannerType.product) {
      (async () => {
        const res = await httpRequest.get<BaseResponseProps<ProductProps>>(
          `/products/${banner.relatedContentId}`
        );

        setData(res.data.payload);
      })();
    }
  }, [banner.relatedContentId, banner.bannerType]);

  const isPromotion = banner.bannerType === EBannerType.promotions;

  const handleClickDetail = () => {
    if (isPromotion) {
      navigate(`/promotions/${banner.relatedContentId}`);
    } else {
      navigate(`/products/${banner.relatedContentId}`);
    }
  };

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title="Detail Banner"
        // subtitle="Manage your category data"
        rightAction={
          <Space>
            <Button type="primary" onClick={handleEditNews}>
              Edit
            </Button>
          </Space>
        }
      />

      {isLoading ? (
        <Spin spinning />
      ) : (
        <Card bordered={false}>
          <Row>
            <Col span={5}>
              <Title level={5}>Data Banner</Title>
              <Text style={{ color: '#768499' }}>
                These are banner details, you can’t change here
              </Text>
            </Col>
            <Col offset={1} span={16}>
              <Title
                level={5}
                style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}
              >
                Image
              </Title>
              <Image
                width={144}
                height={104}
                //   src={selectedImage.url || DEFAULT_IMG}
                src={
                  banner?.bannerImageUrl ? banner?.bannerImageUrl : DEFAULT_IMG
                }
                fallback={DEFAULT_IMG}
                style={{ objectFit: 'cover' }}
              />

              <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                  <Title
                    level={5}
                    style={{
                      color: '#768499',
                      marginTop: 20,
                      marginBottom: 2,
                      fontSize: 14,
                    }}
                  >
                    Title
                  </Title>
                  <Text>{banner?.title}</Text>
                </Col>
                <Col span={12}>
                  <Title
                    level={5}
                    style={{
                      color: '#768499',
                      marginTop: 20,
                      marginBottom: 2,
                      fontSize: 14,
                    }}
                  >
                    Subtitle
                  </Title>
                  <Text>{banner?.subtitle}</Text>
                </Col>
              </Row>

              <Title
                level={5}
                style={{
                  color: '#768499',
                  marginTop: 20,
                  marginBottom: 2,
                  fontSize: 14,
                }}
              >
                Banner Type
              </Title>
              <Text>{banner?.bannerType}</Text>

              {banner?.bannerType === 'URL' && (
                <>
                  <Title
                    level={5}
                    style={{
                      color: '#768499',
                      marginTop: 20,
                      marginBottom: 2,
                      fontSize: 14,
                    }}
                  >
                    Content URL
                  </Title>
                  <Text>{banner.relatedContentUrl}</Text>
                </>
              )}

              {(banner.bannerType === EBannerType.promotions ||
                banner.bannerType === EBannerType.product) &&
              data ? (
                <>
                  <Title
                    level={5}
                    style={{
                      color: '#768499',
                      marginTop: 20,
                      marginBottom: 2,
                      fontSize: 14,
                    }}
                  >
                    {isPromotion ? 'Promotion' : 'Product'}
                  </Title>
                  {data && <BannerItemContent banner={banner} data={data} />}
                </>
              ) : null}

              <Title
                level={5}
                style={{
                  color: '#768499',
                  marginTop: 20,
                  marginBottom: 2,
                  fontSize: 14,
                }}
              >
                Status
              </Title>
              <Text>{banner?.isPublished ? 'Active' : 'Inactive'}</Text>

              <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                  <Title
                    level={5}
                    style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}
                  >
                    Created At
                  </Title>
                  <Text>{formatYearToTime(banner?.createdAt)}</Text>
                </Col>
                <Col span={12}>
                  <Title
                    level={5}
                    style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}
                  >
                    Updated At
                  </Title>
                  <Text>{formatYearToTime(banner?.updatedAt)}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </React.Fragment>
  );
};

export default BannerDetail;
