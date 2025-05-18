<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <div class="navbar-logo">
          <router-link to="/">
            <img src="/logo.png" alt="crop.grow.tr" class="logo" />
          </router-link>
        </div>
        <nav class="navbar-menu">
          <router-link to="/" class="nav-link">Anasayfa</router-link>
          <router-link to="/assets" class="nav-link">Varlıklar</router-link>
          <router-link to="/about" class="nav-link">Hakkında</router-link>
          <router-link to="/register" class="nav-link">Kayıt</router-link>
        </nav>
      </div>
      <div class="navbar-actions">
        <div class="theme-toggle" @click="toggleTheme">
          <iconify-icon
            :icon="isDarkTheme ? 'tabler:sun' : 'tabler:moon'"
            width="24"
            height="24"
          ></iconify-icon>
        </div>

        <div v-if="blockchainStore.isConnected" class="wallet-info">
          <span class="network-badge" :class="networkClass">{{ blockchainStore.network }}</span>
          <span class="wallet-address">{{ shortenAddress(blockchainStore.account) }}</span>
          <button class="btn btn-disconnect" @click="disconnectWallet">
            <iconify-icon icon="tabler:logout" class="wallet-icon"></iconify-icon>
          </button>
        </div>
        <button
          v-else
          class="btn btn-wallet"
          @click="connectWallet"
          :disabled="blockchainStore.isLoading"
        >
          <iconify-icon icon="tabler:wallet" class="wallet-icon"></iconify-icon>
          {{ blockchainStore.isLoading ? 'Bağlanıyor...' : 'Cüzdan Bağla' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useBlockchainStore } from '../stores/blockchain'

defineOptions({
  name: 'NavbarComponent',
})

const blockchainStore = useBlockchainStore()
const isDarkTheme = ref(false)

// Network badge class
const networkClass = computed(() => {
  const network = blockchainStore.network
  if (network === 'Polygon Mainnet') return 'network-polygon'
  if (network === 'Mumbai Testnet') return 'network-mumbai'
  return 'network-unknown'
})

// Shorten wallet address
const shortenAddress = (address: string) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// Check for saved theme preference or respect OS preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark'
  } else {
    isDarkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

// Watch for theme changes
watch(isDarkTheme, () => {
  applyTheme()
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
})

// Apply theme to document
const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

// Toggle theme
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
}

// Connect wallet using blockchain store
const connectWallet = async () => {
  await blockchainStore.connectWallet()
}

// Disconnect wallet
const disconnectWallet = () => {
  blockchainStore.disconnectWallet()
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--card-background);
  box-shadow: 0 2px 10px var(--shadow-color);
  z-index: 1000;
  padding: 0.75rem 1rem;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}

.navbar-logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 40px;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-blue);
  background-color: rgba(33, 150, 243, 0.1);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  color: var(--text-color);
}

.wallet-icon {
  margin-right: 6px;
  font-size: 1.2em;
  vertical-align: middle;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--background);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.network-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.network-polygon {
  background-color: #8247e5;
  color: white;
}

.network-mumbai {
  background-color: #2bbdf7;
  color: white;
}

.network-unknown {
  background-color: #ff5722;
  color: white;
}

.wallet-address {
  font-family: monospace;
}

.btn-disconnect {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.25rem;
}

.btn-disconnect:hover {
  color: #ff5722;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-left {
    flex-direction: column;
    width: 100%;
  }

  .navbar-logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .navbar-menu {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .navbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .wallet-info {
    flex-grow: 1;
    justify-content: space-between;
  }
}
</style>
