import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const Favorites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => api.getFavorites(),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (plantId: string) => api.removeFavorite(plantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Удалено",
        description: "Растение удалено из избранного",
      });
    },
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
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка избранного...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {favorites.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Избранное пусто</p>
              </div>
            ) : (
              favorites.map((plant: any) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavoriteMutation.mutate(plant.id);
                        }}
                      >
                        <Heart size={20} fill="currentColor" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
