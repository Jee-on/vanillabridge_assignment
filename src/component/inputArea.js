import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { MdArrowUpward, MdOutlineAddCircleOutline } from "react-icons/md";

/*
채팅 입력창 컴포넌트
*/
function InputArea(props) {
  /* start 채팅입력 로직 */
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  /* inputText가 null이 아니면 부모 컴포넌트에서 받아온 sendMessage()에 인자로 전달
  inputText는 초기화 */
  const handleSendMsg = () => {
    if (inputText !== "") {
      props.sendMessage(inputText);
      setInputText("");
    }
  };

  /* 엔터키로 handleSendMsg() 작동하는 함수 */
  const handleSendMsgKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSendMsg();
    }
  };
  /* end 채팅입력 로직 */
  return (
    <Grid
      container
      className='inputArea'
      sx={{
        position: "sticky",
        bottom: 0,
        top: "auto",

        justifyContent: "center",
        alignItems: "center",
      }}>
      <Grid item>
        <MdOutlineAddCircleOutline size='35' color='lightgrey' />
      </Grid>
      <Grid item p={2}>
        <TextField
          id='inputText'
          value={inputText}
          onChange={handleInputText}
          onKeyDown={handleSendMsgKeyDown}
          sx={{
            pl: 2,
            pr: 2,
            width: 235,
            borderRadius: 5,
            fontSize: 13,
            bgcolor: "white",
            boxShadow: "0px 1px 2px lightgrey",
            outline: "none",
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position='end'>
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  display='flex'
                  bgcolor={inputText === "" ? "lightgrey" : "#03006E"}
                  onClick={handleSendMsg}>
                  <MdArrowUpward color='white' size='18' />
                </Box>
              </InputAdornment>
            ),
          }}
          variant='standard'
          placeholder='메세지를 입력해 주세요.'
          autoComplete='false'
          multiline
          maxRows={5}></TextField>
      </Grid>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default InputArea;
