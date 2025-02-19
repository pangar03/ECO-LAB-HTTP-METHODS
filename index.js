// document.getElementById("fetch-button").addEventListener("click", fetchData);

// async function fetchData() {
//   try {
//     const response = await fetch("http://localhost:3004/posts");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

const formContainer = document.getElementById("form-container");
const postsContainer = document.getElementById("posts-container");

const creationForm = document.getElementById("post-form");
const fetchButton = document.getElementById("fetch-button");

const createButton = document.getElementById("create-btn");
const postsList = document.getElementById("posts-container__post-list");

const renderPosts = (posts) => {
  console.log(posts);

  formContainer.style.display = "none";
  postsContainer.style.display = "block";

  postsList.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.classList.add("item-container");
    postItem.innerHTML = `
      <div class="post-item">
        <img src="${post.imageUrl}" alt="post-image" class="post-item__image">
        <h2 class="post-item__title">${post.title}</h2>
        <p class="post-item__description">${post.body}</p>
        <button id="post-item__delete-btn">Delete</button>
      </div>
    `;

    const deleteBtn = postItem.querySelector("#post-item__delete-btn");
    deleteBtn.addEventListener("click", async (e) => {
      try {
        const res = await fetch(`http://localhost:3004/posts/${post.id}`, {
          method: "DELETE",
        });

        if(!res.ok) {
          throw new Error("Network response was not ok");
        }

        postItem.remove();

      } catch (error) {
        console.log(error);
      }
    });

    postsList.appendChild(postItem);
  });
}

creationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const image = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const post = {
    title,
    body: description,
    imageUrl: image,
  };

  try {
    const res = await fetch("http://localhost:3004/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if(!res.ok) {
      throw new Error("Network response was not ok");
    }

    alert("Post created successfully");
  } catch (error) {
    console.log(error);
  }
});

fetchButton.addEventListener("click", async (e) => {
  try {
    const res = await fetch("http://localhost:3004/posts");
    if(!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    renderPosts(data);
  } catch (error) {
    console.log(error);
  }
});

createButton.addEventListener("click", (e) => {
  formContainer.style.display = "block";
  postsContainer.style.display = "none";
});