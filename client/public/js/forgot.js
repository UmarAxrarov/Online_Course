const e_form = document.querySelector(".e-form");
const f_form = document.querySelector(".f-form");
e_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();

  const response = await fetch("http://localhost:3000/auth/email", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      e_form.classList.add("hidden");
      f_form.classList.remove("hidden");
    }
  } else {
    console.error("Xatolik:", response.statusText);
  }
});

f_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = e.target.token.value.trim();
  const password = e.target.password.value.trim();
  const response = await fetch("http://localhost:3000/auth/forgotpassword", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await response.json();
  if (data.success) {
    window.location.href = "register.html";
  }
});
