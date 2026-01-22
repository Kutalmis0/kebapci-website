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

let cart = [];

// SAYFA GÖSTERİMİ
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    window.scrollTo(0, 0);
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

// SİPARİŞ GÖNDER
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

    const order = {
        name,
        phone,
        address,
        product: product || 'Sepettten seçili',
        qty: product ? qty : orderCart.length,
        notes,
        cart: orderCart,
        date: new Date().toLocaleString('tr-TR')
    };

    // Sipariş kaydı (console'a yazdır)
    console.log('Yeni Sipariş:', order);

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
