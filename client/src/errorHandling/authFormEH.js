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

// Password Intiate Error Handling
export const findPasswordInitiateFormErrors = (email) => {
  const newErrors = {};
  const regex = /\S+@\S+\.\S+/;
  // Email errors
  if (!email || email === "") newErrors.email = "Please enter your Email.";
  else if (!regex.test(email)) newErrors.email = "Email address is invalid";

  return newErrors;
};

// Password Reset Error Handling
export const findPasswordResetFormErrors = ({ password, confirmPassword }) => {
  const newErrors = {};
  // Password errors
  if (!password || password === "")
    newErrors.password = "Please enter your Password.";
  else if (password.length <= 5) newErrors.password = "Password is too Short!";

  // Confirm Password errors
  if (!confirmPassword || confirmPassword === "")
    newErrors.confirmPassword = "Please confirm your Password.";
  else if (
    password.length !== confirmPassword.length ||
    confirmPassword !== password
  )
    newErrors.confirmPassword = "Password is not Matching!";

  return newErrors;
};

// Signin Error Handling
export const findSigninFormErrors = (signInData) => {
  const {
    firstName,
    lastName,
    email,
    city,
    country,
    password,
    confirmPassword,
  } = signInData;
  const newErrors = {};
  const regex = /\S+@\S+\.\S+/;

  // Name errors
  if (!firstName || firstName === "")
    newErrors.firstName = "Please enter your First Name.";
  if (!lastName || lastName === "")
    newErrors.lastName = "Please enter your Last Name.";

  // Email errors
  if (!email || email === "") newErrors.email = "Please enter your Email.";
  else if (!regex.test(email)) newErrors.email = "Email address is invalid";

  // City errors
  if (!city || city === "") newErrors.city = "Please enter your City.";

  // Country errors
  if (!country || country === "")
    newErrors.country = "Please enter your Country.";

  // Password errors
  if (!password || password === "")
    newErrors.password = "Please enter your Password.";
  else if (password.length <= 5) newErrors.password = "Password is too Short!";

  // Confirm Password errors
  if (!confirmPassword || confirmPassword === "")
    newErrors.confirmPassword = "Please confirm your Password.";
  else if (
    password.length !== confirmPassword.length ||
    confirmPassword !== password
  )
    newErrors.confirmPassword = "Password is not Matching!";

  return newErrors;
};
