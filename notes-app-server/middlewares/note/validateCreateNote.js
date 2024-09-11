const { checkSchema, validationResult } = require('express-validator');
const NoteModel = require('../../models/Notes');

exports.validateCreateNote = [
  checkSchema({
    category: {
      exists: {
        errorMessage: 'La catégorie est requise',
      },
      isEmpty: {
        negated: true,
        errorMessage: 'La catégorie ne doit pas être vide',
      }
    },
    label: {
      isArray: {
        errorMessage: 'L\'étiquette doit être un tableau',
      },
      custom: {
        options: async(value) => {
          if (value.length === 0) {
            throw new Error('L\'étiquette doit contenir au moins un élément');
          }
          return true;
        },
      },
    },
    title: {
      exists: {
        errorMessage: 'Le titre est requis',
      },
      isEmpty: {
        negated: true,
        errorMessage: 'Le titre ne doit pas être vide',
      }
    },
    content: {
      exists: {
        errorMessage: 'Le contenu est requis',
      },
      isEmpty: {
        negated: true,
        errorMessage: 'Le contenu ne doit pas être vide',
      }
    }
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
