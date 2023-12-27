import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  Form,
  Input,
  message,
  Row,
  DatePicker,
  Space,
  Select,
  Col,
  Divider,
  Modal,
  Image,
  Button,
  Tag,
  Table,
  Typography,
  Card,
  Pagination,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { initialProductImages } from '../../types/productImages.type';
import FormUploadImage from '../../components/FormUpload/FormUploadImage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '@qbit-tech/libs-react';
import HeaderSection from '../../components/HeaderSection';
import { generateFormRules } from '../../helpers/formRules';
import AppLayout from '../layout/AppLayout';
import { httpRequest } from '../../helpers/api';
import HTMLPreview from '../../components/HTMLPreview';
import {
  BaseResponseProps,
  BaseResponsePaginationProps,
} from '../../types/config.type';
import DetailItem from '../../components/DetailItem';
import { initialProduct, ProductProps } from '../../types/products.type';
import { CategoryProps } from '../../types/category.type';
import { StoreProps } from '../../types/store.type';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import {
  formatYearToTime,
  formatDate,
  formatTime,
  PAGE_SIZE_OPTIONS,
} from '../../helpers/constant';
import {
  initialProductStock,
  ProductStockProps,
} from '../../types/productStocks.type';
import {
  initialProductPrice,
  ProductPriceProps,
} from '../../types/productPrices.type';
import { ContainerFilter } from '.';
import useFetchList from '../../hooks/useFetchList';
import { replaceDashWithSpace } from '../../helpers/replaceDashWithSpace';
import { capitalizeFirstLetter } from '../../helpers/text';
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import { PromotionProps } from '../../types/promotion.type';
import formatPrice from '../../helpers/formatPrice';
import { FetchAllProductVariantResponse, ProductVariantProps, initialProductVariant } from '../../types/productVariant.type';
import { FetchAllProductPricesScheduleResponse, ProductPricesScheduleProps, initialProductPricesSchedule } from '../../types/productPricesSchedules';
import moment from 'moment';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

interface ResponsePropsStock
  extends BaseResponsePaginationProps<ProductStockProps> { }
interface ResponsePropsPrice
  extends BaseResponsePaginationProps<ProductPriceProps> { }

interface ILocation {
  productId: string;
}

const { Text, Title } = Typography;
const { Option } = Select;

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<keyof ILocation>() as ILocation;
  const { setBreadcrumbDetails } = useDetailBreadcrumbs();
  const [form] = Form.useForm();

  const [isLoadingData, setIsLoadingData] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalBackOpen, setIsModalBackOpen] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductProps>(initialProduct);
  const [productPrice, setProductPrice] = React.useState<ProductPricesScheduleProps[]>();
  const [price, setPrice] = React.useState<ProductPricesScheduleProps[]>([
    initialProductPricesSchedule,
  ]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [stockTmpData, setStockTmpData] =
    React.useState<ProductStockProps>(initialProductStock);
  const [priceTmpData, setPriceTmpData] =
    React.useState<ProductPricesScheduleProps>(initialProductPricesSchedule);
  const [variantTmpData, setVariantTmpData] =
    React.useState<ProductVariantProps>(initialProductVariant);
  const [stock, setStock] = React.useState<ProductStockProps[] | any>([
    initialProductStock,
  ]);
  const [modalType, setModalType] = React.useState<string>('');
  const [locations, setLocations] = React.useState<StoreProps[]>([]);
  const [images, setImages] = React.useState<File[]>([]);
  const [uploadImageUrls, setUploadImageUrls] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<
    File | string | null
  >('');
  const [willBeDeletedImage, setWillBeDeletedImage] = React.useState<
    File | undefined
  >();
  const [formType, setFormType] = React.useState<string>('product');
  const [isLoadingDeleteImage, setIsLoadingDeleteImage] = React.useState(false);
  const [promoProduct, setPromoProduct] = useState<PromotionProps[]>([]);

  const {
    isLoading,
    data,
    pagination,
    setData,
    // setSearch,
    setQuery,
    changePage,
    changeLimit,
  } = useFetchList<ProductStockProps>({
    endpoint: '/product-stocks',
    initialQuery: {
      productIds: productId,
    },
  });

  React.useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoadingData(true);

        const res = await httpRequest.get<ResponseProps>(
          '/products/' + productId
        );
        if (res && res.data && res.data.payload) {
          setProduct(res.data.payload);
          console.log(res.data.payload);
        }

        // if (res.data.payload.currentProductPrice) {
        //   setProductPrice(res.data.payload.currentProductPrice);
        // }

        // if (res.data.payload.prices.length > 0) {
        // 	const filterPrice = res.data.payload.prices.filter(
        // 		(price) =>
        // 			price.startAt &&
        // 			price.endAt &&
        // 			new Date(price.startAt) < new Date() &&
        // 			new Date(price.endAt) > new Date()
        // 	);

        // 	filterPrice.length > 0 && setProductPrice(filterPrice[filterPrice.length - 1]);
        // }

        // if (res.data.payload.categories.length > 0) {
        //   const findSubCat = res.data.payload.categories.filter(
        //     (category) => category.parentCategoryId
        //   );
        //   const findCat = res.data.payload.categories.filter(
        //     (category) => !category.parentCategoryId
        //   );

        //   if (findCat.length > 0 && findSubCat.length > 0) {
        //     setProduct({
        //       ...res.data.payload,
        //       subcat: findSubCat[0].categoryName,
        //       category: findCat[0].categoryName,
        //     });
        //   } else if (findCat.length > 0 && findSubCat.length === 0) {
        //     setProduct({
        //       ...res.data.payload,
        //       category: findCat[0].categoryName,
        //     });
        //   }
        // }

        const productVariantsIds = res.data.payload.productVariants?.map((variant) => variant.productVariantId);

        if (productVariantsIds) {
          let allPrices: any[] = [];
          for (const variantId of productVariantsIds) {
            try {
              const response = await httpRequest.get<FetchAllProductPricesScheduleResponse>(
                `/product-prices-schedules/${variantId}`
              );
              if (response.data.payload) {
                allPrices = allPrices.concat(response.data.payload);
              }
            } catch (error) {
              console.error(error);
            }
          }
          setPrice(allPrices);
          console.log(allPrices);
        } else {
          console.log('productVariantsIds is empty');
        }

        const resStock = await httpRequest.get<ResponsePropsStock>(
          '/product-stocks?productIds=' + productId
        );

        setStock(resStock.data.payload.results);

        const locationData = await httpRequest.get<any>(`/locations`);

        setLocations(locationData.data.payload.results);

        const imgList = await httpRequest.get<any>(
          `/product-images/${productId}`
        );
        console.log(imgList);
        setImageUrls(imgList.data.payload.map((item: any) => item.imageUrl));
        // console.log(imgList.data.payload)
        // const dataImages = (res.data.payload.images || []).map((item) => ({
        //   url: item || "",
        //   uid: productId,
        //   name: item || "",
        // }));

        // setImages(dataImages as any[]);

        // if (dataImages.length > 0) {
        //   setSelectedImage(dataImages[0].url);
        // }

        const bcDetails = [
          {
            field: 'productId',
            value: productId,
            label: 'Detail Product',
          },
        ];
        setBreadcrumbDetails(bcDetails);

        setIsLoadingData(false);
        setIsLoadingAction(false);
      } catch (error) {
        setIsLoadingData(false);
      }
    };

    fetchProductDetail();
  }, [productId, isLoadingAction]);
  const [isLoadingPromo, setIsLoadingPromo] = useState(false);
  const [isPromoDiscount, setIsPromoDiscount] = useState(false);

  React.useEffect(() => {
    (async () => {
      setIsLoadingPromo(true);
      try {
        const res = await httpRequest.get<
          BaseResponsePaginationProps<PromotionProps>
        >(`/promotions`);

        let resPromo = res.data.payload.results
          .filter(
            (promo) =>
              promo.items.length === 1 &&
              promo.items.some((p) => p.productId === product.productId)
          )
          .sort((a, b) => a.items[0].quantity - b.items[0].quantity);
        setPromoProduct(resPromo);

        setIsPromoDiscount(
          resPromo.some(
            (promo) =>
              promo?.items?.length === 1 && promo?.items[0]?.quantity === 1
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingPromo(false);
      }
    })();
  }, [product.productId]);

  React.useEffect(() => {

    Object.keys(product.specifications.specifications).map((key: any) => { 

      console.log(key)
    })
  })

  const setSearch = async (search: string) => {
    setIsLoadingData(true);

    const searchLocation = locations
      .filter((item) => item.storeName.toLowerCase().indexOf(search) >= 0)
      .map((item) => item.storeId);

    const result = data.filter((item) =>
      searchLocation.includes(item.storeId)
    );

    setStock(result);
    setIsLoadingData(false);
  };

  const createStock = async () => {
    try {
      const filter = ({
        storeId,
        currentStock,
        baseUnitOfMeasure,
        description,
      }: any) => ({
        storeId,
        currentStock,
        baseUnitOfMeasure,
        description,
      });

      const fields = filter({ ...stockTmpData });

      const errorMessage = [];

      for (const [key, value] of Object.entries(fields)) {
        if (!value) errorMessage.push(key + ' must not be empty');
      }

      if (errorMessage.length !== 0) message.error(errorMessage[0]);

      if (errorMessage.length === 0) {
        const storeCode = locations.find((item) => {
          if (item.storeId === stockTmpData.storeId) {
            return item.storeCode;
          }
        });

        const formData = {
          bulk: [
            {
              newData: {
                description: stockTmpData.description,
                currentStock: stockTmpData.currentStock,
                baseUnitOfMeasure: stockTmpData.baseUnitOfMeasure,
              },
              condition: {
                productCode: product.productCode,
                storeCode: storeCode?.storeCode,
              },
            },
          ],
        };

        await httpRequest.put('/product-stocks/by-code', formData);

        setStockTmpData(initialProductStock);
        emptyForm();

        message.success(
          `${stockTmpData.productStockId !== ''
            ? 'Success edit stock'
            : 'Success add stock'
          }`
        );
        setIsLoadingAction(true);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const createPrice = async () => {
    try {
      const filter = ({ newUnitPrice, processedAt, scheduleAt }: any) => ({
        newUnitPrice, processedAt, scheduleAt
      });

      const fields = filter({ ...priceTmpData });

      const errorMessage = [];

      for (const [key, value] of Object.entries(fields)) {
        if (!value) errorMessage.push(key + ' must not be empty');
      }

      if (errorMessage.length !== 0) message.error(errorMessage[0]);

      if (errorMessage.length === 0) {
        const formData = {
          productId: productId,
          productVariantId: priceTmpData.productVariantId,
          newUnitPrice: priceTmpData.newUnitPrice,
          status: '',
          processedAt: priceTmpData.processedAt,
          scheduleAt: priceTmpData.scheduleAt
        };

        try {
          await httpRequest.patch(`/product-prices-schedules/${priceTmpData.productVariantId}`, formData);
          setPriceTmpData(initialProductPricesSchedule);
          emptyForm();
          message.success('Success edit price schedule');
          setIsLoadingAction(true);
          setIsModalVisible(false);
        } catch (patchError) {
          await httpRequest.post(`/product-prices-schedules/${priceTmpData.productVariantId}`, formData);
          setPriceTmpData(initialProductPricesSchedule);
          emptyForm();
          message.success('Success add price schedule');
          setIsLoadingAction(true);
          setIsModalVisible(false);
        }
      }
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const removePrice = async (productVariantId: string) => {
    try {
      await httpRequest.delete(`/product-prices-schedules/${productVariantId}`);
      message.success('Success delete price schedule');
      setIsLoadingAction(true);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  }

  const createVariant = async () => {
    try {
      const filter = ({ productVariantCode, productVariantName, price, unitOfMeasureCode }: any) => ({
        productVariantCode, productVariantName, price, unitOfMeasureCode
      });

      const fields = filter({ ...variantTmpData });

      const errorMessage = [];

      for (const [key, value] of Object.entries(fields)) {
        if (!value) errorMessage.push(key + ' must not be empty');
      }

      if (errorMessage.length !== 0) message.error(errorMessage[0]);

      if (errorMessage.length === 0) {
        const formData = {
          productId: productId,
          productVariantCode: variantTmpData.productVariantCode,
          productVariantName: variantTmpData.productVariantName,
          price: variantTmpData.price,
          discount: variantTmpData.discount,
          unitOfMeasureCode: variantTmpData.unitOfMeasureCode.toLowerCase(),
          isPublished: variantTmpData.isPublished,
          description: variantTmpData.description
        };

        await httpRequest.post('/product-variants/' + productId, formData);

        setVariantTmpData(initialProductVariant);
        emptyForm();
        message.success('Success add variant');
        setIsLoadingAction(true);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  }

  const updateVariant = async () => {
    try {
      const filter = ({ productVariantCode, productVariantName, price, unitOfMeasureCode }: any) => ({
        productVariantCode, productVariantName, price, unitOfMeasureCode
      });

      const fields = filter({ ...variantTmpData });

      const errorMessage = [];

      for (const [key, value] of Object.entries(fields)) {
        if (!value) errorMessage.push(key + ' must not be empty');
      }

      if (errorMessage.length !== 0) message.error(errorMessage[0]);

      if (errorMessage.length === 0) {
        const formData = {
          productId: productId,
          productVariantCode: variantTmpData.productVariantCode,
          productVariantName: variantTmpData.productVariantName,
          price: variantTmpData.price,
          discount: variantTmpData.discount,
          unitOfMeasureCode: variantTmpData.unitOfMeasureCode.toLowerCase(),
          isPublished: variantTmpData.isPublished,
          description: variantTmpData.description,
        };

        await httpRequest.patch(`/product-variants/${productId}/${variantTmpData.productVariantId}`, formData);

        setVariantTmpData(initialProductVariant);
        emptyForm();
        message.success('Success edit variant');
        setIsLoadingAction(true);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  }

  const removeVariant = async (productVariantId: string) => {
    try {
      await httpRequest.delete(`/product-variants/${productId}/${productVariantId}`);
      message.success('Success delete variant');
      setIsLoadingAction(true);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  }

  const uploadProductImages = async () => {
    try {
      const formUpload = new FormData();
      if (images) {
        console.log(images);
        images.forEach((image) => formUpload.append('images', image));
      }

      await httpRequest.post(
        `/product-images/upload/${productId}`,
        formUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      message.success('Success upload images.');
      setIsModalVisible(false);
      setIsLoadingAction(true);
      setImages([]);
    } catch (error) {
      setIsLoadingAction(false);
      message.error('images cannot be empty.');
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoadingDeleteImage(true);
      setImages(
        images.filter((item, index) => {
          setUploadImageUrls(
            uploadImageUrls.filter((item) => item !== uploadImageUrls[index])
          );
          return item !== willBeDeletedImage;
        })
      );
      setIsLoadingDeleteImage(false);
      setWillBeDeletedImage(undefined);
    } catch (err) {
      message.error(getErrorMessage(err));
      setIsLoadingDeleteImage(false);
    }
  };

  const onStartDateChange = (value: DatePickerProps['value']) => {
    if (value) {
      setPriceTmpData({
        ...priceTmpData,
        processedAt: value.toDate(),
      });
    }
    // console.log("onOk: ", moment(value).toDate());
  };

  const onEndDateChange = (value: DatePickerProps['value']) => {
    if (value) {
      setPriceTmpData({
        ...priceTmpData,
        scheduleAt: value.toDate(),
      });
    }
    // console.log("onEndOk: ", moment(value).toDate());
  };

  const showModalBack = () => {
    setIsModalBackOpen(true);
  };

  const handleOkModalBack = () => {
    isModalVisible ? setIsModalVisible(false) : navigate(-1);
    setIsModalBackOpen(false);
    emptyForm();
    setImages([]);
    setUploadImageUrls([]);
    setSelectedImage('');
  };

  const emptyForm = () => {
    form.setFieldsValue({
      description: '',
      storeId: '',
      currentStock: '',
      baseUnitOfMeasure: '',
      productCode: '',
      startAt: '',
      endAt: '',
      unitPrice: '',
      minQty: '',
      unitOfMeasureCode: '',
    });
  };

  const handleCancelModalBack = () => {
    setIsModalBackOpen(false);
  };

  const onLocationChange = (value: string) => {
    setStockTmpData({
      ...stockTmpData,
      storeId: value,
    });
  };

  const stockColumns = [
    {
      title: 'LOCATION NAME',
      key: 'storeId',
      dataIndex: 'storeId',
      width: 600,
      render: (text: string, record: ProductStockProps) => {
        return (
          <Text>
            {record?.storeId
              ? locations.find((item) => item.storeId === record?.storeId)
                ?.storeName
              : record?.storeId}
          </Text>
        );
      },
    },
    {
      title: 'STOCK',
      dataIndex: 'currentStock',
      key: 'currentStock',
      width: 200,
      render: (text: string, record: ProductStockProps) => {
        return <Text>{record?.currentStock}</Text>;
      },
    },
    {
      title: 'UNIT',
      dataIndex: 'baseUnitOfMeasure',
      key: 'baseUnitOfMeasure',
      width: 200,
      render: (text: string, record: ProductStockProps) => {
        return <Text>{record?.baseUnitOfMeasure}</Text>;
      },
    },
    {
      title: 'UPDATED AT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: any) => <div>{formatYearToTime(updatedAt)}</div>,
    },
    // {
    //     title: '',
    //     key: 'action',
    //     render: (_: any, record: ProductStockProps) => (
    //   <>
    //   <Button icon={<EditOutlined />} style={{marginRight: '10px'}} type="primary"
    //             onClick={() => {
    //                 setModalType('stock')
    //                 setStockTmpData(record)
    //                 form.setFieldsValue({
    //                     ...record,
    //                 })
    //                 setIsModalVisible(true)
    //             }}>
    //             </Button>
    //       </>
    //     ),
    // },
  ];

  const variantColumns = [
    {
      title: 'Variant Code',
      key: 'productVariantCode',
      dataIndex: 'productVariantCode',
      render: (text: string, record: ProductVariantProps) => {
        return (
          <Text
            className="table-link"
            onClick={() => {
              setModalType('variant')
              setVariantTmpData(record)
              form.setFieldsValue({
                ...record,
              })
              setIsModalVisible(true)
            }}
          >
            {record?.productVariantCode}
          </Text>
        );
      },
    },
    {
      title: 'Variant Name',
      key: 'productVariantName',
      dataIndex: 'productVariantName',
      render: (text: string, record: ProductVariantProps) => {
        return (
          <Text>
            {record?.productVariantName}
          </Text>
        );
      },
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (text: string, record: ProductVariantProps) => {
        return (
          <Text>
            {record?.price}
          </Text>
        );
      },
    },
    {
      title: 'Discount',
      key: 'discount',
      dataIndex: 'discount',
      render: (text: string, record: ProductVariantProps) => {
        return (
          <Text>
            {record?.discount}
          </Text>
        );
      },
    },
    {
      title: 'Unit of Measure Code',
      key: 'unitOfMeasureCode',
      dataIndex: 'unitOfMeasureCode',
      render: (text: string, record: ProductVariantProps) => {
        return (
          <Text>
            {record?.unitOfMeasureCode}
          </Text>
        );
      },
    },
    // {
    //   title: '',
    //   key: 'action',
    //   render: (_: any, record: ProductVariantProps) => (
    //     <>
    //       <Button icon={<EditOutlined />} type="primary"
    //         onClick={() => {
    //           setModalType('variant')
    //           setVariantTmpData(record)
    //           form.setFieldsValue({
    //             ...record,
    //           })
    //           setIsModalVisible(true)
    //         }}>
    //       </Button>
    //     </>
    //   ),
    // },
    {
      title: '',
      key: 'deleteAction',
      render: (_: any, record: ProductVariantProps) => (
        <>
          <Button icon={<DeleteOutlined />} style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => {
              removeVariant(record?.productVariantId)
            }}>
          </Button>
        </>
      ),
    },
  ];

  const priceColumns = [
    {
      title: 'Variant ID',
      key: 'productVariantId',
      dataIndex: 'productVariantId',
      render: (text: string, record: ProductPricesScheduleProps) => {
        return (
          <Text
            className="table-link"
            onClick={() => {
              setModalType('price')
              setPriceTmpData(record)
              form.setFieldsValue({
                ...record,
              })
              setIsModalVisible(true)
            }}
          >
            {record?.productVariantId}
          </Text>
        );
      },
    },
    {
      title: 'New Unit Price',
      key: 'newUnitPrice',
      dataIndex: 'newUnitPrice',
      render: (text: string, record: ProductPricesScheduleProps) => {
        return (
          <Text>
            {record?.newUnitPrice}
          </Text>
        );
      },
    },
    {
      title: 'Price Period',
      dataIndex: 'startAt',
      key: 'startAt',
      render: (startAt: any, record: ProductPricesScheduleProps) => (
        <div>
          {(() => {
            if (record?.processedAt && record?.scheduleAt) {
              if (
                new Date(record?.processedAt) < new Date() &&
                new Date(record?.scheduleAt) > new Date()
              ) {
                return (
                  <>
                    <p>
                      {formatDate(record?.processedAt)} -{' '}
                      {formatDate(record?.scheduleAt)}
                      <Tag
                        style={{
                          border: '2px solid #31d63a',
                          color: '#31d63a',
                          marginLeft: 5,
                        }}
                      >
                        Active
                      </Tag>
                    </p>
                  </>
                );
              } else if (
                new Date(record?.processedAt) < new Date() &&
                new Date(record?.scheduleAt) < new Date()
              ) {
                return (
                  <>
                    <p>
                      {formatDate(record?.processedAt)} -{' '}
                      {formatDate(record?.scheduleAt)}
                      <Tag
                        style={{
                          border: '2px solid red',
                          color: 'red',
                          marginLeft: 5,
                        }}
                      >
                        Outdated
                      </Tag>
                    </p>
                  </>
                );
              } else if (
                new Date(record?.processedAt) > new Date() &&
                new Date(record?.scheduleAt) > new Date()
              ) {
                return (
                  <>
                    <p>
                      {formatDate(record?.processedAt)} -{' '}
                      {formatDate(record?.scheduleAt)}
                      <Tag
                        style={{
                          border: '2px solid brown',
                          color: 'brown',
                          marginLeft: 5,
                        }}
                      >
                        Scheduled
                      </Tag>
                    </p>
                  </>
                );
              } else {
                return (
                  <p>
                    {formatDate(record?.processedAt)} - {formatDate(record?.scheduleAt)}
                  </p>
                );
              }
            } else {
              return <></>;
            }
          })()}
        </div>
      ),
    },
    {
      title: '',
      key: 'deleteAction',
      render: (_: any, record: ProductPricesScheduleProps) => (
        <>
          <Button icon={<DeleteOutlined />} style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => {
              removePrice(record?.productVariantId || '')
            }}>
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={product?.productName
          .split(' ')
          .map((value) => capitalizeFirstLetter(value))
          .join(' ')}
        // subtitle="Manage your product data"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              type="primary"
              onClick={() => navigate('/products/' + productId + '/edit')}
            >
              Edit
            </Button>
          </Space>
        }
      />
      <Row
        style={{
          borderBottom: '2px solid #768499',
          marginLeft: '-20px',
          marginRight: '-20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          marginBottom: 20,
        }}
      >
        <Col
          span={6}
          style={
            {
              // borderBottom: '2px solid #768499',
            }
          }
        >
          <button
            onClick={() => {
              setFormType('product');
            }}
            style={{
              padding: '15px 6px',
              width: '100%',
              fontWeight: 700,
              background: 'transparent',
              color: formType === 'product' ? '#9E2A2B' : 'black',
              borderRadius: 0,
              zIndex: 2,
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderBottom:
                formType === 'product' ? '3px solid #9E2A2B' : 'none',
              marginBottom: '-1px',
            }}
          >
            Product Information
          </button>
        </Col>
        <Col
          span={6}
        >
          <button
            onClick={() => {
              setFormType('variant');
            }}
            style={{
              padding: '15px 6px',
              width: '100%',
              fontWeight: 700,
              background: 'transparent',
              color: formType === 'variant' ? '#9E2A2B' : 'black',
              borderRadius: 0,
              zIndex: 2,
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderBottom:
                formType === 'variant' ? '3px solid #9E2A2B' : 'none',
              marginBottom: '-1px',
            }}
          >
            Variant
          </button>
        </Col>
        <Col span={6}>
          <button
            onClick={() => {
              setFormType('stock');
            }}
            style={{
              padding: '15px 6px',
              fontWeight: 700,
              width: '100%',
              background: 'transparent',
              color: formType === 'stock' ? '#9E2A2B' : 'black',
              borderRadius: 0,
              zIndex: 2,
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderBottom: formType === 'stock' ? '3px solid #9E2A2B' : 'none',
              marginBottom: '-1px',
            }}
          >
            Stock
          </button>
        </Col>
        <Col span={6}>
          <button
            onClick={() => {
              setFormType('price');
            }}
            style={{
              padding: '15px 6px',
              fontWeight: 700,
              width: '100%',
              background: 'transparent',
              color: formType === 'price' ? '#9E2A2B' : 'black',
              borderRadius: 0,
              zIndex: 2,
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderBottom: formType === 'price' ? '3px solid #9E2A2B' : 'none',
              marginBottom: '-1px',
            }}
          >
            Price
          </button>
        </Col>
      </Row>

      <div
        style={{
          display: formType === 'product' ? undefined : 'none',
        }}
      >
        <Row>
          <Col span={5}>
            <Title level={5}>Product Information</Title>
            <Text style={{ color: '#768499' }}>
              These are product details, you can't change here
            </Text>
          </Col>
          <Col offset={1} span={16}>
            <Title
              level={5}
              style={{
                color: '#768499',
                marginBottom: 2,
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Images
            </Title>
            {imageUrls?.length > 0 ? (
              <Row gutter={[16, 16]}>
                {imageUrls.map((item) => {
                  return (
                    <Col>
                      <Image
                        preview={true}
                        width={100}
                        height={100}
                        src={item || '/images/select-image.jpg'}
                        fallback={'/images/blur-image.jpeg'}
                        style={{
                          objectFit: 'cover',
                          border: 'solid 1px red',
                          boxShadow: '2px 2px #888888',
                        }}
                        placeholder={
                          <Image
                            preview={false}
                            src="/images/blur-image.jpeg"
                            width={100}
                            height={100}
                            style={{ objectFit: 'cover' }}
                          />
                        }
                      />
                    </Col>
                  );
                })}
                {/* <div style={{
                    background: '#00133B',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100, 
                    width: 100}}
                    
                    onClick={() => {
                      setIsModalVisible(true)
                      setModalType('image')
                    }}>
                    Add Image
                    <PlusOutlined />
                  </div> */}
              </Row>
            ) : (
              false
            )}
            <Row style={{ margin: '1rem 0' }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    marginTop: 30,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Product CODE
                </Title>
                <Text>{product?.productCode}</Text>
              </Col>
            </Row>

            <Row style={{ margin: '1rem 0' }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Product Name
                </Title>
                <Text>{product?.productName}</Text>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Product Type
                </Title>
                <Text>{product?.productType}</Text>
              </Col>
            </Row>

            {/* <Row style={{ marginTop: 20 }}>
              <Col span={12}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Price
                </Title>

                {isLoadingPromo && <Spin spinning />}
                {!isLoadingPromo && (
                  <>
                    <Text
                      className="block"
                      style={{
                        textDecoration: isPromoDiscount
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {productPrice && productPrice?.unitPrice
                        ? `IDR ${productPrice?.unitPrice?.toLocaleString(
                            'id-ID'
                          )}`
                        : ''}
                    </Text>
                    {promoProduct.length > 0 &&
                      promoProduct.map((promo) => (
                        <Text className="block" style={{ marginBottom: 2 }}>
                          IDR {formatPrice(promo?.finalPrice! || 0)}
                        </Text>
                      ))}
                  </>
                )}
              </Col>
            </Row> */}
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col span={5}>
            <Title level={5}>Product Details</Title>
            <Text style={{ color: '#768499' }}>
              These are product details, you can't change here
            </Text>
          </Col>
          <Col offset={1} span={16}>
            <Row>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Length In CM
                </Title>
                <Text>{product?.dimensions?.dimensions?.lengthInCm}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Width In CM
                </Title>
                <Text>{product?.dimensions?.dimensions?.widthInCm}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Height In CM
                </Title>
                <Text>{product?.dimensions?.dimensions?.heightInCm}</Text>
              </Col>
            </Row>
            <Row style={{ margin: '1rem 0' }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Category
                </Title>
                <Text>{product.productCategories && product.productCategories[0].categories.categoryName}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Gross Weight

                </Title>
                <Text>{product?.grossWeightInKG}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Net Weight
                </Title>
                <Text>{product?.netWeightInKG}</Text>
              </Col>
            </Row>
            <Row style={{ margin: '1rem 0' }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Description
                </Title>
                <Text>{product?.description}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Status
                </Title>
                <Text>
                  {product?.isPublished ?
                    <Tag
                      style={{
                        border: "2px solid #31d63a",
                        color: "#31d63a",
                      }}>
                      Active
                    </Tag>
                    :
                    <Tag
                      style={{
                        border: "2px solid #D81F64",
                        color: "#D81F64",
                        marginBottom: "7%",
                      }}
                    >
                      Inactive
                    </Tag>}
                </Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Highlight
                </Title>
                <Text>
                  {product?.isHighlight ?
                    <Tag
                      style={{
                        border: "2px solid #31d63a",
                        color: "#31d63a",
                      }}>
                      Yes
                    </Tag>
                    :
                    <Tag
                      style={{
                        border: "2px solid #D81F64",
                        color: "#D81F64",
                        marginBottom: "7%",
                      }}
                    >
                      No
                    </Tag>}
                </Text>
              </Col>
            </Row>
          </Col>
          {/* <Col offset={1} span={16}>
            <Row>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Length
                </Title>
                <Text>{product?.country ? `${product?.country}CM` : ''}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Width
                </Title>
                <Text>{product?.abv ? `${product?.abv}CM` : ''}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Depth
                </Title>
                <Text>{product?.sizeInML ? `${product?.sizeInML}CM` : ''}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Category
                </Title>
                <Text>
                  {product?.category
                    ? product?.category.includes('-')
                      ? replaceDashWithSpace(product?.category)
                      : product?.category.charAt(0).toUpperCase() +
                        product?.category.toLowerCase().slice(1)
                    : ''}
                </Text>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Gross Weight
                </Title>
                <Text>
                  {product?.grossWeight ? `${product?.grossWeight} kg` : ''}
                </Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Net Weight
                </Title>
                <Text>
                  {product?.netWeight ? `${product?.netWeight} kg` : ''}
                </Text>
              </Col>
            </Row>

            <Title
              level={5}
              style={{
                color: '#768499',
                marginTop: 20,
                marginBottom: 2,
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Description
            </Title>
            <Text>
              {product?.description ? (
                <HTMLPreview html={product?.description} />
              ) : (
                ''
              )}
            </Text>

            <Title
              level={5}
              style={{
                color: '#768499',
                marginBottom: 2,
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Status
            </Title>
            <Text>{product?.isPublished ? 'Active' : 'Inactive'}</Text>

            <Row style={{ marginTop: 20 }}>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Created At
                </Title>
                <Text>{formatYearToTime(product?.createdAt)}</Text>
              </Col>
              <Col span={7}>
                <Title
                  level={5}
                  style={{
                    color: '#768499',
                    marginBottom: 2,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Updated At
                </Title>
                <Text>{formatYearToTime(product?.updatedAt)}</Text>
              </Col>
            </Row>
          </Col> */}
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col span={5}>
            <Title level={5}>Spesifications</Title>
            <Text style={{ color: '#768499' }}>
              This is spesifications of product, you can't change here
            </Text>
          </Col>
          <Col
            offset={1}
            span={16}>
            <Row>
              <Col span={24}>
                <Row
                  style={{
                    background: '#F4F6F9',
                    borderBottom: '2px solid #C5CDDB',
                    padding: '10px 12px',
                    marginBottom: 10,
                  }}>
                  <Col span={10}>
                    <Title
                      level={5}
                      style={{
                        color: '#1E1E1E',
                        marginBottom: 2,
                        fontSize: 14,
                      }}>
                      LABEL
                    </Title>
                  </Col>
                  <Col span={10}>
                    <Title
                      level={5}
                      style={{
                        color: '#1E1E1E',
                        marginBottom: 2,
                        fontSize: 14,
                      }}>
                      VALUE
                    </Title>
                  </Col>
                </Row>
                {
                  Object.keys(product.specifications.specifications).map((key: any) => (
                    <Row key={key} style={{marginBottom: 10}}>
                      <Col span={9}>
                        <Text>
                          {product.productCategories && product.productCategories[0].categories.categoryName}
                        </Text>
                      </Col>
                      <Col span={10} offset={1}>
                        <Text>{product.specifications.specifications[key].value}</Text>
                      </Col>
                    </Row>
                  ))
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div
        style={{
          // minHeight: '100vh',
          display: formType === 'stock' ? undefined : 'none',
        }}
      >
        <Row>
          <Col span={24}>
            <ContainerFilter>
              <Input
                // size="large"
                placeholder="Search by location Name"
                prefix={<SearchOutlined />}
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />
            </ContainerFilter>
            <Table
              rowKey="productStockId"
              loading={isLoadingData}
              columns={stockColumns}
              dataSource={stock}
              pagination={false}
            />
          </Col>
        </Row>
      </div>

      <div
        style={{
          // minHeight: '100vh',
          display: formType === 'variant' ? undefined : 'none',
        }}
      >
        <Row>
          <Col span={24}>
            <ContainerFilter>
              <Input
                // size="large"
                placeholder="Search by location Name"
                prefix={<SearchOutlined />}
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />
            </ContainerFilter>
            <Table
              rowKey="productVariantId"
              loading={isLoadingData}
              columns={variantColumns}
              dataSource={product.productVariants}
              pagination={false}
            />
            <Button
              onClick={() => {
                setVariantTmpData(initialProductVariant)
                form.setFieldsValue({
                  ...initialProductVariant,
                })
                setModalType('addVariant')
                setIsModalVisible(true)
              }} type='primary'>
              Add Variant
            </Button>
          </Col>
        </Row>
      </div>

      <div
        style={{
          // minHeight: '100vh',
          display: formType === 'price' ? undefined : 'none',
        }}
      >
        <Row>
          <Col span={24}>
            <ContainerFilter>
              <Input
                // size="large"
                placeholder="Search by location Name"
                prefix={<SearchOutlined />}
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />
            </ContainerFilter>
            <Table
              rowKey="productPriceId"
              loading={isLoadingData}
              columns={priceColumns}
              dataSource={price}
              pagination={false}
            />
            <Button
              onClick={() => {
                setPriceTmpData(initialProductPricesSchedule)
                form.setFieldsValue({
                  ...initialProductPricesSchedule,
                })
                setModalType('price')
                setIsModalVisible(true)
              }} type='primary'>
              Add Price Schedule
            </Button>
          </Col>
        </Row>
      </div>

      {/* <Space
          style={{
            width: "100%",
            background: "grey",
            justifyContent: "center",
          }}
        >
          <Image
            preview={false}
            width="100%"
            height={200}
            src={selectedImage.url || "/images/select-image.jpg"}
            fallback={"/images/blur-image.jpeg"}
            style={{ objectFit: "cover" }}
            placeholder={
              <Image
                preview={false}
                src="/images/blur-image.jpeg"
                width="100%"
                height={200}
                style={{ objectFit: "cover" }}
              />
            }
          />
        </Space> */}
      {/* <Space direction="horizontal">
          {images.map((img) => (
            <div
              style={
                selectedImage.uid === img.uid
                  ? {
                      border: 5,
                      borderStyle: "solid",
                      borderColor: "#FF4A50",
                      position: "relative",
                    }
                  : { position: "relative" }
              }
            >
              <Image
                onClick={() => {
                  setSelectedImage(img);
                }}
                preview={false}
                width={100}
                height={100}
                src={img.url || img.thumbUrl || "/images/select-image.jpg"}
                fallback={"/images/blur-image.jpeg"}
                style={{ objectFit: "cover" }}
                placeholder={
                  <Image
                    preview={false}
                    src="/images/blur-image.jpeg"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                }
              />
              <div
                onClick={() => {}}
                style={{
                  cursor: "pointer",
                  backgroundColor: "grey",
                  position: "absolute",
                  top: 5,
                  right: 5,
                  paddingRight: 5,
                  paddingLeft: 5,
                  zIndex: 100,
                }}
              >
                <CloseOutlined width={20} height={20} color="#FFFFFF" />
              </div>
            </div>
          ))}
        </Space> */}
      {/* <Col flex="auto" style={{textAlign: 'right'}}>
								<Button icon={<PlusOutlined />} 
                                style={{marginRight: '10px'}}
                                type="primary" 
                                onClick={() => {
                                    setModalType('stock')
                                    setIsModalVisible(true)
                                    setStockTmpData(initialProductStock)
                                }}>
									Add Stock
								</Button>
						</Col> */}
      {/* <Card bordered={false} size="small" style={{paddingTop: 20}}>
        <Row gutter={2}>
          <Col>
            <Title level={4}>Price</Title>
          </Col> */}
      {/* <Col flex="auto" style={{textAlign: 'right'}}>
								<Button icon={<PlusOutlined />} 
                                style={{marginRight: '10px'}}
                                type="primary" 
                                onClick={() => {
                                    setModalType('price')
                                    setIsModalVisible(true)
                                    setPriceTmpData(initialProductPrice)
                                }}>
									Add Price
								</Button>
						</Col> */}
      {/* </Row> */}

      {/* <Table
        rowKey="productPriceId"
        loading={isLoading}
        columns={priceColumns}
        dataSource={price}
        pagination={false}
        />
      </Card> */}
      {(() => {
        if (modalType === 'stock') {
          return (
            <Modal
              width={1000}
              style={{ top: 10 }}
              open={isModalVisible}
              onOk={() => {
                createStock();
              }}
              onCancel={() => {
                showModalBack();
              }}
              okText="Save"
              okButtonProps={{ type: 'primary' }}
            >
              <Title level={3}>
                {(stockTmpData.productStockId !== '' ? 'Edit ' : 'Add ') +
                  modalType}
              </Title>
              <Form
                form={form}
                name="stockForm"
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  label="Location"
                  name="storeId"
                  key="storeId"
                  rules={generateFormRules('Location', ['required'])}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Location"
                    optionFilterProp="children"
                    onChange={onLocationChange}
                  // onSearch={onSearch}
                  >
                    {locations.map((item) => {
                      return (
                        <Option value={item.storeId}>
                          {item.storeName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Product Variant"
                  name="productVariantId"
                  key="productVariantId"
                // rules={generateFormRules('Location', ['required'])}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Variant"
                    optionFilterProp="children"
                    onChange={onLocationChange}
                  // onSearch={onSearch}
                  >
                    {locations.map((item) => {
                      return (
                        <Option value={item.storeId}>
                          {item.storeName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Stock"
                  name="initialStock"
                  key="initialStock"
                // rules={generateFormRules('currentStock', [
                //   'required',
                //   'numeric',
                // ])}
                >
                  <Input
                    onChange={(event) =>
                      setStockTmpData({
                        ...stockTmpData,
                        initialStock: parseInt(event.target.value),
                      })
                    }
                    placeholder="Input Stock"
                  />
                </Form.Item>

                <Form.Item
                  label="Base Unit Of Measure"
                  name="baseUnitOfMeasure"
                  key="baseUnitOfMeasure"
                  rules={generateFormRules('baseUnitOfMeasure', ['required'])}
                >
                  <Input
                    onChange={(event) =>
                      setStockTmpData({
                        ...stockTmpData,
                        baseUnitOfMeasure: event.target.value,
                      })
                    }
                    placeholder="PCS"
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  key="description"
                  rules={generateFormRules('description', ['required'])}
                >
                  <Input
                    onChange={(event) =>
                      setStockTmpData({
                        ...stockTmpData,
                        description: event.target.value,
                      })
                    }
                    placeholder="description"
                  />
                </Form.Item>
              </Form>
            </Modal>
          );
        } else if (modalType === 'price') {
          return (
            <Modal
              width={1000}
              style={{ top: 10 }}
              open={isModalVisible}
              onOk={() => {
                createPrice();
              }}
              onCancel={() => {
                showModalBack();
              }}
              okText="Save"
              okButtonProps={{ type: 'primary' }}
            >
              <Title level={3}>
                {(priceTmpData.productVariantId !== '' ? 'Edit ' : 'Add ') +
                  modalType}
              </Title>
              <Form
                form={form}
                name="priceForm"
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  label="Variant Name"
                  name="productVariantId"
                  key="productVariantId"
                  rules={generateFormRules('productVariantId', [
                    'required',
                  ])}
                >
                  <Select
                    onChange={(value) =>
                      setPriceTmpData({
                        ...priceTmpData,
                        productVariantId: value,
                      })
                    }
                  >
                    {product.productVariants?.map((variant) => (
                      <Select.Option key={variant.productVariantName} value={variant.productVariantId}>
                        {variant.productVariantName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="New Unit Price"
                  name="newUnitPrice"
                  key="newUnitPrice"
                  rules={generateFormRules('newUnitPrice', [
                    'required',
                    'numeric',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setPriceTmpData({
                        ...priceTmpData,
                        newUnitPrice: parseInt(event.target.value),
                      })
                    }
                  />
                </Form.Item>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <h4>Start At</h4>
                    <DatePicker
                      showTime
                      onChange={onStartDateChange}
                      // defaultValue={moment(priceTmpData.startAt)}
                      showToday={true}
                      style={{
                        maxWidth: '50%',
                        minWidth: '30%',
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <h4>End At</h4>
                    <DatePicker
                      showTime
                      onChange={onEndDateChange}
                      // defaultValue={moment(priceTmpData.endAt)}
                      showToday={true}
                      style={{
                        maxWidth: '50%',
                        minWidth: '30%',
                      }}
                    />
                  </Col>
                </Row>
              </Form>
            </Modal>
          );
        } else if (modalType === 'variant') {
          return (
            <Modal
              width={1000}
              style={{ top: 10 }}
              open={isModalVisible}
              onOk={() => {
                updateVariant();
              }}
              onCancel={() => {
                showModalBack();
              }}
              okText="Save"
              okButtonProps={{ type: 'primary' }}
            >
              <Title level={3}>
                {(variantTmpData.productVariantId !== '' ? 'Edit ' : 'Add ') +
                  modalType}
              </Title>
              <Form
                form={form}
                name="variantForm"
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  label="Variant Code"
                  name="productVariantCode"
                  key="productVariantCode"
                  rules={generateFormRules('productVariantCode', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        productVariantCode: event.target.value,
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Variant Name"
                  name="productVariantName"
                  key="productVariantName"
                  rules={generateFormRules('productVariantName', ['required'])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        productVariantName: event.target.value,
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Price"
                  name="price"
                  key="price"
                  rules={generateFormRules('price', ['required', 'numeric'])}
                >
                  <Input
                    type="number"
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        price: parseInt(event.target.value),
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Discount"
                  name="discount"
                  key="discount"
                  rules={generateFormRules('discount', ['numeric'])}
                >
                  <Input
                    type="number"
                    max={100}
                    value={0}
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        discount: parseInt(event.target.value),
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Base Unit Of Measure"
                  name="unitOfMeasureCode"
                  key="unitOfMeasureCode"
                  rules={generateFormRules('Base Unit Of Measure', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        unitOfMeasureCode: event.target.value,
                      })
                    }
                    placeholder="pcs"
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  key="description"
                  rules={generateFormRules('Description', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        description: event.target.value,
                      })
                    }
                  />
                </Form.Item>

              </Form>
            </Modal>
          );
        } else if (modalType === 'addVariant') {
          return (
            <Modal
              width={1000}
              style={{ top: 10 }}
              open={isModalVisible}
              onOk={() => {
                createVariant();
              }}
              onCancel={() => {
                showModalBack();
              }}
              okText="Save"
              okButtonProps={{ type: 'primary' }}
            >
              <Title level={3}>
                {(variantTmpData.productVariantId !== '' ? 'Edit ' : 'Add ') +
                  modalType}
              </Title>
              <Form
                form={form}
                name="variantForm"
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  label="Variant Code"
                  name="productVariantCode"
                  key="productVariantCode"
                  rules={generateFormRules('productVariantCode', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        productVariantCode: event.target.value,
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Variant Name"
                  name="productVariantName"
                  key="productVariantName"
                  rules={generateFormRules('productVariantName', ['required'])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        productVariantName: event.target.value,
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Price"
                  name="price"
                  key="price"
                  rules={generateFormRules('price', ['required', 'numeric'])}
                >
                  <Input
                    type="number"
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        price: parseInt(event.target.value),
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Discount"
                  name="discount"
                  key="discount"
                  rules={generateFormRules('discount', ['numeric'])}
                >
                  <Input
                    type="number"
                    max={100}
                    value={0}
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        discount: parseInt(event.target.value),
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Base Unit Of Measure"
                  name="unitOfMeasureCode"
                  key="unitOfMeasureCode"
                  rules={generateFormRules('Base Unit Of Measure', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        unitOfMeasureCode: event.target.value,
                      })
                    }
                    placeholder="pcs"
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  key="description"
                  rules={generateFormRules('Description', [
                    'required',
                  ])}
                >
                  <Input
                    onChange={(event) =>
                      setVariantTmpData({
                        ...variantTmpData,
                        description: event.target.value,
                      })
                    }
                  />
                </Form.Item>

              </Form>
            </Modal>
          );
        }
      })()}
      <Modal
        title="Cancel Confirmation"
        open={isModalBackOpen}
        onOk={handleOkModalBack}
        onCancel={handleCancelModalBack}
      >
        <p>Are you sure ? Your data won't be save.</p>
      </Modal>

      <Modal
        title="Confirmation"
        visible={!!willBeDeletedImage}
        onOk={handleDeleteImage}
        onCancel={() => {
          setWillBeDeletedImage(undefined);
        }}
        okText="Yes"
        confirmLoading={isLoadingDeleteImage}
        okButtonProps={{ type: 'primary' }}
      >
        <p>Are you sure want to delete this image?</p>
      </Modal>
    </React.Fragment>
  );
};

export default ProductDetail;

function sortCategories(categories: CategoryProps[]) {
  categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  return categories;
}