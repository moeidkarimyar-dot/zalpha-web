const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const numStars = 400;
const stars = [];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 1000,
        isOrange: Math.random() > 0.4 
    });
}

function drawSpace() {
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, width, height);
    const cx = width / 2; const cy = height / 2;

    for (let i = 0; i < numStars; i++) {
        let star = stars[i];
        star.z -= 2.5; 
        if (star.z <= 0) star.z = 1000;

        const k = 450 / star.z;
        const px = star.x * k + cx; const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = (1 - star.z / 1000) * 2.2;
            const opacity = (1 - star.z / 1000);

            if(star.isOrange) {
                ctx.fillStyle = `rgba(255, 75, 43, ${opacity})`;
            } else {
                ctx.fillStyle = `rgba(229, 231, 235, ${opacity * 0.5})`;
            }

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    requestAnimationFrame(drawSpace);
}
drawSpace();

/* --- افکت پارالکس موس --- */
const card = document.getElementById('tilt-card');
document.addEventListener('mousemove', (e) => {
    if(window.innerWidth < 768) return; 
    let xAxis = (window.innerWidth / 2 - e.pageX) / 28;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 28;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

/* --- اتصال به ربات تلگرام --- */
async function sendToTelegram() {
    const input = document.getElementById('user-target');
    const btn = document.getElementById('notify-btn');
    const text = input.value.trim();

    if (!text) { alert("آیدی یا ایمیلت رو بنویس رفیق!"); return; }

    const TOKEN = "8864758700:AAFOWweoy5FfcxAA1wq1A6NblQlEaqWG36A"; 
    const CHAT_ID = "8127667197";

    const message = `🔥 جوخه زالفا (ثبت‌نام جدید):\n\nتارگت: ${text}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

    btn.innerText = "ارسال..."; 
    btn.disabled = true;

    try {
        const res = await fetch(url);
        if (res.ok) { 
            alert('ثبت شد. منتظر دستور باش.'); 
            input.value = ''; 
        } else { 
            alert('خطا در ارسال.'); 
        }
    } catch (e) { 
        alert('خطای شبکه (فیلترشکن خاموش است)'); 
    } finally { 
        btn.innerText = "خبرم کن"; 
        btn.disabled = false; 
    }
}

// اتصال رویداد کلیک دکمه به تابع
document.getElementById('notify-btn').addEventListener('click', sendToTelegram);

/* ========================================================
   پروتکل ضد-جاسوسی (تله‌موش برای کاربران کنجکاو)
   ======================================================== */

// ۱. قفل کردن راست‌کلیک در کل صفحه
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// ۲. قفل کردن کلیدهای میانبرِ باز کردن Inspect (ویندوز و مک)
document.addEventListener('keydown', function(event) {
    
    // کلید F12
    if (event.key === 'F12') {
        event.preventDefault();
        return false;
    }

    // میانبر Ctrl+Shift+I یا Cmd+Option+I (Inspect)
    // میانبر Ctrl+Shift+J یا Cmd+Option+J (Console)
    // میانبر Ctrl+Shift+C یا Cmd+Option+C (Element Selector)
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(event.key)) {
        event.preventDefault();
        return false;
    }

    // میانبر Ctrl+U یا Cmd+U (View Source)
    if ((event.ctrlKey || event.metaKey) && ['U', 'u'].includes(event.key)) {
        event.preventDefault();
        return false;
    }

    // میانبر Ctrl+S یا Cmd+S (Save Page)
    if ((event.ctrlKey || event.metaKey) && ['S', 's'].includes(event.key)) {
        event.preventDefault();
        return false;
    }
});