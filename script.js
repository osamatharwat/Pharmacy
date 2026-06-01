/**
 * Tirzepatide Graduation Project - Dual Game Engine 
 * Faculty of Pharmacy - 2026
 */

// ==========================================
// GAME MODULE 01: CLINICAL CASE SIMULATOR
// ==========================================
function evaluateCase(decision) {
    const feedbackBox = document.getElementById('sim-feedback');
    feedbackBox.style.display = 'block';
    
    if (decision === 'correct') {
        feedbackBox.style.background = '#ecfdf5';
        feedbackBox.style.border = '1px solid #10b981';
        feedbackBox.style.color = '#065f46';
        feedbackBox.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: flex-start;">
                <i class="fa-solid fa-circle-check" style="font-size: 20px; margin-top: 3px;"></i>
                <div>
                    <strong style="font-size: 16.5px; display: block; margin-bottom: 4px;">Accurate Clinical Choice — Verification Successful</strong>
                    <p style="font-size: 14px; font-weight: 400; color: #047857;">
                        <strong>Tirzepatide</strong> is correct. The coexistence of advanced MASH and severe obesity mandates co-agonist intervention. While single GLP-1 activation slows liver fat accumulation to some degree, the recruitment of the <strong>GIP receptor</strong> pathway directly increases energy expenditure and targets localized hepatic metabolic inflammation, leading to exceptional fibrosis reversal.
                    </p>
                </div>
            </div>
        `;
    } else {
        feedbackBox.style.background = '#fef2f2';
        feedbackBox.style.border = '1px solid #f87171';
        feedbackBox.style.color = '#991b1b';
        feedbackBox.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: flex-start;">
                <i class="fa-solid fa-circle-xmark" style="font-size: 20px; margin-top: 3px;"></i>
                <div>
                    <strong style="font-size: 16.5px; display: block; margin-bottom: 4px;">Sub-optimal Treatment Pathway</strong>
                    <p style="font-size: 14px; font-weight: 400; color: #b91c1c;">
                        While Ozempic (Semaglutide) possesses undisputed efficacy in macrovascular protection, it remains a <strong>single receptor agonist</strong>. Clinical data from the SURPASS trials proves that single GLP-1 RAs cannot match the depth of visceral adipose clearance and hepatic protection provided by dual incretin co-agonism.
                    </p>
                </div>
            </div>
        `;
    }
}

// ==========================================
// GAME MODULE 02: MOLECULAR CASCADE SORTER
// ==========================================
let scores = { opt1: null, opt2: null, opt3: null, opt4: null };

function selectEffect(cardId, expectedTarget) {
    const cardElement = document.getElementById(cardId);
    const feedbackBox = document.getElementById('game-feedback');
    
    // محاكاة ممتعة للفرز السريع والتفاعلي
    if (expectedTarget === 'gip') {
        cardElement.className = "game-opt-card selected-gip";
        cardElement.innerHTML += " → Linked to GIP Pathways";
        scores[cardId] = true;
    } else {
        cardElement.className = "game-opt-card selected-glp";
        cardElement.innerHTML += " → Linked to GLP-1 Pathways";
        scores[cardId] = true;
    }
    
    // منع تكرار الضغط
    cardElement.onclick = null;
    
    // مراجعة النتيجة الكلية وعرضها فور اكتمال الفرز
    if (scores.opt1 && scores.opt2 && scores.opt3 && scores.opt4) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = '#f0f9ff';
        feedbackBox.style.border = '1px solid #0284c7';
        feedbackBox.style.color = '#1e3a8a';
        feedbackBox.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: flex-start;">
                <i class="fa-solid fa-graduation-cap" style="font-size: 22px; margin-top: 3px; color: #0284c7;"></i>
                <div>
                    <strong style="font-size: 16.5px; display: block; margin-bottom: 4px;">Pharmacological Mapping Completed Successfully!</strong>
                    <p style="font-size: 14px; font-weight: 400; color: #1e40af;">
                        Excellent! Visceral fat clearance and brainstem nausea mitigation are specific physiological fingerprints of the <strong>GIP</strong> pathway, while cAMP activation and gastric emptying delays are classic <strong>GLP-1</strong> behaviors. This synergistic combination is what gives Tirzepatide its profound metabolic advantage.
                    </p>
                </div>
            </div>
        `;
    }
}