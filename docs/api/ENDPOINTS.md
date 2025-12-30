# RicSan's Apartment API - Endpoints Reference
## Version 1.0.0

**Base URL:** `http://localhost:8000/api/v1`

---

## 🏥 Health Check

### GET /health
Check if API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "API is running",
  "version": "1.0.0",
  "timestamp": "2024-12-30 10:30:00"
}
```

---

## 🏢 Apartments

### GET /apartments
List all apartments (paginated).

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with apartment list

---

### GET /apartments/available
List only available apartments.

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with filtered apartment list

---

### GET /apartments/search
Search apartments with filters.

**Query Parameters:**
- `bedrooms` (integer, optional)
- `bathrooms` (integer, optional)
- `min_price` (numeric, optional)
- `max_price` (numeric, optional)
- `status` (string, optional: available|rented)

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with filtered apartment list

---

### GET /apartments/{id}
Get single apartment by ID.

**Parameters:**
- `id` (integer, required) - Apartment ID

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with apartment details

---

## 🛋️ Amenities

### GET /amenities
List all amenities.

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with amenity list

---

### GET /amenities/categories
List amenities grouped by category.

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with categorized amenities

---

### GET /amenities/{id}
Get single amenity by ID.

**Parameters:**
- `id` (integer, required) - Amenity ID

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with amenity details

---

## 📊 Statistics

### GET /statistics
Get dashboard statistics.

**Status:** Not implemented (Task #2)  
**Expected:** 200 OK with statistics

**Example Response:**
```json
{
  "total_apartments": 6,
  "available_apartments": 4,
  "rented_apartments": 2,
  "average_price": 3500,
  "total_amenities": 18
}
```

---

## 🔄 Implementation Status

- [x] Routes defined
- [x] CORS configured
- [x] Health check working
- [ ] Controllers (Task #2)
- [ ] Resources (Task #3)
- [ ] Validation (Task #4)
- [ ] Error Handling (Task #5)
- [ ] Full Documentation (Task #6)
- [ ] Tests (Task #7)

---

**Last Updated:** Task #1 Complete
