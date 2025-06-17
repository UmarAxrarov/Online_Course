document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    alert("Token yo‘q, iltimos login qiling");
    return (window.location.href = "login.html");
  }

  let userId;
  try {
    const res = await fetch("http://localhost:3000/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_Refresh: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) throw new Error("Token invalid or expired");

    const userData = await res.json();
    userId = userData.id;
  } catch (err) {
    console.error("Не удалось получить пользователя:", err);
    alert("Сессия истекла. Войдите заново.");
    return (window.location.href = "login.html");
  }

  const form = e.target;
  const formData = new FormData();
  formData.append("title", form.title.value);
  formData.append("content", form.content.value);
  formData.append("categories_names", form.categories_names.value);
  formData.append("link_or_number", form.link_or_number.value);

  for (const img of form.images.files) {
    formData.append("images", img);
  }
  for (const video of form.videos.files) {
    formData.append("videos", video);
  }

  try {
    const response = await fetch(`http://localhost:3000/course/create/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_Refresh: `Bearer ${refreshToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("responseText").innerText = "✅ Курс создан!";
    } else {
      document.getElementById("responseText").innerText = "❌ Ошибка: " + result.message;
    }

  } catch (err) {
    console.error("Ошибка при отправке формы:", err);
    document.getElementById("responseText").innerText = "❌ Ошибка создания курса.";
  }
});
