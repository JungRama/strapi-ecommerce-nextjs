import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import NextImage from '@/components/next-image'

export default function SidebarFilter() {
  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 font-semibold tracking-tight">
          Gender
        </h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Listen Now
          </Button>
        </div>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 font-semibold tracking-tight">
          Brands
        </h2>
        <div className="space-y-1">
          <ScrollArea className="max-h-[300px] px-1">
            <Button variant="ghost" className="w-full justify-start">
              <NextImage src={'/images/nike.png'} height={20} width={20} alt='nike'></NextImage>
              <span className="ml-2">Nike</span>
            </Button>

            <Button variant="ghost" className="w-full justify-start">
              <NextImage src={'/images/adidas.png'} height={20} width={20} alt='adidas'></NextImage>
              <span className="ml-2">Adidas</span>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <NextImage src={'/images/new-balance.png'} height={20} width={20} alt='new-balance'></NextImage>
              <span className="ml-2">New Balance</span>
            </Button>
          </ScrollArea>
        </div>
      </div>

      <div className="py-2">
        <h2 className="relative px-7 font-semibold tracking-tight">
          Collection
        </h2>
        <ScrollArea className="h-[300px] px-1">
          <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                Test
              </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 