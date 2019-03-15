import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ListGroup, Tab, Tabs, Fade } from 'react-bootstrap'
import { handleRetrieveConfig } from '../actions/config'
import ItemConfig from './auxiliary/ItemConfig'
import ExpandableButton from './auxiliary/ExpandableButton'
import Loading from './auxiliary/Loading';

class Configuration extends PureComponent {

  state = {
    sdpOpen: false,
    snOpen: false
  }

  componentDidMount() {
    this.props.retrieveConfig()
  }

  expandableStateHandlerSDP = () => {
    this.setState({ sdpOpen: !this.state.sdpOpen });
  }

  expandableStateHandlerSN = () => {
    this.setState({ snOpen: !this.state.snOpen });
  }

  getActiveColor = (active) => {
    if (active === false) {
      return 'lightSalmon'
    } else {
      return 'lightGreen'
    }
  }

  getActiveText = (active) => {
    if (active === false) {
      return 'Inativo'
    } else {
      return 'Ativo'
    }
  }

  timeUnit = () => {
    const { timeUnit } = this.props.config
    switch (timeUnit) {
      case 'MINUTES':
        return 'minuto(s)'
      case 'SECONDS':
        return 'segundo(s)'
      default:
        return timeUnit
    }
  }

  geral = () => {
    const { jobInterval, deleteAfterSend, absoluteFilePath } = this.props.config
    return (
      <>
        <ItemConfig label="Intervalo Job" value={`${jobInterval} ${this.timeUnit()}`} />
        <ItemConfig label="Delete após envio" value={deleteAfterSend.toString()} />
        <ItemConfig label="Storage" value={absoluteFilePath} />
      </>
    )
  }

  serviceDeskPlus = () => {
    const sdpConfigProp = { ...this.props.config.sdpConfig }
    return (
      <>
        <ItemConfig label="URL API" value={sdpConfigProp.apiUrl} />
        <ItemConfig label="Chave da API" value={sdpConfigProp.apiKey} />
        <ItemConfig label="Timeout" value={`${sdpConfigProp.connectTimeout} segundo(s)`} />
        <ItemConfig label="Job Status"
          bgColor={this.getActiveColor(sdpConfigProp.active)}
          value={this.getActiveText(sdpConfigProp.active)} />

        <ExpandableButton clickHandler={() => this.expandableStateHandlerSDP()} />
        <Fade in={this.state.sdpOpen}>
          <div id="fade-text-sdp">
            <ItemConfig label="account" value={sdpConfigProp.account} />
            <ItemConfig label="requestType" value={sdpConfigProp.requestType} />
            <ItemConfig label="group" value={sdpConfigProp.group} />
            <ItemConfig label="location" value={sdpConfigProp.location} />
          </div>
        </Fade>
      </>
    )
  }

  serviceNow = () => {
    const gbConfigProp = { ...this.props.config.gbConfig }
    return (
      <>
        <ItemConfig label="URL API" value={gbConfigProp.apiUrl} />
        <ItemConfig label="URL Anexos" value={gbConfigProp.serviceNowUrl} />
        <ItemConfig label="Chave API" value={gbConfigProp.apiKey} />
        <ItemConfig label="Job Status"
          bgColor={this.getActiveColor(gbConfigProp.active)}
          value={this.getActiveText(gbConfigProp.active)} />

        <ExpandableButton clickHandler={() => this.expandableStateHandlerSN()} />
        <Fade in={this.state.snOpen}>
          <div id="fade-text-sdp">
            <ItemConfig label="unidadeNegocio" value={gbConfigProp.unidadeNegocio} />
            <ItemConfig label="grupoExecutor" value={gbConfigProp.grupoExecutor} />
            <ItemConfig label="attachmentUser" value={gbConfigProp.attachmentUser} />
          </div>
        </Fade>
      </>
    )
  }

  render() {

    const config = this.props.config
    if (!config) {
      return <Loading />
    }

    console.log('[Configuration]')

    return (
      <div className='shadowDiv' >
        <Tabs defaultActiveKey="geral" id="uncontrolled-tab-example">
          <Tab eventKey="geral" title="Geral">
            <ListGroup variant="flush">
              {this.geral()}
            </ListGroup>
          </Tab>
          <Tab eventKey="tec" title="ServiceDesk Plus">
            <ListGroup variant="flush">
              {this.serviceDeskPlus()}
            </ListGroup>
          </Tab>
          <Tab eventKey="serviceNow" title="ServiceNow">
            <ListGroup variant="flush">
              {this.serviceNow()}
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    config: state.config
  };
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveConfig: () => dispatch(handleRetrieveConfig())
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Configuration);