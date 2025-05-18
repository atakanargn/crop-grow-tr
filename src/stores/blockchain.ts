import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// Define ethereum on window
declare global {
  interface Window {
    ethereum?: any
  }
}

export const useBlockchainStore = defineStore('blockchain', () => {
  // Connection state
  const isConnected = ref(false)
  const account = ref('')
  const network = ref('')
  const provider = ref(null)

  // Product data
  const products = reactive([])
  const selectedProduct = ref(null)

  // Loading states
  const isLoading = ref(false)
  const error = ref('')

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      error.value = 'MetaMask is not installed!'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      account.value = accounts[0]

      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      network.value =
        chainId === '0x89'
          ? 'Polygon Mainnet'
          : chainId === '0x13881'
            ? 'Mumbai Testnet'
            : 'Unknown Network'

      isConnected.value = true
    } catch (err: any) {
      error.value = err.message || 'Failed to connect wallet'
    } finally {
      isLoading.value = false
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    account.value = ''
    isConnected.value = false
    network.value = ''
  }

  // Fetch products
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = ''

    try {
      // This would be replaced with actual blockchain calls
      // For now, we'll use mock data
      products.length = 0

      const mockProducts = [
        {
          id: 'Batch #1234',
          farmer: 'Ahmet Yılmaz',
          geo: { lat: 39.93, lon: 32.85 },
          location: 'Ankara, Türkiye',
          harvestDate: '2025-06-01',
          QC: { pH: 6.5, moisture: 12 },
          shipment: { company: 'Hızlı Nakliye', date: '2025-06-02' },
          documents: ['QmSampleIPFSHash1'],
        },
        {
          id: 'Batch #1235',
          farmer: 'Mehmet Demir',
          geo: { lat: 41.01, lon: 28.97 },
          location: 'İstanbul, Türkiye',
          harvestDate: '2025-06-03',
          QC: { pH: 6.7, moisture: 14 },
          shipment: { company: 'Güven Nakliye', date: '2025-06-05' },
          documents: ['QmSampleIPFSHash2'],
        },
      ]

      mockProducts.forEach((product) => products.push(product))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products'
    } finally {
      isLoading.value = false
    }
  }

  // Get product details
  const getProductDetails = async (id: string) => {
    isLoading.value = true
    error.value = ''

    try {
      // This would be replaced with actual blockchain calls
      selectedProduct.value = products.find((p) => p.id === id) || null
    } catch (err: any) {
      error.value = err.message || 'Failed to get product details'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isConnected,
    account,
    network,
    products,
    selectedProduct,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    fetchProducts,
    getProductDetails,
  }
})
