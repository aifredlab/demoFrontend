import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionPage from './pages/QuestionPage';




function App() {
  const StyledDiv = styled.div`
    margin: 15px 15px 15px 15px
  `;

  return (
    <>
      <Router>
        <Header />
        <body>
          <StyledDiv>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/question" element={<QuestionPage />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </StyledDiv>
        </body>
        <Footer />
      </Router>
    </>
  );
}

export default App;
