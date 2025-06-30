'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { toast } from "react-toastify";

export default function Home() {
  const [formData, setFormData] = useState({
    user_id: '',
    session_name: '',
    phone_number: '',
  });
  const router = useRouter();

  useEffect(() => {
    // Ambil data dari localStorage saat komponen mount
    const user_id = localStorage.getItem('token') || '';
    const session_name = localStorage.getItem('session_name') || '';
    const phone_number = localStorage.getItem('phone_number') || '';

    setFormData({ user_id, session_name, phone_number });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/whatsapp/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('qr_image', data.qr); // simpan qr base64 di localStorage
        router.push('/barGenerate/barcode');
        toast.success('koneksi berhasil')
      } else {
        toast.error(data.message || 'Gagal konek');
      }
    } catch (err) {
      console.error('Gagal kirim data:', err);
      toast.error('Terjadi kesalahan')
    }
  };

  return (
    <main className="w-full h-screen">
      <form onSubmit={handleSubmit} className="w-full h-full flex">
        {/* Input tersembunyi */}
      <input type="hidden" name="user_id" value={formData.user_id} />
      <input type="hidden" name="session_name" value={formData.session_name} />
      <input type="hidden" name="phone_number" value={formData.phone_number} />
      <Button 
      className="w-52 flex m-auto bg-green-400"
      type="submit"
      >
        <p className="m-auto">Sign In To Whatsapp</p>
      </Button>
      </form>
    </main>
  );
}
