import React, { Component } from "react";
import { Route, Routes, useLocation,
  useNavigate,
  useParams } from "react-router-dom";
import Boards from "../boards/boards";
import "./viewport.scss";
import Editcardpopup from "../editPopup/editPopup";
import {
  ModalName,
  Borad,
  ListItem,
  ListItemcontent
} from "../../modals/models";
import Newboard from "../createBoard/newboard";
import Modal from "../popup/popup";
import Editview from "../boardEditView/boardEditview";
import Backdrop from "../fadedBack/fadedBack";
import Cardaction from "../cardActionpopup/caractionPop";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions/action";
import Multipledelete from '../deletemulPop/deleteMul';
class viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      modelName: "",
      selectedBoard: null,
      selectedIndex: null,
      showquickEdit: false,
      isquickrowRevers: false,
      selectedCardInd: null,
      selectedCardData: null,
      Listindex: null,
      moveCard: null,
      showEditcardPopup:false
    };
    this.positions = { left: 0, top: 0 };
    this.styleObj = { top: 0, left: 0, zIndex: 300000 };
    this.cardTitleChanfge = this.cardTitleChanfge.bind(this);
    this.obtions=[];
  }

  render() {
    let modalName = null;
    let classes = null;
    let showBackdrop = true;
    let fadeClass = "";
    if (this.state.showModel) {
      switch (this.state.modelName) {
        case ModalName["CREATEBOARD"]:
          modalName = (
            <Newboard createBoard={data => this.promptFromCrtPop(data)} />
          );
          classes = "modal-sm";
          break;
        case ModalName["MOVECARD"]:
          modalName = (
            <Cardaction
              move="move"
              Boards={this.props.Boards}
              moveItem={data => {
                this.moveItem(data);
              }}
            />
          );
          classes = "modal-sm";
          showBackdrop = this.state.showEditcardPopup;
          fadeClass=this.state.showEditcardPopup?"zIndexExtra":"";
          break;
        case ModalName["COPYCARD"]:
          modalName = (
            <Cardaction
              move="copy"
              Boards={this.props.Boards}
              copyItem={data => {
                this.copyItem(data);
              }}
            />
          );
          classes = "modal-sm";
          showBackdrop = this.state.showEditcardPopup;
          fadeClass=this.state.showEditcardPopup?"zIndexExtra":"";
          break;
          case ModalName["DELETE_MULTIPLE"]:
            modalName = (
              <Multipledelete
              obtions={ this.obtions}
              deleteItems={(options)=>{this.deleteMultiple(options)}}
              />
            );
            classes = "modalEditPopup";
            break;
        default:
          break;
      }
    }
    let editCardModal =null;
    let classesForEdit=null;
    if(this.state.showEditcardPopup){
      (
        editCardModal=   <Editcardpopup
          cardData={this.state.selectedCardData}
          changeCardTitle={name => {
            this.changeCArdTitle(name);
          }}
          changedescription={desc => {
            this.changeCArddesc(desc);
          }}
          saveCommnent={
            (comnt)=>{
              this.saveCommnent(comnt);
            }
          }
          deleteCmnt={
            (i)=>{
              this.deleteCmnt(i);
            }
          }
          deleteItem={
            ()=>{this.deleteItem()}
          }
          moveCopyItem={
            (e,control)=>{
              this.moveCopyItem(e,control,true);
            }
          }
          saveEditedCommnent={
            (i,data)=>{
              this.saveEditedCommnent(i,data)
            }
          }
        />
      );
      classesForEdit = "modalEditPopup";
    }

    return (
      <React.Fragment>
        {this.state.showModel ? (
          <Modal
            title={this.state.modelName}
            classses={classes}
            showBackdrop={showBackdrop}
            styleObj={this.styleObj}
            fadeClass={fadeClass}
            onModelClose={() => {
              this.closeModal();
            }}
          >
            {modalName}
          </Modal>
        ) : null}
        {
          this.state.showEditcardPopup?(
            <Modal
            title={'Edit'}
            classses={classesForEdit}
            showBackdrop={true}
            onModelClose={() => {
              this.closeEditModal();
            }}
          >
            {editCardModal}
          </Modal>
          ):null
        }
        {this.state.showquickEdit ? (
          <Backdrop>
            <div
              className={
                this.state.isquickrowRevers
                  ? "quickeditorContainer reverseAlign"
                  : "quickeditorContainer"
              }
              style={this.positions}
            >
              <div className="editContain">
                <textarea
                  value={this.state.selectedCardData.title}
                  className="textEdit"
                  onChange={this.cardTitleChanfge}
                ></textarea>
                <button
                  className="sveBtn"
                  onClick={() => {
                    this.changeCArdTitle();
                  }}
                >
                  Save
                </button>
                <i
                  className="fas fa-times clcBtn"
                  onClick={() => {
                    this.setState({ showquickEdit: false });
                  }}
                ></i>
              </div>
              <div className="actionContain">
                <div
                  className="actItem"
                  onClick={e => {
                    this.moveCopyItem(e, "MOVECARD");
                  }}
                >
                  Move
                </div>
                <div
                  className="actItem"
                  onClick={e => {
                    this.moveCopyItem(e, "COPYCARD");
                  }}
                >
                  Copy
                </div>
                <div
                  className="actItem"
                  onClick={() => {
                    this.deleteItem();
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </Backdrop>
        ) : null}
        <div
          className={
            (this.props.router.location.pathname === "/react_Clone_Trlo/" || this.props.router.location.pathname === "/" || this.props.router.location.pathname === "/react_Clone_Trlo")
              ? "viewPortCls mrg10"
              : "editviewCls"
          }
        >
          <Routes>
            <Route
              exact
              path="/react_Clone_Trlo/"
              element={
                <Boards
                  boards={this.props.Boards}
                  changeStar={(ind, e) => {
                    this.changeStar(ind, e);
                  }}
                  createNewBoard={() => {
                    this.creatNewBoard();
                  }}
                  openEdit={(selected, index) => {
                    this.openEditView(selected, index);
                  }}
                />
              }
            />
            <Route
              path="/react_Clone_Trlo/board"
              element={
                <React.Fragment>
                  <Editview
                    selected={this.state.selectedBoard}
                    changeTilte={e => {
                      this.changeTilte(e);
                    }}
                    changeStar={() => {
                      this.changeStarEdit();
                    }}
                    createList={title => {
                      this.createList(title);
                    }}
                    careateItem={(title, index) => {
                      this.careateItem(title, index);
                    }}
                    droped={data => {
                      this.movedData(data);
                    }}
                    quickeditCard={data => {
                      this.quickeditCard(data);
                    }}
                    history={this.props.history}
                    editListTitle={(e, ind) => {
                      this.listTitleEdited(e, ind);
                    }}
                    showCardEditModal={data => {
                      this.showCardEditModal(data);
                    }}
                  ></Editview>
                </React.Fragment>
              }
            />
          </Routes>
        </div>
      </React.Fragment>
    );
  }

  changeStar(ind, e) {
    e.stopPropagation();
    let dub = [...this.props.Boards];
    dub[ind].star = !dub[ind].star;
    this.setState({ Boards: dub });
  }
  creatNewBoard() {
    let modalNme = ModalName["CREATEBOARD"];
    this.styleObj = {};
    this.setState({ modelName: modalNme, showModel: true });
  }
  showCardEditModal(data) {
    let selectedCard = this.state.selectedBoard.list[data.Listindex]
      .itemsInList[data.cardIndex];
    this.setState({
      selectedCardInd: data.cardIndex,
      selectedCardData: selectedCard,
      Listindex: data.Listindex
    });
    let modalNme = ModalName["EDITOVERVIEW"];
    this.styleObj = {};
    this.setState({ modelName: modalNme, showEditcardPopup: true });
  }
  closeModal() {
    this.setState({ showModel: false});
  }
  closeEditModal() {
    this.setState({showEditcardPopup:false });
  }
  promptFromCrtPop(data) {
    let obj = new Borad(data.title, data.sec, data.bgLink, data.bgLink, null);
    this.props.addNewBoard(obj);
    this.closeModal();
  }
  openEditView(selected, index) {
    this.setState({ selectedBoard: selected, selectedIndex: index });
    this.props.router.navigate(`${this.props.router.location.pathname !=='/'? this.props.router.location.pathname : '/react_Clone_Trlo'}board`);
  }
  changeTilte(e) {
    if (e.target.value !== "") {
      let [board, data] = this.returnSelectedBoadfrmState();
      data.title = e.target.value;
      this.setState({ Boards: board });
    }
  }
  changeStarEdit() {
    let [dub, data] = this.returnSelectedBoadfrmState();
    data.star = !data.star;
    this.setState({ Boards: dub });
  }

  createList(title) {
    let [dub, data] = this.returnSelectedBoadfrmState();
    let id = data.list.length + 1;
    let neWLit = new ListItem(title, id);
    data.list.push(neWLit);
    this.setState({ Boards: dub });
  }
  careateItem(title, index) {
    let [dub, data] = this.returnSelectedBoadfrmState();
    let id = data.list[index].itemsInList.length + 1;
    let neWLit = new ListItemcontent(title, id);
    data.list[index].itemsInList.push(neWLit);
    this.setState({ Boards: dub });
  }
  returnSelectedBoadfrmState() {
    let board = [...this.props.Boards];
    return [board, board[this.state.selectedIndex]];
  }
  movedData(data) {
    let board = { ...this.state.selectedBoard };
    if (data.parentFrom !== data.parentTo) {
      let from = board.list[data.parentFrom];
      let to = board.list[data.parentTo];
      let fromD = from.itemsInList.splice(data.childFrom, 1);
      if(to && fromD)
      to.itemsInList.splice(data.childTo, 0, fromD[0]);
    } else {
      let selectedBoard = board.list[data.parentFrom];
      let fromD = selectedBoard.itemsInList.splice(data.childFrom, 1);
      selectedBoard.itemsInList.splice(data.childTo, 0, fromD[0]);
    }
    let boards = [...this.props.Boards];
    boards[this.state.selectedIndex] = board;
    this.setState({ selectedBoard: board, Boards: boards });
  }
  quickeditCard(data) {
    let xcf = 224;
    let ycf = 23;
    let x = data.x - xcf;
    let y = data.y - ycf;
    let isquickrowRevers = false;
    if (data.maxWidth <= x + xcf + 60) {
      isquickrowRevers = true;
      x = x - 114;
    }
    let selectedCard = this.state.selectedBoard.list[data.Listindex]
      .itemsInList[data.cardIndex];
    this.positions = { top: y, left: x };
    this.setState({
      showquickEdit: !this.state.showquickEdit,
      isquickrowRevers: isquickrowRevers,
      selectedCardInd: data.cardIndex,
      selectedCardData: selectedCard,
      Listindex: data.Listindex
    });
  }
  cardTitleChanfge(e) {
    if (e.target.value !== "") {
      let board = { ...this.state.selectedCardData };
      board.title = e.target.value;
      this.setState({ selectedCardData: board });
    }
  }
  changeCArdTitle(name) {
    let [board,card]= this.returnCardata();
    card.title = name ? name : this.state.selectedCardData.title;
    this.setState({ Boards: board, showquickEdit: false });
  }
  changeCArddesc(desc){
    let [board,card]= this.returnCardata();
    card.desc = desc;
    this.setState({ Boards: board});
  }
  saveCommnent(cmntObj){
    let [board,card]= this.returnCardata();
    card.comments.push(cmntObj);
    this.setState({ Boards: board});
  }
  saveEditedCommnent(i,cmntObj){
    let [board,card]= this.returnCardata();
    card.comments[i]=cmntObj;
    this.setState({ Boards: board});
  }
  deleteCmnt(i){
    let con =window.confirm('Are you sure you want to delete the comment ?');
    if(con){
      let [board,card]= this.returnCardata();
    card.comments.splice(i,1);
    this.setState({ Boards: board});
    }
  }
  returnCardata(){
    let board = [...this.props.Boards];
    return [board,board[this.state.selectedIndex].list[this.state.Listindex].itemsInList[
      this.state.selectedCardInd
    ]]
  }
  moveCopyItem(e, modalName,isedit) {
    let xcf = 420;
    let x = e.clientX;
    let max = window.document.body.clientWidth;
    if (max <= x + xcf + 50) {
      x = x - xcf;
    }
    if(!isedit){
      this.styleObj = { top: e.clientY, left: x, zIndex: 300000 };
    }
    else{
      if(max <1025){
        if(max>767){
          this.styleObj = { top: '14%', left: '18%;', zIndex: 300000};
        }else{
          this.styleObj = { top: '14%', left: '4%', zIndex: 300000,width: '91%' };
        }
       
      }
      else{
        this.styleObj = { top: e.clientY, left: x, zIndex: 300000 };
      }
    }
    
    let modalNme = ModalName[modalName];
    this.setState({ modelName: modalNme, showModel: true });
  }
  deleteItem() {
    let con =window.confirm('Are you sure you want to delete the card ?');
    if(con){
    let board = [...this.props.Boards];
    board[this.state.selectedIndex].list[
      this.state.Listindex
    ].itemsInList.splice(this.state.selectedCardInd, 1);
    this.setState({ showquickEdit: false, Boards: board });
    this.closeModal();
    this.closeEditModal();
  }
  }
  moveItem(data) {
    let boards = [...this.props.Boards];
    let dt = boards[this.state.selectedIndex].list[
      this.state.Listindex
    ].itemsInList.splice(this.state.selectedCardInd, 1);
    boards[data.selectedBdIn].list[data.selectedLiIn].itemsInList.splice(
      data.selectedCInL,
      0,
      dt[0]
    );
    this.setState({ showModel: false, showquickEdit: false,showEditcardPopup:false, Boards: boards });
  }
  copyItem(data) {
    let boards = [...this.props.Boards];
    let dt = [
      {
        ...boards[this.state.selectedIndex].list[this.state.Listindex]
          .itemsInList[this.state.selectedCardInd]
      }
    ];
    boards[data.selectedBdIn].list[data.selectedLiIn].itemsInList.splice(
      data.selectedCInL,
      0,
      dt[0]
    );
    this.setState({ showModel: false, showquickEdit: false, showEditcardPopup:false,Boards: boards });

  }
  listTitleEdited(e, ind) {
    if (e.target.value !== "") {
      let [board, data] = this.returnSelectedBoadfrmState();
      data.list[ind].title = e.target.value;
      this.setState({ Boards: board });
    }
  }
  openDeletePop(modalName) {
    this.obtions = [];
    this.props.Boards.forEach((a, ind) => {
      let board = { ind: ind, title: a.title };
      let lists = [];
      a.list.forEach((b, i) => {
        let list = { ind: i, title: b.title };
        let cards = [];
        b.itemsInList.forEach((c, j) => {
          let card = { ind: j, title: c.title };
          card['check'] =false;
          cards.push(card);
        });
        list["cards"] = cards;
        list['check'] =false;
        lists.push(list);
      });
      board["lists"] = lists;
      board["check"] = false;
      this.obtions.push(board);
    });
    this.styleObj = {};
    this.setState({ modelName: modalName, showModel: true });
  }
  deleteMultiple(options){
    let boards = [...this.props.Boards];
    boards= boards.filter((a,ind) => {
      let optionCh=options[ind];
        return !(optionCh && optionCh.check && optionCh.title===a.title && optionCh.ind===ind);
    });
    boards.forEach((board,ind)=>{
      
      board.list = board.list.filter((list,inL)=>{
        let optionCh=options[ind].lists[inL];
        return !( optionCh && optionCh.check && optionCh.title===list.title && optionCh.ind===inL);
      });
      board.list.forEach((list,indL)=>{
        list.itemsInList =list.itemsInList.filter((card,inC)=>{
          let optionCh=options[ind].lists[indL].cards[inC];
          return !(optionCh &&optionCh.check && optionCh.title===card.title && optionCh.ind===inC);
        });
      })
    });
    this.props.updateBoard(boards);
    this.setState({ modelName: '', showModel: false });
  }
  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }
}
const mapStateToProps = state => {
  return {
    Boards: state.TrlState.Boards,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuStyle: () => {
      dispatch({ type: actions.actionTypes.sideMenu });
    },
    addNewBoard:(obj)=>{
      dispatch({type:actions.actionTypes.addNewBoard,payload:obj})
    },
    updateBoard:(board)=>{
      dispatch({type:actions.actionTypes.updateBoard,payload:board})
    }
  };
};

function withRouter(ComponentInstance) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <ComponentInstance
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(viewport));


