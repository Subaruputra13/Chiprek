import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Select } from "antd";

export const CategoryMenu = () => {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12 py-3">
            <Select
              size="large"
              defaultValue="Makanan"
              style={{
                width: 250,
              }}
              options={[
                {
                  value: "Makanan",
                  label: "Makanan",
                },
                {
                  value: "Minuman",
                  label: "Minuman",
                },
                {
                  value: "Tambahan",
                  label: "Tambahan",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
