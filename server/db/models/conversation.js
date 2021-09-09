const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  id :{ 
    type: Sequelize.INTEGER,
    unique: true, 
    allowNull:false
  },
  name : {
    type: Sequelize.STRING,
    allowNull:false
  },
  photoUrl: {
    type: Sequelize.STRING
  }
});


// find conversation given two user Ids
// This find Conversation function will have to be shifted to Join Table ...
Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
