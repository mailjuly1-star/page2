import { auth, signInWithEmailAndPassword } from "../../firebaseConfig.js";

const signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log("Authorized user", user.uid);
    alert("Successful authorizations");
  } catch (error) {
    console.error("authorizations error", error.message, error.code);
    alert(`authorizations error: ${error.message}`);
  }
});
