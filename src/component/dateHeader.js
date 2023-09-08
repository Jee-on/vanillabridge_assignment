import { Typography, Box } from "@mui/material";

/*
메세지 사이 날짜 출력 컴포넌트 
formatting이 완료된 Date를 받아와서 출력
*/

function DateHeader({ date }) {
  return (
    <Box alignItems={"center"} display='flex' justifyContent={"center"}>
      <Box sx={{ width: 150, height: 20, bgcolor: "#979696", borderRadius: 2 }} align='center' m={2}>
        <Typography sx={{ color: "white", fontSize: 12, fontWeight: 500, fontFamily: "Pretendard" }}>{date}</Typography>
      </Box>
    </Box>
  );
}

export default DateHeader;
