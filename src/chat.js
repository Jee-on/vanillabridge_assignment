import { useEffect, useState, useRef } from "react";
import "./chat.css";
import { Box } from "@mui/material";
import axios from "axios";
import Header from "./component/header.js";
import Msg from "./component/msg.js";
import DateHeader from "./component/dateHeader.js";
import InputArea from "./component/inputArea.js";

/* 
채팅방 컴포넌트
*/
const API_URL = "http://test.vanillabridge.com/test_data";
function Chat() {
  const [chatData, setChatData] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [userName, setUserName] = useState("");

  const chatBoxRef = useRef(null);

  /* 컴포넌트가 마운트 될때 axios 라이브를 사용해 지정 된 api 주소에서 데이터 가져오고
  화면의 스크롤은 가장 아래로 열리도록 구현 */
  useEffect(() => {
    axios.get(`${API_URL}`).then((res) => {
      setChatData(res.data);
      setPhotoUrl(res.data.find((data) => data.user_id !== 1)?.photo_url);
      setUserName(res.data.find((data) => data.user_id !== 1)?.user_name);
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    });
  }, []);

  /* chatData가 업데이트 될때마다 스크롤을 최 하단으로 지정 */
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatData]);

  /* api 주소에서 받아온 데이터를 가공하는 로직 */
  const renderChatData = () => {
    let currentDate = null;
    return (
      chatData
        /* 데이터를 날짜 순서대로 정렬 후 같은 날짜가 있으면 id 내림차순 정렬 */
        .sort((a, b) => {
          const dateComparison = new Date(a.created_at) - new Date(b.created_at);
          if (dateComparison === 0) {
            return b.id - a.id;
          }
          return dateComparison;
        })
        /* map 메소드를 이용해 Msg 컴포넌트에 가공 된 data 전달 */
        .map((data) => {
          const date = new Date(data.created_at).toLocaleDateString();
          const time = new Date(data.created_at).toLocaleTimeString();
          let dateHeader = null;
          if (currentDate !== date) {
            const dateString = date;
            const headerDate = new Date(dateString);
            const formattedTime = headerDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            });
            currentDate = date;
            dateHeader = <DateHeader date={formattedTime} />;
          }
          return (
            <>
              {dateHeader}
              {data.msg.mtype === "text" ? <Msg key={data.id} data={data} time={time} /> : null}
            </>
          );
        })
    );
  };

  /* 메세지를 보내는 로직 */
  const sendMessage = (message) => {
    const getNextId = () => {
      const maxId = chatData.reduce((acc, cur) => {
        return cur.id > acc ? cur.id : acc;
      }, 0);
      return maxId + 1;
    };
    const addChatData = {
      id: getNextId(),
      user_id: 1,
      user_name: "소개녀",
      photo_url: "https://photo.vanillabridge.com/app_photos/agent_woman.jpg",
      created_at: new Date().toISOString(),
      msg: {
        mtype: "text",
        content: message,
      },
    };

    setChatData([...chatData, addChatData]);
  };

  return (
    <Box className='chatBox' ref={chatBoxRef}>
      <Header photoUrl={photoUrl} userName={userName} />
      {renderChatData()}
      <InputArea sendMessage={sendMessage} />
    </Box>
  );
}

export default Chat;
