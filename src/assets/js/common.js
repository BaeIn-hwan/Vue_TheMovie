/*
  script에서 assets에 있는 이미지 접근하려면 require()로 감싸서 접근하면 됨
*/

const common = {
  imgError(e, src) {
    e.target.src = src || require("@/assets/images/common/img_comm_no-image.jpg");
  },
};

export default common