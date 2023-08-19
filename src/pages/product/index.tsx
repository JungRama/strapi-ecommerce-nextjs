import LayoutMain from "@/components/layouts"
import SidebarFilter from "@/components/product-list/sidebar-filter"

export default function ProductList() {
  return (
    <LayoutMain>
      <div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
        <div className="col-span-10 md:col-span-2 lg:col-span-2">
          <SidebarFilter></SidebarFilter>
        </div>
      </div>
    </LayoutMain>
  )
}