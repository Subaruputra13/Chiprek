import React from "react";
import { useCreateCustomer } from "./useHome";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../component/loading";
import { Form, Input, Button, InputNumber } from "antd";
export const Forms = () => {
  const [isLoading, createCustomer] = useCreateCustomer();
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    const body = {
      name: e.name,
      phone_number: e.phone_number,
    };

    console.log(body);

    createCustomer(body, () => {
      //set timer
      setTimeout(() => {
        navigate("/");
      }, 1500);
    });
  };

  return (
    <>
      <div className="container mt-4">
        {isLoading && isLoading ? <LoadingComponent /> : null}
        <div className="row">
          <div className="col-12">
            <Form layout="vertical" onFinish={HandleSubmit}>
              <Form.Item
                label="Nama Pemesan"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Masukkan NamaAnda",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nomor Telepon"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Masukkan Nomor Telepon Anda",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className="d-flex justify-content-center">
                <Button
                  className="btPemesan my-2 px-5"
                  size="large"
                  shape="round"
                  htmlType="submit"
                  type="primary"
                  style={{ fontSize: "medium" }}
                >
                  Lanjutkan Pemesanan
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
