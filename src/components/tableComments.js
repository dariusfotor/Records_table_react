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
      isActive: null,
      sortType: "asc",
      btnTotalComments: false
    };
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

  allComments = () => {
    this.setState({
      btnTotalComments: true
    });
  };
  clickedId = (id, i) => {
    const selectId = this.props.comments.find(i => i.id === id);
    const newId = [...this.state.selectedID, selectId];
    this.setState({
      selectedID: newId
    });
    if (i !== this.state.isActive) {
      this.setState({
        isActive: i
      });
    }
  };
  sorted = sortType => {
    this.setState({ sortType });
  };
  render() {
    console.log(this.state.isActive);
    const { currentPage, todosPerPage, btnTotalComments } = this.state;
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
    const currentComments = comments.slice(indexOfFirstTodo, indexOfLastTodo);
    // Sorting
    const sortedAllComments = this.props.comments.sort((a, b) => {
      const sorted = this.state.sortType === "asc" ? 1 : -1;
      return sorted * a.id - b.id;
    });
    // Mapping comments per page
    const renderedComments = currentComments.map((item, i) => {
      return (
        <tr
          key={i}
          onClick={() => this.clickedId(item.id, i)}
          style={
            this.state.isActive === i
              ? { background: "green" }
              : { background: "none" }
          }
        >
          <td>{item.id}</td>
          <td>{item.name} </td>
          <td>{item.email}</td>
        </tr>
      );
    });
    const allComments = sortedAllComments.map((x, index) => {
      return (
        <tr
          key={index}
          onClick={() => this.clickedId(x.id, index)}
          style={
            this.state.isActive === index
              ? { background: "green" }
              : { background: "none" }
          }
        >
          <td>{x.id}</td>
          <td>{x.name} </td>
          <td>{x.email}</td>
        </tr>
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
    return (
      <div className="container">
        <SelectedComments selectedComments={this.state.selectedID} />
        <h1>Irašų lentelė</h1>
        <label>Rodyti po</label>
        <select value={this.state.todosPerPage} onChange={this.handleChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="70">70</option>
        </select>
        <button className="btnAllComments" onClick={this.allComments}>
          Visi įrašai
        </button>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="thID">
                ID
                <FontAwesomeIcon
                  // onClick={() => this.sorted("desc")}
                  className="thIcon"
                  icon={faSort}
                  size="1x"
                />
              </th>
              <th>
                Komentarai
                <FontAwesomeIcon className="thIcon" icon={faSort} size="1x" />
              </th>
              <th>
                Email
                <FontAwesomeIcon className="thIcon" icon={faSort} size="1x" />
              </th>
            </tr>
          </thead>
          {btnTotalComments ? allComments : renderedComments}
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
