// base obj

const products = {
  crazy: {
    name: "Crazy",
    price: 31000,
    amount: 0,
    img: "images/products/burger-1.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  light: {
    name: "Light",
    price: 26000,
    amount: 0,
    img: "images/products/burger-2.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: "CheeseBurger",
    price: 29000,
    amount: 0,
    img: "images/products/burger-3.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: "dBurger",
    price: 24000,
    amount: 0,
    img: "images/products/burger-4.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
};

const basketBtnCount = document.querySelector(".warapper__navbar-count"),
  basketBtn = document.querySelector(".wrapper__navbar-btn"),
  basketModal = document.querySelector(".wrapper__navbar-basket"),
  basketBtnClose = document.querySelector(".wrapper__navbar-close"),
  basketChecklist = document.querySelector(".wrapper__navbar-checklist"),
  basketTotalPrice = document.querySelector(".wrapper__navbar-totalprice"),
  productBtns = document.querySelectorAll(".wrapper__list-btn"),
  btnCard = document.querySelector(".wrapper__navbar-bottom"),
  printBody = document.querySelector(".print__body"),
  printFooter = document.querySelector('.print__footer');

productBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    plusOrMinus(btn);
  });
});

function plusOrMinus(btn) {
  let parent = btn.closest(".wrapper__list-card"),
    parentId = parent.getAttribute("id");

  products[parentId].amount++;
  basket();
}

function basket() {
  const productsArr = [];

  for (const key in products) {
    const po = products[key];
    const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
      parentIndicator = productCard.querySelector(".wrapper__list-count");
    if (po.amount) {
      productsArr.push(po);
      parentIndicator.classList.add("active");
      parentIndicator.innerHTML = po.amount;
    } else {
      parentIndicator.classList.remove("active");
      parentIndicator.innerHTML = 0;
    }
  }
  let allCount = getTotal("amount");
  if (allCount) {
    basketBtnCount.classList.add("active");
  } else {
    basketBtnCount.classList.remove("active");
  }
  basketBtnCount.innerHTML = allCount;
  basketTotalPrice.innerHTML = getTotal("totalSum").toLocaleString() + " сум";
  basketChecklist.innerHTML = "";
  productsArr.forEach((prod) => (basketChecklist.innerHTML += cardItem(prod)));
}

function getTotal(item) {
  let total = 0;
  for (const key in products) {
    total += products[key][item];
  }
  return total;
}

function cardItem(prod) {
  const { name, img, totalSum: price, amount } = prod;
  return `
    <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
        <img src="${img}" class="wrapper__navbar-productImage" />
        <div>
          <div class="wrapper__navbar-infoName">${name}</div>
          <div class="wrapper__navbar-infoPrice">${price.toLocaleString()} сум</div>
        </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
        <output class="wrapper__navbar-count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
      </div>
    </div>
  `;
}

basketBtn.addEventListener("click", () => {
  basketModal.classList.toggle("active");
});
basketBtnClose.addEventListener("click", () => {
  basketModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  let btn = e.target;
  if (btn.classList.contains("wrapper__navbar-symbol")) {
    let attr = btn.getAttribute("data-symbol"),
      parent = btn.closest(".wrapper__navbar-option");

    if (parent) {
      const parentId = parent.getAttribute("id").split("_")[0];
      if (attr == "-") products[parentId].amount--;
      else if (attr == "+") products[parentId].amount++;
      basket();
    }
  }
});


btnCard.addEventListener('click', () => {
  printBody.innerHTML = '';
  for (const key in products) {
    const el = products[key];
    const {name, totalSum, amount} = el;
    printBody.innerHTML += `
      <div class="print__body-item">
        <div class="print__body-item_name">
          <span>${name}</span>
          <span>${amount}</span>
        </div>
        <p class="print__body-item_price">${totalSum.toLocaleString()} сум</p>
      </div>
    `
  }
  printFooter.innerHTML = getTotal('totalSum').toLocaleString() + ' сум';
  window.print()
})