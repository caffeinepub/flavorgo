interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const isDelivered = status.toLowerCase() === "delivered";
  const isPreparing = status.toLowerCase() === "preparing";

  let cls =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ";
  if (isDelivered) cls += "bg-green-100 text-green-700";
  else if (isPreparing) cls += "bg-amber-100 text-amber-700";
  else cls += "bg-muted text-muted-foreground";

  return <span className={cls}>{status}</span>;
}
