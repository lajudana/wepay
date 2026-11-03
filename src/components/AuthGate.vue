<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin.vue'

const emit = defineEmits(['authorized'])

const session = ref<Session | null | undefined>(undefined)
const authorized = ref(false)
const loading = ref(true)
const accessError = ref('')

let unsubscribeAuth: (() => void) | null = null

async function verifyAdministrator(
  currentSession: Session | null | undefined
) {
  loading.value = true
  authorized.value = false

  if (!currentSession) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id, full_name, active')
    .eq('user_id', currentSession.user.id)
    .eq('active', true)
    .maybeSingle()

  if (error) {
    console.error('Admin verification error:', error.message)

    accessError.value =
      'Tidak dapat mengesahkan akses pentadbir. Sila cuba semula.'

    loading.value = false
    return
  }

  if (!data) {
    accessError.value =
      'Akaun ini tidak mempunyai kebenaran pentadbir.'

    await supabase.auth.signOut({
      scope: 'local',
    })

    loading.value = false
    return
  }

  accessError.value = ''
  authorized.value = true
  loading.value = false
  emit('authorized') 
}

watch(session, (currentSession) => {
  void verifyAdministrator(currentSession)
})

onMounted(async () => {
  const {
    data: { session: existingSession },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error('Session error:', error.message)
    accessError.value = 'Tidak dapat menyemak sesi log masuk.'
  }

  session.value = existingSession

  const { data } = supabase.auth.onAuthStateChange(
    (_event, updatedSession) => {
      session.value = updatedSession
    }
  )

  unsubscribeAuth = () => {
    data.subscription.unsubscribe()
  }
})

onUnmounted(() => {
  unsubscribeAuth?.()
})
</script>

<template>
  <div
    v-if="loading"
    class="flex min-h-screen items-center justify-center bg-slate-950"
  >
    <div class="text-center text-slate-300">
      <svg
        class="mx-auto mb-4 h-9 w-9 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          stroke-width="3"
          opacity="0.25"
        />

        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <p class="text-sm font-medium">
        Menyemak sesi pentadbir...
      </p>
    </div>
  </div>

  <slot v-else-if="authorized" />

  <AdminLogin
    v-else
    :system-error="accessError"
  />
</template>