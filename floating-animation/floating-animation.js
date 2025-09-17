window.onload = () => {
  // Lấy tất cả các hình ảnh đồ ăn có class 'intro-img img' hoặc bất kỳ class nào bạn muốn
  const foodImages = document.querySelectorAll(".intro-img img,.about-img");

  // Kiểm tra xem các phần tử có tồn tại không
  if (foodImages.length > 0) {
    foodImages.forEach((img) => {
      gsap.to(img, {
        y: -10, // Dịch chuyển lên 10px
        ease: "sine.inOut", // Kiểu chuyển động mượt mà
        duration: 0.9, // Thời gian hiệu ứng là 2 giây
        repeat: -1, // Lặp lại vô hạn
        yoyo: true, // Quay trở lại vị trí ban đầu
      });
    });
  }
};
