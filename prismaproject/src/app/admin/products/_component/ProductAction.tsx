import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_action/product";

export function ActiveToggleDropdownItem({
  id,
  isAVailableForPurchase,
}: {
  id: string;
  isAVailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <DropdownMenuItem
        disable={isPending}
        onClick={() => {
          startTransition(async () => {
            await toggleProductAvailability(id, !isAVailableForPurchase);
          });
        }}
      >
        {isAVailableForPurchase ? "Deactivate" : "Activate"}
      </DropdownMenuItem>
    </>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
