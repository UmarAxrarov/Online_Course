const pointsBody = document.getElementById("points-body");

// Masalan, backenddan kelgan data (AJAX yoki fetch orqali realda olinadi)
const users = [
  {
    name: "Alice",
    img: "../assets/user1.jpg",
    points: 85,
  },
  {
    name: "Bob",
    img: "../assets/user2.jpg",
    points: 140,
  },
  {
    name: "Charlie",
    img: "../assets/user3.jpg",
    points: 40,
  },
];

// Ball asosida sticker aniqlovchi funksiya
function getSticker(points) {
  if (points >= 100) return "🥇";
  if (points >= 50) return "🥈";
  return "🥉";
}

// Jadvalga foydalanuvchilarni joylash
users.forEach((user) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><img src="${user.img}" alt="${user.name}" /></td>
    <td>${user.name}</td>
    <td>${user.points}</td>
    <td>${getSticker(user.points)}</td>
  `;

  pointsBody.appendChild(row);
});
