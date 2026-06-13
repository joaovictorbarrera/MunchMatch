<p align="center">
  <img src="https://i.imgur.com/aIIjyMs.png" alt="MunchMatch Logo" width="250">
</p>

<p align="center">
  <strong>Swipe on dishes to find your perfect meal plan.</strong>
</p>

<p align="center">
  Built with React • Spring Boot • MySQL • Railway
</p>

---

## 📖 Overview

MunchMatch is a full-stack web application that simplifies meal planning through a swipe-based experience inspired by modern matching apps.

Users enter their nutritional goals, dietary restrictions, and preferences, then browse meal recommendations one dish at a time. By liking or skipping meals, users build a personalized collection of dishes that MunchMatch uses to generate customized meal plans.

The goal is to make healthy eating simple, personalized, and enjoyable.

---

## 📸 Screenshots

<h3>Home Page</h3>

Start here.
<p>
  <img src="https://i.imgur.com/7IOKb0B.png" alt="Home Page" width="600">
</p>

---

<h3>Nutrition Questionnaire</h3>

Users can customize their experience by entering calorie targets, macronutrient goals, and dietary restrictions. These preferences are used to generate meal recommendations tailored to their needs.

<p>
  <img src="https://i.imgur.com/pyQfJLu.png" alt="Questionnaire" width="600">
</p>

---

<h3>Meal Discovery</h3>

Meals are presented one at a time in a swipe-style interface. Users can like or skip dishes while viewing nutritional information, allowing MunchMatch to learn their preferences and build a personalized meal plan.

<p>
  <img src="https://i.imgur.com/QMdGKg9.png" alt="Meal Discovery" width="600">
</p>

---

<h3>Meal Plan Results</h3>

After selecting meals, MunchMatch generates complete meal plans that best match the user's preferences and nutritional goals. Results include meal breakdowns, nutritional totals, and a compatibility score for each plan.

<p align="center">
  <img src="https://i.imgur.com/4jyUdYx.png" alt="Results 1" width="48%">
  <img src="https://i.imgur.com/bMUBRf2.png" alt="Results 2" width="48%">
</p>

---

## ✨ Features

### 🍽️ Swipe-to-Choose Meals

Browse meal recommendations through an intuitive swipe-style interface. Like meals you enjoy and skip meals that don't appeal to you.

### 🎯 Personalized Nutrition Goals

Set:

- Daily calorie targets
- Protein goals
- Carbohydrate goals
- Fat goals

MunchMatch uses these preferences when generating meal plans.

### 🥗 Dietary Restrictions Support

Customize recommendations based on dietary needs and restrictions.

Examples include:

- Vegetarian
- Vegan
- Gluten-Free
- Dairy-Free
- Other dietary preferences

### 📊 Smart Meal Plan Generation

Generate complete meal plans containing:

- Breakfast
- Lunch
- Snacks
- Dinner

Each plan includes nutritional totals and a compatibility score based on your selections.

### 📧 Save & Share

Users can:

- Email meal plans
- Generate shareable links
- Revisit meal plans later

### 📱 Responsive Design

Works across:

- Desktop browsers
- Tablets
- Mobile devices

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Backend

- Spring Boot
- Java
- REST API Architecture

### Database

- MySQL

### Deployment

- Railway

### External Services

- Spoonacular API
- SMTP Email Service

---

## 🏗️ Architecture

```text
                 ┌─────────────────┐
                 │    React App    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Spring Boot API │
                 └──────┬─────┬────┘
                        │     │
                        │     │
                        ▼     ▼
               Spoonacular   MySQL
                    API    Database
                        │
                        ▼
                     Railway
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project locally, install:

- Java 17+
- Maven
- Node.js 18+
- npm
- MySQL Server

---

## Clone the Repository

```bash
git clone https://github.com/joaovictorbarrera/MunchMatch.git
cd MunchMatch
```

---

## Backend Setup

Navigate to the backend project:

```bash
cd backend
```

Install dependencies and start the application:

```bash
mvn spring-boot:run
```

The API should start on:

```text
http://localhost:8080
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application should be available at:

```text
http://localhost:3000
```

---

## ⚙️ Environment Variables

Create a `.env` file or configure these variables in Railway.

### Required Variables

| Variable | Description |
|-----------|-------------|
| API_KEY | Spoonacular API key |
| DB_URL | MySQL database connection URL |
| DB_USERNAME | MySQL username |
| DB_PASSWORD | MySQL password |
| EMAIL_USERNAME | Email account used for sending meal plans |
| EMAIL_PASSWORD | SMTP password or application password |

### Example Configuration

```env
API_KEY=your_spoonacular_api_key

DB_URL=jdbc:mysql://localhost:3306/munchmatch
DB_USERNAME=root
DB_PASSWORD=password

EMAIL_USERNAME=example@gmail.com
EMAIL_PASSWORD=your_app_password
```

> Never commit credentials, secrets, or `.env` files to source control.

---

## 🔑 Spoonacular API

MunchMatch uses the Spoonacular API to:

- Retrieve meal recommendations
- Access nutritional information
- Generate personalized food suggestions

To run the project locally:

1. Create a Spoonacular account
2. Generate an API key
3. Add the key to the `API_KEY` environment variable

---

## 📊 User Workflow

```text
Start
  │
  ▼
Enter Nutrition Goals
  │
  ▼
Select Dietary Restrictions
  │
  ▼
Browse Meal Suggestions
  │
  ▼
Like / Skip Meals
  │
  ▼
Generate Meal Plan
  │
  ▼
View Results
  │
  ▼
Email or Share Plan
```

---

## 📚 Project Goals

MunchMatch was created to solve a common problem:

Many meal planning tools are time-consuming, overwhelming, or require extensive setup.

MunchMatch focuses on:

- Simplicity
- Personalization
- Accessibility
- Nutrition awareness
- User engagement

By combining nutritional planning with an intuitive matching experience, users can quickly discover meals they actually want to eat.

---

## 🤝 Contributors

Natural Intelligence Group

### Team Members

- Joao B
- Rita S
- Anna U
- Nivia F

---

<p align="center">
  Built with ❤️ by the MunchMatch Team
</p>
