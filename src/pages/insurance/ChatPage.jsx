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

import * as React from 'react';
import ProductSelectPage from './ProductSelectPage';

import { useDispatch, useSelector } from 'react-redux';
import { addChat } from 'store/reducers/chatHistory';
import { dispatch } from 'store/index';

const ChatPage = () => {
  const [conversationId, setConversationId] = useState();
  const LOADING_MESSAGE = 'Loading...';
  const [open, setOpen] = useState(false); //상품선택팝업표시여부
  const [chatAccordionExpand, setChatAccordionExpand] = useState(false); //질의응답아코디언 확장여부
  const [product, setProduct] = useState({ companyId: '', companyText: '', insId: '', insuranceText: '' }); //상품정보
  const [question, setQuestion] = useState(''); //질문내용
  const [contents, setContents] = useState(''); //약관
  const [chatList, setChatList] = useState([]); //화면에 표시되는 채팅목록
  const [loading, setLoading] = useState(false); //api 로딩여부

  const handleBtnSendClick = (e) => {
    setChatAccordionExpand(true);

    const humanQuestion = { who: '1', text: question };
    const aiAnswer = { who: '2', text: '' };

    setQuestion(''); //채팅 inputbox 초기화

    setChatList((prevChatList) => [
      ...prevChatList,
      { ...humanQuestion, key: String(prevChatList.length + 1) },
      { ...aiAnswer, key: String(prevChatList.length + 2) }
    ]);

    //====================================================
    // 약관조회 API 호출
    //====================================================
    setLoading(true);
    const param = {
      question: question, //질문내용
      questionHistory: chatList.filter((data) => data.who == 1), //질문이력
      content: '' //약관
    };

    axios.post('/api/llm/askContents', param).then((response) => {
      console.log('response=' + JSON.stringify(response));
      param.content = response.data;

      setContents(response.data);

      //====================================================
      // 약관에 대한 답변 생성 API 호출
      //====================================================
      fetch('/api/llm/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/stream+json'
        },
        body: JSON.stringify(param)
      })
        .then(async (response) => {
          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            const chunk = new TextDecoder('utf-8').decode(value);

            // value를 처리합니다.
            console.log(chunk);

            setChatList((prevChatList) => {
              const lastIndex = prevChatList.length - 1;
              const updatedChatList = [...prevChatList];
              updatedChatList[lastIndex] = { ...updatedChatList[lastIndex], text: updatedChatList[lastIndex].text + chunk };
              return updatedChatList;
            });
          } //end of while

          //====================================================
          // 채팅 이력 저장
          //====================================================
          axios
            .post('/api/chatHistory/createChatHistory', {
              conversationId: conversationId,
              question: chatList[chatList.length - 2].text,
              answer: chatList[chatList.length - 1].text,
              content: contents
            })
            .then((response) => {
              console.log('response=' + JSON.stringify(response));

              // dispatch(
              //   addChat({
              //     ...chatList[chatList.length - 1],
              //     type: 'item',
              //     id: chatList.length - 1,
              //     title: '이 상품을 가입해서 만기가 되면 보험료 전액 환급이 가능해?'
              //   })
              // );

              setLoading(false);
            }) //end of then
            .catch((error) => {
              console.error('Error:', error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error:', error);

          setLoading(false);
        });
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBtnSendClick();
    }
  };

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

        <Accordion expanded={chatAccordionExpand}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>보험약관</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{contents}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={chatAccordionExpand}>
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
                      <ListItemText primary={chat.text} />
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
                      <ListItemText primary={chat.text || 'Loading...'} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </AccordionDetails>
        </Accordion>

        <Stack spacing={1} direction="row">
          <TextField
            fullWidth
            value={question}
            placeholder="질문하기"
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <IconButton aria-label="delete" onClick={handleBtnSendClick} disabled={loading}>
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
        onClose={() => setOpen(false)}
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
