import React from "react";
import { UserOutlined } from "@ant-design/icons";

export const SideNav = () => {
  return (
    <>
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <span className="brand-text font-weight-light">
              Chiprek Aunthentic
            </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <UserOutlined
                  style={{
                    fontSize: "25px",
                    padding: "5px",
                    background: "#fff",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Admin
                </a>
              </div>
            </div>

            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-header">EXAMPLES</li>
                <li className="nav-item">
                  <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image" />
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image" />
                    <p>Transaksi</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image" />
                    <p>Pengguna</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image" />
                    <p>Laporan</p>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};
