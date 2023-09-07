import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import SearchModal from "../search/search-modal";
import { ArrowUpRightSquare, Search, User2 } from "lucide-react";

export interface propsInterface {
  trigger: JSX.Element;
}

export default function MenuSideBarMobile(props: propsInterface) {
  return (
    <Sheet>
      <SheetTrigger asChild>{props.trigger}</SheetTrigger>

      <SheetContent className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle className="flex justify-start">Menu</SheetTitle>
        </SheetHeader>

        <SearchModal
          trigger={
            <Button variant={"secondary"} className="flex justify-start">
              <Search className="mr-2 h-5"></Search> Search Sneakers
            </Button>
          }
        ></SearchModal>

        <Button variant={"secondary"} className="flex justify-start">
          <ArrowUpRightSquare className="mr-2 h-5"></ArrowUpRightSquare>Explore
          Sneakers
        </Button>

        <Button className="flex justify-start">
          <User2 className="mr-2 h-5"></User2>Login or Register
        </Button>
      </SheetContent>
    </Sheet>
  );
}
