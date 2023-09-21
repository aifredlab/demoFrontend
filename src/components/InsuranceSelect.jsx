import { ChangeEvent, useState, useRef, forwardRef } from 'react';

import { Typeahead,  } from 'react-bootstrap-typeahead';
import '../styles/styles.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'


/**
 * 보험 선택 component
 * @param insurances 
 * @returns 
 */
//export default function InsuranceSelect({ insurances, callbackFunc}: Insurances) {
function InsuranceSelect(props, ref) {
    
    const onChangeEventHandler = (selected)=>{
        props.selectCallbackFunc(selected[0]?.id)
    }

    return (
        <>
            <Typeahead
                clearButton
                labelKey="name"
                options={props.insurances}
                placeholder="보험 찾기"
                onChange={onChangeEventHandler}
                //selected={selectedInsurance}
                ref={ref}
            />
        </>
    );
}


export default forwardRef(InsuranceSelect);