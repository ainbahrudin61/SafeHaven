

"use strict";

document.addEventListener("turbo:load", function () {
  // Prevent duplicate event listeners on Turbo navigation.
  const form = document.getElementById("awarenessEnquiryForm");

  if (!form || form.dataset.labInitialized === "true") {
    return;
  }

  form.dataset.labInitialized = "true";

  // DOM elements
  const output = document.getElementById("enquiryOutput");
  const dialog = document.getElementById("safetyDialog");
  const openButton = document.getElementById("openSafetyDialog");
  const closeButton = document.getElementById("closeSafetyDialog");
  const understandButton = document.getElementById("understandSafetyDialog");
  const dateTime = document.getElementById("labDateTime");

  // 1. DATE AND TIME HANDLING
  function updateDateTime() {
    const now = new Date();

    dateTime.textContent = now.toLocaleString("en-MY", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Asia/Kuala_Lumpur"
    });
  }

  updateDateTime();

  // Update the clock every second without creating duplicate timers.
  if (window.safeHavenClock) {
    clearInterval(window.safeHavenClock);
  }

  window.safeHavenClock = setInterval(updateDateTime, 1000);

  // 2. CUSTOM POPUP DIALOG
  function openDialog() {
    dialog.hidden = false;
    closeButton.focus();
  }

  function closeDialog() {
    dialog.hidden = true;
    openButton.focus();
  }

  openButton.addEventListener("click", openDialog);
  closeButton.addEventListener("click", closeDialog);
  understandButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !dialog.hidden) {
      closeDialog();
    }
  });

  // Escape user input before inserting it into innerHTML.
  function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function (character) {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character];
    });
  }

  // 3. HTML FORM EVENT
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("enquiryName").value.trim();
    const email = document.getElementById("enquiryEmail").value.trim();
    const topic = document.getElementById("enquiryTopic").value;
    const message = document.getElementById("enquiryMessage").value.trim();
    const consent = document.getElementById("enquiryConsent").checked;

    // 4. OPERATORS AND CONTROL STATEMENTS
    if (
      name === "" ||
      email === "" ||
      topic === "" ||
      message === "" ||
      !consent
    ) {
      window.alert("Please complete all required fields.");
      return;
    }

    // Comparison operator and conditional (ternary) operator.
    const greeting = name.length >= 3
      ? "Thank you for your enquiry"
      : "Thank you";

    // 5. METHOD: innerHTML
    output.innerHTML = `
      <div class="alert alert-light border" role="status">
        <h4>${greeting}, ${escapeHTML(name)}!</h4>
        <p><strong>Topic:</strong> ${escapeHTML(topic)}</p>
        <p><strong>Message:</strong> ${escapeHTML(message)}</p>
        <p>Your form has been processed in this browser demonstration.</p>
      </div>
    `;

    // 6. METHOD: window.alert()
    window.alert(
      "Thank you, " + name +
      "! Your demonstration form has been processed."
    );

    // 7. METHOD: console
    console.log("=== SafeHaven Malaysia: Lab Work 3 ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Topic:", topic);
    console.log("Message:", message);
    console.log("Consent:", consent);

    console.table([
      {
        name: name,
        email: email,
        topic: topic,
        consent: consent
      }
    ]);
  });
});
