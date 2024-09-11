const UserModel = require('../models/Users')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/Jwt') || 'supersecretkey'

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
    res.status(201).json({ token })
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
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}