# 🎓 Online_Course Platform

## 🌐 Server domen - 

## Loyihaning Maqsadi 🎯

Foydalanuvchilar (o‘quvchilar) va ustozlar uchun onlayn kurslar platformasini yaratish. Platforma orqali foydalanuvchilar kurslarni ko‘rishi, saqlashi, baholashi, izoh qoldirishi mumkin. Ustozlar esa kurslar joylaydi va o‘quvchilar bilan interaktiv aloqa qiladi.

---

## 🔧 Funksional Talablar

### Foydalanuvchi (User)
- ✅ Ro‘yxatdan o‘tish
- ✅ Akkountga kirish / chiqish
- ✅ Akkountni o‘chirish
- ✅ Akkountni tiklash (parolni unutganda)
- ✅ Kurslarni ko‘rish
- ✅ Kurslarni saqlash / saqlanganini o‘chirish
- ✅ Kursga izoh qoldirish
- ✅ Kurslarni yoqtirish (like)
- ✅ Quizlarni ko‘rish va javob berish

### Ustoz (Teacher)
- ✅ Ro‘yxatdan o‘tish
- ✅ Akkountga kirish / chiqish
- ✅ Kurs qo‘shish / tahrirlash / o‘chirish
- ✅ Kurslarga izohlarni ko‘rish
- ✅ Kurslar statistikasini ko‘rish
- ✅ Quizlar yaratish va boshqarish  

---

## 🚀 Qo‘shimcha Yechimlar va Imkoniyatlar

- 💬 Kursga **comment** yozish
- 📂 Kursni **kategoriya** bo‘yicha filtrlash (Fan, Sport, Kulgili va h.k.)
- 🧠 **Quiz / Test** moduli (kelajakda)
- 🪪 **Sertifikat berish** (kurs yakunida)
- 🌍 Ko‘p tilli qo‘llab-quvvatlash (Multilang)
- Ⓜ️ Telegram muhidda (telegram-bot)
---

## 🗂️ Ma’lumotlar Bazasi Modellari (Database Models)

### 1. `client` (Foydalanuvchilar va ustozlar umumiy)
```ts
- id: INT
- name: string
- email: string (UNIQUE)
- password: string
- role: enum('user', 'teacher','admin')
- imageUrl: string
- token: string
```

### 2. `courses`
```ts
- id: INT
- teacher_id: INT (foreign key → users.id)
- title: string
- content: text
- video_or_img: string (URL)
- link_or_number: string
- created_at: timestamp
```

### 3. `quizzes`
```ts
- id: SERIAL  
- course_id: INT  
- title: VARCHAR(255)  
- description: TEXT  
- created_at: TIMESTAMP  
```


### 4. `questions`
```ts
- id: SERIAL  
- quiz_id: INT  
- content: TEXT  
- is_correct: BOOLEAN  
```

### 5. `user_points`
```ts
- id: SERIAL  
- user_id: INT  
- points: INT  
```

### 6. `categories`
```ts
- id: INT
- course_id INT (foreign.key → courses.id)
```

### 7. `likes`
```ts
- id: INT
- course_id: INT
- user_id: INT

```

### 8. `comments`
```ts
- id: INT
- user_id: INT
- course_id: INT
- content: text
- created_at: timestamp
```

### 9. `language`
```ts
- id: INT
- category_id: INT
- uz_name: String
- ru_name: String
- ua_name: String
```

## 📡 API Yo‘llari (Routes)

| Endpoint                     | Maqsadi                         |
| ---------------------------- | ------------------------------- |
| `/`                          | Home page                       |
| `/login`                     | Login                           |
| `/register`                  | Register                        |
| `/update`                    | Account update                  |
| `/forgot`                    | Forgot password                 |
| `/delete`                    | Delete account                  |
| `/profile`                   | User/Teacher profile            |
| `/profile/likes`             | User's liked courses            |
| `/profile/courses`           | Teacher's added courses         |
| `/category/create`           | Create Category                 |
| `/courses`                   | Get all courses                 |
| `/courses/category/:id`      | Filter by category              |
| `/courses/:id/comments`      | Get/Add comments                |
| `/courses/:id/progress`      | Get user progress in course     |
| `/courses/search?title=`     | Search course by title          |
| `/quizzes/course/:course_id` | Kursga tegishli testlarni olish |
| `/quizzes/:quiz_id/questions`| Test savollarini olish          |
| `/quizzes/:quiz_id/submit`   | Test javoblarini yuborish       |


## ⚙️ Nofunksional Talablar
```ts
- ⚡ Tezkorlik — sahifalar tez yuklanadi
- 🔐 Xavfsizlik — JWT token, parolni hash qilish (bcrypt)
- 📦 Kengayuvchanlik — yangi modullar qo‘shilishi oson
- 📱 Responsiv dizayn — mobil va desktop uchun mos
- 🌐 SEO va SSR — agar ochiq kontent bo‘lsa
```

## 🔮 Kelajakdagi Takliflar
```ts
- 💬 Chat yoki forum
- 🧪 Interaktiv test va topshiriqlar
- 🪪 Kursni tugatgandan so‘ng avtomatik PDF Sertifikat
- 📊 Kurslar statistikasi va tahlil
- 📤 CSV orqali kurslarni import qilish
```

## 🧑‍💻 Texnologiyalar
```ts
- Frontend: React / Vue / Next.js - (Nomalum)
- Backend:  NestJS
- Database: PostgreSQL
- Auth: JWT + Bcrypt
- Deployment: Vercel / Render / Railway / Heroku - (Nomalum)
- Storage: Cloudinary yoki AWS S3 (video, rasm uchun) - (Momalum)
```

## 📬 Bog‘lanish
```ts
- Agar loyiha haqida savolingiz bo‘lsa, bemalol murojaat qiling.
- Developed by [Axrarov Umar] -  email: axrarovumar6@gmail.com | tel: +998900093181
```