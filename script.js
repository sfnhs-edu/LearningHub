const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzHimS8dTK3yaLhisZ5UZYpu3a2B3UWnXqjaXXrkco2OTq5XroEWBPMilQSagz4bscd9w/exec"; // IMPORTANT
let accounts = [];

// LOAD ACCOUNTS = "account.json"
async function loadAccounts(){
  try{
    const res = await fetch(WEB_APP_URL + "?action=getAccounts");
    accounts = await res.json();
  }catch(err){
    console.log("Error loading accounts", err);
    alert("Cannot connect to database. Check WEB_APP_URL");
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadAccounts);

async function validateLogin() {
  const studentId = document.getElementById("studentId").value.trim();
  const password = document.getElementById("password").value.trim();

  // Make sure accounts are loaded first
  if(accounts.length === 0) await loadAccounts();

  // 1. ADMIN HARDCODED
  const adminPasswords = { "06211993": "kuramog25", "02092006": "JhnRy@1437" };
  const adminNames = { "06211993": "Michael Molina", "02092006": "John Rey Balasta" };

  if (adminPasswords[studentId]) {
    if (adminPasswords[studentId] === password) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("studentLRN", studentId);
      sessionStorage.setItem("studentName", adminNames[studentId]);
      sessionStorage.setItem("role", "admin");
      showOverlay();
      return;
    } else { alert("Invalid Admin Password!"); return; }
  }

  // 2. STUDENT FROM SHEET = account.json
  const student = accounts.find(acc => acc.LRN === studentId);

  if (!student) { alert("No Account Found!"); return; }

  const defaultPassword = student.LRN;
  const currentPassword = student["LOG IN PASSKEY"];

  if (currentPassword!== password) { alert("Incorrect Password!"); return; }

  sessionStorage.setItem("loggedIn", "true");
  sessionStorage.setItem("studentLRN", student.LRN);
  sessionStorage.setItem("studentName", student.NAME);
  sessionStorage.setItem("role", "student");

  // Force change if still default
  if (password === defaultPassword) {
    window.location.href = "changepassword.html";
  } else {
    window.location.href = "loginaccessapproved.html";
  }
}

function showOverlay(){ document.getElementById("adminOverlay").classList.add("show"); }
function closeOverlay(){ document.getElementById("adminOverlay").classList.remove("show"); }
function goToPage(page){ window.location.href = page; }

// Wait for overlay to exist before adding listener
document.addEventListener("DOMContentLoaded", ()=>{
  const overlay = document.getElementById("adminOverlay");
  if(overlay){
    overlay.addEventListener("click", function(e){
      if(e.target === this) closeOverlay();
    });
  }
});