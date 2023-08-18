import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function HeaderTopPromo () {
  return (
    <>
      <div className='container-fluid bg-zinc-950 py-2 text-white'>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className='mb-0 text-sm mr-2'>FREE SHIPPING ALL OVER THE US & GET 15% DISCOUNT ON FIRST TIME BUYING</p>
            <Button size={'sm'} className='text-xs'>CLICK HERE</Button>
          </div>
          <div className='cursor-pointer'>
            <X />
          </div>
        </div>
      </div>
    </>
  )
}