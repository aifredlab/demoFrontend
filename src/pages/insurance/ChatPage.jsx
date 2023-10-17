// material-ui
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Person3Icon from '@mui/icons-material/Person3';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SendIcon from '@mui/icons-material/Send';
// project import
import MainCard from 'components/MainCard';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import chatList from '../../menu-items/chatList';
import * as React from 'react';
import ProductSelectPage from './ProductSelectPage';

const ChatPage = () => {
  const [open, setOpen] = useState(false); //상품선택팝업표시여부
  const [product, setProduct] = useState({ companyId: '', companyText: '', insId: '', insuranceText: '' });
  const [question, setQuestion] = useState('');
  const [agreement, setAgreement] = useState('');
  const [chatList, setChatList] = useState([]);

  /**
   * 질문버튼 클릭
   * @param e
   */
  const handleBtnSendClick = (e) => {
    const humanQuestion = { who: '1', contents: question };
    const aiAnswer = { who: '2', contents: '' };

    setQuestion('');

    setChatList((prevChatList) => [
      ...prevChatList,
      { ...humanQuestion, key: String(prevChatList.length + 1) },
      { ...aiAnswer, key: String(prevChatList.length + 2) }
    ]);

    axios
      .post('/api/ask', {
        question: question // 쿼리 매개변수 이름과 값을 여기에 추가
        // params: {
        //   question: question // 쿼리 매개변수 이름과 값을 여기에 추가
        // }
      })
      .then((response) => {
        setAgreement(response.data.agreementContents);

        //채팅내용 set
        setChatList((prevChatList) => {
          const lastIndex = prevChatList.length - 1;
          const updatedChatList = [...prevChatList];
          updatedChatList[lastIndex] = { ...updatedChatList[lastIndex], contents: response.data.reply };
          return updatedChatList;
        });

        //왼쪽 사이드바 채팅목록 추가
        // const children = {
        //   //id: 'util-typography',
        //   title: question,
        //   type: 'item',
        //   icon: icons.FontSizeOutlined
        // };

        // chatList.children = [...chatList.children, children];
      })
      .catch((error) => {
        console.log(error);
        //채팅내용 set
        setChatList((prevChatList) => {
          const lastIndex = prevChatList.length - 1;
          const updatedChatList = [...prevChatList];
          updatedChatList[lastIndex] = { ...updatedChatList[lastIndex], contents: '응답실패' };
          return updatedChatList;
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  //스트림으로 요청
  // const handleBtnSendClick2 = (e => {

  //   const humanQuestion = {'who':'1', 'contents': question};
  //   const aiAnswer = {'who':'2', 'contents': ''};

  //   setQuestion("");
  //   //decoratedOnClick();

  //   setChatList((prevChatList)=>[...prevChatList,
  //     {...humanQuestion, key: String(prevChatList.length + 1)},
  //     {...aiAnswer, key: String(prevChatList.length + 2)}]);

  //     //fetch('streamPush', {
  //       fetch('http://localhost:8080/streamPush', { //TODO:왜 full url을 써야 할까?
  //       headers: {
  //         'Content-Type': 'application/stream+json'
  //       }
  //     }).then(async response => {
  //       const reader = response.body.getReader();
  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) {
  //           break;
  //         }

  //         const text = new TextDecoder('utf-8').decode(value);

  //         // value를 처리합니다.
  //         console.log(text);

  //         setChatList((prevChatList) => {
  //           const lastIndex = prevChatList.length - 1;
  //           const updatedChatList = [...prevChatList];
  //           updatedChatList[lastIndex] = { ...updatedChatList[lastIndex], contents: updatedChatList[lastIndex].contents + text };
  //           return updatedChatList;
  //          });
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // });

  return (
    <MainCard title="">
      <Stack spacing={1} direction="column">
        <Stack spacing={1} direction="row">
          <TextField
            id="fullWidth"
            InputProps={{
              readOnly: true
            }}
            fullWidth
            sx={{ m: 1, width: '40ch' }}
            value={`${product.companyText} - ${product.insuranceText}`}
          />
          <Button variant="contained" onClick={() => setOpen(true)}>
            상품선택
          </Button>
        </Stack>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>보험약관</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{agreement}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>질의응답</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper'
              }}
            >
              {chatList.map((chat, i) => {
                if (chat.who == '1') {
                  //사용자
                  //return <ListGroup.Item variant="primary" key={chat.key}><img src={iconHuman} width='25' height='25'></img> {chat.contents}</ListGroup.Item>

                  return (
                    <ListItem style={{ backgroundColor: '#cfe2ff' }} key={chat.key}>
                      <ListItemAvatar>
                        <Avatar>
                          <Person3Icon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={chat.contents} />
                    </ListItem>
                  );
                } else {
                  //ai
                  //return <ListGroup.Item key={chat.key}><img src={iconAi} width='25' height='25'></img> {chat.contents || <StyledSpinner animation="border" />}</ListGroup.Item>
                  return (
                    <ListItem key={chat.key}>
                      <ListItemAvatar>
                        <Avatar>
                          <PsychologyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={chat.contents || 'Loading...'} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </AccordionDetails>
        </Accordion>

        <Stack spacing={1} direction="row">
          <TextField fullWidth value={question} placeholder="질문하기" onChange={(e) => setQuestion(e.target.value)} />
          <IconButton aria-label="delete" onClick={handleBtnSendClick}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* 모달팝업 영역 */}
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          보험상품 선택
        </DialogTitle>
        <DialogContent>
          {/* 팝업 본문 */}
          <ProductSelectPage
            saveCallBackFunc={
              //저장 버튼 콜백
              (product) => {
                //setPopupSelectedProduct(...product) //TODO: 이렇게 안되는 이유는?
                console.log("zzzzdsfsdfasdfsdf")
                setProduct({
                  companyId: product.companyId,
                  companyText: product.companyText,
                  insId: product.insId,
                  insuranceText: product.insuranceText
                });

                setOpen(false);
              }
            }
            closeCallBackFunc={() => setOpen(false)}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={onClickSaveButton}>확인</Button>
          <Button onClick={props.closeCallBackFunc}>닫기</Button>
        </DialogActions> */}
      </Dialog>
    </MainCard>
  );
};

export default ChatPage;
