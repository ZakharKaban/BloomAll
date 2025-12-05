import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LeafDecoration } from "@/components/LeafDecoration";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  type: string;
  options: { label: string; value: string }[];
}

const PlantQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['quiz-questions'],
    queryFn: () => api.getQuestions(),
  });

  const submitMutation = useMutation({
    mutationFn: (answers: Record<number, string>) => api.submitTest(answers),
    onSuccess: (data) => {
      toast({
        title: "Тест пройден!",
        description: "Мы подобрали для вас идеальные растения",
      });
      navigate("/quiz-result");
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось обработать тест",
        variant: "destructive",
      });
    },
  });

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion + 1]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Тест завершен
      submitMutation.mutate(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Не все вопросы отвечены",
        description: "Пожалуйста, ответьте на все вопросы",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(answers);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка вопросов...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Вопросы не найдены</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentQuestion + 1];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LeafDecoration position="top-right" />
      <LeafDecoration position="bottom-left" />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/catalog")} className="text-primary">
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Тест подбора растений</h1>
          <div className="w-7" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-[2rem] p-8 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="logo-font text-3xl text-primary mb-2">Подоконник</h1>
                <p className="text-muted-foreground">
                  Ответьте на вопросы, чтобы мы подобрали идеальное растение для вас
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Отвечено: {answeredCount} / {questions.length}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
                  {question.question}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option) => {
                    const isSelected = currentAnswer === option.value;
                    return (
                      <Button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        disabled={submitMutation.isPending}
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full h-auto py-6 px-6 text-left justify-start rounded-3xl border-2 transition-all text-base ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-primary/30 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          {isSelected && <CheckCircle2 size={20} />}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || submitMutation.isPending}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Предыдущий вопрос
                </Button>
                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending || !currentAnswer}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {submitMutation.isPending ? "Обработка..." : "Получить результат"}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (currentAnswer) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        toast({
                          title: "Выберите ответ",
                          description: "Пожалуйста, выберите один из вариантов",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={!currentAnswer}
                    variant="outline"
                    className="flex-1"
                  >
                    Следующий вопрос
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Навигация по вопросам
              </h3>
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 max-h-[500px] overflow-y-auto">
                {questions.map((q, index) => {
                  const isAnswered = answers[index + 1];
                  const isCurrent = index === currentQuestion;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionSelect(index)}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : isAnswered
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{index + 1}</span>
                        {isAnswered && !isCurrent && (
                          <CheckCircle2 size={16} className="text-primary" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantQuiz;
