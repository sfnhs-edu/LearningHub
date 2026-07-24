function validateLogin() {
  
  const studentId = document.getElementById("studentId").value.trim();
  
  const validStudents = {
    "01020304": "Juan Dela Cruz",
    "05060708": "Maria Makiling",
    "09080706": "Jose Rosal",
    "05040302": "Ernesto Dela Cruz"
  };
  
  if (validStudents.hasOwnProperty(studentId)) {
    
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("studentID", studentId);
    sessionStorage.setItem("studentName", validStudents[studentId]);
    
    window.location.href = "loginaccessapproved.html";
    
  } else {
    
    alert("No Account Found!");
    
  }
}