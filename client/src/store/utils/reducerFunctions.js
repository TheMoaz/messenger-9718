export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.otherUser.id !== message.senderId ? newConvo.unreadCount = 0 : newConvo.unreadCount = 1
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = {...convo}
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if(convoCopy.otherUser.id === message.senderId)
        convoCopy.unreadCount = convoCopy.unreadCount + 1 
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = {...convo}
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      message.senderId === convoCopy.otherUser.id ? convoCopy.unreadCount = 1 : convoCopy.unreadCount = 0
      return convoCopy;
    } else {
      return convo;
    }
  });
};

//Reducer for updating state read messages. 
export const readMessages = (state, conversationId) => {
  return state.map( (convo) => {
    if(convo.id === conversationId) {
      const newConvo = {...convo}
      newConvo.unreadCount = 0
      newConvo.messages = newConvo.messages.map( (message) => {
        if(message.senderId === newConvo.otherUser.id)
          message.readFlag = true
        return message
      })
      return newConvo
    }
    else{
      return convo
    }
  })
}

//Reducer Function to update read reciepts.
export const markReadReciept = (state, lastMessage) => {
  return state.map( (convo) => {
    if(convo.id === lastMessage.conversationId) {
      const newConvo = {...convo}
      const updatedMessages = [...newConvo.messages]
      updatedMessages.map( (message) => {
        if(message.senderId === newConvo.otherUser.id){
          message.readFlag = true
        }
        return message
      })
      newConvo.messages = updatedMessages
      newConvo.otherUserLastRead = lastMessage.id
      return newConvo
    }
    else{
      return convo
    }
  })
}