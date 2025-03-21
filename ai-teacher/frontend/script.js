// ===== Elements =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const registerConfirmPasswordInput = document.getElementById("registerConfirmPassword");
const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");
const promptForm = document.getElementById("promptForm");
const promptInput = document.getElementById("promptInput");
const responseText = document.getElementById("responseText");
const loading = document.getElementById("loading");
const darkModeToggle = document.getElementById("darkModeToggle");
const copyButton = document.getElementById("copyButton");
const logoutButton = document.getElementById("logoutButton");
const progressSection = document.getElementById("progressSection");
const progressText = document.getElementById("progressText");

// ===== Helper Functions =====

// Save token to local storage
function saveToken(token) {
  localStorage.setItem("authToken", token);
}

// Retrieve token from local storage
function getToken() {
  return localStorage.getItem("authToken");
}

// Remove token from local storage
function removeToken() {
  localStorage.removeItem("authToken");
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Toggle visibility of elements based on authentication status
function updateUIBasedOnAuth() {
  const token = getToken();
  const isAuthenticated = !!token;

  if (loginForm) loginForm.style.display = isAuthenticated ? "none" : "block";
  if (registerForm) registerForm.style.display = isAuthenticated ? "none" : "block";
  if (promptForm) promptForm.style.display = isAuthenticated ? "block" : "none";
  if (logoutButton) logoutButton.style.display = isAuthenticated ? "block" : "none";
  if (progressSection) progressSection.style.display = isAuthenticated ? "block" : "none";

  if (isAuthenticated) {
    fetchUserProgress();
  }
}

// Fetch user progress
async function fetchUserProgress() {
  const token = getToken();
  if (!token) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/progress", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch progress");

    const data = await response.json();
    progressText.textContent = `Progress: ${data.progress}`;
  } catch (error) {
    console.error("Error fetching progress:", error);
    showToast("Error fetching progress.");
  }
}

// ===== Event Listeners =====

// Login Form Submission
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);
        loginMessage.textContent = "Login successful!";
        showToast("Login successful!");
        updateUIBasedOnAuth();
      } else {
        loginMessage.textContent = data.detail || "Login failed.";
        showToast("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      loginMessage.textContent = "Login failed due to network error.";
      showToast("Login failed.");
    }
  });
}

// Registration Form Submission
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = registerUsernameInput.value;
    const password = registerPasswordInput.value;
    const confirmPassword = registerConfirmPasswordInput.value;

    if (password !== confirmPassword) {
      registerMessage.textContent = "Passwords do not match.";
      showToast("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        registerMessage.textContent = "Registration successful! Please log in.";
        showToast("Registration successful!");
        registerForm.reset();
      } else {
        registerMessage.textContent = data.detail || "Registration failed.";
        showToast("Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      registerMessage.textContent = "Registration failed due to network error.";
      showToast("Registration failed.");
    }
  });
}

// Prompt Form Submission
if (promptForm) {
  promptForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = promptInput.value.trim();
    if (!prompt) return;

    const token = getToken();
    if (!token) {
      showToast("Please log in to ask a question.");
      return;
    }

    loading.classList.remove("hidden");
    responseText.textContent = "";
    copyButton.classList.add("hidden");

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      responseText.textContent = data.response;
      showToast("Response received successfully!");
      copyButton.classList.remove("hidden");
    } catch (err) {
      console.error(err);
      responseText.textContent = "Error occurred while fetching the response.";
      showToast("Error occurred while fetching the response.");
    } finally {
      loading.classList.add("hidden");
      promptInput.value = "";
    }
  });
}

// Dark Mode Toggle
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeToggle.textContent = document.body.classList.contains("dark")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  });
}
 
