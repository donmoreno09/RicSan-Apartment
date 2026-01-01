# RicSan's Apartment Showcase - API Documentation
## Version 1.0.0

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Response Format](#response-format)
5. [Status Codes](#status-codes)
6. [Rate Limiting](#rate-limiting)
7. [Endpoints](#endpoints)
   - [Health Check](#health-check)
   - [Apartments](#apartments)
   - [Amenities](#amenities)
   - [Statistics](#statistics)
8. [Error Handling](#error-handling)
9. [Examples](#examples)

---

## 🎯 Introduction

The RicSan's Apartment API provides access to luxury apartment listings, amenities, and statistics. This RESTful API returns JSON responses and follows standard HTTP conventions.

**Key Features:**
- RESTful architecture
- JSON request/response format
- Consistent error handling
- Query parameter filtering
- Resource relationships
- Pagination ready

**Technology Stack:**
- Laravel 11
- MySQL Database
- RESTful API Design
- JSON Resources

---

## 🌐 Base URL

**Development:**
http://localhost:8000/api/v1

**Production:**
https://api.ricsanapartments.com/api/v1

All endpoints are prefixed with `/api/v1` for versioning.

---

## 🔐 Authentication

**Current Version:** No authentication required (public read-only access)

**Coming in Phase 6:**
- JWT Bearer token authentication
- Admin-only endpoints (create, update, delete)
- User roles and permissions

**Example (Future):**
```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

---

## 📦 Response Format

All API responses follow a consistent JSON structure:

### **Success Response:**
```json
{
    "success": true,
    "message": "Success message",
    "data": {
        // Response data here
    },
    "meta": {
        // Optional metadata
    }
}
```

### **Error Response:**
```json
{
    "success": false,
    "message": "Error message",
    "errors": {
        // Field-specific errors (validation only)
    }
}
```

---

## 📊 Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no content returned |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | HTTP method not supported |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error occurred |

---

## ⚡ Rate Limiting

**Coming Soon (Phase 3):**
- 60 requests per minute per IP address
- No authentication required initially

**Future Rate Limit Headers:**
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
```

**When Limit is Exceeded (Future):**
```json
{
    "success": false,
    "message": "Too many requests. Please try again later."
}
```
**Status:** 429 Too Many Requests

---

## 🛠️ Endpoints

### **Health Check**

Check if the API is running and responsive.

#### **GET** `/health`

**Description:** Returns API health status and version.

**Parameters:** None

**Response:** 200 OK
```json
{
    "status": "ok",
    "message": "API is running",
    "version": "1.0.0",
    "timestamp": "2024-12-30 12:00:00"
}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/health
```

---

### **Apartments**

#### **GET** `/apartments`

List all apartments with optional filtering.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter by status: `available` or `rented` |
| bedrooms | integer | No | Filter by number of bedrooms (1-10) |
| bathrooms | integer | No | Filter by number of bathrooms (1-10) |
| min_price | numeric | No | Minimum monthly rent |
| max_price | numeric | No | Maximum monthly rent |
| min_sqft | integer | No | Minimum square footage |
| max_sqft | integer | No | Maximum square footage |
| sort_by | string | No | Sort: `price_asc`, `price_desc`, `bedrooms`, `area_sqm`, `newest`, `oldest` |
| per_page | integer | No | Items per page (1-50, default: 10) |

**Response:** 200 OK
```json
{
    "success": true,
    "message": "Apartments retrieved successfully",
    "data": {
        "data": [
            {
                "id": 1,
                "title": "Luxury Penthouse",
                "slug": "luxury-penthouse",
                "description": "Stunning penthouse with panoramic city views...",
                "specifications": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area_sqm": 2500
                },
                "price": {
                    "amount": 5000,
                    "currency": "USD",
                    "formatted": "$5,000",
                    "per": "month"
                },
                "status": "available",
                "is_available": true,
                "image_count": 5,
                "amenity_count": 12,
                "created_at": "December 26, 2024",
                "updated_at": "2 days ago"
            }
        ],
        "meta": {
            "total": 6,
            "available_count": 4,
            "rented_count": 2
        }
    }
}
```

**Example Requests:**
```bash
# Get all apartments
curl http://localhost:8000/api/v1/apartments

# Filter by status
curl http://localhost:8000/api/v1/apartments?status=available

# Filter by bedrooms and price range
curl "http://localhost:8000/api/v1/apartments?bedrooms=2&min_price=1000&max_price=3000"

# Sort by price
curl "http://localhost:8000/api/v1/apartments?sort_by=price_asc"
```

**Validation Errors:** 422 Unprocessable Entity
```json
{
    "success": false,
    "message": "The given data was invalid.",
    "errors": {
        "bedrooms": [
            "Number of bedrooms must be a valid number."
        ],
        "max_price": [
            "Maximum price must be greater than or equal to minimum price."
        ]
    }
}
```

---

#### **GET** `/apartments/{id}`

Get detailed information about a specific apartment.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Apartment ID |

**Response:** 200 OK
```json
{
    "success": true,
    "message": "Apartment retrieved successfully",
    "data": {
        "id": 1,
        "title": "Luxury Penthouse",
        "slug": "luxury-penthouse",
        "description": "Stunning penthouse with panoramic city views...",
        "specifications": {
            "bedrooms": 3,
            "bathrooms": 2,
            "area_sqm": 2500
        },
        "price": {
            "amount": 5000,
            "currency": "USD",
            "formatted": "$5,000",
            "per": "month"
        },
        "status": "available",
        "is_available": true,
        "images": [
            {
                "id": 1,
                "url": "https://example.com/images/penthouse-1.jpg",
                "order": 1,
                "is_primary": true,
                "alt_text": "Luxury Penthouse - Image 1"
            }
        ],
        "primary_image": {
            "id": 1,
            "url": "https://example.com/images/penthouse-1.jpg",
            "order": 1,
            "is_primary": true,
            "alt_text": "Luxury Penthouse - Image 1"
        },
        "amenities": [
            {
                "id": 1,
                "name": "Swimming Pool",
                "icon": "🏊",
                "category": "Recreational",
                "is_popular": true,
                "apartment_count": 5
            }
        ],
        "features": [
            {
                "id": 1,
                "name": "Floor Level",
                "value": "15th Floor",
                "display": "Floor Level: 15th Floor"
            }
        ],
        "image_count": 5,
        "amenity_count": 12,
        "created_at": "December 26, 2024",
        "updated_at": "2 days ago"
    }
}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/apartments/1
```

**Error Response:** 404 Not Found
```json
{
    "success": false,
    "message": "Apartment not found"
}
```

---

### **Amenities**

#### **GET** `/amenities`

List all amenities, optionally grouped by category.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| grouped | string | No | Set to `true` to group by category |

**Response (Flat List):** 200 OK
```json
{
    "success": true,
    "message": "Amenities retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Swimming Pool",
            "icon": "🏊",
            "category": "Recreational",
            "is_popular": true,
            "apartment_count": 5
        },
        {
            "id": 2,
            "name": "Fitness Center",
            "icon": "💪",
            "category": "Recreational",
            "is_popular": true,
            "apartment_count": 6
        }
    ],
    "meta": {
        "total": 18,
        "grouped": false
    }
}
```

**Response (Grouped):** 200 OK
```json
{
    "success": true,
    "message": "Amenities retrieved successfully (grouped by category)",
    "data": [
        {
            "category": "Recreational",
            "amenities": [
                {
                    "id": 1,
                    "name": "Swimming Pool",
                    "icon": "🏊",
                    "category": "Recreational",
                    "is_popular": true,
                    "apartment_count": 5
                }
            ]
        },
        {
            "category": "Security",
            "amenities": [
                {
                    "id": 10,
                    "name": "24/7 Security",
                    "icon": "🔒",
                    "category": "Security",
                    "is_popular": true,
                    "apartment_count": 6
                }
            ]
        }
    ],
    "meta": {
        "grouped": true,
        "categories": 6
    }
}
```

**Example Requests:**
```bash
# Get flat list
curl http://localhost:8000/api/v1/amenities

# Get grouped by category
curl http://localhost:8000/api/v1/amenities?grouped=true
```

---

#### **GET** `/amenities/{id}`

Get detailed information about a specific amenity.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Amenity ID |

**Response:** 200 OK
```json
{
    "success": true,
    "message": "Amenity retrieved successfully",
    "data": {
        "id": 1,
        "name": "Swimming Pool",
        "icon": "🏊",
        "category": "Recreational",
        "is_popular": true,
        "apartment_count": 5
    }
}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/amenities/1
```

**Error Response:** 404 Not Found
```json
{
    "success": false,
    "message": "Amenity not found"
}
```

---

### **Statistics**

#### **GET** `/statistics`

Get dashboard statistics about apartments and amenities.

**Parameters:** None

**Response:** 200 OK
```json
{
    "success": true,
    "message": "Statistics retrieved successfully",
    "data": {
        "apartments": {
            "total": 6,
            "available": 4,
            "rented": 2,
            "occupancy_rate": 33.33
        },
        "pricing": {
            "average": 3500.00,
            "minimum": 1800.00,
            "maximum": 5000.00,
            "currency": "USD"
        },
        "amenities": {
            "total": 18
        },
        "generated_at": "2024-12-30 12:00:00"
    }
}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/statistics
```

---

## ❌ Error Handling

### **Common Error Responses**

#### **404 Not Found**

Resource doesn't exist or endpoint is invalid.
```json
{
    "success": false,
    "message": "The requested resource was not found."
}
```

#### **405 Method Not Allowed**

HTTP method not supported for this endpoint.
```json
{
    "success": false,
    "message": "The HTTP method is not allowed for this endpoint."
}
```

#### **422 Validation Error**

Request data failed validation.
```json
{
    "success": false,
    "message": "The given data was invalid.",
    "errors": {
        "bedrooms": [
            "Number of bedrooms must be a valid number."
        ],
        "status": [
            "Status must be either \"available\" or \"rented\"."
        ]
    }
}
```

#### **500 Server Error**

Unexpected server error occurred.

**Development Mode:**
```json
{
    "success": false,
    "message": "An unexpected error occurred.",
    "debug": {
        "exception": "Exception",
        "file": "/path/to/file.php",
        "line": 123,
        "trace": [ ... ]
    }
}
```

**Production Mode:**
```json
{
    "success": false,
    "message": "An unexpected error occurred. Please try again later."
}
```

---

## 💡 Examples

### **Example 1: Find Available 2-Bedroom Apartments Under $3000**

**Request:**
```bash
curl "http://localhost:8000/api/v1/apartments?status=available&bedrooms=2&max_price=3000"
```

**Response:**
```json
{
    "success": true,
    "message": "Apartments retrieved successfully",
    "data": {
        "data": [
            {
                "id": 3,
                "title": "Modern Studio",
                "specifications": {
                    "bedrooms": 2,
                    "bathrooms": 1,
                    "area_sqm": 1200
                },
                "price": {
                    "amount": 2500,
                    "formatted": "$2,500"
                },
                "status": "available",
                "is_available": true
            }
        ]
    }
}
```

---

### **Example 2: Get Apartment with All Relationships**

**Request:**
```bash
curl http://localhost:8000/api/v1/apartments/1
```

**Response:** Full apartment object with images, amenities, and features included.

---

### **Example 3: Get Amenities by Category**

**Request:**
```bash
curl http://localhost:8000/api/v1/amenities?grouped=true
```

**Response:** Amenities organized by category (Recreational, Security, Utilities, etc.)

---

## 📚 Additional Resources

**Postman Collection:**
- Download: `docs/api/RicSan_Apartments_API_v1.postman_collection.json`
- Import into Postman for instant testing

**OpenAPI/Swagger:**
- Coming in future update

**Changelog:**
- v1.0.0 (2024-12-30): Initial API release

---

## 🤝 Support

**Issues:** Report bugs or request features via GitHub Issues

<!-- **Contact:** dev@ricsanapartments.com -->

**Documentation Updates:** Last updated December 30, 2024

---

## 📝 Notes

- All timestamps are in UTC unless specified
- Dates are formatted as "Month Day, Year" or relative ("2 days ago")
- Prices are in USD
- Image URLs are placeholders and should be replaced with actual CDN URLs
- API is currently read-only; write operations coming in Phase 6

---

**End of Documentation**