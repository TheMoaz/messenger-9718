const Sequelize = require("sequelize");
const db = require("../db");

const ReadFlag = db.define("readFlag", {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull:false
    }, 
    messageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    conversationId: {
        type: Sequelize. INTEGER,
        allowNull:false
    },
    readStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// SAMPLE QUERY MECHANISMS 
/*
    1) While fetching conversations, i need to know how many unread messages i have in each conversation
        Query : where conversationId: convoId AND userId != user
    2) I need to update which user read message in conversation. 
        Query: where conversationId: convoId AND readStatus = false
    Many other functions depending required features. 
    putting conversationID makes querying job easier instead of nested queries, 
*/

module.exports = Message;
