import { ChangeEvent, useState, useRef, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
/**
 * 보험 선택 component
 * @param insurances
 * @returns
 */
//export default function InsuranceSelect({ insurances, callbackFunc}: Insurances) {
function InsuranceSelect(props, ref) {

const [value, setValue] = useState(""); 


  const onChangeEventHandler = (e, selected) => {
    props.selectCallbackFunc(selected?.id);
  };

  const onchage = (e, newValue) => {
  };

  return (
    <>
      <Autocomplete
        //   disablePortal
        id="insuranceSelect"
        options={props.insurances}
        sx={{ width: 300 }}
        onChange={onChangeEventHandler}
        renderInput={(params) => <TextField {...params} label="보험 찾기" />}
        ref={ref}
        value={value}
      />
    </>
  );
}
//export default InsuranceSelect;
export default forwardRef(InsuranceSelect);
