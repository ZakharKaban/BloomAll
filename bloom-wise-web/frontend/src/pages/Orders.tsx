import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LeafDecoration } from "@/components/LeafDecoration";

const Orders = () => {
  const navigate = useNavigate();

  const orders = [
    { id: "01010101", date: "15.03.2025", status: "В обработке" },
    { id: "02020202", date: "10.03.2025", status: "Доставлен" },
    { id: "03030303", date: "05.03.2025", status: "Доставлен" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Заказы</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">Заказ {order.id}</h3>
            <p className="text-muted-foreground">детали заказа</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{order.date}</p>
              <p className="text-sm font-medium text-primary">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
