class User {
  constructor(username, firstName, lastName, email, password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.#password = password;
  }
  #password;
  get password() {
    return this.#password;
  }
  set password(newPassword) {
    this.#password = newPassword;
  }
  setPassword(newPassword) {
    this.password = newPassword;
  }
  getUsername() {
    return this.username;
  }
  getEmail() {
    return this.email;
  }
  #getName() {
    return this.name;
  }
  updateProfile(firstName, lastName, email, password) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (email) this.email = email;
    if (password) this.password = password;
  }
}

class Admin extends User {
  constructor(username, firstName, lastName, email, password) {
    super(username, firstName, lastName, email, password);
  }

  deleteUser(users, username) {
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }

  listUsers(users) {
    return users.map(user => ({
      username: user.username,
      email: user.email
    }));
  }
}

let users = [];
let have_user = null;
const admin = new Admin('admin', 'Admin', 'Admin', 'admin@e.com', 'admin');

function showAdminPanel() {
  const adminPanel = document.getElementById('admin-panel');
  const userTableBody = document.querySelector('#user-table tbody');
  adminPanel.style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('user-dashboard').style.display = 'none';
  userTableBody.innerHTML = '';

  admin.listUsers(users).forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button onclick="deleteUser(${index})">Delete</button></td>
    `;
    userTableBody.appendChild(row);
  });
}

function deleteUser(index) {
  const usernameToDelete = users[index].username;
  admin.deleteUser(users, usernameToDelete);
  showAdminPanel();
  console.log(users)
}

function showLogin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
}

function myFunction() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
}

function showSignUp() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (username === admin.username && password === admin.password) {
    showAdminPanel();
  } else {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      have_user = user;
      showUserDashboard(user);
    } else {
      alert('Nik yoki parol xato!');
    }
  }
}

function signUp() {
  const username = document.getElementById('signup-username').value;
  const firstName = document.getElementById('signup-first-name').value;
  const lastName = document.getElementById('signup-last-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const nik_have = users.find(user => user.username === username);
  if (nik_have) {
    alert('Nik allaqachon band');
    return;
  }

  if (password === confirmPassword) {
    const newUser = new User(username, firstName, lastName, email, password);
    users.push(newUser);
    alert('Hisob yaratildi');
    showLogin();
    console.log(users)
  } else {
    alert('Parol mos kelmadi');
  }
}

function showUserDashboard(user) {
  document.getElementById('user-dashboard').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('edit-form').style.display = 'none';
  document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('user-email').textContent = user.email;
}

function editProfile() {
  document.getElementById('edit-form').style.display = 'block';
  document.getElementById('user-dashboard').style.display = 'none';
  document.getElementById('edit-first-name').value = have_user.firstName;
  document.getElementById('edit-last-name').value = have_user.lastName;
  document.getElementById('edit-email').value = have_user.email;
  document.getElementById('edit-password').value = have_user.password;
  
}

function saveProfileChanges() {
  const newFirstName = document.getElementById('edit-first-name').value;
  const newLastName = document.getElementById('edit-last-name').value;
  const newEmail = document.getElementById('edit-email').value;
  const newPassword = document.getElementById('edit-password').value;
  have_user.updateProfile(newFirstName, newLastName, newEmail, newPassword);
  showUserDashboard(have_user);
  console.log(users)
}

function cancelEditProfile() {
  showUserDashboard(have_user);
}

function logout() {
  have_user = null;
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('user-dashboard').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'none';
}

function deleteAccount() {
  users = users.filter(user => user !== have_user);
  logout();
  console.log(users)
}
