import React, { Component } from 'react';
import { connect } from 'react-redux'
import JSONPretty from 'react-json-pretty';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ListGroup } from 'react-bootstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import moment from 'moment';
import { handleRetrieveMonitDetails } from './../actions/monitDetails'
import ItemConfig from './auxiliary/ItemConfig';
import Loading from './auxiliary/Loading';
import { datePattern } from '../constants/appConstants';

class MonitDetails extends Component {

  state = {
    value: '',
    copied: false
  };

  createCopyToClipboardNotification = () => {
    NotificationManager.success('Copiado para a área de transferência', '', 2000);
  }

  onCopy = () => {
    this.setState({ copied: true });
    this.createCopyToClipboardNotification();
  };

  convertDate = (monitDetails) => {
    monitDetails.datRecebimento = !!monitDetails.datRecebimento
      ? moment(monitDetails.datRecebimento).format(datePattern()) : ''
    monitDetails.datEnvio = !!monitDetails.datEnvio
      ? moment(monitDetails.datEnvio).format(datePattern()) : ''
  }

  componentDidMount() {
    this.props.retrieveMonitDetails(this.props.match.params.idMonit);
  }

  render() {
    const monitDetails = this.props.monitDetails

    if (!monitDetails) {
      return <Loading />
    }

    this.convertDate(monitDetails);

    console.log('[MonitDetails]')

    return (
      <>
        <div className='shadowDiv'>
          <ItemConfig label="ID" value={monitDetails.id} />
          <ItemConfig label="Data de Envio" value={monitDetails.datEnvio} />
          <ItemConfig label="Data de Recebimento" value={monitDetails.datRecebimento} />
          <ItemConfig label="Status Code" value={monitDetails.statusCode} />
          <ItemConfig label="Dados enviados" value={monitDetails.dadosIntegracaoEnviado} />
          <ItemConfig label="Dados recebidos" value={<JSONPretty data={monitDetails.dadosIntegracaoRecebido} />} />
          <ItemConfig label="Descrição Erro" value={monitDetails.descError} />
          <ListGroup.Item>Stack Erro:
          <CopyToClipboard onCopy={this.onCopy} text={monitDetails.error}>
              <span style={activeStyle} className="configBox">{monitDetails.error}</span>
            </CopyToClipboard>
          </ListGroup.Item>
        </div>
        <NotificationContainer />
      </>
    );
  }
}

const activeStyle = {
  wordBreak: 'break-all',
  border: 'none'
}

const mapStateToProps = state => {
  return {
    monitDetails: state.monitDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveMonitDetails: (idMonit) => dispatch(handleRetrieveMonitDetails(idMonit))
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(MonitDetails);