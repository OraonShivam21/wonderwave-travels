

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', submitForm);

function submitForm() {
  var usernameOrEmail = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var errorBox = document.getElementById('errorBox');
  errorBox.textContent = '';

  if (!isValidUsernameOrEmail(usernameOrEmail) || password === '') {
    showError('Valid username or email and password are required');
  } else {
    authenticateUser(usernameOrEmail, password);
  }
}

async function authenticateUser(usernameOrEmail, password) {
  const Url = 'https://wonderwave-api.onrender.com/users';

  try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const users = await response.json();
    const user = users.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password);

    if (user) {
      showSuccess('Login successful!');
      if(user.role === "admin")
        window.location.replace("../../admin/admin-packages/index.html");
      else if(user.role === "user")
        window.location.replace("../../index.html");
    } else {
      showError('Invalid username or email or password');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('Something went wrong. Please try again later.');
  }
}

function isValidUsernameOrEmail(usernameOrEmail) {
  return usernameOrEmail.trim() !== '';
}

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

//===============================================================================

//     var submitBtn = document.getElementById('submitBtn');
//     submitBtn.addEventListener('click', submitForm);
  
  
//   function submitForm() {
//     var username = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     var errorBox = document.getElementById('errorBox');
//     errorBox.textContent = '';
  
//     if (username === '' || password === '') {
//       showError('Username and password are required');
//     } else {
//       // Call the backend authentication endpoint
//       authenticateUser(username, password);
//     }
//   }
  
//   async function authenticateUser(username, password) {
//     const mockApiUrl = 'https://wonderwave-api.onrender.com/users';
  
//     try {
//       const response = await fetch(mockApiUrl);
//       if (!response.ok) {
//         throw new Error('Failed to fetch user data');
//       }
  
//       const users = await response.json();
//       const user = users.find(u => u.username === username && u.password === password);
  
//       if (user) {
//         showSuccess('Login successful!');
//       } else {
//         showError('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       showError('Something went wrong. Please try again later.');
//     }
//   }
  
//   function showError(message) {
//     var errorBox = document.getElementById('errorBox');
//     errorBox.textContent = message;
//     errorBox.style.display = 'block';
//   }
  
//   function showSuccess(message) {
//     var errorBox = document.getElementById('errorBox');
//     errorBox.textContent = message;
//     errorBox.style.backgroundColor = '#ccffcc';
//     errorBox.style.color = '#008000';
//     errorBox.style.display = 'block';
//   }
