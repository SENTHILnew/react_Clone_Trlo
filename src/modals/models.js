 class Borad {
    confin;
    title;
    bgImg;
    bgColor;
    list;
    history;
    id;
    star;
    del;
    constructor(titel, confin, bgImg, bgColor, id) {
      this.confin = confin;
      this.title = titel;
      this.bgImg = bgImg;
      this.bgColor = bgColor;
      this.id = id;
      this.list = [];
      this.history = [];
      this.star = false;
      this.del = false;
    }
  }
  
 class ListItem {
    id;
    isAddingListItem;
    refresh;
    title;
    itemsInList;
    del;
    isEdited;
    constructor(title, id) {
      this.isAddingListItem = false;
      this.refresh = false;
      this.title = title;
      this.itemsInList = [];
      this.id = id + title;
      this.del = false;
      this.isEdited = false;
    }
  }
  
 class ListItemcontent {
    id;
    title;
    desc;
    del;
    comments;
    constructor(title, id) {
      this.title = title;
      this.desc = "";
      this.id = id + title;
      this.comments = [];
      this.del = false;
    }
  }

   const ModalName={
    'CREATEBOARD':'Create New Board',
    'MOVECARD' :'Move Card',
    'COPYCARD' :'Copy Card',
    'EDITOVERVIEW':'Edit',
    'DELETE_MULTIPLE':'Delete Multiple'
  }

  export{Borad,ListItem,ListItemcontent,ModalName}