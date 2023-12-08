const btn = document.getElementById('btn');
const image = document.getElementById('image');
const select = document.getElementById('breed-list');

// Vừa load trang phải gọi API để render danh sách breed
// API : https://dog.ceo/api/breeds/list/all

async function getBreedList() {
    // Gọi API để lấy danh sách giống loài
    let res = await axios.get("https://dog.ceo/api/breeds/list/all")

    // Sau khi có data thì hiển thị kết quả trên giao diện
    renderBreed(res.data.message)
}

function renderBreed(breeds) {
     // Xóa tất cả các option cũ trong select
     select.innerHTML = "";

     // Duyệt qua object breeds và tạo thẻ option
     for (let breed in breeds) {
         // Tạo một thẻ option
         let option = document.createElement('option');
         // Gán giá trị và innerHTML của option
         option.value = breed;
         option.innerHTML = breed;
         // Thêm option vào select
         select.appendChild(option);
     }
 
     // Lắng nghe sự kiện change trên phần tử select
     select.addEventListener('change', function () {
         // Gọi hàm để hiển thị hình ảnh của giống loài khi chọn
         getBreedImage(select.value);
     });
 }
 
 async function getBreedImage(breed) {
     try {
         // Gọi API để lấy hình ảnh của giống loài
         let res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
         // Hiển thị hình ảnh trên giao diện
         image.src = res.data.message;
     } catch (error) {
         console.error(`Error fetching image for breed ${breed}:`, error);
     }
 }
 getBreedList();