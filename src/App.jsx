import React, { Component } from "react";
import "./App.scss";
import Headercustom from "./components/headerComp/headercomp";
import Viewportcomp from "./components/mainviewContainer/viewport";
import Footer from "./components/footer/footer";
import Spinner from "./components/loader/spinner";
import { connect } from "react-redux";
import * as actions from "./reduxStore/actions/action";
/* import {ModalName} from './modals/models'; */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        { title: "Home", link: "/react_Clone_Trlo" },
        {
          title: "Delete Multiple",
          link: ""
        }
      ]
    };
    this.child = React.createRef();
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isLoader ? <Spinner /> : null}
        <Headercustom
          headers={this.state.headers}
          classList={this.props.menuClassList}
          addActiveClass={() => {
            this.props.toggleMenuStyle();
          }}
          issdieOpen={this.props.issdieOpen}
          onMnOptClick={title => {
            this.callChildMtf(title);
          }}
        ></Headercustom>
        <Viewportcomp childRef={ref => (this.child = ref)}></Viewportcomp>
        <Footer></Footer>
      </React.Fragment>
    );
  }

  closeModal() {
    this.setState({ showModel: false });
  }
  callChildMtf(title) {
    if(title===this.state.headers[1].title){
      this.child.openDeletePop(title);
    }
 
  }
}

const mapStateToProps = state => {
  return {
    issdieOpen: state.TrlState.issdieOpen,
    isLoader: state.TrlState.isLoader,
    menuClassList: state.TrlState.menuClassList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuStyle: () => {
      dispatch({ type: actions.actionTypes.sideMenu });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
