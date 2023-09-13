import { useState } from 'react';
import { Button, Col, FloatingLabel, Toast, ToastContainer } from 'react-bootstrap';



interface Props {
  title: string;
  content: string;
}

export default function Alert({title, content}: Props) {

  const [show, setShow] = useState(true);

  return (

    <ToastContainer
      className="p-3"
      position={'top-center'}
      style={{ zIndex: 1 }}
    >

      <Toast show={show} onClose={()=>!show} autohide>
        <Toast.Header>          
          <strong className="me-auto">title</strong>          
        </Toast.Header>
        <Toast.Body>content</Toast.Body>
      </Toast>

    </ToastContainer>

  )
}