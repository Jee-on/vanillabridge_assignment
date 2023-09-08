import { useState } from "react";
import { Avatar, Grid, Stack, Typography, Modal } from "@mui/material";
import { MdChevronLeft } from "react-icons/md";

/*
채팅방 헤더 컴포넌트
photoUrl, userName을 props로 받와와서 출력
*/
function Header({ photoUrl, userName }) {
  /* start 모달 출력*/
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  /* end 모달 */

  return (
    <Grid
      container
      className='chatHeader'
      /* sticky로 채팅방 상단에 고정 */
      sx={{ position: "sticky", top: 0, zIndex: 1, justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={1} pl={1}>
        <MdChevronLeft size={27} color={"grey"} />
      </Grid>
      <Grid item xs={11} align='center'>
        <Stack direction='row' justifyContent={"center"} alignItems='center' spacing={1}>
          <Avatar sx={{ width: 28, height: 28 }} src={photoUrl} onClick={handleModalOpen}></Avatar>
          {/* 모달 위치는 화면크기에 비례해서 출력 */}
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
              src={photoUrl}
              alt='img'
              onClick={handleModalClose}
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          </Modal>
          <Typography className='headerUserNameText'>{userName}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Header;
