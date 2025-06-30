'use client';
import Link from 'next/link';
import clsx from 'clsx';
import Image from "next/image";
import { useState, useEffect } from 'react';

interface SalesContact {
  id: number;
  name: string;
  phone_number: string;
  created_at: string;
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function NavLinks() {
  const [contacts, setContacts] = useState<SalesContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('token'); 
    
    if (!userId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales/${userId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "69420"
        
      },
      method: 'GET'
    },
    ) 
      .then((res) => res.json())
      .then((data) => {
        setContacts(data); // Simpan hasil ke state
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        
        console.error('Error fetching contacts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading kontak...</p>;

  // const pathname = usePathname();
  return (
    <>
      {contacts.length === 0 ? (
        <p>Tidak ada Kontak</p>
      ) : (
        contacts.map((contact) => (
          <Link
            key={contact.id}
            href={{
              pathname: '/chat/detail',
              query: {
                sales_id: contact.id,
                name: contact.name, // optional: untuk ditampilkan di UI chat
              },
            }}
            className={clsx(
              "hover:bg-gray-400 p-[10px] border-y border-white/20",
              // {
              //   'bg-sky-100 text-blue-600': pathname === `/chat/detail?sales_id=${contact.id}&name=${contact.name}`,
              // }
            )}
            >
            <div className='flex gap-x-[15px]'>
                <Image
                className='rounded-full bg-gray-100 w-[40px] h-[40px]'
                src={'/profile/user.png'}   // bisa di public/
                alt="profile"
                width={40}
                height={0}
                />
                <div className='w-[85%] flex flex-col justify-center gap-y-1'>
                    <div className='flex justify-between'>
                        <h1 className='text-sm font-bold truncate'>{contact.name}</h1>
                        <p className='text-[10px] self-center'>{contact.created_at}</p>
                    </div>
                    <p className='text-xs truncate'>Klik Untuk Melihat Isi Pesan</p>
                </div>
            </div>
        </Link>
        ))
      )
    }
    </>
  );
}