const itemData = [{
  name: "雞腿飯",
  price: 100,
}, {
  name: "排骨飯",
  price: 80,
}, {
  name: "控肉飯",
  price: 70,
}, {
  name: "魚排飯",
  price: 85,
},
];

const orderData = {
  sum: 0,
  discount: 0.8,
  shipFee: 30,
  total: 0,
};

const elemItemList = document.querySelector('#ItemList');
const elemOrder = document.querySelector('#Order');
const elemOrderList = document.querySelector('#OrderList');
const elemPdButton = document.querySelector('#PdButton');
const elemConfirmBtn = document.querySelector('#ConfirmBtn');

(() => {
  elemItemList.innerHTML = itemStrMaker();
  setListener();
})();
function setListener() {
  elemPdButton.addEventListener('click', checkOut);
  elemConfirmBtn.addEventListener('click', orderFinish);
};

function itemStrMaker(itemStr = '') {
  itemData.map((item) => {
    itemStr += `<div class="pd__item">
          <div class="pd__product">
            <p class="pd__name">${item.name}</p>
            <p class="pd__price">${item.price} 元</p>
          </div>
          <div class="pd__number">
            <label for="pd__input">數量 :</label>
            <input class="pd__input" type="number" placeholder="0" min="0">
          </div>
        </div>`;
  });
  return itemStr;
};

function orderStrMaker() {
  return `<div class="order__item">
      <p class="order__title">小計 :</p>
      <p class="order__number">${orderData.sum}</p>
    </div>
    <div class="order__item">
      <p class="order__title">折數 :</p>
      <p class="order__number">${orderData.discount}</p>
    </div>
    <div class="order__item">
      <p class="order__title">運費 :</p>
      <p class="order__number">${orderData.shipFee}</p>
    </div>
    <div class="order__item">
      <p class="order__title">合計 :</p>
      <p class="order__number order__number--danger">${orderData.total}</p>
    </div>`;
};

function itemSum(arr, sum = 0) {
  arr.forEach((item, i) => {
    sum = sum + item * itemData[i].price;
  });
  return sum;
};

function printOrder(arr) {
  orderData.sum = itemSum(arr);
  orderData.total = orderData.sum * orderData.discount + orderData.shipFee;
  elemOrderList.innerHTML = orderStrMaker();
  elemOrder.style.display = 'block';
};


function checkOut() {
  const inputValues = [];
  const elemPdInputs = document.querySelectorAll('#ItemList .pd__input');
  elemPdInputs.forEach(item => {
    inputValues.push(
      item.value === '' ? 0 : parseInt(item.value, 10));
  });
  let sumOfInputValues = 0;
  inputValues.forEach(item => sumOfInputValues += item);
  if (sumOfInputValues === 0) {
    alert('請輸入數量');
  } else if (!sumOfInputValues || sumOfInputValues < 0) {
    alert('您輸入的格式有誤 !');
  } else {
    printOrder(inputValues);
  };
};

function orderFinish() {
  window.location = 'finish.html';
};
