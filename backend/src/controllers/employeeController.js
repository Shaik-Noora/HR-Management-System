const { Employee, Team, EmployeeTeam, Log } = require("../../models");

// GET Employees with Teams
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { organisation_id: req.user.orgId },
      include: [
        { model: Team, through: { attributes: [] } }
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(employees);
  } catch (err) {
    console.error("GET EMPLOYEES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

// CREATE Employee (optionally with teams)
exports.createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, team_ids } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      phone,
      organisation_id: req.user.orgId,
    });

    if (Array.isArray(team_ids) && team_ids.length > 0) {
      const rows = team_ids.map((teamId) => ({
        employee_id: employee.id,
        team_id: teamId,
      }));
      await EmployeeTeam.bulkCreate(rows);
    }

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_created",
      meta: JSON.stringify({ employeeId: employee.id }),
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error("CREATE EMPLOYEE ERROR:", err);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

// UPDATE Employee + their Teams
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, team_ids } = req.body;

    const employee = await Employee.findOne({
      where: { id, organisation_id: req.user.orgId },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({
      first_name,
      last_name,
      email,
      phone,
    });

    // If team_ids is provided, reset memberships
    if (Array.isArray(team_ids)) {
      await EmployeeTeam.destroy({ where: { employee_id: id } });

      if (team_ids.length > 0) {
        const rows = team_ids.map((teamId) => ({
          employee_id: id,
          team_id: teamId,
        }));
        await EmployeeTeam.bulkCreate(rows);
      }
    }

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_updated",
      meta: JSON.stringify({ employeeId: id }),
    });

    const updated = await Employee.findByPk(id, {
      include: [{ model: Team, through: { attributes: [] } }],
    });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE EMPLOYEE ERROR:", err);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// DELETE Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await EmployeeTeam.destroy({ where: { employee_id: id } });

    await Employee.destroy({
      where: {
        id,
        organisation_id: req.user.orgId,
      },
    });

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_deleted",
      meta: JSON.stringify({ employeeId: id }),
    });

    res.json({ message: "Employee deleted" });
  } catch (err) {
    console.error("DELETE EMPLOYEE ERROR:", err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
