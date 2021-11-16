const common = {
  imgError(e, src) {
    e.target.src = src || `${process.env.BASE_URL}images/common/img_comm_no-image.jpg`;
  },
};

export default common