import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: plant, isLoading } = useQuery({
    queryKey: ['plant', id],
    queryFn: () => api.getPlant(id!),
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!id) return;
    try {
      await api.addToCart(id);
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

  const handleToggleFavorite = async () => {
    if (!id) return;
    try {
      await api.addFavorite(id);
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
    <div className="min-h-screen bg-background relative">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">карточка растения</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : plant ? (
          <>
            {/* Plant Image */}
            <div className="bg-muted rounded-3xl aspect-square max-w-md mx-auto mb-8 p-12 flex items-center justify-center">
              <img
                src={plant.imageUrl || "/placeholder.svg"}
                alt={plant.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Plant Info */}
            <div className="bg-card rounded-3xl p-8 shadow-lg space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{plant.name}</h2>
                <p className="text-muted-foreground text-lg mb-4">{plant.description}</p>
                <p className="text-2xl font-semibold text-primary mb-6">от {plant.price}₽</p>
              </div>

              {/* Detailed Characteristics */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Подробные характеристики</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {plant.careLevel && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Уровень ухода</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.careLevel === 'easy' ? 'Легкий' : 
                         plant.careLevel === 'medium' ? 'Средний' : 'Сложный'}
                      </span>
                    </div>
                  )}
                  {plant.lightRequirement && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Требования к освещению</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.lightRequirement === 'low' ? 'Низкое' : 
                         plant.lightRequirement === 'medium' ? 'Среднее' : 'Высокое'}
                      </span>
                    </div>
                  )}
                  {plant.wateringFrequency && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Частота полива</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.wateringFrequency === 'low' ? 'Редкий (раз в неделю или реже)' : 
                         plant.wateringFrequency === 'medium' ? 'Умеренный (2-3 раза в неделю)' : 'Частый (почти каждый день)'}
                      </span>
                    </div>
                  )}
                  {plant.spaceRequirement && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Требования к пространству</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.spaceRequirement === 'small' ? 'Маленькое (подоконник, маленький стол)' : 
                         plant.spaceRequirement === 'medium' ? 'Среднее (полка, средний стол)' : 'Большое (пол, большой стол, отдельный угол)'}
                      </span>
                    </div>
                  )}
                  {plant.temperatureRange && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Температурный диапазон</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.temperatureRange === 'cold' ? 'Прохладно (15-18°C)' : 
                         plant.temperatureRange === 'moderate' ? 'Умеренно (19-22°C)' : 
                         plant.temperatureRange === 'warm' ? 'Тепло (23-25°C)' : 'Жарко (26°C и выше)'}
                      </span>
                    </div>
                  )}
                  {plant.plantType && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Тип растения</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.plantType === 'tree' ? 'Дерево' : 
                         plant.plantType === 'bush' ? 'Куст' : 
                         plant.plantType === 'flower' ? 'Цветок' : 
                         plant.plantType === 'vine' ? 'Лиана/Вьющееся' : 
                         plant.plantType === 'succulent' ? 'Суккулент/Кактус' : 
                         plant.plantType === 'fern' ? 'Папоротник' : 
                         plant.plantType === 'moss' ? 'Мох' : plant.plantType}
                      </span>
                    </div>
                  )}
                  {plant.experienceLevel && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Рекомендуемый уровень опыта</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.experienceLevel === 'beginner' ? 'Новичок' : 
                         plant.experienceLevel === 'intermediate' ? 'Любитель' : 'Профессионал'}
                      </span>
                    </div>
                  )}
                  {plant.fertilizerNeeds && (
                    <div className="bg-background rounded-xl p-4">
                      <span className="text-muted-foreground block mb-1">Потребность в удобрениях</span>
                      <span className="font-medium text-foreground text-base">
                        {plant.fertilizerNeeds === 'none' ? 'Не требуется' : 
                         plant.fertilizerNeeds === 'low' ? 'Низкая' : 
                         plant.fertilizerNeeds === 'medium' ? 'Средняя' : 'Высокая'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Special Features */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Особенности</h4>
                  <div className="flex flex-wrap gap-3">
                    {plant.petSafe && (
                      <span className="bg-green-500/20 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <span>✓</span> Безопасно для животных
                      </span>
                    )}
                    {plant.flowering && (
                      <span className="bg-pink-500/20 text-pink-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <span>🌸</span> Цветет
                      </span>
                    )}
                    {plant.hasFragrance && (
                      <span className="bg-purple-500/20 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <span>🌺</span> Ароматное
                      </span>
                    )}
                    {plant.hasPollen && (
                      <span className="bg-yellow-500/20 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <span>⚠</span> Имеет пыльцу
                      </span>
                    )}
                    {!plant.inStock && (
                      <span className="bg-red-500/20 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                        Нет в наличии
                      </span>
                    )}
                    {plant.inStock && (
                      <span className="bg-green-500/20 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                        ✓ В наличии
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!plant.inStock}
                  className="flex-1 h-14 rounded-full bg-primary hover:bg-primary/90 text-lg disabled:opacity-50"
                >
                  {plant.inStock ? 'В корзину' : 'Нет в наличии'}
                </Button>
                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Heart size={24} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Растение не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;
