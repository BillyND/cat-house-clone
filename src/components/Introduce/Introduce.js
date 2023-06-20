import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Introduce.scss";

function Introduce(props) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="introduce-container ">
      <div className="introduce-banner ">
        <section className="introduce-banner-section ps-3 pt-3">
          <h5 className="header-introduce">Giới thiệu</h5>
          <div className="nav-link-address">
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Trang chủ
            </span>
            <span> / Giới thiệu</span>
          </div>
        </section>
      </div>
      <div className="introduce-content container mt-3 text-center">
        <h4>VỀ CATHOUSE</h4>
        <p className="col-md-8 mx-auto">
          Với đội ngũ nhiều năm kinh nghiệm nuôi dưỡng thú cưng đặc biệt chuyên
          về mèo Anh lông ngắn, Cathouse luôn tự tin trong việc tư vấn hỗ trợ
          các bạn sở hữu một bé mèo thuần chủng ưng ý cho riêng mình.
        </p>

        <div className="information mt-5 pt-4">
          <div className="information-column">
            <div className="information-image">
              <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_information_1_ico.png?v=3" />
            </div>
            <div className="information-content">
              <h5>ĐỘI NGŨ CO-FOUNDER</h5>
              <p>
                Là những con sen cuồng mèo với đam mê mang lại giá trị cho cộng
                đồng nuôi thú cưng ngày một phát triển. Luôn đảm bảo về chất
                lượng Mèo Anh Lông Ngắn thuần chủng cung cấp ra thị trường. Luôn
                phấn đấu để đem lại trải nghiệm tốt nhất với khách hàng.
              </p>
            </div>
          </div>
          <div className="information-column">
            <div className="information-image">
              <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_information_2_ico.png?v=3" />
            </div>
            <div className="information-content">
              <h5>SẢN PHẨM ĐẶC BIỆT</h5>
              <p>
                Chuyên phối giống và nuôi dưỡng các bé Mèo Anh thuần chủng. Đảm
                bảo kế thừa và phát triển được những đặc điểm siêu đáng yêu của
                dòng Mèo Anh Lông Ngắn/Dài. Tuyển chọn và tư vấn chăm sóc sức
                khỏe trọn đời cho các bé thú cưng.
              </p>
            </div>
          </div>
          <div className="information-column">
            <div className="information-image">
              <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_information_3_ico.png?v=3" />
            </div>
            <div className="information-content">
              <h5>KHÁCH HÀNG LÀ HOÀNG THƯỢNG</h5>
              <p>
                Là phương châm cũng như kim chỉ nam trong hoạt động kinh doanh.
                Sự hài lòng của khách hàng luôn là điều đội ngũ Cathouse hướng
                tới và cố gắng hoàn thiện hơn mỗi ngày. Mong khách hàng sẽ tiếp
                tục đồng hành và tin tưởng lựa chọn Cathouse
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4">
          <h5 className="header-policy">CHÍNH SÁCH</h5>
          <h2>MUA MÈO TẠI CATHOUSE</h2>
        </div>
        <div className="policy mt-3">
          <div className="policy-column">
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_1_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>100% Mèo Anh thuần chủng</h6>
                <p>
                  Bố mẹ thuần chủng mèo Anh, đảm bảo sức khoẻ và nhập khẩu từ
                  các trại giống uy tín. Các bé được tuyển chọn và phối giống
                  bài bản đảm bảo chất lượng mèo con.
                </p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_2_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>Sức khoẻ&Tiêm phòng</h6>
                <p>
                  Các bé mèo con từ 02-03 tháng có xổ tiêm phòng 1 mũi ngừa 4
                  bệnh phổ biến ở mèo, xổ giun đầy đủ trước khi về nhà mới.{" "}
                </p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_3_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>Chính sách bảo hành </h6>
                <p>
                  Bảo hành sức khoẻ đổi trả lên tới 15 ngày và hỗ trợ chi phí
                  khám chữa bệnh lên tới 20% trong 30 ngày. Có đội ngũ bác sĩ
                  thú y uy tín đồng hành và thăm khám tại cửa hàng.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="policy-column">
            <img
              className="img-center"
              src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_img.jpg?v=3"
            />
          </div>

          <div className="policy-column">
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_1_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>100% Mèo Anh thuần chủng</h6>
                <p>
                  Bố mẹ thuần chủng mèo Anh, đảm bảo sức khoẻ và nhập khẩu từ
                  các trại giống uy tín. Các bé được tuyển chọn và phối giống
                  bài bản đảm bảo chất lượng mèo con.
                </p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_2_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>Sức khoẻ&Tiêm phòng</h6>
                <p>
                  Các bé mèo con từ 02-03 tháng có xổ tiêm phòng 1 mũi ngừa 4
                  bệnh phổ biến ở mèo, xổ giun đầy đủ trước khi về nhà mới.{" "}
                </p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-item-logo">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_ecosystem_3_ico.png?v=3" />
              </div>
              <div className="policy-item-content">
                <h6>Chính sách bảo hành </h6>
                <p>
                  Bảo hành sức khoẻ đổi trả lên tới 15 ngày và hỗ trợ chi phí
                  khám chữa bệnh lên tới 20% trong 30 ngày. Có đội ngũ bác sĩ
                  thú y uy tín đồng hành và thăm khám tại cửa hàng.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="other-infor mt-5 pb-5">
          <div className="other-infor-column">
            <div className="other-infor-image">
              <div className="behide-image"></div>
              <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_alternate_1_img.jpg?v=3" />
            </div>
            <div className="other-infor-content">
              <h4>CÁC MÀU MÈO ANH LÔNG NGẮN TẠI CATHOUSE</h4>
              <p>
                Cathouse chuyên phối giống và nuôi dưỡng các bé mèo Anh lông
                ngắn/ Anh lông dài thuần chủng. Hỗ trợ nhập khẩu mèo từ các thị
                trường uy tín trên thế giới như Nga, Anh, Thái và Qatar. Các bé
                mèo với nhiều màu sắc khác nhau luôn có sẵn tại Cathouse
              </p>
              <ul>
                <li>Mèo Anh lông ngắn xám xanh, Bicolor, Lilac</li>
                <li>Mèo Anh lông ngắn Silver, Golden, Tabby </li>
                <li>Mèo Anh lông ngắn tai cụp, Mèo Anh chân ngắn </li>
              </ul>
              <button onClick={() => navigate("/collections/Mèo")}>
                Xem chi tiết
              </button>
            </div>
          </div>

          <div className="other-infor-column column2">
            <div className="other-infor-content">
              <h4>CÁC MẢNG KINH DOANH TẠI CATHOUSE </h4>
              <p>
                Không chỉ cung cấp và chuyên về Mèo Anh Lông Ngắn, Cathouse còn
                đa dạng loại hình kinh doanh và dịch vụ để cung cấp cho các
                khách hàng nuôi thú cưng chó/mèo. Các loại hình kinh doanh bao
                gồm:{" "}
              </p>
              <ul>
                <li>Cung cấp thức ăn phụ kiện, vệ sinh & chăm sóc sức khoẻ </li>
                <li>Grooming&Spa tắm vệ sinh và cắt tỉa thú cưng chó mèo </li>
                <li>Hotel - Dịch vụ lưu trú thú cưng chó mèo trong phòng </li>
              </ul>
              <button onClick={() => navigate("/collections/Mèo")}>
                Xem thêm
              </button>
            </div>
            <div className="other-infor-image">
              <div className="behide-image"></div>
              <img src="https://theme.hstatic.net/200000108863/1000985860/14/about02_alternate_2_img.jpg?v=3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
