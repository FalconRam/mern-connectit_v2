// Login Error Handling
export const findLoginFormErrors = (loginCred) => {
  const { email, password } = loginCred;
  const newErrors = {};
  const regex = /\S+@\S+\.\S+/;
  // Email errors
  if (!email || email === "") newErrors.email = "Please enter your Email.";
  else if (!regex.test(email)) newErrors.email = "Email address is invalid";

  // Password errors
  if (!password || password === "")
    newErrors.password = "Please enter your Password.";
  else if (password.length <= 5) newErrors.password = "Password is too Short!";

  return newErrors;
};
