import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { Footer } from "@/components/Footer";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['plants', searchQuery],
    queryFn: () => api.getPlants(searchQuery || undefined),
  });

  const handleAddToCart = async (plantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.addToCart(plantId);
      toast({
        title: "Добавлено в корзину",
        description: "Товар успешно добавлен",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить в корзину",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (plantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Check if already favorited (simplified - in real app would check favorites list)
      await api.addFavorite(plantId);
      toast({
        title: "Добавлено в избранное",
        description: "Растение добавлено в избранное",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить в избранное",
        variant: "destructive",
      });
    }
  };

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

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка растений...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plants.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Растения не найдены</p>
                </div>
              ) : (
                plants.map((plant: any) => (
                  <div
                    key={plant.id}
                    className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => navigate(`/plant/${plant.id}`)}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center p-8">
                      <img
                        src={plant.imageUrl || "/placeholder.svg"}
                        alt={plant.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{plant.name}</h3>
                      <p className="text-muted-foreground mb-4">от {plant.price}₽</p>
                      <div className="flex gap-3">
                        <Button
                          className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                          onClick={(e) => handleAddToCart(plant.id, e)}
                        >
                          В корзину
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          onClick={(e) => handleToggleFavorite(plant.id, e)}
                        >
                          <Heart size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
