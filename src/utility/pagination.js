const pagination = (pageAsNumber,sizeAsNumber) => {
  
    let page = 1;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
    return {
      page, size
    }
  }

  module.exports = pagination;