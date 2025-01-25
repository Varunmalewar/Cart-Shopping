let shop = document.getElementById("shop");
let shopItemsdata = [
  {
    id: "1",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    Image: "./images/img-1.jpg",
  },
  {
    id: "2",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    Image: "./images/img-2.jpg",
  },
  {
    id: "3",
    name: "T shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    Image: "./images/img-3.jpg",
  },
  {
    id: "4",
    name: "Mens suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    Image: "./images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || []; 
  //it stores that what items are added to the cart
  // and also to tell specifically which item is added


let generateShop = () => {
  return (shop.innerHTML = shopItemsdata
    .map((x) => {
      let { id, name, price, desc, Image } = x; //this is object destructuring
      let search = basket.find((x) => x.id === id) || [];
      let quantity = search.item || 0;
      
      return `<div id=product-id-${id} class="item">
        <img src="${Image}" alt="" width="220px" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>${price}$</h2>
            <div class="button">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div class="quantity" id=${id}>
              ${quantity}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};
generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => {
    return x.id === selectedItem;
  });

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket)) ;     // data is the name of the local storage

//   console.log(basket);
  update(selectedItem);
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => {
    return x.id === selectedItem;
  });

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket))      // data is the name of the local storage

//   console.log(basket);
  update(selectedItem);
};


let update = (id) => {
    let search = basket.find((x)=>{
       return x.id===id
    })
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation=()=>{
    let cartIcon=document.getElementById("cartAmount");
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));   // where 0 is default number of items in cart
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

}
calculation();