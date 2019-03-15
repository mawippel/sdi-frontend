import React from 'react';
import { ListGroup } from 'react-bootstrap'

const ItemConfig = (props) => {

    const activeStyle = {
      backgroundColor: props.bgColor,
      wordBreak: 'break-all',
      border: props.borderNone
    }
    const { label, value } = props

    console.log('[ItemConfig]')

    return (
      <ListGroup.Item>{label}: <span style={activeStyle} className="configBox">{value}</span></ListGroup.Item>
    )
}

export default React.memo(ItemConfig);