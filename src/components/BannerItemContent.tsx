import React from 'react';
import { BannerProps, EBannerType } from '../types/banner.type';
import { useNavigate } from 'react-router-dom';
import { Col, Image, Row, Typography } from 'antd';
import { getCategoryName } from '../helpers/text';
import { formatYearToTime } from '../helpers/constant';
import { DEFAULT_IMG } from '../const/config';

export default function BannerItemContent({
  banner,
  data,
}: {
  banner: BannerProps;
  data: any;
}) {
  const navigate = useNavigate();

  const isPromotion = banner.bannerType === EBannerType.promotions;

  const handleClickDetail = () => {
    if (isPromotion) {
      navigate(`/promotions/${banner.relatedContentId}`);
    } else {
      navigate(`/products/${banner.relatedContentId}`);
    }
  };

  return (
    <div
      className="flex gap-4 cursor-pointer"
      style={{ margin: '16px 0px' }}
      onClick={handleClickDetail}
    >
      <Image
        src={
          (isPromotion ? data?.image : data?.images?.[0]?.imageUrl) ||
          DEFAULT_IMG
        }
        width={104}
        height={104}
        style={{ objectFit: 'cover' }}
      />
      <div>
        <Typography.Text className="font-semibold block">
          {isPromotion ? data?.description : data?.productName}
        </Typography.Text>
        <Typography.Text className="block">
          IDR{' '}
          {isPromotion
            ? data?.amount?.toLocaleString('id-ID')
            : data?.finalPrice?.toLocaleString('id-ID')}
        </Typography.Text>
        {!isPromotion && (
          <p
            style={{
              fontSize: 12,
              marginBottom: 0,
              color: '#768499',
            }}
          >
            {getCategoryName(data?.categories, 'category')}
            {getCategoryName(data?.categories, 'subCategory')
              ? `, ${getCategoryName(data?.categories, 'subCategory')}`
              : ''}
          </p>
        )}
        {isPromotion && (
          <>
            <Typography.Text className="block">
              Time: {formatYearToTime(data?.startAt)} -{' '}
              {formatYearToTime(data?.endAt)}
            </Typography.Text>
            <Row gutter={[12, 12]} style={{ margin: '20px 0px' }}>
              {data?.items.map((item: any) => (
                <Col key={item?.promotionItemsId}>
                  <div className="flex gap-2" style={{ margin: '10px 0px' }}>
                    <Image
                      src={
                        item?.product?.images
                          ? item?.product?.images.length > 0
                            ? item?.product?.images![0]?.imageUrl
                            : DEFAULT_IMG
                          : DEFAULT_IMG
                      }
                      alt={item?.promoId}
                      width={70}
                      height={70}
                    />
                    <div className="body">
                      <Typography.Text className="block">
                        {item?.product?.productName}
                      </Typography.Text>
                      <Typography.Text className="block">
                        Qty : {item?.quantity}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
