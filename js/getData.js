import get, { edit } from "./get.js";

let preview_box = document.querySelector(".preview_box");
let box = document.querySelector(".box");
let info = document.querySelector(".info");
let info_name = document.querySelector(".info_name");
let image_info = document.querySelector(".image_info");
let prod_name = document.querySelector(".prod_name");
let info_company = document.querySelector(".info_company");
let desc = document.querySelector(".desc");
let info_price = document.querySelector(".info_price");
let close = document.querySelector(".close");
let all = document.querySelector(".all");
let ikea = document.querySelector(".ikea");
let marcos = document.querySelector(".marcos");
let caressa = document.querySelector(".caressa");
let liddy = document.querySelector(".liddy");
let shop_f = "all";
let buy = document.querySelector(".buy");
let shop_cat=document.querySelector(".shop_cat");
let sidebar=document.querySelector(".sidebar");
let shop_cat1=document.querySelector(".shop_cat1");
let shop_cat2=document.querySelector(".shop_cat2");
let close_basket=document.querySelector(".close_basket");
let sidebar_box=document.querySelector(".sidebar_box");
let rangeValue = document.querySelector('.rangeValue')
let range = document.querySelector('.range');


rangeValue.innerHTML = '$X'

range.addEventListener("input", ()=>{
  rangeValue.innerHTML = '$' +  range.value
 
})

function SaveS() {
    localStorage.setItem('side', JSON.stringify({
        disp: sidebar.style.display
    }));
  }
  
  function restoreside() {
    let side = JSON.parse(localStorage.getItem('side'));
    if (side) {
        sidebar.style.display = side.disp;
    }
  }
  
  
  window.onload = restoreside();

close_basket.onclick=()=>{
    sidebar.style.display="none"
    SaveS()
}

shop_cat.onclick=()=>{
    sidebar.style.display="block";
    SaveS()
}

shop_cat1.onclick=()=>{
    sidebar.style.display="block";
    SaveS()
}

shop_cat2.onclick=()=>{
    sidebar.style.display="block";
    SaveS()
}

function Save_filter() {
  localStorage.setItem(
    "filter",
    JSON.stringify({
      status: shop_f,
    })
  );
}

function filterOnLoad() {
  let filter = JSON.parse(localStorage.getItem("filter"));
  if (filter) {
    shop_f = filter.status;
    console.log(filter.status);
  }
}

window.onload = filterOnLoad();

all.onclick = () => {
  shop_f = "all";
  get();
  Save_filter();
  console.log(shop_f);
};
ikea.onclick = () => {
  shop_f = "Ikea";
  get();
  Save_filter();
  console.log(shop_f);
};
marcos.onclick = () => {
  shop_f = "Marcos";
  get();
  Save_filter();
  console.log(shop_f);
};

caressa.onclick = () => {
  shop_f = "Caressa";
  get();
  Save_filter();
  console.log(shop_f);
};

liddy.onclick = () => { // search ge&
  shop_f = "Liddy";
  Save_filter();
  get();
  console.log(shop_f);
};

close.onclick = () => {
  info.close();
};




function PgetData(data) {
  preview_box.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let image = document.createElement("img");
    image.src = data[i].image;
    let name = document.createElement("h5");
    name.innerHTML = data[i].name;
    let price = document.createElement("h6");
    price.innerHTML = "$" + data[i].price + "," + data[i].cent;
    card.append(image, name, price);
    preview_box.append(card);
  }
}

function getData(data) {
  box.innerHTML = "";
  data.forEach((el) => {
    if (shop_f == el.company || shop_f == "all") {
      let card = document.createElement("div");
      card.classList.add("card");
      let image = document.createElement("img");
      image.src = el.image;
      let name = document.createElement("h5");
      name.innerHTML = el.name;
      let price = document.createElement("h6");
      price.innerHTML = "$" + el.price + "," + el.cent;
      card.append(image, name, price);
      box.append(card);
      card.onclick = () => {
        info.showModal();
        info_name.innerHTML = el.name;
        prod_name.innerHTML = el.name;
        image_info.src = el.image;
        info_company.innerHTML = "By " + el.company;
        info_price.innerHTML = "$" + el.price + "," + el.cent;
        desc.innerHTML = el.desc;
        buy.onclick = () => {
          if (el.status != true) {
            el.status = true;
            el.cnt = el.cnt += 1;
            edit(el.id, el);
          } else {
            alert(el.name + " is already selected by ");
          }
        };
      };
    }
  });
}

function get_Basket(data){
    sidebar_box.innerHTML = ""
    data.forEach(el=>{
        if (el.status == true){
            let card=document.createElement("div")
            card.classList.add("card_complete");
            let image = document.createElement("img");
            image.src = el.image;
            let pelmeni=document.createElement("div");
            pelmeni.classList.add("pelmeni");
            let name_div = document.createElement("div");
            name_div.classList.add("name_div")
            let del_btn=document.createElement("button")
            del_btn.innerHTML="X"
            del_btn.onclick=()=>{
              el.status=!el.status
              el.cnt=0
              edit(el.id, el)
            }
            let name = document.createElement("h3")
            name.innerHTML = el.name
            name_div.append(name, del_btn)
            let price = document.createElement("h4")
            price.innerHTML ="$"+ (el.price*el.cnt+(el.cent*el.cnt)/100)
            let action=document.createElement("div")
            action.classList.add("action_complete")
            let minus = document.createElement("button")
            minus.innerHTML = "-"
            minus.onclick=()=>{
                if (el.cnt > 0) {
                    el.cnt = el.cnt -= 1;
                    if (el.cnt==0){
                        el.status = false;
                    }
                    edit(el.id, el);
                }
            }
            let cnt_p=document.createElement("p")
            cnt_p.innerHTML =el.cnt
            let plus = document.createElement("button")
            plus.innerHTML="+"
            plus.onclick=()=>{
                el.cnt = el.cnt += 1;
                edit(el.id, el);
            }
            action.append(minus,cnt_p,plus)
            pelmeni.append(name_div,price,action)
            card.append(image,pelmeni)
            sidebar_box.append(card)
        }
    })
}



export { getData , get_Basket};

export default PgetData;
