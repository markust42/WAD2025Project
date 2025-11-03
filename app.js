async function loadPosts() {
  const url = "https://api.jsonsilo.com/public/df16c32d-5078-4b92-b1c2-4a4c4be54e65";
  const jsonFile = "posts.json"
  try {
    // [+] The line below can be used to fetch from the jsonsilo blob storage
    // const response = await fetch(url);

    const response = await fetch(jsonFile);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    
    const posts = await response.json();
    renderPosts(posts);
  } catch (err) {
    console.error(err.message);
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