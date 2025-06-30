interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function Form({title, description, children, method, action, onSubmit}:FormProps) {
    return(
        <main className="w-full h-screen bg-white/30 flex justify-center items-center">
            <form onSubmit={onSubmit} action={action} method={method} className="bg-black/90 p-5 rounded-lg">
                <div className="mb-6">
                    <h1 className="text-2xl">{title}</h1>
                    <p className="text-xs">{description}</p>
                </div>
                <div>
                    {children}
                </div>
            </form>
        </main>
    );
}