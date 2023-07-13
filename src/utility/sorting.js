const sorting = (sort) => {
    let order=[];
    if(sort){
     order=sort.split(":");
    }

    let field = "productId";
    if(order[0]){
        field = order[0].trim().toString();
    }
  
    let type = "ASC";
    if(order[1]){
        type = order[1].trim().toString();
    }

    return [field, type]
  }

  module.exports = sorting;