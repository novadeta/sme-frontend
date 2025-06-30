'use client'; // Menandakan ini Client Component, karena menggunakan useState dan useEffect
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Hook untuk navigasi programatik

// Definisi tipe konteks otentikasi
interface AuthContextType {
  token: string | null; // JWT token, null jika belum login
  login: (email: string, password: string) => Promise<void>; // Fungsi login
  register: (name: string, email: string, password: string, phone_number: string, role: string) => Promise<void>; // Fungsi register
  logout: () => void; // Fungsi logout
}

// Inisialisasi context dengan default kosong
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Provider komponen yang membungkus seluruh aplikasi
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null); // State menyimpan token
  const router = useRouter(); // Hook navigasi

  // useEffect dijalankan sekali saat mount untuk load token dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored); // Set token jika ada
  }, []);

  // Fungsi login: kirim email/password ke API, simpan token, redirect
  const login = async (email: string, password: string) => {
    const res = await fetch('https://3da8-2001-448a-3010-4eb2-71fe-9158-fa59-2da9.ngrok-free.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log('Status:', res.status); // <- Tambahkan ini
    console.log('Data:', data);
    console.log(data.user.id);
    if (res.status === 201 || res.status === 200) {
      if (localStorage.getItem('token') && localStorage.getItem('session_name') && localStorage.getItem('phone_number')) {
        localStorage.removeItem('token'); // Hapus dari localStorage
        localStorage.removeItem('session_name'); // Hapus dari localStorage
        localStorage.removeItem('phone_number'); // Hapus dari localStorage
        localStorage.removeItem('qr_image'); // Hapus dari localStorage
      } 
      setToken(data.user.id); // Simpan ke state
      localStorage.setItem('token', data.user.id); // Persist di browser
      localStorage.setItem('session_name', data.user.name )
      localStorage.setItem('phone_number', data.user.phone_number )
      router.push('/barGenerate'); // Navigasi ke dashboard setelah login sukses
    } else {
      throw new Error(data.message || 'Login failed'); // Lempar error jika gagal
    }
  };

  // Fungsi register: kirim data, lalu otomatis login jika sukses
  const register = async (name: string, email: string, password: string, phone_number: string, role: String) => {
    const res = await fetch('http://127.0.0.1:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone_number, role }),
    });
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      // Jika pendaftaran sukses, panggil login untuk autentikasi otomatis
      await login(email, password);
    } else {
      throw new Error(data.message || 'Register failed');
    }
  };

  // Fungsi logout: hapus token dan redirect ke halaman login
  const logout = () => {
    setToken(null); // Reset state
    localStorage.removeItem('token'); // Hapus dari localStorage
    router.push('/login'); // Arahkan ke login
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children} {/* Render aplikasi di dalam provider */}
    </AuthContext.Provider>
  );
}

// Custom Hook untuk mengakses konteks dengan mudah
export const useAuth = () => useContext(AuthContext);