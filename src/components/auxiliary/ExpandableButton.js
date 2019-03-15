import React from 'react';
import { Button, ListGroup } from 'react-bootstrap'

const ExpandableButton = (props) => {

  console.log('[ExpandableButton]')

  return (
    <ListGroup.Item>
      <Button variant="light" onClick={props.clickHandler} >
        <b>Valores fixos enviados no JSON</b>
      </Button>
    </ListGroup.Item>
  );
}

export default React.memo(ExpandableButton);