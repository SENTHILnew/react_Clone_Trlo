import React from "react";
import "./newboard.scss";
import bg2 from "../../public/images/bg1.jpg";
import bg1 from "../../public/images/bg2.jpg";
import bg3 from "../../public/images/bg3.jpg";
import bg4 from "../../public/images/bg4.jpg";

class newboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      sec: "Public",
      bgLink: bg1,
      selectedLink: 0
    };
    this.bgS=[
      bg1,
      bg2,
      bg3,
      bg4,
      "rgb(0, 121, 191)",
      "rgb(210, 144, 52)",
      "rgb(81, 152, 57)",
      "rgb(176, 70, 50)",
      "rgb(137, 96, 158)"
    ];;
  }
  render() {
    let bgIg = this.bgS[this.state.selectedLink];
    let isImg = this.state.selectedLink < 4;
    let cardBg;
    if (isImg) {
      cardBg = { backgroundImage: `url(${bgIg})` };
    } else {
      cardBg = { backgroundColor: bgIg };
    }
    let elements =  this.bgS.map((data, index) => {
      let bg;
      if (index < 4) {
        bg = { backgroundImage: `url(${data})` };
      } else {
        bg = { backgroundColor: data };
      }
      if (this.state.selectedLink === index) {
        return (
          <div
            className="bgs"
            style={bg}
            key={index}
            onClick={() => {
              this.bgChange(index);
            }}
          >
            <div className="shadowContainer">
              <i className="fas fa-check tick"></i>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="bgs"
            style={bg}
            key={index}
            onClick={() => {
              this.bgChange(index);
            }}
          ></div>
        );
      }
    });
    return (
      <div className="createBoardContainer">
        <div className="previewContainer">
          <div className="partition">
            <div className="previewCls" style={cardBg}>
              <input spellCheck="false"
                placeholder="Add a title"
                className="inputClaer"
                onChange={this.titleChange}
                value={this.state.title}
              ></input>
              <select
                className="dropClear"
                value={this.state.sec}
                onChange={this.priacyChange}
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
          <div className="partition">
            <div className="bgContainer">{elements}</div>
          </div>
        </div>
        <div className="btnContainer">
          <button
            className="btn"
            onClick={() => {
              this.createBoard();
            }}
          >
            Create Board
          </button>
        </div>
      </div>
    );
  }

  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  priacyChange = event => {
    this.setState({ sec: event.target.value });
  };
  bgChange(ind) {
    let selectedBg=this.bgS[ind]
    this.setState({ selectedLink: ind ,bgLink:selectedBg});
  }
  createBoard=()=>{
        if(this.state.title===''){
            alert('Please enter a valid title for the board');
        }
        else{
            this.props.createBoard({...this.state});
        }
  }
}

export default newboard;
