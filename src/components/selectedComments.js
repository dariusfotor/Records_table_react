import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "../style/style.css";

export class selectedComments extends Component {
  render() {
    const propsSelectedComments = this.props.selectedComments;
    const renderedSelectedComments = propsSelectedComments.map(i => {
      return (
        <tbody key={i.id}>
          <tr>
            <td>{i.id}</td>
            <td>{i.name} </td>
            <td>{i.email}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <div className="container">
        <h1>Pasirinkti irasai</h1>
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
            <tbody>
              <tr>
                <td></td>
                <td>Parinktu irasu nera</td>
                <td></td>
              </tr>
            </tbody>
          ) : (
            renderedSelectedComments
          )}
        </Table>
      </div>
    );
  }
}

export default selectedComments;
