import {body} from "express-validator";


export const loginValidation = [
  body('email', 'incorrect email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
];

export const registerValidation = [
  body('email', 'incorrect email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
  body('fullName', "Put your name").isLength({min: 3}),
  body('avatarUrl', 'Incorrect avatar url').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Put the title').isLength({min: 3}).isString(),
  body('text', 'Put the text').isLength({min: 3}).isString(),
  body('tags', "Incorrect tag format (put an array)").optional().isString(),
  body('imageUrl', 'Incorrect image url').optional().isString(),
];