<template>
  <div class="register">
    <div class="container">
      <h1 class="mb-4">Yeni Varlık Kaydı</h1>

      <div class="register-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'single' }"
          @click="activeTab = 'single'"
        >
          <iconify-icon icon="tabler:file-plus" width="20" height="20"></iconify-icon>
          Tekil Kayıt
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'batch' }"
          @click="activeTab = 'batch'"
        >
          <iconify-icon icon="tabler:files" width="20" height="20"></iconify-icon>
          Toplu Yükleme
        </button>
      </div>

      <div class="card register-card">
        <!-- Tekil Kayıt Formu -->
        <div v-if="activeTab === 'single'" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="batch-id">Batch ID</label>
              <input type="text" id="batch-id" v-model="form.batchId" placeholder="Örn: 1234" />
            </div>
            <div class="form-group">
              <label for="harvest-date">Hasat Tarihi</label>
              <input type="date" id="harvest-date" v-model="form.harvestDate" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="farmer">Çiftçi</label>
              <select id="farmer" v-model="form.farmer">
                <option value="">Çiftçi Seçin</option>
                <option value="Ahmet Yılmaz">Ahmet Yılmaz</option>
                <option value="Mehmet Demir">Mehmet Demir</option>
                <option value="Ayşe Kaya">Ayşe Kaya</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cooperative">Kooperatif/İşletme</label>
              <select id="cooperative" v-model="form.cooperative">
                <option value="">Kooperatif/İşletme Seçin</option>
                <option value="Ankara Çiftçi Kooperatifi">Ankara Çiftçi Kooperatifi</option>
                <option value="İstanbul Tarım İşletmesi">İstanbul Tarım İşletmesi</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="location">Hasat Bölgesi</label>
              <select id="location" v-model="form.location">
                <option value="">Bölge Seçin</option>
                <option value="Ankara, Türkiye">Ankara, Türkiye</option>
                <option value="İstanbul, Türkiye">İstanbul, Türkiye</option>
                <option value="İzmir, Türkiye">İzmir, Türkiye</option>
              </select>
            </div>
            <div class="form-group">
              <label>GPS Koordinatı</label>
              <div class="form-row no-gap">
                <input type="text" placeholder="Enlem" v-model="form.lat" />
                <input type="text" placeholder="Boylam" v-model="form.lon" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Kalite Kontrol</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="ph">pH Değeri</label>
                <input type="number" id="ph" v-model="form.pH" step="0.1" min="0" max="14" />
              </div>
              <div class="form-group">
                <label for="moisture">Nem Oranı (%)</label>
                <input type="number" id="moisture" v-model="form.moisture" min="0" max="100" />
              </div>
            </div>

            <div class="form-group">
              <label for="certificate">Sertifika Dokümanı (PDF)</label>
              <div class="file-input">
                <input type="file" id="certificate" @change="handleFileUpload" accept=".pdf" />
                <label for="certificate" class="file-label">
                  <iconify-icon icon="tabler:upload" width="20" height="20"></iconify-icon>
                  {{ form.file ? form.file.name : 'Dosya Seç' }}
                </label>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Sevkiyat Bilgisi</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="shipping-company">Nakliye Firması</label>
                <input type="text" id="shipping-company" v-model="form.shippingCompany" />
              </div>
              <div class="form-group">
                <label for="shipping-date">Sevkiyat Tarihi</label>
                <input type="date" id="shipping-date" v-model="form.shippingDate" />
              </div>
            </div>

            <div class="form-group">
              <label for="storage-conditions">Depo Koşulları</label>
              <textarea
                id="storage-conditions"
                v-model="form.storageConditions"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn btn-secondary" @click="resetForm">Temizle</button>
            <button class="btn btn-primary" @click="submitForm" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <iconify-icon
                  icon="tabler:loader-2"
                  width="20"
                  height="20"
                  class="loading-icon"
                ></iconify-icon>
                İşleniyor...
              </span>
              <span v-else>
                <iconify-icon icon="tabler:device-floppy" width="20" height="20"></iconify-icon>
                Kaydet
              </span>
            </button>
          </div>
        </div>

        <!-- Toplu Yükleme Formu -->
        <div v-else class="batch-upload">
          <div class="batch-instructions">
            <h3>Toplu Varlık Yükleme</h3>
            <p>Birden fazla varlığı aynı anda yüklemek için CSV dosyası kullanabilirsiniz.</p>
            <ol>
              <li>
                <a href="#" class="download-link" @click.prevent="downloadTemplate">
                  <iconify-icon icon="tabler:file-download" width="16" height="16"></iconify-icon>
                  CSV Şablonunu İndir
                </a>
              </li>
              <li>Şablonu doldurun (tüm alanlar gereklidir)</li>
              <li>Dosyayı aşağıdan yükleyin</li>
            </ol>
          </div>

          <div class="form-group">
            <label for="csv-file">CSV Dosyası</label>
            <div class="file-input">
              <input type="file" id="csv-file" @change="handleCSVUpload" accept=".csv" />
              <label for="csv-file" class="file-label">
                <iconify-icon icon="tabler:upload" width="20" height="20"></iconify-icon>
                {{ csvFile ? csvFile.name : 'CSV Dosyası Seç' }}
              </label>
            </div>
          </div>

          <div v-if="csvPreview.length > 0" class="csv-preview">
            <h3>Önizleme</h3>
            <p>Toplam {{ csvPreview.length }} kayıt bulundu.</p>

            <div class="preview-table-container">
              <table class="preview-table">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Çiftçi</th>
                    <th>Bölge</th>
                    <th>Hasat Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in csvPreview.slice(0, 5)" :key="index">
                    <td>{{ row.batchId }}</td>
                    <td>{{ row.farmer }}</td>
                    <td>{{ row.location }}</td>
                    <td>{{ row.harvestDate }}</td>
                  </tr>
                </tbody>
              </table>
              <p v-if="csvPreview.length > 5" class="preview-more">
                ... ve {{ csvPreview.length - 5 }} kayıt daha
              </p>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn btn-secondary" @click="resetCSV">Temizle</button>
            <button
              class="btn btn-primary"
              @click="submitCSV"
              :disabled="isSubmitting || csvPreview.length === 0"
            >
              <span v-if="isSubmitting">
                <iconify-icon
                  icon="tabler:loader-2"
                  width="20"
                  height="20"
                  class="loading-icon"
                ></iconify-icon>
                İşleniyor...
              </span>
              <span v-else>
                <iconify-icon icon="tabler:upload" width="20" height="20"></iconify-icon>
                Toplu Yükle
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Active tab
const activeTab = ref('single')

// Form state
const form = reactive({
  batchId: '',
  harvestDate: '',
  farmer: '',
  cooperative: '',
  location: '',
  lat: '',
  lon: '',
  pH: null,
  moisture: null,
  file: null,
  shippingCompany: '',
  shippingDate: '',
  storageConditions: '',
})

// CSV upload state
const csvFile = ref(null)
const csvPreview = ref([])
const isSubmitting = ref(false)

// Handle file upload
const handleFileUpload = (event) => {
  form.file = event.target.files[0]
}

// Handle CSV upload
const handleCSVUpload = (event) => {
  csvFile.value = event.target.files[0]

  if (csvFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      parseCSV(content)
    }
    reader.readAsText(csvFile.value)
  }
}

// Parse CSV content
const parseCSV = (content) => {
  const lines = content.split('\n')
  const headers = lines[0].split(',')

  csvPreview.value = []

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue

    const values = lines[i].split(',')
    const row = {}

    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = values[j].trim()
    }

    csvPreview.value.push(row)
  }
}

// Download CSV template
const downloadTemplate = () => {
  const headers =
    'batchId,farmer,cooperative,location,lat,lon,harvestDate,pH,moisture,shippingCompany,shippingDate,storageConditions\n'
  const example =
    '1234,Ahmet Yılmaz,Ankara Çiftçi Kooperatifi,Ankara,39.93,32.85,2025-06-01,6.5,12,Hızlı Nakliye,2025-06-02,Standart (15-20°C, %40-60 nem)\n'

  const content = headers + example
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'crop_grow_template.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Reset form
const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = key === 'pH' || key === 'moisture' ? null : ''
  })
}

// Reset CSV
const resetCSV = () => {
  csvFile.value = null
  csvPreview.value = []
}

// Submit form
const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Here you would call your blockchain service to mint the NFT
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert('Varlık başarıyla kaydedildi!')
    resetForm()
  } catch (error) {
    alert('Hata: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}

// Submit CSV
const submitCSV = async () => {
  isSubmitting.value = true

  try {
    // Here you would call your blockchain service to mint multiple NFTs
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`${csvPreview.value.length} varlık başarıyla kaydedildi!`)
    resetCSV()
  } catch (error) {
    alert('Hata: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register {
  padding: 0;
  width: 100%;
}

.register-tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: var(--primary-blue);
  border-bottom-color: var(--primary-blue);
}

.register-card {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.form-section h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row.no-gap {
  gap: 0.5rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
}

.file-input {
  position: relative;
}

.file-input input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.file-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--background);
  border: 1px dashed var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: var(--border-color);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-secondary {
  background-color: var(--background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.loading-icon {
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.batch-instructions {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--background);
  border-radius: 8px;
}

.batch-instructions ol {
  padding-left: 1.5rem;
  margin-top: 1rem;
}

.batch-instructions li {
  margin-bottom: 0.75rem;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
}

.csv-preview {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.preview-table-container {
  margin-top: 1rem;
  overflow-x: auto;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.preview-table th {
  background-color: var(--background);
  font-weight: 600;
}

.preview-more {
  margin-top: 0.5rem;
  font-style: italic;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
