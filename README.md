# RentalAppartments

## Description

**RentalAppartments** is a feature-rich web application designed to streamline the process of searching, renting, and managing apartments. The platform enables users to browse listings, apply advanced filters, view detailed property information, and communicate directly with property owners. Built with modern technologies for scalability and security, RentalAppartments serves tenants seeking their next home and landlords managing their properties.

---

## Why RentalAppartments?

Many rental platforms lack intuitive interfaces, powerful search tools, or direct communication features. RentalAppartments solves these problems by providing:

- Fast, user-friendly search and filtering.
- Detailed, transparent property listings.
- End-to-end management tools for landlords.
- Secure authentication and data handling.

---

## Technology Stack

- **Frontend:** Next.js, JavaScript
- **Backend:** Django, Python, FastAPI
- **API Communication:** RESTful API / Django REST Framework
- **Authentication:** Django authentication (with possible JWT/OAuth integration)
- **Database:** PostgreSQL or another supported by Django ORM, SQLAlchemy
- **Other:** SCSS/CSS Modules, deployment with Docker (optional)

---

## Features

- **Advanced Search & Filtering:**  
  Search apartments by location, price, rooms, amenities, and more.

- **Property Details:**  
  Rich descriptions, photo galleries, maps, and owner contact information.

- **Authentication:**  
  Secure registration and login for tenants and landlords.

- **Landlord Dashboard:**  
  Add, edit, and remove property listings. Manage rental requests and tenant messages.

- **Messaging System:**  
  In-app communication between tenants and landlords.

- **Responsive Design:**  
  Fully optimized for desktops, tablets, and smartphones.

- **Security:**  
  Data validation, secure password handling, and protection against web vulnerabilities.

---

## Installation

### Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Python 3.8+
- pip (Python package manager)
- PostgreSQL (or another supported SQL database)
- (Optional) Docker

### Steps

#### 1. Clone the repository

```bash
git clone https://github.com/Shevchenko00/RentalAppartments.git
cd RentalAppartments
```

#### 2. Configure environment variables

- Frontend: Copy `.env.example` in `/frontend` to `.env` and fill in required values.
- Backend: Copy `.env.example` in `/backend` to `.env` and set database connection, secret keys, etc.
- For start docker-compose.yml: Copy `.env.example` in `/` to `.env` and set database connection, secret keys, etc.

#### 3. Start development servers

- **docker-compose.yml:**
  ```bash
  docker compose up --build
  ```


#### 4. Access the app

- Frontend: [http://localhost:3000](http://localhost:3000)
- Django API: [http://localhost:1212](http://localhost:1212)
- FastAPI : [http://localhost:1515](http://localhost:1515)

---

## Project Structure

- `/frontend` — Next.js app (React-based)
- `/Rental-Django` — Main Backend service
- `/AuthFastApi` — FastAPI authentication service


---

## Getting Started: Why These Steps?

- **Cloning:** Get the latest source code.
- **Installing dependencies:** Set up all required libraries and tools.
- **Starting servers:** Launch the application for development and testing.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

