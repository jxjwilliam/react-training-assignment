import React, {Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap'
import RequestModal from './RequestModal'

//https://www.npmjs.com/package/react-csv
import {CSVLink} from 'react-csv';

const TableHeader = ({isAdmin}) => {
  return (
    <thead>
    <tr>
      <th>Name</th>
      <th>From</th>
      <th>To</th>
      <th>Description</th>
      <th>Status</th>
      {isAdmin && <th>Process</th>}
    </tr>
    </thead>
  );
}

const TableBody = (props) => {

  const {rs, rr, handleShow, isAdmin} = props;
  const rows = rs.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.fDate}</td>
        <td>{row.tDate}</td>
        <td>{row.reason}</td>
        <td>{row.status}</td>
        {isAdmin && (
          <td>
            <ButtonToolbar>
              <Button
                bsStyle="warning"
                onClick={handleShow}>
                Launch
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => rr(index)}>
                Delete
              </Button>
            </ButtonToolbar>
          </td>
        )}
      </tr>
    );
  });

  return (
    <tbody>
    {rows}
    </tbody>
  );
}

class ListTable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      data: props.requests
    };
  }

  removeRequest = index => {
    const {requests} = this.props;

    this.setState({
      data: requests.filter((character, i) => {
        return i !== index;
      })
    });
  };

  handleShow = () => {
    this.setState({showModal: true});
  }

  handleHide = () => {
    this.setState({showModal: false});
  }

  render() {
    let {requests, isAdmin} = this.props;
    requests = this.state.data;
    if (this.state.showModal) {
      return <RequestModal
        show={this.state.showModal}
        handleClose={this.handleHide}
      />
    }
    return (
      <div className="container">
        <ButtonToolbar>
          <CSVLink data={requests}>
            <Button
              bsStyle="primary"
              bsSize="large"
            >
              Export to Excel
            </Button>
          </CSVLink>
        </ButtonToolbar>
        <Table striped bordered condensed hover>
          <TableHeader isAdmin={isAdmin}/>
          <TableBody
            rs={requests}
            rr={this.removeRequest}
            handleShow={this.handleShow}
            handleHide={this.handleHide}
            isAdmin={isAdmin}
          />
        </Table>
      </div>
    );
  }
}

export default ListTable;