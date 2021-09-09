const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const {Op} = require('sequelize')
// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, readFlag:false });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      readFlag:false
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  const {convoId, userId} = req.body
    
  if (!req.user || req.user.id !== userId) {
    return res.sendStatus(401);
  }
  console.log("fetching convo for : " +userId)
  //Check if user is part of the conversation. 
  let conversation = Conversation.findOne({
    where: {
      [Op.and] : {
        [Op.or] : [{user1Id: userId}, {user2Id: userId}],
        id: convoId
      }
    }
  });
    console.log(conversation)
  if(!conversation){
    return res.sendStatus(401)
  }
  const message = await Message.update({readFlag: true}, {
    where: {
      conversationId: convoId,
      readFlag: false,
      senderId :{
        [Op.not] : userId
      }
    }
  })
  res.json(message)
})


module.exports = router;
