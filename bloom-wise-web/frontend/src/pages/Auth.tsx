import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeafDecoration } from "@/components/LeafDecoration";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await api.login(email, password);
        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать!",
        });
        navigate("/catalog");
      } else {
        await api.register(email, password, name);
        toast({
          title: "Регистрация успешна",
          description: "Пройдите короткий тест для подбора растений",
        });
        navigate("/quiz");
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Произошла ошибка при авторизации",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />
      
      <div className="w-full max-w-md">
        <div className="bg-card rounded-[2rem] p-8 shadow-lg relative">
          <div className="text-center mb-8">
            <h1 className="logo-font text-3xl text-primary mb-2">
              Подоконник
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Авторизация" : "Регистрация"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                {isLogin ? "Логин" : "Почта"}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-full border-2 border-primary/30 focus:border-primary"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-full border-2 border-primary/30 focus:border-primary"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-full border-2 border-primary/30 focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
            >
              {loading ? "Загрузка..." : "Вход"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Регистрация" : "Уже есть аккаунт? Войти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
