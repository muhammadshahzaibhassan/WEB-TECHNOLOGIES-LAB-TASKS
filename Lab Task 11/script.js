let products = [];
let currentProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || false;
let username = localStorage.getItem("username") || "";
let itemsPerPage = 12;
let visible = itemsPerPage;

// Dark Mode
function toggleDarkMode() { document.body.classList.toggle("dark"); }

// Placeholder Image
function genImg(name) { return `https://ui-avatars.com/api/?name=${name}&background=random&size=200`; }

// Fetch Products
fetch("products.json").then(r=>r.json()).then(data=>{
  products = data.products.map(p=>({...p,image:p.image||genImg(p.name),discount:Math.floor(Math.random()*50)+10,rating:(Math.random()*5).toFixed(1)}));
  currentProducts = [...products];
  displayCategories();
  displayProducts();
  updateCartUI();
});

// CATEGORY + DISPLAY
function displayCategories() {
  const menu = document.getElementById("categoryMenu");
  const cats = [...new Set(products.map(p=>p.category))];
  menu.innerHTML=`<button onclick="showAll()">All</button>`;
  cats.forEach(c=>menu.innerHTML+=`<button onclick="filter('${c}')">${c}</button>`);
}

function displayProducts() {
  const c = document.getElementById("productContainer");
  c.innerHTML="";
  currentProducts.slice(0, visible).forEach(p=>{
    c.innerHTML+=`
    <div class="product-card">
      <div class="discount-badge">${p.discount}% OFF</div>
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`;
  });
}

function loadMore(){visible+=itemsPerPage;displayProducts();}
function showAll(){currentProducts=[...products];visible=itemsPerPage;displayProducts();}
function filter(cat){currentProducts=products.filter(p=>p.category===cat);visible=itemsPerPage;displayProducts();}

// SEARCH + SORT
function searchProducts(){const v=searchInput.value.toLowerCase();currentProducts=products.filter(p=>p.name.toLowerCase().includes(v));displayProducts();}
function sortProducts(){const v=sortSelect.value;if(v==="low-high")currentProducts.sort((a,b)=>a.price-b.price);if(v==="high-low")currentProducts.sort((a,b)=>b.price-a.price);if(v==="a-z")currentProducts.sort((a,b)=>a.name.localeCompare(b.name));if(v==="z-a")currentProducts.sort((a,b)=>b.name.localeCompare(a.name));displayProducts();}

// CART WITH LOGIN RESTRICTION
function addToCart(id){
  if(!loggedIn){openAuth();return;}
  const item=cart.find(p=>p.id===id);
  if(item)item.qty++;
  else cart.push({...products.find(p=>p.id===id),qty:1});
  saveCart();
}

function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));updateCartUI();}
function updateCartUI(){cartCount.innerText=cart.reduce((s,i)=>s+i.qty,0);}

function openCart(){
  if(!loggedIn){openAuth();return;}
  cartModal.style.display="flex";
  const items=document.getElementById("cartItems");items.innerHTML="";let sum=0;
  cart.forEach(p=>{sum+=p.price*p.qty;items.innerHTML+=`<p>${p.name} x${p.qty} - $${p.price*p.qty}<button onclick="removeItem(${p.id})">❌</button></p>`;});
  cartTotal.innerText=sum;
}
function closeCart(){cartModal.style.display="none";}
function removeItem(id){cart=cart.filter(p=>p.id!==id);saveCart();openCart();}

// CHECKOUT
function openCheckout(){closeCart();checkoutPage.style.display="flex";checkoutTotal.innerText=cart.reduce((s,i)=>s+i.price*i.qty,0);}
function placeOrder(){alert("✅ Payment Successful!");cart=[];saveCart();checkoutPage.style.display="none";}

// ADMIN ADD
function addAdminProduct(){const n=adminName.value,p=+adminPrice.value,c=adminCategory.value;products.push({id:Date.now(),name:n,price:p,category:c,image:genImg(n)});showAll();alert("✅ Product Added");}

// AUTH MODAL
function openAuth(){authModal.style.display="flex";}
function closeAuth(){authModal.style.display="none";}

function login(){username=document.getElementById("username").value;loggedIn=true;localStorage.setItem("loggedIn",true);localStorage.setItem("username",username);authStatus.innerText=`✅ Logged in as ${username}`;closeAuth();}
function signup(){username=document.getElementById("username").value;loggedIn=true;localStorage.setItem("loggedIn",true);localStorage.setItem("username",username);authStatus.innerText=`✅ Account created for ${username}`;closeAuth();}
