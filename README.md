# 📅 Appointment Scheduler API

A backend system for managing appointments between **Managers** and **Developers** with robust features like filtering, reporting, bulk uploads, and user blocking.

---

## 🚀 Features

### 👥 Appointments
- Managers can create an appointment with **one or more developers**.
- Developers can **accept** or **decline** the appointment.
- Managers can **view responses** (accepted/declined) of the invited developers.
- Users can **filter appointments by date**.
- Only **Managers can delete** appointments.

### ❌ Blocked Users
- Users can **block other users**.
- A blocked user **cannot schedule** an appointment with the blocker.  
  _Example: If Rajesh blocks Mahesh, Mahesh cannot schedule a meeting with Rajesh._

### 📄 Bulk User Upload
- Upload users in **CSV or Excel** format.
- Features of bulk upload:
  - ✅ View uploaded file list.
  - 📊 Show **successful and failed records** count.
  - 📅 Download the original uploaded file.

### 📆 Export & Reports
- Users can **export meetings** using filters.
- Generate **custom reports**:
  - Number of meetings **scheduled** and **attended**.
  - Filter by **month** or **custom date** range.

---

## 🛠️ Environment Variables

Here's a sample `.env` file setup:

```
env
PORT=3000
MAX_RETRIES=6
MONGO_URL=mongodb://localhost:3001
REDIS_URL=redis://localhost:6379
BASE_URL_SWAGGER=http://localhost:3000/
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email_here
EMAIL_PASSWORD=your_email_password_here
EXPIRES_IN=23h
URL=http://localhost:3000
```

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/appointment-scheduler.git
cd appointment-scheduler
npm install
```

---

## ▶️ Running the App

```bash
npm start
```

> App will run on: [http://localhost:3000](http://localhost:3000)

---

## 📚 API Docs

Access the Swagger API documentation at:  
🔗 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)


