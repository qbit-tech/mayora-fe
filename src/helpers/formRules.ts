export function generateFormRules(
  formName: string,
  rules: Array<
    | 'required'
    | 'email'
    | 'phoneNumber'
    | 'letter-and-space'
    | 'password'
    | 'numeric'
    | 'nik'
    | 'subdomain'
    | 'max-text-length'
  > = []
): Array<{
  required?: boolean;
  message: string;
  pattern?: any;
}> {
  const formRules = [];
  if (rules.includes('required')) {
    formRules.push({
      required: true,
      message: `${formName} is required.`,
    });
  }
  if (rules.includes('email')) {
    formRules.push({
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: `${formName} format is invalid.`,
    });
  }
  if (rules.includes('phoneNumber')) {
    formRules.push({
      pattern: /^[0-9+ -]+$/,
      message: `${formName} can only include numbers, dash, plus and spacing.`,
    });
  }
  if (rules.includes('letter-and-space')) {
    formRules.push({
      pattern: /^[a-zA-Z ']+$/,
      message: `${formName} can only include letters.`,
    });
  }
  if (rules.includes('password')) {
    formRules.push({
      pattern:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?.,+-=/;:"<>&])[A-Za-z\d@$!%*#?.,+-=/;:"<>&]{8,}$/,
      message: `${formName} minimum 8 characters (letter, number and special character)`,
    });
  }

  if (rules.includes('numeric')) {
    formRules.push({
      pattern: /^[0-9]+$/,
      message: `${formName} can only include numbers.`,
    });
  }

  if (rules.includes('nik')) {
    formRules.push({
      pattern: /^[0-9]{16}$/,
      message: `${formName} must be 16 numbers.`,
    });
  }

  if (rules.includes('subdomain')) {
    formRules.push({
      pattern: /^[0-9a-zA-Z-]+$/,
      message: `${formName} only contain alphabet, numeric and dash.`,
    });
  }

  if (rules.includes('max-text-length')) {
    formRules.push({
      pattern: /^.{0,30}$/,
      message: `Sorry, ${formName} cannot be longer than 30 characters`,
    });
  }

  return formRules;
}
