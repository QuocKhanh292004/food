(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  // Sidebar navigation
  $$('.nav a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const page = a.getAttribute('data-route');
      // active link
      $$('.nav a').forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      // show page
      $$('.route').forEach(s=>s.classList.remove('active'));
      $(`.route[data-page="${page}"]`).classList.add('active');
      // title
      $('#routeTitle').textContent = a.textContent.trim();
      // close mobile sidebar
      $('#sidebar').classList.remove('open');
      $('#sidebarOverlay').style.pointerEvents='none';
    })
  });

  // Mobile toggle with enhanced UX
  const mobileBtn = $('#mobileMenuBtn');
  const sidebar = $('#sidebar');
  const overlay = $('#sidebarOverlay');
  
  mobileBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    sidebar.classList.toggle('open');
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  });
  
  overlay.addEventListener('click', ()=>{
    sidebar.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  // Close sidebar on escape key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && sidebar.classList.contains('open')){
      sidebar.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  
  // Touch swipe to close sidebar (basic implementation)
  let startX = 0;
  let startY = 0;
  
  sidebar.addEventListener('touchstart', (e)=>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  sidebar.addEventListener('touchmove', (e)=>{
    if(!sidebar.classList.contains('open')) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = Math.abs(startY - currentY);
    
    // Swipe left to close (and it's more horizontal than vertical)
    if(diffX > 50 && diffY < 100) {
      sidebar.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Render dashboard data
  const D = window.FM_DATA;

  function formatCurrency(n){
    return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(n).replace(' ',' ');
  }

  // Recent orders
  const tbody = $('#recentOrders');
  D.recentOrders.forEach(o=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.items}</td>
      <td>${o.time}</td>
      <td>${formatCurrency(o.total)}</td>
      <td>${o.status==='prep'?'<span class="status st-prep">Đang chuẩn bị</span>':o.status==='ship'?'<span class="status st-ship">Đang giao</span>':'<span class="status st-done">Hoàn thành</span>'}</td>`;
    tbody.appendChild(tr);
  });

  // Top products
  const listTop = $('#topProducts');
  D.topProducts.forEach(p=>{
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <div class="rank">${p.rank}</div>
      <div class="meta">
        <div><strong>${p.name}</strong> <span class="muted">• ${p.sold} phần</span></div>
        <div class="bar"><span style="width:${p.percent}%"></span></div>
      </div>
      <div class="thumb"><img src="${p.img}" alt="${p.name}" /></div>`;
    listTop.appendChild(row);
  });

  // Kitchen status
  const listK = $('#kitchenStatus');
  D.kitchen.forEach(k=>{
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <div class="muted">${k.code}</div>
      <div class="meta">
        <div>${k.name} <span class="muted">• ${k.eta}</span></div>
        <div class="bar"><span style="width:${k.progress}%"></span></div>
      </div>
      <span class="kitchen-chip"><i class='bx bx-time'></i> ${k.eta}</span>`;
    listK.appendChild(row);
  });

  // Stock alerts
  const listS = $('#stockAlerts');
  D.stockAlerts.forEach(s=>{
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <div class="thumb"><i class='bx bx-package'></i></div>
      <div class="meta"><div>${s.name}</div><div class="muted">${s.left}</div></div>
      <span class="alert-tag ${s.level==='low'?'low':''}">${s.level==='critical'?'Cực thấp':'Thấp'}</span>`;
    listS.appendChild(row);
  });

  // Orders page
  const ordersBody = $('#ordersTable');
  D.recentOrders.concat(D.recentOrders).forEach((o,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${o.id.replace('DH','A-1023')}${i}</strong></td>
      <td>${o.customer}</td>
      <td>${(i%3)+1} món</td>
      <td>${o.time} - 15/01</td>
      <td><strong>${formatCurrency(o.total)}</strong></td>
      <td>${o.status==='prep'?'<span class="status st-prep">Đang chuẩn bị</span>':o.status==='ship'?'<span class="status st-ship">Đang giao</span>':'<span class="status st-done">Hoàn thành</span>'}</td>`;
    ordersBody.appendChild(tr);
  });

  // Kitchen page queue
  const kq = $('#kitchenQueue');
  D.kitchen.forEach(k=>{
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<div class="thumb">🍳</div><div class="meta"><div><strong>${k.name}</strong></div><div class="bar"><span style="width:${k.progress}%"></span></div></div><span class="muted">${k.eta}</span>`;
    kq.appendChild(row);
  });

  // Shipping
  const ship = $('#shippingList');
  [{area:'Khu vực A', fee:'₫15k', sla:"30–40'", icon:'🛵'},{area:'Khu vực B', fee:'₫20k', sla:"40–55'", icon:'🚚'}].forEach(z=>{
    const row = document.createElement('div');
    row.className='row';
    row.innerHTML = `<div class="thumb">${z.icon}</div><div class="meta"><div>${z.area}</div><div class="muted">Phí: ${z.fee} • SLA: ${z.sla}</div></div><button class="btn">Sửa</button>`;
    ship.appendChild(row);
  });

  // Menu grid
  const gridMenu = $('#menuGrid');
  D.menu.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="row">
        <div class="thumb" style="width:56px;height:56px"><img src="${m.img}" alt="${m.name}"></div>
        <div class="meta"><div><strong>${m.name}</strong></div><div class="muted">Giá: ${formatCurrency(m.price)} • Còn: ${m.left}</div><div class="muted">Danh mục: ${m.cat}</div></div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn" style="flex:1"><i class='bx bx-edit'></i> Sửa</button>
        <button class="btn" style="flex:1"><i class='bx bx-hide'></i> Ẩn</button>
        <button class="btn" style="flex:1;background:var(--danger);color:#fff;border-color:transparent"><i class='bx bx-trash'></i> Xóa</button>
      </div>`;
    gridMenu.appendChild(card);
  });

  // Categories table
  const catBody = $('#catTable');
  D.categories.forEach((c,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:8px;display:grid;place-items:center;background:var(--primary-3)">${c.icon}</div><strong>${c.name}</strong></div></td><td>${c.desc}</td><td><strong>${c.count}</strong></td><td>${c.status==='show'?'<span class="status st-done">Hiển thị</span>':'<span class="status st-prep">Ẩn</span>'}</td>`;
    catBody.appendChild(tr);
  });

  // Inventory
  const invBody = $('#invTable');
  D.inventory.forEach(i=>{
    const tr = document.createElement('tr');
    const tag = i.status==='ok'?'': i.status==='low'?'<span class="badge warn">Thấp</span>':'<span class="badge danger">Cực thấp</span>';
    tr.innerHTML = `<td>${i.name}</td><td>${i.qty}</td><td>${i.min}</td><td>${tag}</td>`;
    invBody.appendChild(tr);
  });

  // Customers
  const custBody = $('#customersTable');
  D.customers.forEach(c=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:32px;height:32px;font-size:.8rem">${c.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()}</div><div><strong>${c.name}</strong><div class="muted">ID: #KH${Math.floor(Math.random()*900+100)}</div></div></div></td><td><div>${c.phone}</div><div class="muted">${c.email}</div></td><td><strong>${c.orders} đơn</strong></td><td><strong>${formatCurrency(c.total)}</strong></td><td>${c.tier==='VIP'?'<span class="status st-done">VIP</span>':'<span class="status st-ship">Thường</span>'}</td>`;
    custBody.appendChild(tr);
  });

  // Reviews
  const rv = $('#reviewsList');
  D.reviews.forEach(r=>{
    const row = document.createElement('div');
    row.className='row';
    row.innerHTML = `<div class="thumb">⭐</div><div class="meta"><div><strong>${r.user}</strong></div><div class="muted">“${r.text}”</div></div><span class="muted">${r.stars}⭐</span>`;
    rv.appendChild(row);
  });

  // Promotions
  const pr = $('#promoList');
  D.promotions.forEach(p=>{
    const row = document.createElement('div');
    row.className='row';
    row.innerHTML = `<div class="thumb">${p.icon}</div><div class="meta"><div>${p.title}</div><div class="muted">${p.desc}</div></div><button class="btn">Chỉnh</button>`;
    pr.appendChild(row);
  });

  // Staff
  const st = $('#staffTable');
  D.staff.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.name}</td><td>${s.role}</td><td>${s.shift}</td><td>${s.status==='Rảnh'?'<span class="status st-done">Rảnh</span>':'<span class="status st-ship">Đang giao</span>'}</td>`;
    st.appendChild(tr);
  });

  // Roles
  const rl = $('#rolesTable');
  D.roles.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.role}</td><td>${r.desc}</td><td class="muted">${r.perms}</td>`;
    rl.appendChild(tr);
  });

  // Charts
  FMCharts.revenue($('#revenueChart'));
  FMCharts.hours($('#hourChart'));

  // Dark/Light Theme Toggle
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = themeBtn.querySelector('i');
  const body = document.body;
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  if(savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'bx bx-sun';
    themeBtn.setAttribute('title', 'Chuyển sang giao diện sáng');
  } else {
    themeIcon.className = 'bx bx-moon';
    themeBtn.setAttribute('title', 'Chuyển sang giao diện tối');
  }
  
  // Theme toggle click handler
  themeBtn.addEventListener('click', ()=>{
    const currentTheme = body.getAttribute('data-theme');
    
    if(currentTheme === 'dark') {
      // Switch to light
      body.removeAttribute('data-theme');
      themeIcon.className = 'bx bx-moon';
      themeBtn.setAttribute('title', 'Chuyển sang giao diện tối');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark
      body.setAttribute('data-theme', 'dark');
      themeIcon.className = 'bx bx-sun';
      themeBtn.setAttribute('title', 'Chuyển sang giao diện sáng');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Auto theme based on system preference (optional)
  if(!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(prefersDark) {
      body.setAttribute('data-theme', 'dark');
      themeIcon.className = 'bx bx-sun';
      localStorage.setItem('theme', 'dark');
    }
  }

  // Logout button (demo behavior)
  const lb = document.getElementById('logoutBtn');
  if(lb){ lb.addEventListener('click', ()=>{ alert('Đăng xuất thành công (demo)'); }); }

  // Optional extra charts in Analytics page
  const ar = $('#analyticsRevenue');
  const ao = $('#analyticsOrders');
  if(ar && ao){
    FMCharts.revenue(ar);
    FMCharts.hours(ao);
  }
})();

