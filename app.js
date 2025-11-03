async function loadPosts() {
  try {
    const res = await fetch("posts.json");
    const posts = await res.json();
    renderPosts(posts);
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

function renderPosts(posts) {
  const feed = document.querySelector(".feed");
  feed.innerHTML = "<h2>Recent Posts</h2>";

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post");
    article.innerHTML = `
      <header class="post-header">
        <div class="post-author">
          <img src="${post.author.avatar}" alt="${post.author.name}" class="author-avatar" />
          <div class="author-info">
            <strong>${post.author.name}</strong><br>
            <small>${post.author.email}</small>
          </div>
        </div>
        <time datetime="${post.createdAt}">
          ${new Date(post.createdAt).toLocaleDateString()}
        </time>
      </header>

      <div class="post-content">
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
        <h3>${post.title}</h3>
        <p>${post.body || ""}</p>
      </div>
    `;
    feed.appendChild(article);
  });
}

function setupHeaderDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  if (!dropdown) return;

  const button = dropdown.querySelector(".dropbtn");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
}

function setupLogout() {
  const logoutLink = document.getElementById("logoutBtn");
  if (!logoutLink) return;

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = document.getElementById("profileDropdown");
    dropdown.classList.remove("show");
    window.location.href = "login.html"; 
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeaderDropdown();
  loadPosts();
  setupLogout();
});