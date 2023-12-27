import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  message,
  Modal,
  Tooltip,
  Radio,
  Select,
  Space,
  Upload,
  Image,
  Button,
  Card,
  Spin,
  Row,
  Col,
  Typography,
  InputNumber,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { generateQueryString } from '../../helpers/generateQueryString';
import {
  UploadChangeParam,
  UploadFile,
  RcFile,
  UploadProps,
} from 'antd/lib/upload/interface';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../context/AuthContext';
import { getErrorMessage } from '@qbit-tech/libs-react';
import { initialProduct, ProductProps } from '../../types/products.type';
import {
  initialProductPrice,
  ProductPriceProps,
} from '../../types/productPrices.type';
import {
  CategoryProps,
  FetchAllCategoriesResponse,
  initialProductCategories,
} from '../../types/category.type';
import data from '../../types/country.json';
import { formatYearToTime } from '../../helpers/constant';
import { SpesificationProps, predefineSpec } from '../../types/spesification';

interface ILocation {
  productId: string;
}

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const catQuery = {
  published: 'active',
};

const { Option } = Select;

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
];

const { Title, Text } = Typography;

const type = 'DragableUploadList';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface DragableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

const DragableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList,
}: DragableUploadListItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = (
    <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
  );
  return (
    <div
      ref={ref}
      className={`ant-upload-list-item  ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', border: 'none' }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

const ProductEdit: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();
  const { auth, setAuth } = React.useContext(AuthContext);

  const countries = data.countries;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductProps>(initialProduct);
  const [productCategories, setProductCategories] = React.useState<any[]>([]);
  const [productCategory, setProductCategory] = React.useState<any>('');
  const [productSubcategory, setProductSubcategory] = React.useState<any>('');
  const [specifications, setSpecifications] = React.useState<SpesificationProps | any>(predefineSpec);
  const [productPrice, setProductPrice] = React.useState<ProductPriceProps>();
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const [previewOpen2, setPreviewOpen2] = React.useState(false);
  const [previewImage2, setPreviewImage2] = React.useState('');
  const [previewTitle2, setPreviewTitle2] = React.useState('');
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const [previewImageModal, setPreviewImageModal] = React.useState<
    UploadFile[]
  >([]);
  const [isModalUploadImgVisible, setIsModalUploadImgVisible] = useState(false);

  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [categoryId, setCategoryId] = React.useState<any>(''); 
  const [subcategories, setSubcategories] = React.useState<Array<any>>([]);
  const categoryChildren: React.ReactNode[] = [...categories];
  const btnUploadRef = React.useRef<any>(null);
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [selectedImage, setSelectedImage] = React.useState<UploadFile<any>>({
    url: '',
    uid: '',
    name: '',
  });
  const [images, setImages] = React.useState<
    UploadChangeParam<UploadFile<any>>['fileList']
  >([]);
  const [willBeDeletedImage, setWillBeDeletedImage] =
    React.useState<UploadFile<any>>();
  const [isLoadingDeleteImage, setIsLoadingDeleteImage] = React.useState(false);

  const handleCancel = () => setPreviewOpen(false);
  const handleCancel2 = () => setPreviewOpen2(false);

  const moveRow = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [fileList]
  );
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handlePreview2 = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage2(file.url || (file.preview as string));
    setPreviewOpen2(true);
    setPreviewTitle2(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const createProduct = async (
    props: Omit<
      ProductProps,
      'createdAt' | 'updatedAt' | 'productId' | 'statusLoading'
    >
  ) => {
    try {
      setIsLoadingAction(true);

      // const formData = new FormData();

      // if (images) {
      //   // console.log(images);
      //   formData.append("images", images);
      // }

      // const res: any = await httpRequest.post(
      //   '/products',
      //   {
      //     ...props,
      //     categoryIds: product.categories.map((item) => item.categoryId),
      //     images: images ? images : [],
      //     // variants: product.variants
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // );

      // await uploadNewImage(res.data.payload.menuId);

      if(product.productCategoryId){
        const dataToBeSent = {
          ...product,
          specifications: {
            specifications: {
              ...specifications
            }
          },
          createdByUserId: auth.user.userId
        };

        console.log(dataToBeSent)
  
        await httpRequest.post('/products', dataToBeSent);
  
        message.success('Success create ' + product.productName);
        setIsLoadingAction(false);
        navigate('/products');
      } else {
        message.error('Category must be filled in');
        setIsLoadingAction(false);
      }
    } catch (error) {
      setIsLoadingAction(false);
      console.log(error);
      message.error('Failed create product');
    }
  };

  const updateProduct = async (
    props: Omit<ProductProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    console.log(product)
    // try {
    //   setIsLoadingAction(true);
    //   const categoriesData: any = [];

    //   if (!productCategory) {
    //     setIsLoadingAction(false);
    //     return message.error('Category must not be empty');
    //   }

    //   if (productCategory) {
    //     const findCat = categories.filter(
    //       (category) => category.categoryName === productCategory
    //     );

    //     categoriesData.push({
    //       categoryName: findCat[0].categoryName,
    //       adminMetadata: auth.user.name,
    //     });

    //     if (
    //       findCat[0].subCategories &&
    //       findCat[0].subCategories.length > 0 &&
    //       !productSubcategory
    //     ) {
    //       setIsLoadingAction(false);
    //       return message.error('Sub category must not be empty');
    //     } else if (
    //       findCat[0].subCategories &&
    //       findCat[0].subCategories.length > 0 &&
    //       productSubcategory
    //     ) {
    //       const findSubCat = findCat[0].subCategories.filter(
    //         (category: any) => category.categoryName === productSubcategory
    //       );

    //       categoriesData.push({
    //         categoryName: findSubCat[0].categoryName,
    //         adminMetadata: auth.user.name,
    //       });
    //     }
    //   }

    //   const dataToBeSent = {

    //   };
    //   console.log(dataToBeSent)
    //   if (productId) {
    //     await Promise.all([
    //       httpRequest.patch('/products/' + productId, dataToBeSent),
    //       // uploadNewImage(productId),
    //     ]);
    //   }

    //   if (fileList.length > 0) {
    //     const formData = new FormData();
    //     fileList.forEach((image) =>
    //       formData.append('images', image.originFileObj as RcFile)
    //     );
    //     const post = await httpRequest.post(
    //       `/product-images/upload/${productId}`,
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );
    //     let list = fileList
    //       .filter((value: any) => value.hasOwnProperty('imageId'))
    //       .map((value: any, idx: number) => {
    //         return {
    //           ...value,
    //           order: idx + 1,
    //         };
    //       });

    //     if (post) {
    //       const getList = fileList
    //         .map((value: any, idx: number) => {
    //           if (!value.hasOwnProperty('imageId')) {
    //             return {
    //               ...value,
    //               order: idx + 1,
    //             };
    //           }
    //         })
    //         .filter((value: any) => value !== undefined)
    //         .map((value: any, idx: number) => {
    //           return {
    //             ...value,
    //             ...post.data.payload.map(({ order, ...rest }: any) => {
    //               return rest;
    //             })[idx],
    //           };
    //         });
    //       // console.log(getList)
    //       list.push(...getList);
    //     }
    //     await httpRequest.post(
    //       `/product-images/adjust-list/${productId}`,
    //       {
    //         images: list,
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );
    //     // console.log(formData)
    //   }

    //   message.success('Success update ' + props.productName + ' data');
    //   navigate(-1);
    // } catch (error) {
    //   setIsLoadingAction(false);
    // }
  };

  const onCategoryChange = (value: string) => {
    const findCategory = categories.filter(
      (category) => category.categoryName === value
    );
    setProductSubcategory(null);

    if (
      findCategory[0].subCategories &&
      findCategory[0].subCategories.length > 0
    ) {
      setSubcategories(findCategory[0].subCategories);
    } else {
      setProductSubcategory(null);
      setSubcategories([]);
    }
  };

  const [fileListModal, setFileListModal] = React.useState<UploadFile[]>([]);

  const saveImg = () => {
    setFileList([...fileList, fileListModal[0]]);
    setIsModalUploadImgVisible(false);
    setPreviewImg(null);
    setFileListModal([]);
  };

  const uploadNewImage = async (productId: string) => {
    setIsLoadingAction(true);

    const newImages = images.filter((img) => img.originFileObj);
    if (newImages.length > 0) {
      const promises = [];
      for (const img of newImages) {
        let formData = new FormData();
        formData.append('image', img.originFileObj as Blob);

        const promise = httpRequest.put(
          '/products/' + productId + '/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        promises.push(promise);
      }
      await Promise.all(promises);
    }

    setIsLoadingAction(false);
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoadingDeleteImage(true);
      if (willBeDeletedImage && !willBeDeletedImage.originFileObj) {
        const fileId = willBeDeletedImage?.uid;
        await httpRequest.delete('/products/' + productId + '/' + fileId);
      }

      setImages(images.filter((item) => item.uid !== willBeDeletedImage?.uid));

      setIsLoadingDeleteImage(false);
      setWillBeDeletedImage(undefined);
    } catch (err) {
      // message.error(getErrorMessage(err));
      setIsLoadingDeleteImage(false);
    }
  };

  const handleSubmit = async (
    values: Omit<ProductProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    if (productId) {
      updateProduct(values);
    } else {
      createProduct(values);
    }
  };

  // const handleChangeVariant = (value: string, index: number, key: string) => {
  //   if (key === 'productVariantCode') {
  //     product.variants[index].productVariantCode = value
  //   } else if (key === 'variantName') {
  //     product.variants[index].variantName = value
  //   } else if (key === 'isPublished') {
  //     product.variants[index].isPublished = value === 'active' ? true : false
  //   }

  //   setProduct((oldVal) => {
  //     return {
  //       ...oldVal
  //     }
  //   })
  // }

  const handleChangeCategories = (value: any) => {
    const selectedCategories = value.map((selectedCategoryId: string) => {
      const foundCategory = categories.find(
        (cat) => cat.categoryId === selectedCategoryId
      );

      return foundCategory;
    });

    setProduct((oldVal) => {
      return {
        ...oldVal,
        categories: selectedCategories,
      };
    });
  };

  const readFile = (file: UploadFile<any>): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onloadend = function (event) {
          if (event.target && event.target.result) {
            const url =
              event && event.target && event.target.result
                ? (event.target.result as any)
                : undefined;
            resolve(url);
            // setImages(
            //   e.fileList.map((item) => {
            //     if (item.uid === file.uid) {
            //       item = {
            //         ...item,
            //         url,
            //       };
            //     }
            //     return item;
            //   })
            // );
            // if (!selectedImage || (selectedImage && !selectedImage.uid)) {
            //   setSelectedImage({ ...e.fileList[0], url });
            // }
          } else {
            resolve(undefined);
          }
        };
      } else {
        resolve(undefined);
      }
    });
  };

  const handleChangeImages = async (e: UploadChangeParam<UploadFile<any>>) => {
    e.fileList.forEach((file) => {
      if (!file || (file && !file.size)) return;
      const isLtMaxSize = (file?.size || 0) / 1024 / 1024 < 1;
      if (!isLtMaxSize) {
        message.error(`Image must smaller than ${1}MB!`);
      }
    });

    setImages(e.fileList);

    const tmpListImage: Array<UploadFile<any> & { url?: string }> = [];
    for (const file of e.fileList) {
      if (file.originFileObj) {
        const url = await readFile(file);
        // console.info("url", url);
        tmpListImage.push({
          ...file,
          url: url || '',
        });

        // const reader = new FileReader();
        // reader.readAsDataURL(file.originFileObj);
        // reader.onloadend = function (event) {
        //   if (event.target && event.target.result) {
        //     const url =
        //       event && event.target && event.target.result
        //         ? (event.target.result as any)
        //         : undefined;

        // };
      }
    }

    setImages(tmpListImage);
    if (!selectedImage || (selectedImage && !selectedImage.uid)) {
      setSelectedImage(tmpListImage[0]);
    }
  };

  React.useEffect(() => {
    if (productId) {
      const fetchProductDetail = async () => {
        try {
          setIsLoading(true);
          const catRes = await httpRequest.get<FetchAllCategoriesResponse>(
            `/product/categories${generateQueryString(catQuery)}`
          );
          const categories = catRes.data.payload.results;
          console.log(categories)
          // const pushCategory = filterCategory.map((category) => {
          //   return <Option key={category.categoryName}>{category.categoryName}</Option>;
          // });
          setCategories(categories);
          // setCategories(catRes.data.payload.results);

          const res = await httpRequest.get<ResponseProps>(
            '/products/' + productId
          );
          // console.log("product object : ", res.data.payload);
          setProduct(res.data.payload);

          // if (res.data.payload.categories.length > 0) {
          //   // const findSubCat = res.data.payload.categories.filter(
          //   //   (category) => category.parentCategoryId
          //   // );
          //   const findCat = res.data.payload.categories.filter(
          //     (category) => category.categoryId
          //   );

          //   if (findCat.length > 0) {
          //     // setProduct({
          //     //   ...res.data.payload,
          //     //   subcat: findSubCat[0].categoryName,
          //     //   category: findCat[0].categoryName
          //     // })
          //     setProductCategory(findCat[0].categoryName);
          //     // setProductSubcategory(findSubCat[0].categoryName);
          //   }
          // }

          form.setFieldsValue({
            ...res.data.payload,
          });

          setCategoryId(res.data.payload.productCategories[0].categoryId);
          

          setProductCategories(catRes.data.payload.results);

          const imgList = await httpRequest.get<any>(
            `/product-images/${productId}`
          );
          // console.log(imgList.data.payload)

          if (imgList.data.payload) {
            const dataImages = imgList.data.payload.map(
              (item: any, idx: number) => ({
                ...item,
                url: item.imageUrl,
                uid: item.imageId,
                order: item.order,
              })
            );

            if (dataImages.length > 0) {
              setFileList(dataImages);
            }
          }

          // setImages(dataImages as any[]);

          const bcDetails = [
            {
              field: 'productId',
              value: productId,
              label: res.data.payload.productName,
            },
          ];

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchProductDetail();
    } else {

      const fetchCategories = async () => {
        setIsLoading(true)

        try {
          const catRes = await httpRequest.get<FetchAllCategoriesResponse>(
            `/product/categories`
          );  
          
          setProductCategories(catRes.data.payload.results);

          setIsLoading(false);
        } catch (error) {
          console.log(error)
          setIsLoading(false);
        }

      }

      const spec = []
      for (const key in predefineSpec) {
        spec.push({
          label: predefineSpec[key].label,
          value: predefineSpec[key].value
        })
      }
      form.setFieldsValue({
        spesifications: spec
      })

      fetchCategories();
    }
  }, []);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleChangeImageModal: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 0) {
      if (
        !(
          newFileList[0]?.type === 'image/png' ||
          newFileList[0]?.type === 'image/jpg' ||
          newFileList[0]?.type === 'image/jpeg'
        )
      ) {
        const err = `Unaccepted file format. Type: ${newFileList[0]?.type}`;

        message.error(err);
        return;
      }

      const MAX_FILE_SIZE = 2048;

      if (!newFileList || newFileList.length === 0) return;
      const fileSizeKiloBytes = newFileList[0]?.size! / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        message.error('File size is greater than 2mb');

        return;
      }

      // setImage(newFileList);
    }
    setPreviewImageModal(newFileList);
  };

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={(productId ? 'Edit' : 'Add') + ' Product'}
        subtitle="Manage your menu data"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              style={{ padding: '0px 32px' }}
              loading={isLoadingAction}
              type="primary"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />

      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Row>
              <Col span={5}>
                <Title level={5}>Product Information</Title>
                <Text style={{ color: '#768499' }}>
                  These are edit product information, you can change anything
                </Text>
              </Col>
              <Col offset={1} span={16}>
                {/* <Row>
                  <Col span={24}>
                    <Form.Item label="Product photo">
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Image
                      </Title>

                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: '100%' }}
                          src={previewImage}
                        />
                      </Modal>

                      <Modal
                        open={previewOpen2}
                        title={previewTitle2}
                        footer={null}
                        onCancel={handleCancel2}
                      >
                        <img
                          alt="example"
                          style={{ width: '100%' }}
                          src={previewImage2}
                        />
                      </Modal>

                      <Row className="items-center">
                        <div style={{ minWidth: 100 }}>
                          <DndProvider backend={HTML5Backend}>
                            <CustomUpload
                              beforeUpload={() => false}
                              fileList={fileList}
                              onChange={onChange}
                              onPreview={handlePreview}
                              listType="picture-card"
                              itemRender={(originNode, file, currFileList) => (
                                <DragableUploadListItem
                                  originNode={originNode}
                                  file={file}
                                  fileList={currFileList}
                                  moveRow={moveRow}
                                />
                              )}
                            ></CustomUpload>
                          </DndProvider>
                        </div>

                        <div
                          onClick={() => setIsModalUploadImgVisible(true)}
                          style={{ width: 96, height: 96 }}
                          className="flex items-center justify-center border-default cursor-pointer"
                        >
                          <PlusOutlined />
                        </div>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row> */}
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Product ID"
                      name="productCode"
                    // rules={generateFormRules("productName", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Product Code
                      </Title>
                      <Input
                        // disabled
                        value={product?.productCode}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productCode: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Product name"
                      name="productName"
                    // rules={generateFormRules("productName", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Product Name
                      </Title>
                      <Input
                        // disabled
                        value={product?.productName}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="Product name"
                      name="producType"
                    // rules={generateFormRules("productName", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Product Type
                      </Title>
                      <Input
                        // disabled
                        value={product?.productType}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productType: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>Product Details</Title>
                <Text style={{ color: '#768499' }}>
                  These are edit product details, you can change anything
                </Text>
              </Col>
              <Col offset={1} span={16}>
                <Row>
                  <Col span={7}>
                    <Form.Item
                        // label="Amount"
                        name="lengthInCm"
                      // rules={generateFormRules("Category Name", ["required"])}
                      >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Length
                      </Title>
                      <InputNumber
                        style={{ width: '100%' }}
                        value={product?.dimensions?.dimensions?.lengthInCm}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            dimensions: {
                              ...prevProduct.dimensions,
                              dimensions: {
                                ...prevProduct.dimensions.dimensions,
                                lengthInCm: e
                              }
                            }
                          }))
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>CM</p>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col offset={1} span={7}>
                    <Form.Item
                      // label="Amount"
                      name="widthInCm"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Width
                      </Title>
                      <InputNumber
                        style={{ width: '100%' }}
                        value={product?.dimensions?.dimensions?.widthInCm}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            dimensions: {
                              ...prevProduct.dimensions,
                              dimensions: {
                                ...prevProduct.dimensions.dimensions,
                                widthInCm: e
                              }
                            }
                          }))
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>CM</p>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col offset={1} span={7}>
                    <Form.Item
                      // label="Amount"
                      name="heightInCm"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Height
                      </Title>
                      <InputNumber
                        style={{ width: '100%' }}
                        value={product?.dimensions?.dimensions?.heightInCm}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            dimensions: {
                              ...prevProduct.dimensions,
                              dimensions: {
                                ...prevProduct.dimensions.dimensions,
                                heightInCm: e
                              }
                            }
                          }))
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>
                            CM
                          </p>
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item
                      // label="Province"
                      name="productCategoryId"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Category
                      </Title>
                      <Select
                        showSearch
                        onChange={(value) => {
                          // onCategoryChange(value);
                          setProduct({
                            ...product,
                            productCategoryId: value.toString(),
                            // subcat: '',
                          });
                          setProductCategory(value);
                        }}
                        defaultValue={categoryId ? categoryId : ''}
                        placeholder="Select Category"
                      >
                        {productCategories.map((category, index) => {
                          return (
                            <Option
                              key={`category${index}`}
                              value={String(category.categoryId || "")}
                            >
                              {category.categoryName}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={7}>
                    <Form.Item
                      // label="Amount"
                      name="grossWeightInKG"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Gross Weight
                      </Title>
                      <InputNumber
                        // disabled
                        style={{ width: '100%' }}
                        value={product?.grossWeightInKG}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct({
                            ...product,
                            grossWeightInKG: e,
                          });
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>
                            kg
                          </p>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col offset={1} span={7}>
                    <Form.Item
                      // label="Amount"
                      name="netWeightInKG"
                    // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Net Weight
                      </Title>
                      <InputNumber
                        // disabled
                        style={{ width: '100%' }}
                        value={product?.netWeightInKG}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct({
                            ...product,
                            netWeightInKG: e,
                          });
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>
                            kg
                          </p>
                        }
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col offset={1} span={7}>
                    <Form.Item
                      // label="Amount"
                      name="sizeInML"
                      // rules={generateFormRules("Category Name", ["required"])}
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Volume
                      </Title>
                      <InputNumber
                        // disabled
                        style={{ width: '100%' }}
                        value={product?.volume}
                        controls={false}
                        onChange={(e: any) => {
                          setProduct({
                            ...product,
                            volume: e.target,
                          });
                        }}
                        addonAfter={
                          <p style={{ marginBottom: 0, color: '#9FACBF' }}>
                            m<sup>3</sup>
                          </p>
                        }
                      />
                    </Form.Item>
                  </Col> */}
                </Row>
                <Row>
                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: '#768499',
                        marginBottom: 2,
                        fontSize: 14,
                      }}
                    >
                      Description
                    </Title>
                    <Form.Item
                      // label="Description"
                      name="description"
                    // rules={generateFormRules("Description", ["required"])}
                    >
                      {/* <ReactQuill
                          readOnly
                          theme="snow"
                          value={product?.description}
                          onChange={(val) =>
                            setProduct({ ...product, 
                              description: val 
                            })
                          }
                          modules={quillModules}
                          formats={quillFormats}
                        /> */}
                      <Input.TextArea
                        value={product?.description ? product?.description : ''}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      // label="Status*"
                      name="isPublished"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Status
                      </Title>
                      <Radio.Group
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            isPublished: e.target.value,
                          })
                        }
                        defaultValue={true}
                        value={product?.isPublished}
                      >
                        <CustomRadio value={true}>Active</CustomRadio>
                        <CustomRadio value={false}>Inactive</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      // label="Status*"
                      name="isHighlight"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Highlight
                      </Title>
                      <Radio.Group
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            isHighlight: e.target.value,
                          })
                        }
                        defaultValue={true}
                        value={product?.isHighlight}
                      >
                        <CustomRadio value={true}>Yes</CustomRadio>
                        <CustomRadio value={false}>No</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={5}>
                <Title level={5}>Spesifications</Title>
                <Text style={{ color: '#768499' }}>
                  This is spesifications of product, you can change here
                </Text>
              </Col>
              <Col
                offset={1}
                span={16}>
                <Row>
                  <Col span={24}>
                    <Form.List name='spesifications'>
                      {(spesifications, { add, remove }) => {
                        return (
                          <>
                            <Row style={{ marginBottom: 10 }}>
                              <Col
                                style={{ display: 'flex', justifyContent: 'end' }}
                                span={24}>
                                <Button
                                  style={{ padding: '0px 32px' }}
                                  type='primary'
                                  onClick={() => {
                                    add();
                                  }}>
                                  Add Spesification
                                </Button>
                              </Col>
                            </Row>
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
                            {spesifications.map((field, index) => (
                              <Row key={field.key}>
                                <Col span={9}>
                                  <Form.Item
                                    name={[index, 'label']}
                                  // label="Name"
                                  // rules={[{ required: true }]}
                                  >
                                    <Input
                                      // disabled={index < Object.keys(predefineSpec).length ? true : false}
                                      onChange={(e) => {
                                        const fields = form.getFieldsValue();
                                        
                                        const { spesifications } = fields;
                                        Object.assign(spesifications[index], {
                                          label: e.target.value,
                                        });
                                        
                                        form.setFieldsValue({ spesifications });
                                        setSpecifications(spesifications)
                                      }} />
                                  </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                  <Form.Item
                                    name={[index, 'value']}
                                  // label="Name"
                                  // rules={[{ required: true }]}
                                  >
                                    <Input
                                      // disabled={index < Object.keys(predefineSpec).length ? true : false}
                                      onChange={(e) => {
                                        const fields = form.getFieldsValue();
                                        const { spesifications } = fields;
                                        Object.assign(spesifications[index], {
                                          value: e.target.value,
                                        });
                                        form.setFieldsValue({ spesifications });
                                        setSpecifications(spesifications);
                                      }} />
                                  </Form.Item>
                                </Col>
                                <Col
                                  style={{
                                    display: 'flex',
                                    // alignItems: 'center',
                                    justifyContent: 'end',
                                  }}
                                  // offset={1}
                                  span={4}>
                                  <Button
                                    disabled={index < Object.keys(predefineSpec).length ? true : false}
                                    style={{
                                      padding: '0px 32px',
                                      color: index < Object.keys(predefineSpec).length ? '#B7B7B7' : 'red',
                                      background: index < Object.keys(predefineSpec).length ? 'white' : '#F5F5F5',
                                    }}
                                    onClick={() => {
                                      remove(field.name)
                                      const updatedData = specifications.filter((item: any, indexSpec: number) => indexSpec !== index)
                                      setSpecifications(updatedData)
                                    }}>
                                    Delete
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                          </>
                        );
                      }}
                    </Form.List>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
      </Spin>

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
      <UploadModal
        width={500}
        open={isModalUploadImgVisible}
        onOk={() => {
          saveImg();
        }}
        onCancel={() => {
          // setPreviewImg(null);
          setIsModalUploadImgVisible(false);
          setFileListModal([]);
        }}
        okText="Save"
        // confirmLoading={isLoadingAction}
        okButtonProps={{ type: 'primary' }}
      >
        <Title level={4} style={{ color: 'black', marginBottom: 20 }}>
          Add Product Image
        </Title>

        {fileListModal.length === 0 && (
          <div
            className="flex items-center justify-center border-default cursor-pointer"
            style={{ height: 200 }}
            onClick={() => {
              if (
                btnUploadRef.current != undefined &&
                btnUploadRef.current.click != undefined
              )
                btnUploadRef.current.click();
            }}
          >
            <PlusOutlined />
          </div>
        )}

        <CustomUploadModal
          accept="image/png, image/jpeg, image/jpg"
          onPreview={handlePreview2}
          fileList={fileListModal}
          beforeUpload={() => false}
          onChange={({ fileList: newFileList }) => {
            if (newFileList.length > 0) {
              if (
                !(
                  newFileList[0]?.type === 'image/png' ||
                  newFileList[0]?.type === 'image/jpg' ||
                  newFileList[0]?.type === 'image/jpeg'
                )
              ) {
                const err = `Unaccepted file format. Type: ${newFileList[0]?.type}`;

                message.error(err);
                return;
              }

              const MAX_FILE_SIZE = 2048;

              if (!newFileList || newFileList.length === 0) return;
              const fileSizeKiloBytes = newFileList[0]?.size! / 1024;
              if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                message.error('File size is greater than 2mb');

                return;
              }
            }
            setFileListModal(newFileList);
          }}
          listType="picture-card"
        >
          <div ref={btnUploadRef}>
            <PlusOutlined />
          </div>
        </CustomUploadModal>

        <div className="flex gap-x-2.5">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              if (
                btnUploadRef.current != undefined &&
                btnUploadRef.current.click != undefined
              )
                btnUploadRef.current.click();
            }}
          >
            Choose Image
          </Button>
          <Text className="text-gray text-2.5">
            Recommended file resolution 1000x1000 pixel, Extension allowed are
            .jpg and .png and Max file size is 2 Mb.
          </Text>
        </div>
      </UploadModal>
    </React.Fragment>
  );
};

const CustomSpace = styled(Space)`
  width: 100%;
  .ant-space-item {
    width: 100%;
  }
`;

const CustomUpload = styled(Upload)`
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 4px;
  }
  .ant-upload-list-picture-card-container {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const CustomUploadModal = styled(Upload)`
  .ant-upload {
    text-align: left;
    display: none;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
    border: none;
  }

  .ant-upload-list-picture-card-container {
    width: 100% !important;
    height: max-content;
  }

  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover !important;
  }
`;

export default ProductEdit;

const CustomRadio = styled(Radio)`
  margin-right: 5rem;
  .ant-radio-checked .ant-radio-inner {
    border-color: #1e1e1e;
    border-width: 2px;
    box-shadow: none;
  }
  .ant-radio:hover .ant-radio-inner {
    background-color: white;
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: #1e1e1e;
  }
`;

const UploadModal = styled(Modal)`
  .ant-modal-body {
    padding: 0 4px;
  }
`;
