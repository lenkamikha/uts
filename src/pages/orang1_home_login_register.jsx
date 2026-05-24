// ============================================================
//  SALEEM.ID — ORANG 1
//  Interface: Home Page · Login Page · Register Page
// ============================================================
import { useState, useEffect } from "react";
import { LAPTOPS, PROMOS, BRANDS, CATEGORIES, formatPrice } from "../shared/shared_data";
import { Icon, Stars, Badge, ProductCard, Navbar, Footer, AuthInput, SectionTitle } from "../shared/shared_components";

// ─── HOME PAGE ───────────────────────────────────────────────
export const HomePage = ({ onNavigate, onAddToCart, onWishlist, wishlist, dm }) => {
  const [flashIdx, setFlashIdx] = useState(0);
  const featured   = LAPTOPS.slice(0, 4);
  const newArrivals = LAPTOPS.slice(4, 8);
  const heroBrands  = ["ASUS","Lenovo","Apple","HP","Dell","Razer","MSI","Samsung","Microsoft"];

  useEffect(() => {
    const t = setInterval(() => setFlashIdx(i => (i + 1) % PROMOS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: dm ? "#0f172a" : "#f8fafc", minHeight: "100vh" }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#0369a1 100%)",
        padding: "72px 20px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        {/* decorative glow */}
        <div style={{ position:"absolute", inset:0, backgroundImage:
          "radial-gradient(circle at 18% 75%,rgba(59,130,246,.18) 0%,transparent 50%)," +
          "radial-gradient(circle at 82% 20%,rgba(6,182,212,.18) 0%,transparent 50%)" }} />
        {/* floating laptop silhouettes */}
        <div style={{ position:"absolute", top:20, left:"5%", fontSize:80, opacity:.06, transform:"rotate(-15deg)" }}>💻</div>
        <div style={{ position:"absolute", bottom:20, right:"6%", fontSize:60, opacity:.06, transform:"rotate(12deg)" }}>🖥️</div>

        <div style={{ maxWidth:720, margin:"0 auto", position:"relative" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.10)",
            borderRadius:20, padding:"6px 18px", marginBottom:24, backdropFilter:"blur(8px)"
          }}>
            <span style={{ fontSize:14 }}>⚡</span>
            <span style={{ color:"#e0f2fe", fontSize:13, fontWeight:600 }}>Flash Sale Aktif – Hemat hingga 40%</span>
          </div>

          <h1 style={{
            fontSize:"clamp(2rem,5.5vw,3.6rem)", fontWeight:900, color:"#fff",
            lineHeight:1.15, marginBottom:18
          }}>
            Temukan Laptop<br />
            <span style={{ background:"linear-gradient(135deg,#38bdf8,#06b6d4)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Impianmu
            </span>
            {" "}di Saleem.id
          </h1>

          <p style={{ color:"#94a3b8", fontSize:17, marginBottom:36, lineHeight:1.75 }}>
            Laptop 2025 terbaru dari brand ternama. Garansi resmi, pengiriman cepat,
            harga terbaik se-Indonesia.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => onNavigate("catalog")} style={{
              background:"linear-gradient(135deg,#2563eb,#06b6d4)", color:"#fff",
              border:"none", borderRadius:14, padding:"15px 36px", fontSize:15,
              fontWeight:700, cursor:"pointer", boxShadow:"0 8px 28px rgba(37,99,235,.45)"
            }}>
              Belanja Sekarang →
            </button>
            <button onClick={() => onNavigate("promos")} style={{
              background:"rgba(255,255,255,.10)", color:"#e0f2fe",
              border:"1.5px solid rgba(255,255,255,.22)", borderRadius:14,
              padding:"15px 36px", fontSize:15, fontWeight:700,
              cursor:"pointer", backdropFilter:"blur(8px)"
            }}>
              Lihat Promo
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display:"flex", justifyContent:"center", gap:32, marginTop:48, flexWrap:"wrap"
          }}>
            {[["50K+","Pelanggan Puas"],["99%","Produk Original"],["2Jam","Estimasi Pengiriman"],["4.9★","Rating Toko"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, fontWeight:900, color:"#38bdf8" }}>{v}</div>
                <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Flash ticker ── */}
      <div style={{
        background:"linear-gradient(135deg,#ef4444,#f97316)",
        padding:"11px 20px", textAlign:"center"
      }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:14 }}>
          ⚡ {PROMOS[flashIdx].title} — {PROMOS[flashIdx].discount} · Kode:{" "}
          <code style={{ background:"rgba(255,255,255,.2)", padding:"1px 10px", borderRadius:5 }}>
            {PROMOS[flashIdx].code}
          </code>
        </span>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 20px" }}>

        {/* ── Brand pills ── */}
        <SectionTitle title="Belanja Berdasarkan Brand" sub="Brand ternama, keaslian terjamin" dm={dm} />
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }}>
          {heroBrands.map(b => (
            <button key={b} onClick={() => onNavigate("category", { brand:b })} style={{
              padding:"10px 22px", borderRadius:24, fontWeight:700, fontSize:13,
              cursor:"pointer", transition:"all .2s",
              border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
              background:dm?"#1e293b":"#fff", color:dm?"#e2e8f0":"#374151"
            }}>
              {b}
            </button>
          ))}
        </div>

        {/* ── Category cards ── */}
        <SectionTitle title="Kategori Produk" sub="Cari laptop sesuai kebutuhanmu" dm={dm} />
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",
          gap:14, marginBottom:52
        }}>
          {[
            { cat:"Gaming",    emoji:"🎮", color:"#ef4444" },
            { cat:"Business",  emoji:"💼", color:"#3b82f6" },
            { cat:"Ultrabook", emoji:"💻", color:"#06b6d4" },
            { cat:"Creator",   emoji:"🎨", color:"#8b5cf6" },
            { cat:"Student",   emoji:"📚", color:"#10b981" },
          ].map(({ cat, emoji, color }) => (
            <button key={cat} onClick={() => onNavigate("category", { category:cat })} style={{
              padding:"22px 14px", borderRadius:16, border:`1.5px solid ${dm?"#1e293b":"#e2e8f0"}`,
              background:dm?"#1e293b":"#fff", cursor:"pointer", textAlign:"center",
              transition:"all .25s", boxShadow:"0 2px 8px rgba(0,0,0,.04)"
            }}>
              <div style={{ fontSize:30, marginBottom:10 }}>{emoji}</div>
              <div style={{ fontWeight:700, fontSize:13, color:dm?"#e2e8f0":"#374151" }}>{cat}</div>
              <div style={{
                width:28, height:3, borderRadius:2, background:color,
                margin:"8px auto 0"
              }} />
            </button>
          ))}
        </div>

        {/* ── Featured ── */}
        <SectionTitle
          title="Laptop Pilihan Editor"
          sub="Dipilih langsung oleh tim ahli kami"
          dm={dm}
          action={() => onNavigate("catalog")}
        />
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
          gap:22, marginBottom:52
        }}>
          {featured.map(l => (
            <ProductCard
              key={l.id} laptop={l}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>

        {/* ── Promo Banner ── */}
        <div style={{
          borderRadius:20, overflow:"hidden",
          background:"linear-gradient(135deg,#0f172a,#1e3a8a)",
          padding:"36px 40px", marginBottom:52, position:"relative"
        }}>
          <div style={{
            position:"absolute", right:40, top:"50%", transform:"translateY(-50%)",
            fontSize:80, opacity:.12
          }}>🎁</div>
          <div style={{ color:"#38bdf8", fontWeight:700, fontSize:13, marginBottom:8 }}>
            PROMO SPESIAL
          </div>
          <h3 style={{ fontSize:26, fontWeight:900, color:"#fff", marginBottom:8 }}>
            Hemat hingga 40% untuk Laptop Gaming 2025
          </h3>
          <p style={{ color:"#94a3b8", fontSize:14, marginBottom:20 }}>
            Gunakan kode <strong style={{ color:"#fbbf24" }}>FLASH40</strong> setiap
            Jumat pukul 12.00–15.00 WIB. Stok terbatas!
          </p>
          <button onClick={() => onNavigate("promos")} style={{
            background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff",
            border:"none", borderRadius:12, padding:"12px 28px",
            fontSize:14, fontWeight:700, cursor:"pointer"
          }}>
            Klaim Sekarang →
          </button>
        </div>

        {/* ── New Arrivals ── */}
        <SectionTitle
          title="Baru Masuk"
          sub="Stok terbaru 2025, langsung dari distributor"
          dm={dm}
          action={() => onNavigate("catalog")}
        />
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
          gap:22, marginBottom:52
        }}>
          {newArrivals.map(l => (
            <ProductCard
              key={l.id} laptop={l}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>

        {/* ── Why Us ── */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
          gap:20, marginBottom:20
        }}>
          {[
            { icon:"shield", title:"100% Original",     sub:"Produk bergaransi resmi dari distributor resmi Indonesia" },
            { icon:"truck",  title:"Pengiriman Cepat",  sub:"Same-day delivery tersedia untuk kota-kota besar" },
            { icon:"zap",    title:"Flash Deal Harian", sub:"Promo baru setiap hari pukul 12.00 WIB" },
            { icon:"help",   title:"CS 24/7",           sub:"Tim support siap membantu kapan saja" },
          ].map(f => (
            <div key={f.title} style={{
              padding:24, borderRadius:16,
              background:dm?"#1e293b":"#fff",
              border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
              boxShadow:"0 2px 8px rgba(0,0,0,.04)"
            }}>
              <div style={{
                width:42, height:42, borderRadius:12,
                background:"linear-gradient(135deg,#eff6ff,#dbeafe)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:14, color:"#2563eb"
              }}>
                <Icon name={f.icon} size={20} />
              </div>
              <div style={{ fontWeight:700, fontSize:14, color:dm?"#e2e8f0":"#0f172a", marginBottom:6 }}>
                {f.title}
              </div>
              <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.65 }}>{f.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// ─── LOGIN PAGE ──────────────────────────────────────────────
export const LoginPage = ({ onNavigate, onLogin, dm }) => {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !pass) { setErr("Mohon isi semua field."); return; }
    if (!email.includes("@")) { setErr("Format email tidak valid."); return; }
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: email.split("@")[0], email });
      onNavigate("home");
    }, 800);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background: dm
        ? "linear-gradient(135deg,#0f172a,#1e293b)"
        : "linear-gradient(135deg,#eff6ff,#f0f9ff)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20
    }}>
      <div style={{ display:"flex", width:"100%", maxWidth:900, gap:0, borderRadius:24, overflow:"hidden", boxShadow:"0 24px 60px rgba(0,0,0,.14)" }}>

        {/* Left panel – illustration */}
        <div style={{
          flex:1, background:"linear-gradient(155deg,#1e3a8a,#0369a1)",
          padding:48, display:"flex", flexDirection:"column",
          justifyContent:"center", position:"relative", minWidth:280
        }}>
          <div style={{ position:"absolute", top:30, right:30, fontSize:70, opacity:.1 }}>💻</div>
          <div style={{ position:"absolute", bottom:40, left:30, fontSize:50, opacity:.08 }}>🔒</div>
          <div style={{
            width:52, height:52, borderRadius:14,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:24, fontSize:22, fontWeight:900, color:"#fff"
          }}>S</div>
          <h2 style={{ fontSize:28, fontWeight:900, color:"#fff", marginBottom:12 }}>
            Selamat Datang<br />di Saleem.id
          </h2>
          <p style={{ color:"#93c5fd", fontSize:14, lineHeight:1.75 }}>
            Marketplace laptop 2025 terpercaya di Indonesia. Temukan laptop impianmu
            dengan harga terbaik dan garansi resmi.
          </p>
          <div style={{ marginTop:36, display:"flex", flexDirection:"column", gap:12 }}>
            {["✅ Produk 100% original","🚚 Gratis ongkir","🔒 Transaksi aman","⭐ 50.000+ pelanggan puas"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:13, color:"#bfdbfe" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel – form */}
        <div style={{
          flex:1, background:dm?"#1e293b":"#fff",
          padding:"48px 40px", display:"flex", flexDirection:"column", justifyContent:"center"
        }}>
          <h1 style={{ fontSize:24, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
            Masuk ke Akun
          </h1>
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>
            Masuk untuk melanjutkan belanja
          </p>

          {err && (
            <div style={{
              background:"#fee2e2", color:"#dc2626", borderRadius:10,
              padding:"10px 14px", fontSize:13, marginBottom:16, fontWeight:600
            }}>{err}</div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <AuthInput label="Email" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama@email.com" dm={dm} />
            <AuthInput label="Password" type="password" value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Min. 8 karakter" dm={dm} />

            <button onClick={() => onNavigate("catalog")} style={{
              background:"none", border:"none", color:"#2563eb",
              fontSize:13, fontWeight:600, cursor:"pointer",
              textAlign:"right", padding:0, marginTop:-8
            }}>
              Lupa password?
            </button>

            <button onClick={handleLogin} disabled={loading} style={{
              background:"linear-gradient(135deg,#2563eb,#3b82f6)", color:"#fff",
              border:"none", borderRadius:12, padding:"13px",
              fontSize:15, fontWeight:700, cursor:"pointer", marginTop:4,
              opacity: loading ? .7 : 1, transition:"opacity .2s"
            }}>
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1, height:1, background:dm?"#334155":"#e2e8f0" }} />
              <span style={{ fontSize:12, color:"#94a3b8" }}>atau lanjut dengan</span>
              <div style={{ flex:1, height:1, background:dm?"#334155":"#e2e8f0" }} />
            </div>

            <button onClick={handleLogin} style={{
              border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
              background:dm?"#0f172a":"#fff", color:dm?"#e2e8f0":"#374151",
              borderRadius:12, padding:"12px", fontSize:14, fontWeight:600,
              cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", gap:10
            }}>
              <span style={{ fontSize:18 }}>🌐</span> Lanjut dengan Google
            </button>

            <p style={{ textAlign:"center", fontSize:13, color:"#94a3b8" }}>
              Belum punya akun?{" "}
              <button onClick={() => onNavigate("register")} style={{
                background:"none", border:"none", color:"#2563eb",
                fontWeight:700, cursor:"pointer"
              }}>Daftar Sekarang</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── REGISTER PAGE ───────────────────────────────────────────
export const RegisterPage = ({ onNavigate, onLogin, dm }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name:"", email:"", phone:"", city:"", pass:"", confirm:"", agree:false
  });
  const [err, setErr] = useState("");

  const cities = ["Jakarta","Surabaya","Bandung","Medan","Yogyakarta","Semarang","Makassar","Palembang"];

  const nextStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.phone)
        { setErr("Lengkapi data pribadi terlebih dahulu."); return; }
      if (!form.email.includes("@"))
        { setErr("Format email tidak valid."); return; }
    }
    if (step === 2) {
      if (!form.pass || !form.confirm)
        { setErr("Buat password terlebih dahulu."); return; }
      if (form.pass.length < 8)
        { setErr("Password minimal 8 karakter."); return; }
      if (form.pass !== form.confirm)
        { setErr("Konfirmasi password tidak cocok."); return; }
    }
    setErr("");
    setStep(s => s + 1);
  };

  const handleRegister = () => {
    if (!form.agree) { setErr("Harap setujui syarat & ketentuan."); return; }
    onLogin({ name: form.name, email: form.email });
    onNavigate("home");
  };

  const F = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const stepLabels = ["Data Pribadi","Password","Konfirmasi"];

  return (
    <div style={{
      minHeight:"100vh",
      background: dm
        ? "linear-gradient(135deg,#0f172a,#1e293b)"
        : "linear-gradient(135deg,#f0f9ff,#eff6ff)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20
    }}>
      <div style={{
        width:"100%", maxWidth:500,
        background:dm?"#1e293b":"#fff",
        borderRadius:24, padding:"44px 40px",
        boxShadow:"0 24px 60px rgba(0,0,0,.12)",
        border:`1px solid ${dm?"#334155":"#e2e8f0"}`
      }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <div style={{
            width:40, height:40, borderRadius:10,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontWeight:900, color:"#fff", fontSize:18
          }}>S</div>
          <span style={{
            fontSize:18, fontWeight:800,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
          }}>Saleem.id</span>
        </div>

        <h1 style={{ fontSize:22, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:4 }}>
          Buat Akun Baru
        </h1>
        <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>
          Bergabung dengan 50.000+ pelanggan setia kami
        </p>

        {/* Step indicator */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:28, gap:0 }}>
          {stepLabels.map((label, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", flex: i < stepLabels.length-1 ? 1 : "none" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{
                  width:28, height:28, borderRadius:50,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:700,
                  background: step > i+1 ? "#10b981" : step === i+1
                    ? "linear-gradient(135deg,#2563eb,#3b82f6)" : dm?"#334155":"#e2e8f0",
                  color: step >= i+1 ? "#fff" : "#94a3b8"
                }}>
                  {step > i+1 ? "✓" : i+1}
                </div>
                <span style={{ fontSize:10, color: step===i+1?"#2563eb":"#94a3b8", marginTop:4, whiteSpace:"nowrap" }}>
                  {label}
                </span>
              </div>
              {i < stepLabels.length-1 && (
                <div style={{ flex:1, height:2, background: step > i+1?"#10b981":dm?"#334155":"#e2e8f0", margin:"0 8px", marginBottom:16 }} />
              )}
            </div>
          ))}
        </div>

        {err && (
          <div style={{
            background:"#fee2e2", color:"#dc2626", borderRadius:10,
            padding:"10px 14px", fontSize:13, marginBottom:16, fontWeight:600
          }}>{err}</div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <AuthInput label="Nama Lengkap *" type="text" value={form.name}
              onChange={e => F("name", e.target.value)} placeholder="Budi Santoso" dm={dm} />
            <AuthInput label="Email *" type="email" value={form.email}
              onChange={e => F("email", e.target.value)} placeholder="nama@email.com" dm={dm} />
            <AuthInput label="No. HP *" type="tel" value={form.phone}
              onChange={e => F("phone", e.target.value)} placeholder="+62 812-3456-7890" dm={dm} />
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:dm?"#94a3b8":"#374151", display:"block", marginBottom:6 }}>
                Kota
              </label>
              <select value={form.city} onChange={e => F("city", e.target.value)} style={{
                width:"100%", padding:"11px 14px", borderRadius:10,
                border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                background:dm?"#0f172a":"#f8fafc", color:dm?"#f1f5f9":"#0f172a",
                fontSize:14, outline:"none", boxSizing:"border-box"
              }}>
                <option value="">Pilih kota...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <AuthInput label="Password *" type="password" value={form.pass}
              onChange={e => F("pass", e.target.value)} placeholder="Min. 8 karakter" dm={dm} />
            <AuthInput label="Konfirmasi Password *" type="password" value={form.confirm}
              onChange={e => F("confirm", e.target.value)} placeholder="Ulangi password" dm={dm} />
            {/* Strength bar */}
            {form.pass && (
              <div>
                <div style={{ fontSize:12, color:"#94a3b8", marginBottom:6 }}>Kekuatan password:</div>
                <div style={{ height:6, borderRadius:4, background:dm?"#334155":"#e2e8f0", overflow:"hidden" }}>
                  <div style={{
                    height:"100%", borderRadius:4, transition:"width .3s",
                    width: form.pass.length < 6 ? "25%" : form.pass.length < 10 ? "60%" : "100%",
                    background: form.pass.length < 6 ? "#ef4444" : form.pass.length < 10 ? "#f59e0b" : "#10b981"
                  }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{
              background:dm?"#0f172a":"#f8fafc", borderRadius:14,
              padding:20, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
            }}>
              <div style={{ fontSize:13, fontWeight:700, color:dm?"#94a3b8":"#374151", marginBottom:14, textTransform:"uppercase", letterSpacing:".05em" }}>
                Ringkasan Data
              </div>
              {[["Nama",form.name],["Email",form.email],["No. HP",form.phone],["Kota",form.city||"—"]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <span style={{ fontSize:13, color:"#94a3b8" }}>{k}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>{v}</span>
                </div>
              ))}
            </div>
            <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" }}>
              <input type="checkbox" checked={form.agree}
                onChange={e => F("agree", e.target.checked)}
                style={{ marginTop:2, accentColor:"#2563eb" }} />
              <span style={{ fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>
                Saya menyetujui{" "}
                <span style={{ color:"#2563eb", fontWeight:600, cursor:"pointer" }}>Syarat & Ketentuan</span>
                {" "}dan{" "}
                <span style={{ color:"#2563eb", fontWeight:600, cursor:"pointer" }}>Kebijakan Privasi</span>
                {" "}Saleem.id
              </span>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display:"flex", gap:10, marginTop:22 }}>
          {step > 1 && (
            <button onClick={() => { setErr(""); setStep(s => s-1); }} style={{
              flex:1, padding:"12px", borderRadius:12,
              border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
              background:"none", color:dm?"#e2e8f0":"#374151",
              fontSize:14, fontWeight:700, cursor:"pointer"
            }}>← Kembali</button>
          )}
          {step < 3 ? (
            <button onClick={nextStep} style={{
              flex:2, padding:"12px",
              background:"linear-gradient(135deg,#2563eb,#3b82f6)",
              color:"#fff", border:"none", borderRadius:12,
              fontSize:14, fontWeight:700, cursor:"pointer"
            }}>Lanjut →</button>
          ) : (
            <button onClick={handleRegister} style={{
              flex:2, padding:"12px",
              background:"linear-gradient(135deg,#10b981,#059669)",
              color:"#fff", border:"none", borderRadius:12,
              fontSize:15, fontWeight:700, cursor:"pointer"
            }}>Buat Akun ✓</button>
          )}
        </div>

        <p style={{ textAlign:"center", fontSize:13, color:"#94a3b8", marginTop:16 }}>
          Sudah punya akun?{" "}
          <button onClick={() => onNavigate("login")} style={{
            background:"none", border:"none", color:"#2563eb",
            fontWeight:700, cursor:"pointer"
          }}>Masuk</button>
        </p>
      </div>
    </div>
  );
};
