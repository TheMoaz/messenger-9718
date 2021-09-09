const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const JoinConvoUsers = db.define("joinConvoUsers", {
  id :{ 
    type: Sequelize.INTEGER,
    unique: true, 
    allowNull:false
  },
  convoId : {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull:false
  }
});

module.exports = JoinConvoUsers;

// We need to associate tables using sequelize associate functions. 