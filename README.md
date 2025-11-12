 
# 🧾 *Bill Pie – Utility Bill Management System*

*Bill Pie* is a *MERN Stack-based web application designed to help users easily **view, manage, and pay their monthly utility bills* such as *Electricity, Gas, Water, and Internet*.
It provides a *secure, responsive, and user-friendly* interface where all bill-related tasks can be handled in one place.

---

## 🌟 *Key Features*

* 🔐 *Secure Authentication* with Email and Google Login
* 💡 *Monthly Bill Viewing & Payment* system
* 📄 *PDF Report Download* for user payment history
* 🧠 *Category-based Filter* for quick bill navigation
* 🌓 *Dark/Light Theme Toggle*
* 📱 *Responsive Design* for mobile, tablet, and desktop
* ⚡ *Real-time Notifications* using Toast or SweetAlert
* 🎨 *Animated UI* with React Awesome Reveal and Framer Motion

---

## 🧭 *Website Structure*

*Before Login:*
Logo | Home | Bills | Login | Register

*After Login:*
Logo | Home | Bills | My Pay Bills | Profile Avatar | Logout

---

## 🏠 *Main Pages*

| Page         | Type    | Description                                                                   |
| ------------ | ------- | ----------------------------------------------------------------------------- |
| Home         | Public  | Banner carousel, category cards, recent bills, and extra informative sections |
| Bills        | Public  | View all available bills and filter them by category                          |
| Bill Details | Private | View bill details and pay bills (only current month bills are payable)        |
| My Pay Bills | Private | View, update, delete, and download reports of user-specific paid bills        |
| Register     | Public  | Create a new account with name, email, password, and photo URL                |
| Login        | Public  | Log in with email or Google account                                           |
| 404 Page     | Public  | Shown when visiting an invalid route                                          |

---

## 💳 *Bill Details Page*

* Displays all bill details including Title, Category, Location, Description, Amount, Date, and Image
* The *“Pay Bill”* button is active only for current month bills
* Payment form fields like Email, Bill ID, Amount, and Date are auto-filled
* Successful payment is saved to MongoDB and shows a success toast message

---

## 🧾 *My Pay Bills Page*

* Displays bills paid by the currently logged-in user
* Each record includes *Update* and *Delete* buttons
* *Download Report* button exports user bills as a *PDF file*
* Shows a summary of the user’s total bills and total amount paid

  * Example: Total Bills: 10 | Total Amount: ৳20,000

---

## 🗄 *Database Structure*

*bills Collection*
Stores title, category, email, location, description, image, date, and amount for each bill.

*myBills Collection*
Stores logged-in user payment records such as username, email, address, phone, date, and amount.

---

## ⚙ *Technology Stack*

* *Frontend:* React.js, React Router, Tailwind CSS, Framer Motion, React Awesome Reveal
* *Backend:* Node.js, Express.js
* *Database:* MongoDB (Atlas)
* *Authentication:* Firebase Authentication (Email + Google)
* *PDF Report:* jsPDF + jsPDF-AutoTable
* *Notification:* React Toastify / SweetAlert2
* *Deployment:*
  Client – Netlify / Surge / Firebase
  Server – Vercel

---

## 🎯 *Additional Features*

* PDF report generation for user payments
* Dark/Light theme toggle
* UI animations using Framer Motion or React Awesome Reveal
* Axios Interceptors for secure API communication
* Dynamic page titles
* Loading spinner during API requests
* Fully responsive footer and navbar

---

## 👨‍💻 *Developer Information*

*Project Name:* Bill Pie
*Developer:* Rahed Uzzaman
*Tech Stack:* MERN (MongoDB, Express, React, Node)
*Live Site:* [billpie.netlify.app](https://smart-deals-c7f0b.web.app)
*Server URL:* [billpie-server.vercel.app](https://bill-management-db-api.vercel.app/)

 
