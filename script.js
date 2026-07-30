// ADMIN ACCOUNTS: LRN : Password
const adminPasswords = {
  "06211993": "kuramog25",
  "02092006": "JhnRy@1437"
};

// ADMIN NAMES: LRN : Name
const adminNames = {
  "06211993": "Michael Molina",
  "02092006": "John Rey Balasta"
};

// OLD TEST ACCOUNTS - you can delete this later
const validStudents = {
  "12345671": "Juan Dela Cruz",
  "12345672": "Maria Makiling",
  "12345673": "Jose Rosal",
};

function validateLogin() {
  const studentLRN = document.getElementById("studentLRN").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!studentLRN ||!password) return alert("Please enter LRN and Password");

  // 1. CHECK ADMIN FIRST
  if (adminPasswords.hasOwnProperty(studentLRN)) {
    if (adminPasswords[studentLRN] === password) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("studentLRN", studentLRN);
      sessionStorage.setItem("studentName", adminNames[studentLRN]);
      showOverlay(); // SHOW POPUP FOR ADMIN
      return;
    } else {
      alert("Invalid Admin Password!");
      return;
    }
  }

  // 2. CHECK ENROLLED STUDENTS FROM LOCALSTORAGE
  let db = JSON.parse(localStorage.getItem('studentDB') || '[]');
  let enrolledStudent = db.find(s => s.lrn === studentLRN);

  // 3. CHECK OLD TEST ACCOUNTS as fallback
  let testStudentName = validStudents[studentLRN];

  if (enrolledStudent || testStudentName) {
    const defaultPassword = studentLRN; // default = LRN
    const savedPassword = localStorage.getItem("password_" + studentLRN) || defaultPassword;

    if (savedPassword!== password) {
      alert("Incorrect Password!");
      return;
    }

    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("studentLRN", studentLRN);
    sessionStorage.setItem("studentName", enrolledStudent? enrolledStudent.name : testStudentName);

    // CONDITION: If password is still default, force change
    if (password === defaultPassword) {
      window.location.href = "changepassword.html";
    } else {
      window.location.href = "loginaccessapproved.html";
    }
  } else {
    alert("No Account Found! Please contact admin to enroll.");
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