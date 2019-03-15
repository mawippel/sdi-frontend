import React, { Component } from 'react';
import { connect } from 'react-redux'
import MUIDataTable from "mui-datatables";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { handleRetrieveMonit } from '../actions/monitoramento';
import { handleRetrieveMonitTimer } from '../actions/monitTimer';
import Loading from './auxiliary/Loading';
import { datePattern } from '../constants/appConstants';

class Monitoramento extends Component {

  componentDidMount() {
    this.props.retrieveMonit()
    this.props.retrieveMonitTimer()
  }

  state = {
    tb1Columns: [
      {
        name: "dataExecucao",
        label: "Data de Execução",
      },
      {
        name: "identificador",
        label: "Identificador",
      },
    ],
    tb1Options: {
      filterType: 'dropdown',
      selectableRows: false,
      download: false,
      print: false,
      pagination: false,
      search: false,
      sort: false,
      filter: false,
      viewColumns: false
    },

    tb2Columns: [
      {
        name: "id",
        label: "ID"
      },
      {
        name: "idSdp",
        label: "ID SDP",
      },
      {
        name: "idBot",
        label: "ID ServiceNow",
      },
      {
        name: "statusCode",
        label: "Status Code",
      },
      {
        name: "datEnvio",
        label: "Data de Envio",
      },
      {
        name: "datError",
        label: "Data de Erro",
      }
    ],
    tb2Options: {
      filterType: 'dropdown',
      selectableRows: false,
      download: false,
      print: false,
      onRowClick: (rowData, rowMeta) => {
        this.setState({
          doRedirect: true,
          redirectIdMonit: rowData[0]
        });
      }
    },
    doRedirect: false,
    redirectIdMonit: 0
  }

  convertDatMonitTimer = (monitTimer) => {
    monitTimer[0].dataExecucao = moment(monitTimer[0].dataExecucao).format(datePattern())
  }

  convertDatMonit = (monit) => {
    monit.map(m => {
      m.datEnvio = !!m.datEnvio ? moment(m.datEnvio).format(datePattern()) : ''
      m.datError = !!m.datError ? moment(m.datError).format(datePattern()) : ''
      return m;
    })
  }

  render() {
    const monit = this.props.monit
    const monitTimer = this.props.monitTimer

    if (this.state.doRedirect === true) {
      return (<Redirect to={`/monitoramento/${this.state.redirectIdMonit}`} />)
    }

    if (!monit) {
      return <Loading />
    }

    this.convertDatMonitTimer(monitTimer);
    this.convertDatMonit(monit);

    console.log('[Monitoramento]')

    return (
      <div style={style}>
        <div style={tableStyle}>
          <MUIDataTable
            title={"Última execução"}
            data={monitTimer}
            columns={this.state.tb1Columns}
            options={this.state.tb1Options}
          />
        </div>
        <div>
          <MUIDataTable
            title={"Monitoramento"}
            data={monit}
            columns={this.state.tb2Columns}
            options={this.state.tb2Options}
          />
        </div>
      </div>
    );
  }
}

const style = {
  margin: '20px',
}

const tableStyle = {
  marginBottom: '40px'
}

const mapStateToProps = state => {
  return {
    ...state.monit,
    ...state.monitTimer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveMonit: () => dispatch(handleRetrieveMonit()),
    retrieveMonitTimer: () => dispatch(handleRetrieveMonitTimer())
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Monitoramento);