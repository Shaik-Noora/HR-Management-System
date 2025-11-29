// backend/src/controllers/teamController.js
const { Team, Employee, EmployeeTeam, Log } = require("../../models");

// GET Teams with Members
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { organisation_id: req.user.orgId },
      include: [{ model: Employee, through: { attributes: [] } }],
      order: [["created_at", "DESC"]],
    });

    res.json(teams);
  } catch (err) {
    console.error("GET TEAMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

// CREATE Team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const team = await Team.create({
      name,
      description,
      organisation_id: req.user.orgId,
    });

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "team_created",
      meta: JSON.stringify({ teamId: team.id }),
    });

    res.status(201).json(team);
  } catch (err) {
    console.error("CREATE TEAM ERROR:", err);
    res.status(500).json({ message: "Failed to create team" });
  }
};

// UPDATE Team
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await Team.update(
      { name, description },
      { where: { id, organisation_id: req.user.orgId } }
    );

    res.json({ message: "Team updated" });
  } catch (err) {
    console.error("UPDATE TEAM ERROR:", err);
    res.status(500).json({ message: "Failed to update team" });
  }
};

// DELETE Team
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    await EmployeeTeam.destroy({ where: { team_id: id } });

    await Team.destroy({
      where: { id, organisation_id: req.user.orgId },
    });

    res.json({ message: "Team deleted" });
  } catch (err) {
    console.error("DELETE TEAM ERROR:", err);
    res.status(500).json({ message: "Failed to delete team" });
  }
};

// ASSIGN Employee to Team
exports.assignEmployee = async (req, res) => {
  try {
    const { id: teamId } = req.params;

    // because axios + toSnake will send `employee_id`
    const { employee_id, employeeId } = req.body;
    const eid = employee_id || employeeId;

    if (!eid) {
      return res.status(400).json({ message: "employee_id required" });
    }

    // avoid duplicates
    await EmployeeTeam.findOrCreate({
      where: {
        team_id: teamId,
        employee_id: eid,
      },
    });

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_assigned",
      meta: JSON.stringify({ teamId, employeeId: eid }),
    });

    res.json({ message: "Employee assigned" });
  } catch (err) {
    console.error("ASSIGN ERROR:", err);
    res.status(500).json({ message: "Assignment failed" });
  }
};

// UNASSIGN Employee from Team
exports.unassignEmployee = async (req, res) => {
  try {
    const { id: teamId } = req.params;

    // DELETE body is parsed, but axios sends `data`
    // and toSnake will give `employee_id`
    const { employee_id, employeeId } = req.body;
    const eid = employee_id || employeeId;

    if (!eid) {
      return res.status(400).json({ message: "employee_id required" });
    }

    await EmployeeTeam.destroy({
      where: {
        team_id: teamId,
        employee_id: eid,
      },
    });

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_unassigned",
      meta: JSON.stringify({ teamId, employeeId: eid }),
    });

    res.json({ message: "Employee removed" });
  } catch (err) {
    console.error("UNASSIGN ERROR:", err);
    res.status(500).json({ message: "Unassignment failed" });
  }
};
