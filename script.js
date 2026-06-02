/**
 * Tirzepatide Graduation Project - Automated System Engine
 * Faculty of Pharmacy - 2026
 * Dynamically maps images based on verified GitHub repository pathways.
 */

// الرابط الخام الصحيح والمباشر لسحب الصور من مستودع جيت هب الخاص بك
const GITHUB_IMAGE_BASE_URL = "https://raw.githubusercontent.com/osamatharwat/Pharmacy/main/";

// قائمة أسماء الباحثين الـ 14 مأخوذة بدقة تامة من مستند لقطة الشاشة
const researchTeam = [
    { name: "Asmaa Fadl Kasim", img: "Asmaa Fadl Kasim.jpeg" },
    { name: "Manar Hisham Ellaham", img: "Manar Hisham Ellaham.jpeg" },
    { name: "Mostafa Ahmed Elmaazon", img: "Mostafa Ahmed Elmaazon.jpeg" },
    { name: "Kholoud Elsaeed Elsayed Saleh", img: "Kholoud Elsaeed Elsayed Saleh.jpeg" },
    { name: "Yasmine Ahmed Awadin", img: "Yasmine Ahmed Awadin.jpeg" },
    { name: "Amira Mohamed Masoud", img: "Amira Mohamed Masoud.jpeg" },
    { name: "Aya Abd Ellatif Nasr", img: "Aya Abd Ellatif Nasr.jpeg" },
    { name: "Hazem Osama Yassin", img: "Hazem Osama Yassin.jpeg" },
    { name: "Salma Mohamed Goda", img: "Salma Mohamed Goda.jpeg" },
    { name: "Shatha Ahmed Abdou Rezk", img: "Shatha Ahmed Abdou Rezk.jpeg" },
    { name: "Asmaa Gamal Abd Elmabood", img: "Asmaa Gamal Abd Elmabood.jpeg" },
    { name: "Merna Walid Behis", img: "Merna Walid Behis.jpeg" },
    { name: "Maya Wael Naeem", img: "Maya Wael Naem.jpeg" },
    { name: "Ahmed Mohamed Elkamash", img: "Ahmed Mohamed Elkamash.jpeg" }
];

// وظيفة البناء والضخ الديناميكي لبيانات الفريق فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const teamGrid = document.getElementById("github-team-grid");
    if (teamGrid) {
        teamGrid.innerHTML = ""; // تنظيف الشبكة تماماً قبل الضخ
        researchTeam.forEach(member => {
            const card = document.createElement("div");
            card.className = "member-card";
            
            // سحب الصورة ديناميكياً مع ترميز المسافات بشكل آمن لمتصفحات الويب
            const fullImgUrl = GITHUB_IMAGE_BASE_URL + encodeURIComponent(member.img);
            
            card.innerHTML = `
                <img src="${fullImgUrl}" alt="${member.name}" class="member-photo" onerror="this.onerror=null; this.src='https://via.placeholder.com/150/E8D8C3/3F2E23?text=Pharmacist';">
                <h4>${member.name}</h4>
                <p>Project Researcher</p>
            `;
            teamGrid.appendChild(card);
        });
    }
    
    // تفعيل محاكي حركة مجسم الـ 3D عبر حركة مؤشر الماوس
    const scene = document.getElementById('scene-trigger');
    const cube = document.getElementById('cube');
    
    if(scene && cube) {
        scene.addEventListener('mousemove', (e) => {
            const rect = scene.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width/2);
            const y = e.clientY - rect.top - (rect.height/2);
            
            cube.style.transform = `rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
        });
        
        scene.addEventListener('mouseleave', () => {
            cube.style.transform = `rotateX(-20deg) rotateY(20deg)`;
            cube.style.transition = "transform 0.5s ease";
        });
        scene.addEventListener('mouseenter', () => {
            cube.style.transition = "none";
        });
    }
});

// ==========================================
// MODULE 01: CLINICAL CASE SIMULATOR
// ==========================================
function evaluateCase(decision) {
    const feedbackBox = document.getElementById('sim-feedback');
    feedbackBox.style.display = 'block';
    
    if (decision === 'correct') {
        feedbackBox.style.background = '#e8f5e9';
        feedbackBox.style.border = '1px solid #B56A3A';
        feedbackBox.style.color = '#6B4A36';
        feedbackBox.innerHTML = `
            <strong>✔ Accurate Clinical Choice — Verification Successful</strong>
            <p style="font-size:14px; font-weight:500; margin-top:5px;">
                Tirzepatide is correct. The coexistence of advanced MASH and severe obesity mandates dual co-agonist intervention. Recruitment of the GIP receptor pathway directly increases energy expenditure and targets localized hepatic metabolic inflammation, leading to exceptional fibrosis reversal.
            </p>
        `;
    } else {
        feedbackBox.style.background = '#fff3e0';
        feedbackBox.style.border = '1px solid #6B4A36';
        feedbackBox.style.color = '#3F2E23';
        feedbackBox.innerHTML = `
            <strong>⚠ Sub-optimal Treatment Pathway</strong>
            <p style="font-size:14px; font-weight:500; margin-top:5px;">
                While Ozempic (Semaglutide) possesses undisputed efficacy in macrovascular protection, it remains a single receptor agonist. Clinical data from the SURPASS trials proves that single GLP-1 RAs cannot match the depth of visceral adipose clearance provided by dual incretin co-agonism.
            </p>
        `;
    }
}

// ==========================================
// MODULE 02: BIOCHEMICAL CASCADE SORTER
// ==========================================
let scores = { opt1: null, opt2: null, opt3: null, opt4: null };

function selectEffect(cardId, expectedTarget) {
    const cardElement = document.getElementById(cardId);
    const feedbackBox = document.getElementById('game-feedback');
    
    if (expectedTarget === 'gip') {
        cardElement.className = "game-opt-card selected-gip";
        cardElement.innerHTML += " → Linked to GIP";
        scores[cardId] = true;
    } else {
        cardElement.className = "game-opt-card selected-glp";
        cardElement.innerHTML += " → Linked to GLP-1";
        scores[cardId] = true;
    }
    
    cardElement.onclick = null;
    
    if (scores.opt1 && scores.opt2 && scores.opt3 && scores.opt4) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = '#E8D8C3';
        feedbackBox.style.border = '1px solid #D9B382';
        feedbackBox.style.color = '#3F2E23';
        feedbackBox.innerHTML = `
            <strong>Pharmacological Mapping Completed Successfully!</strong>
            <p style="font-size:13.5px; margin-top:5px;">
                Visceral fat clearance and brainstem nausea mitigation are specific physiological fingerprints of the GIP pathway, while cAMP activation and gastric emptying delays are classic GLP-1 behaviors. This synergy gives Tirzepatide its profound advantage.
            </p>
        `;
    }
}
