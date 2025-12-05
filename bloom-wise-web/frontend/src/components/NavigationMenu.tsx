import { useState } from "react";
import { Menu, X, User, Heart, ShoppingCart, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "Главная", path: "/catalog", icon: Home },
    { title: "Избранное", path: "/favorites", icon: Heart },
    { title: "Заказы", path: "/orders", icon: ShoppingCart },
    { title: "Профиль", path: "/profile", icon: User },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        <Menu size={28} />
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-80 bg-card">
          <SheetHeader>
            <SheetTitle className="logo-font text-3xl text-primary text-left">
              Подоконник
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-8 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-lg font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
