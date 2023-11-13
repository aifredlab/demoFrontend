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
import ListItemButton from '@mui/material/ListItemButton';
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

import DraftsIcon from '@mui/icons-material/Drafts';

import * as React from 'react';
import ProductSelectPage from './ProductSelectPage';

import { useDispatch, useSelector } from 'react-redux';
import { addChat } from 'store/reducers/chatHistory';
import { dispatch } from 'store/index';
import ListItemIcon from 'themes/overrides/ListItemIcon';

const ChatPage = () => {
  const [conversationId, setConversationId] = useState();
  const [contentId, setContentId] = useState();

  const LOADING_MESSAGE = 'Loading...';
  const [open, setOpen] = useState(false); //상품선택팝업표시여부
  const [chatAccordionExpand, setChatAccordionExpand] = useState(true); //질의응답아코디언 확장여부
  const [product, setProduct] = useState({ companyId: '', companyText: '', insId: '', insuranceText: '' }); //상품정보
  const [question, setQuestion] = useState(''); //질문내용
  const [contents, setContents] = useState(''); //참조컨텐츠[약관등등...]
  const [chatList, setChatList] = useState([]); //화면에 표시되는 채팅목록
  const [loading, setLoading] = useState(false); //api 로딩여부

  const chatHistory = useSelector((state) => state.chatHistory);

  useEffect(() => {
    console.log('ChatPage() starts.................');

    //왼쪽 사이드바에서 대화이력 선택시
    if (chatHistory.id) {
      setConversationId(chatHistory.id);
      axios.get('/api/chatHistory/getChatHistoryDetail/' + chatHistory.id).then((response) => {
        console.log('response=' + JSON.stringify(response));
        setChatList(response.data);

        //마지막 대화의 연관 컨텐츠 출력
        setContents(response.data[response.data.length - 1].content);
      });
    }
  }, [chatHistory]);
  //,[chatHistory]);

  //보내기 버튼 클릭
  const handleBtnSendClick = (e) => {
    setChatAccordionExpand(true);

    const humanQuestion = { type: '1', text: question };
    const aiAnswer = { type: '2', text: '' };

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
      conversationId: conversationId,
      contentId: contentId,
      question: question, //질문내용
      questionHistory: chatList.filter((data) => data.type == 1), //질문이력
      content: '' //약관
    };

    axios.post('/api/llm/askContents', param).then((response) => {
      console.log('response=' + JSON.stringify(response));
      param.content = response.data.content;
      param.conversationId = response.data.conversationId;
      param.contentId = response.data.contentId;

      setContents(response.data.content);

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
              setLoading(false);
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

  const handleContentClick = (e, idx) => {
    setContents(chatList[idx].content);
  }

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
                if (chat.type == '1') {
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

                      {/* <ListItemIcon>
                        <PsychologyIcon />
                      </ListItemIcon> */}

                      <ListItemText primary={chat.text || 'Loading...'} />
                      <Avatar>
                        <DraftsIcon onClick={(e) => handleContentClick(e, i)} />
                      </Avatar>
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