import { useState } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { Footer } from "@/components/Footer";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useNavigate } from "react-router-dom";
import plant1 from "@/assets/plant-1.png";
import plant2 from "@/assets/plant-2.png";
import plant3 from "@/assets/plant-3.png";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const plants = [
    { id: 1, name: "Монстера", price: "от 1500₽", image: plant1 },
    { id: 2, name: "Потос", price: "от 800₽", image: plant2 },
    { id: 3, name: "Сансевиерия", price: "от 1200₽", image: plant3 },
    { id: 4, name: "Фикус", price: "от 2000₽", image: plant1 },
    { id: 5, name: "Драцена", price: "от 1800₽", image: plant2 },
    { id: 6, name: "Спатифиллум", price: "от 900₽", image: plant3 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu />
          <h1 className="logo-font text-2xl text-primary">
            Подоконник
          </h1>
          <div className="flex gap-3">
            <button onClick={() => navigate("/favorites")} className="text-primary">
              <Heart size={24} />
            </button>
            <button onClick={() => navigate("/cart")} className="text-primary">
              <ShoppingCart size={24} />
            </button>
            <button onClick={() => navigate("/profile")} className="text-primary">
              <User size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative">
        <LeafDecoration position="top-right" />
        <LeafDecoration position="bottom-left" />

        {/* Search */}
        <div className="container mx-auto px-4 py-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="Поиск растений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-full border-2 border-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Popular Plants */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Наши самые популярные растения
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate(`/plant/${plant.id}`)}
              >
                <div className="aspect-square bg-muted flex items-center justify-center p-8">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plant.name}</h3>
                  <p className="text-muted-foreground mb-4">{plant.price}</p>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/plant/${plant.id}`);
                      }}
                    >
                      В корзину
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
