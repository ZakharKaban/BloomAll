# Настройка базы данных

## Требования

- PostgreSQL 15 или выше
- Node.js 18+

## Вариант 1: Использование Docker (Рекомендуется)

1. Убедитесь, что Docker и Docker Compose установлены

2. Запустите базу данных:
```bash
cd bloom-wise-web/backend
docker-compose up -d db
```

База данных будет доступна на `localhost:5432` с параметрами:
- Database: `bloomwise`
- User: `postgres`
- Password: `postgres`

## Вариант 2: Локальная установка PostgreSQL

1. Установите PostgreSQL с официального сайта: https://www.postgresql.org/download/

2. Создайте базу данных:
```sql
CREATE DATABASE bloomwise;
```

3. Настройте переменные окружения в `.env`:
```env
DATABASE_URL=postgres://postgres:your_password@localhost:5432/bloomwise
```

## Настройка проекта

1. Создайте файл `.env` в папке `backend/`:
```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/bloomwise
JWT_SECRET=your-secret-key-change-in-production
PORT=4000
NODE_ENV=development
```

2. Установите зависимости:
```bash
cd bloom-wise-web/backend
npm install
```

3. Запустите сервер:
```bash
npm run dev
```

При первом запуске:
- База данных автоматически синхронизируется (создаются все таблицы)
- Создается админский аккаунт: `admin@bloomwise.com` / `admin123`
- Добавляются 6 тестовых растений

## Админский аккаунт

**Email:** admin@bloomwise.com  
**Password:** admin123

⚠️ **ВАЖНО:** Измените пароль админа в production!

## Структура базы данных

### Таблицы:
- `users` - пользователи (user/admin)
- `plants` - растения
- `cart_items` - товары в корзине
- `orders` - заказы
- `order_items` - позиции в заказе
- `favorites` - избранное
- `plant_test_results` - результаты теста подбора растений

## Миграции

В режиме разработки (`NODE_ENV=development`) TypeORM автоматически синхронизирует схему базы данных.

Для production используйте миграции:
```bash
npm run typeorm migration:generate -- -n MigrationName
npm run typeorm migration:run
```

