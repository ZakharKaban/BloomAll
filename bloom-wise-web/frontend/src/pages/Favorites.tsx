import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import plant1 from "@/assets/plant-1.png";
import plant2 from "@/assets/plant-2.png";

const Favorites = () => {
  const navigate = useNavigate();

  const favorites = [
    { id: 1, name: "Монстера", price: "от 1500₽", image: plant1 },
    { id: 2, name: "Потос", price: "от 800₽", image: plant2 },
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
          <h1 className="text-xl font-semibold text-foreground">Избранное</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {favorites.map((plant) => (
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
                    <Heart size={20} fill="currentColor" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
