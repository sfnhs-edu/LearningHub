// STUDENT ACCOUNTS: ID : Name
const validStudents = {
  "01020304": "Juan Dela Cruz",
  "05060708": "Maria Makiling",
  "09080706": "Jose Rosal",
  "05040302": "Ernesto Dela Cruz",
};

// ADMIN ACCOUNTS
const adminAccounts = {
  "06211993": "kuramog25",
  "02092006": "JhnRy@1437"
};

function validateLogin() {
  const studentId = document.getElementById("studentId").value.trim();
  const password = document.getElementById("password").value.trim();

  // 1. CHECK ADMIN FIRST
  if (adminAccounts.hasOwnProperty(studentId)) {
    if (adminAccounts[studentId] === password) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("studentID", studentId);
      sessionStorage.setItem("studentName", "Admin");
      showOverlay(); // SHOW POPUP FOR ADMIN
      return;
    } else {
      alert("Invalid Admin Password!");
      return;
    }
  }

  // 2. CHECK STUDENT
  if (validStudents.hasOwnProperty(studentId)) {
    const defaultPassword = studentId; // default = ID
    const savedPassword = localStorage.getItem("password_" + studentId) || defaultPassword;
    if (savedPassword!== password) {
      alert("Incorrect Password!");
      return;
    }
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("studentID", studentId);
    sessionStorage.setItem("studentName", validStudents[studentId]);

    // CONDITION: If password is still default, force change
    if (password === defaultPassword) {
      window.location.href = "changepassword.html";
    } else {
      window.location.href = "loginaccessapproved.html";
    }
  } else {
    alert("No Account Found!");
  }
}

// OVERLAY FUNCTIONS
function showOverlay(){
  document.getElementById("adminOverlay").classList.add("show");
}
function closeOverlay(){
  document.getElementById("adminOverlay").classList.remove("show");
}
function goToPage(page){
  window.location.href = page;
}

// Close overlay when clicking outside
document.getElementById("adminOverlay").addEventListener("click", function(e){
  if(e.target === this) closeOverlay();
});