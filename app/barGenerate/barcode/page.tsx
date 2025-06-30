'use client';
import { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
export default function Page() {
    const [qr, setQr] = useState<string | null>(null);

    useEffect(() => {
        const qrData = localStorage.getItem('qr_image');
        setQr(qrData);
    }, []);
    
    return(
        <>
        <Head>
            <title>Barcode</title>
        </Head>
        <main className="m-auto flex flex-col justify-center items-center w-screen h-screen">
            <h1 className="text-center mb-5">Scan QR Code</h1>
             {qr ? (
                <Image
                src={qr}
                alt="QR Code"
                width={200}
                height={200}
                className='mb-5'
            />
            ) : (
                <p className="text-gray-600">QR belum tersedia.</p>
            )}
            <h3 className='mb-3'>Jika Sudah berhasil Scan, Klik Tombol Lanjut</h3>
            <Link
            key={'chat_user'}
            href={'/chat'}
            className="bg-green-400 px-8 py-2 hover:bg-blue-800 rounded-xl"
            >
                <p className='font-bold'>Lanjut</p>
            </Link>
        </main>
        </>
    );
}