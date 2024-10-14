const UserModel = require('../models/Users')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/Jwt') || 'supersecretkey'
const transporter = require('../config/mailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt');

const generateRandomPassword = () => {
  const length = 8; // Longueur du mot de passe
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé.' });
  }

  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 8); 

  user.password = hashedPassword; 
  await user.save();

  const mailOptions = {
    from: 'eddelymyamina@gmail.com',
    to: user.email,
    subject: 'Votre nouveau mot de passe',
    text: `Votre nouveau mot de passe est : ${newPassword}. Veuillez le changer dès que possible.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email :', error);
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
    res.status(200).json({ message: 'Un nouveau mot de passe a été envoyé à votre adresse email.' });
  });
};


// exports.sendResetPasswordEmail = async (req, res) => {
//   const { email } = req.body;

//   const user = await UserModel.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//   }

//   const token = crypto.randomBytes(20).toString('hex');
//   user.resetPasswordToken = token;
//   user.resetPasswordExpires = Date.now() + 3600000; 

//   await user.save();

//   const mailOptions = {
//     from: 'eddelymyamina@gmail.com',
//     to: user.email,
//     subject: 'Réinitialisation du mot de passe',
//     text: `Vous avez demandé une réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : 
//     http://localhost:5174/reset_password/${token}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error)
//       return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
//     }
//     res.status(200).json({ message: 'E-mail de réinitialisation envoyé.' });
//   });
// };

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' })
    }

    const user = new UserModel({ username, email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ token,user: { username: username, email: email,userId: user._id  } })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserModel.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ token,user: { username: username, email: user.email,userId: user._id  } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.updatePassword = async (req, res) => {
  const  userId  = req.params.id
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.',user:{ username: user.username, email: user.email,userId: user._id  } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateEmail = async (req, res) => {
  const  userId  = req.params.id;
  const {email}  = req.body;
  console.log(email)

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    user.email = email;
    await user.save();

    res.status(200).json({ message: 'E-mail mis à jour avec succès.' ,user:{ username: user.username, email: user.email,userId: user._id  }});
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateUsername = async (req, res) => {
  const  userId  = req.params.id;
  const { username } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris.' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: 'Nom d\'utilisateur mis à jour avec succès.',user:{ username: user.username, email: user.email,userId: user._id  } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


