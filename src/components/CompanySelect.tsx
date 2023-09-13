import { useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css'

interface Company {
    id: string;
    text: string;
}

interface Companies {
    companies: Company[]
}

/**
 * 보험사 선택 component
 * @param companies 
 * @returns 
 */
export default function CompanySelect(props: any) {

    const onChangeEventHandler: any = (selected: any) => {
        props.selectCallbackFunc(selected[0]?.id)
    }

    return (
        <>
            <Typeahead
                clearButton
                id="basic-typeahead-single"
                labelKey="text"
                options={props.companies}
                placeholder="보험사 찾기"
                onChange={onChangeEventHandler}
            />
        </>
    );
}
