export const findChangePasswordFormErrors = (newpassword) => {
  const { oldPassword, newPassword, confirmNewPassword } = newpassword;
  const newErrors = {};

  // Old Password errors
  if (!oldPassword || oldPassword === "")
    newErrors.oldPassword = "Please enter your Old Password.";

  // New Password errors
  if (!newPassword || newPassword === "")
    newErrors.newPassword = "Please enter your New Password.";
  else if (newPassword.length <= 5)
    newErrors.newPassword = "New Password is too Short!";

  // New Password and Confirm New Password errors
  if (!confirmNewPassword || confirmNewPassword === "")
    newErrors.confirmNewPassword = "Please confirm your New Password.";
  else if (
    newPassword.length !== confirmNewPassword.length ||
    confirmNewPassword !== newPassword
  )
    newErrors.confirmNewPassword = "Password is not Matching!";

  return newErrors;
};
