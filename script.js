const correctPassword = "Tatenda"; // change this

function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input === correctPassword) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  } else {
    alert("Wrong password");
  }
}




let posts = JSON.parse(localStorage.getItem("posts")) || [];

function displayPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "<h2>Posts</h2>";

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" width="200">` : ""}
    `;

    postsContainer.appendChild(postDiv);
  });
}

function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageInput = document.getElementById("image");

  if (title === "" || content === "") {
    alert("Please fill in all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const newPost = {
      title,
      content,
      image: reader.result // base64 image
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }

  // clear inputs
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  imageInput.value = "";
}

// load posts
displayPosts();