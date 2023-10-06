import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import ProductSelectPage from './ProductSelectPage';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Col, FloatingLabel, Row, ToastContainer, ListGroup } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import iconAi from '../images/icon_ai.png'
import iconHuman from '../images/icon_human.png'
import iconSend from '../images/icon_send.png'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useContext } from 'react';
import * as common from '../common';

const PINK = 'rgba(255, 192, 203, 0.6)';
const BLUE = 'rgba(0, 0, 255, 0.6)';

 const StyledSpinner = styled(Spinner)`
     margin-top: 5px;    
   `;


const StyledDiv = styled.div`    
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30%;
    overflow-y: auto;
  `;


    

  function ContextAwareToggle({ children, eventKey, callback }) {

    const { activeEventKey } = useContext(AccordionContext);
    
    const decoratedOnClick = useAccordionButton( eventKey, () => callback && callback(eventKey),);
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }


/**
 * 문의 페이지
 * 
 * @returns 
 */
function QuestionPage() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({ companyId: "", companyText: "", insId: "", insuranceText: "" });
  const [question, setQuestion] = useState("");

  const [chatList, setChatList] = useState([]);

  const decoratedOnClick = useAccordionButton("0", () =>
    console.log('totally custom!'),
  );

  const decoratedOnClick2 = useAccordionButton( "11", () => console.log('totally custom!'));


  
  /**
   * 질문버튼 클릭
   * @param e 
   */
  // const handleBtnSendClick = (e => {

  //   const humanQuestion = {'who':'1', 'contents': question};
  //   const aiAnswer = {'who':'2', 'contents': ''};

  //   setQuestion("");
  //   decoratedOnClick();

  //   setChatList((prevChatList)=>[...prevChatList, 
  //     {...humanQuestion, key: String(prevChatList.length + 1)}, 
  //     {...aiAnswer, key: String(prevChatList.length + 2)}]);

  //   axios.get('/askQuestion')
  //   .then(response => {
  //     setChatList((prevChatList) => {
  //       const lastIndex = prevChatList.length - 1;
  //       const updatedChatList = [...prevChatList];
  //       updatedChatList[lastIndex] = { ...updatedChatList[lastIndex], contents: response.data.response };
  //       return updatedChatList;
  //     });

  //   })
  //   .catch(error => console.log(error))
  // });

  const handleBtnSendClick = (e => {

    const humanQuestion = {'who':'1', 'contents': question};
    const aiAnswer = {'who':'2', 'contents': ''};

    setQuestion("");
    decoratedOnClick();

    setChatList((prevChatList)=>[...prevChatList, 
      {...humanQuestion, key: String(prevChatList.length + 1)}, 
      {...aiAnswer, key: String(prevChatList.length + 2)}]);

      fetch('/streamPush', {
  headers: {
    'Content-Type': 'application/stream+json'
  }
})
  .then(response => {
    const reader = response.body.getReader();

    const processData = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // value를 처리합니다.
        console.log(value);
      }
    };

    processData();
  })
  .catch(error => {
    console.error('Error:', error);
  });


  });

  return (

    
    <Form>
       <Accordion defaultActiveKey="00">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="00">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="00">
          <Card.Body>Hello! I am the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="11">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="11">
          <Card.Body>Hello! I am another body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Button variant="light" onClick={decoratedOnClick2}><img src={iconSend} width='25' height='25' /></Button>
    </Accordion>



      <Row className="align-items-center">
        <Col xs="9">
          <Form.Control as={Col} xs="1" type="text" readOnly >{`${product.companyText} - ${product.insuranceText}`}</Form.Control>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={() => setShow(true)} >상품선택</Button>
        </Col>
      </Row>

      <StyledDiv>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>보험약관</Accordion.Header>
            <Accordion.Body>
              <StyledDiv>
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  readOnly
                  value='보험약관 내용표시'
                />
              </StyledDiv>


            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>질의응답</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {
                  chatList.map((chat, i)=>{
                    if (chat.who == "1") { //사용자
                      return <ListGroup.Item variant="primary" key={chat.key}><img src={iconHuman} width='25' height='25'></img> {chat.contents}</ListGroup.Item>
                    }
                    else { //ai
                      return <ListGroup.Item key={chat.key}><img src={iconAi} width='25' height='25'></img> {chat.contents || <StyledSpinner animation="border" />}</ListGroup.Item>
                    }
                  })
                }
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </StyledDiv>


      {/* 질문하기 영역 */}
      <Row className="align-items-center">
        <Col xs="10">
          <Form.Control type="text" id="inputQuestion" placeholder="질문하기" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </Col>
        <Col xs="auto">
          <Button variant="light" onClick={handleBtnSendClick}><img src={iconSend} width='25' height='25' /></Button>
        </Col>
      </Row>

      {/* 모달팝업 영역 */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>보험상품 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 팝업 본문 */}
          <ProductSelectPage
            saveCallBackFunc={ //저장 버튼 콜백
              (product) => {
                //setPopupSelectedProduct(...product) //TODO: 이렇게 안되는 이유는?
                setProduct({
                  companyId: product.companyId,
                  companyText: product.companyText,
                  insId: product.insId,
                  insuranceText: product.insuranceText
                });

                setShow(false);
              }}

            closeCallBackFunc={() => setShow(false)}
          />
        </Modal.Body>
      </Modal>

    </Form>
  );
}

export default QuestionPage;
