<template>
  <div class="min-h-screen flex flex-col bg-slate-100">


    <!-- LOGIN SCREEN WHEN LOGGED OUT -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#032d60] via-[#014486] to-slate-900 p-4">
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            LD
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-extrabold tracking-tight text-slate-900">LajuDana</span>
              <span class="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">CRM Cloud</span>
            </div>
            <p class="text-xs font-medium text-slate-500">powered by <span class="text-blue-600 font-semibold">SoBot</span> • Enterprise Loan Management</p>
          </div>
        </div>

        <h1 class="text-lg font-bold text-slate-900 mb-1">Log Masuk Pentadbir (Admin CRM)</h1>
        <p class="text-xs text-slate-500 mb-6">Sila log masuk untuk mengakses pangkalan data pelanggan & pinjaman LajuDana.</p>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">ID Pentadbir / E-mel</label>
            <input v-model="loginForm.username" type="text" required class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="admin@lajudana.com.my" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kata Laluan</label>
            <input v-model="loginForm.password" type="password" required class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" class="w-full py-2.5 px-4 bg-[#0176d3] hover:bg-[#0160ad] text-white font-semibold rounded-lg shadow transition flex items-center justify-center gap-2 text-sm">
            <span>Log Masuk ke LajuDana CRM</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </form>
      </div>
    </div>

    <!-- MAIN CRM APPLICATION -->
    <template v-else>
      <!-- TOP NAVIGATOR BAR (Salesforce Lightning Inspired) -->
      <header class="sticky top-0 z-30 bg-[#032d60] text-white shadow-md border-b border-blue-900/80">
        <div class="max-w-[1600px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          <!-- Left: Hamburger Menu + Logo LajuDana powered by SoBot -->
          <div class="flex items-center gap-3">
            <button
              @click="sidebarOpen = !sidebarOpen"
              type="button"
              title="Menu Navigasi"
              class="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16"/>
              </svg>
            </button>

            <!-- Brand Logo -->
            <div @click="activeView = 'dashboard'" class="flex items-center gap-2.5 cursor-pointer group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0176d3] via-blue-500 to-cyan-400 flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-105 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="leading-tight">
                <div class="flex items-center gap-1.5">
                  <span class="font-extrabold text-lg sm:text-xl tracking-tight text-white">LajuDana</span>
                  <span class="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">Lightning CRM</span>
                </div>
                <div class="text-[11px] text-blue-200 font-medium flex items-center gap-1">
                  <span>powered by</span>
                  <span class="font-bold text-cyan-300 tracking-wide">SoBot</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Center: Global Quick Search & Navigator Dashboard Shortcut Pills -->
          <div class="hidden lg:flex items-center gap-3 flex-1 max-w-2xl mx-4">
            <div class="relative flex-1">
              <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                v-model="searchQuery"
                @focus="if(activeView !== 'customers' && activeView !== 'dashboard') activeView = 'customers'"
                type="text"
                placeholder="Cari Nama Pelanggan, No. K/P, Application ID, Bank atau Telefon..."
                class="w-full pl-10 pr-8 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder-blue-200/80 focus:placeholder-slate-400 text-sm border border-white/15 focus:border-cyan-400 outline-none transition"
              />
              <button v-if="searchQuery" @click="searchQuery = ''" type="button" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">✕</button>
            </div>
          </div>

          <!-- Right: Navigator Dashboard Button, Add Record, Github/Vue Code, Setting Icon & Log Out Button -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <button
              @click="activeView = 'dashboard'"
              type="button"
              :class="activeView === 'dashboard' ? 'bg-[#0176d3] text-white border-cyan-400/50' : 'bg-white/10 text-blue-100 hover:bg-white/20 border-transparent'"
              class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition flex items-center gap-1.5"
              title="Navigator Dashboard"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span class="hidden md:inline">Dashboard</span>
            </button>

            <button
              @click="openAddRecordModal()"
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition flex items-center gap-1.5"
              title="Tambah Rekod Pelanggan Baharu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 4v16m8-8H4"/>
              </svg>
              <span class="hidden sm:inline">Add Record</span>
            </button>

            <!-- Setting Icon Button -->
            <button
              @click="showSettingsModal = true"
              type="button"
              title="Tetapan Sistem & Dropdown (Settings)"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white transition relative"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>

            <!-- Log Out Button -->
            <button
              @click="showLogoutConfirm = true"
              type="button"
              title="Log Keluar (Log Out)"
              class="px-3 py-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>

        <!-- Secondary Salesforce Object Tab Bar -->
        <div class="bg-[#014486] border-t border-white/10 px-3 sm:px-6">
          <div class="max-w-[1600px] mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              v-for="tab in navTabs"
              :key="tab.id"
              @click="activeView = tab.id"
              type="button"
              :class="activeView === tab.id ? 'bg-white text-[#032d60] font-bold shadow-sm' : 'text-blue-100 hover:bg-white/10 font-medium'"
              class="px-3.5 py-1.5 rounded-md text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition"
            >
              <span>{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
              <span v-if="tab.badge !== undefined" :class="activeView === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-white/20 text-white'" class="px-1.5 py-0.2 rounded-full text-[11px] font-bold">
                {{ tab.badge }}
              </span>
            </button>
          </div>
        </div>
      </header>

      <!-- MAIN BODY LAYOUT (Collapsible Sidebar + Workspace Content) -->
      <div class="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        
        <!-- Collapsible Hamburger Sidebar Navigator -->
        <aside
          v-if="sidebarOpen"
          class="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col justify-between p-4 shadow-sm z-20"
        >
          <div class="space-y-6">
            <div>
              <div class="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Navigator Utama</div>
              <nav class="space-y-1">
                <button
                  v-for="tab in navTabs"
                  :key="tab.id"
                  @click="activeView = tab.id"
                  type="button"
                  :class="activeView === tab.id ? 'bg-blue-50 text-[#0176d3] font-bold border-l-4 border-[#0176d3]' : 'text-slate-600 hover:bg-slate-50 font-medium'"
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-r-lg text-sm transition"
                >
                  <div class="flex items-center gap-2.5">
                    <span>{{ tab.icon }}</span>
                    <span>{{ tab.label }}</span>
                  </div>
                  <span v-if="tab.badge !== undefined" class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {{ tab.badge }}
                  </span>
                </button>
              </nav>
            </div>

            <!-- Quick Actions in Sidebar -->
            <div class="pt-4 border-t border-slate-200">
              <div class="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Tindakan Pantas</div>
              <div class="space-y-2">
                <button
                  @click="openAddRecordModal()"
                  type="button"
                  class="w-full py-2 px-3 rounded-lg bg-[#0176d3] hover:bg-[#0160ad] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>＋ Tambah Pelanggan Baru</span>
                </button>
                <button
                  @click="showSettingsModal = true"
                  type="button"
                  class="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>⚙️ Urus Pilihan Dropdown</span>
                </button>
                <button
                  @click="exportDatabaseJson()"
                  type="button"
                  class="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>⬇️ Eksport Data JSON</span>
                </button>
              </div>
            </div>

            <!-- Status Filter Shortcut -->
            <div class="pt-4 border-t border-slate-200">
              <div class="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Tapis Status Pinjaman</div>
              <div class="space-y-1">
                <button
                  v-for="st in ['Semua', 'Diluluskan', 'Dalam Semakan', 'Aktif', 'Tunggakan', 'Selesai']"
                  :key="st"
                  @click="statusFilter = st; activeView = 'customers'"
                  type="button"
                  :class="statusFilter === st ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'"
                  class="w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition"
                >
                  <span>{{ st }}</span>
                  <span class="text-[11px] opacity-80">
                    {{ st === 'Semua' ? customers.length : customers.filter(c => c.status === st).length }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Logged in Admin Profile Footer -->
          <div class="pt-4 border-t border-slate-200 mt-6">
            <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <div class="w-9 h-9 rounded-full bg-[#032d60] text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-bold text-slate-900 truncate">{{ currentAdmin.name }}</p>
                <p class="text-[11px] text-slate-500 truncate">{{ currentAdmin.role }}</p>
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN WORKSPACE CONTENT -->
        <main class="flex-1 p-4 sm:p-6 overflow-x-hidden">

          <!-- Toast Banner -->
          <div
            v-if="toastMessage"
            class="mb-4 px-4 py-3 rounded-xl bg-emerald-900 text-white text-sm font-medium shadow-lg flex items-center justify-between animate-fade-in"
          >
            <div class="flex items-center gap-2">
              <span class="text-emerald-300">✔</span>
              <span>{{ toastMessage }}</span>
            </div>
            <button @click="toastMessage = ''" type="button" class="text-xs text-emerald-200 hover:text-white">Tutup</button>
          </div>

          <!-- ========================================================= -->
          <!-- VIEW 1: NAVIGATOR DASHBOARD (Salesforce Style Overview)   -->
          <!-- ========================================================= -->
          <div v-if="activeView === 'dashboard'" class="space-y-6">
            <!-- Hero Welcome Banner -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0176d3] mb-1">
                  <span>Salesforce Lightning Workspace</span>
                  <span>•</span>
                  <span>LajuDana powered by SoBot</span>
                </div>
                <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900">Navigator Dashboard & Ringkasan Pinjaman</h1>
                <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Klik pada mana-mana nama pelanggan di bawah untuk membuka popup penuh maklumat pelanggan, bank & rujukan.</p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button
                  @click="openAddRecordModal()"
                  type="button"
                  class="px-4 py-2.5 rounded-xl bg-[#0176d3] hover:bg-[#0160ad] text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2"
                >
                  <span>＋ Add Record Pelanggan</span>
                </button>
                <button
                  @click="activeView = 'customers'"
                  type="button"
                  class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition"
                >
                  Lihat Semua Rekod ({{ customers.length }})
                </button>
                <button
                  @click="activeView = 'admin'"
                  type="button"
                  class="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs sm:text-sm transition"
                >
                  ⚙️ Admin Panel
                </button>
              </div>
            </div>

            <!-- KPI Metric Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Jumlah Rekod Pelanggan</span>
                  <span class="w-9 h-9 rounded-xl bg-blue-50 text-[#0176d3] flex items-center justify-center font-bold">👥</span>
                </div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{{ customers.length }}</div>
                <div class="text-xs text-emerald-600 font-semibold mt-1">Semua profil lengkap & disahkan</div>
              </div>

              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Jumlah Nilai Pinjaman</span>
                  <span class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">RM</span>
                </div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">RM {{ formatCurrency(totalLoanAmount) }}</div>
                <div class="text-xs text-slate-500 mt-1">Purata RM {{ formatCurrency(averageLoanAmount) }} / pelanggan</div>
              </div>

              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pinjaman Aktif / Lulus</span>
                  <span class="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">✓</span>
                </div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{{ activeOrApprovedCount }}</div>
                <div class="text-xs text-cyan-700 font-semibold mt-1">Daripada {{ customers.length }} permohonan</div>
              </div>

              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Bank & E-Wallet Lokal</span>
                  <span class="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">🏦</span>
                </div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{{ dropdowns.banks.length }}</div>
                <div class="text-xs text-purple-700 font-semibold mt-1">Saluran pengeluaran aktif</div>
              </div>
            </div>

            <!-- Quick Recent Customer Records Table + Distribution -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Left 2 Columns: Recent Customer & Loan Records -->
              <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 class="text-base font-bold text-slate-900">Senarai Pelanggan & Pinjaman Terkini</h2>
                    <p class="text-xs text-slate-500">Tekan pada nama pelanggan untuk buka Popup Penuh Maklumat Pelanggan.</p>
                  </div>
                  <button @click="activeView = 'customers'" type="button" class="text-xs font-bold text-[#0176d3] hover:underline">
                    Buka Panel Penuh →
                  </button>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th class="py-3 px-4">Pelanggan</th>
                        <th class="py-3 px-4">Application ID</th>
                        <th class="py-3 px-4">Jumlah (Amount)</th>
                        <th class="py-3 px-4">Bank / E-Wallet</th>
                        <th class="py-3 px-4">Status</th>
                        <th class="py-3 px-4 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-sm">
                      <tr
                        v-for="cust in filteredCustomers.slice(0, 6)"
                        :key="cust.id"
                        class="hover:bg-blue-50/50 transition group"
                      >
                        <td class="py-3 px-4">
                          <div class="flex items-center gap-3">
                            <img :src="cust.avatar" :alt="cust.fullName" class="w-10 h-10 rounded-full object-cover border border-slate-300 flex-shrink-0" />
                            <div>
                              <button
                                @click="openCustomerPopup(cust, false)"
                                type="button"
                                class="font-bold text-[#0176d3] hover:text-[#032d60] hover:underline text-left block"
                              >
                                {{ cust.fullName }}
                              </button>
                              <div class="text-xs text-slate-500">{{ cust.icNumber }} • {{ cust.race }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-4 font-mono text-xs font-semibold text-slate-700">{{ cust.applicationId }}</td>
                        <td class="py-3 px-4 font-bold text-slate-900">RM {{ formatCurrency(cust.amount) }}</td>
                        <td class="py-3 px-4">
                          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                            {{ cust.bankDetails.bankName }}
                          </span>
                        </td>
                        <td class="py-3 px-4">
                          <span :class="statusBadgeClass(cust.status)" class="px-2.5 py-0.5 rounded-full text-xs font-bold">
                            {{ cust.status }}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            @click="openCustomerPopup(cust, false)"
                            type="button"
                            class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0176d3] font-semibold text-xs transition"
                          >
                            Lihat Popup
                          </button>
                          <button
                            @click="openCustomerPopup(cust, true)"
                            type="button"
                            class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Right Column: Quick Dropdown Customizer & Bank Breakdown -->
              <div class="space-y-6">
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-bold text-slate-900">Agihan Bank & E-Wallet Malaysia</h3>
                    <span class="text-xs text-slate-400">Rekod Semasa</span>
                  </div>
                  <div class="space-y-3">
                    <div v-for="item in bankDistribution" :key="item.bank" class="space-y-1">
                      <div class="flex justify-between text-xs">
                        <span class="font-semibold text-slate-700 truncate pr-2">{{ item.bank }}</span>
                        <span class="font-bold text-slate-900">{{ item.count }} pelanggan</span>
                      </div>
                      <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-[#0176d3] rounded-full" :style="{ width: item.percent + '%' }"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick Customizer Box for Bangsa & Hubungan -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <h3 class="text-sm font-bold text-slate-900 mb-1">Tetapan Pantas Dropdown (Boleh Edit)</h3>
                  <p class="text-xs text-slate-500 mb-3">Tambah pilihan baharu untuk Bangsa, Hubungan Rujukan atau Bank Lokal dengan pantas:</p>

                  <div class="space-y-3">
                    <div>
                      <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Tambah Pilihan Bangsa</label>
                      <div class="flex gap-2">
                        <input v-model="quickNewRace" @keyup.enter="addDropdownOption('races', quickNewRace); quickNewRace=''" type="text" placeholder="Contoh: Iban / Kadazan" class="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-600" />
                        <button @click="addDropdownOption('races', quickNewRace); quickNewRace=''" type="button" class="px-3 py-1.5 rounded-lg bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#0160ad]">Tambah</button>
                      </div>
                    </div>

                    <div>
                      <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Tambah Hubungan (Reference)</label>
                      <div class="flex gap-2">
                        <input v-model="quickNewRelation" @keyup.enter="addDropdownOption('relationships', quickNewRelation); quickNewRelation=''" type="text" placeholder="Contoh: Bapa Saudara / Penyelia" class="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-600" />
                        <button @click="addDropdownOption('relationships', quickNewRelation); quickNewRelation=''" type="button" class="px-3 py-1.5 rounded-lg bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#0160ad]">Tambah</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- VIEW 2: CUSTOMER & LOAN RECORD PANEL                      -->
          <!-- ========================================================= -->
          <div v-if="activeView === 'customers'" class="space-y-5">
            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 class="text-lg sm:text-xl font-extrabold text-slate-900">Panel Customer & Loan Record</h1>
                <p class="text-xs sm:text-sm text-slate-500">Klik pada nama pelanggan untuk melihat Popup Penuh, atau klik "Edit Manual" untuk mengemaskini maklumat pelanggan.</p>
              </div>

              <div class="flex flex-wrap items-center gap-2.5">
                <!-- Search Input -->
                <div class="relative w-full sm:w-64">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari nama, K/P, ID, telefon..."
                    class="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-none"
                  />
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>

                <!-- Filter by Bangsa -->
                <select v-model="raceFilter" class="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-600">
                  <option value="Semua">Semua Bangsa</option>
                  <option v-for="r in dropdowns.races" :key="r" :value="r">{{ r }}</option>
                </select>

                <!-- Filter by Status -->
                <select v-model="statusFilter" class="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-600">
                  <option value="Semua">Semua Status</option>
                  <option v-for="st in dropdowns.statuses" :key="st" :value="st">{{ st }}</option>
                </select>

                <button
                  @click="openAddRecordModal()"
                  type="button"
                  class="px-4 py-2 rounded-xl bg-[#0176d3] hover:bg-[#0160ad] text-white font-semibold text-xs sm:text-sm shadow-sm transition"
                >
                  ＋ Add Record Pelanggan
                </button>
              </div>
            </div>

            <!-- Customer Records Table -->
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th class="py-3.5 px-4">Pelanggan (Klik Nama)</th>
                      <th class="py-3.5 px-4">No. K/P & Jantina</th>
                      <th class="py-3.5 px-4">Telefon & E-mel</th>
                      <th class="py-3.5 px-4">Application ID</th>
                      <th class="py-3.5 px-4">Jumlah Pinjaman</th>
                      <th class="py-3.5 px-4">Apply / End Date</th>
                      <th class="py-3.5 px-4">Bank / E-Wallet Lokal</th>
                      <th class="py-3.5 px-4">Rujukan (Reference)</th>
                      <th class="py-3.5 px-4 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-xs sm:text-sm">
                    <tr v-if="filteredCustomers.length === 0">
                      <td colspan="9" class="py-12 text-center text-slate-500">
                        Tiada rekod pelanggan ditemui. Sila ubah carian atau klik <b>+ Add Record Pelanggan</b>.
                      </td>
                    </tr>
                    <tr
                      v-for="cust in filteredCustomers"
                      :key="cust.id"
                      class="hover:bg-blue-50/40 transition"
                    >
                      <td class="py-3.5 px-4">
                        <div class="flex items-center gap-3">
                          <img
                            :src="cust.avatar"
                            :alt="cust.fullName"
                            @click="openCustomerPopup(cust, false)"
                            class="w-11 h-11 rounded-full object-cover border-2 border-blue-100 cursor-pointer hover:scale-105 transition flex-shrink-0"
                          />
                          <div>
                            <button
                              @click="openCustomerPopup(cust, false)"
                              type="button"
                              class="font-bold text-[#0176d3] hover:text-[#032d60] hover:underline text-left block text-sm"
                            >
                              {{ cust.fullName }}
                            </button>
                            <div class="flex items-center gap-1.5 mt-0.5">
                              <span class="px-2 py-0.2 rounded bg-slate-100 text-slate-600 text-[11px] font-medium">{{ cust.race }}</span>
                              <span :class="statusBadgeClass(cust.status)" class="px-2 py-0.2 rounded-full text-[10px] font-bold">{{ cust.status }}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="py-3.5 px-4">
                        <div class="font-mono font-semibold text-slate-800">{{ cust.icNumber }}</div>
                        <div class="text-xs text-slate-500">{{ cust.gender }}</div>
                      </td>
                      <td class="py-3.5 px-4">
                        <div class="font-medium text-slate-800">{{ cust.phone }}</div>
                        <div class="text-xs text-slate-500 truncate max-w-[160px]">{{ cust.email }}</div>
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="font-mono text-xs font-bold px-2 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          {{ cust.applicationId }}
                        </span>
                        <div class="text-[11px] text-slate-400 mt-1" title="Timesheet Date & Time">
                          🕒 {{ formatDateTime(cust.timesheetDateTime) }}
                        </div>
                      </td>
                      <td class="py-3.5 px-4">
                        <div class="font-extrabold text-slate-900 text-sm">RM {{ formatCurrency(cust.amount) }}</div>
                      </td>
                      <td class="py-3.5 px-4 text-xs">
                        <div><span class="text-slate-400">Mohon:</span> <span class="font-semibold text-slate-700">{{ cust.applyDate }}</span></div>
                        <div><span class="text-slate-400">Tamat:</span> <span class="font-semibold text-slate-700">{{ cust.endDate }}</span></div>
                      </td>
                      <td class="py-3.5 px-4">
                        <div class="font-bold text-slate-800 text-xs">{{ cust.bankDetails.bankName }}</div>
                        <div class="font-mono text-xs text-slate-500">{{ cust.bankDetails.accountNo }}</div>
                      </td>
                      <td class="py-3.5 px-4 text-xs">
                        <div class="font-semibold text-slate-800">{{ cust.reference.fullName }}</div>
                        <div class="text-slate-500">{{ cust.reference.relationship }} • {{ cust.reference.phone }}</div>
                      </td>
                      <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                        <button
                          @click="openCustomerPopup(cust, false)"
                          type="button"
                          class="px-3 py-1.5 rounded-lg bg-[#0176d3] hover:bg-[#0160ad] text-white font-semibold text-xs shadow-sm transition"
                        >
                          Popup Penuh
                        </button>
                        <button
                          @click="openCustomerPopup(cust, true)"
                          type="button"
                          class="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-xs transition"
                        >
                          Edit Manual
                        </button>
                        <button
                          @click="confirmDeleteCustomer(cust)"
                          type="button"
                          class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="Padam Rekod"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- VIEW 3: ADD / EDIT RECORD PELANGGAN FULL PAGE FORM        -->
          <!-- ========================================================= -->
          <div v-if="activeView === 'add-record'" class="max-w-5xl mx-auto space-y-6">
            <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#0176d3]">Borang Pendaftaran Pinjaman CRM</span>
                <h1 class="text-xl font-extrabold text-slate-900 mt-0.5">Tambah Rekod Pelanggan & Pinjaman Baharu</h1>
              </div>
              <button @click="activeView = 'customers'" type="button" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
                ← Kembali ke Senarai
              </button>
            </div>

            <form @submit.prevent="submitNewRecordPage" class="space-y-6">
              <!-- SECTION 1: BAHAGIAN DATABASE PELANGGAN -->
              <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                    <h2 class="text-base font-bold text-slate-900">Bahagian Database Pelanggan & Maklumat Pinjaman</h2>
                  </div>
                  <span class="text-xs text-slate-400">Semua medan boleh diedit secara manual</span>
                </div>

                <!-- Avatar Upload Row -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <img :src="newRecord.avatar" alt="Preview Avatar" class="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-sm bg-white" />
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Avatar (Gambar Muka Pelanggan - Upload File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleAvatarUpload($event, newRecord)"
                      class="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0176d3] file:text-white hover:file:bg-[#0160ad] cursor-pointer"
                    />
                    <p class="text-[11px] text-slate-500">Sokongan format JPG, PNG atau WEBP. Gambar akan dipaparkan terus pada profil & popup pelanggan.</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Penuh *</label>
                    <input v-model="newRecord.fullName" type="text" required placeholder="Contoh: Ahmad Danial Bin Razak" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">No. K/P *</label>
                    <input v-model="newRecord.icNumber" type="text" required placeholder="Contoh: 920415-10-5431" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone (No. Telefon) *</label>
                    <input v-model="newRecord.phone" type="text" required placeholder="Contoh: +6012-384 9921" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">E-mel *</label>
                    <input v-model="newRecord.email" type="email" required placeholder="pelanggan@emel.com" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jantina (Dropdown)</label>
                    <select v-model="newRecord.gender" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="g in dropdowns.genders" :key="g" :value="g">{{ g }}</option>
                    </select>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="block text-xs font-bold text-slate-700 uppercase">Bangsa (Dropdown)</label>
                      <button @click="showSettingsModal = true" type="button" class="text-[11px] font-semibold text-[#0176d3] hover:underline">+ Edit Pilihan</button>
                    </div>
                    <select v-model="newRecord.race" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="r in dropdowns.races" :key="r" :value="r">{{ r }}</option>
                    </select>
                  </div>

                  <div class="sm:col-span-2 lg:col-span-3">
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Penuh *</label>
                    <textarea v-model="newRecord.address" rows="2" required placeholder="Nombor rumah, jalan, taman, poskod, bandar & negeri..." class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none"></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Application ID *</label>
                    <div class="flex gap-1.5">
                      <input v-model="newRecord.applicationId" type="text" required class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono" />
                      <button @click="newRecord.applicationId = generateAppId()" type="button" class="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700" title="Jana ID Baru">↻</button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (Jumlah Pinjaman RM) *</label>
                    <input v-model.number="newRecord.amount" type="number" step="0.01" required placeholder="10000" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-bold" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Status Pinjaman</label>
                    <select v-model="newRecord.status" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="st in dropdowns.statuses" :key="st" :value="st">{{ st }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Apply Date (Tarikh Mohon) *</label>
                    <input v-model="newRecord.applyDate" type="date" required class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">End Date (Tarikh Tamat) *</label>
                    <input v-model="newRecord.endDate" type="date" required class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Timesheet Date & Time *</label>
                    <input v-model="newRecord.timesheetDateTime" type="datetime-local" required class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>
                </div>
              </div>

              <!-- SECTION 2: CUSTOMER BANK DETAILS -->
              <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                    <h2 class="text-base font-bold text-slate-900">Customer Bank Details (Bank & E-Wallet Lokal Malaysia)</h2>
                  </div>
                  <button @click="newRecord.bankDetails.fullName = newRecord.fullName" type="button" class="text-xs font-semibold text-[#0176d3] hover:underline">
                    Salin Nama Pelanggan
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name (Nama Pemegang Akaun) *</label>
                    <input v-model="newRecord.bankDetails.fullName" type="text" required placeholder="Nama penuh mengikut bank" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Account No. (No. Akaun / E-Wallet) *</label>
                    <input v-model="newRecord.bankDetails.accountNo" type="text" required placeholder="Contoh: 7048291048" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono" />
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="block text-xs font-bold text-slate-700 uppercase">Bank / E-Wallet (Dropdown) *</label>
                      <button @click="showSettingsModal = true" type="button" class="text-[11px] font-semibold text-[#0176d3] hover:underline">+ Edit Bank</button>
                    </div>
                    <select v-model="newRecord.bankDetails.bankName" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="b in dropdowns.banks" :key="b" :value="b">{{ b }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- SECTION 3: REFERENCE SECTION -->
              <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                    <h2 class="text-base font-bold text-slate-900">Reference Section (Rujukan Pelanggan)</h2>
                  </div>
                  <button @click="showSettingsModal = true" type="button" class="text-xs font-semibold text-[#0176d3] hover:underline">
                    + Edit Senarai Hubungan
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Hubungan (Dropdown)</label>
                    <select v-model="newRecord.reference.relationship" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="rel in dropdowns.relationships" :key="rel" :value="rel">{{ rel }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">FullName (Nama Penuh Rujukan) *</label>
                    <input v-model="newRecord.reference.fullName" type="text" required placeholder="Nama penuh rujukan" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone (No. Telefon Rujukan) *</label>
                    <input v-model="newRecord.reference.phone" type="text" required placeholder="+6019-223 4412" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jantina (Dropdown)</label>
                    <select v-model="newRecord.reference.gender" class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
                      <option v-for="g in dropdowns.genders" :key="g" :value="g">{{ g }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end gap-3">
                <button @click="resetNewRecord()" type="button" class="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm">
                  Set Semula Borang
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0176d3] hover:bg-[#0160ad] text-white font-bold text-sm shadow-md transition">
                  💾 Simpan Rekod Pelanggan
                </button>
              </div>
            </form>
          </div>

          <!-- ========================================================= -->
          <!-- VIEW 4: ADMIN PANEL & CUSTOM DROPDOWN MANAGER             -->
          <!-- ========================================================= -->
          <div v-if="activeView === 'admin'" class="space-y-6">
            <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#0176d3]">LajuDana Admin Control Center</span>
                <h1 class="text-xl font-extrabold text-slate-900 mt-0.5">Admin Panel — Pengurusan Dropdown, Bank & Sistem</h1>
                <p class="text-xs sm:text-sm text-slate-500">Urus pilihan dropdown Bangsa, Bank/E-Wallet Lokal Malaysia, dan Hubungan Rujukan secara dinamik.</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="exportDatabaseJson()" type="button" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold">
                  ⬇️ Muat Turun Backup JSON
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Column 1: Bangsa Dropdown Editor -->
              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h2 class="text-base font-bold text-slate-900">1. Pilihan Dropdown Bangsa</h2>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{{ dropdowns.races.length }} pilihan</span>
                  </div>
                  <p class="text-xs text-slate-500 mb-4">Tambah, ubah atau padam senarai bangsa yang boleh dipilih pada profil pelanggan.</p>

                  <div class="flex gap-2 mb-4">
                    <input v-model="adminNewRace" @keyup.enter="addDropdownOption('races', adminNewRace); adminNewRace=''" type="text" placeholder="Tambah bangsa baharu..." class="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-600" />
                    <button @click="addDropdownOption('races', adminNewRace); adminNewRace=''" type="button" class="px-3.5 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold hover:bg-[#0160ad]">＋ Tambah</button>
                  </div>

                  <ul class="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                    <li v-for="(item, idx) in dropdowns.races" :key="idx" class="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <input
                        v-model="dropdowns.races[idx]"
                        @change="saveToStorage()"
                        type="text"
                        class="bg-transparent font-semibold text-slate-800 outline-none focus:bg-white focus:px-2 py-0.5 rounded flex-1 mr-2"
                      />
                      <button @click="removeDropdownOption('races', idx)" type="button" class="text-rose-500 hover:text-rose-700 font-bold px-1.5">✕</button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Column 2: Hubungan (Reference) Dropdown Editor -->
              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h2 class="text-base font-bold text-slate-900">2. Pilihan Dropdown Hubungan (Reference)</h2>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{{ dropdowns.relationships.length }} pilihan</span>
                  </div>
                  <p class="text-xs text-slate-500 mb-4">Klik pada teks untuk mengedit nama hubungan secara terus atau tambah pilihan baharu.</p>

                  <div class="flex gap-2 mb-4">
                    <input v-model="adminNewRelation" @keyup.enter="addDropdownOption('relationships', adminNewRelation); adminNewRelation=''" type="text" placeholder="Tambah hubungan baharu..." class="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-600" />
                    <button @click="addDropdownOption('relationships', adminNewRelation); adminNewRelation=''" type="button" class="px-3.5 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold hover:bg-[#0160ad]">＋ Tambah</button>
                  </div>

                  <ul class="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                    <li v-for="(item, idx) in dropdowns.relationships" :key="idx" class="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <input
                        v-model="dropdowns.relationships[idx]"
                        @change="saveToStorage()"
                        type="text"
                        class="bg-transparent font-semibold text-slate-800 outline-none focus:bg-white focus:px-2 py-0.5 rounded flex-1 mr-2"
                      />
                      <button @click="removeDropdownOption('relationships', idx)" type="button" class="text-rose-500 hover:text-rose-700 font-bold px-1.5">✕</button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Column 3: Bank & E-Wallet Lokal Malaysia Editor -->
              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h2 class="text-base font-bold text-slate-900">3. Senarai Bank & E-Wallet Malaysia</h2>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{{ dropdowns.banks.length }} saluran</span>
                  </div>
                  <p class="text-xs text-slate-500 mb-4">Senarai rasmi Bank & E-Wallet Lokal Malaysia (CIMB, Touch&Go, Boost, RHB, Hong Leong, dll.).</p>

                  <div class="flex gap-2 mb-4">
                    <input v-model="adminNewBank" @keyup.enter="addDropdownOption('banks', adminNewBank); adminNewBank=''" type="text" placeholder="Tambah Bank / E-Wallet..." class="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-600" />
                    <button @click="addDropdownOption('banks', adminNewBank); adminNewBank=''" type="button" class="px-3.5 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold hover:bg-[#0160ad]">＋ Tambah</button>
                  </div>

                  <ul class="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                    <li v-for="(item, idx) in dropdowns.banks" :key="idx" class="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <input
                        v-model="dropdowns.banks[idx]"
                        @change="saveToStorage()"
                        type="text"
                        class="bg-transparent font-semibold text-slate-800 outline-none focus:bg-white focus:px-2 py-0.5 rounded flex-1 mr-2"
                      />
                      <button @click="removeDropdownOption('banks', idx)" type="button" class="text-rose-500 hover:text-rose-700 font-bold px-1.5">✕</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <!-- ========================================================================= -->
      <!-- FULL CUSTOMER RECORD POPUP MODAL (Paparan Penuh & Edit Manual Pelanggan) -->
      <!-- ========================================================================= -->
      <div
        v-if="selectedCustomer"
        class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        @click.self="closeCustomerPopup()"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in">
          
          <!-- Popup Top Header Bar -->
          <div class="bg-gradient-to-r from-[#032d60] via-[#014486] to-[#0176d3] text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="relative group">
                <img
                  :src="isEditingPopup ? editBuffer.avatar : selectedCustomer.avatar"
                  :alt="selectedCustomer.fullName"
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-lg bg-white"
                />
                <label
                  v-if="isEditingPopup"
                  class="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center text-[10px] font-bold text-center cursor-pointer opacity-90 hover:opacity-100 transition p-1"
                >
                  <span>📷 Tukar Gambar</span>
                  <input type="file" accept="image/*" @change="handleAvatarUpload($event, editBuffer)" class="hidden" />
                </label>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/15 text-cyan-200">
                    {{ selectedCustomer.applicationId }}
                  </span>
                  <span :class="statusBadgeClass(selectedCustomer.status)" class="px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {{ selectedCustomer.status }}
                  </span>
                </div>
                <h2 class="text-lg sm:text-2xl font-extrabold tracking-tight mt-1">{{ selectedCustomer.fullName }}</h2>
                <p class="text-xs text-blue-100">No. K/P: <span class="font-mono font-semibold">{{ selectedCustomer.icNumber }}</span> • Telefon: {{ selectedCustomer.phone }}</p>
              </div>
            </div>

            <!-- Header Action Buttons: Toggle Manual Edit + Close Popup Button -->
            <div class="flex items-center gap-2 self-end sm:self-center">
              <button
                v-if="!isEditingPopup"
                @click="startPopupEdit()"
                type="button"
                class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm shadow transition flex items-center gap-1.5"
              >
                <span>✏️ Edit Manual Maklumat</span>
              </button>
              <button
                v-else
                @click="savePopupEdit()"
                type="button"
                class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow transition flex items-center gap-1.5"
              >
                <span>💾 Simpan Perubahan</span>
              </button>

              <!-- Close Button -->
              <button
                @click="closeCustomerPopup()"
                type="button"
                class="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
                title="Tutup Popup Pelanggan"
              >
                <span>✕ Tutup (Close)</span>
              </button>
            </div>
          </div>

          <!-- Popup Body Content (Scrollable) -->
          <div class="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-6 bg-slate-50 flex-1">
            
            <!-- VIEW MODE (READ-ONLY FULL DETAILS) -->
            <template v-if="!isEditingPopup">
              <!-- Highlight Loan Strip -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <div class="text-[11px] font-bold uppercase text-slate-400">Amount (Jumlah Pinjaman)</div>
                  <div class="text-lg sm:text-xl font-extrabold text-[#0176d3] mt-0.5">RM {{ formatCurrency(selectedCustomer.amount) }}</div>
                </div>
                <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <div class="text-[11px] font-bold uppercase text-slate-400">Apply Date (Tarikh Mohon)</div>
                  <div class="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{{ selectedCustomer.applyDate }}</div>
                </div>
                <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <div class="text-[11px] font-bold uppercase text-slate-400">End Date (Tarikh Tamat)</div>
                  <div class="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{{ selectedCustomer.endDate }}</div>
                </div>
                <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <div class="text-[11px] font-bold uppercase text-slate-400">Timesheet Date & Time</div>
                  <div class="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{{ formatDateTime(selectedCustomer.timesheetDateTime) }}</div>
                </div>
              </div>

              <!-- 1. Bahagian Database Pelanggan -->
              <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h3 class="text-sm font-extrabold uppercase tracking-wider text-[#032d60] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-md bg-blue-100 text-[#0176d3] flex items-center justify-center text-xs">1</span>
                    <span>Bahagian Database Pelanggan (Customer & Loan Details)</span>
                  </h3>
                  <button @click="startPopupEdit()" type="button" class="text-xs font-semibold text-[#0176d3] hover:underline">Edit Bahagian Ini</button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Nama Penuh</div>
                    <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.fullName }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">No. K/P</div>
                    <div class="font-mono font-bold text-slate-900 mt-0.5">{{ selectedCustomer.icNumber }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">No. Telefon (Phone)</div>
                    <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.phone }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">E-mel</div>
                    <div class="font-semibold text-slate-900 mt-0.5">{{ selectedCustomer.email }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Jantina</div>
                    <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.gender }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Bangsa</div>
                    <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.race }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60 sm:col-span-2 lg:col-span-3">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Alamat</div>
                    <div class="font-semibold text-slate-900 mt-0.5">{{ selectedCustomer.address }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Application ID</div>
                    <div class="font-mono font-bold text-blue-700 mt-0.5">{{ selectedCustomer.applicationId }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Amount (Pinjaman)</div>
                    <div class="font-extrabold text-emerald-700 mt-0.5">RM {{ formatCurrency(selectedCustomer.amount) }}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div class="text-[11px] font-bold uppercase text-slate-400">Timesheet Date & Time</div>
                    <div class="font-semibold text-slate-900 mt-0.5">{{ formatDateTime(selectedCustomer.timesheetDateTime) }}</div>
                  </div>
                </div>
              </div>

              <!-- 2. Customer Bank Details & 3. Reference Section -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Customer Bank Details -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 class="text-sm font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                      <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">2</span>
                      <span>Customer Bank Details (Lokal Malaysia)</span>
                    </h3>
                  </div>
                  <div class="space-y-3 text-sm">
                    <div class="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Bank / E-Wallet Lokal Malaysia</div>
                      <div class="font-extrabold text-emerald-950 text-base mt-0.5">{{ selectedCustomer.bankDetails.bankName }}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Full Name (Nama Pemegang Akaun)</div>
                      <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.bankDetails.fullName }}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Account No. (Nombor Akaun / E-Wallet)</div>
                      <div class="font-mono font-bold text-slate-900 text-base mt-0.5">{{ selectedCustomer.bankDetails.accountNo }}</div>
                    </div>
                  </div>
                </div>

                <!-- Reference Section -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 class="text-sm font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-2">
                      <span class="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-xs">3</span>
                      <span>Reference Section (Rujukan Kecemasan)</span>
                    </h3>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div class="p-3 rounded-xl bg-purple-50/50 border border-purple-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Hubungan (Relationship)</div>
                      <div class="font-extrabold text-purple-950 mt-0.5">{{ selectedCustomer.reference.relationship }}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">FullName (Nama Rujukan)</div>
                      <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.reference.fullName }}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Phone (Telefon Rujukan)</div>
                      <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.reference.phone }}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div class="text-[11px] font-bold uppercase text-slate-400">Jantina</div>
                      <div class="font-bold text-slate-900 mt-0.5">{{ selectedCustomer.reference.gender }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- MANUAL EDIT MODE INSIDE POPUP -->
            <template v-else>
              <form @submit.prevent="savePopupEdit()" class="space-y-6">
                <!-- Edit 1. Database Pelanggan -->
                <div class="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-4">
                  <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <h3 class="text-sm font-extrabold uppercase text-[#0176d3]">1. Edit Manual Maklumat Pelanggan & Pinjaman</h3>
                    <div class="flex items-center gap-2">
                      <label class="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0176d3] text-xs font-bold cursor-pointer">
                        📷 Muat Naik Gambar Avatar Baru
                        <input type="file" accept="image/*" @change="handleAvatarUpload($event, editBuffer)" class="hidden" />
                      </label>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Penuh</label>
                      <input v-model="editBuffer.fullName" type="text" required class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">No. K/P</label>
                      <input v-model="editBuffer.icNumber" type="text" required class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono focus:border-blue-600 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                      <input v-model="editBuffer.phone" type="text" required class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">E-mel</label>
                      <input v-model="editBuffer.email" type="email" required class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jantina (Dropdown)</label>
                      <select v-model="editBuffer.gender" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="g in dropdowns.genders" :key="g" :value="g">{{ g }}</option>
                      </select>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-slate-700 uppercase">Bangsa (Dropdown)</label>
                        <button @click="showInlineRaceAdd = !showInlineRaceAdd" type="button" class="text-[11px] font-bold text-[#0176d3] hover:underline">+ Tambah/Edit</button>
                      </div>
                      <select v-model="editBuffer.race" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="r in dropdowns.races" :key="r" :value="r">{{ r }}</option>
                      </select>
                      <div v-if="showInlineRaceAdd" class="mt-2 flex gap-1.5">
                        <input v-model="inlineNewRace" type="text" placeholder="Bangsa baharu..." class="flex-1 px-2.5 py-1 text-xs rounded border border-blue-300" />
                        <button @click="if(inlineNewRace){ addDropdownOption('races', inlineNewRace); editBuffer.race = inlineNewRace.trim(); inlineNewRace=''; showInlineRaceAdd=false; }" type="button" class="px-2.5 py-1 bg-[#0176d3] text-white text-xs rounded font-semibold">Simpan</button>
                      </div>
                    </div>
                    <div class="sm:col-span-2 lg:col-span-3">
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat</label>
                      <textarea v-model="editBuffer.address" rows="2" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 outline-none"></textarea>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Application ID</label>
                      <input v-model="editBuffer.applicationId" type="text" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (RM)</label>
                      <input v-model.number="editBuffer.amount" type="number" step="0.01" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-bold" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Status Pinjaman</label>
                      <select v-model="editBuffer.status" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="st in dropdowns.statuses" :key="st" :value="st">{{ st }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Apply Date</label>
                      <input v-model="editBuffer.applyDate" type="date" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">End Date</label>
                      <input v-model="editBuffer.endDate" type="date" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Timesheet Date & Time</label>
                      <input v-model="editBuffer.timesheetDateTime" type="datetime-local" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                  </div>
                </div>

                <!-- Edit 2. Customer Bank Details -->
                <div class="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
                  <h3 class="text-sm font-extrabold uppercase text-emerald-800 border-b border-slate-200 pb-2">2. Edit Customer Bank Details</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name (Pemegang Akaun)</label>
                      <input v-model="editBuffer.bankDetails.fullName" type="text" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Account No.</label>
                      <input v-model="editBuffer.bankDetails.accountNo" type="text" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Bank / E-Wallet Lokal (Dropdown)</label>
                      <select v-model="editBuffer.bankDetails.bankName" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="b in dropdowns.banks" :key="b" :value="b">{{ b }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Edit 3. Reference Section -->
                <div class="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm space-y-4">
                  <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 class="text-sm font-extrabold uppercase text-purple-900">3. Edit Reference Section (Rujukan)</h3>
                    <button @click="showInlineRelAdd = !showInlineRelAdd" type="button" class="text-xs font-bold text-[#0176d3] hover:underline">+ Tambah/Edit Pilihan Hubungan</button>
                  </div>
                  <div v-if="showInlineRelAdd" class="flex gap-2 p-2.5 bg-purple-50 rounded-xl border border-purple-200">
                    <input v-model="inlineNewRel" type="text" placeholder="Taip hubungan baru (cth: Sepupu / Penyelia)..." class="flex-1 px-3 py-1.5 text-xs rounded-lg border border-purple-300" />
                    <button @click="if(inlineNewRel){ addDropdownOption('relationships', inlineNewRel); editBuffer.reference.relationship = inlineNewRel.trim(); inlineNewRel=''; showInlineRelAdd=false; }" type="button" class="px-3 py-1.5 bg-purple-700 text-white text-xs font-bold rounded-lg">Tambah & Pilih</button>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Hubungan (Dropdown)</label>
                      <select v-model="editBuffer.reference.relationship" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="rel in dropdowns.relationships" :key="rel" :value="rel">{{ rel }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">FullName</label>
                      <input v-model="editBuffer.reference.fullName" type="text" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                      <input v-model="editBuffer.reference.phone" type="text" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jantina (Dropdown)</label>
                      <select v-model="editBuffer.reference.gender" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
                        <option v-for="g in dropdowns.genders" :key="g" :value="g">{{ g }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </div>

          <!-- Popup Bottom Footer -->
          <div class="bg-white border-t border-slate-200 px-5 py-3.5 flex items-center justify-between">
            <div class="text-xs text-slate-500">
              LajuDana CRM • Rekod ID: <span class="font-mono font-bold text-slate-700">{{ selectedCustomer.applicationId }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <button
                v-if="isEditingPopup"
                @click="isEditingPopup = false"
                type="button"
                class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm"
              >
                Batal Edit
              </button>
              <button
                v-if="isEditingPopup"
                @click="savePopupEdit()"
                type="button"
                class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow"
              >
                💾 Simpan Perubahan Manual
              </button>
              <button
                @click="closeCustomerPopup()"
                type="button"
                class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition"
              >
                Tutup Popup (Close)
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- SETTINGS MODAL (Tetapan Sistem & Urus Dropdown)                           -->
      <!-- ========================================================================= -->
      <div
        v-if="showSettingsModal"
        class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="showSettingsModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-200 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="text-xl">⚙️</span>
              <div>
                <h3 class="text-base font-extrabold text-slate-900">Tetapan LajuDana CRM (powered by SoBot)</h3>
                <p class="text-xs text-slate-500">Ubah suai pilihan dropdown Bangsa, Hubungan Reference & Bank Malaysia</p>
              </div>
            </div>
            <button @click="showSettingsModal = false" type="button" class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700">✕ Tutup</button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Tambah Pilihan Bangsa Baharu</label>
              <div class="flex gap-2">
                <input v-model="adminNewRace" type="text" placeholder="Contoh: Bumiputera Sabah / Punjabi" class="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300" />
                <button @click="addDropdownOption('races', adminNewRace); adminNewRace=''" type="button" class="px-4 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold">Tambah</button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Tambah Pilihan Hubungan (Reference Section)</label>
              <div class="flex gap-2">
                <input v-model="adminNewRelation" type="text" placeholder="Contoh: Bapa Mertua / Rakan Niaga" class="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300" />
                <button @click="addDropdownOption('relationships', adminNewRelation); adminNewRelation=''" type="button" class="px-4 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold">Tambah</button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Tambah Bank / E-Wallet Lokal Malaysia</label>
              <div class="flex gap-2">
                <input v-model="adminNewBank" type="text" placeholder="Contoh: GXBANK BERHAD / BOOST BANK" class="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300" />
                <button @click="addDropdownOption('banks', adminNewBank); adminNewBank=''" type="button" class="px-4 py-2 rounded-lg bg-[#0176d3] text-white text-xs font-bold">Tambah</button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-200">
            <button @click="activeView = 'admin'; showSettingsModal = false" type="button" class="text-xs font-bold text-[#0176d3] hover:underline">
              Buka Admin Panel Penuh →
            </button>
            <button @click="showSettingsModal = false" type="button" class="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">
              Selesai
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- LOGOUT CONFIRMATION MODAL                                                 -->
      <!-- ========================================================================= -->
      <div
        v-if="showLogoutConfirm"
        class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="showLogoutConfirm = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center space-y-4">
          <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
            🚪
          </div>
          <h3 class="text-lg font-extrabold text-slate-900">Log Keluar dari LajuDana CRM?</h3>
          <p class="text-xs text-slate-500">Semua perubahan data pelanggan telah disimpan secara automatik. Anda boleh log masuk semula pada bila-bila masa.</p>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button @click="showLogoutConfirm = false" type="button" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs">
              Batal
            </button>
            <button @click="confirmLogout()" type="button" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow">
              Ya, Log Out Sekarang
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- DELETE CONFIRMATION MODAL                                                 -->
      <!-- ========================================================================= -->
      <div
        v-if="customerToDelete"
        class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="customerToDelete = null"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center space-y-4">
          <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
            🗑️
          </div>
          <h3 class="text-base font-extrabold text-slate-900">Padam Rekod Pelanggan?</h3>
          <p class="text-xs text-slate-500">Adakah anda pasti mahu memadam rekod <b>{{ customerToDelete.fullName }}</b> ({{ customerToDelete.applicationId }})?</p>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button @click="customerToDelete = null" type="button" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs">
              Batal
            </button>
            <button @click="deleteCustomerNow()" type="button" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow">
              Padam Rekod
            </button>
          </div>
        </div>
      </div>
    </template>
  
  </div>
</template>

<script>
const DEFAULT_AVATARS = [
  "https://ui-avatars.com/api/?name=Muhammad+Farid&background=0176d3&color=fff",
  "https://ui-avatars.com/api/?name=Chloe+Lim&background=032d60&color=fff",
  "https://ui-avatars.com/api/?name=Arvind+Kumar&background=014486&color=fff"
];

export default {
      data() {
        return {
          isAuthenticated: true,
          sidebarOpen: true,
          activeView: 'dashboard',
          searchQuery: '',
          statusFilter: 'Semua',
          raceFilter: 'Semua',
          toastMessage: '',
          showSettingsModal: false,
          showLogoutConfirm: false,
          customerToDelete: null,

          // Popup state
          selectedCustomer: null,
          isEditingPopup: false,
          editBuffer: null,
          showInlineRaceAdd: false,
          inlineNewRace: '',
          showInlineRelAdd: false,
          inlineNewRel: '',

          // Quick / Admin inputs
          quickNewRace: '',
          quickNewRelation: '',
          adminNewRace: '',
          adminNewRelation: '',
          adminNewBank: '',

          loginForm: {
            username: 'admin@lajudana.com.my',
            password: 'password123'
          },

          currentAdmin: {
            name: 'Pentadbir Utama LajuDana',
            role: 'Super Admin • SoBot Engine'
          },

          dropdowns: {
            genders: ['Lelaki', 'Perempuan'],
            races: [
              'Melayu',
              'Cina',
              'India',
              'Bumiputera Sabah',
              'Bumiputera Sarawak',
              'Lain-lain'
            ],
            banks: [
              'CIMB BANK BERHAD',
              'TOUCH&GO',
              'BOOST APP MALAYSIA',
              'RHB BERHAD',
              'HONG LEONG BERHAD',
              'MAYBANK BERHAD',
              'PUBLIC BANK BERHAD',
              'BANK ISLAM MALAYSIA BERHAD',
              'AMBANK BERHAD',
              'BANK RAKYAT',
              'BSN (BANK SIMPANAN NASIONAL)',
              'AFFIN BANK BERHAD',
              'ALLIANCE BANK BERHAD',
              'BANK MUAMALAT MALAYSIA BERHAD',
              'GRABPAY MALAYSIA',
              'SHOPEEPAY MALAYSIA',
              'MAE BY MAYBANK2U',
              'BIGPAY MALAYSIA'
            ],
            relationships: [
              'Pasangan (Suami / Isteri)',
              'Bapa',
              'Ibu',
              'Adik-Beradik',
              'Saudara-Mara',
              'Rakan Sekerja',
              'Majikan',
              'Penjaga',
              'Lain-lain'
            ],
            statuses: [
              'Diluluskan',
              'Aktif',
              'Dalam Semakan',
              'Selesai',
              'Tunggakan'
            ]
          },

          customers: [
            {
              id: 'cust-1',
              avatar: DEFAULT_AVATARS[0],
              fullName: 'Muhammad Farid Bin Kamarudin',
              icNumber: '910812-14-5639',
              phone: '+6012-348 9102',
              address: 'No. 24, Jalan Setiawangsa 11, Taman Setiawangsa, 54200 Kuala Lumpur',
              email: 'farid.kamarudin@gmail.com',
              gender: 'Lelaki',
              race: 'Melayu',
              applicationId: 'LD-2026-00104',
              amount: 15000,
              applyDate: '2026-10-15',
              endDate: '2027-10-15',
              timesheetDateTime: '2026-10-15T10:30',
              status: 'Aktif',
              bankDetails: {
                fullName: 'MUHAMMAD FARID BIN KAMARUDIN',
                accountNo: '7058392018',
                bankName: 'CIMB BANK BERHAD'
              },
              reference: {
                relationship: 'Pasangan (Suami / Isteri)',
                fullName: 'Nurul Huda Binti Zainal',
                phone: '+6013-998 2310',
                gender: 'Perempuan'
              }
            },
            {
              id: 'cust-2',
              avatar: DEFAULT_AVATARS[1],
              fullName: 'Chloe Lim Mei Ling',
              icNumber: '950322-07-4128',
              phone: '+6016-772 8834',
              address: 'B-18-05, Residensi Gurney, Persiaran Gurney, 10250 George Town, Pulau Pinang',
              email: 'chloelim.ml@yahoo.com',
              gender: 'Perempuan',
              race: 'Cina',
              applicationId: 'LD-2026-00108',
              amount: 25000,
              applyDate: '2026-10-22',
              endDate: '2028-04-22',
              timesheetDateTime: '2026-10-22T14:45',
              status: 'Diluluskan',
              bankDetails: {
                fullName: 'CHLOE LIM MEI LING',
                accountNo: '104928374612',
                bankName: 'HONG LEONG BERHAD'
              },
              reference: {
                relationship: 'Bapa',
                fullName: 'Lim Kah Wai',
                phone: '+6012-450 9912',
                gender: 'Lelaki'
              }
            },
            {
              id: 'cust-3',
              avatar: DEFAULT_AVATARS[2],
              fullName: 'Arvind Kumar A/L Subramaniam',
              icNumber: '881104-10-6781',
              phone: '+6017-601 4459',
              address: 'No. 12, Lorong Batu Nilam 5B, Bandar Bukit Tinggi, 41200 Klang, Selangor',
              email: 'arvind.subra88@gmail.com',
              gender: 'Lelaki',
              race: 'India',
              applicationId: 'LD-2026-00115',
              amount: 8500,
              applyDate: '2026-11-01',
              endDate: '2027-05-01',
              timesheetDateTime: '2026-11-01T09:15',
              status: 'Dalam Semakan',
              bankDetails: {
                fullName: 'ARVIND KUMAR A/L SUBRAMANIAM',
                accountNo: '60176014459',
                bankName: 'TOUCH&GO'
              },
              reference: {
                relationship: 'Adik-Beradik',
                fullName: 'Kavitha A/P Subramaniam',
                phone: '+6014-332 8711',
                gender: 'Perempuan'
              }
            },
            {
              id: 'cust-4',
              avatar: DEFAULT_AVATARS[0],
              fullName: 'Mohd Syafiq Bin Roslan',
              icNumber: '940619-01-5217',
              phone: '+6019-741 3092',
              address: 'No. 55, Jalan Padi Emas 4/2, Bandar Baru Uda, 81200 Johor Bahru, Johor',
              email: 'syafiq.roslan@outlook.com',
              gender: 'Lelaki',
              race: 'Melayu',
              applicationId: 'LD-2026-00119',
              amount: 5000,
              applyDate: '2026-11-02',
              endDate: '2027-05-02',
              timesheetDateTime: '2026-11-02T16:20',
              status: 'Diluluskan',
              bankDetails: {
                fullName: 'MOHD SYAFIQ BIN ROSLAN',
                accountNo: '214098371920',
                bankName: 'RHB BERHAD'
              },
              reference: {
                relationship: 'Ibu',
                fullName: 'Zaiton Binti Ahmad',
                phone: '+6013-778 1209',
                gender: 'Perempuan'
              }
            },
            {
              id: 'cust-5',
              avatar: DEFAULT_AVATARS[1],
              fullName: 'Natasha Lyana Binti Mazlan',
              icNumber: '970128-12-6044',
              phone: '+6011-2890 4412',
              address: 'Lot 88, Taman Kingfisher Sulaman, 88450 Kota Kinabalu, Sabah',
              email: 'natasha.lyana@gmail.com',
              gender: 'Perempuan',
              race: 'Bumiputera Sabah',
              applicationId: 'LD-2026-00124',
              amount: 3500,
              applyDate: '2026-11-03',
              endDate: '2027-02-03',
              timesheetDateTime: '2026-11-03T11:40',
              status: 'Aktif',
              bankDetails: {
                fullName: 'NATASHA LYANA BINTI MAZLAN',
                accountNo: '601128904412',
                bankName: 'BOOST APP MALAYSIA'
              },
              reference: {
                relationship: 'Rakan Sekerja',
                fullName: 'Farah Nadia Binti Karim',
                phone: '+6016-881 9043',
                gender: 'Perempuan'
              }
            }
          ],

          newRecord: null
        };
      },

      computed: {
        navTabs() {
          return [
            { id: 'dashboard', label: 'Navigator Dashboard', icon: '📊' },
            { id: 'customers', label: 'Customer & Loan Record', icon: '👥', badge: this.customers.length },
            { id: 'add-record', label: 'Add Record Pelanggan', icon: '➕' },
            { id: 'admin', label: 'Admin Panel (Dropdown & Bank)', icon: '🛡️' }
          ];
        },

        filteredCustomers() {
          const q = this.searchQuery.trim().toLowerCase();
          return this.customers.filter(c => {
            const matchStatus = this.statusFilter === 'Semua' || c.status === this.statusFilter;
            const matchRace = this.raceFilter === 'Semua' || c.race === this.raceFilter;
            const matchQuery = !q || [
              c.fullName,
              c.icNumber,
              c.phone,
              c.email,
              c.applicationId,
              c.bankDetails.bankName,
              c.bankDetails.accountNo,
              c.reference.fullName
            ].some(val => String(val || '').toLowerCase().includes(q));
            return matchStatus && matchRace && matchQuery;
          });
        },

        totalLoanAmount() {
          return this.customers.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
        },

        averageLoanAmount() {
          if (!this.customers.length) return 0;
          return this.totalLoanAmount / this.customers.length;
        },

        activeOrApprovedCount() {
          return this.customers.filter(c => c.status === 'Aktif' || c.status === 'Diluluskan').length;
        },

        bankDistribution() {
          const counts = {};
          this.customers.forEach(c => {
            const b = c.bankDetails.bankName || 'Lain-lain';
            counts[b] = (counts[b] || 0) + 1;
          });
          const total = this.customers.length || 1;
          return Object.keys(counts).map(bank => ({
            bank,
            count: counts[bank],
            percent: Math.round((counts[bank] / total) * 100)
          })).sort((a, b) => b.count - a.count);
        }
      },

      created() {
        this.loadFromStorage();
        this.resetNewRecord();
      },

      methods: {
        generateAppId() {
          const rand = Math.floor(100 + Math.random() * 900);
          return `LD-2026-00${rand}`;
        },

        resetNewRecord() {
          const nowIso = new Date().toISOString().slice(0, 16);
          const today = new Date().toISOString().slice(0, 10);
          this.newRecord = {
            avatar: DEFAULT_AVATARS[0],
            fullName: '',
            icNumber: '',
            phone: '',
            address: '',
            email: '',
            gender: 'Lelaki',
            race: this.dropdowns.races[0] || 'Melayu',
            applicationId: this.generateAppId(),
            amount: 10000,
            applyDate: today,
            endDate: '2027-11-03',
            timesheetDateTime: nowIso,
            status: 'Dalam Semakan',
            bankDetails: {
              fullName: '',
              accountNo: '',
              bankName: 'CIMB BANK BERHAD'
            },
            reference: {
              relationship: this.dropdowns.relationships[0] || 'Pasangan (Suami / Isteri)',
              fullName: '',
              phone: '',
              gender: 'Perempuan'
            }
          };
        },

        openAddRecordModal() {
          this.resetNewRecord();
          this.activeView = 'add-record';
        },

        handleAvatarUpload(event, targetObj) {
          const file = event.target.files && event.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (e) => {
            targetObj.avatar = e.target.result;
            this.showToast('Gambar avatar pelanggan berjaya dimuat naik!');
          };
          reader.readAsDataURL(file);
        },

        submitNewRecordPage() {
          const recordCopy = JSON.parse(JSON.stringify(this.newRecord));
          recordCopy.id = 'cust-' + Date.now();
          if (!recordCopy.bankDetails.fullName) {
            recordCopy.bankDetails.fullName = recordCopy.fullName.toUpperCase();
          }
          this.customers.unshift(recordCopy);
          this.saveToStorage();
          this.showToast(`Rekod pelanggan "${recordCopy.fullName}" (${recordCopy.applicationId}) telah ditambah!`);
          this.activeView = 'customers';
          this.openCustomerPopup(recordCopy, false);
        },

        openCustomerPopup(cust, startInEditMode = false) {
          this.selectedCustomer = cust;
          this.isEditingPopup = false;
          this.showInlineRaceAdd = false;
          this.showInlineRelAdd = false;
          if (startInEditMode) {
            this.startPopupEdit();
          }
        },

        startPopupEdit() {
          if (!this.selectedCustomer) return;
          this.editBuffer = JSON.parse(JSON.stringify(this.selectedCustomer));
          this.isEditingPopup = true;
        },

        savePopupEdit() {
          if (!this.selectedCustomer || !this.editBuffer) return;
          const idx = this.customers.findIndex(c => c.id === this.selectedCustomer.id);
          if (idx !== -1) {
            this.customers.splice(idx, 1, JSON.parse(JSON.stringify(this.editBuffer)));
            this.selectedCustomer = this.customers[idx];
          }
          this.isEditingPopup = false;
          this.saveToStorage();
          this.showToast(`Maklumat pelanggan "${this.selectedCustomer.fullName}" berjaya dikemaskini!`);
        },

        closeCustomerPopup() {
          this.selectedCustomer = null;
          this.isEditingPopup = false;
          this.editBuffer = null;
        },

        confirmDeleteCustomer(cust) {
          this.customerToDelete = cust;
        },

        deleteCustomerNow() {
          if (!this.customerToDelete) return;
          const name = this.customerToDelete.fullName;
          this.customers = this.customers.filter(c => c.id !== this.customerToDelete.id);
          if (this.selectedCustomer && this.selectedCustomer.id === this.customerToDelete.id) {
            this.closeCustomerPopup();
          }
          this.customerToDelete = null;
          this.saveToStorage();
          this.showToast(`Rekod pelanggan "${name}" telah dipadam.`);
        },

        addDropdownOption(category, value) {
          const clean = String(value || '').trim();
          if (!clean) return;
          if (!this.dropdowns[category].includes(clean)) {
            this.dropdowns[category].push(clean);
            this.saveToStorage();
            this.showToast(`Pilihan "${clean}" telah ditambah ke dalam senarai dropdown.`);
          }
        },

        removeDropdownOption(category, index) {
          if (this.dropdowns[category].length <= 1) return;
          const removed = this.dropdowns[category].splice(index, 1);
          this.saveToStorage();
          this.showToast(`Pilihan "${removed[0]}" telah dikeluarkan.`);
        },

        formatCurrency(val) {
          const num = Number(val) || 0;
          return num.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },

        formatDateTime(dt) {
          if (!dt) return '-';
          return String(dt).replace('T', ' ');
        },

        statusBadgeClass(status) {
          switch (status) {
            case 'Diluluskan':
              return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
            case 'Aktif':
              return 'bg-blue-100 text-blue-800 border border-blue-200';
            case 'Dalam Semakan':
              return 'bg-amber-100 text-amber-800 border border-amber-200';
            case 'Tunggakan':
              return 'bg-rose-100 text-rose-800 border border-rose-200';
            default:
              return 'bg-slate-100 text-slate-700 border border-slate-200';
          }
        },

        showToast(msg) {
          this.toastMessage = msg;
          setTimeout(() => {
            if (this.toastMessage === msg) this.toastMessage = '';
          }, 4000);
        },

        confirmLogout() {
          this.showLogoutConfirm = false;
          this.selectedCustomer = null;
          this.isAuthenticated = false;
        },

        handleLogin() {
          this.isAuthenticated = true;
          this.showToast('Selamat kembali ke LajuDana CRM (powered by SoBot)!');
        },

        exportDatabaseJson() {
          const payload = {
            exportedAt: new Date().toISOString(),
            system: 'LajuDana CRM powered by SoBot',
            dropdowns: this.dropdowns,
            customers: this.customers
          };
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'lajudana-crm-database.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          this.showToast('Fail JSON pangkalan data pelanggan telah dimuat turun!');
        },

        saveToStorage() {
          try {
            localStorage.setItem('lajudana_crm_v1_dropdowns', JSON.stringify(this.dropdowns));
          } catch (e) {}
        },

        loadFromStorage() {
          try {
            const savedDropdowns = localStorage.getItem('lajudana_crm_v1_dropdowns');
            if (savedDropdowns) {
              this.dropdowns = Object.assign({}, this.dropdowns, JSON.parse(savedDropdowns));
            }
          } catch (e) {}
        }
      }
    }
</script>
