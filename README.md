# 🏢 RicSan's Apartment Showcase - Premium Real Estate Platform

A modern, full-stack web application showcasing luxury apartments with elegant design and professional features. Built with Laravel 11 and React 18 following clean architecture principles, SOLID design patterns, and industry best practices.

![Project Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red)
![React](https://img.shields.io/badge/React-18.x-blue)
![PHP](https://img.shields.io/badge/PHP-8.3+-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4)
![Tests](https://img.shields.io/badge/tests-30%20passed%2C%201%20skipped-success)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Project Management](#-project-management)
- [Developer](#-developer)

---

## 🎯 Overview

**RicSan's Apartment Showcase** is a professional full-stack real estate platform designed to present 6 luxury apartments with a modern, sophisticated interface. This project demonstrates comprehensive full-stack development capabilities, clean architecture principles, cloud integration, and professional development practices.

### **Key Highlights:**

- ✨ **Modern Design** - Luxury aesthetic with premium typography and sophisticated animations
- 🏗️ **Clean Architecture** - SOLID principles, Repository Pattern, Service Layer
- 🖼️ **Cloud Image Management** - Cloudinary integration with automatic optimization
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ⚡ **High Performance** - Optimized with caching, CDN delivery, and lazy loading
- 🔒 **Secure** - Following Laravel security best practices and validation standards
- 🧪 **Well-Tested** - Comprehensive test coverage with 30+ automated tests
- 📊 **Agile Workflow** - Professional project management with Trello using Kanban methodology

### **Project Purpose:**

This project serves as a comprehensive portfolio piece demonstrating:
- Full-stack web development expertise (Laravel + React)
- RESTful API design and implementation
- Modern frontend development with React 18 and Tailwind CSS v4
- Cloud services integration (Cloudinary)
- Professional testing practices
- Clean code and architecture principles
- Agile project management skills

---

## ✨ Features

### **Core Features (Implemented):**

#### **Backend API:**
- 🏠 **Apartment Management** - Complete CRUD operations for 6 luxury apartments
- 🔍 **Advanced Search** - Filter by bedrooms, price range, availability, apartment name
- 🏷️ **Real-time Status** - Track availability (Available/Rented)
- 📊 **Statistics Endpoint** - Dashboard statistics (total, available, average price)
- 🎯 **RESTful Design** - Versioned API (v1) with consistent response format
- ✅ **Validation** - Comprehensive Form Request validation
- 📝 **API Resources** - Consistent data transformation layer
- 🧪 **Tested** - 26 feature tests + 5 API tests (30 passed, 1 skipped)

#### **Image Management:**
- 🖼️ **Cloud Storage** - Professional image hosting with Cloudinary
- 📤 **Image Upload** - Drag-and-drop file upload with React frontend
- 🎨 **Automatic Optimization** - WebP conversion, quality auto-adjustment
- 📊 **Metadata Storage** - Image dimensions, format, file size tracking
- ⭐ **Primary Image Selection** - Featured image designation per apartment
- 🗑️ **Image Deletion** - Complete cleanup (Cloudinary + database)
- 📈 **Upload Progress** - Real-time progress tracking (0-100%)

#### **Frontend:**
- ⚛️ **React 18** - Modern component-based UI architecture
- 🎨 **Tailwind CSS v4** - Utility-first styling with custom design system
- 🏗️ **Atomic Design** - Organized component structure (atoms, molecules, organisms, templates)
- 🔄 **React Router v6** - Client-side routing with nested routes
- 📡 **Axios Integration** - Service layer for API communication
- 🖼️ **Image Gallery** - High-quality apartment photos with lazy loading
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- ✨ **Premium Animations** - Smooth transitions and hover effects

#### **Database:**
- 📊 **Normalized Schema** - 3NF compliance with 5 tables
- 🔗 **Relationships** - Many-to-many (amenities), One-to-many (images, features)
- 🏃 **Performance** - Strategic indexes on frequently queried fields
- 🌱 **Seeders** - Sample data for 6 luxury apartments with images and amenities
- 🏭 **Factories** - Model factories for testing with realistic data

### **Planned Features:**

- 👤 **Admin Dashboard** - Full management interface for apartments
- 🔐 **Authentication System** - Laravel Sanctum for API authentication
- 📧 **Contact System** - Lead capture with email notifications
- 📱 **Virtual Tours** - 3D walkthrough integration
- 🌐 **Multi-language** - Internationalization support (i18n)
- 📈 **Analytics** - View statistics and user behavior tracking

---

## 🛠️ Tech Stack

### **Backend:**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Laravel** | 11.x | PHP framework for RESTful API backend |
| **PHP** | 8.3.6 | Server-side programming language |
| **MySQL** | 8.0+ | Relational database management (Docker) |
| **Composer** | 2.8.9 | PHP dependency management |
| **Cloudinary PHP SDK** | Latest | Cloud-based image storage and optimization |
| **PHPUnit** | Latest | Testing framework (30 passed, 1 skipped) |

### **Frontend:**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | Component-based UI library |
| **Vite** | Latest | Fast build tool and dev server |
| **React Router** | 6.x | Client-side routing and navigation |
| **Axios** | Latest | HTTP client for API requests |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **PropTypes** | Latest | Runtime type checking for React props |

### **Development Tools:**

- **Docker** - Containerization for MySQL, phpMyAdmin, Redis
- **Git** - Version control with conventional commits
- **VS Code** - Primary code editor
- **Trello** - Agile project management (Kanban)
- **Postman** - API testing and documentation
- **phpMyAdmin** - Database management interface (Docker)
- **dbdiagram.io** - Database schema design and visualization

### **Cloud Services:**

- **Cloudinary** - Image hosting, optimization, and CDN delivery
- **Vercel** (Planned) - Frontend hosting (React SPA)
- **Railway** (Planned) - Backend hosting (Laravel API)
- **GitHub Actions** (Planned) - CI/CD pipeline

---

## 🏗️ Architecture

### **Application Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                       END USERS                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────▼────────┐             ┌───────▼────────┐
│   FRONTEND     │             │    BACKEND     │
│  (Laravel+Vite)│             │   (Laravel)    │
│                │             │                │
│   React SPA    │────────────▶│  RESTful API   │
│   Tailwind v4  │   REST API  │  Clean Arch    │
│   Axios Client │   (JSON)    │  SOLID         │
└────────────────┘             └────────┬───────┘
                                        │
                       ┌────────────────┼────────────────┐
                       │                │                │
               ┌───────▼────────┐  ┌───▼────────┐  ┌───▼──────┐
               │   CLOUDINARY   │  │  DATABASE  │  │  REDIS   │
               │  (CDN Images)  │  │   MySQL    │  │ (Cache)  │
               └────────────────┘  └────────────┘  └──────────┘
```

### **Backend Architecture (Clean Architecture):**

```
┌────────────────────────────────────────────────────────────┐
│                     HTTP LAYER                              │
│  Routes → Controllers (Thin) → Form Requests (Validation)  │
└─────────────────────┬──────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                  SERVICE LAYER                              │
│  Business Logic, Transactions, External API Integration    │
│  (ApartmentService, ImageService)                          │
└─────────────────────┬──────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                REPOSITORY LAYER                             │
│  Data Access Abstraction (Interfaces + Implementations)    │
│  (ApartmentRepository, AmenityRepository)                  │
└─────────────────────┬──────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                   MODEL LAYER                               │
│  Eloquent Models with Relationships                         │
│  (Apartment, Amenity, Image, Feature)                      │
└─────────────────────┬──────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                  DATABASE LAYER                             │
│  MySQL (Docker), Migrations, Seeders, Factories            │
└────────────────────────────────────────────────────────────┘
```

**Key Architectural Patterns:**
- ✅ **Repository Pattern** - Data access abstraction
- ✅ **Service Layer Pattern** - Business logic separation
- ✅ **Dependency Injection** - Loose coupling via constructor injection
- ✅ **Form Request Validation** - Request validation layer
- ✅ **API Resources** - Response transformation layer
- ✅ **SOLID Principles** - Throughout the codebase

### **Backend Directory Structure:**

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/V1/              # Versioned API Controllers
│   │       ├── ApartmentController.php
│   │       ├── AmenityController.php
│   │       ├── StatisticsController.php
│   │       └── ImageController.php
│   ├── Requests/                # Form Request Validation
│   │   ├── SearchApartmentsRequest.php
│   │   └── StoreImageRequest.php
│   └── Resources/               # API Response Transformers
│       ├── ApartmentResource.php
│       ├── ApartmentCollection.php
│       ├── AmenityResource.php
│       └── ImageResource.php
├── Models/                      # Eloquent ORM Models
│   ├── Apartment.php
│   ├── Amenity.php
│   ├── Image.php
│   └── Feature.php
├── Repositories/
│   ├── Contracts/               # Repository Interfaces
│   │   ├── ApartmentRepositoryInterface.php
│   │   └── AmenityRepositoryInterface.php
│   └── Implementation/          # Concrete Implementations
│       ├── ApartmentRepository.php
│       └── AmenityRepository.php
├── Services/                    # Business Logic Layer
│   ├── ApartmentService.php
│   ├── AmenityService.php
│   └── ImageService.php
└── Providers/
    └── RepositoryServiceProvider.php  # Dependency Injection
```

### **Frontend Architecture (Atomic Design):**

```
resources/js/
├── components/
│   ├── atoms/                   # Basic UI Elements
│   │   ├── Button/
│   │   ├── Badge/
│   │   └── Input/
│   ├── molecules/               # Simple Component Groups
│   │   ├── ApartmentCard/
│   │   ├── SearchBar/
│   │   └── ImageUpload/
│   ├── organisms/               # Complex UI Sections
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── ApartmentGrid/
│   └── templates/               # Page Layouts
│       └── MainLayout/
├── pages/                       # Route Components
│   ├── HomePage/
│   ├── ApartmentDetailPage/
│   ├── UploadTestPage/
│   └── NotFoundPage/
├── services/                    # API Integration Layer
│   ├── api.js                   # Axios instance
│   ├── apartmentService.js
│   ├── amenityService.js
│   └── imageService.js
├── hooks/                       # Custom React Hooks
└── App.jsx                      # Root Component with Router
```

### **Database Schema:**

```
apartments
├── id (PK)
├── title
├── description (TEXT)
├── price (DECIMAL)
├── bedrooms
├── bathrooms
├── square_feet
├── floor
├── is_available (BOOLEAN)
├── created_at
└── updated_at

amenities
├── id (PK)
├── name (UNIQUE)
├── icon
├── category
├── created_at
└── updated_at

apartment_amenity (PIVOT)
├── apartment_id (FK → apartments.id)
└── amenity_id (FK → amenities.id)

images
├── id (PK)
├── apartment_id (FK → apartments.id, CASCADE)
├── url
├── cloudinary_public_id
├── width
├── height
├── format
├── bytes
├── alt_text
├── order
├── is_primary (BOOLEAN)
├── created_at
└── updated_at

features
├── id (PK)
├── apartment_id (FK → apartments.id, CASCADE)
├── name
├── value
├── category
├── created_at
└── updated_at
```

**Database Design Features:**
- ✅ **Normalized (3NF)** - No redundant data
- ✅ **Foreign Keys** - Referential integrity with CASCADE deletes
- ✅ **Strategic Indexes** - On `is_available`, `price`, `apartment_id`
- ✅ **Flexible Features** - Key-value pairs for custom properties
- ✅ **Primary Images** - One featured image per apartment

---

## 📦 Installation

### **Prerequisites:**

Ensure you have the following installed:
- **PHP** 8.3 or higher
- **Composer** 2.8 or higher
- **Node.js** 18+ and npm
- **Docker** & Docker Compose
- **Git**

### **Step 1: Clone Repository**

```bash
git clone https://github.com/donmoreno09/RicSan-Apartment.git
cd RicSan-Apartment
```

### **Step 2: Backend Setup**

```bash
# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### **Step 3: Start Docker Containers**

```bash
# Start MySQL, phpMyAdmin, and Redis containers
docker-compose up -d

# Verify containers are running
docker ps
# Should show: ricsan_mysql, ricsan_phpmyadmin, ricsan_redis
```

### **Step 4: Configure Environment**

Edit `.env` file with your settings:

```env
# Application
APP_NAME="RicSan's Apartment Showcase"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (Docker MySQL)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ricsan_apartment
DB_USERNAME=ricsan_dev
DB_PASSWORD=ricsan_dev_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8000
```

### **Step 5: Database Setup**

```bash
# Run migrations
php artisan migrate

# Seed database with sample data (6 luxury apartments)
php artisan db:seed

# Verify data
docker exec -it ricsan_mysql mysql -uricsan_dev -pricsan_dev_password ricsan_apartment -e "SELECT id, title, price FROM apartments;"
```

### **Step 6: Frontend Setup**

```bash
# Install npm dependencies
npm install

# Start Vite dev server (runs in background)
npm run dev
```

### **Step 7: Start Laravel Server**

```bash
# Start Laravel development server
php artisan serve
# Server running at: http://localhost:8000
```

### **Step 8: Verify Installation**

**Test the following endpoints:**

- **Frontend App:** http://localhost:8000
- **API Health Check:** http://localhost:8000/api/v1/health
- **Apartments API:** http://localhost:8000/api/v1/apartments
- **phpMyAdmin:** http://localhost:8080 (credentials: ricsan_dev / ricsan_dev_password)

---

## ⚙️ Configuration

### **Cloudinary Setup**

This project uses Cloudinary for professional cloud-based image storage and optimization.

#### **1. Create Cloudinary Account**

1. Visit [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email
4. Navigate to Dashboard

#### **2. Get API Credentials**

From your Cloudinary Dashboard, copy:
- **Cloud Name**
- **API Key**
- **API Secret**

#### **3. Configure Environment Variables**

Add to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### **4. Test Upload**

```bash
# Visit the upload test page
http://localhost:8000/test-upload

# Upload an image to verify Cloudinary integration
```

**Features:**
- ✅ Automatic WebP conversion
- ✅ Quality auto-optimization
- ✅ CDN delivery worldwide
- ✅ Image transformation on-the-fly
- ✅ Metadata storage (dimensions, format, size)

---

## 💻 Development

### **Daily Workflow:**

```bash
# 1. Pull latest changes
git checkout master
git pull origin master

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Update Trello
# Move card to "In Progress"

# 4. Develop feature
# Make changes, test locally

# 5. Run tests
php artisan test
npm test

# 6. Commit changes (conventional commits)
git add .
git commit -m "feat: add your feature description"

# 7. Push to remote
git push origin feature/your-feature-name

# 8. Create Pull Request
# Wait for review and merge

# 9. Update Trello
# Move card to "Done"
```

### **Git Branch Strategy:**

- `master` - Production-ready code (protected)
- `develop` - Development branch (if using)
- `feature/*` - New features (e.g., feature/apartment-search)
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### **Commit Convention (Conventional Commits):**

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting, no logic change)
refactor: Code refactoring
test: Adding or updating tests
chore: Maintenance tasks
```

### **Running Services:**

```bash
# Docker containers (MySQL, phpMyAdmin, Redis)
docker-compose up -d
docker-compose down

# Laravel development server
php artisan serve

# Vite dev server (React hot reload)
npm run dev

# Watch Tailwind changes
npm run dev  # Already includes Tailwind watch
```

### **Useful Commands:**

```bash
# Clear Laravel caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Database operations
php artisan migrate:fresh --seed  # Reset database with sample data
php artisan db:seed  # Run seeders only
php artisan tinker  # Interactive shell

# Testing
php artisan test  # Run all tests
php artisan test --filter ImageUploadTest  # Run specific test

# Production build
npm run build  # Build React for production
```

---

## 📡 API Documentation

### **Base URL:** `http://localhost:8000/api/v1`

### **Health Check**

```http
GET /api/v1/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "API is running",
  "version": "1.0.0",
  "timestamp": "2026-01-05 12:34:56"
}
```

---

### **Apartments**

#### **Get All Apartments**

```http
GET /api/v1/apartments
```

**Query Parameters:** (optional)
- `page` - Page number for pagination
- `per_page` - Items per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Luxury Downtown Penthouse",
      "description": "Stunning penthouse with panoramic city views...",
      "price": 3500,
      "bedrooms": 3,
      "bathrooms": 2,
      "square_feet": 1850,
      "floor": 12,
      "is_available": true,
      "images": [
        {
          "id": 1,
          "url": "https://res.cloudinary.com/...",
          "is_primary": true,
          "order": 1
        }
      ],
      "amenities": [
        {
          "id": 1,
          "name": "High-Speed WiFi",
          "icon": "fa-wifi",
          "category": "apartment"
        }
      ],
      "features": [
        {
          "id": 1,
          "name": "View",
          "value": "City Skyline",
          "category": "interior"
        }
      ]
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 6,
    "per_page": 10
  }
}
```

#### **Get Single Apartment**

```http
GET /api/v1/apartments/{id}
```

**Path Parameters:**
- `id` (required) - Apartment ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Luxury Downtown Penthouse",
    "description": "Stunning penthouse...",
    "price": 3500,
    "bedrooms": 3,
    "bathrooms": 2,
    "square_feet": 1850,
    "floor": 12,
    "is_available": true,
    "images": [...],
    "amenities": [...],
    "features": [...]
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Apartment with ID 99 not found"
}
```

#### **Search Apartments**

```http
GET /api/v1/apartments/search
```

**Query Parameters:** (all optional)
- `name` - Search by apartment name (partial match)
- `bedrooms` - Filter by number of bedrooms
- `min_price` - Minimum monthly price
- `max_price` - Maximum monthly price
- `availability` - Filter by availability (1=available, 0=rented)

**Example:**
```http
GET /api/v1/apartments/search?bedrooms=2&max_price=3000&availability=1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "title": "Elegant City Studio",
      "price": 2800,
      "bedrooms": 2,
      "is_available": true,
      ...
    }
  ]
}
```

---

### **Amenities**

#### **Get All Amenities**

```http
GET /api/v1/amenities
```

**Query Parameters:** (optional)
- `grouped` - Group by category (true/false)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "High-Speed WiFi",
      "icon": "fa-wifi",
      "category": "apartment",
      "apartments_count": 6
    }
  ]
}
```

#### **Get Single Amenity**

```http
GET /api/v1/amenities/{id}
```

---

### **Statistics**

#### **Get Dashboard Statistics**

```http
GET /api/v1/statistics
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_apartments": 6,
    "available_apartments": 4,
    "rented_apartments": 2,
    "average_price": 3200,
    "total_amenities": 18,
    "total_images": 28
  }
}
```

---

### **Image Management**

#### **Upload Image to Apartment**

```http
POST /api/v1/apartments/{id}/images
```

**Path Parameters:**
- `id` (required) - Apartment ID

**Request (multipart/form-data):**
```
Content-Type: multipart/form-data

image: [binary file data]
is_primary: 1 or 0
```

**Validation Rules:**
- `image` - Required, must be image file (jpeg, png, jpg, webp), max 2MB
- `is_primary` - Optional, string '0' or '1'

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": 32,
    "apartment_id": 1,
    "url": "https://res.cloudinary.com/db0bm6keb/image/upload/v1767501711/apartments/apartment-1-1767501711-1f0a7c.jpg",
    "cloudinary_public_id": "apartments/apartment-1-1767501711-1f0a7c",
    "width": 800,
    "height": 600,
    "format": "jpg",
    "bytes": 45000,
    "alt_text": "Luxury Downtown Penthouse - Image",
    "order": 6,
    "is_primary": true,
    "created_at": "2026-01-05T04:41:52.000000Z",
    "updated_at": "2026-01-05T04:41:52.000000Z"
  }
}
```

**Error Response (422 Validation Error):**
```json
{
  "message": "The image must be a file of type: jpeg, png, jpg, webp.",
  "errors": {
    "image": [
      "The image must be a file of type: jpeg, png, jpg, webp."
    ]
  }
}
```

#### **Delete Image**

```http
DELETE /api/v1/images/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

#### **Set Image as Primary**

```http
PATCH /api/v1/images/{id}/primary
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Primary image updated successfully",
  "data": {
    "id": 32,
    "is_primary": true,
    ...
  }
}
```

---

## 🧪 Testing

### **Backend Testing (PHPUnit):**

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Api/ImageUploadTest.php

# Run specific test method
php artisan test --filter test_can_upload_image_to_apartment

# Run with coverage (requires xdebug)
php artisan test --coverage

# Run only feature tests
php artisan test tests/Feature

# Run only unit tests
php artisan test tests/Unit
```

**Test Results:**
```
Tests:    1 skipped, 30 passed (15 assertions in ImageUploadTest)
Duration: ~3 seconds
```

**Test Coverage:**
- ✅ **API Endpoints** - All endpoints tested (GET, POST, PATCH, DELETE)
- ✅ **Validation** - File type, size validation
- ✅ **Business Logic** - Set primary, delete image
- ✅ **Error Handling** - 404, 422, 500 responses
- ✅ **Professional Approach** - Skipped external service tests (Cloudinary)

**Test Files:**
- `tests/Feature/Api/ApartmentApiTest.php`
- `tests/Feature/Api/AmenityApiTest.php`
- `tests/Feature/Api/StatisticsApiTest.php`
- `tests/Feature/Api/ImageUploadTest.php`
- `tests/Unit/ImageServiceTest.php`

### **Frontend Testing (Optional):**

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

---

## 🚀 Deployment

### **Production Architecture (Planned):**

```
Frontend (React)  →  Vercel      →  Global CDN
Backend (Laravel) →  Railway     →  PostgreSQL Database
Images           →  Cloudinary   →  CDN Delivery
```

### **Environment Variables:**

**Backend (Railway):**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-api.railway.app

DB_CONNECTION=postgresql
DB_HOST=postgres.railway.internal
DB_PORT=5432
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=generated-password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=https://your-app.vercel.app
```

**Frontend (Vercel):**
```env
VITE_API_URL=https://your-api.railway.app/api/v1
```

### **Deployment Steps:**

#### **1. Deploy Backend to Railway:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add PostgreSQL
railway add

# Deploy
railway up
```

#### **2. Deploy Frontend to Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Build production
npm run build

# Deploy
vercel --prod
```

---

## 📊 Project Management

### **Agile Methodology with Trello:**

This project follows **Agile/Kanban** principles using Trello for project management.

**Board Structure:**
- 📚 **Resources & Documentation** - Guides, references, design files
- 📋 **Backlog** - Future features and improvements
- 📅 **To Do (This Week)** - Sprint tasks
- 🚧 **In Progress** - Active development
- ⏸️ **Blocked/Waiting** - Tasks waiting on dependencies
- 🧪 **Testing** - In QA/testing phase
- ✅ **Done (This Sprint)** - Completed this week
- 🎉 **Archive** - Historical completed tasks

**Labels:**
- 🔴 Critical
- 🟠 Backend
- 🟢 Frontend
- 🔵 Database
- 🟡 DevOps
- 🟣 Documentation
- ⚪ Bug
- ⚫ Feature

**Development Phases:**
- ✅ **Phase 1:** Environment Setup & Project Initialization
- ✅ **Phase 2:** Database Design & Backend Foundation
- ✅ **Phase 3:** RESTful API Development
- ✅ **Phase 4:** React Frontend Development
- ✅ **Phase 4.5:** Cloudinary Integration
- 🔄 **Phase 5:** Advanced Features (In Progress)
- 📋 **Phase 6:** Testing & Quality Assurance
- 📋 **Phase 7:** Deployment & Production

---

## 🎨 Design System

### **Color Palette:**

```css
/* Primary Colors */
--charcoal: #1a1a1a;          /* Dark charcoal - main text */
--gold: #D4AF37;               /* Warm gold - accents */
--gold-dark: #B8941F;          /* Dark gold - hover states */
--gold-light: #E5C158;         /* Light gold - highlights */

/* Neutral Colors */
--cream: #f5f1ed;              /* Creamy off-white - backgrounds */
--white: #ffffff;              /* Pure white */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-300: #d1d5db;
--gray-600: #4b5563;
--gray-900: #111827;

/* Status Colors */
--green-500: #10b981;          /* Available status */
--red-500: #ef4444;            /* Rented status */
```

### **Typography:**

```css
/* Headings */
font-family: 'Playfair Display', serif;
font-weight: 700;

/* Body Text */
font-family: 'DM Sans', sans-serif;
font-weight: 400, 500, 600;
```

### **Design Principles:**

- ✨ **Sophisticated & Luxury** - Premium aesthetic throughout
- 📱 **Mobile-First** - Designed for mobile, enhanced for desktop
- ⚡ **Smooth Animations** - 300ms transitions, hover effects
- 🎯 **Clear Hierarchy** - Visual weight guides attention
- 🔍 **Intuitive UX** - Easy navigation and interaction
- ♿ **Accessible** - WCAG 2.1 AA compliance

---

## 📈 Development Statistics

### **Project Metrics:**

```
Total Files:        150+
Lines of Code:      ~8,500
Backend Code:       ~4,000 lines (PHP)
Frontend Code:      ~3,500 lines (JavaScript/JSX)
Tests:              30 passed, 1 skipped
Test Assertions:    200+
Technologies:       12
Development Time:   6 weeks
Commits:            100+
```

### **Code Distribution:**

```
Backend (Laravel):
- Controllers:      4 files
- Models:          4 files
- Repositories:    6 files (interfaces + implementations)
- Services:        3 files
- Migrations:      5 files
- Seeders:         4 files
- Tests:           5 files

Frontend (React):
- Components:      15+ (atoms, molecules, organisms)
- Pages:           4 routes
- Services:        4 API services
- Styles:          Tailwind CSS v4
```

---

## 🎓 Learning Outcomes

This project demonstrates comprehensive proficiency in:

**Backend Development:**
- ✅ Laravel 11 framework mastery
- ✅ RESTful API design and implementation
- ✅ Clean architecture (Repository + Service layers)
- ✅ SOLID principles in practice
- ✅ Database design and normalization (3NF)
- ✅ Eloquent ORM relationships
- ✅ Form validation and error handling
- ✅ API resources for data transformation
- ✅ PHPUnit testing (30+ tests)

**Frontend Development:**
- ✅ React 18 with hooks (useState, useEffect, useParams)
- ✅ Tailwind CSS v4 utility-first styling
- ✅ Atomic design component architecture
- ✅ React Router v6 for client-side routing
- ✅ Axios for API integration
- ✅ Service layer pattern
- ✅ Form handling and file uploads
- ✅ Responsive design (mobile-first)

**DevOps & Cloud:**
- ✅ Docker containerization (MySQL, phpMyAdmin, Redis)
- ✅ Cloudinary integration (image CDN)
- ✅ Environment configuration
- ✅ Git workflow and version control
- ✅ Conventional commits

**Professional Practices:**
- ✅ Agile project management (Trello/Kanban)
- ✅ Test-driven development mindset
- ✅ Clean code principles
- ✅ Professional documentation
- ✅ Code review practices

---

## 👨‍💻 Developer

**Don Moreno**

I'm a full-stack developer passionate about building scalable, maintainable web applications using modern technologies and best practices. This project represents my commitment to clean code, professional development practices, and continuous learning.

**Connect with me:**
- GitHub: [@donmoreno09](https://github.com/donmoreno09)
- Repository: [RicSan-Apartment](https://github.com/donmoreno09/RicSan-Apartment.git)

---
<!-- 
## 🚀 Future Enhancements

### **Planned Features (Phase 5+):**

**Phase 5: Advanced Features**
- [ ] Advanced search with filters UI
- [ ] Apartment comparison feature
- [ ] Favorites/wishlist functionality
- [ ] Share apartment via social media
- [ ] Print-friendly apartment details

**Phase 6: Admin Features**
- [ ] User authentication (Laravel Sanctum)
- [ ] Admin dashboard
- [ ] CRUD operations UI for apartments
- [ ] Bulk image upload
- [ ] User role management

**Phase 7: Communication**
- [ ] Contact form with validation
- [ ] Email notifications
- [ ] Appointment scheduling
- [ ] Live chat integration
- [ ] SMS notifications

**Phase 8: Analytics & Optimization**
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Performance monitoring
- [ ] A/B testing
- [ ] User behavior tracking

**Future Considerations:**
- [ ] Payment gateway integration
- [ ] Virtual tour integration (Matterport)
- [ ] Multi-property support
- [ ] Agent profiles
- [ ] Review and rating system
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Mobile apps (React Native)

---
 -->
