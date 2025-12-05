import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth");
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
          <h1 className="text-xl font-semibold text-foreground">Профиль</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* User Info */}
        <div className="bg-card rounded-3xl p-8">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                И
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold text-foreground">Имя</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-background rounded-2xl p-6">
              <p className="text-sm text-muted-foreground mb-1">Имя</p>
              <p className="text-foreground font-medium">Имя 1</p>
            </div>
            <div className="bg-background rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Почта</p>
                <p className="text-foreground font-medium">почта@mail.ru</p>
              </div>
              <Edit className="text-muted-foreground" size={20} />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-card rounded-3xl overflow-hidden">
          <button
            onClick={() => navigate("/favorites")}
            className="w-full p-6 text-left border-b border-border hover:bg-muted transition-colors"
          >
            <p className="text-foreground font-medium">Избранное</p>
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full p-6 text-left border-b border-border hover:bg-muted transition-colors"
          >
            <p className="text-foreground font-medium">Заказы</p>
          </button>
          <button
            onClick={() => navigate("/catalog")}
            className="w-full p-6 text-left hover:bg-muted transition-colors"
          >
            <p className="text-foreground font-medium">Профиль</p>
          </button>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="mr-2" size={20} />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Profile;
