const common = {
  imgError(e, src) {
    e.target.src = src || `../images/common/img_comm_no-image.jpg`;
  },
};

export default common