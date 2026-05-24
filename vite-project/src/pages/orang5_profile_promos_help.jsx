// ============================================================
//  LAPSTORE — ORANG 5
//  Interface: User Profile · Promos & Discounts · Help Center
// ============================================================
import { useState } from "react";
import { LAPTOPS, PROMOS, formatPrice } from "../shared/shared_data";
import { Icon, Stars, Badge, ProductCard, Breadcrumb } from "../shared/shared_components";

// ─── HELPER: TOGGLE (reusable) ────────────────────────────────
const Toggle = ({ on, onChange }) => (
  <button
    onClick={() => onChange(!on)}
    style={{
      width:44, height:24, borderRadius:12,
      background: on ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "#cbd5e1",
      position:"relative", cursor:"pointer", border:"none",
      transition:"background 0.25s",
      flexShrink:0
    }}
  >
    <div style={{
      position:"absolute", top:3,
      left: on ? 23 : 3,
      width:18, height:18, borderRadius:50, background:"#fff",
      boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
      transition:"left 0.25s"
    }} />
  </button>
);

// ─── STAT CARD ────────────────────────────────────────────────
const StatCard = ({ icon, value, label, color, dm }) => (
  <div style={{
    textAlign:"center", padding:"14px 10px",
    background: dm ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
    borderRadius:14, backdropFilter:"blur(4px)"
  }}>
    <div style={{ fontSize:22, marginBottom:2 }}>{icon}</div>
    <div style={{ fontSize:22, fontWeight:900, color:"#fff", lineHeight:1 }}>{value}</div>
    <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:3 }}>{label}</div>
  </div>
);

// ─── INFO ROW ─────────────────────────────────────────────────
const InfoRow = ({ label, value, editable, fieldKey, editMode, form, onChange, dm }) => (
  <div>
    <div style={{ fontSize:11, color:"#94a3b8", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>
      {label}
    </div>
    {editable && editMode ? (
      <input
        value={form[fieldKey]}
        onChange={e => onChange(fieldKey, e.target.value)}
        style={{
          width:"100%", padding:"10px 12px", borderRadius:9,
          border:`1.5px solid ${dm ? "#334155" : "#bfdbfe"}`,
          background: dm ? "#0f172a" : "#eff6ff",
          color: dm ? "#f1f5f9" : "#0f172a",
          fontSize:14, outline:"none", boxSizing:"border-box",
          transition:"border-color 0.2s"
        }}
      />
    ) : (
      <div style={{ fontSize:14, fontWeight:600, color: dm ? "#e2e8f0" : "#0f172a" }}>
        {form[fieldKey] || value}
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// ─── USER PROFILE PAGE ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
export const ProfilePage = ({ user, onNavigate, onLogout, dm }) => {
  if (!user) { onNavigate("login"); return null; }

  const [activeTab,   setActiveTab]   = useState("profile");
  const [editMode,    setEditMode]    = useState(false);
  const [saveFlash,   setSaveFlash]   = useState(false);
  const [form, setForm] = useState({
    name:  user.name,
    email: user.email,
    phone: "+62 812-3456-7890",
    city:  "Jakarta",
    bio:   "Laptop enthusiast & tech lover 🚀"
  });
  const [settings, setSettings] = useState({
    emailNotif:    true,
    orderUpdates:  true,
    promoEmails:   false,
    smsAlerts:     false,
    newsletter:    true,
    twoFactor:     false,
  });

  const updateField = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleSetting = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const handleSave = () => {
    setEditMode(false);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2500);
  };

  const stats = [
    { icon:"📦", value:"12",    label:"Orders"      },
    { icon:"❤️",  value:"7",     label:"Wishlist"    },
    { icon:"⭐",  value:"5",     label:"Reviews"     },
    { icon:"⚡",  value:"2,450", label:"Points"      },
  ];

  const recentActivity = [
    { icon:"🛒", text:"Ordered ASUS ROG Zephyrus G16",        time:"2 hari lalu",   color:"#2563eb" },
    { icon:"❤️",  text:"Ditambahkan ke Wishlist: MacBook Air M4", time:"5 hari lalu",  color:"#ef4444" },
    { icon:"⭐",  text:"Menulis ulasan untuk Lenovo ThinkPad",  time:"1 minggu lalu", color:"#f59e0b" },
    { icon:"🎁",  text:"Mendapat 500 points dari pembelian",   time:"2 minggu lalu", color:"#10b981" },
  ];

  const settingGroups = [
    {
      title:"Notifikasi",
      items:[
        { key:"emailNotif",   label:"Notifikasi Email",      desc:"Terima ringkasan aktivitas akun" },
        { key:"orderUpdates", label:"Update Pesanan",         desc:"Status pengiriman & konfirmasi" },
        { key:"promoEmails",  label:"Email Promo",            desc:"Penawaran & diskon eksklusif" },
        { key:"newsletter",   label:"Newsletter Mingguan",    desc:"Berita teknologi & laptop terbaru" },
      ]
    },
    {
      title:"Keamanan",
      items:[
        { key:"smsAlerts",  label:"SMS Alerts",          desc:"Peringatan keamanan via SMS" },
        { key:"twoFactor",  label:"Two-Factor Auth",     desc:"Keamanan login ekstra (2FA)" },
      ]
    },
  ];

  const cardBg   = dm ? "#1e293b" : "#ffffff";
  const cardBord = dm ? "#334155" : "#e2e8f0";
  const txtMain  = dm ? "#f1f5f9" : "#0f172a";
  const txtSub   = "#94a3b8";

  return (
    <div style={{ background: dm ? "#0f172a" : "#f1f5f9", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>

        <Breadcrumb items={["Home","Profile"]} onNavigate={onNavigate} dm={dm} />

        {/* ── Hero Profile Card ── */}
        <div style={{
          background:"linear-gradient(135deg,#1e3a8a 0%,#0369a1 60%,#06b6d4 100%)",
          borderRadius:22, padding:"32px 28px", marginBottom:24,
          position:"relative", overflow:"hidden",
          boxShadow:"0 20px 60px rgba(37,99,235,0.35)"
        }}>
          {/* Decorative glow */}
          <div style={{ position:"absolute", inset:0,
            background:"radial-gradient(circle at 85% 30%,rgba(6,182,212,0.25),transparent 55%)," +
                       "radial-gradient(circle at 15% 80%,rgba(99,102,241,0.2),transparent 45%)"
          }} />
          {/* Floating emoji */}
          <div style={{ position:"absolute", top:16, right:24, fontSize:64, opacity:0.07, pointerEvents:"none" }}>💻</div>

          <div style={{ position:"relative", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
            {/* Avatar */}
            <div style={{
              width:80, height:80, borderRadius:50,
              background:"linear-gradient(135deg,#38bdf8,#06b6d4)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:32, fontWeight:900, color:"#fff",
              border:"3px solid rgba(255,255,255,0.3)",
              boxShadow:"0 6px 20px rgba(0,0,0,0.25)", flexShrink:0
            }}>
              {user.name[0].toUpperCase()}
            </div>
            <div style={{ flex:1 }}>
              <h2 style={{ color:"#fff", fontSize:22, fontWeight:900, marginBottom:4 }}>{user.name}</h2>
              <p style={{ color:"#93c5fd", fontSize:13, marginBottom:8 }}>{user.email}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ background:"rgba(255,255,255,0.15)", color:"#e0f2fe", fontSize:11, padding:"3px 12px", borderRadius:20, fontWeight:700, backdropFilter:"blur(4px)" }}>
                  🏆 Gold Member
                </span>
                <span style={{ background:"rgba(16,185,129,0.2)", color:"#6ee7b7", fontSize:11, padding:"3px 12px", borderRadius:20, fontWeight:700 }}>
                  ✓ Verified
                </span>
              </div>
            </div>
            <button
              onClick={() => { onLogout(); onNavigate("home"); }}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"8px 16px",
                borderRadius:10, border:"1.5px solid rgba(255,255,255,0.25)",
                background:"rgba(239,68,68,0.15)", color:"#fca5a5",
                fontSize:13, fontWeight:700, cursor:"pointer",
                backdropFilter:"blur(4px)", flexShrink:0
              }}
            >
              <Icon name="logout" size={14} /> Sign Out
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:12, marginTop:24, position:"relative"
          }}>
            {stats.map(s => <StatCard key={s.label} {...s} dm={dm} />)}
          </div>
        </div>

        {/* ── Save flash ── */}
        {saveFlash && (
          <div style={{
            background:"linear-gradient(135deg,#10b981,#059669)",
            color:"#fff", borderRadius:12, padding:"12px 20px",
            marginBottom:16, display:"flex", alignItems:"center", gap:10,
            fontWeight:700, fontSize:14, animation:"none"
          }}>
            <Icon name="check" size={18} /> Perubahan berhasil disimpan!
          </div>
        )}

        {/* ── Tabs ── */}
        <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
          {[
            { key:"profile",  label:"👤 Profil"    },
            { key:"activity", label:"⚡ Aktivitas"  },
            { key:"settings", label:"⚙️ Pengaturan" },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding:"9px 20px", borderRadius:10,
                border:`1.5px solid ${activeTab === t.key ? "#2563eb" : cardBord}`,
                background: activeTab === t.key
                  ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                  : cardBg,
                color: activeTab === t.key ? "#fff" : txtSub,
                fontSize:13, fontWeight:700, cursor:"pointer",
                transition:"all 0.2s"
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* ── TAB: PROFILE ── */}
        {activeTab === "profile" && (
          <div style={{ background:cardBg, borderRadius:18, padding:28, border:`1px solid ${cardBord}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:txtMain }}>Informasi Pribadi</h3>
              <button
                onClick={() => editMode ? handleSave() : setEditMode(true)}
                style={{
                  display:"flex", alignItems:"center", gap:6, padding:"8px 18px",
                  borderRadius:9,
                  border:`1.5px solid ${editMode ? "#10b981" : cardBord}`,
                  background: editMode ? "linear-gradient(135deg,#10b981,#059669)" : "none",
                  color: editMode ? "#fff" : txtSub,
                  fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s"
                }}
              >
                {editMode ? <><Icon name="check" size={14} /> Simpan</> : <><Icon name="edit" size={14} /> Edit</>}
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[
                ["Nama Lengkap", "name"],
                ["Email",        "email"],
                ["Nomor HP",     "phone"],
                ["Kota",         "city"],
              ].map(([label, key]) => (
                <InfoRow
                  key={key}
                  label={label} fieldKey={key}
                  form={form} onChange={updateField}
                  editable editMode={editMode} dm={dm}
                />
              ))}
            </div>

            {/* Bio */}
            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:11, color:txtSub, marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Bio</div>
              {editMode ? (
                <textarea
                  value={form.bio}
                  onChange={e => updateField("bio", e.target.value)}
                  rows={2}
                  style={{
                    width:"100%", padding:"10px 12px", borderRadius:9,
                    border:`1.5px solid ${dm ? "#334155" : "#bfdbfe"}`,
                    background: dm ? "#0f172a" : "#eff6ff",
                    color: dm ? "#f1f5f9" : "#0f172a",
                    fontSize:14, outline:"none", resize:"vertical", boxSizing:"border-box"
                  }}
                />
              ) : (
                <div style={{ fontSize:14, fontWeight:600, color:txtMain }}>{form.bio}</div>
              )}
            </div>

            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                style={{
                  marginTop:16, background:"none", border:`1px solid ${cardBord}`,
                  color:txtSub, borderRadius:9, padding:"8px 18px",
                  fontSize:13, fontWeight:600, cursor:"pointer"
                }}
              >Batal</button>
            )}

            {/* Quick links */}
            <div style={{
              marginTop:28, paddingTop:24,
              borderTop:`1px solid ${dm ? "#334155" : "#f1f5f9"}`,
              display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12
            }}>
              {[
                { icon:"📦", label:"Riwayat Pesanan",  page:"orders"   },
                { icon:"❤️",  label:"Wishlist Saya",    page:"wishlist" },
                { icon:"🏷️",  label:"Promo & Diskon",   page:"promos"   },
                { icon:"🛒",  label:"Keranjang",         page:"cart"     },
              ].map(q => (
                <button
                  key={q.page}
                  onClick={() => onNavigate(q.page)}
                  style={{
                    display:"flex", alignItems:"center", gap:10, padding:"12px 14px",
                    borderRadius:12, border:`1.5px solid ${cardBord}`,
                    background: dm ? "#0f172a" : "#f8fafc",
                    color:txtMain, fontSize:13, fontWeight:600, cursor:"pointer",
                    transition:"all 0.2s"
                  }}
                >
                  <span style={{ fontSize:18 }}>{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: ACTIVITY ── */}
        {activeTab === "activity" && (
          <div style={{ background:cardBg, borderRadius:18, padding:28, border:`1px solid ${cardBord}` }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:txtMain, marginBottom:6 }}>Aktivitas Terbaru</h3>
            <p style={{ fontSize:13, color:txtSub, marginBottom:24 }}>Histori aktivitas akun kamu</p>

            {/* Points banner */}
            <div style={{
              background:"linear-gradient(135deg,#fef3c7,#fde68a)",
              border:"1px solid #fbbf24", borderRadius:14,
              padding:"14px 20px", marginBottom:24,
              display:"flex", alignItems:"center", gap:14
            }}>
              <span style={{ fontSize:32 }}>⚡</span>
              <div>
                <div style={{ fontWeight:800, fontSize:15, color:"#92400e" }}>2,450 LapPoints</div>
                <div style={{ fontSize:12, color:"#b45309", marginTop:2 }}>
                  Kumpulkan 550 poin lagi untuk naik ke Platinum!
                </div>
              </div>
              <div style={{ marginLeft:"auto" }}>
                <div style={{
                  height:8, width:160, background:"#fcd34d", borderRadius:4, overflow:"hidden"
                }}>
                  <div style={{ width:"82%", height:"100%", background:"linear-gradient(90deg,#f59e0b,#d97706)", borderRadius:4 }} />
                </div>
                <div style={{ fontSize:11, color:"#92400e", marginTop:4, textAlign:"right" }}>82% ke Platinum</div>
              </div>
            </div>

            {/* Activity list */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                    borderRadius:12, background: dm ? "#0f172a" : "#f8fafc",
                    border:`1px solid ${cardBord}`
                  }}
                >
                  <div style={{
                    width:42, height:42, borderRadius:12, fontSize:20,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: dm ? "#1e293b" : "#fff",
                    border:`1px solid ${cardBord}`, flexShrink:0
                  }}>{a.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:txtMain }}>{a.text}</div>
                    <div style={{ fontSize:11, color:txtSub, marginTop:2 }}>{a.time}</div>
                  </div>
                  <div style={{
                    width:8, height:8, borderRadius:50,
                    background: a.color, flexShrink:0
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: SETTINGS ── */}
        {activeTab === "settings" && (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {settingGroups.map(group => (
              <div key={group.title} style={{ background:cardBg, borderRadius:18, padding:28, border:`1px solid ${cardBord}` }}>
                <h3 style={{ fontSize:15, fontWeight:800, color:txtMain, marginBottom:20 }}>{group.title}</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                  {group.items.map((item, i) => (
                    <div
                      key={item.key}
                      style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"14px 0",
                        borderBottom: i < group.items.length - 1 ? `1px solid ${dm ? "#1e293b" : "#f1f5f9"}` : "none"
                      }}
                    >
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:txtMain }}>{item.label}</div>
                        <div style={{ fontSize:12, color:txtSub, marginTop:2 }}>{item.desc}</div>
                      </div>
                      <Toggle on={settings[item.key]} onChange={() => toggleSetting(item.key)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Danger zone */}
            <div style={{ background:cardBg, borderRadius:18, padding:28, border:`1.5px solid #fee2e2` }}>
              <h3 style={{ fontSize:15, fontWeight:800, color:"#dc2626", marginBottom:16 }}>Zona Berbahaya</h3>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button style={{
                  padding:"10px 20px", borderRadius:10,
                  border:"1.5px solid #fee2e2", background:"none",
                  color:"#dc2626", fontSize:13, fontWeight:700, cursor:"pointer"
                }}>🗑️ Hapus Akun</button>
                <button
                  onClick={() => { onLogout(); onNavigate("home"); }}
                  style={{
                    display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
                    borderRadius:10, border:"1.5px solid #fee2e2",
                    background:"linear-gradient(135deg,#ef4444,#dc2626)",
                    color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer"
                  }}
                >
                  <Icon name="logout" size={15} /> Keluar dari Akun
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── PROMOS & DISCOUNTS PAGE ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════

const PROMO_DETAILS = [
  {
    id:1, title:"Ramadan Tech Sale", discount:"Up to 30% OFF",
    desc:"Laptop premium dengan harga terbaik. Stok terbatas!",
    longDesc:"Rayakan Ramadan dengan upgrade laptop impianmu. Dapatkan diskon hingga 30% untuk semua merek pilihan.",
    gradA:"#1d4ed8", gradB:"#0891b2",
    emoji:"🌙", expires:"10 Juni 2026", code:"RAMADAN30",
    tags:["Gaming","Ultrabook","Business"], minSpend:"Rp 5.000.000"
  },
  {
    id:2, title:"Student Special", discount:"Extra 10% OFF",
    desc:"Tunjukkan kartu pelajar/mahasiswamu dan hemat lebih banyak.",
    longDesc:"Khusus pelajar & mahasiswa aktif. Berlaku untuk semua laptop kategori Student & Business.",
    gradA:"#7c3aed", gradB:"#9333ea",
    emoji:"🎓", expires:"31 Juli 2026", code:"STUDENT10",
    tags:["Business","Ultrabook","Creator"], minSpend:"Rp 3.000.000"
  },
  {
    id:3, title:"Flash Friday Deal", discount:"Up to 40% OFF",
    desc:"Setiap Jumat pukul 12:00–15:00 WIB. Jangan sampai terlewat!",
    longDesc:"Flash sale mingguan dengan diskon terbesar. Set alarm-mu dan dapatkan laptop idaman!",
    gradA:"#ea580c", gradB:"#dc2626",
    emoji:"⚡", expires:"Setiap Jumat", code:"FLASH40",
    tags:["Gaming","All"], minSpend:"-"
  },
  {
    id:4, title:"New Member Bonus", discount:"Rp 250.000 OFF",
    desc:"Sambutan spesial untuk anggota baru LapStore.",
    longDesc:"Daftar sekarang dan nikmati voucher Rp 250.000 untuk pembelian pertamamu.",
    gradA:"#059669", gradB:"#10b981",
    emoji:"🎁", expires:"Berlaku selamanya", code:"NEWMEMBER",
    tags:["All"], minSpend:"Rp 10.000.000"
  },
];

const PromoCard = ({ promo, onNavigate, dm }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(promo.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      borderRadius:22, overflow:"hidden",
      boxShadow:"0 12px 40px rgba(0,0,0,0.15)",
      position:"relative"
    }}>
      {/* Gradient top half */}
      <div style={{
        background:`linear-gradient(135deg,${promo.gradA},${promo.gradB})`,
        padding:"26px 28px 20px", position:"relative", overflow:"hidden"
      }}>
        {/* Decorative circles */}
        <div style={{
          position:"absolute", top:-30, right:-30,
          width:130, height:130, borderRadius:50,
          background:"rgba(255,255,255,0.07)"
        }} />
        <div style={{
          position:"absolute", bottom:-20, left:20,
          width:80, height:80, borderRadius:50,
          background:"rgba(255,255,255,0.05)"
        }} />

        <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:38, marginBottom:6, lineHeight:1 }}>{promo.emoji}</div>
            <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:4 }}>
              {promo.discount}
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:"rgba(255,255,255,0.9)" }}>
              {promo.title}
            </div>
          </div>
          {/* Code badge */}
          <div style={{
            background:"rgba(255,255,255,0.15)",
            border:"1.5px dashed rgba(255,255,255,0.4)",
            borderRadius:12, padding:"8px 14px", textAlign:"center",
            backdropFilter:"blur(6px)", flexShrink:0
          }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", fontWeight:700, letterSpacing:"0.1em", marginBottom:3 }}>KODE PROMO</div>
            <div style={{ fontSize:15, fontWeight:900, color:"#fff", letterSpacing:"0.12em" }}>{promo.code}</div>
          </div>
        </div>

        <p style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:10, lineHeight:1.6, position:"relative" }}>
          {promo.longDesc}
        </p>

        {/* Tags */}
        <div style={{ display:"flex", gap:6, marginTop:12, position:"relative", flexWrap:"wrap" }}>
          {promo.tags.map(t => (
            <span key={t} style={{
              background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.9)",
              fontSize:11, padding:"3px 10px", borderRadius:20, fontWeight:600,
              backdropFilter:"blur(4px)"
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div style={{
        background: dm ? "#1e293b" : "#fff",
        padding:"18px 28px",
        borderTop:"none"
      }}>
        <div style={{ display:"flex", gap:16, marginBottom:16, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:10, color:"#94a3b8", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>Berlaku hingga</div>
            <div style={{ fontSize:13, fontWeight:700, color: dm ? "#e2e8f0" : "#0f172a" }}>📅 {promo.expires}</div>
          </div>
          <div>
            <div style={{ fontSize:10, color:"#94a3b8", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>Min. Pembelian</div>
            <div style={{ fontSize:13, fontWeight:700, color: dm ? "#e2e8f0" : "#0f172a" }}>💳 {promo.minSpend}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button
            onClick={handleCopy}
            style={{
              flex:1, padding:"10px", borderRadius:10,
              border:`1.5px dashed ${copied ? "#10b981" : "#94a3b8"}`,
              background: copied ? (dm ? "rgba(16,185,129,0.1)" : "#f0fdf4") : "none",
              color: copied ? "#10b981" : "#94a3b8",
              fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s"
            }}
          >
            {copied ? "✓ Tersalin!" : `📋 ${promo.code}`}
          </button>
          <button
            onClick={() => onNavigate("catalog")}
            style={{
              flex:2, padding:"10px", borderRadius:10,
              background:`linear-gradient(135deg,${promo.gradA},${promo.gradB})`,
              color:"#fff", border:"none",
              fontSize:13, fontWeight:700, cursor:"pointer"
            }}
          >Belanja Sekarang →</button>
        </div>
      </div>
    </div>
  );
};

export const PromosPage = ({ onNavigate, onAddToCart, onWishlist, wishlist, dm }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All","Gaming","Business","Ultrabook","Creator"];

  const flashSaleItems = LAPTOPS.filter(l =>
    l.badge === "Flash Sale" || l.badge === "Best Seller"
  ).slice(0, 4);

  const cardBg   = dm ? "#1e293b" : "#ffffff";
  const cardBord = dm ? "#334155" : "#e2e8f0";
  const txtMain  = dm ? "#f1f5f9" : "#0f172a";

  return (
    <div style={{ background: dm ? "#0f172a" : "#f1f5f9", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        <Breadcrumb items={["Home","Promos"]} onNavigate={onNavigate} dm={dm} />

        {/* ── Header ── */}
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:28, fontWeight:900, color:txtMain, marginBottom:6 }}>
            🏷️ Promo & Diskon
          </h1>
          <p style={{ fontSize:14, color:"#94a3b8" }}>
            Penawaran eksklusif & hemat lebih banyak dengan kode spesial kami
          </p>
        </div>

        {/* ── Countdown Banner ── */}
        <div style={{
          background:"linear-gradient(135deg,#1e3a8a,#0369a1)",
          borderRadius:18, padding:"20px 28px", marginBottom:32,
          display:"flex", alignItems:"center", gap:20, flexWrap:"wrap",
          position:"relative", overflow:"hidden",
          boxShadow:"0 8px 32px rgba(37,99,235,0.3)"
        }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 80% 50%,rgba(6,182,212,0.2),transparent 60%)" }} />
          <div style={{ position:"relative" }}>
            <div style={{ fontSize:13, color:"#93c5fd", fontWeight:700, marginBottom:4 }}>⚡ FLASH FRIDAY AKTIF</div>
            <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>Berakhir dalam</div>
          </div>
          {/* Countdown blocks */}
          {[["02","JAM"],["47","MENIT"],["33","DETIK"]].map(([n, l]) => (
            <div key={l} style={{
              background:"rgba(255,255,255,0.12)", borderRadius:12,
              padding:"10px 18px", textAlign:"center", backdropFilter:"blur(4px)",
              position:"relative"
            }}>
              <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:10, color:"#93c5fd", fontWeight:700, letterSpacing:"0.1em" }}>{l}</div>
            </div>
          ))}
          <button
            onClick={() => onNavigate("catalog")}
            style={{
              marginLeft:"auto", position:"relative",
              background:"rgba(255,255,255,0.9)", color:"#1e3a8a",
              border:"none", borderRadius:12, padding:"12px 24px",
              fontSize:14, fontWeight:800, cursor:"pointer",
              boxShadow:"0 4px 16px rgba(0,0,0,0.2)"
            }}
          >Klaim Sekarang →</button>
        </div>

        {/* ── Promo Cards Grid ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(440px,1fr))",
          gap:24, marginBottom:48
        }}>
          {PROMO_DETAILS.map(p => (
            <PromoCard key={p.id} promo={p} onNavigate={onNavigate} dm={dm} />
          ))}
        </div>

        {/* ── Flash Sale Products ── */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:12 }}>
            <div>
              <h2 style={{ fontSize:22, fontWeight:800, color:txtMain, marginBottom:4 }}>
                ⚡ Produk Flash Sale
              </h2>
              <p style={{ fontSize:13, color:"#94a3b8" }}>Stok terbatas — segera dapatkan sebelum kehabisan</p>
            </div>
            {/* Category filter */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  style={{
                    padding:"6px 14px", borderRadius:8, border:"none",
                    background: activeFilter === c
                      ? "linear-gradient(135deg,#ef4444,#f97316)"
                      : (dm ? "#1e293b" : "#e2e8f0"),
                    color: activeFilter === c ? "#fff" : (dm ? "#94a3b8" : "#475569"),
                    fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s"
                  }}
                >{c}</button>
              ))}
            </div>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",
            gap:20
          }}>
            {flashSaleItems.map(l => (
              <ProductCard
                key={l.id} laptop={l}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>
        </div>

        {/* ── Loyalty program teaser ── */}
        <div style={{
          marginTop:48,
          background: dm ? "#1e293b" : "#fff",
          borderRadius:18, padding:"28px 32px",
          border:`1px solid ${cardBord}`,
          display:"flex", alignItems:"center", gap:24, flexWrap:"wrap"
        }}>
          <div style={{ fontSize:48 }}>🏆</div>
          <div style={{ flex:1 }}>
            <h3 style={{ fontSize:18, fontWeight:800, color:txtMain, marginBottom:6 }}>
              Program LapPoints
            </h3>
            <p style={{ fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>
              Setiap pembelian menghasilkan poin. Tukarkan poinmu dengan diskon eksklusif, produk gratis, dan hadiah spesial!
            </p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            style={{
              padding:"12px 28px", borderRadius:12,
              background:"linear-gradient(135deg,#f59e0b,#d97706)",
              color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer",
              boxShadow:"0 4px 16px rgba(245,158,11,0.4)", flexShrink:0
            }}
          >Cek Poinku →</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ─── HELP CENTER PAGE ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

const FAQ_DATA = [
  {
    category:"Pesanan",
    emoji:"📦",
    color:"#2563eb",
    items:[
      { q:"Bagaimana cara melacak pesanan saya?", a:"Buka menu 'Riwayat Pesanan' di profil kamu. Di sana kamu bisa melihat status pengiriman secara real-time untuk setiap pesanan. Kami juga mengirimkan update via email & SMS." },
      { q:"Bisakah saya membatalkan pesanan?", a:"Pesanan dapat dibatalkan dalam 1 jam setelah dikonfirmasi. Hubungi kami melalui Live Chat atau telepon segera setelah ingin membatalkan." },
      { q:"Berapa lama estimasi pengiriman?", a:"Jakarta: 1–2 hari kerja. Pulau Jawa: 2–3 hari. Luar Jawa: 3–5 hari kerja. Layanan ekspres tersedia untuk Jakarta & sekitarnya." },
    ]
  },
  {
    category:"Pembayaran",
    emoji:"💳",
    color:"#10b981",
    items:[
      { q:"Metode pembayaran apa yang diterima?", a:"Kami menerima transfer bank, virtual account, kartu kredit/debit (Visa, Mastercard, Amex), GoPay, OVO, DANA, ShopeePay, dan cicilan 0% via kartu kredit partner." },
      { q:"Bagaimana cara menggunakan kode promo?", a:"Masukkan kode promo di halaman keranjang belanja sebelum checkout. Diskon akan otomatis teraplikasi. Satu pesanan hanya bisa menggunakan satu kode promo." },
      { q:"Apakah cicilan tersedia?", a:"Ya! Cicilan 0% tersedia untuk kartu kredit BCA, Mandiri, BRI, BNI, CIMB, dan Danamon. Tenor 3–24 bulan dengan minimum transaksi Rp 5.000.000." },
    ]
  },
  {
    category:"Produk & Garansi",
    emoji:"🛡️",
    color:"#7c3aed",
    items:[
      { q:"Apakah semua produk original?", a:"100% ya! Semua laptop yang kami jual adalah produk resmi dengan garansi resmi dari brand. Kami adalah mitra resmi ASUS, Lenovo, Apple, HP, Dell, dan merek lainnya." },
      { q:"Apa kebijakan garansi produk?", a:"Semua laptop dilengkapi garansi resmi minimal 1 tahun dari brand. Kami juga menawarkan extended warranty plan hingga 3 tahun. Klaim garansi bisa dilakukan di service center resmi atau melalui kami." },
      { q:"Apa kebijakan retur/pengembalian?", a:"Produk dapat dikembalikan dalam 14 hari jika terdapat cacat produksi atau tidak sesuai deskripsi. Kondisi harus masih tersegel/original. Biaya pengiriman retur ditanggung LapStore." },
    ]
  },
  {
    category:"Akun & Keamanan",
    emoji:"🔐",
    color:"#f59e0b",
    items:[
      { q:"Bagaimana cara mereset password?", a:"Klik 'Lupa Password' di halaman login, masukkan email terdaftarmu, dan kami akan mengirimkan link reset password dalam 1–2 menit." },
      { q:"Apakah data saya aman?", a:"Kami menggunakan enkripsi SSL 256-bit untuk semua transaksi. Data pribadimu tidak pernah dijual ke pihak ketiga. Kami sepenuhnya mematuhi regulasi perlindungan data Indonesia." },
    ]
  },
];

const CONTACT_CHANNELS = [
  { icon:"message", label:"Live Chat",    desc:"Respons dalam < 2 menit",   action:"Mulai Chat",  badge:"Online", color:"#2563eb", gradA:"#2563eb", gradB:"#3b82f6" },
  { icon:"phone",   label:"Telepon",      desc:"+62 21-1234-5678\n08:00–21:00 WIB",  action:"Hubungi",     badge:null,     color:"#10b981", gradA:"#10b981", gradB:"#059669" },
  { icon:"mail",    label:"Email",        desc:"support@lapstore.id\nBalas 1–4 jam",   action:"Kirim Email", badge:null,     color:"#7c3aed", gradA:"#7c3aed", gradB:"#6d28d9" },
  { icon:"globe",   label:"WhatsApp",     desc:"Chat langsung via WA",       action:"Chat WA",     badge:"24/7",   color:"#f59e0b", gradA:"#16a34a", gradB:"#15803d" },
];

export const HelpPage = ({ onNavigate, dm }) => {
  const [openFaq,        setOpenFaq]        = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");

  const allCategories = ["All", ...FAQ_DATA.map(g => g.category)];

  const filteredGroups = FAQ_DATA.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group =>
    (activeCategory === "All" || group.category === activeCategory) &&
    group.items.length > 0
  );

  const cardBg   = dm ? "#1e293b" : "#ffffff";
  const cardBord = dm ? "#334155" : "#e2e8f0";
  const txtMain  = dm ? "#f1f5f9" : "#0f172a";
  const pageBg   = dm ? "#0f172a" : "#f1f5f9";

  return (
    <div style={{ background:pageBg, minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:880, margin:"0 auto" }}>

        <Breadcrumb items={["Home","Help Center"]} onNavigate={onNavigate} dm={dm} />

        {/* ── Hero ── */}
        <div style={{
          textAlign:"center", marginBottom:40,
          padding:"40px 20px 32px"
        }}>
          <div style={{ fontSize:56, marginBottom:12, lineHeight:1 }}>🛟</div>
          <h1 style={{ fontSize:30, fontWeight:900, color:txtMain, marginBottom:10 }}>
            Pusat Bantuan
          </h1>
          <p style={{ fontSize:15, color:"#94a3b8", maxWidth:520, margin:"0 auto 24px", lineHeight:1.7 }}>
            Ada pertanyaan? Kami siap membantu! Cari jawaban di bawah atau hubungi tim kami langsung.
          </p>
          {/* Search */}
          <div style={{
            maxWidth:480, margin:"0 auto", position:"relative"
          }}>
            <Icon name="search" size={18} className="" style={{
              position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"#94a3b8"
            }} />
            <span style={{
              position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"#94a3b8",
              pointerEvents:"none"
            }}>
              <Icon name="search" size={18} />
            </span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              style={{
                width:"100%", padding:"13px 20px 13px 48px",
                borderRadius:14,
                border:`1.5px solid ${dm ? "#334155" : "#e2e8f0"}`,
                background: dm ? "#1e293b" : "#fff",
                color: txtMain, fontSize:14, outline:"none",
                boxSizing:"border-box",
                boxShadow:"0 4px 16px rgba(0,0,0,0.06)"
              }}
            />
          </div>
        </div>

        {/* ── Contact Channels ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",
          gap:16, marginBottom:48
        }}>
          {CONTACT_CHANNELS.map(ch => (
            <div
              key={ch.label}
              style={{
                background:cardBg, borderRadius:18,
                border:`1px solid ${cardBord}`,
                padding:"22px 20px", textAlign:"center",
                boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                position:"relative", overflow:"hidden",
                transition:"transform 0.2s, box-shadow 0.2s"
              }}
            >
              {ch.badge && (
                <div style={{
                  position:"absolute", top:12, right:12,
                  background: ch.badge === "Online" ? "#dcfce7" : "#fef3c7",
                  color: ch.badge === "Online" ? "#166534" : "#92400e",
                  fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:20
                }}>{ch.badge}</div>
              )}
              <div style={{
                width:52, height:52, borderRadius:14,
                background:`linear-gradient(135deg,${ch.gradA},${ch.gradB})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 14px", color:"#fff"
              }}>
                <Icon name={ch.icon} size={22} />
              </div>
              <div style={{ fontWeight:800, fontSize:15, color:txtMain, marginBottom:6 }}>{ch.label}</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginBottom:16, lineHeight:1.6, whiteSpace:"pre-line" }}>
                {ch.desc}
              </div>
              <button style={{
                background:`linear-gradient(135deg,${ch.gradA},${ch.gradB})`,
                color:"#fff", border:"none", borderRadius:10,
                padding:"8px 20px", fontSize:12, fontWeight:700, cursor:"pointer",
                width:"100%"
              }}>{ch.action}</button>
            </div>
          ))}
        </div>

        {/* ── FAQ Section ── */}
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, color:txtMain, marginBottom:6 }}>
            Pertanyaan Umum (FAQ)
          </h2>
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>
            {filteredGroups.reduce((a, g) => a + g.items.length, 0)} pertanyaan ditemukan
          </p>

          {/* Category tabs */}
          <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding:"7px 16px", borderRadius:20,
                  border:"none",
                  background: activeCategory === cat
                    ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                    : (dm ? "#1e293b" : "#e2e8f0"),
                  color: activeCategory === cat ? "#fff" : (dm ? "#94a3b8" : "#475569"),
                  fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s"
                }}
              >{cat}</button>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div style={{
              textAlign:"center", padding:"48px 20px",
              background:cardBg, borderRadius:18, border:`1px solid ${cardBord}`
            }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <p style={{ color:"#94a3b8", fontSize:15 }}>
                Tidak ada hasil untuk "{searchQuery}". Coba kata kunci lain atau hubungi kami langsung.
              </p>
            </div>
          )}

          {filteredGroups.map(group => (
            <div key={group.category} style={{ marginBottom:32 }}>
              {/* Group header */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{
                  width:36, height:36, borderRadius:10,
                  background: dm ? "#1e293b" : "#f1f5f9",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18
                }}>{group.emoji}</div>
                <span style={{ fontSize:15, fontWeight:800, color: group.color }}>{group.category}</span>
                <span style={{
                  background: dm ? "#1e293b" : "#f1f5f9",
                  color:"#94a3b8", fontSize:11, fontWeight:700,
                  padding:"2px 8px", borderRadius:20
                }}>{group.items.length}</span>
              </div>

              {/* FAQ Items */}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {group.items.map((item, i) => {
                  const key = `${group.category}-${i}`;
                  const isOpen = openFaq === key;
                  return (
                    <div
                      key={i}
                      style={{
                        background:cardBg, borderRadius:14,
                        border:`1.5px solid ${isOpen ? group.color : cardBord}`,
                        overflow:"hidden", transition:"border-color 0.2s"
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : key)}
                        style={{
                          width:"100%", display:"flex", justifyContent:"space-between",
                          alignItems:"center", padding:"16px 20px",
                          background:"none", border:"none", cursor:"pointer", textAlign:"left",
                          gap:12
                        }}
                      >
                        <span style={{ fontSize:14, fontWeight:700, color:txtMain, lineHeight:1.4 }}>
                          {searchQuery ? (
                            item.q.replace(
                              new RegExp(searchQuery, "gi"),
                              m => `<mark style="background:#fef08a;border-radius:3px">${m}</mark>`
                            )
                          ) : item.q}
                        </span>
                        <span style={{
                          fontSize:20, color:"#94a3b8", flexShrink:0,
                          transition:"transform 0.25s",
                          transform: isOpen ? "rotate(45deg)" : "none",
                          fontWeight:300
                        }}>+</span>
                      </button>
                      {isOpen && (
                        <div style={{
                          padding:"0 20px 18px",
                          fontSize:13, color:"#94a3b8", lineHeight:1.75,
                          borderTop:`1px solid ${dm ? "#334155" : "#f1f5f9"}`
                        }}>
                          <div style={{ paddingTop:12 }}>{item.a}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Still need help ── */}
        <div style={{
          marginTop:48, borderRadius:20,
          background:"linear-gradient(135deg,#1e3a8a,#0369a1)",
          padding:"32px 28px", textAlign:"center",
          position:"relative", overflow:"hidden"
        }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 80% 50%,rgba(6,182,212,0.2),transparent 60%)" }} />
          <div style={{ position:"relative" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>💬</div>
            <h3 style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:8 }}>
              Masih butuh bantuan?
            </h3>
            <p style={{ fontSize:14, color:"#93c5fd", marginBottom:20, lineHeight:1.6 }}>
              Tim support kami siap membantu kamu 24/7. Jangan ragu untuk menghubungi kami!
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button style={{
                padding:"11px 28px", borderRadius:12,
                background:"rgba(255,255,255,0.15)", color:"#fff",
                border:"1.5px solid rgba(255,255,255,0.3)",
                fontSize:14, fontWeight:700, cursor:"pointer",
                backdropFilter:"blur(6px)"
              }}>💬 Live Chat</button>
              <button style={{
                padding:"11px 28px", borderRadius:12,
                background:"rgba(255,255,255,0.9)", color:"#1e3a8a",
                border:"none",
                fontSize:14, fontWeight:700, cursor:"pointer",
                boxShadow:"0 4px 16px rgba(0,0,0,0.15)"
              }}>📧 Kirim Email</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
