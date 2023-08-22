import LayoutMain from "@/components/layouts";
import { SidebarProfile } from "@/components/layouts/sidebar-profile";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Transaction",
    href: "/profile/transaction",
  },
  {
    title: "Waiting for Payment",
    href: "/profile/waiting-for-payment",
  },
  {
    title: "Account",
    href: "/profile/account",
  },
  {
    title: "Logout",
    href: "/logout",
  },
]

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutMain>
      <div className="container mx-auto">
        <div className="space-y-6 md:p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
            <p className="text-muted-foreground">
              Manage your transaction, payment and setting your account
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarProfile items={sidebarNavItems} />
            </aside>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}