import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dir, '../public/images/projects')

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg0:    '#080f1e',
  bg1:    '#0f172a',
  bg2:    '#1a2540',
  bg3:    '#243049',
  border: '#2d3e58',
  text1:  '#f1f5f9',
  text2:  '#94a3b8',
  text3:  '#64748b',
  relay:     '#818cf8',
  relayDim:  '#818cf820',
  prison:    '#38bdf8',
  prisonDim: '#38bdf820',
  bcuze:     '#34d399',
  bcuzeDim:  '#34d39920',
  green:  '#4ade80',
  yellow: '#fbbf24',
  red:    '#f87171',
}

const W = 1200
const H = 750
const FONT = `font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"`

// ─── Shared SVG fragments ─────────────────────────────────────────────────────

function chrome(urlText) {
  return `
  <rect width="${W}" height="${H}" fill="${T.bg1}"/>
  <rect width="${W}" height="44" fill="${T.bg2}"/>
  <circle cx="22" cy="22" r="6" fill="#ef4444" opacity=".75"/>
  <circle cx="40" cy="22" r="6" fill="#f59e0b" opacity=".75"/>
  <circle cx="58" cy="22" r="6" fill="#22c55e" opacity=".75"/>
  <rect x="80" y="9" width="200" height="26" rx="5" fill="${T.bg1}"/>
  <text x="180" y="26" text-anchor="middle" fill="${T.text2}" font-size="12" ${FONT}>${urlText}</text>
  <rect x="310" y="11" width="440" height="22" rx="11" fill="${T.bg0}"/>
  <text x="530" y="26" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>https://app.example.com</text>`
}

function sidebar(accent, items, selectedIdx) {
  const navY = [140, 174, 208, 242, 276]
  const rows = items.map((label, i) => {
    const y = navY[i]
    const active = i === selectedIdx
    return `
    ${active ? `<rect x="0" y="${y - 18}" width="200" height="32" fill="${accent}20"/>
    <rect x="0" y="${y - 18}" width="3" height="32" fill="${accent}"/>` : ''}
    <text x="24" y="${y}" fill="${active ? accent : T.text3}" font-size="13" ${active ? 'font-weight="500"' : ''} ${FONT}>${label}</text>`
  }).join('')
  return `
  <rect x="0" y="44" width="200" height="${H - 44}" fill="${T.bg0}"/>
  ${rows}`
}

function logoText(x, y, icon, label, accent) {
  return `
  <text x="${x}" y="${y}" fill="${accent}" font-size="15" font-weight="700" ${FONT}>${icon}  ${label}</text>`
}

function pageTitle(x, y, text) {
  return `<text x="${x}" y="${y}" fill="${T.text1}" font-size="18" font-weight="600" ${FONT}>${text}</text>`
}

function statCard(x, y, label, value, valueColor) {
  return `
  <rect x="${x}" y="${y}" width="208" height="78" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="${x + 16}" y="${y + 28}" fill="${T.text3}" font-size="11" ${FONT}>${label}</text>
  <text x="${x + 16}" y="${y + 58}" fill="${valueColor || T.text1}" font-size="26" font-weight="700" ${FONT}>${value}</text>`
}

function tableHeader(x, y, w, cols) {
  const cells = cols.map(([label, cx]) =>
    `<text x="${x + cx}" y="${y + 22}" fill="${T.text3}" font-size="12" font-weight="500" ${FONT}>${label}</text>`
  ).join('')
  return `
  <rect x="${x}" y="${y}" width="${w}" height="36" fill="${T.bg2}"/>
  ${cells}`
}

function tableRow(x, y, w, even, cells) {
  const bg = even ? T.bg1 : `${T.bg2}80`
  const cellSvg = cells.map(([text, cx, color, mono]) =>
    `<text x="${x + cx}" y="${y + 26}" fill="${color || T.text2}" font-size="12" ${mono ? `font-family="'JetBrains Mono', monospace"` : FONT}>${text}</text>`
  ).join('')
  return `
  <rect x="${x}" y="${y}" width="${w}" height="42" fill="${bg}"/>
  ${cellSvg}`
}

function badge(x, y, label, color, bg) {
  const w = label.length * 7.2 + 18
  return `
  <rect x="${x}" y="${y}" width="${w}" height="20" rx="4" fill="${bg || color + '20'}"/>
  <circle cx="${x + 10}" cy="${y + 10}" r="3.5" fill="${color}"/>
  <text x="${x + 18}" y="${y + 14}" fill="${color}" font-size="11" font-weight="500" ${FONT}>${label}</text>`
}

function button(x, y, label, accent) {
  const w = label.length * 8 + 28
  return `
  <rect x="${x}" y="${y}" width="${w}" height="32" rx="7" fill="${accent}"/>
  <text x="${x + w/2}" y="${y + 20}" text-anchor="middle" fill="#fff" font-size="12" font-weight="500" ${FONT}>${label}</text>`
}

function divider(x, y, w) {
  return `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${T.border}" stroke-width="1"/>`
}

function wrap(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${content}</svg>`
}

// ─── RELAY ────────────────────────────────────────────────────────────────────

const relayDevices = wrap(`
  ${chrome('relay-admin · Devices')}
  ${sidebar(T.relay, ['Dashboard', 'Devices', 'Members', 'Wallets', 'Settings'], 1)}
  ${logoText(18, 96, '◈', 'Relay', T.relay)}

  <!-- Content -->
  ${pageTitle(224, 88, 'Device Management')}
  ${statCard(224, 108, 'TOTAL DEVICES', '1,284', T.text1)}
  ${statCard(448, 108, 'ONLINE NOW', '891', T.green)}
  ${statCard(672, 108, 'PENDING APPROVAL', '47', T.yellow)}
  ${statCard(896, 108, 'OFFLINE', '346', T.text3)}

  <!-- Search + button -->
  <rect x="224" y="208" width="340" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="244" y="230" fill="${T.text3}" font-size="12" ${FONT}>Search by name or ID…</text>
  <rect x="576" y="208" width="120" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="616" y="229" text-anchor="middle" fill="${T.text2}" font-size="12" ${FONT}>All Status</text>
  ${button(1060, 208, '+ Add Device', T.relay)}

  <!-- Table -->
  ${tableHeader(224, 254, 936, [['Device ID', 0], ['Name', 140], ['Location', 340], ['Status', 540], ['Registered', 700], ['Last Seen', 860]])}
  ${divider(224, 290, 936)}
  ${tableRow(224, 290, 936, true,  [['RLY-0091', 0, T.text3, true], ['Terminal A',  140], ['Floor 1, North Wing', 340], ['', 540], ['14 Jan 2025', 700], ['Just now', 860]])}
  ${badge(764, 299, 'Online',  T.green, T.green + '18')}
  ${tableRow(224, 332, 936, false, [['RLY-0082', 0, T.text3, true], ['Terminal B',  140], ['Floor 2, East Wing',  340], ['', 540], ['12 Jan 2025', 700], ['2 min ago', 860]])}
  ${badge(764, 341, 'Online',  T.green, T.green + '18')}
  ${tableRow(224, 374, 936, true,  [['RLY-0073', 0, T.text3, true], ['Terminal C',  140], ['Main Lobby',          340], ['', 540], ['10 Jan 2025', 700], ['8 min ago', 860]])}
  ${badge(764, 383, 'Pending', T.yellow, T.yellow + '18')}
  ${tableRow(224, 416, 936, false, [['RLY-0065', 0, T.text3, true], ['Terminal D',  140], ['Floor 3, Conference', 340], ['', 540], ['9 Jan 2025',  700], ['2h ago',    860]])}
  ${badge(764, 425, 'Offline', T.text3, T.border)}
  ${tableRow(224, 458, 936, true,  [['RLY-0058', 0, T.text3, true], ['Terminal E',  140], ['Cafeteria',           340], ['', 540], ['8 Jan 2025',  700], ['4 min ago', 860]])}
  ${badge(764, 467, 'Online',  T.green, T.green + '18')}
  ${tableRow(224, 500, 936, false, [['RLY-0049', 0, T.text3, true], ['Terminal F',  140], ['Security Desk',       340], ['', 540], ['7 Jan 2025',  700], ['12 min ago', 860]])}
  ${badge(764, 509, 'Pending', T.yellow, T.yellow + '18')}
  ${divider(224, 542, 936)}

  <!-- Pagination -->
  <text x="224" y="568" fill="${T.text3}" font-size="12" ${FONT}>Showing 6 of 1,284 devices</text>
  <rect x="1040" y="552" width="28" height="28" rx="6" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="1054" y="570" text-anchor="middle" fill="${T.relay}" font-size="12" ${FONT}>1</text>
  <rect x="1074" y="552" width="28" height="28" rx="6" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="1088" y="570" text-anchor="middle" fill="${T.text3}" font-size="12" ${FONT}>2</text>
  <rect x="1108" y="552" width="28" height="28" rx="6" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="1122" y="570" text-anchor="middle" fill="${T.text3}" font-size="12" ${FONT}>3</text>
  <text x="1140" y="568" fill="${T.text3}" font-size="12" ${FONT}>…</text>
`)

// ────────────────────────────────────────────────────────────────────────────

const relayKiosk = wrap(`
  <!-- Full screen kiosk — no browser chrome, no sidebar -->
  <rect width="${W}" height="${H}" fill="${T.bg0}"/>
  <!-- Subtle dot-grid background pattern -->
  <defs>
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="${T.border}" opacity=".4"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Status bar -->
  <rect width="${W}" height="36" fill="${T.bg1}" opacity=".9"/>
  <circle cx="18" cy="18" r="5" fill="${T.green}"/>
  <text x="30" y="22" fill="${T.green}" font-size="11" font-weight="500" ${FONT}>SYSTEM ONLINE</text>
  <text x="${W - 16}" y="22" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>Terminal RLY-0091  ·  Floor 1, North Wing</text>

  <!-- Center card -->
  <rect x="350" y="100" width="500" height="550" rx="16" fill="${T.bg2}" stroke="${T.relay}30" stroke-width="1"/>

  <!-- Logo -->
  <text x="600" y="172" text-anchor="middle" fill="${T.relay}" font-size="32" font-weight="700" ${FONT}>◈  Relay</text>
  <text x="600" y="200" text-anchor="middle" fill="${T.text3}" font-size="13" ${FONT}>KIOSK TERMINAL</text>
  ${divider(390, 220, 420)}

  <!-- State: Registration form -->
  <text x="600" y="268" text-anchor="middle" fill="${T.text1}" font-size="20" font-weight="600" ${FONT}>Register This Terminal</text>
  <text x="600" y="294" text-anchor="middle" fill="${T.text3}" font-size="13" ${FONT}>Enter details to connect to the admin system</text>

  <!-- Device name field -->
  <text x="392" y="334" fill="${T.text3}" font-size="12" ${FONT}>Device Name</text>
  <rect x="392" y="342" width="416" height="40" rx="8" fill="${T.bg1}" stroke="${T.border}" stroke-width="1"/>
  <text x="408" y="367" fill="${T.text2}" font-size="13" ${FONT}>Terminal A — North Lobby</text>

  <!-- Location field -->
  <text x="392" y="404" fill="${T.text3}" font-size="12" ${FONT}>Physical Location</text>
  <rect x="392" y="412" width="416" height="40" rx="8" fill="${T.bg1}" stroke="${T.border}" stroke-width="1"/>
  <text x="408" y="437" fill="${T.text2}" font-size="13" ${FONT}>Floor 1, North Wing</text>

  <!-- Submit button -->
  <rect x="392" y="474" width="416" height="44" rx="10" fill="${T.relay}"/>
  <text x="600" y="501" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" ${FONT}>Register Device</text>

  <!-- Footer status -->
  <text x="600" y="556" text-anchor="middle" fill="${T.text3}" font-size="12" ${FONT}>Secured with ECDSA P-256 · Key stored in OS keychain</text>

  <!-- Bottom bar -->
  <rect y="${H - 48}" width="${W}" height="48" fill="${T.bg1}" opacity=".9"/>
  <text x="600" y="${H - 18}" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>Relay Kiosk OS  v1.4.2  ·  Build 20250110</text>
`)

// ────────────────────────────────────────────────────────────────────────────

const relayWallets = wrap(`
  ${chrome('relay-admin · Wallets')}
  ${sidebar(T.relay, ['Dashboard', 'Devices', 'Members', 'Wallets', 'Settings'], 3)}
  ${logoText(18, 96, '◈', 'Relay', T.relay)}

  ${pageTitle(224, 88, 'Member Wallets')}
  ${statCard(224, 108, 'TOTAL WALLETS',    '2,841', T.text1)}
  ${statCard(448, 108, 'TOTAL BALANCE',    '₹3.2L', T.relay)}
  ${statCard(672, 108, 'TOPPED UP TODAY',  '₹18,400', T.green)}
  ${statCard(896, 108, 'LOW BALANCE',      '84',    T.yellow)}

  <!-- Search + export -->
  <rect x="224" y="208" width="340" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="244" y="230" fill="${T.text3}" font-size="12" ${FONT}>Search member name or ID…</text>
  ${button(1040, 208, '↑ Export', T.bg3)}

  ${tableHeader(224, 254, 936, [['Member ID', 0], ['Name', 140], ['Phone', 340], ['Balance', 520], ['Last Topped Up', 680], ['Status', 850]])}
  ${divider(224, 290, 936)}
  ${tableRow(224, 290, 936, true,  [['MBR-1021', 0, T.text3, true], ['Arjun Sharma',    140], ['+91 98400 00001', 340], ['₹2,400', 520, T.text1], ['Today, 10:22 AM', 680], ['', 850]])}
  ${badge(1074, 299, 'Active', T.green, T.green+'18')}
  ${tableRow(224, 332, 936, false, [['MBR-0998', 0, T.text3, true], ['Priya Nair',       140], ['+91 98400 00042', 340], ['₹850',   520, T.text1], ['Yesterday',        680], ['', 850]])}
  ${badge(1074, 341, 'Active', T.green, T.green+'18')}
  ${tableRow(224, 374, 936, true,  [['MBR-0872', 0, T.text3, true], ['Vikram Das',       140], ['+91 98400 00109', 340], ['₹80',    520, T.yellow], ['5 days ago',       680], ['', 850]])}
  ${badge(1074, 383, 'Low',    T.yellow, T.yellow+'18')}
  ${tableRow(224, 416, 936, false, [['MBR-0741', 0, T.text3, true], ['Ritu Mehta',       140], ['+91 98400 00213', 340], ['₹3,100', 520, T.text1], ['Today, 09:14 AM',  680], ['', 850]])}
  ${badge(1074, 425, 'Active', T.green, T.green+'18')}
  ${tableRow(224, 458, 936, true,  [['MBR-0612', 0, T.text3, true], ['Sanjay Pillai',    140], ['+91 98400 00318', 340], ['₹0',     520, T.red],    ['12 days ago',      680], ['', 850]])}
  ${badge(1074, 467, 'Empty',  T.red, T.red+'18')}
  ${tableRow(224, 500, 936, false, [['MBR-0509', 0, T.text3, true], ['Deepa Krishnan',   140], ['+91 98400 00401', 340], ['₹1,650', 520, T.text1], ['2 days ago',       680], ['', 850]])}
  ${badge(1074, 509, 'Active', T.green, T.green+'18')}
  ${divider(224, 542, 936)}
  <text x="224" y="568" fill="${T.text3}" font-size="12" ${FONT}>Showing 6 of 2,841 members</text>
`)

// ─── PRISONBRIDGE ─────────────────────────────────────────────────────────────

const prisonbridgeCall = wrap(`
  <rect width="${W}" height="${H}" fill="#060d18"/>

  <!-- Top bar -->
  <rect width="${W}" height="52" fill="#0b1628" opacity=".95"/>
  <circle cx="18" cy="26" r="5" fill="${T.green}"/>
  <text x="30" y="30" fill="${T.green}" font-size="11" font-weight="500" ${FONT}>● SUPERVISED SESSION</text>
  <text x="600" y="30" text-anchor="middle" fill="${T.text1}" font-size="13" font-weight="600" ${FONT}>Session #8819  ·  00:18:42</text>
  <text x="${W - 16}" y="30" text-anchor="end" fill="${T.text3}" font-size="12" ${FONT}>HD · 1080p</text>

  <!-- Left video panel -->
  <rect x="24" y="72" width="548" height="520" rx="12" fill="#0d1e33"/>
  <rect x="24" y="72" width="548" height="520" rx="12" fill="${T.prison}08"/>
  <!-- Silhouette -->
  <ellipse cx="298" cy="260" rx="72" ry="72" fill="#1a2f48"/>
  <ellipse cx="298" cy="400" rx="104" ry="80" fill="#1a2f48"/>
  <!-- Name tag -->
  <rect x="36" y="548" width="240" height="32" rx="6" fill="#00000060"/>
  <text x="50" y="568" fill="${T.text1}" font-size="13" font-weight="500" ${FONT}>James Mitchell</text>
  <text x="50" y="582" fill="${T.text3}" font-size="11" ${FONT}>Inmate #4821</text>

  <!-- Right video panel -->
  <rect x="588" y="72" width="588" height="520" rx="12" fill="#0d1e33"/>
  <rect x="588" y="72" width="588" height="520" rx="12" fill="${T.prison}06"/>
  <ellipse cx="882" cy="260" rx="72" ry="72" fill="#1a2f48"/>
  <ellipse cx="882" cy="400" rx="104" ry="80" fill="#1a2f48"/>
  <rect x="600" y="548" width="220" height="32" rx="6" fill="#00000060"/>
  <text x="614" y="568" fill="${T.text1}" font-size="13" font-weight="500" ${FONT}>Sarah Mitchell</text>
  <text x="614" y="582" fill="${T.text3}" font-size="11" ${FONT}>Approved Visitor</text>

  <!-- Control bar -->
  <rect x="0" y="610" width="${W}" height="140" fill="#0b1628" opacity=".96"/>
  ${divider(0, 610, W)}

  <!-- Control buttons -->
  <!-- Mute -->
  <rect x="440" y="630" width="56" height="56" rx="28" fill="${T.bg3}"/>
  <text x="468" y="663" text-anchor="middle" fill="${T.text1}" font-size="20">🎙</text>
  <text x="468" y="698" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>Mute</text>
  <!-- Video -->
  <rect x="516" y="630" width="56" height="56" rx="28" fill="${T.bg3}"/>
  <text x="544" y="663" text-anchor="middle" fill="${T.text1}" font-size="20">📹</text>
  <text x="544" y="698" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>Video</text>
  <!-- End call -->
  <rect x="572" y="626" width="56" height="64" rx="28" fill="${T.red}"/>
  <text x="600" y="663" text-anchor="middle" fill="#fff" font-size="22">✕</text>
  <text x="600" y="702" text-anchor="middle" fill="${T.red}" font-size="11" font-weight="500" ${FONT}>End Call</text>
  <!-- Report -->
  <rect x="628" y="630" width="56" height="56" rx="28" fill="${T.bg3}"/>
  <text x="656" y="663" text-anchor="middle" fill="${T.text1}" font-size="20">⚑</text>
  <text x="656" y="698" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>Report</text>
  <!-- Extend -->
  <rect x="704" y="630" width="56" height="56" rx="28" fill="${T.bg3}"/>
  <text x="732" y="663" text-anchor="middle" fill="${T.text1}" font-size="20">＋</text>
  <text x="732" y="698" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>Extend</text>

  <!-- Session info -->
  <text x="24" y="660" fill="${T.text3}" font-size="12" ${FONT}>Max duration: 30 min  ·  Recording: On</text>
  <text x="24" y="680" fill="${T.text3}" font-size="12" ${FONT}>Connection: Stable (WebRTC P2P, TURN relay)</text>
`)

// ────────────────────────────────────────────────────────────────────────────

const prisonbridgeSessions = wrap(`
  ${chrome('prisonbridge-admin · Sessions')}
  ${sidebar(T.prison, ['Overview', 'Sessions', 'Inmates', 'Visitors', 'Reports'], 1)}
  ${logoText(18, 96, '📡', 'Prisonbridge', T.prison)}

  ${pageTitle(224, 88, 'Session Log')}
  ${statCard(224, 108, 'TODAY\'S SESSIONS', '47',  T.text1)}
  ${statCard(448, 108, 'ACTIVE NOW',       '3',   T.green)}
  ${statCard(672, 108, 'TOTAL DURATION',   '18.4h', T.prison)}
  ${statCard(896, 108, 'FLAGGED',          '2',   T.red)}

  <rect x="224" y="208" width="340" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="244" y="230" fill="${T.text3}" font-size="12" ${FONT}>Search sessions…</text>
  <rect x="576" y="208" width="130" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="641" y="229" text-anchor="middle" fill="${T.text2}" font-size="12" ${FONT}>All Status ▾</text>
  ${button(1020, 208, '↑ Export CSV', T.bg3)}

  ${tableHeader(224, 254, 936, [['Session ID', 0], ['Inmate', 130], ['Visitor', 330], ['Duration', 530], ['Status', 680], ['Date & Time', 800]])}
  ${divider(224, 290, 936)}
  ${tableRow(224, 290, 936, true,  [['#8821', 0, T.text3, true], ['J. Mitchell', 130], ['S. Mitchell', 330], ['24:30', 530, T.text1], ['', 680], ['Today  10:20 AM', 800]])}
  ${badge(904, 299, 'Completed', T.text3, T.border)}
  ${tableRow(224, 332, 936, false, [['#8820', 0, T.text3, true], ['R. Johnson',  130], ['T. Johnson',  330], ['15:45', 530, T.text1], ['', 680], ['Today  10:00 AM', 800]])}
  ${badge(904, 341, 'Completed', T.text3, T.border)}
  ${tableRow(224, 374, 936, true,  [['#8819', 0, T.text3, true], ['M. Davis',    130], ['K. Davis',    330], ['18:22', 530, T.green], ['', 680], ['Now',             800]])}
  ${badge(904, 383, 'Active',    T.green, T.green+'18')}
  ${tableRow(224, 416, 936, false, [['#8818', 0, T.text3, true], ['T. Okafor',   130], ['L. Okafor',   330], ['10:12', 530, T.text1], ['', 680], ['Today  09:30 AM', 800]])}
  ${badge(904, 425, 'Completed', T.text3, T.border)}
  ${tableRow(224, 458, 936, true,  [['#8817', 0, T.text3, true], ['P. Torres',   130], ['M. Torres',   330], ['—',     530, T.text3], ['', 680], ['Today  09:15 AM', 800]])}
  ${badge(904, 467, 'Flagged',   T.red,   T.red+'18')}
  ${tableRow(224, 500, 936, false, [['#8816', 0, T.text3, true], ['C. Brown',    130], ['S. Brown',    330], ['30:00', 530, T.text1], ['', 680], ['Today  08:50 AM', 800]])}
  ${badge(904, 509, 'Completed', T.text3, T.border)}
  ${divider(224, 542, 936)}
  <text x="224" y="568" fill="${T.text3}" font-size="12" ${FONT}>Showing 6 of 47 sessions today</text>
`)

// ────────────────────────────────────────────────────────────────────────────

const prisonbridgeAdmin = wrap(`
  ${chrome('prisonbridge-admin · Overview')}
  ${sidebar(T.prison, ['Overview', 'Sessions', 'Inmates', 'Visitors', 'Reports'], 0)}
  ${logoText(18, 96, '📡', 'Prisonbridge', T.prison)}

  ${pageTitle(224, 88, 'System Overview')}

  <!-- Top stat row -->
  ${statCard(224, 108, 'ACTIVE CALLS',   '3',    T.green)}
  ${statCard(448, 108, 'APPROVED USERS', '1,842', T.prison)}
  ${statCard(672, 108, 'TODAY\'S CALLS', '47',    T.text1)}
  ${statCard(896, 108, 'AVG DURATION',   '22 min', T.text1)}

  <!-- Active calls panel -->
  <rect x="224" y="210" width="460" height="480" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="248" y="244" fill="${T.text1}" font-size="14" font-weight="600" ${FONT}>Active Calls</text>
  ${divider(248, 256, 412)}

  <!-- Call cards -->
  <rect x="240" y="268" width="428" height="88" rx="8" fill="${T.bg3}"/>
  <circle cx="264" cy="305" r="6" fill="${T.green}"/>
  <text x="282" y="298" fill="${T.text1}" font-size="13" font-weight="500" ${FONT}>J. Mitchell → S. Mitchell</text>
  <text x="282" y="316" fill="${T.text3}" font-size="12" ${FONT}>Session #8819  ·  18:22 elapsed</text>
  <text x="282" y="334" fill="${T.prison}" font-size="11" ${FONT}>P2P WebRTC  ·  TURN relay active</text>
  ${button(556, 281, 'Monitor', T.bg2)}

  <rect x="240" y="368" width="428" height="88" rx="8" fill="${T.bg3}"/>
  <circle cx="264" cy="405" r="6" fill="${T.green}"/>
  <text x="282" y="398" fill="${T.text1}" font-size="13" font-weight="500" ${FONT}>R. Carter → D. Carter</text>
  <text x="282" y="416" fill="${T.text3}" font-size="12" ${FONT}>Session #8820  ·  05:41 elapsed</text>
  <text x="282" y="434" fill="${T.prison}" font-size="11" ${FONT}>P2P WebRTC  ·  Direct connection</text>
  ${button(556, 381, 'Monitor', T.bg2)}

  <rect x="240" y="468" width="428" height="88" rx="8" fill="${T.bg3}"/>
  <circle cx="264" cy="505" r="6" fill="${T.green}"/>
  <text x="282" y="498" fill="${T.text1}" font-size="13" font-weight="500" ${FONT}>A. Wilson → P. Wilson</text>
  <text x="282" y="516" fill="${T.text3}" font-size="12" ${FONT}>Session #8821  ·  11:08 elapsed</text>
  <text x="282" y="534" fill="${T.prison}" font-size="11" ${FONT}>P2P WebRTC  ·  TURN relay active</text>
  ${button(556, 481, 'Monitor', T.bg2)}

  <!-- Right panel: System health -->
  <rect x="700" y="210" width="460" height="480" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="724" y="244" fill="${T.text1}" font-size="14" font-weight="600" ${FONT}>System Health</text>
  ${divider(724, 256, 412)}

  <text x="724" y="288" fill="${T.text3}" font-size="12" ${FONT}>API Response Time</text>
  <rect x="724" y="296" width="412" height="8" rx="4" fill="${T.bg3}"/>
  <rect x="724" y="296" width="362" height="8" rx="4" fill="${T.prison}"/>
  <text x="1140" y="304" text-anchor="end" fill="${T.prison}" font-size="12" ${FONT}>88ms</text>

  <text x="724" y="330" fill="${T.text3}" font-size="12" ${FONT}>WebRTC TURN Relay Load</text>
  <rect x="724" y="338" width="412" height="8" rx="4" fill="${T.bg3}"/>
  <rect x="724" y="338" width="185" height="8" rx="4" fill="${T.green}"/>
  <text x="1140" y="346" text-anchor="end" fill="${T.green}" font-size="12" ${FONT}>45%</text>

  <text x="724" y="372" fill="${T.text3}" font-size="12" ${FONT}>Database (Postgres)</text>
  <rect x="724" y="380" width="412" height="8" rx="4" fill="${T.bg3}"/>
  <rect x="724" y="380" width="106" height="8" rx="4" fill="${T.green}"/>
  <text x="1140" y="388" text-anchor="end" fill="${T.green}" font-size="12" ${FONT}>26%</text>

  <text x="724" y="414" fill="${T.text3}" font-size="12" ${FONT}>Bull Queue — Pending Jobs</text>
  <rect x="724" y="422" width="412" height="8" rx="4" fill="${T.bg3}"/>
  <rect x="724" y="422" width="37" height="8" rx="4" fill="${T.green}"/>
  <text x="1140" y="430" text-anchor="end" fill="${T.green}" font-size="12" ${FONT}>9</text>

  ${divider(724, 452, 412)}
  <text x="724" y="480" fill="${T.text3}" font-size="12" ${FONT}>Recent Events</text>
  <text x="724" y="506" fill="${T.text2}" font-size="12" ${FONT}>Session #8821 connected via TURN</text>
  <text x="1100" y="506" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>just now</text>
  <text x="724" y="530" fill="${T.text2}" font-size="12" ${FONT}>Session #8820 reconnected (ICE restart)</text>
  <text x="1100" y="530" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>2 min ago</text>
  <text x="724" y="554" fill="${T.text2}" font-size="12" ${FONT}>Session #8818 ended (duration: 10:12)</text>
  <text x="1100" y="554" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>8 min ago</text>
  <text x="724" y="578" fill="${T.text2}" font-size="12" ${FONT}>Nightly audit job completed — 47 records</text>
  <text x="1100" y="578" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>3 hrs ago</text>
  <text x="724" y="602" fill="${T.red}" font-size="12" ${FONT}>Session #8817 flagged by supervisor</text>
  <text x="1100" y="602" text-anchor="end" fill="${T.text3}" font-size="11" ${FONT}>4 hrs ago</text>
`)

// ─── BCUZE ────────────────────────────────────────────────────────────────────

const bcuzeDashboard = wrap(`
  ${chrome('bcuze · Dashboard')}
  ${sidebar(T.bcuze, ['Dashboard', 'Jobs', 'Technicians', 'Clients', 'Reports'], 0)}
  ${logoText(18, 96, '⚙', 'Bcuze', T.bcuze)}

  ${pageTitle(224, 88, 'Service Dashboard')}
  ${statCard(224, 108, 'TOTAL JOBS',    '1,284', T.text1)}
  ${statCard(448, 108, 'ACTIVE',        '47',    T.bcuze)}
  ${statCard(672, 108, 'COMPLETED',     '1,198', T.green)}
  ${statCard(896, 108, 'OVERDUE',       '39',    T.red)}

  <!-- Bar chart -->
  <rect x="224" y="212" width="680" height="240" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="248" y="244" fill="${T.text1}" font-size="14" font-weight="600" ${FONT}>Jobs (Last 7 Days)</text>

  <!-- Chart bars -->
  ${[
    ['Mon', 82, 60], ['Tue', 114, 84], ['Wed', 98, 70], ['Thu', 127, 92],
    ['Fri', 143, 108], ['Sat', 64, 44], ['Sun', 38, 24]
  ].map(([label, total, done], i) => {
    const bx = 260 + i * 88
    const maxH = 130
    const totalH = Math.round(total * maxH / 160)
    const doneH = Math.round(done * maxH / 160)
    const barY = 350
    return `
    <rect x="${bx}" y="${barY - totalH}" width="52" height="${totalH}" rx="4" fill="${T.bcuze}30"/>
    <rect x="${bx}" y="${barY - doneH}"  width="52" height="${doneH}"  rx="4" fill="${T.bcuze}"/>
    <text x="${bx + 26}" y="${barY + 18}" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>${label}</text>
    <text x="${bx + 26}" y="${barY - totalH - 6}" text-anchor="middle" fill="${T.text3}" font-size="11" ${FONT}>${total}</text>`
  }).join('')}
  <!-- Y-axis legend -->
  <text x="244" y="370" fill="${T.text3}" font-size="10" ${FONT}>0</text>
  <text x="244" y="300" fill="${T.text3}" font-size="10" ${FONT}>80</text>
  <text x="244" y="234" fill="${T.text3}" font-size="10" ${FONT}>160</text>
  <!-- Legend chips -->
  <rect x="700" y="228" width="12" height="12" rx="2" fill="${T.bcuze}30"/>
  <text x="716" y="239" fill="${T.text3}" font-size="11" ${FONT}>Total</text>
  <rect x="760" y="228" width="12" height="12" rx="2" fill="${T.bcuze}"/>
  <text x="776" y="239" fill="${T.text3}" font-size="11" ${FONT}>Completed</text>

  <!-- Right panel: Active jobs -->
  <rect x="920" y="212" width="240" height="240" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="944" y="244" fill="${T.text1}" font-size="14" font-weight="600" ${FONT}>Top Categories</text>
  ${divider(944, 254, 192)}
  ${[['HVAC Repair', '22%', 192], ['Plumbing', '19%', 156], ['Electrical', '17%', 136],
     ['Carpentry', '14%', 113], ['Painting', '11%', 89]].map(([cat, pct, barW], i) => {
    const y = 276 + i * 30
    return `
    <text x="944" y="${y}" fill="${T.text2}" font-size="12" ${FONT}>${cat}</text>
    <text x="1136" y="${y}" text-anchor="end" fill="${T.bcuze}" font-size="12" font-weight="500" ${FONT}>${pct}</text>
    <rect x="944" y="${y + 4}" width="${barW}" height="4" rx="2" fill="${T.bg3}"/>
    <rect x="944" y="${y + 4}" width="${Math.round(barW * parseInt(pct) / 25)}" height="4" rx="2" fill="${T.bcuze}"/>`
  }).join('')}

  <!-- Recent jobs table -->
  ${tableHeader(224, 468, 936, [['Job ID', 0], ['Category', 120], ['Client', 320], ['Assigned To', 520], ['Status', 720], ['Due', 860]])}
  ${divider(224, 504, 936)}
  ${tableRow(224, 504, 936, true,  [['#1042', 0, T.text3, true], ['HVAC Repair',  120], ['Sunrise Towers',   320], ['Ravi Kumar',    520], ['', 720], ['Today',     860]])}
  ${badge(944, 513, 'In Progress', T.bcuze, T.bcuze+'18')}
  ${tableRow(224, 546, 936, false, [['#1041', 0, T.text3, true], ['Plumbing',     120], ['Green Park Apts',  320], ['Suresh Rao',    520], ['', 720], ['Yesterday', 860]])}
  ${badge(944, 555, 'Completed',   T.green,  T.green+'18')}
  ${tableRow(224, 588, 936, true,  [['#1040', 0, T.text3, true], ['Electrical',   120], ['Lakeside Complex', 320], ['—',            520], ['', 720], ['Tomorrow',  860]])}
  ${badge(944, 597, 'Pending',     T.yellow, T.yellow+'18')}
  ${tableRow(224, 630, 936, false, [['#1039', 0, T.text3, true], ['Carpentry',    120], ['Hill View Res.',   320], ['Manoj Singh',   520], ['', 720], ['3 days',    860]])}
  ${badge(944, 639, 'Overdue',     T.red,    T.red+'18')}
  ${divider(224, 672, 936)}
  ${button(1100, 683, 'View All', T.bcuze)}
`)

// ────────────────────────────────────────────────────────────────────────────

const bcuzeMonitoring = wrap(`
  ${chrome('bcuze · Monitoring')}
  ${sidebar(T.bcuze, ['Dashboard', 'Jobs', 'Technicians', 'Clients', 'Reports'], 4)}
  ${logoText(18, 96, '⚙', 'Bcuze', T.bcuze)}

  ${pageTitle(224, 88, 'System Monitoring')}

  <!-- Time picker -->
  ${['1h','6h','24h','7d','30d'].map((t, i) => {
    const x = 964 + i * 52
    const active = t === '24h'
    return `<rect x="${x}" y="68" width="44" height="26" rx="6" fill="${active ? T.bcuze : T.bg2}" stroke="${active ? T.bcuze : T.border}" stroke-width="1"/>
    <text x="${x + 22}" y="85" text-anchor="middle" fill="${active ? '#fff' : T.text3}" font-size="12" ${FONT}>${t}</text>`
  }).join('')}

  <!-- API Response Time chart -->
  <rect x="224" y="112" width="920" height="220" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="248" y="144" fill="${T.text1}" font-size="13" font-weight="600" ${FONT}>API Response Time (ms)</text>
  <text x="1120" y="144" text-anchor="end" fill="${T.bcuze}" font-size="13" font-weight="600" ${FONT}>avg 88ms</text>
  ${divider(248, 154, 872)}

  <!-- Chart grid lines -->
  ${[0, 1, 2, 3].map(i => {
    const y = 300 - i * 38
    const label = i * 50
    return `<line x1="268" y1="${y}" x2="1120" y2="${y}" stroke="${T.border}" stroke-width="1" opacity=".5"/>
    <text x="252" y="${y + 4}" text-anchor="end" fill="${T.text3}" font-size="10" ${FONT}>${label}</text>`
  }).join('')}

  <!-- Response time line (bcuze accent) -->
  <polyline
    points="268,268 320,255 372,261 424,240 476,252 528,238 580,265 632,248 684,231 736,258 788,242 840,255 892,228 944,241 996,252 1048,235 1100,244 1120,239"
    fill="none" stroke="${T.bcuze}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <polygon
    points="268,268 320,255 372,261 424,240 476,252 528,238 580,265 632,248 684,231 736,258 788,242 840,255 892,228 944,241 996,252 1048,235 1100,244 1120,239 1120,310 268,310"
    fill="${T.bcuze}" opacity=".08"/>

  <!-- Throughput chart -->
  <rect x="224" y="350" width="920" height="220" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="248" y="382" fill="${T.text1}" font-size="13" font-weight="600" ${FONT}>Throughput (req/s)</text>
  <text x="1120" y="382" text-anchor="end" fill="${T.green}" font-size="13" font-weight="600" ${FONT}>avg 142 req/s</text>
  ${divider(248, 392, 872)}

  ${[0, 1, 2, 3].map(i => {
    const y = 538 - i * 38
    const label = i * 60
    return `<line x1="268" y1="${y}" x2="1120" y2="${y}" stroke="${T.border}" stroke-width="1" opacity=".5"/>
    <text x="252" y="${y + 4}" text-anchor="end" fill="${T.text3}" font-size="10" ${FONT}>${label}</text>`
  }).join('')}

  <polyline
    points="268,500 320,480 372,490 424,465 476,472 528,454 580,468 632,450 684,438 736,455 788,442 840,460 892,434 944,448 996,440 1048,428 1100,444 1120,436"
    fill="none" stroke="${T.green}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <polygon
    points="268,500 320,480 372,490 424,465 476,472 528,454 580,468 632,450 684,438 736,455 788,442 840,460 892,434 944,448 996,440 1048,428 1100,444 1120,436 1120,548 268,548"
    fill="${T.green}" opacity=".08"/>

  <!-- Bottom metric bar -->
  <rect x="224" y="586" width="920" height="100" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  ${[
    ['Jaeger Spans', '2,840 / hr',   T.bcuze],
    ['Error Rate',   '0.12%',        T.green],
    ['P99 Latency',  '340ms',        T.text1],
    ['DB Queries',   '1,280 / min',  T.text1],
  ].map(([label, val, color], i) => {
    const x = 268 + i * 230
    return `<text x="${x}" y="622" fill="${T.text3}" font-size="11" ${FONT}>${label}</text>
    <text x="${x}" y="656" fill="${color}" font-size="20" font-weight="700" ${FONT}>${val}</text>`
  }).join('')}
`)

// ────────────────────────────────────────────────────────────────────────────

const bcuzeJobs = wrap(`
  ${chrome('bcuze · Jobs')}
  ${sidebar(T.bcuze, ['Dashboard', 'Jobs', 'Technicians', 'Clients', 'Reports'], 1)}
  ${logoText(18, 96, '⚙', 'Bcuze', T.bcuze)}

  ${pageTitle(224, 88, 'Job Management')}

  <rect x="224" y="208" width="340" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="244" y="230" fill="${T.text3}" font-size="12" ${FONT}>Search jobs…</text>
  <rect x="576" y="208" width="130" height="34" rx="8" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="641" y="229" text-anchor="middle" fill="${T.text2}" font-size="12" ${FONT}>All Status ▾</text>
  ${button(1040, 208, '+ New Job', T.bcuze)}

  ${tableHeader(224, 254, 936, [['Job ID', 0], ['Category', 120], ['Client', 310], ['Address', 490], ['Technician', 680], ['Status', 840]])}
  ${divider(224, 290, 936)}

  ${[
    ['#1042', 'HVAC Repair',    'Sunrise Towers',    '14, MG Road, Block A',       'Ravi Kumar',   'In Progress', T.bcuze],
    ['#1041', 'Plumbing',       'Green Park Apts',   '22, Park St, Flat 4B',       'Suresh Rao',   'Completed',   T.green],
    ['#1040', 'Electrical',     'Lakeside Complex',  '8, Lake View, Tower 2',      '—',            'Pending',     T.yellow],
    ['#1039', 'Carpentry',      'Hill View Res.',     '3, Hill Rd, Villa 12',      'Manoj Singh',  'Overdue',     T.red],
    ['#1038', 'Pest Control',   'The Palms Society', '88, Palm Ave, Block D',      'Deepak Nair',  'Completed',   T.green],
    ['#1037', 'AC Servicing',   'Crescent Heights',  '5, Crescent Ln, Apt 9C',    'Ravi Kumar',   'Completed',   T.green],
  ].map(([id, cat, client, addr, tech, status, sc], i) => {
    const y = 290 + i * 42
    const even = i % 2 === 0
    const shortAddr = addr.length > 24 ? addr.slice(0, 22) + '…' : addr
    return `${tableRow(224, y, 936, even, [[id, 0, T.text3, true], [cat, 120], [client, 310], [shortAddr, 490], [tech, 680], ['', 840]])}
    ${badge(1064, y + 9, status, sc, sc + '18')}`
  }).join('')}

  ${divider(224, 542, 936)}
  <text x="224" y="568" fill="${T.text3}" font-size="12" ${FONT}>Showing 6 of 1,284 jobs</text>

  <!-- Sidebar summary panel -->
  <rect x="224" y="580" width="920" height="120" rx="10" fill="${T.bg2}" stroke="${T.border}" stroke-width="1"/>
  <text x="248" y="614" fill="${T.text1}" font-size="13" font-weight="600" ${FONT}>Job #1042 — HVAC Repair at Sunrise Towers</text>
  <text x="248" y="636" fill="${T.text3}" font-size="12" ${FONT}>Assigned: Ravi Kumar  ·  Scheduled: Today 14:00  ·  Est. Duration: 3h</text>
  <text x="248" y="656" fill="${T.text3}" font-size="12" ${FONT}>Parts Required: Filter unit (x2), Refrigerant R-410A</text>
  <text x="248" y="676" fill="${T.text3}" font-size="12" ${FONT}>Notes: Customer requested callback before arrival. Building access via security desk.</text>
  ${button(1072, 594, 'Assign', T.bcuze)}
`)

// ─── Write files ──────────────────────────────────────────────────────────────

const files = [
  ['relay-devices.svg',           relayDevices],
  ['relay-kiosk.svg',             relayKiosk],
  ['relay-wallets.svg',           relayWallets],
  ['prisonbridge-call.svg',       prisonbridgeCall],
  ['prisonbridge-sessions.svg',   prisonbridgeSessions],
  ['prisonbridge-admin.svg',      prisonbridgeAdmin],
  ['bcuze-dashboard.svg',         bcuzeDashboard],
  ['bcuze-monitoring.svg',        bcuzeMonitoring],
  ['bcuze-jobs.svg',              bcuzeJobs],
]

for (const [name, svg] of files) {
  writeFileSync(join(OUT, name), svg)
  console.log(`  ✓  ${name}`)
}
console.log(`\n  ${files.length} images → public/images/projects/`)
