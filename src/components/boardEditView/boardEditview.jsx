import React from "react";
import "./boardEditview.scss";

class boaredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleEdited: false,
      isNewcard: false,
      isNewitem: false,
      newTitleCard: "",
      newItemTitle: "",
      isNewitemIndex: null,
      isEditListitlte:false
    };
    this.selListEdInd=null;
    this.tempTitle="";
    this.handleChange = this.handleChange.bind(this);
    this.addNewitem = this.addNewitem.bind(this);
    this.handlecardChange = this.handlecardChange.bind(this);
    this.BoardTitleInput = React.createRef();
    this.listTitleEditInput = React.createRef();
    this.ListTitleInput = React.createRef();
    this.CardTitleInput = React.createRef();
    this.scrollContainer = React.createRef();
    this.placeholder = document.createElement("li");
    this.placeholder.className = "placeholder";
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.editPenClick=this.editPenClick.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.corrcFactor=215;
    this.currentCard=null;
  }
  render() {
    if (!this.props.selected) {
      this.props.history.push("/");
      return null;
    } else {
      let addOricon = null;
      let addClass = ["card"];
      if (this.state.isNewcard) {
        addOricon = (
          <React.Fragment>
            <input
              className="addinpufield"
              spellCheck="false"
              placeholder="Enter a list title..."
              value={this.state.newTitleCard}
              onChange={this.handleChange}
              ref={this.ListTitleInput}
            ></input>
            <button className="addBtn" onClick={this.addNewitem}>
              Add
            </button>
            <i
              className="fas fa-times marg10"
              onClick={() => {
                this.editOn();
              }}
            ></i>
          </React.Fragment>
        );
      } else {
        addOricon = (
          <React.Fragment>
            <label
              onClick={e => {
                this.editOn(e);
              }}
              className="poinT"
            >
              <i className="fas fa-plus marg"></i>
              {this.props.selected.list.length === 0
                ? "Add a list"
                : "Add another list"}
            </label>
          </React.Fragment>
        );
        addClass.push("addCard");
      }
      let cards = this.props.selected.list.map((obj, index) => {
        let listcontent = obj.itemsInList.map((item, ind) => {
          let elems=[];
          let coverElm=null;
           if(item.comments.length>0){
            elems.push(<span className="mar10" key="comment"><i className="far fa-comment marg2"></i>{item.comments.length}</span>)
          }
          if(item.desc!==''){
            elems.push(<span className="mar10"  key="desc"><i className="fas fa-align-left"></i></span>);
          }
          if(elems.length>0){
            coverElm= <label className="labelContain marTop">{elems}</label>;
          }
        
          return (
            <div
              className="listItemCArd"
              data-parentid={index}
              data-childid={ind}
              key={ind + item.title}
              draggable="true"
              onDragEnd={this.dragEnd}
              onDragStart={this.dragStart}
              onClick={()=>this.props.showCardEditModal({Listindex:index,cardIndex:ind})}
            >
             <label className="labelContain">{item.title}</label> 
              {coverElm}
              <i onClick={(e)=>{this.editPenClick(e,index,ind)}} className='fas fa-pencil-alt leftStar hide'></i>
            </div>
          );
        });
        let newContent = null;
        if (this.state.isNewitem && this.state.isNewitemIndex === index) {
          newContent = (
            <React.Fragment>
              <textarea
                className="listTextArea"
                spellCheck="false"
                placeholder="Enter a card title..."
                value={this.state.newItemTitle}
                onChange={this.handlecardChange}
                ref={this.CardTitleInput}
              ></textarea>
              <button
                className="addBtn"
                onClick={() => {
                  this.addNewitemCard(index);
                }}
              >
                Add
              </button>
              <i
                className="fas fa-times marg10"
                onClick={() => {
                  this.editItemOn();
                }}
              ></i>
            </React.Fragment>
          );
        } else {
          newContent = (
            <React.Fragment>
              {" "}
              <div
                onClick={e => {
                  this.setEditable(index, e);
                }}
                className="mrgTop"
              >
                {" "}
                <i className="fas fa-plus marg"></i>{" "}
                {listcontent.length === 0 ? "Add a card" : "Add another card"}
              </div>{" "}
            </React.Fragment>
          );
        }
        let listTitleElm = null;
        if(this.state.isEditListitlte && index===this.selListEdInd){
          listTitleElm=(
            <input
              spellCheck="false"
              value={obj.title}
              onChange={(e)=>{this.props.editListTitle(e,index)}}
              onBlur={() => {
                this.makelistTitleEditatble(index,obj.title,'done');
              }}
              className="editable"
              ref={this.listTitleEditInput}
            ></input>
          );
        }
        else{
          listTitleElm=  (
            <label className="listTitle"  onClick={() => {
              this.makelistTitleEditatble(index,obj.title,'start');
            }}>{obj.title}</label>
          ) 
        }
       
        return (
          <div className="card" key={index + obj.title}>
           {listTitleElm}
            <div
              className="srlContainer customScroll"
              onDragOver={this.dragOver} data-ind={index}
            >
              {listcontent}{" "}
              {this.state.isNewitem && this.state.isNewitemIndex === index
                ? newContent
                : null}
            </div>
            {!this.state.isNewitem || this.state.isNewitemIndex !== index
              ? newContent
              : null}
          </div>
        );
      });
      let titleElm = !this.state.isTitleEdited ? (
        <label
          className="headTitle"
          onClick={() => {
            this.makeEditatble();
          }}
        >
          {this.props.selected.title}
        </label>
      ) : (
        <input
          spellCheck="false"
          value={this.props.selected.title}
          onChange={this.props.changeTilte}
          onBlur={() => {
            this.makeEditatble();
          }}
          className="editable"
          ref={this.BoardTitleInput}
        ></input>
      );
      return (
        <div
          className="editvieeContainer"
          style={{
            backgroundImage: `url(${this.props.selected.bgImg})`,
            backgroundColor: this.props.selected.bgColor
          }}
        >
          <div className="subHeader">
            {titleElm}

            <div className="starContainer" onClick={this.props.changeStar}>
              <i
                className={
                  this.props.selected.star
                    ? "far fa-star star yellowStr"
                    : "far fa-star star"
                }
              ></i>
              <div className="divider"></div>
            </div>
            <label className="secName">{this.props.selected.confin}</label>
          </div>
          <div
            className="cardsConatainer customScroll"
            ref={this.scrollContainer}
          >
            {cards}
            <div className={addClass.join(" ")}>{addOricon}</div>
          </div>
        </div>
      );
    }
  }

  makeEditatble() {
    this.setState({ isTitleEdited: !this.state.isTitleEdited }, () => {
      if (this.BoardTitleInput.current) {
        this.BoardTitleInput.current.focus();
      }
    });
  }
  makelistTitleEditatble(ind,title,control){
    this.selListEdInd=ind;
    this.setState({ isEditListitlte: !this.state.isEditListitlte }, () => {
      if (this.listTitleEditInput.current) {
        this.listTitleEditInput.current.focus();
      }
    });
  }
  editOn(e) {
    this.setState(
      prev => {
        return { isNewcard: !prev.isNewcard, newTitleCard: "" };
      },
      () => {
        if (this.ListTitleInput.current) {
          this.ListTitleInput.current.focus();
        }
      }
    );
  }
  editItemOn() {
    this.setState(
      prev => {
        return { isNewitem: !prev.isNewitem, newItemTitle: "" };
      },
      () => {
        if (this.CardTitleInput.current) {
          this.CardTitleInput.current.focus();
        }
      }
    );
  }
  handleChange(e) {
    this.setState({ newTitleCard: e.target.value });
  }
  handlecardChange(e) {
    this.setState({ newItemTitle: e.target.value });
  }
  addNewitem() {
    if (this.state.newTitleCard === "") {
      alert("List title cannot be empty!");
    } else {
      this.props.createList(this.state.newTitleCard);
      this.editOn();
    }
  }
  addNewitemCard(index) {
    if (this.state.newItemTitle !== "") {
      this.props.careateItem(this.state.newItemTitle, index);
      this.editItemOn();
    }
  }
  setEditable(ind, e) {
    this.currentCard=e.target.previousElementSibling;
    this.setState(
      prev => {
        return {
          isNewitemIndex: ind,
          isNewitem: !prev.isNewitem,
          newItemTitle: ""
        };
      },
      () => {
        this.currentCard.scrollTop = this.currentCard.scrollHeight;
        if (this.CardTitleInput.current) {
          this.CardTitleInput.current.focus();
        }
      }
    );
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  dragEnd(e) {
    if(this.over && this.over.parentNode){
      this.dragged.style.display = "block";
      if(this.over.parentNode.contains(this.placeholder)){
      this.over.parentNode.removeChild(this.placeholder);
      if(this.over.dataset.childid){
        let data = {
          parentFrom: +this.dragged.dataset.parentid,
          childFrom: +this.dragged.dataset.childid,
          parentTo: +this.over.dataset.parentid,
          childTo:+this.over.dataset.childid
        };
        this.props.droped(data);
      }
      else{
        let data = {
          parentFrom: +this.dragged.dataset.parentid,
          childFrom: +this.dragged.dataset.childid,
          parentTo: +this.over.dataset.ind,
          childTo:0
        };
        this.props.droped(data);
      }
    }
    }
    else{
      this.dragged.style.display = "block";
    }
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") {
      return
    };
    if(e.target.parentNode.className ==="card"){
      e.target.appendChild(this.placeholder);
    }
   else if(e.target.parentNode.className !== "srlContainer customScroll"){
    return;
   }
    this.over = e.target;
    e.target.parentNode.insertBefore(this.placeholder, e.target.nextSibling);
  }
  editPenClick(e,Listindex,cardIndex){
    e.stopPropagation();
    let data={x:e.clientX,y:e.clientY,maxWidth:e.view.innerWidth,maxHeight:e.view.innerHeight,Listindex:Listindex,cardIndex:cardIndex};
    this.props.quickeditCard(data)
  }
  componentDidUpdate(){
    if (this.listTitleEditInput.current) {
      this.listTitleEditInput.current.focus();
    }
  }
}

export default boaredit;
