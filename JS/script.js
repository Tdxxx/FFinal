document.addEventListener('DOMContentLoaded', () => {
  // SIGN UP LOGIC
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const rememberMe = document.getElementById('rememberMeSignup').checked;

      const userData = { name, email, password };

      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.removeItem('rememberedUser');
      }

      alert('Sign up successful! Redirecting to Sign In page.');
      window.location.href = 'signin.html';
    });
  }

  // SIGN IN LOGIC
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      document.getElementById('signinEmail').value = user.email;
      document.getElementById('signinPassword').value = user.password;
      document.getElementById('rememberMeSignin').checked = true;
    }

    signinForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('signinEmail').value;
      const password = document.getElementById('signinPassword').value;
      const rememberMe = document.getElementById('rememberMeSignin').checked;

      let storedUser = null;
      const remembered = localStorage.getItem('rememberedUser');
      if (remembered) {
        storedUser = JSON.parse(remembered);
      } else {
        const sessionUser = sessionStorage.getItem('currentUser');
        if (sessionUser) {
          storedUser = JSON.parse(sessionUser);
        }
      }

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify(storedUser));
          sessionStorage.removeItem('currentUser');
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(storedUser));
          localStorage.removeItem('rememberedUser');
        }
        alert('Sign in successful! Redirecting to landing page.');
        window.location.href = 'Home.html';
      } else {
        alert('Invalid email or password. Please try again or sign up.');
      }
    });
  }

  // BURGER MENU TOGGLE LOGIC
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.nav-list');

  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }
});

const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
  true
);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const meal = data.meals[2];
    document.getElementById("meal-name").textContent = meal.strMeal;
    document.getElementById("meal-img").src = meal.strMealThumb;
    document.getElementById("meal-img").alt = meal.strMeal;
  }
};
xhr.send();

//----------------------------------------------------2

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    const list = document.getElementById("company-list");
    data.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.company.name;
      list.appendChild(li);
    });
  });
