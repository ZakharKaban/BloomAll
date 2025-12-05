import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const QuizResult = () => {
  const navigate = useNavigate();

  const { data: result, isLoading } = useQuery({
    queryKey: ['quiz-result'],
    queryFn: () => api.getTestResult(),
    retry: false,
  });

  const handleAddToCart = async (plantId: string) => {
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

  const handleAddToFavorites = async (plantId: string) => {
    try {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка результатов...</p>
      </div>
    );
  }

  if (!result || !result.topPlant) {
    return (
      <div className="min-h-screen bg-background relative">
        <LeafDecoration position="top-right" />
        <LeafDecoration position="bottom-left" />

        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => navigate("/catalog")} className="text-primary">
              <ArrowLeft size={28} />
            </button>
            <h1 className="text-xl font-semibold text-foreground">Результаты теста</h1>
            <div className="w-7" />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
          <div className="bg-card rounded-3xl p-8">
            <p className="text-muted-foreground mb-6">
              Результаты теста не найдены. Пройдите тест, чтобы получить рекомендации.
            </p>
            <Button onClick={() => navigate("/quiz")} className="bg-primary">
              Пройти тест
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/catalog")} className="text-primary">
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Результаты теста</h1>
          <Button
            onClick={() => navigate("/quiz")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Перепройти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Top Plant */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Самое подходящее вам растение
            </h2>
            <p className="text-muted-foreground">
              Это растение идеально соответствует вашим предпочтениям
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-3xl aspect-square flex items-center justify-center p-8">
              <img
                src={result.topPlant.imageUrl || "/placeholder.svg"}
                alt={result.topPlant.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">{result.topPlant.name}</h3>
              <p className="text-muted-foreground text-lg">{result.topPlant.description}</p>
              
              {/* Detailed Characteristics */}
              <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                <h4 className="font-semibold text-foreground mb-3">Характеристики растения:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {result.topPlant.careLevel && (
                    <div>
                      <span className="text-muted-foreground">Уровень ухода: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.careLevel === 'easy' ? 'Легкий' : 
                         result.topPlant.careLevel === 'medium' ? 'Средний' : 'Сложный'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.lightRequirement && (
                    <div>
                      <span className="text-muted-foreground">Освещение: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.lightRequirement === 'low' ? 'Низкое' : 
                         result.topPlant.lightRequirement === 'medium' ? 'Среднее' : 'Высокое'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.wateringFrequency && (
                    <div>
                      <span className="text-muted-foreground">Полив: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.wateringFrequency === 'low' ? 'Редкий' : 
                         result.topPlant.wateringFrequency === 'medium' ? 'Умеренный' : 'Частый'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.spaceRequirement && (
                    <div>
                      <span className="text-muted-foreground">Пространство: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.spaceRequirement === 'small' ? 'Маленькое' : 
                         result.topPlant.spaceRequirement === 'medium' ? 'Среднее' : 'Большое'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.temperatureRange && (
                    <div>
                      <span className="text-muted-foreground">Температура: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.temperatureRange === 'cold' ? 'Прохладно (15-18°C)' : 
                         result.topPlant.temperatureRange === 'moderate' ? 'Умеренно (19-22°C)' : 
                         result.topPlant.temperatureRange === 'warm' ? 'Тепло (23-25°C)' : 'Жарко (26°C+)'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.plantType && (
                    <div>
                      <span className="text-muted-foreground">Тип: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.plantType === 'tree' ? 'Дерево' : 
                         result.topPlant.plantType === 'bush' ? 'Куст' : 
                         result.topPlant.plantType === 'flower' ? 'Цветок' : 
                         result.topPlant.plantType === 'vine' ? 'Лиана' : 
                         result.topPlant.plantType === 'succulent' ? 'Суккулент' : 
                         result.topPlant.plantType === 'fern' ? 'Папоротник' : 
                         result.topPlant.plantType === 'moss' ? 'Мох' : result.topPlant.plantType}
                      </span>
                    </div>
                  )}
                  {result.topPlant.experienceLevel && (
                    <div>
                      <span className="text-muted-foreground">Опыт: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.experienceLevel === 'beginner' ? 'Новичок' : 
                         result.topPlant.experienceLevel === 'intermediate' ? 'Любитель' : 'Профессионал'}
                      </span>
                    </div>
                  )}
                  {result.topPlant.fertilizerNeeds && (
                    <div>
                      <span className="text-muted-foreground">Удобрения: </span>
                      <span className="font-medium text-foreground">
                        {result.topPlant.fertilizerNeeds === 'none' ? 'Не требуется' : 
                         result.topPlant.fertilizerNeeds === 'low' ? 'Низкая потребность' : 
                         result.topPlant.fertilizerNeeds === 'medium' ? 'Средняя потребность' : 'Высокая потребность'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {result.topPlant.petSafe && (
                    <span className="bg-green-500/20 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Безопасно для животных
                    </span>
                  )}
                  {result.topPlant.flowering && (
                    <span className="bg-pink-500/20 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                      🌸 Цветет
                    </span>
                  )}
                  {result.topPlant.hasFragrance && (
                    <span className="bg-purple-500/20 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      🌺 Ароматное
                    </span>
                  )}
                  {result.topPlant.hasPollen && (
                    <span className="bg-yellow-500/20 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      ⚠ Имеет пыльцу
                    </span>
                  )}
                </div>
              </div>

              <p className="text-2xl font-semibold text-primary mb-6">
                от {result.topPlant.price}₽
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleAddToCart(result.topPlant.id)}
                  className="flex-1 h-14 rounded-full bg-primary hover:bg-primary/90 text-lg"
                >
                  В корзину
                </Button>
                <Button
                  onClick={() => handleAddToFavorites(result.topPlant.id)}
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Heart size={24} />
                </Button>
              </div>
              <Button
                onClick={() => navigate(`/plant/${result.topPlant.id}`)}
                variant="outline"
                className="w-full h-12 rounded-full"
              >
                Подробнее о растении
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Plants */}
        {result.additionalPlants && result.additionalPlants.length > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Также вам могут подойти
              </h2>
              <p className="text-muted-foreground">
                Эти растения также хорошо подходят под ваши предпочтения
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.additionalPlants.map((plant: any) => (
                <div
                  key={plant.id}
                  className="bg-background rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/plant/${plant.id}`)}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center p-6">
                    <img
                      src={plant.imageUrl || "/placeholder.svg"}
                      alt={plant.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{plant.name}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{plant.description}</p>
                    
                    {/* Quick characteristics */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {plant.careLevel && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {plant.careLevel === 'easy' ? 'Легкий уход' : 
                           plant.careLevel === 'medium' ? 'Средний уход' : 'Сложный уход'}
                        </span>
                      )}
                      {plant.petSafe && (
                        <span className="text-xs bg-green-500/20 text-green-700 px-2 py-1 rounded">
                          Безопасно
                        </span>
                      )}
                      {plant.flowering && (
                        <span className="text-xs bg-pink-500/20 text-pink-700 px-2 py-1 rounded">
                          Цветет
                        </span>
                      )}
                    </div>
                    
                    <p className="text-primary font-semibold mb-4">от {plant.price}₽</p>
                    <div className="flex gap-3">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(plant.id);
                        }}
                        className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                      >
                        В корзину
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavorites(plant.id);
                        }}
                        variant="outline"
                        size="icon"
                        className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Heart size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/catalog")}
            variant="outline"
            className="rounded-full px-8"
          >
            Перейти в каталог
          </Button>
          <Button
            onClick={() => navigate("/quiz")}
            className="rounded-full px-8 bg-primary"
          >
            <RotateCcw className="mr-2" size={20} />
            Перепройти тест
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;

