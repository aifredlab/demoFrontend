import { ChangeEvent, useState } from 'react';
import { Typeahead,  } from 'react-bootstrap-typeahead'; // ES2015
import '../styles/styles.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'


/**
 * 보험 선택 component
 * @param insurances 
 * @returns 
 */
//export default function InsuranceSelect({ insurances, callbackFunc}: Insurances) {
export default function InsuranceSelect(props) {
    
    const onChangeEventHandler = (selected)=>{
        props.selectCallbackFunc(selected[0]?.id)
    }

    return (
        <>
            <Typeahead
                clearButton
                id="basic-typeahead-single"
                labelKey="name"
                options={props.insurances}
                placeholder="보험 찾기"
                onChange={onChangeEventHandler}
                //selected={selectedInsurance}
            />
        </>
    );
}
