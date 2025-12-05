import { Request, Response } from 'express';

export async function getQuestions(req: Request, res: Response) {
  try {
    const questions = [
      {
        id: 1,
        question: 'Какой у вас опыт ухода за растениями?',
        type: 'experience',
        options: [
          { label: 'Новичок', value: 'beginner' },
          { label: 'Любитель', value: 'intermediate' },
          { label: 'Профессионал', value: 'expert' },
        ],
      },
      {
        id: 2,
        question: 'Сколько времени вы готовы уделять уходу за растением?',
        type: 'care_time',
        options: [
          { label: 'Минимум времени, хочу неприхотливое растение', value: 'low' },
          { label: 'Готов(а) уделять время регулярно', value: 'medium' },
          { label: 'Люблю активно ухаживать за растениями', value: 'high' },
        ],
      },
      {
        id: 3,
        question: 'Как часто вы готовы поливать растение?',
        type: 'watering',
        options: [
          { label: 'Редко (раз в неделю или реже)', value: 'low' },
          { label: 'Умеренно (2-3 раза в неделю)', value: 'medium' },
          { label: 'Часто (почти каждый день)', value: 'high' },
        ],
      },
      {
        id: 4,
        question: 'Какое освещение в вашем помещении?',
        type: 'light',
        options: [
          { label: 'Мало света, окна выходят на север', value: 'low' },
          { label: 'Среднее освещение', value: 'medium' },
          { label: 'Много солнца, южные окна', value: 'high' },
        ],
      },
      {
        id: 5,
        question: 'Какая температура обычно в вашем доме?',
        type: 'temperature',
        options: [
          { label: 'Прохладно (15-18°C)', value: 'cold' },
          { label: 'Умеренно (19-22°C)', value: 'moderate' },
          { label: 'Тепло (23-25°C)', value: 'warm' },
          { label: 'Жарко (26°C и выше)', value: 'hot' },
        ],
      },
      {
        id: 6,
        question: 'Сколько свободного места у вас есть для растения?',
        type: 'space',
        options: [
          { label: 'Мало места (подоконник, маленький стол)', value: 'small' },
          { label: 'Среднее пространство (полка, средний стол)', value: 'medium' },
          { label: 'Много места (пол, большой стол, отдельный угол)', value: 'large' },
        ],
      },
      {
        id: 7,
        question: 'Какой формат растения вы предпочитаете?',
        type: 'plant_type',
        options: [
          { label: 'Дерево', value: 'tree' },
          { label: 'Куст', value: 'bush' },
          { label: 'Цветок', value: 'flower' },
          { label: 'Лиана/Вьющееся', value: 'vine' },
          { label: 'Суккулент/Кактус', value: 'succulent' },
          { label: 'Папоротник', value: 'fern' },
          { label: 'Мох', value: 'moss' },
        ],
      },
      {
        id: 8,
        question: 'Есть ли у вас домашние животные?',
        type: 'pets',
        options: [
          { label: 'Да, нужно безопасное растение', value: 'yes_safe' },
          { label: 'Нет питомцев', value: 'no' },
          { label: 'Есть, но могу разместить растение вне доступа', value: 'yes_accessible' },
        ],
      },
      {
        id: 9,
        question: 'Есть ли у вас аллергия на пыльцу?',
        type: 'pollen_allergy',
        options: [
          { label: 'Точно нет', value: 'definitely_no' },
          { label: 'Думаю нет', value: 'probably_no' },
          { label: 'Не знаю', value: 'unknown' },
          { label: 'Думаю да', value: 'probably_yes' },
          { label: 'Точно да', value: 'definitely_yes' },
        ],
      },
      {
        id: 10,
        question: 'Хотите ли вы, чтобы растение цвело?',
        type: 'flowering',
        options: [
          { label: 'Точно нет', value: 'definitely_no' },
          { label: 'Думаю нет', value: 'probably_no' },
          { label: 'Не знаю', value: 'unknown' },
          { label: 'Думаю да', value: 'probably_yes' },
          { label: 'Точно да', value: 'definitely_yes' },
        ],
      },
      {
        id: 11,
        question: 'Хотите ли вы, чтобы растение имело запах?',
        type: 'fragrance',
        options: [
          { label: 'Точно нет', value: 'definitely_no' },
          { label: 'Думаю нет', value: 'probably_no' },
          { label: 'Не знаю', value: 'unknown' },
          { label: 'Думаю да', value: 'probably_yes' },
          { label: 'Точно да', value: 'definitely_yes' },
        ],
      },
      {
        id: 12,
        question: 'Сколько вы готовы тратить на удобрения?',
        type: 'fertilizer',
        options: [
          { label: 'Не хочу тратить на удобрения', value: 'none' },
          { label: 'Минимальные траты', value: 'low' },
          { label: 'Умеренные траты', value: 'medium' },
          { label: 'Готов тратить достаточно', value: 'high' },
        ],
      },
    ];

    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
