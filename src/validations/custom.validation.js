import validator from 'validator';

export const passwordValidate = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    );
  }
  return value;
};

export const objectIdValidate = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message("'{{#label}}' must be a valid MongoDB ObjectID.");
  }
  return value;
};
