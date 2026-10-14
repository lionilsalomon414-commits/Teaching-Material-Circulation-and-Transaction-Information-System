/* SITTA - script utama (semua halaman). Halaman dikenali lewat <body data-page="..."> */
const $ = (s) => document.querySelector(s);
const page = document.body.dataset.page;
const BATAS_TIPIS = 200; // stok di bawah angka ini ditandai menipis

/* ---------- Modal ---------- */
const openModal = (id) => $("#" + id).classList.add("show");
const closeModal = (el) => el.classList.remove("show");

function showInfo(judul, pesan) {
  let m = $("#modal-info");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-info"; m.className = "modal";
    m.innerHTML = '<div class="modal-content"><button class="close" data-close>&times;</button><h2></h2><p></p></div>';
    document.body.appendChild(m);
  }
  m.querySelector("h2").textContent = judul;
  m.querySelector("p").textContent = pesan;
  m.classList.add("show");
}

document.addEventListener("click", (e) => {
  const buka = e.target.closest("[data-open]");
  if (buka) openModal(buka.dataset.open);
  if (e.target.closest("[data-close]") || e.target.classList.contains("modal"))
    closeModal(e.target.closest(".modal"));
});

/* ---------- Sesi & Navbar ---------- */
const getUsers = () => dataPengguna.concat(JSON.parse(localStorage.getItem("sittaUsers") || "[]"));
const getSesi = () => JSON.parse(sessionStorage.getItem("sittaUser") || "null");

function renderNavbar() {
  $("#navbar").innerHTML = `
    <a href="dashboard.html">Dashboard</a>
    <a href="stok.html">Informasi Bahan Ajar</a>
    <a href="tracking.html">Tracking Pengiriman</a>
    <div class="dd">
      <button type="button" aria-haspopup="true">Laporan &#9662;</button>
      <div class="dd-menu">
        <a href="#" data-info="Monitoring Progress DO Bahan Ajar">Monitoring Progress DO Bahan Ajar</a>
        <a href="#" data-info="Rekap Bahan Ajar">Rekap Bahan Ajar</a>
      </div>
    </div>
    <a href="#" data-info="Histori Transaksi Bahan Ajar">Histori Transaksi Bahan Ajar</a>
    <span class="spacer"></span>
    <a href="#" id="logout">Keluar (${getSesi().nama})</a>`;
  $("#navbar .dd > button").addEventListener("click", (e) => e.target.parentElement.classList.toggle("open"));
  $("#navbar").addEventListener("click", (e) => {
    const info = e.target.closest("[data-info]");
    if (info) { e.preventDefault(); showInfo(info.dataset.info, "Halaman ini belum tersedia pada Tugas Praktik 1."); }
  });
  $("#logout").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Yakin ingin keluar?")) { sessionStorage.removeItem("sittaUser"); location.href = "index.html"; }
  });
}

/* ---------- Halaman Login ---------- */
function initLogin() {
  $("#form-login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#email").value.trim(), pass = $("#password").value;
    $("#login-error").textContent = "";
    if (!email || !pass) { $("#login-error").textContent = "Email dan password wajib diisi."; return; }
    const user = getUsers().find((u) => u.email === email && u.password === pass);
    if (!user) { alert("Email/password yang anda masukkan salah"); return; }
    sessionStorage.setItem("sittaUser", JSON.stringify({ nama: user.nama, email: user.email, role: user.role, lokasi: user.lokasi }));
    location.href = "dashboard.html";
  });

  $("#btn-lupa").addEventListener("click", () => {
    const email = $("#lupa-email").value.trim();
    const err = $("#lupa-error");
    if (!/^\S+@\S+\.\S+$/.test(email)) { err.textContent = "Format email tidak valid."; return; }
    if (!getUsers().some((u) => u.email === email)) { err.textContent = "Email belum terdaftar."; return; }
    err.textContent = "";
    closeModal($("#modal-lupa"));
    alert("Tautan reset password telah dikirim ke " + email);
  });

  $("#btn-daftar").addEventListener("click", () => {
    const nama = $("#daftar-nama").value.trim(), email = $("#daftar-email").value.trim(), pass = $("#daftar-pass").value;
    const err = $("#daftar-error");
    if (!nama || !email || !pass) { err.textContent = "Semua kolom wajib diisi."; return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { err.textContent = "Format email tidak valid."; return; }
    if (pass.length < 6) { err.textContent = "Password minimal 6 karakter."; return; }
    if (getUsers().some((u) => u.email === email)) { err.textContent = "Email sudah terdaftar."; return; }
    const extra = JSON.parse(localStorage.getItem("sittaUsers") || "[]");
    extra.push({ nama, email, password: pass });
    localStorage.setItem("sittaUsers", JSON.stringify(extra));
    err.textContent = "";
    closeModal($("#modal-daftar"));
    alert("Pendaftaran berhasil! Silakan login.");
  });
}

/* ---------- Dashboard ---------- */
function initDashboard() {
  const sapa = () => {
    const d = new Date(), j = d.getHours();
    const waktu = j < 11 ? "pagi" : j < 15 ? "siang" : j < 18 ? "sore" : "malam";
    $("#greeting").textContent = `Selamat ${waktu}, ${getSesi().nama}!`;
    $("#clock").textContent = `${getSesi().role} · ${getSesi().lokasi} — ` + d.toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" });
  };
  sapa(); setInterval(sapa, 1000);
  $("#sum-judul").textContent = dataBahanAjar.length;
  $("#sum-stok").textContent = dataBahanAjar.reduce((t, b) => t + b.stok, 0).toLocaleString("id-ID");
  $("#sum-tipis").textContent = dataBahanAjar.filter((b) => b.stok < BATAS_TIPIS).length;
}

/* ---------- Tracking ---------- */
const TAHAP = ["Diproses", "Dikirim", "Dalam Perjalanan", "Diterima"];
const idxStatus = (st) => Math.max(0, TAHAP.findIndex((t) => t.toLowerCase() === String(st).toLowerCase()));

function initTracking() {
  $("#form-track").addEventListener("submit", (e) => {
    e.preventDefault();
    const no = $("#no-do").value.trim(), err = $("#track-error"), hasil = $("#hasil");
    err.textContent = ""; hasil.hidden = true;
    if (!no) { err.textContent = "Nomor Delivery Order wajib diisi."; return; }
    const d = dataTracking[no];
    if (!d) { err.textContent = `Nomor DO "${no}" tidak ditemukan. Coba 2023001234 atau 2023005678.`; alert("Data pengiriman tidak ditemukan"); return; }
    $("#t-nama").textContent = d.nama;
    $("#t-do").textContent = "No. DO: " + no;
    const idx = idxStatus(d.status);
    $("#t-status").textContent = d.status;
    $("#t-bar").style.width = ((idx + 1) / TAHAP.length) * 100 + "%";
    $("#t-steps").innerHTML = TAHAP.map((t, i) => `<li class="${i <= idx ? "on" : ""}">${t}</li>`).join("");
    $("#t-ekspedisi").textContent = d.ekspedisi;
    $("#t-tanggal").textContent = new Date(d.tanggalKirim).toLocaleDateString("id-ID", { dateStyle: "long" });
    $("#t-paket").textContent = d.paket;
    $("#t-total").textContent = d.total;
    const tl = $("#t-timeline"); tl.innerHTML = "";
    d.perjalanan.slice().sort((a, b) => b.waktu.localeCompare(a.waktu)).forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p.keterangan;
      const s = document.createElement("small"); s.textContent = p.waktu;
      li.appendChild(s); tl.appendChild(li);
    });
    hasil.hidden = false;
  });
}

/* ---------- Stok ---------- */
function initStok() {
  const grid = $("#grid-stok");
  const data = [...dataBahanAjar];

  function buatCard(b) {
    const card = document.createElement("article");
    card.className = "book";
    const cov = document.createElement("div");
    cov.className = "cover";
    const tampilkanPlaceholder = () => { cov.textContent = b.namaBarang; cov.classList.add("noimg"); };
    if (b.cover) {
      const im = document.createElement("img");
      im.src = b.cover; im.alt = "Sampul " + b.namaBarang; im.loading = "lazy";
      im.onerror = () => { im.remove(); tampilkanPlaceholder(); };
      cov.appendChild(im);
    } else tampilkanPlaceholder();
    card.appendChild(cov);

    const dl = document.createElement("dl");
    [["Kode Lokasi", b.kodeLokasi], ["Kode Barang", b.kodeBarang], ["Nama Barang", b.namaBarang],
     ["Jenis Barang", b.jenisBarang], ["Edisi", b.edisi], ["Stok", b.stok]].forEach(([k, v]) => {
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      if (k === "Stok" && b.stok < BATAS_TIPIS) { dd.className = "low"; dd.textContent += " (menipis)"; }
      dl.append(dt, dd);
    });
    card.appendChild(dl);
    return card;
  }

  function render() {
    const q = $("#cari-stok").value.trim().toLowerCase();
    const tampil = data.filter((b) => (b.namaBarang + " " + b.kodeBarang).toLowerCase().includes(q));
    grid.innerHTML = "";
    tampil.forEach((b) => grid.appendChild(buatCard(b)));
    $("#jumlah-stok").textContent = `Menampilkan ${tampil.length} dari ${data.length} bahan ajar`;
  }
  render();
  $("#cari-stok").addEventListener("input", render);

  $("#form-stok").addEventListener("submit", (e) => {
    e.preventDefault();
    const file = $("#f-cover").files[0];
    const baru = {
      kodeLokasi: $("#f-lokasi").value.trim().toUpperCase(),
      kodeBarang: $("#f-kode").value.trim().toUpperCase(),
      namaBarang: $("#f-nama").value.trim(),
      jenisBarang: $("#f-jenis").value,
      edisi: $("#f-edisi").value.trim(),
      stok: parseInt($("#f-stok").value),
      cover: file ? URL.createObjectURL(file) : ""
    };
    const err = $("#stok-error");
    if (!baru.kodeLokasi || !baru.kodeBarang || !baru.namaBarang || !baru.jenisBarang) { err.textContent = "Semua kolom wajib diisi (cover boleh dikosongkan)."; return; }
    if (!(parseInt(baru.edisi) >= 1)) { err.textContent = "Edisi harus angka minimal 1."; return; }
    if (isNaN(baru.stok) || baru.stok < 0) { err.textContent = "Stok harus angka 0 atau lebih."; return; }
    if (data.some((b) => b.kodeBarang === baru.kodeBarang)) { err.textContent = "Kode barang sudah ada."; return; }
    err.textContent = "";
    data.push(baru); render();
    e.target.reset();
    alert("Stok baru berhasil ditambahkan.");
  });
}

/* ---------- Router sederhana ---------- */
if (page === "login") {
  if (getSesi()) location.href = "dashboard.html"; else initLogin();
} else if (!getSesi()) {
  location.href = "index.html"; // halaman terproteksi
} else {
  renderNavbar();
  ({ dashboard: initDashboard, tracking: initTracking, stok: initStok })[page]();
}
