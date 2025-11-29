const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee,
} = require("../controllers/teamController");

router.use(authMiddleware);

// ✅ Team CRUD
router.get("/", getTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

// ✅ Assignment lifecycle
router.post("/:id/assign", assignEmployee);

/**
 * ✅ IMPORTANT:
 * We KEEP this as DELETE
 * and frontend already correctly sends:
 * { data: { employeeId } }
 */
router.delete("/:id/unassign", unassignEmployee);

module.exports = router;
