import React, { Component } from "react";
import "../style/style.css";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchArticleDetails } from "./fetchData";
import SelectedComments from "./selectedComments";

export class tableComments extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 20,
      valuePerPage: "",
      sortedColumn: "",
      direction: "desc",
      selectedID: [],
      btnTotalComments: false
    };
    this.sort = this.sort.bind(this);
  }
  componentDidMount() {
    this.props.fetchArticleDetails();
  }
  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  handleChange = e => {
    this.setState({
      todosPerPage: e.target.value,
      btnTotalComments: false
    });
  };

  sort = direction => {
    this.setState({
      direction
    });
  };
  allComments = () => {
    this.setState({
      btnTotalComments: true
    });
  };
  clickedId = id => {
    const selectId = this.props.comments.find(i => i.id === id);
    const newId = [...this.state.selectedID, selectId];
    this.setState({
      selectedID: newId
    });
  };
  render() {
    const {
      currentPage,
      todosPerPage,
      direction,
      btnTotalComments
    } = this.state;
    const { error, loading, comments } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    // Pagination
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = comments.slice(indexOfFirstTodo, indexOfLastTodo);
    // Mapping comments per page
    const renderTodos = currentTodos.map(item => {
      return (
        <tbody key={item.id}>
          <tr onClick={() => this.clickedId(item.id)}>
            <td>{item.id}</td>
            <td>{item.name} </td>
            <td>{item.email}</td>
          </tr>
        </tbody>
      );
    });
    const allComments = comments.map(item => {
      return (
        <tbody key={item.id}>
          <tr onClick={() => this.clickedId(item.id)}>
            <td>{item.id}</td>
            <td>{item.name} </td>
            <td>{item.email}</td>
          </tr>
        </tbody>
      );
    });
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(comments.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <ul className="pagination">
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
            className="page-link"
          >
            {number}
          </li>
        </ul>
      );
    });
    // Sorting
    const sorted = renderTodos.sort((a, b) => {
      if (direction === "desc") {
        return 1;
      } else {
        return -1;
      }
    });
    return (
      <div className="container">
        <SelectedComments selectedComments={this.state.selectedID} />
        <h1>Irasu lentele</h1>
        <label>Rodyti po</label>
        <select value={this.state.todosPerPage} onChange={this.handleChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="70">70</option>
        </select>
        <button className="btnAllComments" onClick={this.allComments}>
          Visi irasai
        </button>
        <Table striped bordered hover variant="dark">
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
          {btnTotalComments ? allComments : renderTodos}
        </Table>
        <ul>{renderPageNumbers}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    comments: state.comments,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchArticleDetails })(tableComments);
