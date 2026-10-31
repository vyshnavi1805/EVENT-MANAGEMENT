const http = require("http");
const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // <-- paste your key here
const PORT = 3000;

const bookings = [];
const sessions = {};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify(data));
}

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, function (err, data) {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

async function callOpenAI(messages) {
  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 200,
  });

  return new Promise(function (resolve, reject) {
    const options = {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const https = require("https");
    const req = https.request(options, function (r) {
      let data = "";
      r.on("data", function (chunk) { data += chunk; });
      r.on("end", function () { resolve(JSON.parse(data)); });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const server = http.createServer(async function (req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,POST,OPTIONS" });
    res.end();
    return;
  }

  // Serve static files
  if (req.method === "GET" && req.url === "/") return serveFile(res, path.join(__dirname, "index.html"), "text/html");
  if (req.method === "GET" && req.url === "/style.css") return serveFile(res, path.join(__dirname, "style.css"), "text/css");
  if (req.method === "GET" && req.url === "/script.js") return serveFile(res, path.join(__dirname, "script.js"), "application/javascript");

  // POST /api/chatbot/message
  if (req.method === "POST" && req.url === "/api/chatbot/message") {
    let body = "";
    req.on("data", function (chunk) { body += chunk; });
    req.on("end", async function () {
      const { message, sessionId } = JSON.parse(body);
      const sid = sessionId || ("session_" + Date.now());

      if (!sessions[sid]) {
        sessions[sid] = [
          { role: "system", content: "You are Evento Assistant, a helpful AI for an event management company called Evento. Help users with event planning, pricing, and booking questions. Be friendly, concise, and professional." }
        ];
      }

      sessions[sid].push({ role: "user", content: message });

      try {
        const result = await callOpenAI(sessions[sid]);
        const reply = result.choices[0].message.content;
        sessions[sid].push({ role: "assistant", content: reply });
        sendJSON(res, 200, { reply: reply, sessionId: sid });
      } catch (e) {
        sendJSON(res, 500, { reply: "Sorry, I am having trouble right now. Please contact us directly.", sessionId: sid });
      }
    });
    return;
  }

  // POST /api/payment/orders
  if (req.method === "POST" && req.url === "/api/payment/orders") {
    let body = "";
    req.on("data", function (chunk) { body += chunk; });
    req.on("end", function () {
      const order = JSON.parse(body);
      order.id = bookings.length + 1;
      order.createdAt = new Date().toISOString();
      bookings.push(order);
      console.log("New booking:", order);
      sendJSON(res, 200, { success: true, orderId: order.id });
    });
    return;
  }

  // GET /api/payment/orders
  if (req.method === "GET" && req.url === "/api/payment/orders") {
    sendJSON(res, 200, bookings);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, function () {
  console.log("Evento server running at http://localhost:" + PORT);
});