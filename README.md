# Event Management Website

A modern event management website designed to showcase event services, pricing, galleries, and contact information. The project includes a responsive frontend along with features such as authentication, chatbot support, email communication, and online payment integration.

## Features

- Responsive and user-friendly website
- Home/Hero section
- Services section
- Event gallery
- Pricing section
- Contact form
- User authentication
- Firebase integration
- Email communication using EmailJS
- Online payment integration using Razorpay
- Chatbot functionality
- Reusable React components
- Typing-effect UI component

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Node.js
- **Database/Authentication:** Firebase
- **Email Service:** EmailJS
- **Payment Gateway:** Razorpay
- **Version Control:** Git & GitHub

## Project Structure

```text
web-programming/
│
├── index.html
├── script.js
├── style.css
├── server.js
│
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── firebase.js
    ├── Login.js
    │
    ├── components/
    │   ├── Chatbot.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── Gallery.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── Pricing.jsx
    │   └── Services.jsx
    │
    └── utils/
        ├── auth.js
        ├── emailjs.js
        ├── razorpay.js
        └── useTypingEffect.js
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd web-programming
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

The application will then be available on the local development server.

## Configuration

Before running the project, configure the required credentials for:

- Firebase
- EmailJS
- Razorpay

Store sensitive credentials in environment variables rather than directly inside the source code.

Example:

```env
FIREBASE_API_KEY=your_api_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
RAZORPAY_KEY_ID=your_key
```

## Main Components

### Navbar
Provides navigation between different sections of the website.

### Hero
Introduces the event management services and provides the main call-to-action.

### Services
Displays the different event-related services offered.

### Gallery
Showcases images related to events and services.

### Pricing
Displays available service packages and their pricing.

### Contact
Allows users to contact the event management team.

### Login
Handles user authentication.

### Chatbot
Provides an interactive chatbot interface for assisting users.

## Git Workflow

The project uses Git for version control.

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

## Future Improvements

- Add an admin dashboard
- Add event booking management
- Improve chatbot capabilities
- Add more payment options
- Add user booking history
- Improve accessibility
- Deploy the application to a production hosting platform

## Author

**Vyshnavi**

## License

This project is developed for educational and academic purposes.
