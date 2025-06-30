'use client'
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "./input";
import { Button } from "./button";
export default function ContactformContent() {
    const [idUser, setIdUser] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("token");
    if (storedId) {
      setIdUser(storedId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: idUser,
          sales_name: name,
          phone_number: phone,
        }),
      });

      const data = await res.json();
      if (res.status === 201 || res.status === 200) {
        toast.success("Kontak berhasil ditambahkan!");
        // kosongkan input
        setName("");
        setPhone("");
      } else {
        toast.error("Gagal menambahkan kontak: " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Terjadi kesalahan saat menambahkan kontak.");
    }
  };
    return (
        <>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Add Contact</h2>
        <form onSubmit={handleSubmit} method="post">
            <input type="hidden" value={idUser} />
            <Input
            className="mb-3"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            classLabel={''}
            classInput={''}
            >
            Name Contact
            </Input>
            <Input
            className="mb-3"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="628xxxxxxxx"
            classLabel={''}
            classInput={''}
            >
            Number Contact
            </Input>
            <Button 
            type="submit"
            className="mb-2 mt-3 w-32 bg-green-400">
                Submit
            </Button>
        </form>
        </>
    );
}