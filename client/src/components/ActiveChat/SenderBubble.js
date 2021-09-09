import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  small: {
    width: 15,
    height: 15,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { message, otherUserLastRead } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{message.time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{message.text}</Typography>
      </Box>
       {otherUserLastRead === message.id && <Avatar src={props.otherUserAvatar} className={classes.small}/>}
    </Box>
  );
};

export default SenderBubble;
