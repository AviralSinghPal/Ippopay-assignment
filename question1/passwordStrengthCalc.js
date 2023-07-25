
function minStepsToMakePasswordStrong(password) {
  let steps = 0;
  let missingConditions = 3; 
  if (password.length < 6) {
    steps += 6 - password.length;
    if(password.length <= 4) return 6-password.length;
  }
  if (/[a-z]/.test(password)) {
    missingConditions--;
  }

  if (/[A-Z]/.test(password)) {
    missingConditions--;
  }

  if (/\d/.test(password)) {
    missingConditions--;
  }

  steps += missingConditions;

  
  for (let i = 2; i < password.length; i++) {
    if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
      steps++;
      break;
    }
  }

  return steps;
}
