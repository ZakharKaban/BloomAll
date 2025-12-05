import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => api.getCart(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (itemId: string) => api.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Удалено",
        description: "Товар удален из корзины",
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: ({ address, phone }: { address: string; phone: string }) =>
      api.createOrder(address, phone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'orders'] });
      toast({
        title: "Заказ оформлен",
        description: "Ваш заказ успешно создан",
      });
      navigate("/orders");
    },
  });

  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = cart?.items.find((i: any) => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateMutation.mutate({ itemId, quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    const address = prompt("Введите адрес доставки:");
    const phone = prompt("Введите номер телефона:");
    if (address && phone) {
      createOrderMutation.mutate({ address, phone });
    }
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
          <h1 className="text-xl font-semibold text-foreground">Корзина</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка корзины...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart?.items && cart.items.length > 0 ? (
                cart.items.map((item: any) => (
                  <div key={item.id} className="bg-card rounded-3xl p-6 flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.plant?.imageUrl || "/placeholder.svg"}
                        alt={item.plant?.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {item.plant?.name}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {item.plant?.price}₽
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80"
                        >
                          -
                        </button>
                        <span className="text-foreground font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMutation.mutate(item.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="bg-card rounded-3xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-foreground">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round(cart.total)}₽
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={createOrderMutation.isPending}
                  className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-lg"
                >
                  {createOrderMutation.isPending ? "Оформление..." : "Оформить заказ"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
