# TrackWise - Expense Tracker & Receipt Scanner

**Live Demo:**
- **Frontend (Vercel):** [https://smart-trackwise.vercel.app](https://smart-trackwise.vercel.app)

---

## 💡 About This Project
This is my **first fully deployed full-stack application**, built through **Project-Based Learning**. I created this project to apply and solidify my understanding of modern web development concepts by solving real-world problems. It represents a significant milestone in my learning journey, moving from local development to a live production environment.

**Key Concepts Learned and Applied:**
*   **Advanced Authentication:** Implemented secure **JWT authentication** using **Access & Refresh Token Rotation** for seamless and secure user sessions.
*   **Security Best Practices:** Integrated **Rate Limiting** to prevent abuse, **Input Sanitization** to block XSS attacks, and **Image Validation** for safe uploads.
*   **AI Integration:** Integrated **Google Gemini AI** to process unstructured receipt images and convert them into structured JSON data.
*   **Full Stack Architecture:** Built a complete REST API with Node.js/Express and a reactive frontend with React.
*   **Deployment:** Configured a split-stack architecture, handling CORS policies, environment variables, and production builds on Vercel and Render.

---

## ✨ Features

### 🔐 Security & Auth
*   **Token Management:** Secure implementation of Access Tokens (short-lived) and Refresh Tokens (long-lived/rotated).
*   **Rate Limiting:** Backend protection against brute-force and DDoS attacks.
*   **Data Protection:** Input sanitization and comprehensive image validation.
*   **Account Controls:** Secure "Change Password" and "Delete Account" features.

### 🎨 User Customization
*   **Themes:** Full **Dark Mode / Light Mode** support.
*   **Privacy Mode:** One-click feature to blur sensitive financial amounts (**Privacy Mode UI**).
*   **Localization:** customizable **Currency**, **Date Format**, and **Number Format** settings.

### 🧾 Transaction & Data Management
*   **Smart Scanning:** AI-powered receipt scanning (Merchant, Date, Total).
*   **Advanced Search:** Backend-driven search and filtering for transactions.
*   **Smart Dashboard:** "Today", "This Week", and "Monthly" expense visualization logic.
*   **UX Improvements:** Interactive **Toasts** for feedback and Loading Spinners for better perceived performance.

---

## 🛠 Tech Stack
*   **Frontend:** React (Vite), Tailwind CSS, ShadCN UI, Recharts, Lucide React
*   **Backend:** Node.js, Express.js, Multer
*   **Database:** MongoDB Atlas (Mongoose)
*   **AI:** Google Gemini API
*   **Tools:** JWT, Axios, Express-Rate-Limit

---

## 📸 Screenshots

<img width="480" src="https://github.com/user-attachments/assets/3d00bb99-c0d5-4c05-9d96-ec4879e934fc" />
<img width="480" src="https://github.com/user-attachments/assets/ba6ba104-6b1f-4d9e-81e6-eadc77c125d5" />

<div style="display: flex; gap: 10px;">
<img width="30%" src="https://github.com/user-attachments/assets/33bff0d0-53b9-411e-a406-767ec2a368a9" />
<img width="30%" src="https://github.com/user-attachments/assets/081eb26d-0fc5-4ba2-bdb0-86fe0b7d492b" />
<img width="30%" src="https://github.com/user-attachments/assets/f1563244-5fb7-4dbb-8495-aeb6bf551b27" />
</div>

---

## 🚀 Future Improvements
*   **Cloudinary Integration:** For permanent and scalable receipt image storage (currently using local storage).
*   **Advanced Analytics:** Personalized spending breakdowns with pie charts and monthly comparison bars.
*   **Mobile App:** Developing a React Native version for on-the-go scanning.
*   **Export Data:** Feature to download transaction history as CSV or PDF files.
