const API_URL = '/api';
const getToken = () => localStorage.getItem('token');
const setToken = (v) => localStorage.setItem('token', v);
const clearToken = () => localStorage.removeItem('token');

async function apiFetch(endpoint, method='GET', body=null){
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  const token = getToken(); if(token) opts.headers.Authorization = `Bearer ${token}`;
  if(body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, opts);
    const payload = await res.json().catch(()=>null);

    if (!res.ok) {
      const isAuthAttempt = endpoint === '/auth/login' || endpoint === '/auth/admin-login';
      if (res.status === 401 && !isAuthAttempt) {
        clearToken();
        window.location.href = 'index.html';
        return { success: false, message: 'Unauthorized. Redirecting to login.' };
      }
      return payload || { success: false, message: `Server error ${res.status}` };
    }

    return payload || { success: false, message: 'Empty response from server' };
  } catch (error) {
    return { success: false, message: `Network error: ${error.message}` };
  }
}

async function apiUpload(endpoint, formData) {
  const token = getToken();
  const opts = { method: 'POST', body: formData, headers: {} };
  if (token) opts.headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}${endpoint}`, opts);
    const payload = await res.json().catch(()=>null);

    if (!res.ok) {
      if (res.status === 401) {
        clearToken();
        window.location.href = 'index.html';
        return { success: false, message: 'Unauthorized. Redirecting to login.' };
      }
      return payload || { success: false, message: `Server error ${res.status}` };
    }

    return payload || { success: false, message: 'Empty response from server' };
  } catch (error) {
    return { success: false, message: `Network error: ${error.message}` };
  }
}

function showMsg(el, msg, duration=4000){ 
  if(!el) return; 
  el.textContent = msg; 
  el.style.display = 'block';
  el.style.padding = '0.8rem';
  el.style.borderRadius = '6px';
  el.style.marginBottom = '1rem';
  el.style.backgroundColor = '#e8f5e9';
  el.style.color = '#2e7d32';
  el.style.border = '1px solid #c8e6c9';
  setTimeout(()=>{ el.textContent=''; el.style.display='none'; }, duration); 
}

function requireAuth(){ if(!getToken()){ window.location.href = 'index.html'; }}

function setData(name, data){ localStorage.setItem(name, JSON.stringify(data)); }
function getData(name){ const v = localStorage.getItem(name); return v ? JSON.parse(v) : null; }

function applyDarkMode(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.body.classList.toggle('dark-mode', !!isDark);
  document.querySelectorAll('[data-theme-label]').forEach((label) => {
    label.textContent = isDark ? 'Dark' : 'Light';
  });
  document.querySelectorAll('[data-theme-icon]').forEach((icon) => {
    icon.textContent = isDark ? 'D' : 'L';
  });
}

function createThemeToggle() {
  // Intentionally disabled globally.
  // Theme switching UI should only be added inside the dedicated Settings page.
}


function initDarkMode() {
  const storedPreference = localStorage.getItem('darkMode');
  const isDark = storedPreference === null ? true : storedPreference === 'true';
  applyDarkMode(isDark);
}


function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let overlay = document.getElementById('sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  let toggle = document.getElementById('sidebar-toggle');
  if (!toggle) {
    const mobileHeader = document.querySelector('.mobile-header');
    if (!mobileHeader) {
      const header = document.createElement('div');
      header.className = 'mobile-header';
      header.innerHTML = `
        <button id="sidebar-toggle" class="hamburger" type="button" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="logo-compact">NextMind</div>
      `;
      const target = document.querySelector('.main-content') || document.body.firstElementChild;
      if (target && target.parentNode) {
        target.parentNode.insertBefore(header, target);
      }
    }
    toggle = document.getElementById('sidebar-toggle');
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('sidebar-open');
  }

  if (toggle) toggle.onclick = openSidebar;
  if (overlay) overlay.onclick = closeSidebar;

  const navLinks = sidebar.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.onclick = () => closeSidebar();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });

  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initSidebar();
});

