<template>
  <div class="assets">
    <div class="container">
      <div class="assets-header">
        <h1 class="mb-4">Varlıklar</h1>
        <div class="search-bar">
          <iconify-icon icon="tabler:search" width="20" height="20"></iconify-icon>
          <input type="text" v-model="searchQuery" placeholder="Ürün ID veya çiftçi ara..." />
        </div>
      </div>

      <div v-if="blockchainStore.isLoading" class="loading-container">
        <iconify-icon
          icon="tabler:loader-2"
          width="48"
          height="48"
          class="loading-icon"
        ></iconify-icon>
        <p>Varlıklar yükleniyor...</p>
      </div>

      <div v-else-if="blockchainStore.error" class="error-container card">
        <iconify-icon
          icon="tabler:alert-triangle"
          width="48"
          height="48"
          class="error-icon"
        ></iconify-icon>
        <p>{{ blockchainStore.error }}</p>
        <button class="btn btn-primary" @click="loadProducts">Tekrar Dene</button>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="empty-container card">
        <iconify-icon icon="tabler:box" width="48" height="48"></iconify-icon>
        <p>Hiç varlık bulunamadı.</p>
        <p v-if="searchQuery" class="small-text">Arama kriterlerinizi değiştirmeyi deneyin.</p>
        <button class="btn btn-primary" @click="loadProducts">Yenile</button>
      </div>

      <div v-else class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card card"
          @click="viewProductDetails(product.id)"
        >
          <div class="product-header">
            <h3>{{ product.id }}</h3>
            <span class="product-date">{{ formatDate(product.harvestDate) }}</span>
          </div>

          <div class="product-info">
            <div class="info-item">
              <iconify-icon icon="tabler:user" width="16" height="16"></iconify-icon>
              <span>{{ product.farmer }}</span>
            </div>
            <div class="info-item">
              <iconify-icon icon="tabler:map-pin" width="16" height="16"></iconify-icon>
              <span>{{ product.location }}</span>
            </div>
            <div class="info-item">
              <iconify-icon icon="tabler:truck" width="16" height="16"></iconify-icon>
              <span>{{ product.shipment.company }}</span>
            </div>
          </div>

          <div class="product-footer">
            <div
              class="quality-badge"
              :title="`pH: ${product.QC.pH}, Nem: ${product.QC.moisture}%`"
            >
              <iconify-icon icon="tabler:certificate" width="16" height="16"></iconify-icon>
              Kalite Kontrolü
            </div>
            <button class="btn-view">
              <iconify-icon icon="tabler:eye" width="16" height="16"></iconify-icon>
              Detaylar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlockchainStore } from '../stores/blockchain'

const blockchainStore = useBlockchainStore()
const router = useRouter()
const searchQuery = ref('')

// Filter products based on search query
const filteredProducts = computed(() => {
  if (!searchQuery.value) return blockchainStore.products

  const query = searchQuery.value.toLowerCase()
  return blockchainStore.products.filter(
    (product) =>
      product.id.toLowerCase().includes(query) ||
      product.farmer.toLowerCase().includes(query) ||
      product.location.toLowerCase().includes(query),
  )
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('tr-TR').format(date)
}

// Load products
const loadProducts = async () => {
  await blockchainStore.fetchProducts()
}

// View product details
const viewProductDetails = (id: string) => {
  router.push({ name: 'product-details', params: { id } })
}

// Load products on component mount
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.assets {
  padding: 0;
  width: 100%;
}

.assets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 300px;
  max-width: 100%;
  border: 1px solid var(--border-color);
}

.search-bar input {
  border: none;
  background: transparent;
  margin-left: 0.5rem;
  flex-grow: 1;
  color: var(--text-color);
  outline: none;
}

.loading-container,
.error-container,
.empty-container {
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

.small-text {
  font-size: 0.9rem;
  opacity: 0.7;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  padding: 1.5rem;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.product-date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.product-info {
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.quality-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--primary-green);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.btn-view {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--primary-blue);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-view:hover {
  background-color: var(--light-blue);
}

@media (max-width: 768px) {
  .assets-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-bar {
    width: 100%;
  }
}
</style>
