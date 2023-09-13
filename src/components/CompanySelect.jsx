import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css'

/**
 * 보험사 선택 component
 * @param companies 
 * @returns 
 */
export default function CompanySelect(props) {

    const onChangeEventHandler = (selected) => {
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