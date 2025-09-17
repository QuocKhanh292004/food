document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("about-us-container");

  if (!contentContainer) {
    console.error("Lỗi: Không tìm thấy phần tử có ID 'about-us-container'.");
    return;
  }

  fetch("aboutdeco.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      contentContainer.innerHTML = html;

      // This is the crucial step: initialize AOS after the content is loaded
      if (typeof AOS !== "undefined") {
        // Use setTimeout to ensure AOS runs after the browser renders the new HTML
        setTimeout(() => {
          AOS.init();
          AOS.refreshHard(); // Refresh AOS to pick up new elements
        }, 100); // 100ms is usually enough
      } else {
        console.error("Lỗi: Thư viện AOS chưa được tải.");
      }
    })
    .catch((error) => console.error("Lỗi khi tải nội dung:", error));
});
