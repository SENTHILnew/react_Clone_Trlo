import React, { useState } from "react";
import "./deleteMul.scss";

export default function DeleteMul(props) {
  const [options, setOptions] = useState(props.obtions);

  const toggleBoardCheckbox = index => {
    const optionsBoard = [...options];
    optionsBoard[index].check = !optionsBoard[index].check;
    optionsBoard[index].lists.forEach((a)=>{
        a.check=optionsBoard[index].check;
        a.cards.forEach((b)=>{
            b.check=optionsBoard[index].check;
        })
    })
    setOptions(optionsBoard);
  };

  const toggleListCheckbox = (index,indLi)=> {
    const optionsBoard = [...options];
    let list=optionsBoard[index].lists[indLi];
    list.check = !list.check;
    list.cards.forEach((b)=>{
            b.check=list.check;
        })
 
    let allChacked=true;
    optionsBoard[index].lists.forEach((c)=>{
        if(!c.check){
            allChacked=false;
            return
        }
    });
    optionsBoard[index].check=allChacked;
    setOptions(optionsBoard);
  };

  const toggleCardCheckbox = (index,indLi,indCa) => {
    const optionsBoard = [...options];
    let card=optionsBoard[index].lists[indLi].cards[indCa];
    card.check = !card.check;
    let allCardsCh=true;
    optionsBoard[index].lists[indLi].cards.forEach((a)=>{
        if(!a.check){
            allCardsCh=false;
            return;   
        }
    });
    optionsBoard[index].lists[indLi].check=allCardsCh;
    let allChacked=true;
    optionsBoard[index].lists.forEach((c)=>{
        if(!c.check){
            allChacked=false;
            return
        }
    });
    optionsBoard[index].check=allChacked;
    setOptions(optionsBoard);
  };
  const confiDelete=()=>{
   let x= window.confirm('Are you sure you want to delete ?');
   if(x){props.deleteItems(options)}
  }
  const renderCheckboxes = () => {
    const optionsBoard = [...options];

    return optionsBoard.map((board, index) => (
      <div key={index + board.title}>
        <div className="title">Boards</div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={board.check}
              onChange={e => {
                toggleBoardCheckbox(index);
              }}
            />
            {board.title}
          </label>
          <div className="listCo">
            <div className="title">Lists</div>
            {board.lists.map((list, indLi) => {
              return (
                <div key={indLi + list.title}>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={list.check}
                        onChange={e => {
                            toggleListCheckbox(index,indLi);
                        }}
                      />
                      {list.title}
                    </label>
                    <div className="carCo">
                      <div className="title">Cards</div>
                      {list.cards.map((card, indCa) => {
                        return (
                          <div key={indCa + card.title}>
                            <div>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={card.check}
                                  onChange={e => {
                                    toggleCardCheckbox(index,indLi,indCa);
                                  }}
                                />
                                {card.title}
                              </label>
                            </div>
                          </div>
                        );
                      })}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ));
  };
  return (<React.Fragment><div className="optsContainer">{renderCheckboxes()}</div><div className="footCon"><button className="dgbtn" onClick={()=>{confiDelete()}}>Delete</button></div></React.Fragment>);
}
