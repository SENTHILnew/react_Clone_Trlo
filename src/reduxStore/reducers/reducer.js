
import * as actions from '../actions/action'

let defaultState = {
    menuClassList: ["hamburger", "hamburger--slider"],
    issdieOpen: false,
    isLoader: false,
    Boards: [
      ],
}


const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case actions.actionTypes.sideMenu:
            let classes = [...state.menuClassList];

            if (classes.indexOf("is-active") > -1) {
                classes.pop();
            } else {
                classes.push("is-active");
            }
            return { ...state, menuClassList: classes, issdieOpen: !state.issdieOpen };
            case actions.actionTypes.addNewBoard:
              let dub = [...state.Boards];
              action.payload.id = dub.length + 1;
              dub.push(action.payload);
              return {
                ...state,Boards:dub
              }
              case actions.actionTypes.updateBoard:
                return {
                  ...state,Boards:action.payload
                }
        default:
            return state;
    }
}


export default reducers