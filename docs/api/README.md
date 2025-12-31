# RicSan's Apartment API

RESTful API for luxury apartment listings built with Laravel 11.

---

## 🚀 Quick Start

### **Prerequisites**
- PHP 8.3+
- MySQL 8.0+
- Composer
- Postman (optional, for testing)

### **Installation**

1. Clone the repository
```bash
git clone https://github.com/donmoreno09/RicSan-Apartment.git
cd RicSan-Apartment
```

2. Install dependencies
```bash
composer install
```

3. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Set up database
```bash
# Update .env with your database credentials
php artisan migrate --seed
```

5. Start server
```bash
php artisan serve
```

API will be available at: `http://localhost:8000/api/v1`

---

## 📖 Documentation

**Full API Documentation:** [API_DOCUMENTATION_V1.md](./API_DOCUMENTATION_V1.md)

**Postman Collection:** [RicSan_Apartments_API_v1.postman_collection.json](./RicSan_Apartments_API_v1.postman_collection.json)

---

## 🔗 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/apartments` | List all apartments (filterable) |
| GET | `/apartments/{id}` | Get single apartment |
| GET | `/amenities` | List all amenities |
| GET | `/amenities?grouped=true` | Grouped amenities |
| GET | `/amenities/{id}` | Get single amenity |
| GET | `/statistics` | Dashboard statistics |

---

## 🧪 Testing

### **With Postman:**
1. Import `RicSan_Apartments_API_v1.postman_collection.json`
2. Test all endpoints

### **With cURL:**
```bash
# Health check
curl http://localhost:8000/api/v1/health

# List apartments
curl http://localhost:8000/api/v1/apartments

# Filter apartments
curl "http://localhost:8000/api/v1/apartments?status=available&bedrooms=2"

# Get single apartment
curl http://localhost:8000/api/v1/apartments/1

# Get statistics
curl http://localhost:8000/api/v1/statistics
```

---

## 📊 Response Format

All responses follow this structure:

**Success:**
```json
{
    "success": true,
    "message": "Success message",
    "data": { ... }
}
```

**Error:**
```json
{
    "success": false,
    "message": "Error message",
    "errors": { ... }
}
```

---

## 🏗️ Architecture

**Design Patterns:**
- Repository Pattern (data access)
- Service Layer Pattern (business logic)
- API Resources (data transformation)
- Form Requests (validation)
- Response Helpers (consistent formatting)

**SOLID Principles:**
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---

## 🔐 Authentication

**Current:** No authentication (public read-only API)

**Coming Soon (Phase 6):**
- JWT authentication
- Admin endpoints (CRUD operations)
- Role-based access control

---

## 📝 Changelog

### **v1.0.0** (2024-12-30)
- Initial API release
- 6 public endpoints
- Full CRUD backend (admin features coming)
- Comprehensive documentation
- Postman collection

---

## 🤝 Contributing

This is a learning project for portfolio purposes. Feedback welcome!

<!-- ---

## 📄 License

MIT License - See LICENSE file for details

--- -->

## 👤 Author

**Don Moreno** - Full-Stack Developer
- Building interview-ready skills
- Learning Laravel 11 + React 18
- Implementing clean architecture

---

## 🙏 Acknowledgments

- Laravel documentation
- REST API best practices
- Clean Architecture principles
- SOLID design patterns

---

**For detailed API documentation, see:** [API_DOCUMENTATION_V1.md](./API_DOCUMENTATION_V1.md)
