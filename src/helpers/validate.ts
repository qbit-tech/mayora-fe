import { message } from 'antd';

export function validate(data: any, rules: {required?: string[]}) {
  const errors: {
    field: string;
    errorType: 'required',
    message: string;
  }[] = [];

  if (rules.required) {
    for (const field of rules.required) {
      if (!data[field]) {
        errors.push({ field: field, errorType: 'required', message: field.toLowerCase() + ' is required' });
      } 
    }
  }

  if (errors.length > 0) {
    if (errors.find(err => err.errorType === 'required')) {
      message.error('This field is required: ' + (errors.map(err => err.field).join(', ')));
    } else {
      message.error(errors.map(item => item.message).join('. '));
    }
    return {isValid: false, errors};
  }

  return {isValid: true};
};
