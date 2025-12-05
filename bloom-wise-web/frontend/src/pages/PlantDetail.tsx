import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import plant1 from "@/assets/plant-1.png";

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        {/* Plant Image */}
        <div className="bg-muted rounded-3xl aspect-square max-w-md mx-auto mb-8 p-12 flex items-center justify-center">
          <img src={plant1} alt="Растение" className="w-full h-full object-contain" />
        </div>

        {/* Plant Info */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-2">Монстера</h2>
          <p className="text-muted-foreground mb-6">
            Красивое тропическое растение с большими резными листьями. Отлично подходит для
            декорирования интерьера и очищения воздуха. Неприхотливо в уходе и быстро растёт.
          </p>
          <p className="text-2xl font-semibold text-primary mb-8">от 1500₽</p>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="flex-1 h-14 rounded-full bg-primary hover:bg-primary/90 text-lg">
              В корзину
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Heart size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
