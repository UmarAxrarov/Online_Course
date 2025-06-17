const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const googleBtnRegister = document.querySelector(".google-btn-register");
const googleBtnLogin = document.querySelector(".google-btn-login");

const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

googleBtnRegister.addEventListener("click", () => {
  console.log("+G")
  localStorage.setItem("is_register", "true");
  window.location.href = "http://localhost:3000/auth/google";
});

googleBtnLogin.addEventListener("click", () => {
  localStorage.setItem("is_register", "false");
  window.location.href = "http://localhost:3000/auth/google";
});

function parseJwt(token) {
  try {
    return JSON.parse(token);
  } catch (e) {
    return null;
  }
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const is_register = localStorage.getItem("is_register");

  if (token) {
    const userData = parseJwt(token);
    if (userData) {
      if (is_register === "true") {
        container.classList.add("right-panel-active");
        registerForm.querySelector("input[name='name']").value = userData.name || "";
        registerForm.querySelector("input[name='email']").value = userData.email || "";
      } else {
        container.classList.remove("right-panel-active"); // Login formga o'tish
        loginForm.querySelector("input[name='email']").value = userData.email || "";
      }
    }
  }
});

const register_form = document.querySelector(".register-form");
register_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = {};
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  obj.name = name;
  obj.email = email;
  obj.password = password;
  console.log(obj);

  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  console.log(data);

});
const login_form = document.querySelector(".login-form");

login_form.addEventListener("submit", async (e) => {
  console.log("Bu kod chiqdi")
  e.preventDefault();
  const obj = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    console.log(data);

    // ✅ Agar backenddan client va tokens qaytsa
    if (data.tokens && data.client) {
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      // Istalgan sahifaga yo'naltirish
      window.location.href = "profile.html";
    } else {
      alert("Login xatolik bilan yakunlandi ❌");
    }

  } catch (err) {
    console.error("Login error: ", err);
  }
});
