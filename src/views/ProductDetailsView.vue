<template>
  <div class="product-details">
    <div class="container">
      <div class="back-link mb-3">
        <router-link to="/assets">
          <iconify-icon icon="tabler:arrow-left" width="20" height="20"></iconify-icon>
          Varlıklara Dön
        </router-link>
      </div>

      <div v-if="blockchainStore.isLoading" class="loading-container">
        <iconify-icon
          icon="tabler:loader-2"
          width="48"
          height="48"
          class="loading-icon"
        ></iconify-icon>
        <p>Varlık detayları yükleniyor...</p>
      </div>

      <div v-else-if="blockchainStore.error" class="error-container card">
        <iconify-icon
          icon="tabler:alert-triangle"
          width="48"
          height="48"
          class="error-icon"
        ></iconify-icon>
        <p>{{ blockchainStore.error }}</p>
        <button class="btn btn-primary" @click="loadProductDetails">Tekrar Dene</button>
      </div>

      <div v-else-if="!product" class="error-container card">
        <iconify-icon icon="tabler:box-off" width="48" height="48"></iconify-icon>
        <p>Varlık bulunamadı.</p>
        <router-link to="/assets" class="btn btn-primary">Varlıklara Dön</router-link>
      </div>

      <template v-else>
        <div class="product-header card">
          <div class="product-title">
            <h1>{{ product.id }}</h1>
            <div class="product-badges">
              <div class="badge">
                <iconify-icon icon="tabler:calendar" width="16" height="16"></iconify-icon>
                {{ formatDate(product.harvestDate) }}
              </div>
              <div class="badge badge-primary">
                <iconify-icon icon="tabler:certificate" width="16" height="16"></iconify-icon>
                Doğrulanmış
              </div>
            </div>
          </div>
          <div class="product-actions">
            <button class="btn-action">
              <iconify-icon icon="tabler:qrcode" width="20" height="20"></iconify-icon>
              QR Kod
            </button>
            <button class="btn-action">
              <iconify-icon icon="tabler:share" width="20" height="20"></iconify-icon>
              Paylaş
            </button>
          </div>
        </div>

        <div class="product-grid">
          <div class="product-info-card card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:user" width="24" height="24"></iconify-icon>
              Çiftçi Bilgisi
            </h2>
            <div class="info-row">
              <div class="info-label">Çiftçi Adı:</div>
              <div class="info-value">{{ product.farmer }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Kooperatif/İşletme:</div>
              <div class="info-value">Örnek Kooperatif</div>
            </div>
          </div>

          <div class="product-info-card card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:map" width="24" height="24"></iconify-icon>
              Coğrafi Veri
            </h2>
            <div class="info-row">
              <div class="info-label">Bölge:</div>
              <div class="info-value">{{ product.location }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">GPS Koordinatı:</div>
              <div class="info-value">{{ product.geo.lat }}, {{ product.geo.lon }}</div>
            </div>
            <div class="map-container">
              <div class="map-placeholder">
                <iconify-icon icon="tabler:map-2" width="48" height="48"></iconify-icon>
                <p>Harita burada gösterilecek</p>
              </div>
            </div>
          </div>

          <div class="product-info-card card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:clock" width="24" height="24"></iconify-icon>
              Zaman Damgası
            </h2>
            <div class="info-row">
              <div class="info-label">Hasat Tarihi:</div>
              <div class="info-value">{{ formatDate(product.harvestDate) }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Sevkiyat Tarihi:</div>
              <div class="info-value">{{ formatDate(product.shipment.date) }}</div>
            </div>
          </div>

          <div class="product-info-card card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:certificate" width="24" height="24"></iconify-icon>
              Kalite Kontrol
            </h2>
            <div class="info-row">
              <div class="info-label">pH Değeri:</div>
              <div class="info-value">{{ product.QC.pH }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Nem Oranı:</div>
              <div class="info-value">{{ product.QC.moisture }}%</div>
            </div>
            <div class="documents-section">
              <h3>Belgeler</h3>
              <div class="document-list">
                <div class="document-item" v-for="(doc, index) in product.documents" :key="index">
                  <iconify-icon
                    icon="tabler:file-certificate"
                    width="24"
                    height="24"
                  ></iconify-icon>
                  <span>Sertifika Belgesi</span>
                  <a href="#" class="document-link">
                    <iconify-icon icon="tabler:external-link" width="16" height="16"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="product-info-card card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:truck" width="24" height="24"></iconify-icon>
              Sevkiyat Bilgisi
            </h2>
            <div class="info-row">
              <div class="info-label">Nakliye Firması:</div>
              <div class="info-value">{{ product.shipment.company }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Sevkiyat Tarihi:</div>
              <div class="info-value">{{ formatDate(product.shipment.date) }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Depo Koşulları:</div>
              <div class="info-value">Standart (15-20°C, %40-60 nem)</div>
            </div>
          </div>

          <div class="product-info-card card blockchain-card">
            <h2 class="card-title">
              <iconify-icon icon="tabler:brand-polygon" width="24" height="24"></iconify-icon>
              Blockchain Bilgisi
            </h2>
            <div class="info-row">
              <div class="info-label">Token Standardı:</div>
              <div class="info-value">ERC-1155 NFT Batch</div>
            </div>
            <div class="info-row">
              <div class="info-label">Ağ:</div>
              <div class="info-value">Polygon Mumbai Testnet</div>
            </div>
            <div class="info-row">
              <div class="info-label">Kontrat Adresi:</div>
              <div class="info-value blockchain-address">0x1234...5678</div>
            </div>
            <div class="info-row">
              <div class="info-label">Token ID:</div>
              <div class="info-value">{{ product.id.replace('Batch #', '') }}</div>
            </div>
            <div class="blockchain-links">
              <a href="#" class="blockchain-link">
                <iconify-icon icon="tabler:external-link" width="16" height="16"></iconify-icon>
                Polygonscan'da Görüntüle
              </a>
              <a href="#" class="blockchain-link">
                <iconify-icon icon="tabler:file-json" width="16" height="16"></iconify-icon>
                Metadata Görüntüle
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlockchainStore } from '../stores/blockchain'

const route = useRoute()
const blockchainStore = useBlockchainStore()

// Get product ID from route params
const productId = computed(() => route.params.id as string)

// Get product from store
const product = computed(() => blockchainStore.selectedProduct)

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('tr-TR').format(date)
}

// Load product details
const loadProductDetails = async () => {
  await blockchainStore.getProductDetails(productId.value)
}

// Load product details on component mount
onMounted(() => {
  loadProductDetails()
})
</script>

<style scoped>
.product-details {
  padding: 0;
  width: 100%;
}

.back-link a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  gap: 1rem;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  color: #ff5722;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.product-title h1 {
  margin-bottom: 0.5rem;
}

.product-badges {
  display: flex;
  gap: 0.75rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--background);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.badge-primary {
  background-color: var(--primary-green);
  color: white;
}

.product-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--background);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--text-color);
}

.btn-action:hover {
  background-color: var(--border-color);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.product-info-card {
  padding: 1.5rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.info-row {
  display: flex;
  margin-bottom: 0.75rem;
}

.info-label {
  width: 40%;
  font-weight: 500;
}

.info-value {
  width: 60%;
}

.map-container {
  margin-top: 1.5rem;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  color: var(--text-color);
  opacity: 0.7;
}

.documents-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.documents-section h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: var(--background);
  border-radius: 4px;
}

.document-link {
  margin-left: auto;
  color: var(--primary-blue);
}

.blockchain-card {
  grid-column: span 2;
}

.blockchain-address {
  font-family: monospace;
}

.blockchain-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.blockchain-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
}

@media (max-width: 768px) {
  .product-header {
    flex-direction: column;
    gap: 1rem;
  }

  .product-actions {
    width: 100%;
    justify-content: space-between;
  }

  .blockchain-card {
    grid-column: span 1;
  }
}
</style>
