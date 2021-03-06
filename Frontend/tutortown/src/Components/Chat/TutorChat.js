import React from "react";
import styles from "./ChatUi.module.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import TextField from "@material-ui/core/TextField";

const PORT = process.env.PORT || 3001;
const socket = io.connect(`http://localhost:${PORT}`);

const TutorChat = () => {
  const [state, setState] = React.useState({ message: "", name: "" });
  const [chat, setChat] = React.useState([]);
  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = io.connect(`http://localhost:${PORT}`);
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  return (
    <div className={styles.chat}>
      <div className={styles.msgbox}>
        {chat.map(({ name, message }, index) => (
          <h3 className={styles.content}>
            <p className={styles.nam}>{name}: </p>
            <span className={styles.messag}>{message}</span>
          </h3>
        ))}
      </div>
      <div className={styles.stick}>
        <form onSubmit={onMessageSubmit}>
          <div className={styles.disp}>
            <div className={styles.name}>
              <TextField
                name="name"
                onChange={(e) => onTextChange(e)}
                value={state.name}
                label="Name"
                variant="outlined"
              />
            </div>
            <div className={styles.mes}>
              <TextField
                name="message"
                onChange={(e) => onTextChange(e)}
                value={state.message}
                id="outlined-multiline-static"
                variant="outlined"
                label="Message"
              />
            </div>
          </div>
          <button className={styles.sendbtn}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default TutorChat;
