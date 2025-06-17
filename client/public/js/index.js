import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let currentPage = 1;
const limit = 3;

async function loadCourses(page = 1, sortField = "id", sortOrder = "asc") {
  try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
    const query = `?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;
    const res = await fetch(`http://localhost:3000/course${query}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_Refresh: `Bearer ${refreshToken}`,
      },
    });
    
    const courses = await res.json();

    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    courses.forEach((course) => {
      const teacher = course.teacher;
      const quiz = course.quizzes?.[0];
      const imgUrl = quiz?.imgs?.[0] || "";
      const audioUrl = quiz?.audios?.[0] || "";

      const swiperId = `swiper-${course.id}`;
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      const swiperHTML = `
        <div class="img-videos-div">
          <div class="swiper" id="${swiperId}">
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
      <div class="teacher-info">
      <img src="http://localhost:3000/uploads/images/${teacher?.imageUrl || ""}" class="teacher-img" />
      <h2 class="teacher-name">${teacher?.name || "No name"}</h2>
      </div>
      ${swiperHTML}
      <h2>${course.title}</h2>
      <p>${course.content}</p>
      <p><strong>Категории:</strong> ${course.categoryies_names.join(", ")}</p>
      <p><strong>Контакт:</strong> ${course.link_or_number}</p>
      <span class="likes-count"><i class="fa-solid fa-heart"></i> ${course.like_count}</span>
      
      <div class="quizz-div">
      <img src="http://localhost:3000/uploads/images/${imgUrl}" class="quizz-img" />
      <h2 class="quizz-title">${quiz?.title || "Без названия"}</h2>
      <p class="quizz-text">${quiz?.description || ""}</p>
      <audio src="http://localhost:3000/uploads/audios/${audioUrl}" controls class="quizz-audio"></audio>
      </div>
      
      <div class="question-div">
      ${quiz?.questions?.map((q, i) => `
        <label>
        <input type="radio" class="qusetion-input" name="q-${course.id}" />
        ${i + 1} Вариант ${q.content}
        </label>
        `).join("") || ""}
        </div>
        
        <div class="course-messages-div">
        <button class="toggle-message"><i class="fa-regular fa-message"></i></button>
        <div class="message-div" style="display: none;">
        <div class="messages">
            <div class="message">            
            <img src="http://localhost:3000/uploads/images/${course.comments?.[0]?.client?.imageUrl || ""}" class="message-img" />
            <p class="message-text">${course.comments?.[0]?.content || ""}</p>
            </div>
        </div>
            <div class="send-message">
            <form method="post" class="send-form">
                <input type="text" name="content">
                <button type="submit">send</button>
              </form>
              </div>
              </div>
              </div>
              
              <div class="likes-and-info-teacher">
              <a href="tel:+998" class="teacher-tel">0000</a>
              <a href="mailto:" class="teacher-tel">teacher email</a>
              <div class="like-div"><i class="fa-regular fa-thumbs-up"></i></div>
              </div>
              `;
              
              container.appendChild(courseDiv);
              courseDiv.setAttribute("id",course.id);
              // ✅ Swiper инициализация после вставки в DOM
              const swiperEl = document.getElementById(swiperId);
              new Swiper(swiperEl, {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                  nextEl: swiperEl.querySelector(".swiper-button-next"),
          prevEl: swiperEl.querySelector(".swiper-button-prev"),
        },
        pagination: {
          el: swiperEl.querySelector(".swiper-pagination"),
          clickable: true,
        },
      });
      
    });
     document.querySelectorAll(".send-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const courseDiv = form.closest(".course"); 
    const courseId = courseDiv?.id?.replace("course-", "");

    // 2. Берем данные из input
    const content = e.target.content.value;

    // 3. Проверяем токены (должны быть где-то сохранены заранее)
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 4. Собираем и отправляем форму
    const formData = new FormData();
    formData.append("content", content);
    
   const response = await fetch(`http://localhost:3000/comment/create/${courseId}`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Authorization_Refresh: `Bearer ${refreshToken}`
  },
  body: formData
});


    const result = await response.json();
    console.log("Ответ сервера:", result);
  });
});

    setUpListeners();
    renderPagination();

  } catch (err) {
    console.error("Ошибка при загрузке курсов:", err);
  }
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const maxPages = 5;
  for (let i = 1; i <= maxPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn";
    btn.style.padding = "8px 12px";
    btn.style.borderRadius = "5px";
    btn.style.border = "1px solid #cc0000";
    btn.style.background = i === currentPage ? "#cc0000" : "#fff";
    btn.style.color = i === currentPage ? "#fff" : "#cc0000";
    btn.addEventListener("click", () => {
      currentPage = i;
      loadCourses(currentPage);
    });
    pagination.appendChild(btn);
  }
}

function setUpListeners() {
  document.querySelectorAll(".toggle-message").forEach((btn) => {
    btn.addEventListener("click", () => {
      const msg = btn.nextElementSibling;
      msg.style.display = msg.style.display === "flex" ? "none" : "flex";
    });
  });

  document.querySelectorAll(".like-div").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("liked");
    });
  });

  document.querySelectorAll(".qusetion-input").forEach((input, index) => {
    input.addEventListener("click", () => {
      console.log(`Выбран ответ #${index + 1}`);
    });
  });
}

loadCourses(); // запустить при загрузке страницы