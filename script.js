document.addEventListener("DOMContentLoaded", () => {
  // DATA PAKET WISATA JELAJAH NUSA
  const tourPackages = [
    {
      id: "bali-escape",
      name: "Bali Escape",
      destination: "Bali",
      duration: "3 Hari 2 Malam",
      price: 2450000,
      priceFormatted: "Rp2.450.000",
      highlight: "Pantai, budaya, dan sunset",
      image: "aset/Bali.jpg",
      description:
        "Nikmati liburan tropis terbaik di Pulau Dewata dengan kunjungan ke Pura Ulun Danu Beratan, terasering hijau Ubud, pantai pasir putih Nusa Dua, serta makan malam romantis saat matahari terbenam di Jimbaran.",
      facilities: [
        "Transportasi AC Pariwisata selama tour",
        "Penginapan Hotel Bintang 4 (2 Malam)",
        "Tiket masuk seluruh objek wisata",
        "Pemandu wisata lokal bersertifikat",
        "Sarapan hotel & 2x makan siang khas Bali",
        "Dokumentasi foto perjalanan",
      ],
    },
    {
      id: "bromo-sunrise",
      name: "Bromo Sunrise Trip",
      destination: "Bromo, Jawa Timur",
      duration: "2 Hari 1 Malam",
      price: 1350000,
      priceFormatted: "Rp1.350.000",
      highlight: "Sunrise dan lautan pasir",
      image: "aset/Bromo.avif",
      description:
        "Petualangan seru mengejar matahari terbit keemasan di Puncak Penanjakan, menjelajahi lautan pasir berbisik menggunakan Jeep 4WD, mendaki Kawah Bromo, hingga berswafoto di Bukit Teletubbies.",
      facilities: [
        "Transportasi antar-jemput Malang/Surabaya",
        "Sewa Jeep Hardtop 4WD resmi Bromo",
        "Penginapan Homestay/Hotel hangat (1 Malam)",
        "Tiket masuk Taman Nasional Bromo Tengger Semeru",
        "Pemandu lokal & driver berpengalaman",
        "Air mineral & snack hangat pagi hari",
      ],
    },
    {
      id: "raja-ampat-discovery",
      name: "Raja Ampat Discovery",
      destination: "Raja Ampat, Papua Barat Daya",
      duration: "4 Hari 3 Malam",
      price: 5750000,
      priceFormatted: "Rp5.750.000",
      highlight: "Island hopping dan snorkeling",
      image: "aset/Raja ampat.avif",
      description:
        "Jelajahi surga bahari timur Indonesia dari puncak bukit karst Piaynemo, Telaga Bintang, Pasir Timbul Mansuar, hingga snorkeling di taman laut berkelas dunia dengan ratusan spesies terumbu karang.",
      facilities: [
        "Speedboat eksplorasi pulau (Island Hopping)",
        "Penginapan Resort tepi pantai (3 Malam)",
        "Tiket masuk & PIN konservasi Raja Ampat",
        "Peralatan snorkeling lengkap & pelampung",
        "Pemandu selam/snorkeling & tour leader",
        "Makan lengkap 3x sehari selama tur",
      ],
    },
    {
      id: "labuan-bajo-explorer",
      name: "Labuan Bajo Explorer",
      destination: "Labuan Bajo, Nusa Tenggara Timur",
      duration: "3 Hari 2 Malam",
      price: 3950000,
      priceFormatted: "Rp3.950.000",
      highlight: "Pulau Komodo dan sailing",
      image: "aset/Labuan bajo.jpg",
      description:
        "Rasakan sensasi berlayar menyusuri perairan Flores menuju Pulau Padar, bertemu langsung satwa purba Komodo di habitat aslinya, bersantai di Pink Beach, dan berenang bersama pari manta di Manta Point.",
      facilities: [
        "Sailing Trip kapal wisata kabin AC",
        "Akomodasi penginapan/kabin (2 Malam)",
        "Tiket masuk Taman Nasional Komodo & Ranger",
        "Alat snorkeling & dokumentasi underwater",
        "Pemandu wisata profesional",
        "Antar-jemput Bandara Komodo & konsumsi",
      ],
    },
  ];

  // RENDER KARTU PAKET WISATA
  const packagesContainer = document.getElementById("packagesContainer");
  let selectedPackageForModal = null;

  function renderPackages() {
    packagesContainer.innerHTML = "";

    tourPackages.forEach((pkg) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3";

      col.innerHTML = `
        <article class="package-card">
          <div class="card-img-wrapper">
            <button
              type="button"
              class="package-image-button"
              aria-label="Buka foto ${pkg.name}"
              data-title="${pkg.name}"
              data-desc="${pkg.destination} — ${pkg.highlight}"
              data-img="${pkg.image}"
            >
              <img
                src="${pkg.image}"
                alt="${pkg.name}"
              >
            </button>
            <span class="duration-badge">
              <i class="bi bi-clock me-1"></i>${pkg.duration}
            </span>
            <span class="location-pill">
              <i class="bi bi-geo-alt-fill text-warning"></i>${pkg.destination}
            </span>
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <h3 class="h4 fw-bold mb-1">${pkg.name}</h3>
            <p class="small text-muted mb-3">
              <i class="bi bi-stars text-warning me-1"></i>Highlight: ${pkg.highlight}
            </p>
            <div class="mt-auto pt-3 border-top">
              <div class="small text-muted">Mulai dari</div>
              <div class="package-price mb-3">${pkg.priceFormatted}<span class="fs-6 fw-normal text-muted">/orang</span></div>
              <button 
                type="button" 
                class="btn btn-teal w-100 d-flex align-items-center justify-content-center gap-2 btn-detail-paket" 
                data-package-id="${pkg.id}"
              >
                <i class="bi bi-eye"></i>
                <span>Detail Paket</span>
              </button>
            </div>
          </div>
        </article>
      `;

      packagesContainer.appendChild(col);
    });

    // Tambahkan event listener klik pada setiap tombol "Detail Paket"
    document.querySelectorAll(".btn-detail-paket").forEach((btn) => {
      btn.addEventListener("click", function () {
        const pkgId = this.getAttribute("data-package-id");
        openPackageDetailModal(pkgId);
      });
    });
  }

  // 3. MODAL DETAIL PAKET WISATA (DOM MANIPULATION)
  const packageModalEl = document.getElementById("packageDetailModal");
  const packageModalInstance = new bootstrap.Modal(packageModalEl);

  function openPackageDetailModal(packageId) {
    const pkg = tourPackages.find((item) => item.id === packageId);
    if (!pkg) return;

    selectedPackageForModal = pkg;

    // Mengisi elemen modal secara dinamis melalui DOM
    document.getElementById("modalPackageDuration").textContent = pkg.duration;
    document.getElementById("modalPackageTitle").textContent = pkg.name;
    document.getElementById("modalPackageImage").src = pkg.image;
    document.getElementById("modalPackageImage").alt = pkg.name;
    document.getElementById("modalPackageDestination").textContent =
      pkg.destination;
    document.getElementById("modalPackageHighlight").textContent =
      `Highlight: ${pkg.highlight}`;
    document.getElementById("modalPackagePrice").textContent =
      pkg.priceFormatted;
    document.getElementById("modalPackageDescription").textContent =
      pkg.description;

    // Render daftar fasilitas
    const facilitiesContainer = document.getElementById(
      "modalPackageFacilities",
    );
    facilitiesContainer.innerHTML = "";

    pkg.facilities.forEach((facility) => {
      const itemCol = document.createElement("div");
      itemCol.className = "col-md-6";
      itemCol.innerHTML = `
        <div class="d-flex align-items-start gap-2 p-2 rounded-3 bg-light border">
          <i class="bi bi-check-circle-fill text-success mt-1"></i>
          <span class="small text-dark">${facility}</span>
        </div>
      `;
      facilitiesContainer.appendChild(itemCol);
    });

    packageModalInstance.show();
  }

  // SIMULASI PEMESANAN DARI MODAL ("Pesan Paket")
  const modalBookBtn = document.getElementById("modalBookPackageBtn");
  modalBookBtn.addEventListener("click", () => {
    if (!selectedPackageForModal) return;

    // Tutup modal detail paket
    packageModalInstance.hide();

    // Otomatis isi pilihan paket di Form Booking & Subjek di Form Contact
    const bookingPackageSelect = document.getElementById("bookingPackage");
    if (bookingPackageSelect) {
      bookingPackageSelect.value = selectedPackageForModal.name;
      updateBookingEstimation();
    }

    const contactSubjectInput = document.getElementById("contactSubject");
    const contactMessageInput = document.getElementById("contactMessage");
    const prefillBanner = document.getElementById("packagePrefillBanner");
    const prefillText = document.getElementById("packagePrefillText");

    contactSubjectInput.value = `Pemesanan Paket: ${selectedPackageForModal.name} (${selectedPackageForModal.duration})`;
    contactMessageInput.value = `Halo tim JelajahNusa, saya tertarik untuk memesan paket wisata "${selectedPackageForModal.name}" ke ${selectedPackageForModal.destination} dengan harga ${selectedPackageForModal.priceFormatted}/orang. Mohon informasi ketersediaan jadwal keberangkatan.`;

    // Tampilkan notifikasi banner simulasi pemesanan
    prefillText.innerHTML = `<strong>Simulasi Pemesanan Aktif:</strong> Paket <strong>${selectedPackageForModal.name}</strong> telah otomatis diisikan pada formulir di bawah ini. Silakan lengkapi data diri Anda.`;
    prefillBanner.classList.remove("d-none");
    prefillBanner.classList.add("d-flex");

    // Scroll halus menuju section Kontak
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      contactSection.scrollIntoView({ behavior: "smooth" });
      document.getElementById("contactName").focus();
    }, 320);
  });

  // FORM BOOKING PAKET WISATA & KALKULATOR ESTIMASI BIAYA
  const bookingForm = document.getElementById("bookingForm");
  const bookingPackageEl = document.getElementById("bookingPackage");
  const bookingGuestsEl = document.getElementById("bookingGuests");
  const bookingDateEl = document.getElementById("bookingDate");
  const bookingTotalEl = document.getElementById("bookingEstimatedTotal");
  const bookingNoteEl = document.getElementById("bookingSummaryNote");
  const bookingAlertBox = document.getElementById("bookingAlertBox");

  // Set minimal tanggal keberangkatan hari ini
  const todayISO = new Date().toISOString().split("T")[0];
  bookingDateEl.setAttribute("min", todayISO);
  bookingDateEl.value = todayISO;

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  }

  function updateBookingEstimation() {
    const selectedOption =
      bookingPackageEl.options[bookingPackageEl.selectedIndex];
    const pricePerPerson =
      parseInt(selectedOption.getAttribute("data-price"), 10) || 0;
    const guests = Math.max(1, parseInt(bookingGuestsEl.value, 10) || 1);
    const total = pricePerPerson * guests;

    bookingTotalEl.textContent = formatRupiah(total);
    bookingNoteEl.textContent = `${selectedOption.value} • ${guests} Peserta`;
  }

  bookingPackageEl.addEventListener("change", updateBookingEstimation);
  bookingGuestsEl.addEventListener("input", updateBookingEstimation);

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById("bookingName");
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("is-invalid");
      isValid = false;
    } else {
      nameInput.classList.remove("is-invalid");
    }

    if (!bookingDateEl.value) {
      bookingDateEl.classList.add("is-invalid");
      isValid = false;
    } else {
      bookingDateEl.classList.remove("is-invalid");
    }

    const guestsVal = parseInt(bookingGuestsEl.value, 10);
    if (isNaN(guestsVal) || guestsVal < 1) {
      bookingGuestsEl.classList.add("is-invalid");
      isValid = false;
    } else {
      bookingGuestsEl.classList.remove("is-invalid");
    }

    if (!isValid) {
      bookingAlertBox.className = "alert alert-danger mb-3";
      bookingAlertBox.innerHTML =
        '<i class="bi bi-exclamation-triangle-fill me-1"></i> Mohon lengkapi seluruh data booking paket wisata dengan benar.';
      bookingAlertBox.classList.remove("d-none");
      return;
    }

    // Simulasi booking sukses
    const selectedPkgName = bookingPackageEl.value;
    const totalBiaya = bookingTotalEl.textContent;

    bookingAlertBox.className = "alert alert-success mb-3";
    bookingAlertBox.innerHTML = `
      <div class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Simulasi Pemesanan Paket Berhasil!</div>
      <div class="small mt-1">
        Terima kasih <strong>${escapeHTML(nameInput.value.trim())}</strong>. Permintaan booking paket <strong>${escapeHTML(selectedPkgName)}</strong> untuk <strong>${guestsVal} peserta</strong> pada tanggal <strong>${bookingDateEl.value}</strong> (Estimasi: <strong>${totalBiaya}</strong>) telah dicatat oleh tim reservasi JelajahNusa.
      </div>
    `;
    bookingAlertBox.classList.remove("d-none");
    bookingForm.reset();
    bookingDateEl.value = todayISO;
    bookingGuestsEl.value = 1;
    updateBookingEstimation();
  });

  // VALIDASI FORMULIR KONTAK
  // Ketentuan: Nama, email, subjek, dan pesan tidak boleh kosong;
  // Email harus format valid; tampilkan pesan error/sukses dinamis.
  const contactForm = document.getElementById("contactForm");
  const contactName = document.getElementById("contactName");
  const contactEmail = document.getElementById("contactEmail");
  const contactSubject = document.getElementById("contactSubject");
  const contactMessage = document.getElementById("contactMessage");
  const contactFeedbackAlert = document.getElementById("contactFeedbackAlert");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Hapus status error secara real-time saat pengguna mengetik
  [contactName, contactEmail, contactSubject, contactMessage].forEach(
    (field) => {
      field.addEventListener("input", () => {
        field.classList.remove("is-invalid");
      });
    },
  );

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;
    const nameVal = contactName.value.trim();
    const emailVal = contactEmail.value.trim();
    const subjectVal = contactSubject.value.trim();
    const messageVal = contactMessage.value.trim();

    // Validasi Nama Lengkap
    if (nameVal === "") {
      contactName.classList.add("is-invalid");
      document.getElementById("errorName").textContent =
        "Nama lengkap wajib diisi.";
      isFormValid = false;
    } else {
      contactName.classList.remove("is-invalid");
    }

    // Validasi Email (tidak boleh kosong & format valid)
    if (emailVal === "") {
      contactEmail.classList.add("is-invalid");
      document.getElementById("errorEmail").textContent =
        "Alamat email wajib diisi.";
      isFormValid = false;
    } else if (!isValidEmail(emailVal)) {
      contactEmail.classList.add("is-invalid");
      document.getElementById("errorEmail").textContent =
        "Format email tidak valid (contoh: nama@domain.com).";
      isFormValid = false;
    } else {
      contactEmail.classList.remove("is-invalid");
    }

    // Validasi Subjek
    if (subjectVal === "") {
      contactSubject.classList.add("is-invalid");
      document.getElementById("errorSubject").textContent =
        "Subjek pesan wajib diisi.";
      isFormValid = false;
    } else {
      contactSubject.classList.remove("is-invalid");
    }

    // Validasi Pesan
    if (messageVal === "") {
      contactMessage.classList.add("is-invalid");
      document.getElementById("errorMessage").textContent =
        "Isi pesan tidak boleh kosong.";
      isFormValid = false;
    } else {
      contactMessage.classList.remove("is-invalid");
    }

    // Tampilkan Notifikasi Error atau Sukses
    if (!isFormValid) {
      contactFeedbackAlert.className = "alert alert-danger mb-3";
      contactFeedbackAlert.innerHTML =
        '<i class="bi bi-exclamation-circle-fill me-2"></i><strong>Pengiriman gagal:</strong> Mohon periksa dan lengkapi kolom yang ditandai merah.';
      contactFeedbackAlert.classList.remove("d-none");
      return;
    }

    // Jika seluruh input valid (Simulasi sukses tanpa backend)
    contactFeedbackAlert.className = "alert alert-success mb-3";
    contactFeedbackAlert.innerHTML = `
      <div class="d-flex align-items-start gap-2">
        <i class="bi bi-check-circle-fill fs-5 mt-1"></i>
        <div>
          <strong>Pesan Berhasil Terkirim!</strong>
          <p class="small mb-0 mt-1">
            Terima kasih <strong>${escapeHTML(nameVal)}</strong>, pesan Anda dengan subjek <em>"${escapeHTML(subjectVal)}"</em> telah kami terima. Tim JelajahNusa akan segera menghubungi Anda melalui <strong>${escapeHTML(emailVal)}</strong>.
          </p>
        </div>
      </div>
    `;
    contactFeedbackAlert.classList.remove("d-none");

    // Reset formulir setelah berhasil
    contactForm.reset();
    document.getElementById("packagePrefillBanner").classList.add("d-none");
  });

  // GALLERY LIGHTBOX & NAVBAR SCROLL INTERACTIVITY
  const lightboxModal = new bootstrap.Modal(
    document.getElementById("galleryLightboxModal"),
  );

  function openLightbox(title, description, image) {
    document.getElementById("lightboxTitle").textContent = title;
    document.getElementById("lightboxDesc").textContent = description;
    document.getElementById("lightboxImg").src = image;
    document.getElementById("lightboxImg").alt = title;
    lightboxModal.show();
  }

  document.querySelectorAll(".package-image-button").forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(
        button.getAttribute("data-title"),
        button.getAttribute("data-desc"),
        button.getAttribute("data-img"),
      );
    });
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(
        item.getAttribute("data-title"),
        item.getAttribute("data-desc"),
        item.getAttribute("data-img"),
      );
    });
  });

  // Efek shadow navbar & active state saat scroll + tutup menu mobile setelah klik
  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const navbarCollapse = document.getElementById("navbarNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    let currentSectionId = "";
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 130;
      if (window.scrollY >= sectionTop) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // Inisialisasi awal render paket wisata
  renderPackages();
});
