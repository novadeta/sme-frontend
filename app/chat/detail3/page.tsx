import { Button } from "@/app/ui/button";
import Image from "next/image";

export default async function page() {
    return(
        <main className="w-full h-full flex flex-col">
            <div className="w-full flex py-3 px-5 justify-between items-center bg-gray-700">
                <div className="flex justify-center items-center gap-x-3">
                    <Image
                    className='rounded-full bg-gray-100 w-[35px] h-[35px]'
                    src='/profile/user.png'   // bisa di public/
                    alt="profile"
                    width={35}
                    height={0}
                    />
                    <div className="flex flex-col">
                        <h1 className="text-[10px] font-bold">Sean Andrianto</h1>
                        <p className="text-[10px]">Terakhir pesan diterima pada pukul 03.45</p>
                    </div>
                </div>
                <Button 
                className="w-[120px] flex">
                    <p className="m-auto">Summarize</p>
                </Button>
            </div>
            <div className="overflow-y-scroll h-full flex flex-col p-2">
                <div className="flex items-start justify-start gap-x-2">
                    <Image
                    className='rounded-full bg-gray-100 w-[25px] h-[25px]'
                    src='/profile/user.png'   // bisa di public/
                    alt="profile"
                    width={25}
                    height={0}
                    />
                    <div className="w-[40%] bg-white/10 p-2 flex flex-col gap-y-2">
                        <p className="text-xs font-bold">Miftahul huda</p>
                        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aperiam.</p>
                    </div>
                </div>
                <div className="flex items-start flex-row-reverse gap-x-2">
                    <Image
                    className='rounded-full bg-gray-100 w-[25px] h-[25px]'
                    src='/profile/user.png'   // bisa di public/
                    alt="profile"
                    width={25}
                    height={0}
                    />
                    <div className="w-[40%] bg-white/10 p-2 flex flex-col gap-y-2">
                        <p className="text-xs font-bold">Sean Andrianto</p>
                        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum illum totam obcaecati voluptatum soluta, commodi ea mollitia ad aut.</p>
                    </div>
                </div>
            </div>
        </main>
    );
} 