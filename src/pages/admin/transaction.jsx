import React, { useEffect, useState } from "react";
import { Header } from "../../component/header";
import { SideNav } from "../../component/sideNav";
import { Footer } from "../../component/footer";
import { Button, Modal, Space, Table, Tag, Form, Select, Card } from "antd";
import { useTransaction } from "./useAdmin";
import { render } from "react-dom";
import { FORMAT_DATETIME, RUPIAH } from "../../helper/helper";
import { useUpdateTransaction } from "./useAdmin";

export const Transaction = () => {
  const [isLoadingTransaction, dataTransaction, GetAllTransaction] =
    useTransaction();
  const [isLoadingUpdate, updateTransaction] = useUpdateTransaction();

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [formDetail] = Form.useForm();

  // Handel Modal
  const showModal = () => {
    setOpen(true);
  };

  // Handle Detail
  const HandleDetail = (row_data) => {
    const formValue = {
      order_id: row_data.order_id,
      customer_name: row_data.customer_name,
      created_at: row_data.created_at,
      total_price: row_data.total_price,
      pesanan: row_data.Cart,
      status: row_data.status,
    };

    formDetail.setFieldsValue(formValue);
    setRowData(row_data);
    console.log(row_data);
    setIsEdit(true);
    setOpen(true);
  };

  // Handle Update
  const onUpdate = (values) => {
    const id = rowData.ID;
    const body = {
      status: values.status,
    };

    console.log(body);

    updateTransaction(id, body, () => {
      GetAllTransaction();
      setOpen(false);
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customerName",
    },
    {
      title: "Tanggal Pemesanan",
      render: (record) => FORMAT_DATETIME(record.CreatedAt),
      key: "tanggalPemesanan",
    },
    {
      title: "Total",
      render: (record) => RUPIAH(record.total_price),
      key: "totalTransaksi",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "statusPesanan",
      render: (record) => (
        <Tag
          color={
            record === "Waiting for Payment"
              ? "volcano"
              : record === "On Process"
              ? "geekblue"
              : record === "Cancelled"
              ? "volcano"
              : "green"
          }
        >
          {record}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => HandleDetail(record)}>
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    GetAllTransaction();
  }, [GetAllTransaction]);
  return (
    <>
      {dataTransaction && (
        <>
          <div className="wrapper">
            <Header />
            <SideNav />

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
              {/* Content Header (Page header) */}
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Transaksi</h1>
                    </div>
                  </div>
                  {/* /.row */}
                </div>
                {/* /.container-fluid */}
              </div>
              {/* /.content-header */}
              {/* Main content */}
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <Table
                        columns={columns}
                        dataSource={dataTransaction}
                        rowKey={(record) => record.order_id}
                      />
                      {isEdit && (
                        <Modal
                          title="Detail Transaksi"
                          open={open}
                          onCancel={() => setOpen(false)}
                          footer={
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => formDetail.submit()}
                            >
                              Update
                            </button>
                          }
                        >
                          <Form
                            form={formDetail}
                            layout="vertical"
                            initialValues={{ status: rowData?.status }}
                            onFinish={onUpdate}
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td>Order ID</td>
                                  <td>: {rowData?.order_id}</td>
                                </tr>
                                <tr>
                                  <td>Customer</td>
                                  <td>: {rowData?.customer_name}</td>
                                </tr>
                                <tr>
                                  <td>Tanggal Pemesanan</td>
                                  <td>
                                    : {FORMAT_DATETIME(rowData?.CreatedAt)}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Total</td>
                                  <td>: {RUPIAH(rowData?.total_price)}</td>
                                </tr>
                                <tr></tr>

                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Status</td>
                                  <td>
                                    <Form.Item name="status" label>
                                      <Select>
                                        <Select.Option value="Waiting for Payment">
                                          Waiting for Payment
                                        </Select.Option>

                                        <Select.Option value="On Process">
                                          On Process
                                        </Select.Option>

                                        <Select.Option value="Success">
                                          Success
                                        </Select.Option>

                                        <Select.Option value="Cancelled">
                                          Cancelled
                                        </Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Form>
                        </Modal>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              {/* /.content */}
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};
