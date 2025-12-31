# API Quick Reference

Fast lookup for RicSan's Apartment API endpoints.

---

## Base URL
http://localhost:8000/api/v1

---

## Endpoints

### **Health**
```bash
GET /health
```

### **Apartments**
```bash
GET /apartments
GET /apartments?status=available
GET /apartments?bedrooms=2&max_price=3000
GET /apartments/{id}
```

### **Amenities**
```bash
GET /amenities
GET /amenities?grouped=true
GET /amenities/{id}
```

### **Statistics**
```bash
GET /statistics
```

---

## Common Query Parameters

| Parameter | Type | Example |
|-----------|------|---------|
| status | string | `?status=available` |
| bedrooms | integer | `?bedrooms=2` |
| bathrooms | integer | `?bathrooms=1` |
| min_price | numeric | `?min_price=1000` |
| max_price | numeric | `?max_price=3000` |
| sort_by | string | `?sort_by=price_asc` |
| grouped | string | `?grouped=true` |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 404 | Not Found |
| 422 | Validation Failed |
| 500 | Server Error |

---

## Response Structure

**Success:**
```json
{
    "success": true,
    "message": "...",
    "data": { ... }
}
```

**Error:**
```json
{
    "success": false,
    "message": "...",
    "errors": { ... }
}
```

---

**Full Documentation:** [API_DOCUMENTATION_V1.md](./API_DOCUMENTATION_V1.md)
