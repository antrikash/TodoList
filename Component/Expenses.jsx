import React, { Component } from "react";

export default class TestExpense extends Component {
  constructor() {
    super();
    this.state = {
      headerName: "Balance",
      totalAmount: 35987,
      income: 42000,
      spendings: 6013,
      addSelection: "Income",
      date: new Date().toLocaleString().split(",")[0],
      modal: false,
      listItems: [
        {
          type: "Spending",
          amount: 1500,
          itemDetail: "Groceries from Albert"
        },
        {
          type: "income",
          amount: 42000,
          itemDetail: "Salary from work"
        },
        {
          type: "Spending",
          amount: 1500,
          itemDetail: "New shirt from ZARA"
        },
        {
          type: "Spending",
          amount: 13,
          itemDetail: "Icecream - It was hot outside"
        }
      ]
    };
  }
  calculate() {
    let newState = this.state.listItems;
    let spendings = 0,
      income = 0,
      totalAmount = 0;
    newState.forEach(elem => {
      if (elem.type === "Spending") {
        spendings = Number(elem.amount) + Number(spendings);
      } else {
        income = Number(elem.amount) + income;
      }
    });
    totalAmount = income - spendings;
    this.setState(
      {
        totalAmount: totalAmount,
        spendings: spendings,
        income: income
      },
      this.localStorageVal()
    );
  }

  componentDidMount() {
    this.localStorageVal();
    this.calculate();
  }

  toRemove(index) {
    let newState = this.state.listItems;
    newState.splice(index, 1);
    this.setState({ listItems: newState });
    this.localStorageVal();
    this.calculate();
  }

  localStorageVal() {
    setTimeout(() => {
      let stateData = this.state;
      let listItems = [];
      localStorage.clear();
      for (let list of stateData.listItems) {
        let str = `type : ${list.type}, amount : ${list.amount}, itemDetail : ${
          list.itemDetail
        }`;
        listItems.push(str);
      }
      localStorage.setItem(`listItems`, `{ ${listItems.toLocaleString()} }`);
      localStorage.setItem(`income`, `${this.state.income}`);
      localStorage.setItem(`spendings`, `${this.state.spendings}`);
      localStorage.setItem(`totalAmount`, `${this.state.totalAmount}`);
    }, 100);
  }

  amountChange(event) {
    this.setState({ amt: event.target.value });
  }

  txnDetailsChange(event) {
    this.setState({ detail: event.target.value });
  }

  submitTransaction() {
    let newObj = {
      type: this.state.addSelection,
      amount: this.state.amt,
      itemDetail: this.state.detail
    };
    let newState = this.state.listItems;
    if (this.state.amt !== undefined) {
      newState.push(newObj);
      this.setState({ ...newState, modal: false }, this.calculate());
    }
  }

  closeModal() {
    this.setState({ modal: false });
  }

  addButton(type) {
    this.setState({
      addSelection: type,
      modal: true,
      amt: undefined,
      detail: undefined
    });
  }

  render() {
    return (
      <div className="container m-2 p-4">
        <div className="expenseCont">
          <div className="headerName">
            <div className="badge badge-info">
              <h3>{this.state.headerName}</h3>
            </div>
            <div className="h3">{this.state.totalAmount} CZK</div>
            <div className="row">
              <div className="pb-12 pl-12 ml-2 mr-2 text-success">
                Income: {this.state.income} Kc
              </div>
              <div className="pb-12 ml-2 mr-2 text-danger">
                Spendings: {this.state.spendings} Kc
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="detailsSection paddingLeft-12">
          <table className="d-flex flex-column table table-hover">
            <tbody>
              {this.state.listItems.map((element, index) => {
                return (
                  <tr key={index}>
                    <th
                      colSpan="2"
                      scope="row"
                      className="mx-auto align-bottom"
                      style={{ width: 200 }}
                    >
                      {index + 1}
                    </th>
                    <td>
                      <div className="mb-2">
                        <div className="small mb-5">{this.state.date}</div>
                        <div
                          className="mx-auto align-bottom"
                          style={{ width: 200 }}
                        >
                          <div
                            className={`color ${
                              element.type === "Spending"
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {element.amount} Kc
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      colSpan="2"
                      className="mx-auto align-bottom"
                      style={{ width: 200 }}
                    >
                      {element.itemDetail}
                    </td>
                    <td>
                      <img
                        alt="deleteIcon"
                        onClick={this.toRemove.bind(this, index)}
                        className=" align-bottom pt-4 m-4"
                        src={"https://img.icons8.com/ios/24/000000/trash.png"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-success m-2 "
          value="Add Income"
          onClick={this.addButton.bind(this, "Income")}
        >
          Add Income
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          value="Add Spending"
          onClick={this.addButton.bind(this, "Spending")}
        >
          Add Spending
        </button>
        <div>
          {this.state.modal ? (
            <div className="border border-secondary pt-2 mt-2">
              <div className="p-2">
                <b>TYPE:</b> {this.state.addSelection}
              </div>
              <div className="p-2">
                <b>Transaction:</b>{" "}
                {this.state.addSelection === "Spending" ? "Debit" : "Credit"}
              </div>
              <div className="p-2">
                <b>Amount:</b>{" "}
                <input
                  className="m-2"
                  id="textInput"
                  value={this.state.amt}
                  onChange={this.amountChange.bind(this)}
                  type="number"
                />
              </div>
              <div className="p-2">
                <b>Details:</b>{" "}
                <input
                  className="m-2"
                  id="textDetails"
                  value={this.state.detail}
                  onChange={this.txnDetailsChange.bind(this)}
                  type="text"
                />
              </div>
              <div className="row">
                <button
                  type="button"
                  onClick={this.closeModal.bind(this)}
                  className="btn btn-outline-danger m-4 d-flex"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.submitTransaction.bind(this)}
                  className="btn btn-outline-success m-4 d-flex"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
