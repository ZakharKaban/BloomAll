import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LeafDecoration } from "@/components/LeafDecoration";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Orders = () => {
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.getOrders(),
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU');
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'В обработке',
      processing: 'В обработке',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменен',
    };
    return statusMap[status] || status;
  };

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
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка заказов...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">У вас пока нет заказов</p>
          </div>
        ) : (
          orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-card rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Заказ {order.id.slice(0, 8)}
              </h3>
              <p className="text-muted-foreground">
                Итого: {Math.round(order.total)}₽
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
                <p className="text-sm font-medium text-primary">
                  {getStatusText(order.status)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
