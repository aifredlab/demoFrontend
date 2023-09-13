import Button from 'react-bootstrap/Button';
import mainImage from '../images/main.jpg'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
    text-align: center;
`;

const titleDiv = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 20px;
`;
function HomePage() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/question');

    return (
        <div>
            <StyledDiv>
                반가와요.
            </StyledDiv>
            <StyledDiv>
                고객님을 도와드릴 알프레드 챗봇입니다.
            </StyledDiv>
            <StyledDiv>
                <img width="450" height="500" src={mainImage}></img>
            </StyledDiv>
            <StyledDiv>
                <Button variant="outline-primary" onClick={handleClick}>시작하기</Button>{' '}
            </StyledDiv>
        </div>
    );
}

export default HomePage;
