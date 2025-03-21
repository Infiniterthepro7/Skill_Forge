const form = document.getElementById("promptForm");
const input = document.getElementById("promptInput");
const responseText = document.getElementById("responseText");
const loading = document.getElementById("loading");
const darkModeToggle = document.getElementById("darkModeToggle");
const copyButton = document.getElementById("copyButton");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) return;

  loading.classList.remove("hidden");
  responseText.textContent = "";

  try {
    const response = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    showToast("Error occurred while fetching the response");
  } finally {
    loading.classList.add("hidden");
    input.value = "";
  }
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkModeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Copy Response
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(responseText.textContent).then(() => {
    showToast("Response copied to clipboard!");
  });
});

// Toast Notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
