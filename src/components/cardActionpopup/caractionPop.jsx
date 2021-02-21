import React from "react";
import "./cardAction.scss";

export default class movePopup extends React.Component {
  constructor(props) {
    super(props);
    this.obtions = [];
    props.Boards.forEach((a, ind) => {
      let board = { ind: ind, title: a.title };
      let lists = [];
      a.list.forEach((b, i) => {
        let list = { ind: i, title: b.title };
        let cards = [];
        b.itemsInList.forEach((c, j) => {
          let card = { ind: j, title: c.title };
          cards.push(card);
        });
        list["cards"] = cards;
        lists.push(list);
      });
      board["lists"] = lists;
      this.obtions.push(board);
    });
    this.state = { selectedBdIn: 0, selectedLiIn: 0, selectedCInL: 0 };
    this.boardChange = this.boardChange.bind(this);
    this.listChange = this.listChange.bind(this);
    this.cardChange = this.cardChange.bind(this);
  }
  render() {
    let boardoptions = this.obtions.map((obj, i) => {
      return (
        <option value={obj.title} key={obj.title + i} id={i}>
          {obj.title}
        </option>
      );
    });
    let listoptions = this.obtions[this.state.selectedBdIn].lists.map(
      (obj, i) => {
        return (
          <option value={obj.title} key={obj.title + i} id={i}>
            {obj.title}
          </option>
        );
      }
    );
    let cardoptions = [];
    if (listoptions.length > 1) {
      cardoptions = this.obtions[this.state.selectedBdIn].lists[
        this.state.selectedLiIn
      ].cards.map((obj, i) => {
        return (
          <option value={i+1} key={obj.title + i} id={i}>
            {i+1}
          </option>
        );
      });
    }
    let listLabel =
      this.obtions[this.state.selectedBdIn].lists.length > 0
        ? this.obtions[this.state.selectedBdIn].lists[this.state.selectedLiIn]
            .title
        : "No List";
    let cardLabel = "N/A";
    if (listLabel !== "No List") {
      cardLabel = this.obtions[this.state.selectedBdIn].lists[
        this.state.selectedLiIn
      ].cards[this.state.selectedCInL]
        ? this.obtions[this.state.selectedBdIn].lists[this.state.selectedLiIn]
            .cards[this.state.selectedCInL].ind+1
        : "N/A";
    }
    return (
      <div className="actCont">
        <div>
          {this.props.move === "move" ? "SELECT DESTINATION" : "Copy To..."}
        </div>
        <div className="optConta">
          <div className="board">
            <label>Board</label>
            <label>{this.obtions[this.state.selectedBdIn].title}</label>
            <select
              className="sel"
              value={this.obtions[this.state.selectedBdIn].title}
              onChange={this.boardChange}
            >
              {boardoptions}
            </select>
          </div>
          <div className="board carLis">
            <label>List</label>
            <label>{listLabel}</label>
            <select
              className="sel"
              value={listLabel}
              onChange={this.listChange}
            >
              {listoptions}
            </select>
          </div>
          <div className="board carLis">
            <label>Position</label>
            <label>{cardLabel}</label>
            <select
              className="sel"
              value={cardLabel}
              onChange={this.cardChange}
            >
              {cardoptions}
            </select>
          </div>
        </div>
        <div>
          <button
            className="btn"
            disabled={cardLabel === "N/A" || listLabel === "No List"}
            onClick={() => {
              this.moveCopy(this.props.move);
            }}
          >
            {this.props.move === "move" ? "MOVE" : "COPY"}
          </button>
        </div>
      </div>
    );
  }
  boardChange(e) {
    this.setState({
      selectedBdIn: e.target.selectedOptions[0].id,
      selectedLiIn: 0,
      selectedCInL: 0
    });
  }
  listChange(e) {
    this.setState({
      selectedLiIn: e.target.selectedOptions[0].id,
      selectedCInL: 0
    });
  }
  cardChange(e) {
    this.setState({ selectedCInL: e.target.selectedOptions[0].id });
  }
  moveCopy(control) {
    if (control === "move") {
      this.props.moveItem(this.state);
    } else {
      this.props.copyItem(this.state);
    }
  }
}
