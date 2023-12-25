import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Chính sách bảo mật"} />
      <BreadCrumb title="Chính sách bảo mật" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Chính sách bảo mật</h2>
              <p>
                Chào mừng bạn đến với trang Chính sách bảo mật của chúng tôi.
                Dưới đây là những thông tin chúng tôi thu thập và cách chúng tôi
                sử dụng chúng.
              </p>
              <h3>1. Thu thập thông tin</h3>
              <p>
                Chúng tôi có thể thu thập các thông tin cá nhân từ bạn khi bạn
                đăng ký tài khoản, điền vào mẫu, hoặc gửi liên lạc với chúng
                tôi.
              </p>
              <h3>2. Sử dụng thông tin</h3>
              <p>
                Thông tin bạn cung cấp sẽ được sử dụng để cung cấp các dịch
                vụ và cải thiện trải nghiệm của bạn trên trang web của chúng
                tôi.
              </p>
              {/* Thêm các phần tử HTML và nội dung khác tùy thuộc vào nhu cầu của bạn */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;