// import React, { Component } from "react";
// import "./style/style.css";
// import axios from "axios";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       persons: [],
//       currentPage: 1,
//       todosPerPage: 6
//     };
//   }

//   handleClick = event => {
//     this.setState({
//       currentPage: Number(event.target.id)
//     });
//   };

//   componentDidMount() {
//     axios.get(`https://jsonplaceholder.typicode.com/comments`).then(res => {
//       const persons = res.data;
//       this.setState({ persons });
//     });
//   }
//   renderTable() {
//     return this.state.persons.map(person => {
//       return (
//         <tbody key={person.id}>
//           <tr>
//             <td>{person.postId}</td>
//             <td>{person.id}</td>
//             <td>{person.name} </td>
//           </tr>
//         </tbody>
//       );
//     });
//   }
//   render() {
//     const { persons, currentPage, todosPerPage } = this.state;

//     // Logic for displaying todos
//     const indexOfLastTodo = currentPage * todosPerPage;
//     const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//     const currentTodos = persons.slice(indexOfFirstTodo, indexOfLastTodo);
//     console.log(currentTodos);

//     const renderTodos = currentTodos.map((todo, index) => {
//       return <li key={index}>{todo}</li>;
//     });

//     // Logic for displaying page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(persons.length / todosPerPage); i++) {
//       pageNumbers.push(i);
//     }
//     console.log(pageNumbers);

//     const renderPageNumbers = pageNumbers.map(number => {
//       return (
//         <li key={number} id={number} onClick={this.handleClick}>
//           {number}
//         </li>
//       );
//     });

//     return (
//       <div>
//         <table className="listTable">
//           {this.renderTable()}
//           <thead>
//             <tr>
//               <th>PostId</th>
//               <th>ID</th>
//               <th>Komentarai</th>
//             </tr>
//           </thead>
//         </table>
//         <ul>{renderPageNumbers}</ul>
//         <ul id="page-numbers">{}</ul>
//       </div>
//     );
//   }
// }

// export default App;
