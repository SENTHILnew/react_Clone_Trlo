import React, { useState, useEffect } from "react";
import "./editPopup.scss";

export default function Editcomponent(props) {
  const [titleEdited, setTitleEdited] = useState(false);
  const [name, setname] = useState(props.cardData.title);
  const [isDescription, setIsdecription] = useState(false);
  const [description, setdecription] = useState(props.cardData.desc);
  const [isComment, setisComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentEditIndex, setcommentEditIndex] = useState(null);
  const [commentEdit, setcommentEdit] = useState("");
  const inREf = React.createRef();
  const in2Ref = React.createRef();
  const in3Ref = React.createRef();
  const makeTitleEdit = () => {
    if (titleEdited) {
      props.changeCardTitle(name);
    }
    setTitleEdited(!titleEdited);
  };

  const updateName = e => {
    if (e.target.value !== "") {
      setname(e.target.value);
    }
  };

  const makeDescEdit = () => {
    setIsdecription(!isDescription);
    if (isDescription) {
      setdecription(props.cardData.desc);
    }
  };

  const updateDesc = e => {
    setdecription(e.target.value);
  };

  const updateDesdata = e => {
    props.changedescription(description);
    setIsdecription(!isDescription);
  };

  const cmntEditable = e => {
    if (isComment) {
      setComment("");
    }
    setisComment(!isComment);
  };
  const commentType = e => {
    let elm = e.target;
    elm.style.height = "5px";
    elm.style.height = elm.scrollHeight + "px";
    setComment(e.target.value);
  };
  const commentEditType = e => {
    let elm = e.target;
    elm.style.height = "5px";
    elm.style.height = elm.scrollHeight + "px";
    setcommentEdit(e.target.value);
  };
  const saveCommnent = () => {
    let cmntobj = { dt: new Date().toISOString(), cmnt: comment };
    props.saveCommnent(cmntobj);
    setComment("");
    setisComment(false);
  };

  const saveEditCommnent = (i) => {
    let cmntobj = { dt: new Date().toISOString(), cmnt: commentEdit };
    props.saveEditedCommnent(i,cmntobj);
    setcommentEdit("");
    setcommentEditIndex(null);
  };
  const deleteCmnt = i => {
    props.deleteCmnt(i);
  };
  useEffect(() => {
    if (inREf.current) {
      inREf.current.focus();
    }
    if (in2Ref.current) {
      in2Ref.current.focus();
    }
    if (in3Ref.current) {
      in3Ref.current.focus();
    }
  }, [inREf, in2Ref, in3Ref]);

  let cmnts = props.cardData.comments.map((data, i) => {
    let dt = new Date(data.dt);
    return (
      <div className="cmntsContainer" key={data + i}>
        <div>
          <span className="nme">You-</span>
          <span className="dt">
            {` ${dt.toDateString()} - ${dt.toLocaleTimeString()}`}
          </span>
        </div>
        {commentEditIndex === i ? (
          <div className="dummyCmnt mag0">
            <textarea
              placeholder="Enter the edited comment"
              className="txt"
              value={commentEdit}
              onChange={commentEditType}
              ref={in3Ref}
              spellCheck="false"
            ></textarea>
            <button
              className="savbtn"
              disabled={commentEdit === ""}
              onClick={()=>{saveEditCommnent(i)}}
            >
              Save
            </button>
            <i
              className="fas fa-times clcBtn"
              onClick={() => {
                setcommentEdit(data.cmnt);
                setcommentEditIndex(null);
              }}
            ></i>
          </div>
        ) : (
          <div
            className="cmnt"
          >
            {data.cmnt}
          </div>
        )}
        <div className="editCmntContain">
          <span className="item"
             onClick={() => {
                setcommentEdit(data.cmnt);
                setcommentEditIndex(i);
              }}>Edit</span>{" "}
          <span
            className="item"
            onClick={() => {
              deleteCmnt(i);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    );
  });

  let titleelm = titleEdited ? (
    <input
      value={name}
      onBlur={makeTitleEdit}
      onChange={updateName}
      spellCheck="false"
      className="inpt"
    ></input>
  ) : (
    <span onClick={makeTitleEdit}>{props.cardData.title}</span>
  );

  let decElm = isDescription ? (
    <div className="addDesc">
      <textarea
        className="txtAr"
        placeholder="Add a more detailed description…"
        ref={inREf}
        value={description}
        onChange={updateDesc}
        spellCheck="false"
      ></textarea>
      <button className="svBtn" onClick={updateDesdata}>
        Save
      </button>
      <i className="fas fa-times clcBtn" onClick={makeDescEdit}></i>
    </div>
  ) : props.cardData.desc !== "" ? (
    <div onClick={makeDescEdit} className="sta">
      {props.cardData.desc}
    </div>
  ) : (
    <div className="addDesc" onClick={makeDescEdit}>
      Add a more detailed description…
    </div>
  );

  let commentElm = isComment ? (
    <div className="dummyCmnt">
      <textarea
        className="txt"
        value={comment}
        onChange={commentType}
        ref={in2Ref}
        spellCheck="false"
      ></textarea>
      <button
        className="savbtn"
        disabled={comment === ""}
        onClick={saveCommnent}
      >
        Save
      </button>
      <i className="fas fa-times clcBtn" onClick={cmntEditable}></i>
    </div>
  ) : (
    <div className="dummyCmnt" onClick={cmntEditable}>
      Write a comment...
    </div>
  );

  return (
    <div className="editPopcontainer">
      <div>
        <label className="ediTitl">
          <i className="fas fa-credit-card pad10"></i>
          {titleelm}
        </label>
      </div>
      <div className="editContainer">
        <div className="desBlock">
          <div className="desTitle">
            <label className="desLabel">
              <i className="fas fa-align-left marg5"></i>Description
            </label>
            {decElm}
          </div>
          <div className="desTitle">
            <label className="desLabel">
              <i className="far fa-comment marg5"></i>Comments
            </label>
            {commentElm}
            {cmnts}
          </div>
        </div>
        <div className="actionBlock">
          <div>
            <label className="actTitle">Actions</label>
            <div
              className="actItem"
              onClick={e => props.moveCopyItem(e, "COPYCARD")}
            >
              Copy
            </div>
            <div
              className="actItem"
              onClick={e => props.moveCopyItem(e, "MOVECARD")}
            >
              Move
            </div>
            <div className="actItem" onClick={props.deleteItem}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
