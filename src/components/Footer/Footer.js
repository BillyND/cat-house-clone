import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import "./Footer.scss";
const Footer = () => {
  return (
    <div>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted footer-component-bootstrap mt-5"
      >
        <section className="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
          </div>
          <div className="icon-contact-list">
            <div>
              <a className="me-4 text-reset">
                <FaFacebook className="icon-contact" />
              </a>
            </div>
            <div>
              <a className="me-4 text-reset">
                <FaTwitter className="icon-contact" />
              </a>
            </div>
            <div>
              <a className="me-4 text-reset">
                <FaGithub className="icon-contact" />
              </a>
            </div>
            <div>
              <a className="me-4 text-reset">
                <FaInstagram className="icon-contact" />
              </a>
            </div>
          </div>
        </section>

        <section>
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Hỗ trợ</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Giới thiệu PETSHOP
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Gửi yêu cầu hỗ trợ
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Chính sách</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Chính sách thanh toán
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Chính sách bảo hành
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Hợp tác</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Quy chế hoạt động
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Liên hệ bán hàng
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                <p>
                  <FaHome className="icon-contact me-2" />
                  Hoàng Mai, Hà Nội
                </p>
                <p>
                  <HiMail className="icon-contact me-3" />
                  info@example.com
                </p>
                <p>
                  <FaPhoneAlt className="icon-contact phone me-3" /> +84 5678
                  9999 9
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <a
            className="text-reset fw-bold"
            href="https://github.com/ND-Long/Frs-ManagerUser.git"
            target="_blank"
          >
            PETSHOP
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
