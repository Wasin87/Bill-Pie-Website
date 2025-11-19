 
# 🧾 *Bill Pie – Utility Bill Management System*

*Bill Pie* is a *MERN Stack-based web application designed to help users easily **view, manage, and pay their monthly utility bills* such as *Electricity, Gas, Water, and Internet*.
It provides a *secure, responsive, and user-friendly* interface where all bill-related tasks can be handled in one place.

---
##  App Overview <br>
<img width="500" height="600" alt="image" src="https://github.com/user-attachments/assets/3a5346a0-0d35-4c51-b7de-6c87edee34ca" />
<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/00880c6e-f051-4f3a-b553-fba5dfb15520" />
<img width="500" height="600" alt="image" src="https://github.com/user-attachments/assets/b382b107-1011-4c0a-90ac-1fab5a300682" />
<img width="500" height="480" alt="image" src="https://github.com/user-attachments/assets/0cc85ca2-576f-4d7c-9fa3-f5235251b04d" />




ঠিক আছে, তুমি চাইছো README-তে “লোকাল মেশিনে কিভাবে রান করবে” সেটার গাইডলাইন যোগ করতে। আমি তোমার টেক্সট ঠিক একই রাখব এবং নতুন সেকশন `📥 Install & Run Locally` যোগ করব। নিচে কোড-বেসড README টেমপ্লেট:

 
ঠিক আছে! তুমি চাইছো এই README-তে **লোকাল মেশিনে রান করার নির্দেশনা** যোগ করতে। আমি তোমার সব লেখা **যথা যেমন আছে তেমন রেখে** লোকাল রান গাইডলাইন যুক্ত করে Markdown কোড তৈরি করেছি:

 
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

## 💻 *Run Locally*

### ✔ Step 1: Clone Repository

```bash
git clone https://github.com/Wasin87/Bill-Pie-Website.git
cd Bill-Pie-Website
````

### ✔ Step 2: Install Dependencies

```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

### ✔ Step 3: Setup Environment Variables

* Create a `.env` file in the server folder and add:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

* Replace with your own MongoDB & Firebase credentials.

### ✔ Step 4: Run the App

```bash
# Start server
cd server
npm start

# Start client (in another terminal)
cd ../client
npm start
```

* Open `http://localhost:3000` in your browser to see the app.

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
## 🗄 *Database API Links*

* **Home (Base API):** [https://bill-management-db-api.vercel.app/](https://bill-management-db-api.vercel.app/)  
* **All Bills:** [https://bill-management-db-api.vercel.app/bills](https://bill-management-db-api.vercel.app/bills)  
* **My Bills:** [https://bill-management-db-api.vercel.app/myBill](https://bill-management-db-api.vercel.app/payBill)


## 👨‍💻 *Developer Information*

*Project Name:* Bill Pie
*Developer:* Md Wasin Ahmed
*Tech Stack:* MERN (MongoDB, Express, React, Node)<br>
*Live Site:*  [https://smart-deals-c7f0b.web.app](https://smart-deals-c7f0b.web.app) <br>
*Server URL:*  [https://bill-management-db-api.vercel.app/](https://bill-management-db-api.vercel.app/)

```

 

 

