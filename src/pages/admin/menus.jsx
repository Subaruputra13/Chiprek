import React, { useEffect, useState } from "react";
import { Header } from "../../component/header";
import { SideNav } from "../../component/sideNav";
import { Footer } from "../../component/footer";
import {
  useMenusAdmin,
  useMenuById,
  useCreateMenu,
  useUpdateMenu,
  useDeleteMenu,
  useUploadImage,
} from "./useAdmin";
import {
  Card,
  Button,
  Row,
  Form,
  Modal,
  Col,
  Input,
  Select,
  notification,
  InputNumber,
  Popconfirm,
  DatePicker,
  Image,
  Upload,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RUPIAH } from "../../helper/helper";
const { Meta } = Card;

export const Menus = () => {
  const [isLoading, dataMenus, getAllMenus] = useMenusAdmin();
  const [isLoadingId, dataMenuId, getMenuById] = useMenuById();
  const [isLoadingCreate, createMenu] = useCreateMenu();
  const [isLoadingUpdate, updateMenu] = useUpdateMenu();
  const [isLoadingDelete, deleteMenu] = useDeleteMenu();
  const [isLoadingImage, uploadImage] = useUploadImage();

  const [open, setOpen] = useState(false);
  const [formMenu] = Form.useForm();
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const showModal = () => {
    setOpen(true);
  };

  const handleReset = () => {
    formMenu.resetFields();
  };

  // Handle Edit
  const handleEdit = (row_data) => {
    const formValue = {
      category_id: row_data.category_id,
      image_url: row_data.image_url,
      name: row_data.name,
      price: row_data.price,
    };

    formMenu.setFieldsValue(formValue);
    setRowData(row_data);
    setImageUrl(row_data.image_url);
    setIsEdit(true);
    setOpen(true);
  };

  // Handle Cancel
  const handleCancel = () => {
    setOpen(false);
    setRowData();
    setIsEdit(false);
    setImageUrl(null);
    formMenu.resetFields();
  };

  // Handle Upload Image
  const handleUpload = async (file) => {
    uploadImage(file, (data) => {
      formMenu.setFieldsValue({ image_url: data });
      setImageUrl(data);
    });
  };

  // Handle Add Menu
  const onAdd = (values) => {
    createMenu(values, () => {
      getAllMenus();
      formMenu.resetFields();
      setOpen(false);
    });
    setImageUrl(null);
  };

  // Handle Update Menu
  const onUpdate = (values) => {
    const id = rowData.ID;
    const body = {
      category_id: values.category_id,
      image_url: values.image_url,
      name: values.name,
      price: values.price,
    };
    updateMenu(id, body, () => {
      getAllMenus();
      formMenu.resetFields();
      setOpen(false);
      setImageUrl(null);
    });
  };

  // Handle Delete Menu
  const onDelete = (id) => {
    deleteMenu(id, () => {
      getAllMenus();
    });
  };

  useEffect(() => {
    getAllMenus();
    const imageInventron = formMenu.getFieldValue("image_url");
    !!imageInventron && setImageUrl(imageInventron);
  }, [getAllMenus]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <SideNav />

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Menu</h1>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6">
                  <Button type="primary" onClick={showModal}>
                    Tambah Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
              <Row style={{ rowGap: 20, columnGap: 20 }} gutter={[20]}>
                {dataMenus &&
                  dataMenus.map((item, index) => (
                    <Card
                      style={{
                        width: 240,
                      }}
                      key={index}
                      cover={<img alt="example" src={item.image_url} />}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => handleEdit(item)}
                        />,
                        <DeleteOutlined
                          key="delete"
                          onClick={() => onDelete(item.ID)}
                        />,
                      ]}
                    >
                      <Meta
                        title={item.name}
                        description={RUPIAH(item.price)}
                      />
                    </Card>
                  ))}
              </Row>
            </div>
          </section>
        </div>

        <Footer />
      </div>
      {isEdit ? (
        <Modal
          title="Edit Menu"
          open={open}
          onCancel={handleCancel}
          onOk={formMenu.submit}
        >
          <Form
            form={formMenu}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onUpdate}
          >
            <Form.Item
              name="category_id"
              label="Kategori"
              rules={[
                {
                  required: true,
                  message: "Kategori wajib diisi",
                },
              ]}
            >
              <Select>
                <Select.Option value={"1" ? 1 : "Makanan"}>
                  Makanan
                </Select.Option>
                <Select.Option value={"2" ? 2 : "Minuman"}>
                  Minuman
                </Select.Option>
                <Select.Option value={"3" ? 3 : "Snack"}>Snack</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Nama"
              rules={[
                {
                  required: true,
                  message: "Nama wajib diisi",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Harga"
              rules={[
                {
                  required: true,
                  message: "Harga wajib diisi",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="image_url"
              label="Gambar"
              rules={[{ required: true }]}
            >
              {!!imageUrl ? (
                <>
                  <Image src={imageUrl} width={100} height={100} />
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      formMenu.setFieldValue({ image_url: null });
                      setImageUrl(null);
                    }}
                  >
                    Delete Image
                  </Button>
                </>
              ) : (
                <Upload
                  showUploadList={false}
                  name="file"
                  maxCount={1}
                  customRequest={() => {}}
                  onChange={handleUpload}
                  disabled={isLoadingImage}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Foto{" "}
                    {!!isLoadingImage && (
                      <Spin size="small" style={{ paddingLeft: 10 }} />
                    )}
                  </Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal
          title="Tambah Menu"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={formMenu.submit}
        >
          <Form
            form={formMenu}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onAdd}
          >
            <Form.Item
              name="category_id"
              label="Kategori"
              rules={[
                {
                  required: true,
                  message: "Kategori wajib diisi",
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>Makanan</Select.Option>
                <Select.Option value={2}>Minuman</Select.Option>
                <Select.Option value={3}>Snack</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="name"
              label="Nama"
              rules={[
                {
                  required: true,
                  message: "Nama wajib diisi",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Harga"
              rules={[
                {
                  required: true,
                  message: "Harga wajib diisi",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="image_url"
              label="Gambar"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {imageUrl && <Image src={imageUrl} width={100} height={100} />}
              <Upload
                showUploadList={false}
                name="file"
                maxCount={1}
                customRequest={() => {}}
                onChange={handleUpload}
                disabled={isLoadingImage}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Foto
                  {!!isLoadingImage && (
                    <Spin size="small" style={{ paddingLeft: 10 }} />
                  )}
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
