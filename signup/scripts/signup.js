// var submitBtn = document.getElementById('submitBtn');
// submitBtn.addEventListener('click', submitForm);

// function submitForm() {
//   var usernameOrEmail = document.getElementById('email').value;
//   var password = document.getElementById('password').value;
//   var errorBox = document.getElementById('errorBox');
//   errorBox.textContent = '';

//   if (!isValidUsernameOrEmail(usernameOrEmail) || password === '') {
//     showError('Valid username or email and password are required');
//   } else {
//     authenticateUser(usernameOrEmail, password);
//   }
// }

// async function authenticateUser(usernameOrEmail, password) {
//   const Url = 'https://wonderwave-api.onrender.com/users';

//   try {
//     const response = await fetch(Url);
//     if (!response.ok) {
//       throw new Error('Failed to fetch user data');
//     }

//     const users = await response.json();
//     const user = users.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password);

//     if (user) {
//       showSuccess('Login successful!');
//     } else {
//       showError('Invalid username or email or password');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     showError('Something went wrong. Please try again later.');
//   }
// }

// function isValidUsernameOrEmail(usernameOrEmail) {
//   return usernameOrEmail.trim() !== '';
// }

// function showError(message) {
//   var errorBox = document.getElementById('errorBox');
//   errorBox.textContent = message;
//   errorBox.style.display = 'block';
// }

// function showSuccess(message) {
//   var errorBox = document.getElementById('errorBox');
//   errorBox.textContent = message;
//   errorBox.style.backgroundColor = '#ccffcc';
//   errorBox.style.color = '#008000';
//   errorBox.style.display = 'block';
// }

//===============================================================================



  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', signUp);


async function signUp() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var userName = document.getElementById('userName').value;
  var password = document.getElementById('password').value;
  var errorBox = document.getElementById('errorBox');
  errorBox.textContent = '';


  if (name==="" || email==="" || userName==="" || password === '') {
    showError('Please fill in all fields with valid information');
  } else {
    try {

      const response = await fetch('https://wonderwave-api.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          email: email,
          role: 'user', 
        }),

      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      showSuccess('User added successfully!');
      window.location.replace("../../login/login.html");
    } catch (error) {
      console.error('Error:', error);
      showError('Failed to add user. Please try again later.');
    }
  }
}

// Validation functions
// function isValidName(name) {
//   return name.trim() !== '';
// }

// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function isValidUserName(userName) {
//   return userName.trim() !== '';
// }

function showError(message) {
  var errorBox = document.getElementById('errorBox');
  errorBox.textContent = message;
  errorBox.style.display = 'block';
}

function showSuccess(message) {
  var errorBox = document.getElementById('errorBox');
  errorBox.textContent = message;
  errorBox.style.backgroundColor = '#ccffcc';
  errorBox.style.color = '#008000';
  errorBox.style.display = 'block';
}
