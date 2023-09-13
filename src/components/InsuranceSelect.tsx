import { ChangeEvent, useState } from 'react';
import { Typeahead,  } from 'react-bootstrap-typeahead'; // ES2015
import '../styles/styles.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

interface Insurance {
    id: string;
    text: string;
    insId: string;
}

interface Insurances {
    insurances: Insurance[];
    callbackFunc: Function;
}

/**
 * 보험 선택 component
 * @param insurances 
 * @returns 
 */
//export default function InsuranceSelect({ insurances, callbackFunc}: Insurances) {
export default function InsuranceSelect(props: any) {
    
    const onChangeEventHandler: any = (selected: any)=>{
        props.selectCallbackFunc(selected[0]?.id)
    }

    return (
        <>
            <Typeahead
                clearButton
                id="basic-typeahead-single"
                labelKey="text"
                options={props.insurances}
                placeholder="보험 찾기"
                onChange={onChangeEventHandler}
                //selected={selectedInsurance}
            />
        </>
    );
}
