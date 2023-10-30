import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

/**
 * 보험사 선택 component
 * @param companies
 * @returns
 */
export default function CompanySelect(props) {
  const onChangeEventHandler = (e, selected) => {
    props.selectCallbackFunc(selected?.id);
  };

  return (
    <>
      <Autocomplete
        //   disablePortal
        id="insuranceSelect"
        options={props.companies}
        sx={{ width: 300 }}
        onChange={onChangeEventHandler}
        renderInput={(params) => <TextField {...params} label="보험사 찾기" />}
      />
    </>
  );
}
