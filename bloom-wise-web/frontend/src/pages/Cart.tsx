import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import plant1 from "@/assets/plant-1.png";

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = [
    { id: 1, name: "Монстера", price: 1500, quantity: 1, image: plant1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-card rounded-3xl p-6 flex gap-4">
              <div className="w-24 h-24 bg-muted rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                <p className="text-muted-foreground mb-2">{item.price}₽</p>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                    -
                  </button>
                  <span className="text-foreground font-medium">{item.quantity}</span>
                  <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                    +
                  </button>
                </div>
              </div>
              <button className="text-destructive">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-foreground">Итого:</span>
            <span className="text-2xl font-bold text-primary">{total}₽</span>
          </div>
          <Button className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-lg">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
