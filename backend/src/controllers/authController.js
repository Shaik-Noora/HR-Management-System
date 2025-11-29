const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organisation, User, Log } = require('../../models');


// Utility: Create Log Entry
async function createLog(orgId, userId, action, meta = {}) {
  await Log.create({
    organisation_id: orgId,
    user_id: userId,
    action,
    meta: JSON.stringify(meta)
  });
}

module.exports = {

  // -------------------------
  // REGISTER ORGANISATION
  // -------------------------
  async register(req, res) {
    try {
      const { orgName, adminName, email, password } = req.body;

      if (!orgName || !adminName || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }

      // Create organisation
      const organisation = await Organisation.create({ name: orgName });

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      // Create admin user
      const user = await User.create({
        name: adminName,
        email,
        password_hash: hashed,
        organisation_id: organisation.id
      });

      // Create JWT
      const token = jwt.sign(
        { userId: user.id, orgId: organisation.id },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      // Log actions
      await createLog(organisation.id, user.id, 'organisation_created', { organisationId: organisation.id });
      await createLog(organisation.id, user.id, 'admin_user_created', { userId: user.id });

      return res.status(201).json({
        message: 'Organisation registered successfully',
        token
      });

    } catch (err) {
      console.error('Register Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  // -------------------------
  // LOGIN
  // -------------------------
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      // JWT
      const token = jwt.sign(
        { userId: user.id, orgId: user.organisation_id },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      // Log login
      await createLog(user.organisation_id, user.id, 'user_login', { email });

      return res.status(200).json({ token });

    } catch (err) {
      console.error('Login Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

};
