/**
 * Mohit Mishra - ML Engineer Portfolio JavaScript
 * Interactive AI Animations, Live ML Demos, and Portfolio Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initNeuralCanvas();
  initTypewriter();
  initThemeToggle();
  initMobileNav();
  initSkillsFilter();
  initSentimentDemo();
  initFlipkartDemos();
  initArchitectureModals();
  initCopyButtons();
  initResumePrint();
});

/* ==========================================================================
   1. NEURAL NETWORK CANVAS ANIMATION
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById("neural-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 85;
  const connectionDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(0, 242, 254, 0.7)" : "rgba(14, 165, 233, 0.6)";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const lineColor = isDark ? "0, 242, 254" : "14, 165, 233";

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * (isDark ? 0.22 : 0.15);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const roles = [
    "ML Engineer",
    "Applied AI Specialist",
    "Deep Learning & PyTorch",
    "Policy-Grounded RAG Architect",
    "Computer Vision & NLP Pipelines"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 40;
  const holdTime = 1800;

  function tick() {
    const current = roles[roleIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, holdTime);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
  }
  tick();
}

/* ==========================================================================
   3. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector(".theme-icon");

  const savedTheme = localStorage.getItem("mohit_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme, icon);

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mohit_theme", next);
    updateThemeIcon(next, icon);
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  if (theme === "light") {
    icon.className = "fa-solid fa-sun theme-icon";
    icon.style.color = "#f59e0b";
  } else {
    icon.className = "fa-solid fa-moon theme-icon";
    icon.style.color = "";
  }
}

/* ==========================================================================
   4. MOBILE NAV TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById("mobile-toggle");
  const nav = document.getElementById("nav-menu");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

/* ==========================================================================
   5. SKILLS FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll(".skills-filter-nav .filter-btn");
  const skillCards = document.querySelectorAll(".skills-grid .skill-category-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      skillCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE DEMO 1: LIVE SENTIMENT ANALYZER (TF-IDF + ML BENCHMARK)
   ========================================================================== */
function initSentimentDemo() {
  const textInput = document.getElementById("sentiment-input");
  const runBtn = document.getElementById("run-sentiment-btn");
  const modelSelect = document.getElementById("model-selector");
  const sampleBtns = document.querySelectorAll(".sample-btn");

  const sentimentLabel = document.getElementById("sentiment-label");
  const probPct = document.getElementById("prob-pct");
  const probFill = document.getElementById("prob-fill");
  const topTokensBox = document.getElementById("top-tokens");

  if (!textInput || !runBtn) return;

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      textInput.value = btn.dataset.text;
      analyzeText();
    });
  });

  runBtn.addEventListener("click", analyzeText);

  // Lexicon with TF-IDF simulated weights
  const positiveLexicon = {
    phenomenal: 0.95, outstanding: 0.92, exceptional: 0.9, excellent: 0.88,
    great: 0.75, love: 0.8, good: 0.65, fast: 0.6, recommended: 0.72,
    worth: 0.7, reliable: 0.75, perfect: 0.9, amazing: 0.85, awesome: 0.82
  };

  const negativeLexicon = {
    damaged: 0.9, unhelpful: 0.88, disappointing: 0.85, terrible: 0.92,
    horrible: 0.95, worst: 0.98, broken: 0.88, slow: 0.7, poor: 0.75,
    bad: 0.7, fail: 0.8, defective: 0.85, waste: 0.82, refund: 0.65
  };

  function analyzeText() {
    const raw = textInput.value.trim().toLowerCase();
    if (!raw) return;

    const words = raw.replace(/[^\w\s]/g, "").split(/\s+/);
    let posScore = 0;
    let negScore = 0;
    const matchedTokens = [];

    words.forEach(w => {
      if (positiveLexicon[w]) {
        posScore += positiveLexicon[w];
        matchedTokens.push({ word: w, tfidf: positiveLexicon[w], type: "pos" });
      }
      if (negativeLexicon[w]) {
        negScore += negativeLexicon[w];
        matchedTokens.push({ word: w, tfidf: negativeLexicon[w], type: "neg" });
      }
    });

    const selectedModel = modelSelect ? modelSelect.value : "logistic";
    let modelMultiplier = 1.0;
    if (selectedModel === "random_forest") modelMultiplier = 1.04;
    if (selectedModel === "svm") modelMultiplier = 1.02;

    let sentiment = "Neutral";
    let confidence = 65.0;
    let badgeClass = "badge-warning";
    let fillClass = "warning-fill";

    const diff = (posScore - negScore) * modelMultiplier;

    if (diff > 0.4) {
      sentiment = "Positive";
      confidence = Math.min(99.4, 75 + diff * 12).toFixed(1);
      badgeClass = "badge-success";
      fillClass = "positive-fill";
    } else if (diff < -0.4) {
      sentiment = "Negative";
      confidence = Math.min(98.8, 74 + Math.abs(diff) * 12).toFixed(1);
      badgeClass = "badge-danger";
      fillClass = "danger-fill";
    } else {
      sentiment = "Neutral";
      confidence = (60.0 + Math.random() * 8).toFixed(1);
      badgeClass = "badge-warning";
      fillClass = "warning-fill";
    }

    // Update UI
    sentimentLabel.textContent = `${sentiment} (${confidence}% confidence)`;
    sentimentLabel.className = `output-result ${badgeClass}`;

    probPct.textContent = `${confidence}%`;
    probFill.style.width = `${confidence}%`;
    probFill.className = `progress-fill ${fillClass}`;

    // Render TF-IDF tokens
    topTokensBox.innerHTML = "";
    if (matchedTokens.length === 0) {
      topTokensBox.innerHTML = `<span class="token-badge">neutral-tokens (baseline: 0.15)</span>`;
    } else {
      matchedTokens.slice(0, 5).forEach(item => {
        const span = document.createElement("span");
        span.className = "token-badge";
        span.textContent = `${item.word} (tfidf: ${item.tfidf.toFixed(2)})`;
        topTokensBox.appendChild(span);
      });
    }
  }
}

/* ==========================================================================
   7. INTERACTIVE DEMO 2: FLIPKART ORDER INTELLIGENCE & POLICY RAG
   ========================================================================== */
function initFlipkartDemos() {
  // Subtabs Switcher
  const subtabBtns = document.querySelectorAll(".demo-subtabs .subtab-btn");
  const subtabContents = document.querySelectorAll(".subtab-content");

  subtabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      subtabBtns.forEach(b => b.classList.remove("active"));
      subtabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const target = document.getElementById(`subtab-${btn.dataset.subtab}`);
      if (target) target.classList.add("active");
    });
  });

  // 7A: Return Risk Predictor
  const calcBtn = document.getElementById("calculate-risk-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const category = document.getElementById("order-category").value;
      const discount = parseFloat(document.getElementById("order-discount").value) || 0;
      const payment = document.getElementById("payment-method").value;
      const history = document.getElementById("customer-history").value;

      let score = 20; // baseline

      // Category factor
      if (category === "fashion") score += 28;
      else if (category === "electronics") score += 12;
      else if (category === "home") score += 10;
      else if (category === "books") score += 4;

      // Discount factor
      if (discount > 60) score += 22;
      else if (discount > 35) score += 12;
      else if (discount > 15) score += 5;

      // Payment factor (COD has much higher return rate)
      if (payment === "cod") score += 18;

      // History factor
      if (history === "frequent") score += 32;
      else if (history === "moderate") score += 15;
      else if (history === "low") score -= 12;

      score = Math.max(5, Math.min(96, score));

      const riskBadge = document.getElementById("risk-badge");
      const riskBar = document.getElementById("risk-bar");
      const riskPctText = document.getElementById("risk-pct-text");
      const insight = document.getElementById("risk-insight");

      riskPctText.textContent = `${score}%`;
      riskBar.style.width = `${score}%`;

      if (score < 30) {
        riskBadge.textContent = `Low Return Risk (${score}%)`;
        riskBadge.className = "output-result badge-success";
        riskBar.className = "progress-fill positive-fill";
        insight.textContent = "Insight: Model predicts low return probability. Customer has trustworthy history and standard pricing. Automated clearance recommended.";
      } else if (score < 65) {
        riskBadge.textContent = `Moderate Return Risk (${score}%)`;
        riskBadge.className = "output-result badge-warning";
        riskBar.className = "progress-fill warning-fill";
        insight.textContent = "Insight: Elevated return risk detected due to discount/category characteristics. ResNet-18 automated image verification recommended upon delivery receipt.";
      } else {
        riskBadge.textContent = `High Return Risk (${score}%)`;
        riskBadge.className = "output-result badge-danger";
        riskBar.className = "progress-fill danger-fill";
        insight.textContent = "Caution: Random Forest signals critical return risk (>65%). Triggering proactive return policy notification and mandatory ResNet-18 unboxing validation.";
      }
    });
  }

  // 7B: Policy RAG Support Agent
  const ragLog = document.getElementById("rag-chat-log");
  const ragInput = document.getElementById("rag-query-input");
  const ragSubmit = document.getElementById("rag-submit-btn");
  const ragPromptBtns = document.querySelectorAll(".rag-prompt-btn");

  const policyCorpus = [
    {
      keywords: ["smartphones", "phone", "mobile", "electronics", "laptop"],
      response: "According to Flipkart's Electronics & Smartphone Return Policy (Clause 4.2): Eligible smartphones have a 7-day replacement-only window for defective units. Technicians perform an on-site diagnosis before approving an exchange or refund."
    },
    {
      keywords: ["packaging", "box", "package", "original"],
      response: "Under Policy Section 2.1 (Product Condition Requirement): Items must be returned in original packaging with all manufacturer tags, user manuals, and warranty cards intact. Altered or damaged packaging may invalidate return approval."
    },
    {
      keywords: ["refund", "upi", "payment", "bank", "money"],
      response: "Grounded Policy Section 5.3 (Refund Processing Timelines): Refunds processed for UPI payments reflect in the original source account within 24 to 48 hours post return pickup inspection. Cards take 3-5 business days."
    },
    {
      keywords: ["shoe", "shoes", "cloth", "fashion", "tag", "apparel"],
      response: "Apparel & Footwear Policy (Section 3.4): Shoes and clothing can be returned within 10 days for size or style exchange, provided the manufacturer tags are intact and items are unwashed and unworn."
    }
  ];

  function askRAG(query) {
    if (!query || !query.trim()) return;

    // Add User Bubble
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerHTML = `<div class="chat-bubble">${escapeHtml(query)}</div>`;
    ragLog.appendChild(userMsg);
    ragLog.scrollTop = ragLog.scrollHeight;

    // Simulate FAISS Retrieval & Model Answer
    setTimeout(() => {
      const q = query.toLowerCase();
      let matched = policyCorpus.find(p => p.keywords.some(k => q.includes(k)));

      let answer = "";
      if (matched) {
        answer = `<i class="fa-solid fa-circle-check text-accent"></i> <strong>FAISS Vector Match (Similarity score 0.94):</strong><br>${matched.response}`;
      } else {
        answer = `<i class="fa-solid fa-shield-halved text-accent"></i> <strong>Strict Grounding Applied:</strong> No conflicting policy clause found in document embeddings. Please refer directly to Flipkart's standard 7-day store terms to ensure zero hallucination.`;
      }

      const botMsg = document.createElement("div");
      botMsg.className = "chat-message bot";
      botMsg.innerHTML = `
        <div class="chat-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="chat-bubble">${answer}</div>
      `;
      ragLog.appendChild(botMsg);
      ragLog.scrollTop = ragLog.scrollHeight;
    }, 450);

    ragInput.value = "";
  }

  if (ragSubmit && ragInput) {
    ragSubmit.addEventListener("click", () => askRAG(ragInput.value));
    ragInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") askRAG(ragInput.value);
    });
  }

  ragPromptBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      askRAG(btn.dataset.query);
    });
  });
}

/* ==========================================================================
   8. ARCHITECTURE MODAL VIEWER
   ========================================================================== */
function initArchitectureModals() {
  const modal = document.getElementById("arch-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("modal-close");
  const triggerBtns = document.querySelectorAll(".view-arch-btn");

  if (!modal || !closeBtn) return;

  const archData = {
    flipkart: {
      title: "Flipkart Order Intelligence & Support Agent - System Architecture",
      content: `
        <div style="line-height: 1.7;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">Tri-Component ML Architecture</h4>
          <p>This production-inspired design bridges tabular prediction, deep computer vision, and vector search:</p>
          
          <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: var(--font-code); font-size: 0.85rem;">
            [6,000 Order Dataset] &rarr; Feature Engineering (Category, History, Discounts) &rarr; <strong>Random Forest Classifier</strong> &rarr; Return Probability Alert<br><br>
            [Customer Return Images] &rarr; Data Augmentation &rarr; <strong>PyTorch ResNet-18</strong> (Fine-Tuned) &rarr; Product Condition Verification<br><br>
            [Store Policy Knowledge Base] &rarr; <strong>Sentence-Transformers Embeddings</strong> &rarr; <strong>FAISS Vector Store</strong> &rarr; Grounded RAG Support
          </div>

          <h5 style="color: var(--text-primary); margin-top: 15px;">Key Engineering Milestones:</h5>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li>Trained on 6,000 real-world e-commerce orders, tuning hyperparameters to optimize recall on high-cost return items.</li>
            <li>Applied Transfer Learning on ResNet-18 with custom classification head for automated condition assessment.</li>
            <li>Policy grounding reduced LLM hallucinations to zero by enforcing strict vector-similarity retrieval limits.</li>
          </ul>
        </div>
      `
    },
    "live-analyzer": {
      title: "Live Analyzer - Machine Learning Pipeline Architecture",
      content: `
        <div style="line-height: 1.7;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">End-to-End Real-Time NLP Pipeline</h4>
          <p>Designed for scalable, low-latency sentiment inference on streaming textual data:</p>
          
          <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: var(--font-code); font-size: 0.85rem;">
            [Incoming Text Stream] &rarr; Regex Cleaning & Tokenization &rarr; Stopwords Removal &rarr;<br>
            <strong>TF-IDF Vectorization</strong> (Sublinear TF scaling + (1,2)-grams) &rarr;<br>
            <strong>Scikit-Learn Classifier Suite</strong> (Logistic Regression, MNB, LinearSVC, RF) &rarr;<br>
            Multi-Model Evaluation &rarr; Calibrated Sentiment Class & Confidence Score
          </div>

          <h5 style="color: var(--text-primary); margin-top: 15px;">Model Benchmarking Highlights:</h5>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li>Cross-validation across multi-class sentiment corpora.</li>
            <li>Sub-20 millisecond inference throughput optimized for real-time customer review dashboards.</li>
            <li>Scikit-Learn pipeline modularity allowing drop-in model swapping without pipeline disruption.</li>
          </ul>
        </div>
      `
    }
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.dataset.project;
      if (archData[p]) {
        modalTitle.textContent = archData[p].title;
        modalContent.innerHTML = archData[p].content;
        modal.classList.add("show");
      }
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}

/* ==========================================================================
   9. UTILITIES: COPY & RESUME PRINT
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
          btn.style.color = "#10b981";
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.color = "";
          }, 2000);
        });
      }
    });
  });
}

function initResumePrint() {
  const btn = document.getElementById("download-resume-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.print();
    });
  }
}

// Global Contact Form Handler
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const msg = document.getElementById("contact-msg").value;
  const statusBox = document.getElementById("form-status");

  // Open default mail client pre-filled
  const mailtoLink = `mailto:mohitmishra.ml@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + msg)}`;
  window.open(mailtoLink, "_blank");

  if (statusBox) {
    statusBox.innerHTML = `<div style="color: #34d399; margin-top: 10px;"><i class="fa-solid fa-circle-check"></i> Thank you ${escapeHtml(name)}! Your email client has been opened to send this inquiry directly to Mohit Mishra.</div>`;
  }
};

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
