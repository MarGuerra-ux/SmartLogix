/*
=========================================================

 SMARTLOGIX

 Products Catalog

=========================================================
*/

const products = [

{
id:1,
sku:"NB-1001",
barcode:"780100000001",
name:"Notebook Lenovo ThinkPad E14",
category:"Computación",
brand:"Lenovo",
price:849990,
cost:640000,
discount:0,
tax:19,
stock:18,
weight:1.7,
width:32,
height:2,
length:22,
warehouse:"Bodega Central",
image:"/products/notebook-lenovo.png"
},

{
id:2,
sku:"NB-1002",
barcode:"780100000002",
name:"Notebook HP ProBook 450",
category:"Computación",
brand:"HP",
price:769990,
cost:590000,
discount:5,
tax:19,
stock:12,
weight:1.9,
width:35,
height:2,
length:24,
warehouse:"Bodega Central",
image:"/products/notebook-hp.png"
},

{
id:3,
sku:"MS-2001",
barcode:"780100000003",
name:"Mouse Logitech G203",
category:"Periféricos",
brand:"Logitech",
price:24990,
cost:14000,
discount:0,
tax:19,
stock:145,
weight:0.12,
width:8,
height:5,
length:13,
warehouse:"Bodega Norte",
image:"/products/mouse-g203.png"
},

{
id:4,
sku:"KB-3001",
barcode:"780100000004",
name:"Teclado Mecánico Redragon K552",
category:"Periféricos",
brand:"Redragon",
price:55990,
cost:36000,
discount:10,
tax:19,
stock:60,
weight:0.95,
width:45,
height:5,
length:15,
warehouse:"Bodega Norte",
image:"/products/redragon-k552.png"
},

{
id:5,
sku:"HD-4001",
barcode:"780100000005",
name:"Disco SSD Kingston 1TB",
category:"Almacenamiento",
brand:"Kingston",
price:92990,
cost:69000,
discount:5,
tax:19,
stock:85,
weight:0.08,
width:10,
height:1,
length:7,
warehouse:"Bodega Central",
image:"/products/ssd-kingston.png"
},

{
id:6,
sku:"HD-4002",
barcode:"780100000006",
name:"Disco Externo WD 2TB",
category:"Almacenamiento",
brand:"Western Digital",
price:104990,
cost:76000,
discount:0,
tax:19,
stock:35,
weight:0.25,
width:11,
height:2,
length:8,
warehouse:"Bodega Central",
image:"/products/wd-2tb.png"
},

{
id:7,
sku:"MN-5001",
barcode:"780100000007",
name:"Monitor Samsung 24'' IPS",
category:"Monitores",
brand:"Samsung",
price:169990,
cost:128000,
discount:0,
tax:19,
stock:26,
weight:3.4,
width:55,
height:12,
length:38,
warehouse:"Bodega Sur",
image:"/products/monitor-samsung.png"
},

{
id:8,
sku:"MN-5002",
barcode:"780100000008",
name:"Monitor LG UltraWide 29''",
category:"Monitores",
brand:"LG",
price:249990,
cost:191000,
discount:8,
tax:19,
stock:15,
weight:5.2,
width:70,
height:15,
length:42,
warehouse:"Bodega Sur",
image:"/products/lg-ultrawide.png"
},

{
id:9,
sku:"PH-6001",
barcode:"780100000009",
name:"iPhone 16 Pro 256GB",
category:"Smartphones",
brand:"Apple",
price:1399990,
cost:1170000,
discount:0,
tax:19,
stock:9,
weight:0.19,
width:8,
height:2,
length:16,
warehouse:"Bodega Premium",
image:"/products/iphone16pro.png"
},

{
id:10,
sku:"PH-6002",
barcode:"780100000010",
name:"Samsung Galaxy S26",
category:"Smartphones",
brand:"Samsung",
price:1189990,
cost:960000,
discount:5,
tax:19,
stock:14,
weight:0.21,
width:8,
height:2,
length:16,
warehouse:"Bodega Premium",
image:"/products/galaxy-s26.png"
},

{
id:11,
sku:"TB-7001",
barcode:"780100000011",
name:"Tablet Xiaomi Pad 7",
category:"Tablets",
brand:"Xiaomi",
price:389990,
cost:295000,
discount:7,
tax:19,
stock:28,
weight:0.6,
width:18,
height:1,
length:26,
warehouse:"Bodega Central",
image:"/products/xiaomi-pad.png"
},

{
id:12,
sku:"AU-8001",
barcode:"780100000012",
name:"Audífonos Sony WH1000XM6",
category:"Audio",
brand:"Sony",
price:359990,
cost:280000,
discount:5,
tax:19,
stock:33,
weight:0.45,
width:18,
height:10,
length:20,
warehouse:"Bodega Norte",
image:"/products/sony-wh.png"
}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getProducts(){

return products;

}

export function getProduct(id){

return products.find(

product=>product.id===id

);

}

export function getProductBySku(sku){

return products.find(

product=>product.sku===sku

);

}

export function getRandomProduct(){

return products[

Math.floor(

Math.random()*products.length

)

];

}

export default products;