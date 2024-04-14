document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("matchButton");
    button.addEventListener("click", () => {
        const enteredName = document.getElementById("userName").value;
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.firstName.toLowerCase() === enteredName.toLowerCase());
                if (user) {
                    const matches = users.filter(u =>
                        (u.location === user.location || u.university === user.university) && u.firstName !== user.firstName
                    );
                    if (matches.length > 0) {
                        const match = matches[0]; // Just taking the first match for demonstration
                        document.getElementById("matchName").textContent = `Name: ${match.firstName}`;
                        document.getElementById("matchUniversity").textContent = `University: ${match.university}`;
                        document.getElementById("matchLocation").textContent = `Location: ${match.location}`;
                        document.getElementById("matchHobbies").textContent = `Hobbies: ${match.hobbies.join(", ")}`;
                        document.getElementById("matchPhone").textContent = `Phone: ${match.phoneNumber}`;
                    } else {
                        document.getElementById("matchName").textContent = "No match found.";
                        document.getElementById("matchUniversity").textContent = "";
                        document.getElementById("matchLocation").textContent = "";
                        document.getElementById("matchHobbies").textContent = "";
                        document.getElementById("matchPhone").textContent = "";
                    }
                } else {
                    document.getElementById("matchName").textContent = "User not found.";
                    document.getElementById("matchUniversity").textContent = "";
                    document.getElementById("matchLocation").textContent = "";
                    document.getElementById("matchHobbies").textContent = "";
                    document.getElementById("matchPhone").textContent = "";
                }
            })
            .catch(error => console.log('Error fetching users:', error));
    });
});

// Additional functionalities for registration with new fields
const user = {
    firstName: "",
    phoneNumber: "",
    university: "",
    location: "",
    hobbies: ""
}

// Event listeners for new registration fields
document.getElementById("first_name").addEventListener("change", (e) => {
    user.firstName = e.target.value;
});
document.getElementById("phone_number").addEventListener("change", (e) => {
    user.phoneNumber = e.target.value;
});
document.getElementById("university").addEventListener("change", (e) => {
    user.university = e.target.value;
});
document.getElementById("location").addEventListener("change", (e) => {
    user.location = e.target.value;
});
document.getElementById("hobbies").addEventListener("change", (e) => {
    user.hobbies = e.target.value.split(",").map(hobby => hobby.trim());  // Assumes hobbies are entered as comma-separated values
});
document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const updateBtn = document.getElementById('updateButton');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const updateForm = document.getElementById('update-form');

    // Show register form
    registerBtn.addEventListener('click', () => {
        loginForm.style.display = 'none'; // Hide login form if visible
        updateForm.style.display = 'none'; // Hide update form if visible
        registerForm.style.display = 'block'; // Show register form
    });

    // Show login form
    loginBtn.addEventListener('click', () => {
        registerForm.style.display = 'none'; // Hide register form if visible
        updateForm.style.display = 'none'; // Hide update form if visible
        loginForm.style.display = 'block'; // Show login form
    });

    // Show update form
    updateBtn.addEventListener('click', () => {
        registerForm.style.display = 'none'; // Hide register form
        loginForm.style.display = 'none'; // Hide login form
        updateForm.style.display = 'block'; // Show update form
    });
});

// Assuming Update form similar to register form
const submitUpdateBtn = document.getElementById('submit-update-btn');
submitUpdateBtn.addEventListener('click', () => {
    const userId = 1; // This should be dynamically set based on user selection
    const updatedUser = {
        firstName: document.getElementById('update_first_name').value,
        lastName: document.getElementById('update_last_name').value,
        university: document.getElementById('update_university').value,
        location: document.getElementById('update_location').value
    };

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated:', data);
        alert('User updated successfully');
    })
    .catch(error => console.error('Error updating user:', error));
});


document.getElementById("submit-register-btn").addEventListener("click", () => {
    fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
      .then(data => alert("User registered successfully"))
      .catch(error => console.log('Error registering user:', error));
});
