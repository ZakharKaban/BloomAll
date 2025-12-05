# Интеграция Frontend и Backend

## Что было сделано

### Backend

1. **База данных (TypeORM)**
   - Созданы все необходимые entities: User, Plant, CartItem, Order, OrderItem, Favorite, PlantTestResult
   - Настроено подключение к PostgreSQL
   - Добавлена автоматическая инициализация с начальными данными (seed)

2. **Аутентификация**
   - Реализованы эндпоинты `/api/auth/login` и `/api/auth/register`
   - JWT токены для авторизации
   - Middleware для проверки токенов

3. **API Эндпоинты**
   - **Shop**: `GET /api/shop/plants`, `GET /api/shop/plants/:id`
   - **Cart**: `GET /api/cart`, `POST /api/cart/add`, `PUT /api/cart/:id`, `DELETE /api/cart/:id`
   - **Favorites**: `GET /api/favorites`, `POST /api/favorites/:plantId`, `DELETE /api/favorites/:plantId`
   - **Orders**: `GET /api/orders`, `GET /api/orders/:id`, `POST /api/orders`
   - **Profile**: `GET /api/account/profile`, `PUT /api/account/profile`
   - **Plant Test**: `GET /api/plant-test/questions`, `POST /api/plant-test/submit`
   - **Admin**: `GET /api/admin/plants`, `POST /api/admin/plants`, `PUT /api/admin/plants/:id`, `DELETE /api/admin/plants/:id`

4. **Роли пользователей**
   - Система ролей: `user` (по умолчанию) и `admin`
   - Админский аккаунт создается автоматически при первом запуске
   - Middleware для проверки админских прав

### Frontend

1. **API Client** (`src/lib/api.ts`)
   - Создан единый клиент для всех API запросов
   - Автоматическое управление токенами
   - Обработка ошибок

2. **Обновлены все страницы**
   - **Auth**: Реальная авторизация и регистрация
   - **Catalog**: Загрузка растений с сервера, поиск, добавление в корзину и избранное
   - **Cart**: Полная интеграция с API (получение, обновление, удаление, оформление заказа)
   - **PlantDetail**: Загрузка данных растения, добавление в корзину и избранное
   - **Favorites**: Загрузка избранного, удаление
   - **Orders**: Список заказов пользователя
   - **Profile**: Загрузка и отображение профиля
   - **PlantQuiz**: Загрузка вопросов, отправка ответов, получение рекомендаций
   - **Admin**: Админ-панель для управления растениями (CRUD операции)

3. **Админ-панель**
   - Полнофункциональная панель управления растениями
   - Создание, редактирование и удаление растений
   - Доступ только для пользователей с ролью `admin`
   - Интеграция в навигацию и профиль

## Как запустить

### Backend

1. Установите зависимости:
```bash
cd bloom-wise-web/backend
npm install
```

2. Настройте базу данных (PostgreSQL):
   - Создайте базу данных `bloomwise`
   - Или используйте Docker: `docker-compose up -d db`

3. Создайте `.env` файл (скопируйте из `.env.example`):
```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/bloomwise
JWT_SECRET=your-secret-key-change-in-production
PORT=4000
NODE_ENV=development
```

4. Запустите сервер:
```bash
npm run dev
```

Backend будет доступен на `http://localhost:4000`

### Frontend

1. Установите зависимости (если еще не установлены):
```bash
cd bloom-wise-web/frontend
npm install
```

2. (Опционально) Создайте `.env` файл для изменения API URL:
```env
VITE_API_URL=http://localhost:4000/api
```

3. Запустите dev сервер:
```bash
npm run dev
```

Frontend будет доступен на `http://localhost:8080`

## Структура API

Все эндпоинты требуют JWT токен в заголовке (кроме `/api/auth/*`):
```
Authorization: Bearer <token>
```

### Примеры запросов

**Регистрация:**
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Имя Пользователя"
}
```

**Получение растений:**
```bash
GET /api/shop/plants?search=монстера
```

**Добавление в корзину:**
```bash
POST /api/cart/add
{
  "plantId": "uuid",
  "quantity": 1
}
```

## Примечания

- База данных автоматически синхронизируется в режиме разработки
- При первом запуске автоматически создаются:
  - Админский аккаунт: `admin@bloomwise.com` / `admin123`
  - 6 тестовых растений
- JWT токены действительны 7 дней
- Все цены хранятся в decimal формате
- Админ-панель доступна по адресу `/admin` (только для админов)

## Дополнительная документация

- [Настройка базы данных](backend/DATABASE_SETUP.md)
- [Админ-панель](ADMIN_PANEL.md)

