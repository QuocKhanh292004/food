window.FM_DATA = (function(){
  const img = {
    burger: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg',
    pizza: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg',
    salad: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    pho: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Ph%E1%BB%9F_H%C3%A0_N%E1%BB%99i.jpg',
    cola: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Coca_Cola_can.png',
    bread: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Bread_%28Baguette%29.jpg'
  };

  const recentOrders = [
    { id:'#DH001', customer:'Nguyễn Văn A', items:'2x Phở bò, 1x Trà sữa', time:'11:20', total:130000, status:'prep' },
    { id:'#DH002', customer:'Trần Thị Mai', items:'1x Cơm tấm, 1x Nước cam', time:'11:02', total:95000, status:'ship' },
    { id:'#DH003', customer:'Lê Minh Tuấn', items:'3x Pizza, 2x Coca', time:'10:40', total:450000, status:'done' },
  ];

  const topProducts = [
    {rank:1, name:'Phở bò tái nạm', sold:675, price:55000, img: img.pho, percent:82},
    {rank:2, name:'Pizza hải sản', sold:528, price:89000, img: img.pizza, percent:66},
    {rank:3, name:'Cơm tấm sườn nướng', sold:421, price:59000, img:'https://upload.wikimedia.org/wikipedia/commons/9/9b/C%C6%A1m_t%E1%BA%A5m.jpg', percent:43},
    {rank:4, name:'Bánh mì thịt nướng', sold:352, price:30000, img: img.bread, percent:35},
  ];

  const kitchen = [
    {code:'#HD001', name:'Phở bò tái nạm', eta:'5 phút', progress:70, color:'blue'},
    {code:'#HD004', name:'Pizza hải sản', eta:'12 phút', progress:40, color:'green'},
    {code:'#HD005', name:'Cơm tấm sườn nướng', eta:'Chờ xử lý', progress:15, color:'orange'},
  ];

  const stockAlerts = [
    {name:'Thịt bò', left:'Còn 2kg', level:'critical'},
    {name:'Bánh mì', left:'Còn 15 ổ', level:'low'},
    {name:'Nước ngọt', left:'Còn 8 lon', level:'critical'},
  ];

  const menu = [
    {name:'Burger bò phô mai', price:65000, left:42, img: img.burger, cat:'Combo'},
    {name:'Gà rán giòn cay', price:49000, left:120, img:'https://upload.wikimedia.org/wikipedia/commons/4/47/Fried_chicken_-_KFC.jpg', cat:'Đồ chiên'},
    {name:'Salad cá hồi', price:72000, left:18, img: img.salad, cat:'Healthy'},
    {name:'Pizza Margherita', price:89000, left:25, img: img.pizza, cat:'Pizza'},
    {name:'Phở bò tái', price:55000, left:0, img: img.pho, cat:'Món chính'},
    {name:'Nước cola', price:15000, left:320, img: img.cola, cat:'Đồ uống'},
  ];

  const categories = [
    {name:'Combo', desc:'Combo món ăn với giá ưu đãi', count:45, status:'show', icon:'🍔'},
    {name:'Đồ chiên', desc:'Các món chiên giòn, thơm ngon', count:32, status:'show', icon:'🍗'},
    {name:'Healthy', desc:'Món ăn tốt cho sức khỏe', count:18, status:'show', icon:'🥗'},
    {name:'Đồ uống', desc:'Nước uống, sinh tố, trà sữa', count:28, status:'show', icon:'🥤'},
    {name:'Pizza', desc:'Pizza nhiều loại', count:15, status:'show', icon:'🍕'},
    {name:'Món chính', desc:'Phở, bún, cơm, mì', count:18, status:'hide', icon:'🍜'},
  ];

  const inventory = [
    {name:'Thịt bò', qty:2, min:10, status:'critical'},
    {name:'Bánh mì', qty:15, min:20, status:'low'},
    {name:'Rau xà lách', qty:18, min:20, status:'low'},
    {name:'Cola lon', qty:320, min:40, status:'ok'},
  ];

  const customers = [
    {name:'Nguyễn Văn A', phone:'0901xxx123', email:'a@example.com', orders:18, total:9420000, tier:'VIP'},
    {name:'Trần Thị B', phone:'0902xxx456', email:'b@example.com', orders:9, total:3150000, tier:'Thường'},
    {name:'Lê Minh C', phone:'0903xxx789', email:'c@example.com', orders:25, total:12800000, tier:'VIP'},
  ];

  const reviews = [
    {user:'Khách HOÀNG', text:'Đồ ăn nóng, giao nhanh!', stars:5},
    {user:'Khách MINH', text:'Salad tươi, sẽ ủng hộ!', stars:5},
  ];

  const promotions = [
    {title:'Combo trưa -20%', desc:'11:00–14:00 mỗi ngày', icon:'🔥'},
    {title:'Mua 2 tặng 1', desc:'Thứ 6 hàng tuần', icon:'🎉'},
  ];

  const staff = [
    {name:'Ngô Văn Rider', role:'Shipper', shift:'Sáng', status:'Rảnh'},
    {name:'Trần Rider', role:'Shipper', shift:'Chiều', status:'Đang giao'},
  ];

  const roles = [
    {role:'Admin', desc:'Toàn quyền', perms:'users, roles, orders, products'},
    {role:'Manager', desc:'Quản lý vận hành', perms:'orders, products, promos'},
    {role:'Staff', desc:'Nhân viên', perms:'orders'},
  ];

  return { recentOrders, topProducts, kitchen, stockAlerts, menu, categories, inventory, customers, reviews, promotions, staff, roles };
})();

