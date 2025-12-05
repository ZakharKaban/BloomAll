import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LeafDecoration } from "@/components/LeafDecoration";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<any>(null);

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['admin-plants'],
    queryFn: () => api.getAllPlants(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createPlant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plants'] });
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Успешно",
        description: "Растение добавлено",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось создать растение",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updatePlant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plants'] });
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['plant'] });
      setEditingPlant(null);
      toast({
        title: "Успешно",
        description: "Растение обновлено",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось обновить растение",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deletePlant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plants'] });
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['plant'] });
      toast({
        title: "Успешно",
        description: "Растение удалено",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить растение",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    api.logout();
    navigate("/auth");
  };

  const PlantForm = ({ plant, onSubmit, onCancel }: { plant?: any; onSubmit: (data: any) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState({
      name: plant?.name || '',
      description: plant?.description || '',
      price: plant?.price || '',
      imageUrl: plant?.imageUrl || '',
      inStock: plant?.inStock !== undefined ? plant.inStock : true,
      careLevel: plant?.careLevel || '',
      lightRequirement: plant?.lightRequirement || '',
      petSafe: plant?.petSafe || false,
      wateringFrequency: plant?.wateringFrequency || '',
      spaceRequirement: plant?.spaceRequirement || '',
      flowering: plant?.flowering || false,
      hasPollen: plant?.hasPollen || false,
      hasFragrance: plant?.hasFragrance || false,
      fertilizerNeeds: plant?.fertilizerNeeds || '',
      temperatureRange: plant?.temperatureRange || '',
      plantType: plant?.plantType || '',
      experienceLevel: plant?.experienceLevel || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Цена (₽)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL изображения</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="careLevel">Уровень ухода</Label>
          <Select
            value={formData.careLevel}
            onValueChange={(value) => setFormData({ ...formData, careLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите уровень ухода" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Легкий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="hard">Сложный</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lightRequirement">Требования к освещению</Label>
          <Select
            value={formData.lightRequirement}
            onValueChange={(value) => setFormData({ ...formData, lightRequirement: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите требования к освещению" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Низкое</SelectItem>
              <SelectItem value="medium">Среднее</SelectItem>
              <SelectItem value="high">Высокое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="inStock"
            checked={formData.inStock}
            onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
          />
          <Label htmlFor="inStock">В наличии</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="petSafe"
            checked={formData.petSafe}
            onCheckedChange={(checked) => setFormData({ ...formData, petSafe: checked })}
          />
          <Label htmlFor="petSafe">Безопасно для животных</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wateringFrequency">Частота полива</Label>
          <Select
            value={formData.wateringFrequency}
            onValueChange={(value) => setFormData({ ...formData, wateringFrequency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите частоту полива" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Низкая (редко)</SelectItem>
              <SelectItem value="medium">Средняя (умеренно)</SelectItem>
              <SelectItem value="high">Высокая (часто)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="spaceRequirement">Требования к пространству</Label>
          <Select
            value={formData.spaceRequirement}
            onValueChange={(value) => setFormData({ ...formData, spaceRequirement: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите требования к пространству" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Маленькое</SelectItem>
              <SelectItem value="medium">Среднее</SelectItem>
              <SelectItem value="large">Большое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plantType">Тип растения</Label>
          <Select
            value={formData.plantType}
            onValueChange={(value) => setFormData({ ...formData, plantType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип растения" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tree">Дерево</SelectItem>
              <SelectItem value="bush">Куст</SelectItem>
              <SelectItem value="flower">Цветок</SelectItem>
              <SelectItem value="vine">Лиана/Вьющееся</SelectItem>
              <SelectItem value="succulent">Суккулент/Кактус</SelectItem>
              <SelectItem value="fern">Папоротник</SelectItem>
              <SelectItem value="moss">Мох</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperatureRange">Температурный диапазон</Label>
          <Select
            value={formData.temperatureRange}
            onValueChange={(value) => setFormData({ ...formData, temperatureRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите температурный диапазон" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cold">Прохладно (15-18°C)</SelectItem>
              <SelectItem value="moderate">Умеренно (19-22°C)</SelectItem>
              <SelectItem value="warm">Тепло (23-25°C)</SelectItem>
              <SelectItem value="hot">Жарко (26°C+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fertilizerNeeds">Потребность в удобрениях</Label>
          <Select
            value={formData.fertilizerNeeds}
            onValueChange={(value) => setFormData({ ...formData, fertilizerNeeds: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите потребность в удобрениях" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Не требуется</SelectItem>
              <SelectItem value="low">Низкая</SelectItem>
              <SelectItem value="medium">Средняя</SelectItem>
              <SelectItem value="high">Высокая</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Уровень опыта</Label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите уровень опыта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Новичок</SelectItem>
              <SelectItem value="intermediate">Любитель</SelectItem>
              <SelectItem value="expert">Профессионал</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="flowering"
            checked={formData.flowering}
            onCheckedChange={(checked) => setFormData({ ...formData, flowering: checked })}
          />
          <Label htmlFor="flowering">Цветет</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hasPollen"
            checked={formData.hasPollen}
            onCheckedChange={(checked) => setFormData({ ...formData, hasPollen: checked })}
          />
          <Label htmlFor="hasPollen">Имеет пыльцу</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hasFragrance"
            checked={formData.hasFragrance}
            onCheckedChange={(checked) => setFormData({ ...formData, hasFragrance: checked })}
          />
          <Label htmlFor="hasFragrance">Имеет запах</Label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {plant ? 'Сохранить' : 'Создать'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/catalog")} className="text-primary">
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Админ-панель</h1>
          <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut size={20} />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Управление растениями</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" size={20} />
                Добавить растение
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Добавить растение</DialogTitle>
              </DialogHeader>
              <PlantForm
                onSubmit={(data) => createMutation.mutate(data)}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant: any) => (
              <div key={plant.id} className="bg-card rounded-3xl p-6 shadow-md">
                <div className="aspect-square bg-muted rounded-2xl mb-4 flex items-center justify-center p-4">
                  <img
                    src={plant.imageUrl || "/placeholder.svg"}
                    alt={plant.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{plant.name}</h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{plant.description}</p>
                <p className="text-primary font-semibold mb-3">{plant.price}₽</p>
                
                {/* Characteristics */}
                <div className="mb-4 space-y-1 text-xs text-muted-foreground">
                  <div className="flex flex-wrap gap-2">
                    {plant.careLevel && (
                      <span className="bg-muted px-2 py-1 rounded">
                        Уход: {plant.careLevel === 'easy' ? 'Легкий' : plant.careLevel === 'medium' ? 'Средний' : 'Сложный'}
                      </span>
                    )}
                    {plant.lightRequirement && (
                      <span className="bg-muted px-2 py-1 rounded">
                        Свет: {plant.lightRequirement === 'low' ? 'Низкий' : plant.lightRequirement === 'medium' ? 'Средний' : 'Высокий'}
                      </span>
                    )}
                    {plant.plantType && (
                      <span className="bg-muted px-2 py-1 rounded">
                        Тип: {plant.plantType}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plant.petSafe && <span className="bg-green-500/20 text-green-700 px-2 py-1 rounded">Безопасно для животных</span>}
                    {plant.flowering && <span className="bg-pink-500/20 text-pink-700 px-2 py-1 rounded">Цветет</span>}
                    {plant.hasFragrance && <span className="bg-purple-500/20 text-purple-700 px-2 py-1 rounded">Ароматное</span>}
                    {!plant.inStock && <span className="bg-red-500/20 text-red-700 px-2 py-1 rounded">Нет в наличии</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditingPlant(plant)}
                  >
                    <Edit className="mr-2" size={16} />
                    Редактировать
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Вы уверены, что хотите удалить это растение?')) {
                        deleteMutation.mutate(plant.id);
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {editingPlant && (
        <Dialog open={!!editingPlant} onOpenChange={(open) => !open && setEditingPlant(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактировать растение</DialogTitle>
            </DialogHeader>
            <PlantForm
              plant={editingPlant}
              onSubmit={(data) => updateMutation.mutate({ id: editingPlant.id, data })}
              onCancel={() => setEditingPlant(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Admin;

