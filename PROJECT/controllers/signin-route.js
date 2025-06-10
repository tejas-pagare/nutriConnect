const express = require('express');
const router = express.Router();
const { User, Admin, Dietitian, Organization } = require('../models/userModel');

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.user || req.session.admin || req.session.dietitian || req.session.organization) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Unauthorized' });
}

// Sub-router for sign-in routes
const signinRouter = express.Router();

// User Sign-in Route (MongoDB)
signinRouter.post('/user', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received user sign-in data:', req.body);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Store minimal data in session
    req.session.user = { id: user._id, role: 'user', email: user.email, name: user.name };
    res.status(200).json({
      success: true,
      message: 'User sign-in successful',
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error('Error during user sign-in:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Admin Sign-in Route (MongoDB)
signinRouter.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received admin sign-in data:', req.body);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Store minimal data in session
    req.session.admin = { id: admin._id, role: 'admin', email: admin.email, name: admin.name };
    res.status(200).json({
      success: true,
      message: 'Admin sign-in successful',
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error('Error during admin sign-in:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Dietitian Sign-in Route (MongoDB)
signinRouter.post('/dietitian', async (req, res) => {
  const { email, password, licenseNumber } = req.body;
  console.log('Received dietitian sign-in data:', req.body);

  if (!email || !password || !licenseNumber) {
    return res.status(400).json({ success: false, message: 'Email, password, and license number are required.' });
  }

  try {
    const dietitian = await Dietitian.findOne({ email });
    if (!dietitian) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify license number
    if (dietitian.licenseNumber !== licenseNumber) {
      return res.status(401).json({ success: false, message: 'Invalid license number' });
    }

    const isMatch = await dietitian.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Store minimal data in session
    req.session.dietitian = { id: dietitian._id, role: 'dietitian', email: dietitian.email, name: dietitian.name };
    res.status(200).json({
      success: true,
      message: 'Dietitian sign-in successful',
      dietitian: { id: dietitian._id, email: dietitian.email, name: dietitian.name },
    });
  } catch (err) {
    console.error('Error during dietitian sign-in:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Organization Sign-in Route (MongoDB)
signinRouter.post('/organization', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received organization sign-in data:', req.body);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await organization.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Store minimal data in session
    req.session.organization = { id: organization._id, role: 'organization', email: organization.email, org_name: organization.org_name };
    res.status(200).json({
      success: true,
      message: 'Organization sign-in successful',
      organization: { id: organization._id, email: organization.email, org_name: organization.org_name },
    });
  } catch (err) {
    console.error('Error during organization sign-in:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});



// Mount the sub-routers
router.use('/signin', signinRouter);



module.exports = router; 