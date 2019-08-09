import React, { Component } from "react";
import ReactDOM from "react-dom";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      list: []
    };
  }

  handleChangeText = e => {
    this.setState({
      text: e.target.value
    });
  };

  addButton = () => {
    let list = [...this.state.list, this.state.text];
    this.setState({ list, text: "" });
  };

  remove = id => {
    const list = this.state.list;
    list.splice(id, 1);

    this.setState({
      list
    });
  };

  render() {
    return (
      <div>
        <h1>TODO List</h1>
        <h2>Start Create,Delete and Edit your list here!</h2>
        <input value={this.state.text} onChange={this.handleChangeText} />
        <button onClick={this.addButton}>ADD</button>
        <div>
          <ul style={{ listStyleType: "none" }}>
            {this.state.list.map((item, id) => {
              return (
                <li key={id}>
                  {item}
                  <button onClick={() => this.remove(id)}>Remove</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todo />, rootElement);

// class Todo extends React {
//   constructor() {
//     super();
//     this.state = {
//       name: 'React'
//     };
//   }
