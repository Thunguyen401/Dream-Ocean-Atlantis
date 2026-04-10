let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
let gameType = '';
let animationId = null;

// Khai báo biến global cho từng game
let p_board = [], p_selected = null;
let m_hook = {}, m_items = [];
let s_bullets = [], s_enemies = [], s_angle = 0;

function openGame(type) {
    document.getElementById('game-overlay').style.display = 'flex';
    gameType = type;
    document.getElementById('game-title').innerText = type.toUpperCase();
    
    if (animationId) cancelAnimationFrame(animationId);
    resetCurrentGame();
}

function closeGame() {
    document.getElementById('game-overlay').style.display = 'none';
    if (animationId) cancelAnimationFrame(animationId);
}

function resetCurrentGame() {
    if (gameType === 'pikachu') initPikachu();
    else if (gameType === 'miner') initMiner();
    else if (gameType === 'shooter') initShooter();
}

// --- LOGIC PIKACHU ---
function initPikachu() {
    canvas.width = 400; canvas.height = 300;
    const ROWS = 6, COLS = 8, TILE = 50;
    let icons = ["A","B","C","D","E","F","G","H"];
    let pool = [];
    for(let i=0; i<24; i++) { let icon = icons[i%8]; pool.push(icon, icon); }
    pool.sort(() => Math.random()-0.5);
    p_board = [];
    for(let r=0; r<ROWS; r++) {
        p_board[r] = [];
        for(let c=0; c<COLS; c++) p_board[r][c] = pool.pop();
    }
    p_selected = null;
    drawPikachu();
}

function drawPikachu() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    p_board.forEach((row, r) => row.forEach((val, c) => {
        if(!val) return;
        ctx.strokeStyle = "#00f2ff"; ctx.strokeRect(c*50, r*50, 50, 50);
        ctx.fillStyle = (p_selected && p_selected.r===r && p_selected.c===c) ? "#00f2ff" : "#fff";
        ctx.font = "20px Arial"; ctx.fillText(val, c*50+18, r*50+32);
    }));
}

// --- LOGIC ĐÀO VÀNG ---
function initMiner() {
    canvas.width = 500; canvas.height = 400;
    m_hook = { x:250, y:50, angle:0, len:40, state:"swing", speed:0.03 };
    m_items = [];
    for(let i=0; i<6; i++) m_items.push({x:Math.random()*400+50, y:Math.random()*200+150, r:15});
    updateMiner();
}

function updateMiner() {
    ctx.clearRect(0,0,500,400);
    if(m_hook.state==="swing") {
        m_hook.angle += m_hook.speed;
        if(Math.abs(m_hook.angle)>1.2) m_hook.speed *= -1;
    } else if(m_hook.state==="shoot") {
        m_hook.len += 5;
        if(m_hook.len>400) m_hook.state="back";
        m_items.forEach((it, i) => {
            let hx = 250+Math.sin(m_hook.angle)*m_hook.len;
            let hy = 50+Math.cos(m_hook.angle)*m_hook.len;
            if(Math.hypot(hx-it.x, hy-it.y)<it.r) { m_hook.state="back"; m_items.splice(i,1); }
        });
    } else {
        m_hook.len -= 3; if(m_hook.len<=40) m_hook.state="swing";
    }
    ctx.strokeStyle="#fff"; ctx.beginPath(); ctx.moveTo(250,50);
    ctx.lineTo(250+Math.sin(m_hook.angle)*m_hook.len, 50+Math.cos(m_hook.angle)*m_hook.len); ctx.stroke();
    m_items.forEach(it => { ctx.fillStyle="gold"; ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, 7); ctx.fill(); });
    animationId = requestAnimationFrame(updateMiner);
}

// --- XỬ LÝ CLICK CHUNG CHO CANVAS ---
canvas.onclick = (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if(gameType === 'pikachu') {
        let c = Math.floor(x/50), r = Math.floor(y/50);
        if(!p_board[r][c]) return;
        if(!p_selected) p_selected = {r,c};
        else {
            if(p_board[r][c] === p_board[p_selected.r][p_selected.c] && (r!==p_selected.r || c!==p_selected.c)) {
                p_board[r][c] = null; p_board[p_selected.r][p_selected.c] = null;
            }
            p_selected = null;
        }
        drawPikachu();
    } else if(gameType === 'miner') {
        if(m_hook.state === "swing") m_hook.state = "shoot";
    }
};