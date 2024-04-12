import PgetData, { getData, get_Basket } from "./getData.js";
let API = "http://localhost:3000/data";
let cnt = document.querySelector(".cnt");
let cnt_1 = document.querySelector(".cnt_1");
let cnt_2 = document.querySelector(".cnt_2");
let summa = document.querySelector(".sum");

async function get() {
  try {
    let response = await fetch(API);
    let data = await response.json();
    PgetData(data);
    getData(data);
    cnt_get(data);
    get_Basket(data);
  } catch (error) {
    console.error(error);
  }
}

async function edit(id, editUser) {
  try {
    let response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });
    get();
  } catch (error) {
    console.error(error);
  }
}
async function cnt_get(data) {
  cnt.innerHTML = "";
  let summ = 0;
  let sum = 0;
  data.forEach((el) => {
    if (el.status == true) sum += 1;
    summ += el.price * el.cnt + (el.cent * el.cnt) / 100;
  });
  cnt.innerHTML = sum;
  cnt_1.innerHTML = sum;
  cnt_2.innerHTML = sum;
  summa.innerHTML = "$" + summ;
}

let home = document.querySelector(".home");
let shop = document.querySelector(".shop");
let about = document.querySelector(".about_btn");
let home_2 = document.querySelector(".home_2");
let shop_2 = document.querySelector(".shop_2");
let about_2 = document.querySelector(".about_btn_2");
let home_3 = document.querySelector(".home_3");
let shop_3 = document.querySelector(".shop_3");
let about_3 = document.querySelector(".about_btn_3");
let Page_1 = document.querySelector(".Page_1");
let Page_2 = document.querySelector(".Page_2");
let Page_3 = document.querySelector(".Page_3");
let shop_all = document.querySelector(".shop_all");

function Save_dislpay() {
  localStorage.setItem(
    "displayState",
    JSON.stringify({
      home: Page_1.style.display,
      shop: Page_2.style.display,
      about: Page_3.style.display,
    })
  );
}

function restoreDisplayState() {
  let displayState = JSON.parse(localStorage.getItem("displayState"));
  if (displayState) {
    Page_1.style.display = displayState.home;
    Page_2.style.display = displayState.shop;
    Page_3.style.display = displayState.about;
  }
}

window.onload = restoreDisplayState;

home.onclick = () => {
  Page_1.style.display = "block";
  Page_2.style.display = "none";
  Page_3.style.display = "none";
  Save_dislpay();
};

home_2.onclick = () => {
  Page_1.style.display = "block";
  Page_2.style.display = "none";
  Page_3.style.display = "none";
  Save_dislpay();
};

home_3.onclick = () => {
  Page_1.style.display = "block";
  Page_2.style.display = "none";
  Page_3.style.display = "none";
  Save_dislpay();
};

shop.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "block";
  Page_3.style.display = "none";
  Save_dislpay();
};

shop_all.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "block";
  Page_3.style.display = "none";
  Save_dislpay();
};

shop_2.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "block";
  Page_3.style.display = "none";
  Save_dislpay();
};

shop_3.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "block";
  Page_3.style.display = "none";
  Save_dislpay();
};

about.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "none";
  Page_3.style.display = "block";
  Save_dislpay();
};

about_2.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "none";
  Page_3.style.display = "block";
  Save_dislpay();
};

about_3.onclick = () => {
  Page_1.style.display = "none";
  Page_2.style.display = "none";
  Page_3.style.display = "block";
  Save_dislpay();
};

let search_inp = document.querySelector(".search_inp");

search_inp.addEventListener("input", () => {
  let name = search_inp.value.trim();
  searchByName(name);
});

async function searchByName(name) {
  try {
    let response = await fetch(API);
    let data = await response.json();

    if (name.trim() === "") {
      getData(data);
    } else {
      let filteredData = data.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
      });
      getData(filteredData);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}

export default get;

export { edit };
