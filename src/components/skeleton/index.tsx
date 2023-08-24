import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonBanner() {
  return (
    <Skeleton className="aspect-video max-h-[400px] w-full" />
  )
}

export function SkeletonBrand() {
  return (
    <Skeleton className="aspect-square w-full"/>
  )
}