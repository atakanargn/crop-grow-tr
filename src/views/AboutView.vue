<template>
  <div class="about">
    <div class="container">
      <h1 class="text-center mb-5">Hakkında</h1>
      <div class="about-content card">
        <p class="text-center">Bu sayfanın içeriği daha sonra eklenecektir.</p>

        <div class="team-section mt-5">
          <h2 class="text-center mb-4">Ekibimiz</h2>
          <div class="team-grid">
            <div class="team-member card">
              <div class="member-avatar">
                <iconify-icon icon="carbon:user-avatar" width="64" height="64"></iconify-icon>
              </div>
              <h3>Takım Üyesi 1</h3>
              <p>Pozisyon</p>
            </div>

            <div class="team-member card">
              <div class="member-avatar">
                <iconify-icon icon="carbon:user-avatar" width="64" height="64"></iconify-icon>
              </div>
              <h3>Takım Üyesi 2</h3>
              <p>Pozisyon</p>
            </div>

            <div class="team-member card">
              <div class="member-avatar">
                <iconify-icon icon="carbon:user-avatar" width="64" height="64"></iconify-icon>
              </div>
              <h3>Takım Üyesi 3</h3>
              <p>Pozisyon</p>
            </div>
          </div>
        </div>

        <div class="contact-section mt-5">
          <h2 class="text-center mb-4">İletişim</h2>
          <div class="contact-info text-center">
            <p>
              <iconify-icon icon="carbon:email" inline></iconify-icon>
              info@crop.grow.tr
            </p>
            <p>
              <iconify-icon icon="carbon:location" inline></iconify-icon>
              İstanbul, Türkiye
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 0;
  width: 100%;
}

.about-content {
  padding: 2rem;
  margin-top: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member {
  text-align: center;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-avatar {
  margin-bottom: 1rem;
  color: var(--primary-purple);
}

.team-member h3 {
  margin-bottom: 0.5rem;
}

.contact-info {
  max-width: 400px;
  margin: 0 auto;
}

.contact-info p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
