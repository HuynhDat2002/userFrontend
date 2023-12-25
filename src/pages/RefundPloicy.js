import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const RefundPolicy = () => {
  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Refund Policy</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt odio et quam varius, a faucibus eros fringilla.
                Suspendisse potenti.
              </p>
              <p>
                Vestibulum sit amet tristique elit. Sed id justo ac diam
                finibus consequat. Suspendisse vel sem eu urna rutrum efficitur
                a eget justo.
              </p>
              {/* Thêm nội dung khác tùy thuộc vào chính sách hoàn trả của bạn */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPolicy;