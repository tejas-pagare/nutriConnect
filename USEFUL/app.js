const express = require("express");
const path = require("path");

const router = express.Router();

// Define the absolute path to the PROJECT folder
const projectPath = path.join(__dirname, ".."); // Moves one level up from 'routes' to 'PROJECT'

// Serve static files (CSS, JS, Images)
router.use(express.static(projectPath));

// Middleware to ensure authentication
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    // User is authenticated, allow access
    next();
  } else {
    // User is not authenticated, redirect to sign-in page
    res.redirect("/role_signin");
  }
}

// List of public routes
const publicRoutes = ["/", "/blog", "/contact", "/role_signin", "/role_signup"];

// Middleware to check if the route is public or protected
router.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    // Allow access to public routes
    next();
  } else {
    // Protect all other routes
    ensureAuthenticated(req, res, next);
  }
});

// ================= PUBLIC ROUTES =================
router.get("/", (req, res) => {
  res.sendFile(path.join(projectPath, "index.html"));
});

router.get("/blog", (req, res) => {
  res.sendFile(path.join(projectPath, "blog.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(projectPath, "Contactus.html"));
});

router.get("/role_signin", (req, res) => {
  res.sendFile(path.join(projectPath, "roles_signin.html"));
});

router.get("/role_signup", (req, res) => {
  res.sendFile(path.join(projectPath, "roles_signup.html"));
});

// ================= PROTECTED ROUTES =================

// ================= USER PAGE ROUTES =================
router.get("/user", (req, res) => {
  res.sendFile(path.join(projectPath, "user.html"));
});

router.get("/user-guide", (req, res) => {
  res.sendFile(path.join(projectPath, "guide_user.html"));
});

router.get("/user-lab", (req, res) => {
  res.sendFile(path.join(projectPath, "Lab_user.html"));
});

router.get("/diet-profiles", (req, res) => {
  res.sendFile(path.join(projectPath, "diet_profiles.html"));
});

router.get("/pricing", (req, res) => {
  res.sendFile(path.join(projectPath, "pricing.html"));
});

// ================= DIETITIAN PAGE ROUTES =================
router.get("/dietitian", (req, res) => {
  res.sendFile(path.join(projectPath, "dietitian.html"));
});

router.get("/dietitian-guide", (req, res) => {
  res.sendFile(path.join(projectPath, "guide_dietitian.html"));
});

router.get("/appointments", (req, res) => {
  res.sendFile(path.join(projectPath, "bookings_dietitian.html"));
});

router.get("/patients", (req, res) => {
  res.sendFile(path.join(projectPath, "patients_list.html"));
});

// ================= USER DASHBOARD SIDEBAR ROUTES =================
router.get("/user-bookings", (req, res) => {
  res.sendFile(path.join(projectPath, "bookings_user.html"));
});

router.get("/user-meal-plans", (req, res) => {
  res.sendFile(path.join(projectPath, "meal_user.html"));
});

// ================= DIETITIAN DASHBOARD SIDEBAR ROUTES =================
router.get("/dietitian-bookings", (req, res) => {
  res.sendFile(path.join(projectPath, "bookings_dietitian.html"));
});

router.get("/dietitian-meal-plans", (req, res) => {
  res.sendFile(path.join(projectPath, "meal_dietitian.html"));
});

// ================= ROLE-BASED ROUTES =================
router.get("/admin", (req, res) => {
  res.sendFile(path.join(projectPath, "admin.html"));
});

router.get("/organization", (req, res) => {
  res.sendFile(path.join(projectPath, "organization.html"));
});

// ================= CATCH-ALL ROUTE =================
// Redirect all other routes to the sign-in page
router.use((req, res) => {
  res.redirect("/role_signin");
});

// Export the router
module.exports = router;





/*

const express = require("express");
const path = require("path");

const router = express.Router();

// Define the absolute path to the PROJECT folder (where HTML files are stored)
const projectPath = path.join(__dirname, ".."); // Moves one level up from 'routes' to 'PROJECT'

// Serve static files (CSS, JS, Images) if needed
router.use(express.static(projectPath));

// =================== UNIVERSAL DYNAMIC ROUTE ===================
// Serves any HTML file from the PROJECT folder without requiring `.html` in the URL.
router.get("/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(projectPath, `${page}.html`);

  console.log("Looking for file:", filePath); // Debugging

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("Page not found");
    }
  });
});

// =================== EXPORT THE ROUTER ===================
module.exports = router;
*/

