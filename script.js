// ÜRÜN VERİLERİ
const products = [
    { id: 1, name: "Döner Kebap", price: 290, cat: "kebap" },
    { id: 2, name: "Şiş Kebap", price: 390, cat: "kebap" },
    { id: 3, name: "Adana Kebap", price: 330, cat: "kebap" },
    { id: 4, name: "Urfa Kebap", price: 350, cat: "kebap" },
    { id: 5, name: "Demiryolu Kebap", price: 370, cat: "kebap" },
    { id: 6, name: "Beyti Kebap", price: 310, cat: "kebap" },
    { id: 7, name: "Çoban Salatası", price: 150, cat: "side" },
    { id: 8, name: "Soğan & Sumak", price: 70, cat: "side" },
    { id: 9, name: "Bulgur Pilavı", price: 120, cat: "side" },
    { id: 10, name: "Mercimek Çorbası", price: 110, cat: "soup" },
    { id: 11, name: "İşkembe Çorbası", price: 120, cat: "soup" },
    { id: 12, name: "Taze Ayran", price: 50, cat: "drink" }
];

// TAKIM VERİLERİ
const team = [
    { name: "Mehmet Arslan", role: "Kurucı & Baş Şef", desc: "35 yıl deneyimle geleneksel kebap ustası" },
    { name: "Ahmet Kara", role: "Döner Kebap Ustası", desc: "25 yıldır döner dönerme sanatında uzman" },
    { name: "İbrahim Yılmaz", role: "Şiş Kebap Ustası", desc: "Mangal ustası, 20 yıllık deneyim" },
    { name: "Fatih Demir", role: "Adana Kebap Ustası", desc: "Baharatlı kebapların ustası" },
    { name: "Selma Şahin", role: "Mutfak Müdürü", desc: "Hijyen ve kalite kontrolden sorumlu" },
    { name: "Murat Güneş", role: "Servis Müdürü", desc: "15 yılı aşkın hizmet tecrübesi" }
];

// ÜRÜN RESİMLERİ
const images = {
    1: "images/artikelheader_1356x420_doener_kebap.193b7c6b.jpg",
    2: "images/ev-usulu-urfa-kebabi-yemekcom.jpg",
    3: "images/Adana_kebab.jpg",
    4: "images/urfa-kebabi-7601a44a-1909-4eb5-85b5-a12b51bb6eb8.jpg",
    5: "images/adana-ya-gitmek-icin.jpg",
    6: "images/hq720.jpg",
    7: "images/avokadolu_coban_salata1-600x450.jpg",
    8: "images/sumakli-sogan-salata-1.jpg",
    9: "images/bulgur.jpg",
    10: "images/mercimek.jpg",
    11: "images/iskembe.jpg",
    12: "images/ayran.jpg"
};

// CRUD - SİPARİŞ VERİLERİ
let orders = [];
let cart = [];

// SAYFA GÖSTERİMİ
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    window.scrollTo(0, 0);
    
    // Sipariş sayfasına gittiğinde siparişleri göster
    if (pageId === 'order') {
        displayOrders();
    }
}

// MENÜ YÜKLEME
function loadMenu() {
    const grid = document.getElementById('menuGrid');
    const select = document.getElementById('product');
    
    grid.innerHTML = '';
    select.innerHTML = '<option value="">Seçiniz...</option>';

    products.forEach(p => {
        // Menü kartı oluştur
        const card = document.createElement('div');
        card.className = 'menu-card';
        
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${images[p.id]}'); background-size: cover; background-position: center;"></div>
            <div class="card-body">
                <h3>${p.name}</h3>
                <p>Lezzetli ve taze ${p.cat === 'kebap' ? 'kebap' : p.cat}</p>
                <div class="price">₺${p.price}</div>
                <button class="btn add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" style="width: 100%;">Ekle</button>
            </div>
        `;
        grid.appendChild(card);

        // Select'e seçenek ekle
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} - ₺${p.price}`;
        select.appendChild(opt);
    });
}

// TAKIMI YÜKLEME
function loadTeam() {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    team.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        card.innerHTML = `
            <div class="team-avatar"><i class="fas fa-user"></i></div>
            <h4>${member.name}</h4>
            <p class="role">${member.role}</p>
            <p>${member.desc}</p>
        `;
        grid.appendChild(card);
    });
}

// SEPETE ÜRÜN EKLE
function addCart(id, name, price) {
    cart.push({ id, name, price });
    updateCart();
}

// SEPET GÜNCELLE
function updateCart() {
    const cartDiv = document.getElementById('cartItems');
    const total = document.getElementById('total');
    const menuCartDiv = document.getElementById('menuCartItems');
    const menuTotal = document.getElementById('menuTotal');
    const menuOrderBtn = document.getElementById('menuOrderBtn');
    
    let sum = 0;
    let html = '';

    cart.forEach((item, i) => {
        html += `
            <div class="summary-item">
                <span>${item.name}</span> 
                <span>₺${item.price} 
                    <button class="remove-cart" data-index="${i}" style="background: #D4001C; color: white; border: none; padding: 2px 8px; cursor: pointer; border-radius: 3px; margin-left: 5px;">Sil</button>
                </span>
            </div>
        `;
        sum += item.price;
    });

    cartDiv.innerHTML = html || '<p style="color: #999;">Ürün seçin...</p>';
    total.textContent = '₺' + sum;
    
    // Menü sayfasındaki sepeti de güncelle
    menuCartDiv.innerHTML = html || '<p style="color: #999;">Ürün seçin...</p>';
    menuTotal.textContent = '₺' + sum;
    
    // Sipariş ver butonunu göster/gizle
    if (cart.length > 0) {
        menuOrderBtn.style.display = 'block';
    } else {
        menuOrderBtn.style.display = 'none';
    }
}

// SEPETTEN ÜRÜN ÇIKAR
function removeCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// FORM DOĞRULAMA
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value);

    let isValid = true;

    // Hataları gizle
    document.querySelectorAll('.error').forEach(e => e.classList.remove('show'));

    // Ad kontrol
    if (!name || name.length < 3) {
        document.getElementById('nameError').classList.add('show');
        isValid = false;
    }

    // Telefon kontrol
    if (!phone || !phone.match(/^05\d{9}$/)) {
        document.getElementById('phoneError').classList.add('show');
        isValid = false;
    }

    // Adres kontrol
    if (!address || address.length < 10) {
        document.getElementById('addressError').classList.add('show');
        isValid = false;
    }

    // Ürün seçimi kontrol - sepette ürün varsa form select'ten seçim zorunlu değil
    if (!product && cart.length === 0) {
        document.getElementById('productError').classList.add('show');
        isValid = false;
    }

    // Miktar kontrol - sadece form select'ten seçim yapıldıysa kontrol et
    if (product && (qty < 1 || qty > 20)) {
        document.getElementById('quantityError').classList.add('show');
        isValid = false;
    }

    return isValid;
}

// CREATE - SİPARİŞ OLUŞTUR
function submitOrder(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const notes = document.getElementById('notes').value.trim();

    // Eğer sepette ürün varsa sepeti kullan, yoksa form select'ten seçilen ürünü kullan
    let orderCart = cart.length > 0 ? cart : [];
    
    if (product && cart.length === 0) {
        const selectedProduct = products.find(p => p.id === parseInt(product));
        for (let i = 0; i < qty; i++) {
            orderCart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price
            });
        }
    }

    const newOrder = {
        id: Date.now(),
        name,
        phone,
        address,
        notes,
        items: orderCart,
        total: orderCart.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString('tr-TR'),
        status: 'Hazırlanıyor'
    };

    orders.push(newOrder);
    console.log('Yeni Sipariş Oluşturuldu:', newOrder);

    // Başarı mesajı göster
    document.getElementById('successMsg').style.display = 'block';
    document.getElementById('orderForm').reset();
    cart = [];
    updateCart();

    // Mesajı 3 saniye sonra gizle
    setTimeout(() => {
        document.getElementById('successMsg').style.display = 'none';
    }, 3000);
}

// READ - SİPARİŞLERİ GÖRÜNTÜLEMEz (SIPARIŞ SAYFASININ ALTINDA GÖSTER)
function displayOrders() {
    let orderSection = document.getElementById('ordersList');
    
    // Eğer section yoksa oluştur
    if (!orderSection) {
        const container = document.querySelector('#order .container');
        orderSection = document.createElement('div');
        orderSection.id = 'ordersList';
        orderSection.className = 'container';
        orderSection.style.marginTop = '3rem';
        orderSection.style.borderTop = '2px solid #8B0000';
        orderSection.style.paddingTop = '2rem';
        container.appendChild(orderSection);
    }

    if (orders.length === 0) {
        orderSection.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem; font-size: 1.1rem;">Henüz sipariş yok</p>';
        return;
    }

    let html = '<h2 style="color: #8B0000; text-align: center; margin-bottom: 2rem;">Siparişlerim</h2>';
    html += '<div style="display: grid; gap: 1.5rem;">';
    
    orders.forEach(order => {
        const itemsHtml = order.items.map(item => 
            `<div style="margin: 0.3rem 0 0 1rem; color: #666; font-size: 0.9rem;">- ${item.name} = Lira ${item.price}</div>`
        ).join('');

        html += `
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #8B0000;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h3 style="color: #8B0000; margin: 0 0 0.5rem 0;">${order.name}</h3>
                        <p style="color: #666; margin: 0.3rem 0; font-size: 0.9rem;">Telefon: ${order.phone}</p>
                        <p style="color: #666; margin: 0.3rem 0; font-size: 0.9rem;">Adres: ${order.address}</p>
                        <p style="color: #999; margin: 0.3rem 0; font-size: 0.85rem;">Tarih: ${order.date}</p>
                        <p style="color: #FFD700; margin: 0.5rem 0 0 0; font-size: 0.9rem; font-weight: bold;">Status: ${order.status}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end;">
                        <button onclick="editOrder(${order.id})" style="padding: 8px 15px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Düzenle</button>
                        <button onclick="deleteOrder(${order.id})" style="padding: 8px 15px; background: #D4001C; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Sil</button>
                    </div>
                </div>
                
                <div style="background: #f9f9f9; padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #333;">Siparişler:</p>
                    ${itemsHtml}
                </div>
                
                ${order.notes ? `<p style="color: #666; font-size: 0.9rem; font-style: italic; margin: 0.5rem 0; padding: 0.5rem; background: #fff3cd; border-radius: 3px;"><strong>Not:</strong> ${order.notes}</p>` : ''}
                
                <div style="text-align: right; font-size: 1.2rem; font-weight: bold; color: #8B0000; margin-top: 1rem; border-top: 1px solid #ddd; padding-top: 1rem;">
                    Toplam: Lira ${order.total}
                </div>
            </div>
        `;
    });

    html += '</div>';
    orderSection.innerHTML = html;
}

// UPDATE - SİPARİŞİ DÜZENLE
function editOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        alert('Sipariş bulunamadı!');
        return;
    }

    const newName = prompt('Yeni ad:', order.name);
    if (newName === null || newName.trim() === '') return;

    const newPhone = prompt('Yeni telefon:', order.phone);
    if (newPhone === null || newPhone.trim() === '') return;

    const newAddress = prompt('Yeni adres:', order.address);
    if (newAddress === null || newAddress.trim() === '') return;

    const newNotes = prompt('Yeni notlar:', order.notes);
    if (newNotes === null) return;

    const newStatus = prompt('Yeni status (Hazırlanıyor/Hazır/Teslim Edildi):', order.status);
    if (newStatus === null || newStatus.trim() === '') return;

    order.name = newName;
    order.phone = newPhone;
    order.address = newAddress;
    order.notes = newNotes;
    order.status = newStatus;

    console.log('Sipariş Güncellendi:', order);
    displayOrders();
    alert('Sipariş başarıyla güncellendi!');
}

// DELETE - SİPARİŞİ SİL
function deleteOrder(orderId) {
    if (!confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
        return;
    }

    const index = orders.findIndex(o => o.id === orderId);
    if (index > -1) {
        const deletedOrder = orders[index];
        orders.splice(index, 1);
        console.log('Sipariş Silindi:', deletedOrder);
        displayOrders();
        alert('Sipariş başarıyla silindi!');
    }
}

// EVENT LİSTENERLARI AYARLA
function initializeEventListeners() {
    // Sayfa navigasyonu
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Sepete ürün ekle
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const id = parseInt(e.target.dataset.id);
            const name = e.target.dataset.name;
            const price = parseInt(e.target.dataset.price);
            addCart(id, name, price);
        }
    });

    // Sepetten çıkar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-cart')) {
            const index = parseInt(e.target.dataset.index);
            removeCart(index);
        }
    });

    // Menü sayfasındaki Sipariş Ver butonuna tıkla
    document.getElementById('menuOrderBtn').addEventListener('click', () => {
        showPage('order');
    });

    // Form gönder
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
}

// BAŞLANGIÇ
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    loadTeam();
    initializeEventListeners();
});
