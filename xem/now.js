document.addEventListener("DOMContentLoaded", function() {
    const studentList = document.getElementById("students");
    const studentForm = document.getElementById("studentForm");

    // Mảng lưu trữ danh sách học sinh
    let students = [];

    // Hiển thị danh sách học sinh khi trang được tải
    displayStudents();

    // Thêm sự kiện submit cho biểu mẫu
    studentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const grade = parseInt(document.getElementById("grade").value);

        // Thêm học sinh vào danh sách
        addStudent(fullName, grade);

        // Reset biểu mẫu sau khi thêm học sinh
        studentForm.reset();
    });

    // Hàm thêm học sinh vào danh sách
    function addStudent(fullName, grade) {
        const student = { fullName, grade };
        students.push(student);
        displayStudents();
    }

    // Hàm hiển thị danh sách học sinh
    function displayStudents() {
        studentList.innerHTML = "";
        students.forEach(function(student) {
            const li = document.createElement("li");
            li.textContent = `${student.fullName} - Khối ${student.grade}`;
            studentList.appendChild(li);
        });
    }
});
