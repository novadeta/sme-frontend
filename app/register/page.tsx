'use client'
import Form from "../ui/form";
import Input from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { toast } from "react-toastify";

export default function Page() {
  const { register } = useAuth(); // Ambil fungsi register dari context
  const [name, setName] = useState(''); // State input nama
  const [email, setEmail] = useState(''); // State input email
  const [password, setPassword] = useState(''); // State input password
  const [phone_number, setPhone_number] = useState(''); // State input phone number
  const [role, setRole] = useState(''); // State input role
  const [error, setError] = useState<string | null>(null); // State error

  // Handle submit form register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await register(name, email, password, phone_number, role); // Panggil register
      toast.success('User registered successfull');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return(
    <Form
    onSubmit={handleSubmit}
    title="Whatsapp Sistem"
    description="Please Register Your Account Before Login"
    action=''
    method="POST"
    >
    <div className="input-form">
        <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="mb-1"
        classInput="text-white text-xs py-2"
        classLabel="text-white mb-1"
        >
        Name
        </Input>
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
        className="mb-1"
        classInput="text-white text-xs py-2"
        classLabel="text-white"
        >
        Password
        </Input>
        <Input
        type="number"
        value={phone_number}
        onChange={(e) => setPhone_number(e.target.value)}
        placeholder="Phone Number"
        className="mb-1"
        classInput="text-white text-xs py-2"
        classLabel="text-white mb-1"
        >
        Phone Number
        </Input>
        <Input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        className=""
        classInput="text-white text-xs py-2"
        classLabel="text-white mb-1"
        >
        Role
        </Input>
    </div>
    <div className="button-form">
        <Button 
        type="submit"
        className="bg-green-400">
            <p className="">Sign Up</p>
        </Button>
        <Link
        key={'register'}
        href={'/'}
        className="button-regis"
        >
        <p>Login</p>
        </Link>
    </div>
    </Form>
  );
}