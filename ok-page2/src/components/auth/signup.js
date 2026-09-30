import { auth, createUserWithEmailAndPassword } from "../../firebaseConfig.js";

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log("registered user", user.uid);
    alert("Successful registration");
  } catch (error) {
    console.error("registeration error", error.message, error.code);
    alert(`Registration error: ${error.message}`);
  }
});
