async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await apiRequest("/auth/login", "POST", {
    email,
    password
  });

  if (data.success) {
    localStorage.setItem("token", data.object.token);
    alert("Login successful!");

    // Redirect to index.html after login
    window.location.href = "index.html";
  } else {
    alert(data.message || "Login failed");
  }
}

