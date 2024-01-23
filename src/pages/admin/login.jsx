import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "./useAdmin";
import { Form, Input, Button } from "antd";

export const Login = () => {
  const [isLoading, loginData] = loginAdmin();
  const navigate = useNavigate();

  Cookies.remove("token");

  const handleLogin = (e) => {
    const body = {
      username: e.username,
      password: e.password,
    };

    console.log(body);

    loginData(body, () => {});
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Login Admin </div>
              <div className="card-body">
                <Form layout="vertical" onFinish={handleLogin}>
                  <Form.Item
                    className="form-login"
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "username harus diisi!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className="form-login"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "password tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Masuk
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
