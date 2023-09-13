import React, { ChangeEvent } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';



function TestPage() {

  const options = [
    'Warsaw',
    'Kraków',
    'Łódź',
    'Wrocław',
    'Poznań',
    'Gdańsk',
    'Szczecin',
    'Bydgoszcz',
    'Lublin',
    'Katowice',
    'Białystok',
    'Gdynia',
    'Częstochowa',
    'Radom',
    'Sosnowiec',
    'Toruń',
    'Kielce',
    'Gliwice',
    'Zabrze',
    'Bytom',
    'Olsztyn',
    'Bielsko-Biała',
    'Rzeszów',
    'Ruda Śląska',
    'Rybnik',
  ];

  
  return (


    <Typeahead
      clearButton
      defaultSelected={options.slice(0, 1)}
      id="selections-example"
      labelKey="name"
      onInputChange={(text, e) => {
        console.log(text, e);
      }}
      options={options}
      placeholder="Choose a state..."
    />
  );
}

export default TestPage;
