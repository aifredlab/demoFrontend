import { SetStateAction, useState } from 'react';
import Form from 'react-bootstrap/Form';
import CompanySelect from '../components/CompanySelect';
import InsuranceSelect from '../components/InsuranceSelect';
import { Button, InputGroup } from 'react-bootstrap';
import '../styles/styles.css'
import Product from './QuestionPage';
import Alert from '../components/Alert';
import styled from 'styled-components';


const StyledDiv = styled.div`        
        margin-bottom: 5px;
    `;

/**
 *  상품선택 페이지
 *  
 * @param props 
 * @returns 
 */
export default function ProductSelectPage(props) {

    console.log("component reloaded..............");

    

    const [companies, setCompanies] = useState([{ id: "00", text: "삼성화재" },
                                                { id: "01", text: "현대해상" },
                                                { id: "02", text: "메리츠화재" },
                                                { id: "03", text: "KB손해보험" },
                                                { id: "04", text: "DB손해보험" },
                                                { id: "05", text: "한화손해보험" },
                                                { id: "06", text: "흥국화재" },
                                                { id: "07", text: "롯데손해보험" },
                                                { id: "08", text: "하나손해보험" },
                                                ]);

    const [insurances, setInsurances] = useState([{ id: "0000", insId: "00", text: "삼성화재 다이렉트운전자보험" },
                                                { id: "0001", insId: "00", text: "삼성화재 애니카 다이렉트" },
                                                { id: "0002", insId: "00", text: "삼성화재 다이렉트 어린이보험" },
                                                { id: "0003", insId: "00", text: "삼성화재 다이렉트 실손보험" },
                                                { id: "0010", insId: "01", text: "어린이보험" },
                                                ]);

    const [selectedRadioValue, setSelectedRadioValue] = useState("0");
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [selectedInsuranceId, setSelectedInsuranceId] = useState("");

    const [validated, setValidated] = useState(false);



    //라디오버튼 변경 이벤트 핸들러
    const handleRadioChange = (e => {
        setSelectedRadioValue(e.target.value);
    });

    //저장 버튼 클릭 이벤트 핸들러
    const onClickSaveButton = () => {

        
        if (selectedInsuranceId == "") {
            return <Alert title={'보험찾기'} content={'보험이 선택되지 않았습니다.'} />
        }

        if (selectedRadioValue == "0") { //보험찾기
            const insId = insurances.find(item => item.id == selectedInsuranceId)?.insId; //보험사id

            const product = {
                companyId: insId,
                companyText: companies.find(item => item.id == insId)?.text,

                insId: selectedInsuranceId,
                insuranceText: insurances.find(item => item.id == selectedInsuranceId)?.text
            };
            props.saveCallBackFunc(product);

        }
        else { //보험선택
            const product = {
                companyId: selectedCompanyId,
                companyText: companies.find(item => item.id == selectedCompanyId)?.text,
                insId: selectedInsuranceId,
                insuranceText: insurances.find(item => item.id == selectedInsuranceId)?.text
            };
            props.saveCallBackFunc(product);
        }
    };


    /**
     *  validation 테스트 코드
     * @param event 
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        form.checkValidity()
        // if (form.checkValidity() === false) {
        //   event.preventDefault();
        //   event.stopPropagation();
        // }

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div key={`inline-radio`} className="mb-3">
                <Form.Check
                    inline
                    label="보험찾기"
                    name="group1"
                    type="radio"
                    onChange={handleRadioChange}
                    checked={selectedRadioValue == "0"}
                    value="0"
                />
                <Form.Check
                    inline
                    label="보험선택"
                    name="group1"
                    type="radio"
                    onChange={handleRadioChange}
                    checked={selectedRadioValue == "1"}
                    value="1"
                />
            </div>
            <div>

                <StyledDiv>
                     {selectedRadioValue == "0" ? <InsuranceSelect selectCallbackFunc={setSelectedInsuranceId} insurances={insurances} />
                        : <CompanySelect selectCallbackFunc={setSelectedCompanyId} companies={companies} />}
                </StyledDiv>

                <StyledDiv>
                    {selectedRadioValue == "1" && <InsuranceSelect selectCallbackFunc={setSelectedInsuranceId} insurances={insurances.filter((item) => item.insId == selectedCompanyId)} />}
                </StyledDiv>

                {/* <InputGroup hasValidation>
                    <Form.Control.Feedback type="invalid">
                        1111111111111111111111111111
                    </Form.Control.Feedback>

                </InputGroup>


                <InputGroup hasValidation>
                    {selectedRadioValue == "1" && <InsuranceSelect selectCallbackFunc={setSelectedInsuranceId} insurances={insurances} />}

                    <Form.Control.Feedback type="invalid">
                        22222222222222222222222222
                    </Form.Control.Feedback>
                </InputGroup>

*/}
            </div>


            {/* <Button type="submit">Submit form</Button> */}


            <div className='buttonArea'>
                <Button variant="primary" onClick={onClickSaveButton}>확인
                </Button>
                <Button variant="secondary" onClick={props.closeCallBackFunc}>닫기</Button>
            </div>


        </Form>
    )
}