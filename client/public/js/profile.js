// Highlight navbar active link
document.querySelectorAll(".navbar-item a").forEach((link) => {
  if (window.location.href.includes(link.getAttribute("href"))) {
    link.style.backgroundColor = "#cc0000";
    link.style.color = "#fff";
  }
});

// Log out confirmation
const logoutBtn = document.querySelector(".logout-btn");
logoutBtn?.addEventListener("click", (e) => {
  if (!confirm("Are you sure you want to log out?")) {
    e.preventDefault();
  }
});

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

window.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    alert("Token yo‘q, iltimos login qiling");
    return (window.location.href = "register.html");
  }

  try {
    const response = await fetch("http://localhost:3000/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_Refresh: `Bearer ${refreshToken}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Xatolik:", errorData.message);
      // localStorage.clear();
      // return (window.location.href = "register.html");
    }

    const newAccess = response.headers.get("x-access-token");
    const newRefresh = response.headers.get("x-refresh-token");
    if (newAccess) localStorage.setItem("accessToken", newAccess);
    if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

    const data = await response.json();

    // 👤 Устанавливаем данные профиля
    document.querySelector(".profile-name").textContent = data.name;
    document.querySelector(".profile-img").src = `http://localhost:3000/uploads/images/${data.imageUrl}`;
    document.querySelector(".profile-email").textContent = data.email;

    // 👀 Убираем .courses если не teacher
    // if (data.role === "user") {
    //   document.querySelector(".courses").style.display = "none";
    //   return;
    // }

    // 🧠 Рендер курсов
    const coursesContainer = document.querySelector(".courses");
    coursesContainer.innerHTML = "";

    data.courses.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";

      const swiperHTML = `
        <div class="img-videos-div">
          <div class="swiper">
            <div class="swiper-wrapper">
              ${course.imgs.map(img => `
                <div class="swiper-slide">
                  <img src="http://localhost:3000/uploads/images/${img}" alt="Course image">
                </div>`).join("")}
              ${course.videos.map(video => `
                <div class="swiper-slide">
                  <video controls width="100%">
                    <source src="http://localhost:3000/uploads/videos/${video}" type="video/mp4">
                  </video>
                </div>`).join("")}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      `;

      courseDiv.innerHTML = `
        ${swiperHTML}
        <h2>${course.title}</h2>
        <p>${course.content}</p>
        <p><strong>Категории:</strong> ${course.categoryies_names.join(", ")}</p>
        <p><strong>Контакт:</strong> ${course.link_or_number}</p>
        <span class="likes-count"><i class="fa-solid fa-heart"></i> ${course.like_count}</span>
      `;

      coursesContainer.appendChild(courseDiv);

      new Swiper(courseDiv.querySelector(".swiper"), {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: courseDiv.querySelector(".swiper-button-next"),
          prevEl: courseDiv.querySelector(".swiper-button-prev"),
        },
        pagination: {
          el: courseDiv.querySelector(".swiper-pagination"),
          clickable: true,
        },
      });
    });

  } catch (err) {
    console.error("Tarmoq xatosi:", err);
    // localStorage.clear();
    // window.location.href = "register.html";
  }
});
