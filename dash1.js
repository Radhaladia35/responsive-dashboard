const toggleMenu = document.getElementById('toggle-menu');
const navLinks = document.getElementById('nav-links');

const toggleSidebar = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

// Add click event to toggle sidebar
toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('collapsed');
});

// Add a click event to toggle the active class
toggleMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


const userData = {
  name: "alice",
  totalUsers: 1500,
  activeUsers: 1200,
  revenue: 45000.75,
  newSignups: 125,
  monthlyActiveUsers: [950, 1000, 1100, 1200, 1250, 1300, 1350, 1400, 1450], // Mocked data
};

const tableData = [
  { id: 1, name: "Alice", status: "Active", role: "Admin" },
  { id: 2, name: "Bob", status: "Inactive", role: "User" },
  { id: 3, name: "Charlie", status: "Active", role: "Editor" },
  { id: 4, name: "Diana", status: "Active", role: "Admin" },
];

// Display User Name
document.getElementById("user-name").textContent = userData.name;

// Update Statistic Cards
document.getElementById("total-users").textContent = userData.totalUsers;
document.getElementById("active-users").textContent = userData.activeUsers;
document.getElementById("revenue").textContent = userData.revenue.toFixed(2);
document.getElementById("new-signups").textContent = userData.newSignups;

// Populate Data Table
const tableBody = document.getElementById("data-table-body");
tableData.forEach((row) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${row.id}</td>
    <td>${row.name}</td>
    <td>${row.status}</td>
    <td>${row.role}</td>
  `;
  tableBody.appendChild(tr);
});

// Sortable Table Logic
const headers = document.querySelectorAll(".data-table th[data-sort]");
let sortOrder = 1; // 1 for ascending, -1 for descending
let currentSortColumn = null;

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const sortKey = header.getAttribute("data-sort");

    // Sort table data
    tableData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue) * sortOrder;
      } else {
        return (aValue - bValue) * sortOrder;
      }
    });

    // Toggle sort order
    sortOrder *= -1;

    // Highlight sorted column
    headers.forEach((h) => h.classList.remove("sorted"));
    header.classList.add("sorted");

    // Update table rows
    tableBody.innerHTML = "";
    tableData.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.status}</td>
        <td>${row.role}</td>
      `;
      tableBody.appendChild(tr);
    });

    currentSortColumn = sortKey;
  });
});

// Chart.js Line Chart for Monthly Active Users
const ctx = document.getElementById("monthly-chart").getContext("2d");
const monthlyChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Monthly Active Users",
        data: userData.monthlyActiveUsers,
        borderColor: "#1abc9c",
        backgroundColor: "rgba(26, 188, 156, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Active Users",
        },
      },
    },
  },
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById("toggle-theme");
const rootElement = document.documentElement;

// Check and Apply Saved Theme
const savedTheme = localStorage.getItem("theme") || "light";
rootElement.setAttribute("data-theme", savedTheme);
themeToggleBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

// Toggle Theme
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = rootElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  rootElement.setAttribute("data-theme", newTheme);
  themeToggleBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";

  // Save the user's preference
  localStorage.setItem("theme", newTheme);
});