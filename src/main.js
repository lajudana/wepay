import { createApp } from 'vue'

const mountPoint = document.querySelector('#app')

if (!mountPoint) {
  throw new Error('Elemen #app tidak dijumpai dalam index.html.')
}

const missingSupabaseConfig = [
  ['VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL],
  ['VITE_SUPABASE_PUBLISHABLE_KEY', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY],
].filter(([, value]) => !value)

function showStartupError(message) {
  const screen = document.createElement('main')
  screen.style.cssText = 'min-height:100vh;display:grid;place-items:center;padding:24px;background:#0f172a;color:#e2e8f0;font:16px/1.5 system-ui,sans-serif'

  const content = document.createElement('section')
  content.style.cssText = 'max-width:640px;padding:24px;border:1px solid #334155;border-radius:16px;background:#1e293b'

  const heading = document.createElement('h1')
  heading.style.cssText = 'margin:0 0 12px;font-size:22px;color:white'
  heading.textContent = 'Aplikasi tidak dapat dimulakan'

  const details = document.createElement('p')
  details.style.cssText = 'margin:0;white-space:pre-line'
  details.textContent = message

  content.append(heading, details)
  screen.append(content)
  mountPoint.replaceChildren(screen)
}

if (missingSupabaseConfig.length > 0) {
  showStartupError(
    `Konfigurasi Supabase tiada: ${missingSupabaseConfig.map(([name]) => name).join(', ')}.\n\nTetapkan pemboleh ubah ini dalam environment/secrets semasa build dan deploy semula.`
  )
} else {
  import('./App.vue')
    .then(({ default: App }) => createApp(App).mount(mountPoint))
    .catch((error) => {
      console.error('Ralat memulakan aplikasi:', error)
      showStartupError('Ralat berlaku semasa memuatkan aplikasi. Semak Console browser dan log build untuk butiran.')
    })
}
