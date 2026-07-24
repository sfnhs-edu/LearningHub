function validateLogin() {
  
  const studentId = document.getElementById("studentId").value.trim();
  
  const validStudents = {
    "02092006": "John Rey Balasta",
    "06211993": "Michael Molina",
    "12345678": "Jose Rosal",
    "09876543": "Ernesto Dela Cruz"
  };
  
  if (validStudents.hasOwnProperty(studentId)) {
    
    localStorage.setItem("studentID", studentId);
    localStorage.setItem("studentName", validStudents[studentId]);
    
    window.location.href = "loginaccessapproved.html";
    
  } else {
    
    alert("No Account Found!");
    
  }
}