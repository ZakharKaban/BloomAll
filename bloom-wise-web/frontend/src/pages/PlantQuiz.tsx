import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: { label: string; value: string }[];
}

const PlantQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Mock questions - в будущем из базы данных
  const questions: Question[] = [
    {
      id: 1,
      question: "Сколько времени вы готовы уделять уходу за растением?",
      options: [
        { label: "Минимум времени, хочу неприхотливое растение", value: "A" },
        { label: "Готов(а) уделять время регулярно", value: "B" },
        { label: "Люблю активно ухаживать за растениями", value: "C" },
      ],
    },
    {
      id: 2,
      question: "Какое освещение в вашем помещении?",
      options: [
        { label: "Мало света, окна выходят на север", value: "A" },
        { label: "Среднее освещение", value: "B" },
        { label: "Много солнца, южные окна", value: "C" },
      ],
    },
    {
      id: 3,
      question: "Есть ли у вас домашние животные?",
      options: [
        { label: "Да, нужно безопасное растение", value: "A" },
        { label: "Нет питомцев", value: "B" },
        { label: "Есть, но могу разместить растение вне доступа", value: "C" },
      ],
    },
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Тест завершен
      toast({
        title: "Тест пройден!",
        description: "Мы подобрали для вас идеальные растения",
      });
      navigate("/catalog");
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-[2rem] p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="logo-font text-3xl text-primary mb-2">Подоконник</h1>
            <p className="text-muted-foreground">
              После всех вопросов юзера просто перекидывает на карточку растения и все
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Вопрос {currentQuestion + 1} из {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  variant="outline"
                  className="w-full h-auto py-6 px-6 text-left justify-start rounded-3xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all text-base"
                >
                  <span className="font-medium mr-3">{option.value}.</span>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Skip Button */}
          {currentQuestion > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/catalog")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Пропустить тест
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantQuiz;
