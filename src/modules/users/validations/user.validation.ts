import Joi, { ValidationResult } from 'joi';
import { User, UserRole } from '../models';

export const validateCreateUser = (user: User): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))  // Garde l'expression régulière pour l'email
            .message('Enter a correct email please'),
        password: Joi.string()
            .min(6)  // Mot de passe d'au moins 6 caractères
            .required(),
        firstName: Joi.string()
            .required()
            .messages({
                'string.empty': 'First name is required',
            }),
        lastName: Joi.string()
            .required()
            .messages({
                'string.empty': 'Last name is required',
            }),
        role: Joi.string()
            .valid(UserRole.ADMIN, UserRole.USER)  // Valide les rôles définis dans UserRole
            .required()
            .messages({
                'any.only': 'Role must be either admin or user',
            }),
        createdAt: Joi.date()
            .optional(),
        updatedAt: Joi.date()
            .optional(),
    });

    return schema.validate(user);
};
