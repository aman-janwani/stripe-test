'use client'
import { getData } from "@/lib/getData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data);
      console.log(data);
    }
    fetchData();
  }, [])

  const handleSubmit = async (price: any) => {
    const res = await fetch('/api/stripe-session', {
      method: 'POST',
      body: JSON.stringify({ price }),
    })

    // res.json().then((data) => {
    //   console.log(data);
    //   router.push(data.url)
    // })
  }
  
  

  return (
   <div className="p-10">
    <p>Products:</p>
    <div className="grid grid-cols-3 gap-[10px]">
    {data.map((item: any, index: any) => {
      return (
        <div className="flex flex-col gap-[10px] border-[1px] rounded-lg border-[#fff] p-[10px]" key={index}>
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-xl font-normal">{item.price}</p>
          <p className="text-sm font-normal">{item.description}</p>
          <button onClick={() => {
            handleSubmit(item.price);
          }} className="bg-green-500 rounded-md w-full py-[10px] text-white">Buy</button>
        </div>
      )
    })}
    </div>
   </div>
  );
}
