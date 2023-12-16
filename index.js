var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productTaxes = document.getElementById("taxes");
var productAds = document.getElementById("ads");
var productDiscount = document.getElementById("discount");
var productCount = document.getElementById("count");
var productCategory = document.getElementById("category");
var productSearch = document.getElementById("search");
var productTotal = document.getElementById("total");
var list;
var temp,
  sum = 0,
  searchWay = "searchname";

if (localStorage.getItem("proList") != null) {
  list = JSON.parse(localStorage.getItem("proList"));
  displayProduct(list);
} else {
  list = [];
}

// summetions
function total() {
  if (productPrice.value != "") {
    sum = Number(productPrice.value) + Number(productTaxes.value) + Number(productAds.value) -  Number(productDiscount.value);
    productTotal.innerHTML = sum.toString();
    productTotal.classList.replace("bg-danger", "bg-success");
  } else {
    productTotal.innerHTML = "";
    productTotal.classList.replace("bg-success", "bg-danger");
  }
}

//creat

function createProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    tax: productTaxes.value,
    ads: productAds.value,
    disc: productDiscount.value,
    count: productCount.value,
    category: productCategory.value,
    all: sum,
  };
  if(validation(productName) && validation(productCategory))
  {
  list.push(product);
  displayProduct(list);
  localStorage.setItem("proList", JSON.stringify(list));
  clear();
}
else{
    
    alert('Check ur data Please')
}
}
//Display product

function displayProduct(products) {
  var cartona = "";

  for (let i = 0; i < products.length; i++) {
    cartona += `  <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].tax}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].disc}</td>
                        <td>${products[i].all}</td>
                        <td>${products[i].count}</td>
                        <td>${products[i].category}</td>
                        <td><button class="btn btn-warning" onclick="updateProducts(${i})">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deleteProducts(${i})">Delete</button></td>
                    </tr> `;
  }
  document.getElementById("content").innerHTML = cartona;
}

// clear inputs

function clear() {
  productName.value = "";
  productPrice.value = "";
  productTaxes.value = "";
  productAds.value = "";
  productDiscount.value = "";
  productCount.value = "";
  productCategory.value = "";
  productSearch.value = "";
  productTotal.classList.replace("bg-success", "bg-danger");
}

//delete product

function deleteProducts(index) {
  list.splice(index, 1);
  displayProduct(list);
  localStorage.setItem("proList", JSON.stringify(list));
}

//search

function searchMood(id) {
  if (id === "searchname") {
    searchWay = "searchname";
    productSearch.placeholder = "Search by Name";
  } else {
    searchWay = "searchcat";
    productSearch.placeholder = "Search by Category";
  }
  productSearch.value = "";
  displayProduct(list);
  productSearch.focus();
}

function searchPro(letter) {
  var founded = [];

  for (var i = 0; i < list.length; i++) {
    if (searchWay === "searchname") {
      if (list[i].name.toLowerCase().includes(letter.toLowerCase())) {
        founded.push(list[i]);
      }
    } else if (searchWay === "searchcat") {
      if (list[i].category.toLowerCase().includes(letter.toLowerCase())) {
        founded.push(list[i]);
      }
    }
  }
  displayProduct(founded);
}

//update products

function updateProducts(index) {
  productName.value = list[index].name;
  productPrice.value = list[index].price;
  productTaxes.value = list[index].tax;
  productAds.value = list[index].ads;
  productDiscount.value = list[index].disc;
  productCount.value = list[index].count;
  productCategory.value = list[index].category;
  productTotal.innerHTML = list[index].all;
  productTotal.classList.replace("bg-danger", "bg-success");
  document.getElementById("update").classList.replace("d-none", "d-block");
  document.getElementById("create").classList.replace("d-block", "d-none");

  temp = index;
}

function Update() {
  var now = [];
  now.push(list[temp]);
  now[0].name = productName.value;
  now[0].price = productPrice.value;
  now[0].tax = productTaxes.value;
  now[0].ads = productAds.value;
  now[0].disc = productDiscount.value;
  now[0].count = productCount.value;
  now[0].category = productCategory.value;
  productTotal.innerHTML = "";

  list.splice(temp, 1, now[0]);

  localStorage.setItem("proList", JSON.stringify(list));

  displayProduct(list);

  document.getElementById("create").classList.replace("d-none", "d-block");

  document.getElementById("update").classList.replace("d-block", "d-none");

  clear();
}


//validation

function validation(val) {
    var regex = /^[A-Z]([A-Z]|[a-z]){2,7}$/ ;
    return (regex.test(val.value));
}