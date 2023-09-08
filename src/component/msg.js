import { useRef, useState, useEffect } from "react";
import { Box, Avatar, Stack, Typography, Popover, Fade, Modal } from "@mui/material";

/* 
채팅 메세지 컴포넌트
data : 채팅 데이터 객체
*/
function Msg({ data }) {
  /* created_at 날짜를 형식에 맞게 포멧 하는 로직
  ex) 오전 8:12 */
  const timeString = data.created_at;
  const date = new Date(timeString);
  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  /* 클립보드에 복사하는 로직 */
  const [anchorEl, setAnchorEl] = useState(null);
  const boxRef = useRef(null);

  const handleBoxClick = () => {
    const text = boxRef.current.innerText; // current 속 ref 객체가 참조하는 DOM 지정후 텍스트 추출 -> 변수에 할당
    navigator.clipboard.writeText(text); // 클립보드에 복사
    setAnchorEl(boxRef.current); // popover의 위치를 지정하기 위해 anchorEl에 boxRef.current를 할당
    setTimeout(() => {
      //타임아웃으로 자동으로 사라지게 구현
      handleClose();
    }, 1000);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {}, [anchorEl]);

  /* 이미지 모달창 로직 */
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
      <Stack direction='row' spacing={0.6} justifyContent={data.user_id !== 1 ? "left" : "right"}>
        {data.user_id !== 1 ? (
          <>
            <Avatar src={data.photo_url} sx={{ width: 30, height: 30 }} onClick={handleModalOpen} />
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              sx={{
                width: 250,
                height: 250,
                position: "fixed",
                top: "calc(50% - 125px)",
                left: "calc(50% - 125px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img
                src={data.photo_url}
                alt='img'
                onClick={handleModalClose}
                style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
              />
            </Modal>
            <Stack direction='column'>
              <Typography className='userNameText'>{data.user_name}</Typography>
              <Box
                className='recvMsgBox'
                sx={{ boxShadow: "0px 1px 2px lightgrey" }}
                onClick={handleBoxClick}
                ref={boxRef}>
                <Typography className='recvMsgText' p={1} whiteSpace={"pre-wrap"}>
                  {data.msg.content.replace(/\\n/g, "\n")}
                </Typography>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  TransitionProps={{ enter: true, exit: true, timeout: 500, appear: true }}
                  TransitionComponent={Fade}>
                  <Typography sx={{ p: 2 }}>클립보드에 복사 되었습니다.</Typography>
                </Popover>
              </Box>
            </Stack>
            <Typography className='createAtText' sx={{ alignSelf: "flex-end" }}>
              {formattedTime}
            </Typography>
          </>
        ) : (
          <>
            <Typography className='createAtText' sx={{ alignSelf: "flex-end" }}>
              {formattedTime}
            </Typography>
            <Box
              className='sendMsgBox'
              sx={{ boxShadow: "0px 1px 2px lightgrey" }}
              onClick={handleBoxClick}
              ref={boxRef}>
              <Typography className='sendMsgText' p={1.2} whiteSpace={"pre-wrap"} ref={boxRef}>
                {data.msg.content.replace(/\\n/g, "\n")}
              </Typography>
              <Popover
                open={open}
                anchorEl={anchorEl}
                TransitionProps={{ enter: true, exit: true, timeout: 500, appear: true }}
                TransitionComponent={Fade}>
                <Typography sx={{ p: 2 }}>클립보드에 복사 되었습니다.</Typography>
              </Popover>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Msg;
