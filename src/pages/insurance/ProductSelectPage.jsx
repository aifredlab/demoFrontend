import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { Box } from '../../../node_modules/@mui/material/index';

import CompanySelect from '../../components/insurance/CompanySelect';
import InsuranceSelect from '../../components/insurance/InsuranceSelect';
import Stack from '@mui/material/Stack';

/**
 *  상품선택 페이지
 *
 * @param props
 * @returns
 */
export default function ProductSelectPage(props) {
  //console.log('component reloaded..............');

  const [companies, setCompanies] = useState([]); //보험사리스트
  const [insurances, setInsurances] = useState([]); //보험상품리스트

  //콤포넌트 값
  const [selectedRadioValue, setSelectedRadioValue] = useState('0');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedInsuranceId, setSelectedInsuranceId] = useState('');
  const [validated, setValidated] = useState(false);

  const companySelectRef = useRef(null);

  //초기화
  useEffect(() => {
    axios
      .get('/api/getAllInsCompanies')
      .then((response) => {
        //console.log('getAllInsCompanies->' + response.data.length); //TODO:에러처리
        setCompanies(
          response.data.map((item) => {
            return { ...item, id: item.id, label: item.name };
          })
        );

        axios
          .get('/api/getAllInsurances')
          .then((response) => {
            //  console.log('getAllInsurances->' + response.data.length); //TODO:에러처리
            setInsurances(
              response.data.map((item) => {
                return { ...item, id: item.id, label: item.name };
              })
            );
          })
          .catch((error) => alert('상품정보 조회 오류:' + error));
      })
      .catch((error) => alert('보험사정보 조회 오류:' + error));
  }, []);

  //라디오버튼 변경 이벤트 핸들러
  const handleRadioChange = (e) => {
    setSelectedRadioValue(e.target.value);
  };

  //확인 버튼 클릭 이벤트 핸들러
  const onClickSaveButton = () => {
    if (selectedInsuranceId == '') {
      //TODO: Alert띄우기
    }

    if (selectedRadioValue == '0') {
      //보험찾기
      const insId = insurances.find((item) => item.id == selectedInsuranceId)?.insId; //보험사id

      const product = {
        companyId: insId,
        companyText: companies.find((item) => item.id == insId)?.name,

        insId: selectedInsuranceId,
        insuranceText: insurances.find((item) => item.id == selectedInsuranceId)?.name
      };
      props.saveCallBackFunc(product);
    } else {
      //보험선택
      const product = {
        companyId: selectedCompanyId,
        companyText: companies.find((item) => item.id == selectedCompanyId)?.name,
        insId: selectedInsuranceId,
        insuranceText: insurances.find((item) => item.id == selectedInsuranceId)?.name
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
    form.checkValidity();
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };

  return (
    <>
      <Stack spacing={1} direction="column">
        <FormControl>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="보험찾기"
              onChange={handleRadioChange}
              checked={selectedRadioValue === '0'}
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="보험선택"
              onChange={handleRadioChange}
              checked={selectedRadioValue === '1'}
            />
          </RadioGroup>
        </FormControl>
        <Box>
          {selectedRadioValue == '0' ? (
            <InsuranceSelect selectCallbackFunc={setSelectedInsuranceId} insurances={insurances} />
          ) : (
            <CompanySelect
              companies={companies}
              selectCallbackFunc={(companyId) => {
                setSelectedCompanyId(companyId);
                console.log('sss' + companySelectRef?.current);
                //companySelectRef?.current?.clear(); //보험선택 초기화
              }}
            />
          )}
        </Box>
        <Box>
          {selectedRadioValue == '1' && (
            <InsuranceSelect
              ref={companySelectRef}
              selectCallbackFunc={setSelectedInsuranceId}
              insurances={insurances.filter((item) => item.insId == selectedCompanyId)}
            />
          )}
        </Box>

        <Stack spacing={1} direction="row" justifyContent="center">
          <Button variant="contained" onClick={onClickSaveButton}>
            확인
          </Button>
          <Button variant="outlined" onClick={props.closeCallBackFunc}>
            닫기
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
