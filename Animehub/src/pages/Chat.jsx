import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from "react-chat-engine-advanced";

const Chat = (props) => {
  const chatProps = useMultiChatLogic(
    "777492b2-c259-4945-a6e3-6bed0f3b048e",
    props.chatUser.username,
    "secret"
  );
  console.log(props.chatUser.secret);
  return (
    <div
      style={{ height: "100dvh" }}
      className="fixed-top text-white chat-background"
    >
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} />
    </div>
  );
};
export default Chat;
