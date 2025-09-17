document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("menu-deco");

  if (!contentContainer) {
    console.error("Lỗi: Không tìm thấy phần tử có ID 'about-us-container'.");
    return;
  }

  fetch("menuDeco.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      contentContainer.innerHTML = html;

      if (typeof AOS !== "undefined") {
        setTimeout(() => {
          AOS.init();
          AOS.refreshHard();
        }, 100);
        h;
      } else {
        console.error("Lỗi: Thư viện AOS chưa được tải.");
      }
    })
    .catch((error) => console.error("Lỗi khi tải nội dung:", error));
});
