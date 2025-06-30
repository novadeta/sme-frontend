'use client'
import Form from "./ui/form";
import Input from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "./Auth/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const { login } = useAuth(); // Ambil fungsi login dari context
    const [email, setEmail] = useState(''); // State input email
    const [password, setPassword] = useState(''); // State input password
    const [error, setError] = useState<string | null>(null); // State error

    // Fungsi handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Cegah reload halaman
    try {
      await login(email, password); // Panggil login
      toast.success('Login successful');
    } catch (err: any) {
      toast.error(err.message); // Set error jika gagal
    }
  };
  return(
    <Form
    onSubmit={handleSubmit}
    title="Whatsapp Sistem"
    description="Please Sign In Your Account"
    action=''
    method=""
    >
    <div className="input-form">
        <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-1"
        classInput="text-white text-xs py-2"
        classLabel="text-white mb-1"
        >
        Email
        </Input>
        <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className=""
        classInput="text-white text-xs py-2"
        classLabel="text-white"
        >
        Password
        </Input>
    </div>
    <div className="button-form">
        <Button 
        className="bg-green-400"
        type="submit"
        >
            <p className="">Sign In</p>
        </Button>
        <Link
        key={'register'}
        href={'/register'}
        className="button-regis"
        >
        <p>Register</p>
        </Link>
    </div>
    </Form>
  );
}