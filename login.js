// REGISTER USER
function registerUser() {
    let fullname = document.getElementById("fullname").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!fullname || !phone || !location || !email || !password) {
        document.getElementById("msg").innerText = "All fields are required!";
        return;
    }

    let userData = {
        fullname,
        phone,
        location,
        email,
        password
    };

    localStorage.setItem("appointmentUser", JSON.stringify(userData));

    document.getElementById("msg").style.color = "green";
    document.getElementById("msg").innerText = "Registration Successful!";
    
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// LOGIN USER
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let savedUser = localStorage.getItem("appointmentUser");

    if (!savedUser) {
        document.getElementById("loginMsg").innerText = "No user registered!";
        return;
    }

    let user = JSON.parse(savedUser);

   if (email === user.email && password === user.password) {
    document.getElementById("loginMsg").style.color = "green";
    document.getElementById("loginMsg").innerText = "Login Successful! Redirecting...";
{
    setTimeout(() => {
        window.location.href = "index.html"; // your project home page
    }, 1000);
}
    } else {
        document.getElementById("loginMsg").innerText = "Incorrect Email or Password!";
    }
}