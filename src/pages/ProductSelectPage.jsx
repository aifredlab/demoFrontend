import { SetStateAction, useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import CompanySelect from '../components/CompanySelect';
import InsuranceSelect from '../components/InsuranceSelect';
import { Button, InputGroup } from 'react-bootstrap';
import '../styles/styles.css'
import Product from './QuestionPage';
import Alert from '../components/Alert';
import styled from 'styled-components';
import axios from 'axios';
import { Typeahead,  } from 'react-bootstrap-typeahead';
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

    const [companies, setCompanies] = useState([]); //보험사리스트
    const [insurances, setInsurances] = useState([]); //보험상품리스트

    //콤포넌트 값
    const [selectedRadioValue, setSelectedRadioValue] = useState("0");
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [selectedInsuranceId, setSelectedInsuranceId] = useState("");
    const [validated, setValidated] = useState(false);

    const companySelectRef = useRef(null);

    //초기화
    useEffect(() => {
        axios.get('/getAllInsCompanies')
            .then(response => {
                console.log("getAllInsCompanies->" + response.data.length); //TODO:에러처리
                setCompanies(response.data);

                axios.get('/getAllInsurances')
                    .then(response => {
                        console.log("getAllInsurances->" + response.data.length); //TODO:에러처리
                        setInsurances(response.data);
                    })
                    .catch(error => alert("상품정보 조회 오류:" + error))
            })
            .catch(error => alert("보험사정보 조회 오류:" + error))
    }, []);

    //라디오버튼 변경 이벤트 핸들러
    const handleRadioChange = (e => {
        setSelectedRadioValue(e.target.value);
    });

    //저장 버튼 클릭 이벤트 핸들러
    const onClickSaveButton = () => {
        if (selectedInsuranceId == "") {
            //TODO: Alert띄우기
        }

        if (selectedRadioValue == "0") { //보험찾기
            const insId = insurances.find(item => item.id == selectedInsuranceId)?.insId; //보험사id

            const product = {
                companyId: insId,
                companyText: companies.find(item => item.id == insId)?.name,

                insId: selectedInsuranceId,
                insuranceText: insurances.find(item => item.id == selectedInsuranceId)?.name
            };
            props.saveCallBackFunc(product);

        }
        else { //보험선택
            const product = {
                companyId: selectedCompanyId,
                companyText: companies.find(item => item.id == selectedCompanyId)?.name,
                insId: selectedInsuranceId,
                insuranceText: insurances.find(item => item.id == selectedInsuranceId)?.name
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
                        : <CompanySelect companies={companies} selectCallbackFunc={(companyId)=> {
                            setSelectedCompanyId(companyId);
                            companySelectRef?.current?.clear(); //보험선택 초기화
                        }}  />}
                </StyledDiv>

                <StyledDiv>
                    {selectedRadioValue == "1" && <InsuranceSelect ref={companySelectRef} selectCallbackFunc={setSelectedInsuranceId} insurances={insurances.filter((item) => item.insId == selectedCompanyId)} />}
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