import { body, validationResult } from 'express-validator';

// Run AFTER the validator chains to short-circuit with a 400 when any check failed.
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

const userRegistrationvalidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name should at least 3 charcaters long')
      .isLength({ max: 15 })
      .withMessage("Name Shouldn't be more than 15 charcters"),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('password should be at 8 Charcaters long')
      .isLength({ max: 15 })
      .withMessage("The password shouldn't be more than 15 charcaters long"),
  ];
};

const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('Email is not valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Passowrd should be at least 8 characters long')
      .isLength({ max: 15 })
      .withMessage('The password should not be longer than 15 characters'),
  ];
};

const executeCodeValidator = () => {
  return [
    body('source_code')
      .notEmpty()
      .withMessage('Source code is required')
      .isString()
      .withMessage('Source code should be a string'),
    body('language_id')
      .notEmpty()
      .withMessage('Language id is required')
      .bail()
      .custom((value) => typeof value === 'number' && Number.isInteger(value))
      .withMessage('Language id should be an integer'),
    body('problemId')
      .notEmpty()
      .withMessage('Problem id is required')
      .isString()
      .withMessage('Problem id should be a string'),
  ];
};

const createAndUpdateProblemValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title should be a string'),
    body('description')
      .notEmpty()
      .withMessage('Description is required')
      .isString()
      .withMessage('Description should be a string'),
    body('difficulty')
      .notEmpty()
      .withMessage('Difficulty is required')
      .isString()
      .withMessage('Difficulty should be a string'),
    body('tags')
      .notEmpty()
      .withMessage('Atleast one tag is required')
      .isArray()
      .withMessage('Tags should be an array'),
    body('examples')
      .notEmpty()
      .withMessage('Examples are required')
      .isObject()
      .withMessage('Examples should be an object'),
    body('constraints')
      .notEmpty()
      .withMessage('The constraints are required')
      .isString()
      .withMessage('The constraints should be a string'),
    body('testcases')
      .notEmpty()
      .withMessage('At least one testcase is required')
      .isArray()
      .withMessage('Testcases should be an array'),
    body('codeSnippets')
      .notEmpty()
      .withMessage('Code snippet is required')
      .isObject()
      .withMessage('Code snippet should be an object'),
    body('referenceSolutions')
      .notEmpty()
      .withMessage('Reference solution for each codeSnippet is required')
      .isObject()
      .withMessage('Reference solution should be an object'),
  ];
};

const createPlaylistValidator = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name of playlist is required')
      .isString()
      .withMessage('Name of playlist should be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description should be a string'),
    body('isPublic')
      .optional()
      .isBoolean()
      .withMessage('isPublic should be a boolean'),
  ];
};

export {
  userRegistrationvalidator,
  userLoginValidator,
  executeCodeValidator,
  createAndUpdateProblemValidator,
  createPlaylistValidator,
};