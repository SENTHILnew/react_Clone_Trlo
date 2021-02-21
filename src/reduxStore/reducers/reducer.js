
import * as actions from '../actions/action'

let defaultState = {
    menuClassList: ["hamburger", "hamburger--slider"],
    issdieOpen: false,
    isLoader: false,
    Boards: [
        {
          confin: "Public",
          title: "ghghgfh",
          bgImg: "/static/media/bg2.2dd8cfbe.jpg",
          bgColor: "/static/media/bg2.2dd8cfbe.jpg",
          id: 1,
          list: [
            {
              isAddingListItem: false,
              refresh: false,
              title: "ghgh",
              itemsInList: [
                {
                  title: "srtrettretertert",
                  desc: "Helo there",
                  id: "1srtrettretertert",
                  comments: [{cmnt:"new",dt:"2020-03-12T14:07:08.879Z"}, {cmnt:"Hi",dt:"2020-03-12T14:07:08.879Z"}],
                  del: false
                },
                {
                  title: "erterterter",
                  desc: "",
                  id: "2erterterter",
                  comments: ["ada ada"],
                  del: false
                },
                {
                  title: "ertertert",
                  desc: "",
                  id: "3ertertert",
                  comments: [],
                  del: false
                },
                {
                  title: "ertertert",
                  desc: "",
                  id: "4ertertert",
                  comments: [],
                  del: false
                },
                {
                  title: "erterteter",
                  desc: "",
                  id: "6erterteter",
                  comments: [],
                  del: false
                }
              ],
              id: "1ghgh",
              del: false,
              isEdited: false
            },
            {
              isAddingListItem: false,
              refresh: false,
              title: "dfgdfgfg",
              itemsInList: [
                {
                  title: "ertertret",
                  desc: "",
                  id: "11ertertret",
                  comments: [],
                  del: false
                },
                {
                  title: "ertret",
                  desc: "",
                  id: "17ertret",
                  comments: [],
                  del: false
                },
                {
                  title: "erterterter",
                  desc: "",
                  id: "9erterterter",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgdfgdfgd",
                  desc: "",
                  id: "1dfgdfgdfgd",
                  comments: [],
                  del: false
                }
              ],
              id: "2dfgdfgfg",
              del: false,
              isEdited: false
            },
            {
              isAddingListItem: false,
              refresh: false,
              title: "dfgdfgf",
              itemsInList: [
                {
                  title: "ertertert",
                  desc: "",
                  id: "10ertertert",
                  comments: [],
                  del: false
                },
                {
                  title: "erterert",
                  desc: "",
                  id: "14erterert",
                  comments: [],
                  del: false
                },
                {
                  title: "erterterrt",
                  desc: "",
                  id: "7erterterrt",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgddfg",
                  desc: "",
                  id: "1dfgddfg",
                  comments: [],
                  del: false
                }
              ],
              id: "3dfgdfgf",
              del: false,
              isEdited: false
            },
            {
              isAddingListItem: false,
              refresh: false,
              title: "dfgdfg",
              itemsInList: [
                {
                  title: "eerterter",
                  desc: "",
                  id: "16eerterter",
                  comments: [],
                  del: false
                },
                {
                  title: "ertertert",
                  desc: "",
                  id: "12ertertert",
                  comments: [],
                  del: false
                },
                {
                  title: "tertert",
                  desc: "",
                  id: "8tertert",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgdfgdf",
                  desc: "",
                  id: "1dfgdfgdf",
                  comments: [],
                  del: false
                }
              ],
              id: "4dfgdfg",
              del: false,
              isEdited: false
            },
            {
              isAddingListItem: false,
              refresh: false,
              title: "dfgdgdf",
              itemsInList: [
                {
                  title: "dfgfdgdf",
                  desc: "",
                  id: "2dfgfdgdf",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgdfgdf",
                  desc: "",
                  id: "1dfgdfgdf",
                  comments: [],
                  del: false
                },
                {
                  title: "fdgdgdf",
                  desc: "",
                  id: "1fdgdgdf",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgdfgdf",
                  desc: "",
                  id: "2dfgdfgdf",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgfdgdfg",
                  desc: "",
                  id: "2dfgfdgdfg",
                  comments: [],
                  del: false
                }
              ],
              id: "5dfgdgdf",
              del: false,
              isEdited: false
            },
            {
              isAddingListItem: false,
              refresh: false,
              title: "dfgdfgdfg",
              itemsInList: [
                {
                  title: "dfgdfgf",
                  desc: "",
                  id: "2dfgdfgf",
                  comments: [],
                  del: false
                },
                {
                  title: "erterter",
                  desc: "",
                  id: "13erterter",
                  comments: [],
                  del: false
                },
                {
                  title: "dfgdfgdfg",
                  desc: "",
                  id: "3dfgdfgdfg",
                  comments: [],
                  del: false
                },
                {
                  title: "erterte",
                  desc: "",
                  id: "15erterte",
                  comments: [],
                  del: false
                },
                {
                  title: "erterterert",
                  desc: "",
                  id: "5erterterert",
                  comments: [],
                  del: false
                }
              ],
              id: "6dfgdfgdfg",
              del: false,
              isEdited: false
            }
          ],
          history: [],
          star: false,
          del: false
        }
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