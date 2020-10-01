export const validateUsername = (username: string) => {
  const fmtUsername = username.trim();

  return fmtUsername.length >= 6 && fmtUsername.length <= 60;
}

export const validateEmail = (email: string) => {
  const fmtEmail = email.trim().toLowerCase();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  return emailRegex.test(fmtEmail);
}

export const validatePassword = (password: string) => {
  const fmtPassword = password;

  if (fmtPassword.length >= 6 && fmtPassword.length <= 50)
    return 1;
  else if (fmtPassword.toLowerCase() && fmtPassword.toUpperCase())
    return 2;
  else
    return 0;
}