<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

defineProps<{
  systemError?: string
}>()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function login() {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Sila masukkan e-mel dan kata laluan.'
    return
  }

  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value.trim().toLowerCase(),
    password: password.value,
  })

  if (error) {
    errorMessage.value =
      'E-mel atau kata laluan tidak betul. Sila cuba semula.'
  }

  loading.value = false
}
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10"
  >
    <section
      class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl"
    >
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600"
        >
          <svg
            class="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 15v2" />
            <path d="M6 10V8a6 6 0 0 1 12 0v2" />
            <rect x="4" y="10" width="16" height="11" rx="2" />
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-white">
          LajuDana CRM
        </h1>

        <p class="mt-2 text-sm text-slate-400">
          Powered by SoBot
        </p>
      </div>

      <div
        v-if="systemError || errorMessage"
        class="mb-5 rounded-xl border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-200"
        role="alert"
      >
        {{ errorMessage || systemError }}
      </div>

      <form class="space-y-5" @submit.prevent="login">
        <div>
          <label
            for="admin-email"
            class="mb-2 block text-sm font-medium text-slate-200"
          >
            E-mel Pentadbir
          </label>

          <input
            id="admin-email"
            v-model="email"
            type="email"
            autocomplete="username"
            required
            placeholder="admin@lajudana.com"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            for="admin-password"
            class="mb-2 block text-sm font-medium text-slate-200"
          >
            Kata Laluan
          </label>

          <div class="relative">
            <input
              id="admin-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <button
              type="button"
              class="absolute inset-y-0 right-0 px-4 text-slate-400 hover:text-white"
              :aria-label="
                showPassword
                  ? 'Sembunyikan kata laluan'
                  : 'Paparkan kata laluan'
              "
              @click="showPassword = !showPassword"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            v-if="loading"
            class="mr-2 h-5 w-5 animate-spin"
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

          {{ loading ? 'Sedang log masuk...' : 'Log Masuk' }}
        </button>
      </form>

      <p class="mt-6 text-center text-xs text-slate-500">
        Akses hanya untuk pentadbir yang dibenarkan.
      </p>
    </section>
  </main>
</template>