const { Log } = require('../../models');
const { Op } = require('sequelize');

// ===============================
// GET /api/logs
// ===============================
exports.getLogs = async (req, res) => {
  try {
    const { action, userId, startDate, endDate } = req.query;

    const filters = {
      organisation_id: req.user.orgId,
    };

    if (action) filters.action = action;
    if (userId) filters.user_id = userId;

    // ✅ Filter by created_at (now guaranteed to exist)
    if (startDate || endDate) {
      filters.created_at = {};

      if (startDate) filters.created_at[Op.gte] = new Date(startDate);
      if (endDate) filters.created_at[Op.lte] = new Date(endDate);
    }

    const logs = await Log.findAll({
      where: filters,
      order: [['created_at', 'DESC']],
    });

    return res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return res.status(500).json({ message: 'Server error while fetching logs' });
  }
};

// ===============================
// UTILITY LOGGER
// ===============================
exports.createLog = async (orgId, userId, action, meta = {}) => {
  try {
    await Log.create({
      organisation_id: orgId,
      user_id: userId,
      action,
      meta: JSON.stringify(meta),
      // ✅ NO timestamp needed anymore — DB auto-handles it
    });
  } catch (error) {
    console.error('Log creation error:', error);
  }
};
