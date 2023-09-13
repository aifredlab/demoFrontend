import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import ProductSelectPage from './ProductSelectPage';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Col, FloatingLabel, Row, ToastContainer } from 'react-bootstrap';


const StyledDiv = styled.div`    
    margin-top: 5px;
    margin-bottom: 5px;
  `;

/**
 * 문의 페이지
 * 
 * @returns 
 */
function QuestionPage() {
  const [show, setShow] = useState(false);

  const [product, setProduct] = useState({ companyId: "", companyText: "", insId: "", insuranceText: "" })


  /**
   * 초기화
   */
  useEffect(() => {

  });


  return (
    <Form>

      <Row className="align-items-center">
        <Col xs="9">
          <Form.Control as={Col} xs="1" type="text" readOnly >{`${product.companyText} - ${product.insuranceText}`}</Form.Control>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={() => setShow(true)} >상품선택</Button>
        </Col>
      </Row>

      <div>
        <StyledDiv>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            readOnly
          />
        </StyledDiv>
        <StyledDiv>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            readOnly
          />
        </StyledDiv>
        <StyledDiv>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            readOnly
          />
        </StyledDiv>

      </div>

      {/* 질문하기 영역 */}
      <Row className="align-items-center">
        <Col xs="10">
        <Form.Control type="text" id="inputQuestion" placeholder="질문하기" />
        </Col>
        <Col xs="auto">
        <Button variant="outline-primary">전송</Button>
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
