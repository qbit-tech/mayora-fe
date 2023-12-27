import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, MoreOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Space,
  Table,
  Button,
  Switch,
  Menu,
  Image,
  Modal,
  Dropdown,
  Select,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { formatDate } from '../../helpers/constant';
import { ColumnsType } from 'antd/lib/table';
import useFetchList from '../../hooks/useFetchList';
import styled from 'styled-components';
import { BannerProps } from '../../types/banner.type';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEnd,
} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { DEFAULT_IMG } from '../../const/config';

const Banner = () => {
  const navigate = useNavigate();
  const { Option } = Select;

  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState<BannerProps>();
  const [tmpDataUpdateActiveBanner, setTmpDataUpdateActiveBanner] =
    useState<BannerProps>();

  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  ));

  const {
    isLoading,
    data,
    pagination,
    setData,
    setSearch,
    fetchList,
    setQuery,
    changePage,
  } = useFetchList<BannerProps>({
    apiRequest: httpRequest,
    endpoint: 'banners',
    initialQuery: {
      limit: 0,
      offset: 0,
    },
  });

  const handleCreateBanner = () => {
    navigate('/banner/add');
  };

  const handleClickDetail = (e: BannerProps) => {
    navigate(`/banner/${e.bannerId}`);
  };

  const handleClickEdit = (e: BannerProps) => {
    navigate(`/banner/${e.bannerId}/edit`);
  };

  const handleClickUpdateActiveBanner = async () => {
    if (tmpDataUpdateActiveBanner) {
      setIsLoadingAction(true);
      await httpRequest.patch(
        '/banners/' + tmpDataUpdateActiveBanner.bannerId,
        {
          isPublished: tmpDataUpdateActiveBanner.isPublished ? false : true,
        }
      );
      setTmpDataUpdateActiveBanner(undefined);
      setIsLoadingAction(false);
      fetchList();
    }
  };

  const handleClickDelete = async () => {
    if (willBeDeleted) {
      setIsLoadingAction(true);
      await httpRequest.delete('/banners/' + willBeDeleted.bannerId);
      setWillBeDeleted(undefined);
      setIsLoadingAction(false);
      fetchList();
    }
  };

  const handleChangeStatus = (status: string) => {
    if (status !== 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: undefined }));
    }
  };

  const columns: ColumnsType<BannerProps> = [
    {
      title: ' ',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'IMAGE',
      dataIndex: 'bannerImageUrl',
      key: 'bannerImageUrl',
      width: 350,
      render: (url: string, record: BannerProps) => {
        return (
          <Image
            width={260}
            height={120}
            preview={false}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleClickDetail(record);
            }}
            // style={{ borderRadius: '7%' }}
            src={url}
            placeholder={
              <Image
                preview={false}
                src={DEFAULT_IMG}
                width={260}
                height={120}
              />
            }
          />
        );
      },
    },
    // {
    // 	title: 'TITLE',
    // 	key: 'title',
    // 	dataIndex: 'title',
    // 	render: (text: string, record: BannerProps) => {
    // 		return (
    // 			<div
    // 				className='table-link'
    // 				onClick={() => handleClickDetail(record)}
    // 			>
    // 				{record.title}
    // 			</div>
    // 		);
    // 	},
    // },
    {
      title: 'TYPE',
      key: 'bannerType',
      dataIndex: 'bannerType',
      render: (text: string, record: BannerProps) => {
        return <div>{record.bannerType ? record.bannerType : 'Not Set'}</div>;
      },
    },
    {
      title: 'STATUS',
      key: 'isPublished',
      dataIndex: 'isPublished',
      width: 150,
      render: (isActive: any, record: BannerProps) => (
        <>
          <Switch
            loading={isLoadingAction}
            checked={isActive}
            onChange={() => {
              setTmpDataUpdateActiveBanner(record);
            }}
          />
        </>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (val) => <div>{formatDate(val)}</div>,
    },
    // {
    // 	title: 'UPDATED AT',
    // 	dataIndex: 'updatedAt',
    // 	key: 'updatedAt',
    // 	width: 180,
    // 	render: (val) => <div>{formatDate(val)}</div>,
    // },
    {
      title: '',
      key: 'action',
      render: (_: any, record: BannerProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },

    // {
    //   title: '',
    //   key: 'action',
    //   width: 30,
    //   render: (_: any, record: BannerProps) => (
    //     <Dropdown overlay={() => menu(record)} placement="bottomRight">
    //       <MoreOutlined style={{ cursor: 'pointer' }} />
    //     </Dropdown>
    //   ),
    // },
  ];

  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
  );
  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    )
  );

  const onSortEnd = async ({ oldIndex, newIndex }: SortEnd) => {
    console.log('oldIndex', oldIndex);
    console.log('newIndex', newIndex);

    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        data.slice(),
        oldIndex,
        newIndex
      ).filter((el: BannerProps) => !!el);
      console.log('Sorted items: ', newData);
      setData(newData);
      const newDataInQueue = newData.map((item: any, key: any) => ({
        bannerId: item.bannerId,
        order: newData.length - key,
      }));
      console.log('newDataInQueue', newDataInQueue);
      httpRequest
        .patch('banners/queue/bulk', {
          bulk: newDataInQueue,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({
    className,
    style,
    ...restProps
  }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.order === restProps['data-row-key']);
    console.log(index);
    return <SortableItem index={index} {...restProps} />;
  };

  const menu = (record: BannerProps) => (
    <Menu
      onClick={({ key }) => {
        if (key === 'edit') {
          handleClickEdit(record);
        } else if (key === 'delete') {
          setWillBeDeleted(record);
        } else if (key === 'detail') {
          handleClickDetail(record);
        }
      }}
    >
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="detail">Detail</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  if (data?.length === 0) {
    return (
      <div>
        <HeaderSection
          icon={<PictureOutlined />}
          title="Banner"
          // subtitle='Manage your promo deals data'
          rightAction={
            <Space>
              <Button
                type="primary"
                style={{ padding: '0px 32px' }}
                onClick={handleCreateBanner}
              >
                Add Banner
              </Button>
            </Space>
          }
        />

        {/* <ContainerFilter>
					<Input
						size='large'
						placeholder='Search promo deals title'
						prefix={<SearchOutlined />}
						allowClear
						onChange={(e) => setSearch(e.target.value)}
					/>

					<Select
						size='large'
						allowClear
						style={{ width: 160 }}
						onChange={handleChangeStatus}
						placeholder='Status'
					>
						<Option value='all'>All</Option>
						<Option value='Published'>Published</Option>
						<Option value='Unpublished'>Unpublished</Option>
					</Select>
				</ContainerFilter> */}

        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />

        <Modal
          title="Confirmation"
          visible={!!tmpDataUpdateActiveBanner}
          onOk={handleClickUpdateActiveBanner}
          onCancel={() => {
            setTmpDataUpdateActiveBanner(undefined);
          }}
          okText="Yes"
          confirmLoading={isLoadingAction}
          okButtonProps={{ type: 'primary' }}
        >
          <p>
            Are you sure want to change promo deals status to{' '}
            <b>
              {tmpDataUpdateActiveBanner?.isPublished
                ? 'Unpublished'
                : 'Published'}
            </b>
            ?
          </p>
        </Modal>

        <Modal
          title="Confirmation"
          visible={!!willBeDeleted}
          onOk={handleClickDelete}
          onCancel={() => {
            setWillBeDeleted(undefined);
          }}
          okText="Yes"
          confirmLoading={isLoadingAction}
          okButtonProps={{ type: 'primary' }}
        >
          <p>Are you sure want to delete this data?</p>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <HeaderSection
          // icon={<PictureOutlined />}
          title="Banner"
          // subtitle='Manage your promo deals data'
          rightAction={
            <Space>
              <Button
                style={{ padding: '0px 32px' }}
                type="primary"
                onClick={handleCreateBanner}
              >
                Add Banner
              </Button>
            </Space>
          }
        />

        {/* <ContainerFilter>
					<Input
						size='large'
						placeholder='Search promo deals title'
						prefix={<SearchOutlined />}
						allowClear
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Select
						size='large'
						allowClear
						style={{ width: 160 }}
						onChange={handleChangeStatus}
						placeholder='Status'
					>
						<Option value='all'>All</Option>
						<Option value='active'>Published</Option>
						<Option value='inactive'>Unpublished</Option>
					</Select>
				</ContainerFilter> */}

        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data && data}
          pagination={false}
          rowKey="order"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        />

        {/* {data.length !== 0 ? (
					<>
						<CustomPagination
							current={pagination.page}
							total={pagination.totalData}
							defaultPageSize={pagination.perPage}
							pageSizeOptions={['25', '50', '100']}
							showSizeChanger={true}
							showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
							onChange={changePage}
							locale={{ items_per_page: '' }}
							responsive={true}
						/>
						<PaginationText>
							<h4>Per Page</h4>
						</PaginationText>
					</>
				) : (
					false
				)} */}

        <Modal
          title="Confirmation"
          visible={!!tmpDataUpdateActiveBanner}
          onOk={handleClickUpdateActiveBanner}
          onCancel={() => {
            setTmpDataUpdateActiveBanner(undefined);
          }}
          okText="Yes"
          confirmLoading={isLoadingAction}
          okButtonProps={{ type: 'primary' }}
        >
          <p>
            Are you sure want to change promo deals status to{' '}
            <b>
              {tmpDataUpdateActiveBanner?.isPublished
                ? 'Unpublished'
                : 'Published'}
            </b>
            ?
          </p>
        </Modal>

        <Modal
          title="Confirmation"
          visible={!!willBeDeleted}
          onOk={handleClickDelete}
          onCancel={() => {
            setWillBeDeleted(undefined);
          }}
          okText="Yes"
          confirmLoading={isLoadingAction}
          okButtonProps={{ type: 'primary' }}
        >
          <p>Are you sure want to delete this data?</p>
        </Modal>
      </div>
    );
  }
};

export default Banner;

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;
