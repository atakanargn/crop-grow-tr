<template>
  <div class="home">
    <section class="hero py-5">
      <div class="container">
        <div class="hero-content text-center">
          <h1 class="mb-4">crop.grow.tr</h1>
          <p class="mb-5">Blockchain tabanlı tarım ürünleri izleme ve doğrulama sistemi</p>
          <div class="hero-buttons">
            <router-link to="/register" class="btn btn-primary">
              <iconify-icon icon="tabler:plus" width="20" height="20"></iconify-icon>
              Yeni Ürün Kaydet
            </router-link>
            <router-link to="/assets" class="btn btn-secondary">
              <iconify-icon icon="tabler:list" width="20" height="20"></iconify-icon>
              Varlıkları Görüntüle
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="features py-5">
      <div class="container">
        <h2 class="text-center mb-5">Sistem Özellikleri</h2>
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">
              <iconify-icon icon="tabler:brand-polygon" width="48" height="48"></iconify-icon>
            </div>
            <h3>Polygon Blockchain</h3>
            <p>
              Düşük işlem ücretleri ve yüksek hızlı Polygon ağı üzerinde ERC-1155 NFT Batch
              standardı ile güvenli kayıt.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon">
              <iconify-icon icon="tabler:certificate" width="48" height="48"></iconify-icon>
            </div>
            <h3>Kalite Kontrol</h3>
            <p>
              pH değeri, nem oranı ve sertifika belgeleri ile ürün kalitesinin şeffaf doğrulaması.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon">
              <iconify-icon icon="tabler:qrcode" width="48" height="48"></iconify-icon>
            </div>
            <h3>Tüketici Erişimi</h3>
            <p>
              QR kod ile tüketicilerin ürün geçmişine tek tuşla erişimi ve tedarik zinciri
              şeffaflığı.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="how-it-works py-5">
      <div class="container">
        <h2 class="text-center mb-5">Nasıl Çalışır?</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Veri Girişi</h3>
              <p>Çiftçiler ve kooperatifler ürün bilgilerini sisteme kaydeder.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Blockchain Kaydı</h3>
              <p>Veriler Polygon ağında ERC-1155 token olarak saklanır ve IPFS'e bağlanır.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Doğrulama</h3>
              <p>Kalite kontrol ve coğrafi konum verileri akıllı kontratlar ile doğrulanır.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Erişim</h3>
              <p>Tüm paydaşlar QR kod ile ürün bilgilerine erişebilir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta py-5">
      <div class="container">
        <div class="cta-content card">
          <div class="cta-text">
            <h2>Hemen Başlayın</h2>
            <p>Ürünlerinizi blockchain üzerinde kaydedin ve izlenebilirliği artırın.</p>
          </div>
          <div class="cta-buttons">
            <router-link to="/register" class="btn btn-primary">Kayıt Oluştur</router-link>
            <a href="#" class="btn btn-secondary" @click.prevent="scrollToTop">Daha Fazla Bilgi</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.home {
  padding: 0;
  width: 100%;
}

.hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
  color: white;
  margin-bottom: 3rem;
  width: 100%;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  padding: 2rem;
  transition: transform 0.3s ease;
  text-align: center;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  margin-bottom: 1.5rem;
  color: var(--primary-green);
}

.how-it-works {
  background-color: var(--background);
  padding: 4rem 0;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 3rem;
}

.step {
  flex: 1;
  min-width: 250px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-purple);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content {
  flex-grow: 1;
}

.step-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.cta {
  margin-top: 3rem;
}

.cta-content {
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--blue-green) 100%);
  color: white;
}

.cta-text h2 {
  margin-bottom: 1rem;
  color: white;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .steps {
    flex-direction: column;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
