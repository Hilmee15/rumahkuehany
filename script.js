const fmt = n => 'Rp ' + n.toLocaleString('id-ID');
const WA = '6285379444875';
const CAKE_IMG = {
    "Bolu Gulung Coklat": "images/cakes/bolu-gulung-coklat.jpeg",
    "Bolu Gulung Original": "images/cakes/bolu-gulung-original.jpeg",
    "Bolu Gulung Pandan": "images/cakes/bolu-gulung-pandan.jpeg",
    "Bolu Kojo": "images/cakes/bolu-kojo.jpeg",
    "Brownies Kukus": "images/cakes/brownies.jpeg",
    "Cake Keju": "images/cakes/cake-keju.jpeg",
    "Cup Cake Coklat": "images/cakes/cupcake-coklat.jpeg",
    "Cup Cake Keju": "images/cakes/cupcake-keju.jpeg",
    "Dadar Gulung": "images/cakes/dadar-gulung.jpeg",
    "Klepon": "images/cakes/klepon.jpeg",
    "Lapis Beras": "images/cakes/lapis-beras.jpeg",
    "Lemper": "images/cakes/lemper.jpeg",
    "Lumpur": "images/cakes/lumpur.jpeg",
    "Martabak Jagung": "images/cakes/martabak-jagung.jpeg",
    "Martabak Kentang": "images/cakes/martabak-kentang.jpeg",
    "Martabak Sayur": "images/cakes/martabak-sayur.jpeg",
    "Onde Onde": "images/cakes/onde-onde.jpeg",
    "Pie Brownies": "images/cakes/pie-brownies.jpeg",
    "Pie Buah": "images/cakes/pie-buah.jpeg",
    "Pie Susu": "images/cakes/pie-susu.jpeg",
    "Risoles": "images/cakes/risoles.jpeg",
    "Samosa": "images/cakes/samosa.jpeg",
    "Semar Mendem": "images/cakes/semar-mendem.jpeg",
    "Sosis Solo": "images/cakes/sosis-solo.jpeg",
    "Srikaya": "images/cakes/srikaya.jpeg",
    "Sus": "images/cakes/sus.jpeg",
    "Sus Rogut": "images/cakes/sus-rogut.jpeg",
    "Tahu Fantasi": "images/cakes/tahu-fantasi.jpeg"
};

const BASE_CAKE = 3000;
const ASIN = new Set(['Lemper', 'Semar Mendem', 'Risoles', 'Martabak Sayur', 'Martabak Jagung', 'Tahu Fantasi', 'Samosa', 'Sosis Solo', 'Sus Rogut', 'Martabak Kentang']);
const cakeList = [
    ['Sus', 3000], ['Sus Pisang', 3500], ['Brownies Kukus', 3000], ['Bolu Gulung Original', 3000], ['Bolu Gulung Pandan', 3000], ['Bolu Gulung Coklat', 3000],
    ['Pie Buah', 3000], ['Pie Brownies', 3000], ['Pie Susu', 3500], ['Cup Cake Coklat', 3000], ['Cup Cake Keju', 3000], ['Cake Keju', 3000],
    ['Lapis Beras', 3000], ['Klepon', 3000], ['Dadar Gulung', 3000], ['Onde Onde', 3000], ['Srikaya', 3000], ['Lumpur', 3000],
    ['Bolu Kojo', 3000], ['Blackforest', 2750], ['Pancake', 2750], ['Lemper', 3500], ['Semar Mendem', 3500], ['Risoles', 3000],
    ['Martabak Sayur', 3500], ['Martabak Jagung', 3000], ['Tahu Fantasi', 3500], ['Samosa', 3500], ['Sosis Solo', 3500], ['Sus Rogut', 3500], ['Martabak Kentang', 3500]
].map(([n, p]) => ({ n, p, cat: ASIN.has(n) ? 'asin' : 'manis', img: CAKE_IMG[n] || '' }));
const extraOf = p => Math.max(0, p - BASE_CAKE);

const tampah = [
    { id: 't1', n: 'Kue Tampah Kecil', p: 180000, d: 'Isi sekitar 55–65 kue.' },
    { id: 't2', n: 'Kue Tampah Sedang', p: 270000, d: 'Isi sekitar 85–100 kue.' },
    { id: 't3', n: 'Kue Tampah Besar', p: 350000, d: 'Isi sekitar 120–140 kue.' },
];
const snack = [
    { id: 's2', n: 'Snackbox Isi 2', p: 7500, slots: 2, d: '2 kue pilihan Anda.' },
    { id: 's3', n: 'Snackbox Isi 3', p: 11000, slots: 3, d: '3 kue pilihan Anda.' },
    { id: 's4', n: 'Snackbox Isi 4', p: 14500, slots: 4, d: '4 kue pilihan Anda.' },
];
const cups = [
    { k: 'none', label: 'Tanpa air mineral', x: 0, note: '' },
    { k: 'daira', label: 'Air Mineral Cup Daira', x: 0, note: 'Gratis' },
    { k: 'aqua', label: 'Air Mineral Cup Aqua', x: 500, note: '+Rp 500' },
];
let cart = [], qty = 1, cur = null;

/* menu rows */
const rows = document.getElementById('rows');
function renderCat(cat) {
    const list = cat === 'tampah' ? tampah : snack;
    rows.innerHTML = list.map((p, i) => `
    <div class="row" onclick="openItem('${cat}','${p.id}')">
      <div class="n">0${i + 1}</div>
      <img class="thumb" src="images/cakes/martabak-jagung.jpeg" alt="${p.n}" style="width:72px;height:72px;border-radius:14px;object-fit:cover;">
      <div><h3>${p.n}</h3><div class="d">${p.d}${cat === 'tampah' ? '<span class="wa-note">Pilihan kue ditentukan lewat WhatsApp.</span>' : ''}</div></div>
      <div class="price">${fmt(p.p)}</div>
      <div class="go"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
    </div>`).join('');
}
document.getElementById('tabs').addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active'); renderCat(b.dataset.cat);
});
renderCat('tampah');

const cakeCard = c => `<div class="cake"><div class="cimg ${c.img ? '' : 'ph-img'}">${c.img ? `<img src="${c.img}" alt="${c.n}" loading="lazy">` : 'foto belum tersedia'}</div><div class="cn">${c.n}</div></div>`;
document.getElementById('cakeGrid').innerHTML = [['Kue Manis', 'manis'], ['Kue Asin', 'asin']].map(([t, k]) =>
    `<div class="cat-title">${t}</div><div class="cake-grid">${cakeList.filter(c => c.cat === k).map(cakeCard).join('')}</div>`
).join('');

const itemOverlay = document.getElementById('itemOverlay'), itemSheet = document.getElementById('itemSheet');
function readQty() { const v = parseInt(document.getElementById('qv').value, 10); return Number.isFinite(v) && v > 0 ? v : 1; }
function snackExtra() {
    let x = 0;
    for (let i = 0; i < cur.pkg.slots; i++) { const v = document.getElementById('sl-' + i).value; if (v !== '') x += extraOf(cakeList[+v].p); }
    const cup = cups.find(c => c.k === document.querySelector('input[name=cup]:checked').value);
    return x + (cup ? cup.x : 0);
}
function updTotal() {
    const unit = cur.pkg.p + (cur.cat === 'snack' ? snackExtra() : 0);
    document.getElementById('addBtn').textContent = `${cur.editKey ? 'Simpan perubahan' : 'Tambah ke keranjang'} — ${fmt(unit * readQty())}`;
}
function updSlot(i) { document.getElementById('err').textContent = ''; updTotal(); }
function openItem(cat, id, editKey) {
    qty = 1;
    const pkg = (cat === 'tampah' ? tampah : snack).find(x => x.id === id);
    const ed = editKey ? cart.find(i => String(i.key) === String(editKey)) : null;
    cur = { cat, pkg, editKey: ed ? ed.key : null };
    let opts = '', noteHtml = '';
    if (cat === 'tampah') {
        const wl = `https://wa.me/${WA}?text=${encodeURIComponent('Halo Rumah Kue Hany, saya ingin memilih kue untuk ' + pkg.n)}`;
        noteHtml = `<div class="wa-box">Pilihan kue untuk tampah ini ditentukan lewat WhatsApp. Silakan <a href="${wl}" target="_blank" rel="noopener">hubungi kami via WhatsApp</a> untuk memilih kue yang Anda inginkan.</div>`;
    }
    if (cat === 'snack') {
        const order = cakeList.map((c, i) => i).sort((a, b) => (extraOf(cakeList[a].p) > 0) - (extraOf(cakeList[b].p) > 0));
        const cakeOpts = '<option value="">Pilih kue…</option>' + order.map(i => { const c = cakeList[i], e = extraOf(c.p); return `<option value="${i}">${c.n} — ${e ? '+' + fmt(e) : 'Gratis'}</option>`; }).join('');
        let slots = '';
        for (let i = 0; i < pkg.slots; i++) {
            slots += `<div class="opt-row slot"><div class="slot-main"><label for="sl-${i}">Kue ${i + 1}</label><select id="sl-${i}" onchange="updSlot(${i})">${cakeOpts}</select></div></div>`;
        }
        opts = `<div class="opt-group"><div class="label">Pilih kue</div>${slots}</div>
    <div class="opt-group"><div class="label">Air Mineral Cup (opsional)</div>${cups.map((c, i) => `<div class="opt-row"><label for="cup-${c.k}">${c.label}</label><span class="cnote">${c.note}</span><input type="radio" name="cup" id="cup-${c.k}" value="${c.k}" ${i === 0 ? 'checked' : ''} onchange="updTotal()"></div>`).join('')}</div>`;
    }
    itemSheet.innerHTML = `
    <div class="sheet-head"><div>${ed ? '<div class="edit-tag">Ubah pesanan di keranjang</div>' : ''}<h3>${pkg.n}</h3><div class="price">${fmt(pkg.p)}</div></div><button class="sheet-close" onclick="closeItem()">✕</button></div>
    <p style="font-size:14px;color:var(--muted);margin:0;">${pkg.d}</p>${noteHtml}${opts}
    <div class="qty-row"><span style="font-weight:600;">Jumlah</span><div class="qty-ctrl"><button onclick="stepQty(-1)">−</button><input id="qv" type="number" min="1" value="1" inputmode="numeric" aria-label="Jumlah" oninput="updTotal()"><button onclick="stepQty(1)">+</button></div></div>
    <div class="err" id="err"></div>
    <button class="big-btn" id="addBtn" onclick="addToCart()"></button>`;
    if (ed) {
        document.getElementById('qv').value = ed.qty;
        if (cat === 'snack') {
            ed.sel.forEach((v, i) => { document.getElementById('sl-' + i).value = v; });
            document.getElementById('cup-' + ed.cup).checked = true;
        }
    }
    updTotal();
    itemOverlay.classList.add('show');
}
function stepQty(d) { document.getElementById('qv').value = Math.max(1, readQty() + d); updTotal(); }
function closeOv(id) { document.getElementById(id).classList.remove('show'); }
function closeItem() { const was = cur && cur.editKey; if (was) cur.editKey = null; closeOv('itemOverlay'); if (was) openCart(); }
function addToCart() {
    const { cat, pkg } = cur; let unit = pkg.p, parts = [], msgParts = [], sel = [], cupK = 'none';
    if (cat === 'snack') {
        for (let i = 0; i < pkg.slots; i++) {
            const v = document.getElementById('sl-' + i).value;
            if (v === '') { document.getElementById('err').textContent = `Pilih Kue ${i + 1} dulu ya.`; document.getElementById('sl-' + i).focus(); return; }
            const c = cakeList[+v], e = extraOf(c.p); unit += e;
            parts.push(`Kue ${i + 1}: ${c.n}${e ? ' (+' + fmt(e) + ')' : ''}`);
            msgParts.push(`Kue ${i + 1}: ${c.n}`);
            sel.push(v);
        }
        const cup = cups.find(c => c.k === document.querySelector('input[name=cup]:checked').value);
        unit += cup.x; cupK = cup.k; if (cup.k !== 'none') { parts.push(cup.label + (cup.x ? ' (+' + fmt(cup.x) + ')' : '')); msgParts.push(cup.label); }
    }
    qty = readQty();
    const item = { key: cur.editKey || Date.now() + Math.random(), name: pkg.n, cat, id: pkg.id, sel, cup: cupK, qty, unit, detail: parts.join(' | '), msgDetail: msgParts.join(' | ') };
    const wasEdit = !!cur.editKey;
    if (wasEdit) { cart[cart.findIndex(i => String(i.key) === String(cur.editKey))] = item; cur.editKey = null; } else cart.push(item);
    closeOv('itemOverlay'); renderBar();
    if (wasEdit) openCart();
}

const cartbar = document.getElementById('cartbar'), badge = document.getElementById('cartBadge');
const total = () => cart.reduce((s, i) => s + i.unit * i.qty, 0), count = () => cart.reduce((s, i) => s + i.qty, 0);
function renderBar() {
    const c = count();
    if (!c) { cartbar.classList.remove('show'); badge.style.display = 'none'; return; }
    document.getElementById('cartbarInner').textContent = `🛒 ${c} item · ${fmt(total())} — Lihat keranjang`;
    cartbar.classList.add('show'); badge.style.display = 'flex'; badge.textContent = c;
}
let ord = { name: '', date: '', time: '', type: 'pickup', addr: '' };
const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clrErr = id => { const e = document.getElementById(id); if (e) e.textContent = ''; };
function setType(t) { ord.type = t; document.getElementById('addrField').hidden = t !== 'delivery'; clrErr('aerr'); }
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const fmtDate = v => { const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); };
function openCart() {
    const s = document.getElementById('cartSheet');
    s.innerHTML = `<div class="sheet-head"><h3>Keranjang</h3><button class="sheet-close" onclick="closeOv('cartOverlay')">✕</button></div>
    <div id="ci"></div><div class="cart-total"><span>Total</span><span>${fmt(total())}</span></div>
    <div class="field"><label for="oName">Nama pemesan</label>
      <input type="text" id="oName" placeholder="Nama Anda" autocomplete="name" value="${esc(ord.name)}" oninput="ord.name=this.value;clrErr('nerr')">
      <div class="err" id="nerr"></div></div>
    <div class="field-row">
      <div class="field"><label for="orderDate">Tanggal dibutuhkan</label>
        <input type="date" id="orderDate" min="${todayStr()}" value="${ord.date}" onchange="ord.date=this.value;clrErr('derr')">
        <div class="err" id="derr"></div></div>
      <div class="field"><label for="oTime">Jam dibutuhkan</label>
        <input type="time" id="oTime" value="${ord.time}" onchange="ord.time=this.value;clrErr('terr')">
        <div class="err" id="terr"></div></div>
    </div>
    <div class="fhint">Tanggal dan jam Anda membutuhkan pesanan, bukan saat memesan.</div>
    <div class="field"><label>Tipe pesanan</label>
      <div class="seg">
        <label><input type="radio" name="otype" value="pickup" ${ord.type === 'pickup' ? 'checked' : ''} onchange="setType('pickup')"><span>Ambil sendiri</span></label>
        <label><input type="radio" name="otype" value="delivery" ${ord.type === 'delivery' ? 'checked' : ''} onchange="setType('delivery')"><span>Diantar</span></label>
      </div></div>
    <div class="field" id="addrField" ${ord.type === 'delivery' ? '' : 'hidden'}><label for="oAddr">Alamat pengantaran</label>
      <textarea id="oAddr" placeholder="Alamat lengkap pengantaran" oninput="ord.addr=this.value;clrErr('aerr')">${esc(ord.addr)}</textarea>
      <div class="err" id="aerr"></div></div>
    <button class="big-btn" onclick="checkout()">Checkout via WhatsApp</button>`;
    const box = document.getElementById('ci');
    if (!cart.length) box.innerHTML = '<p style="color:var(--muted);font-size:14px;">Keranjang masih kosong.</p>';
    cart.forEach(it => {
        const r = document.createElement('div'); r.className = 'cart-item';
        r.innerHTML = `<div><div class="n">${it.qty}x ${it.name}</div>${it.detail ? `<div class="d">${it.detail}</div>` : ''}<div class="d">${fmt(it.unit)} / item</div></div><div class="cart-actions"><button class="edit" onclick="editCartItem('${it.key}')">Ubah</button><button class="rm" onclick="rmItem('${it.key}')">Hapus</button></div>`;
        box.appendChild(r);
    });
    document.getElementById('cartOverlay').classList.add('show');
}
function editCartItem(k) { const it = cart.find(i => String(i.key) === String(k)); if (!it) return; closeOv('cartOverlay'); openItem(it.cat, it.id, k); }
function rmItem(k) { cart = cart.filter(i => String(i.key) !== String(k)); renderBar(); openCart(); }
function checkout() {
    if (!cart.length) return;
    const bad = (errId, inputId, msg) => { document.getElementById(errId).textContent = msg; document.getElementById(inputId).focus(); };
    if (!ord.name.trim()) return bad('nerr', 'oName', 'Isi nama pemesan dulu ya.');
    if (!ord.date) return bad('derr', 'orderDate', 'Pilih tanggal dibutuhkan.');
    if (ord.date < todayStr()) return bad('derr', 'orderDate', 'Tanggal tidak boleh sebelum hari ini.');
    if (!ord.time) return bad('terr', 'oTime', 'Pilih jam dibutuhkan.');
    if (ord.type === 'delivery' && !ord.addr.trim()) return bad('aerr', 'oAddr', 'Isi alamat pengantaran dulu ya.');
    const lines = cart.map((it, i) => `${i + 1}. ${it.qty}x ${it.name}${it.msgDetail ? ' (' + it.msgDetail + ')' : ''}.`);
    const info = [
        `Nama: ${ord.name.trim()}`,
        `Tanggal dibutuhkan: ${fmtDate(ord.date)}`,
        `Jam dibutuhkan: ${ord.time} WIB`,
        `Tipe pesanan: ${ord.type === 'delivery' ? 'Diantar' : 'Ambil sendiri'}`
    ];
    if (ord.type === 'delivery') info.push(`Alamat pengantaran: ${ord.addr.trim()}`);
    const msg = `Halo Rumah Kue Hany, saya ingin memesan:\n${lines.join('\n')}\n\n${info.join('\n')}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}
document.getElementById('cartOverlay').addEventListener('click', e => { if (e.target.id === 'cartOverlay') closeOv('cartOverlay'); });
document.getElementById('itemOverlay').addEventListener('click', e => { if (e.target.id === 'itemOverlay') closeItem(); });
function copyNumber() {
    const b = document.getElementById('copyBtn');
    const done = () => { b.textContent = 'Tersalin ✓'; setTimeout(() => b.textContent = 'Salin nomor', 1800); };
    try { navigator.clipboard.writeText('0853-7944-4875').then(done, done); } catch (e) { done(); }
}

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));