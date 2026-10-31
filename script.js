/* ===== SWIPER HERO SLIDER ===== */
var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: true,
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: {
    enabled: true,
    momentum: false,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
});


/* ===== TYPING ANIMATION ===== */
function typeWriter(elementId, text, speed, delay) {
  var element = document.getElementById(elementId);
  var index = 0;
  setTimeout(function () {
    var interval = setInterval(function () {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }, delay);
}
typeWriter("line1", "ITS TIME TO CELEBRATE!", 80, 500);
typeWriter("line2", "THE BEST EVENT ORGANIZERS", 80, 2500);


/* ===== GALLERY FILTER ===== */
var filterBtns = document.querySelectorAll(".filter-btn");
var galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    var filter = btn.getAttribute("data-filter");
    galleryItems.forEach(function (item) {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});


/* ===== LIGHTBOX ===== */
function openLightbox(item) {
  var img = item.querySelector("img");
  var category = item.getAttribute("data-category");
  document.getElementById("lightbox-img").src = img.src;
  document.getElementById("lightbox-label").textContent = category;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
    closeBookingModal();
  }
});


/* ===== BOOKING MODAL ===== */
var currentBooking = {};

function openBookingModal(eventType, packageName, amount) {
  currentBooking = { eventType: eventType, packageName: packageName, amount: amount };
  document.getElementById("modal-package-info").textContent = packageName + " — $" + amount.toFixed(2);
  document.getElementById("booking-form").style.display = "block";
  document.getElementById("booking-success").classList.remove("show");
  document.getElementById("booking-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  document.getElementById("booking-modal").classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("booking-form").reset();
  var btn = document.getElementById("modal-submit-btn");
  btn.disabled = false;
  btn.textContent = "Confirm Booking";
}

function submitBooking(event) {
  event.preventDefault();
  var submitBtn = document.getElementById("modal-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Processing...";

  var bookingData = {
    customerName: document.getElementById("b-name").value,
    customerEmail: document.getElementById("b-email").value,
    customerPhone: document.getElementById("b-phone").value,
    eventDate: document.getElementById("b-date").value,
    notes: document.getElementById("b-notes").value,
    eventType: currentBooking.eventType,
    packageName: currentBooking.packageName,
    amount: currentBooking.amount,
  };

  fetch("/api/payment/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  })
    .then(function (res) { return res.json(); })
    .then(function () { showBookingSuccess(); })
    .catch(function () { showBookingSuccess(); });
}

function showBookingSuccess() {
  document.getElementById("booking-form").style.display = "none";
  document.getElementById("booking-success").classList.add("show");
  setTimeout(function () { closeBookingModal(); }, 3000);
}


/* ===== CONTACT FORM ===== */
function submitContact(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent. We will contact you shortly.");
  event.target.reset();
}


/* ===== CHATBOT WIDGET ===== */
var chatbotOpen = false;
var chatSessionId = null;

function toggleChatbot() {
  var panel = document.getElementById("chatbot-panel");
  chatbotOpen = !chatbotOpen;
  if (chatbotOpen) {
    panel.classList.remove("chatbot-hidden");
    document.getElementById("chatbot-input").focus();
  } else {
    panel.classList.add("chatbot-hidden");
  }
}

function sendChatMessage(event) {
  event.preventDefault();
  var input = document.getElementById("chatbot-input");
  var message = input.value.trim();
  if (!message) return;

  input.value = "";
  input.disabled = true;
  document.getElementById("chatbot-send").disabled = true;

  addChatMessage("user", message);
  showTypingIndicator();

  fetch("/api/chatbot/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message, sessionId: chatSessionId }),
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      removeTypingIndicator();
      if (data.sessionId) chatSessionId = data.sessionId;
      addChatMessage("bot", data.reply || "I received your message!");
    })
    .catch(function () {
      removeTypingIndicator();
      addChatMessage("bot", "Sorry, I am having trouble connecting. Please email us at eventoevents@gmail.com.");
    })
    .finally(function () {
      input.disabled = false;
      document.getElementById("chatbot-send").disabled = false;
      input.focus();
    });
}

function addChatMessage(role, text) {
  var messages = document.getElementById("chatbot-messages");
  var msg = document.createElement("div");
  msg.className = "chat-msg " + role;
  var span = document.createElement("span");
  span.textContent = text;
  msg.appendChild(span);
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
  var messages = document.getElementById("chatbot-messages");
  var msg = document.createElement("div");
  msg.className = "chat-msg bot";
  msg.id = "typing-indicator";
  msg.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  var el = document.getElementById("typing-indicator");
  if (el) el.remove();
}