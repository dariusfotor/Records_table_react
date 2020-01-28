import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "../style/style.css";

export class selectedComments extends Component {
  render() {
    const propsSelectedComments = this.props.selectedComments;
    console.log(propsSelectedComments);
    const renderedSelectedComments = propsSelectedComments.map(i => {
      return (
        <tr key={i.id}>
          <td>{i.id}</td>
          <td>{i.name} </td>
          <td>{i.email}</td>
        </tr>
      );
    });
    return (
      <div className="container">
        <h1>Pasirinkti įrašai</h1>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th className="thID" onClick={this.sort}>
                ID
                <FontAwesomeIcon className="thIcon" icon={faSort} size="1x" />
              </th>
              <th onClick={this.sort}>
                Komentarai
                <FontAwesomeIcon className="thIcon" icon={faSort} size="1x" />
              </th>
              <th onClick={this.sort}>
                Email
                <FontAwesomeIcon className="thIcon" icon={faSort} size="1x" />
              </th>
            </tr>
          </thead>

          {propsSelectedComments === [] ? (
            <tr>
              <td></td>
              <td>Parinktu irasu nera</td>
              <td></td>
            </tr>
          ) : (
            renderedSelectedComments
          )}
        </Table>
      </div>
    );
  }
}

export default selectedComments;
