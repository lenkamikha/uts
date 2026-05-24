// ============================================================
//  SALEEM.ID — ORANG 3
//  Interface: Category Page · Shopping Cart · Checkout Page
// ============================================================
import { useState } from "react";
import { LAPTOPS, BRANDS, CATEGORIES, formatPrice } from "../shared/shared_data";
import { Icon, Stars, Badge, ProductCard, Breadcrumb } from "../shared/shared_components";

// ─── CATEGORY PAGE ───────────────────────────────────────────
export const CategoryPage = ({ params, onNavigate, onAddToCart, onWishlist, wishlist, dm }) => {
  const initBrand = params?.brand    || "All";
  const initCat   = params?.category || "All";

  const [activeBrand, setActiveBrand] = useState(initBrand);
  const [activeCat,   setActiveCat]   = useState(initCat);
  const [hovered,     setHovered]     = useState(null);

  const filtered = LAPTOPS.filter(l =>
    (activeBrand === "All" || l.brand    === activeBrand) &&
    (activeCat   === "All" || l.category === activeCat)
  );

  const catMeta = {
    Gaming:    { emoji:"🎮", color:"#ef4444", desc:"Performa ekstrem untuk gaming hardcore & esports profesional" },
    Business:  { emoji:"💼", color:"#3b82f6", desc:"Produktivitas tanpa batas untuk profesional & eksekutif" },
    Ultrabook: { emoji:"💻", color:"#06b6d4", desc:"Ringan, tipis, dan tahan lama untuk mobilitas tinggi" },
    Creator:   { emoji:"🎨", color:"#8b5cf6", desc:"Display akurat & GPU bertenaga untuk kreator konten" },
    Student:   { emoji:"📚", color:"#10b981", desc:"Terjangkau dan andal untuk belajar dan produktivitas" },
  };

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Breadcrumb items={["Home","Kategori"]} onNavigate={onNavigate} dm={dm} />

        {/* Page Header */}
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
            Jelajahi Kategori
          </h1>
          <p style={{ fontSize:13, color:"#94a3b8" }}>
            Temukan laptop yang paling sesuai dengan kebutuhan dan gaya hidupmu
          </p>
        </div>

        {/* ── Category Cards ── */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",
          gap:16, marginBottom:40
        }}>
          {Object.entries(catMeta).map(([cat, meta]) => {
            const active = activeCat === cat;
            const count  = LAPTOPS.filter(l => l.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(active ? "All" : cat)}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding:"24px 16px", borderRadius:18, cursor:"pointer",
                  textAlign:"center", position:"relative", overflow:"hidden",
                  border:`2px solid ${active ? meta.color : dm?"#1e293b":"#e2e8f0"}`,
                  background: active
                    ? `linear-gradient(135deg,${meta.color}18,${meta.color}08)`
                    : dm?"#1e293b":"#fff",
                  transform: (active || hovered===cat) ? "translateY(-3px)" : "none",
                  boxShadow: active
                    ? `0 8px 24px ${meta.color}30`
                    : "0 2px 8px rgba(0,0,0,.04)",
                  transition:"all .25s"
                }}
              >
                {active && (
                  <div style={{
                    position:"absolute", top:10, right:10,
                    background:meta.color, borderRadius:50,
                    width:20, height:20, display:"flex",
                    alignItems:"center", justifyContent:"center",
                    fontSize:11, color:"#fff", fontWeight:900
                  }}>✓</div>
                )}
                <div style={{ fontSize:34, marginBottom:10 }}>{meta.emoji}</div>
                <div style={{
                  fontWeight:700, fontSize:14,
                  color: active ? meta.color : dm?"#e2e8f0":"#374151",
                  marginBottom:6
                }}>{cat}</div>
                <div style={{
                  fontSize:11, color:"#94a3b8", lineHeight:1.5, marginBottom:10
                }}>{meta.desc.slice(0,36)}...</div>
                <span style={{
                  background: active ? meta.color : dm?"#334155":"#f1f5f9",
                  color: active?"#fff":"#94a3b8",
                  fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20
                }}>{count} produk</span>
              </button>
            );
          })}
        </div>

        {/* ── Brand Filter ── */}
        <div style={{
          background:dm?"#1e293b":"#fff", borderRadius:16, padding:20,
          border:`1px solid ${dm?"#334155":"#e2e8f0"}`, marginBottom:32
        }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:14, textTransform:"uppercase", letterSpacing:".05em" }}>
            Filter Brand
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {BRANDS.map(b => {
              const active = activeBrand === b;
              return (
                <button key={b} onClick={() => setActiveBrand(b)} style={{
                  padding:"7px 16px", borderRadius:20, fontWeight:700,
                  fontSize:12, cursor:"pointer",
                  border:`1.5px solid ${active?"#2563eb":dm?"#334155":"#e2e8f0"}`,
                  background: active ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "none",
                  color: active ? "#fff" : dm?"#94a3b8":"#475569"
                }}>{b}</button>
              );
            })}
          </div>
        </div>

        {/* ── Results ── */}
        <div style={{
          display:"flex", justifyContent:"space-between",
          alignItems:"center", marginBottom:20
        }}>
          <div>
            <h2 style={{ fontSize:18, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:2 }}>
              {activeCat==="All" && activeBrand==="All" ? "Semua Produk"
                : activeBrand!=="All" && activeCat!=="All" ? `${activeBrand} – ${activeCat}`
                : activeBrand!=="All" ? `Brand: ${activeBrand}`
                : `Kategori: ${activeCat}`}
            </h2>
            <p style={{ fontSize:13, color:"#94a3b8" }}>{filtered.length} produk</p>
          </div>
          {(activeBrand !== "All" || activeCat !== "All") && (
            <button onClick={() => { setActiveBrand("All"); setActiveCat("All"); }} style={{
              background:"none", border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
              color:"#94a3b8", borderRadius:8, padding:"7px 14px",
              fontSize:12, fontWeight:600, cursor:"pointer"
            }}>Reset Filter ×</button>
          )}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
          {filtered.map(l => (
            <ProductCard key={l.id} laptop={l} onNavigate={onNavigate}
              onAddToCart={onAddToCart} onWishlist={onWishlist} wishlist={wishlist} />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:60, color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
              <p>Tidak ada produk untuk filter ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── SHOPPING CART PAGE ──────────────────────────────────────
export const CartPage = ({ cart, setCart, onNavigate, dm }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoErr,     setPromoErr]     = useState("");

  const VALID_CODES = { "FLASH40":40, "STUDENT10":10, "RAMADAN30":30 };

  const updateQty = (id, delta) =>
    setCart(c => c.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+delta)} : i));
  const remove = id => setCart(c => c.filter(i => i.id!==id));

  const subtotal   = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const shipping   = subtotal > 15000000 ? 0 : 75000;
  const discount   = promoApplied ? Math.round(subtotal * (VALID_CODES[promoCode.toUpperCase()] || 0) / 100) : 0;
  const total      = subtotal + shipping - discount;

  const applyPromo = () => {
    const code = promoCode.toUpperCase();
    if (VALID_CODES[code]) {
      setPromoApplied(true);
      setPromoErr("");
    } else {
      setPromoErr("Kode promo tidak valid.");
      setPromoApplied(false);
    }
  };

  if (cart.length === 0) return (
    <div style={{
      background:dm?"#0f172a":"#f8fafc", minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:18
    }}>
      <div style={{ fontSize:80 }}>🛒</div>
      <h2 style={{ fontSize:22, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>
        Keranjang Kosong
      </h2>
      <p style={{ color:"#94a3b8", fontSize:14, textAlign:"center", maxWidth:300 }}>
        Belum ada produk di keranjangmu. Yuk mulai belanja laptop impianmu!
      </p>
      <button onClick={() => onNavigate("catalog")} style={{
        background:"linear-gradient(135deg,#2563eb,#3b82f6)",
        color:"#fff", border:"none", borderRadius:12,
        padding:"13px 30px", fontSize:15, fontWeight:700, cursor:"pointer"
      }}>Mulai Belanja →</button>
    </div>
  );

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Breadcrumb items={["Home","Keranjang Belanja"]} onNavigate={onNavigate} dm={dm} />
        <h1 style={{ fontSize:24, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:24 }}>
          Keranjang ({cart.reduce((s,i)=>s+i.qty,0)} item)
        </h1>

        <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-start" }}>

          {/* ── Cart Items ── */}
          <div style={{ flex:1, minWidth:300, display:"flex", flexDirection:"column", gap:14 }}>

            {/* Select all row */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"12px 16px", background:dm?"#1e293b":"#fff",
              borderRadius:12, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
            }}>
              <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:14, fontWeight:600, color:dm?"#e2e8f0":"#374151" }}>
                <input type="checkbox" defaultChecked style={{ accentColor:"#2563eb", width:16, height:16 }} />
                Pilih Semua ({cart.length} produk)
              </label>
              <button onClick={() => setCart([])} style={{
                background:"none", border:"none", color:"#ef4444",
                fontSize:13, fontWeight:600, cursor:"pointer"
              }}>Hapus Semua</button>
            </div>

            {cart.map(item => {
              const itemDisc = Math.round((1 - item.price/item.originalPrice)*100);
              return (
                <div key={item.id} style={{
                  background:dm?"#1e293b":"#fff", borderRadius:16, padding:18,
                  border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                  boxShadow:"0 2px 8px rgba(0,0,0,.04)",
                  display:"flex", gap:14, alignItems:"flex-start", flexWrap:"wrap"
                }}>
                  <input type="checkbox" defaultChecked style={{ accentColor:"#2563eb", width:16, height:16, marginTop:4, flexShrink:0 }} />
                  {/* Product Image */}
                  <div style={{
                    width:90, height:68, borderRadius:10, overflow:"hidden",
                    flexShrink:0, background:dm?"#0f172a":"#f1f5f9"
                  }}>
                    <img src={item.img} alt={item.name}
                      style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:180 }}>
                    <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, marginBottom:3 }}>
                      {item.brand} · {item.category}
                    </div>
                    <div style={{
                      fontSize:14, fontWeight:700, color:dm?"#e2e8f0":"#0f172a",
                      lineHeight:1.4, marginBottom:6, cursor:"pointer"
                    }} onClick={() => onNavigate("product", item)}>
                      {item.name}
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[item.specs.cpu?.split(" ").slice(0,3).join(" "), item.specs.ram, item.specs.gpu?.split(" ").slice(0,2).join(" ")].map((s,i) => (
                        <span key={i} style={{
                          background:dm?"#334155":"#f1f5f9",
                          color:"#94a3b8", fontSize:10, padding:"2px 7px",
                          borderRadius:5, fontWeight:500
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Price + Controls */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:16, fontWeight:800, color:"#1d4ed8" }}>
                        {formatPrice(item.price * item.qty)}
                      </div>
                      <div style={{ fontSize:11, color:"#94a3b8", textDecoration:"line-through" }}>
                        {formatPrice(item.originalPrice)}
                      </div>
                      <div style={{ fontSize:11, color:"#10b981", fontWeight:700 }}>
                        Hemat {itemDisc}%
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{
                        display:"flex", alignItems:"center",
                        border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                        borderRadius:8, overflow:"hidden"
                      }}>
                        <button onClick={() => updateQty(item.id,-1)} style={{
                          padding:"5px 12px", background:"none", border:"none",
                          cursor:"pointer", color:dm?"#e2e8f0":"#374151", fontSize:16
                        }}>−</button>
                        <span style={{
                          padding:"5px 14px", fontSize:13, fontWeight:700,
                          color:dm?"#e2e8f0":"#0f172a",
                          borderLeft:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                          borderRight:`1px solid ${dm?"#334155":"#e2e8f0"}`
                        }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id,1)} style={{
                          padding:"5px 12px", background:"none", border:"none",
                          cursor:"pointer", color:dm?"#e2e8f0":"#374151", fontSize:16
                        }}>+</button>
                      </div>
                      <button onClick={() => remove(item.id)} style={{
                        background:"none", border:`1px solid ${dm?"#334155":"#fee2e2"}`,
                        color:"#ef4444", cursor:"pointer", padding:"6px 10px",
                        borderRadius:8, display:"flex", alignItems:"center"
                      }}>
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping */}
            <button onClick={() => onNavigate("catalog")} style={{
              background:"none", border:`1.5px dashed ${dm?"#334155":"#d1d5db"}`,
              borderRadius:14, padding:"14px", color:"#94a3b8",
              fontSize:13, fontWeight:600, cursor:"pointer", textAlign:"center"
            }}>
              + Tambah Produk Lain
            </button>
          </div>

          {/* ── Order Summary ── */}
          <div style={{ width:310, flexShrink:0 }}>
            <div style={{
              background:dm?"#1e293b":"#fff", borderRadius:18, padding:26,
              border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
              position:"sticky", top:84, boxShadow:"0 4px 20px rgba(0,0,0,.06)"
            }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:22 }}>
                Ringkasan Pesanan
              </h3>

              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
                <SumRow label="Subtotal" value={formatPrice(subtotal)} dm={dm} />
                <SumRow label="Ongkir"
                  value={shipping===0 ? "GRATIS 🎉" : formatPrice(shipping)}
                  dm={dm} green={shipping===0} />
                {promoApplied && (
                  <SumRow label={`Diskon (${VALID_CODES[promoCode.toUpperCase()]}%)`}
                    value={`-${formatPrice(discount)}`} dm={dm} green />
                )}
                {subtotal < 15000000 && (
                  <div style={{ fontSize:12, color:"#f59e0b", background:"#fffbeb", padding:"8px 12px", borderRadius:8 }}>
                    💡 Tambah {formatPrice(15000000-subtotal)} lagi untuk gratis ongkir!
                  </div>
                )}
                <div style={{ borderTop:`1px solid ${dm?"#334155":"#e2e8f0"}`, paddingTop:12 }}>
                  <SumRow label="Total Pembayaran" value={formatPrice(total)} dm={dm} bold />
                </div>
              </div>

              {/* Promo code */}
              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:12, fontWeight:700, color:dm?"#94a3b8":"#374151", marginBottom:8 }}>
                  Kode Promo
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <input
                    placeholder="Masukkan kode..."
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value); setPromoApplied(false); setPromoErr(""); }}
                    style={{
                      flex:1, padding:"9px 12px", borderRadius:9,
                      border:`1.5px solid ${promoApplied?"#10b981":promoErr?"#ef4444":dm?"#334155":"#e2e8f0"}`,
                      background:dm?"#0f172a":"#f8fafc", color:dm?"#f1f5f9":"#0f172a",
                      fontSize:13, outline:"none"
                    }}
                  />
                  <button onClick={applyPromo} style={{
                    padding:"9px 14px", background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                    color:"#fff", border:"none", borderRadius:9,
                    fontSize:12, fontWeight:700, cursor:"pointer"
                  }}>Pakai</button>
                </div>
                {promoErr && <p style={{ fontSize:12, color:"#ef4444", marginTop:6 }}>{promoErr}</p>}
                {promoApplied && (
                  <p style={{ fontSize:12, color:"#10b981", marginTop:6, fontWeight:600 }}>
                    ✅ Kode berhasil diterapkan! Hemat {VALID_CODES[promoCode.toUpperCase()]}%
                  </p>
                )}
                <div style={{ marginTop:8, fontSize:11, color:"#94a3b8" }}>
                  Coba: FLASH40, STUDENT10, RAMADAN30
                </div>
              </div>

              <button onClick={() => onNavigate("checkout")} style={{
                width:"100%", padding:"14px",
                background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                color:"#fff", border:"none", borderRadius:12,
                fontSize:15, fontWeight:700, cursor:"pointer",
                boxShadow:"0 6px 20px rgba(37,99,235,.35)"
              }}>
                Lanjut ke Checkout →
              </button>

              <div style={{ display:"flex", justifyContent:"center", gap:14, marginTop:16, flexWrap:"wrap" }}>
                {["🔒 SSL Enkripsi","🏦 Bayar Aman","✅ Garansi Resmi"].map(t => (
                  <span key={t} style={{ fontSize:11, color:"#94a3b8" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SumRow = ({ label, value, dm, bold, green }) => (
  <div style={{ display:"flex", justifyContent:"space-between" }}>
    <span style={{ fontSize:14, color:"#94a3b8" }}>{label}</span>
    <span style={{
      fontSize:14, fontWeight:bold?800:600,
      color: green?"#10b981" : dm?"#e2e8f0":"#0f172a"
    }}>{value}</span>
  </div>
);

// ─── CHECKOUT PAGE ───────────────────────────────────────────
export const CheckoutPage = ({ cart, onNavigate, dm }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name:"", phone:"", address:"", city:"", province:"",
    zip:"", notes:"", payment:"transfer"
  });
  const [err, setErr] = useState("");

  const subtotal = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const shipping  = subtotal > 15000000 ? 0 : 75000;
  const total     = subtotal + shipping;

  const provinces = ["DKI Jakarta","Jawa Barat","Jawa Tengah","Jawa Timur","DI Yogyakarta",
    "Banten","Bali","Sumatera Utara","Sumatera Selatan","Kalimantan Timur"];

  const payMethods = [
    { id:"transfer", label:"Transfer Bank",          icon:"🏦", desc:"BCA, Mandiri, BNI, BRI" },
    { id:"va",       label:"Virtual Account",        icon:"📱", desc:"Bayar otomatis via ATM/m-banking" },
    { id:"cc",       label:"Kartu Kredit/Debit",     icon:"💳", desc:"Visa, Mastercard, AMEX" },
    { id:"gopay",    label:"GoPay",                  icon:"🟢", desc:"Bayar via aplikasi Gojek" },
    { id:"ovo",      label:"OVO",                    icon:"🟣", desc:"Bayar via aplikasi OVO" },
    { id:"qris",     label:"QRIS",                   icon:"📷", desc:"Scan QR dengan aplikasi apapun" },
  ];

  const F = (k, v) => setForm(f => ({...f, [k]:v}));

  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city)
        { setErr("Lengkapi semua data alamat pengiriman."); return false; }
    }
    setErr(""); return true;
  };

  const next = () => { if (validateStep()) setStep(s => s+1); };

  const steps = [
    { label:"Alamat",     icon:"📍" },
    { label:"Pembayaran", icon:"💳" },
    { label:"Review",     icon:"📋" },
  ];

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>

        {/* Logo mini */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28 }}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontWeight:900, color:"#fff", fontSize:14
          }}>S</div>
          <span style={{ fontWeight:800, fontSize:16, color:dm?"#f1f5f9":"#0f172a" }}>Saleem.id Checkout</span>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, color:"#94a3b8", fontSize:13 }}>
            <Icon name="shield" size={14} /> Checkout Aman
          </div>
        </div>

        {/* Step indicator */}
        <div style={{
          display:"flex", alignItems:"center",
          background:dm?"#1e293b":"#fff", borderRadius:16, padding:"18px 28px",
          border:`1px solid ${dm?"#334155":"#e2e8f0"}`, marginBottom:28
        }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display:"flex", alignItems:"center", flex: i<steps.length-1?1:"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{
                  width:36, height:36, borderRadius:50,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: step > i+1 ? 14 : 15,
                  background: step > i+1 ? "#10b981"
                    : step === i+1 ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                    : dm?"#334155":"#e2e8f0",
                  color: step >= i+1 ? "#fff" : "#94a3b8",
                  fontWeight:700
                }}>
                  {step > i+1 ? "✓" : s.icon}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color: step===i+1?"#2563eb":step>i+1?"#10b981":"#94a3b8" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize:10, color:"#94a3b8" }}>
                    {step > i+1 ? "Selesai" : step===i+1 ? "Sedang diisi" : "Menunggu"}
                  </div>
                </div>
              </div>
              {i < steps.length-1 && (
                <div style={{
                  flex:1, height:2, margin:"0 16px",
                  background: step > i+1 ? "#10b981" : dm?"#334155":"#e2e8f0"
                }} />
              )}
            </div>
          ))}
        </div>

        {err && (
          <div style={{
            background:"#fee2e2", color:"#dc2626", borderRadius:10,
            padding:"11px 16px", fontSize:13, marginBottom:16, fontWeight:600
          }}>{err}</div>
        )}

        <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-start" }}>

          {/* ── Form ── */}
          <div style={{ flex:1, minWidth:300 }}>

            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div style={{
                background:dm?"#1e293b":"#fff", borderRadius:18, padding:28,
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`
              }}>
                <h3 style={{ fontSize:16, fontWeight:700, color:dm?"#f1f5f9":"#0f172a", marginBottom:22 }}>
                  📍 Alamat Pengiriman
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <InputField label="Nama Lengkap *" type="text"
                      value={form.name} onChange={e=>F("name",e.target.value)}
                      placeholder="Budi Santoso" dm={dm} />
                    <InputField label="No. HP *" type="tel"
                      value={form.phone} onChange={e=>F("phone",e.target.value)}
                      placeholder="+62 812-xxxx-xxxx" dm={dm} />
                  </div>
                  <InputField label="Alamat Lengkap *" type="text"
                    value={form.address} onChange={e=>F("address",e.target.value)}
                    placeholder="Jl. Merdeka No. 1, RT 01/RW 02" dm={dm} />
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <InputField label="Kota *" type="text"
                      value={form.city} onChange={e=>F("city",e.target.value)}
                      placeholder="Jakarta" dm={dm} />
                    <div>
                      <label style={{ fontSize:13, fontWeight:600, color:dm?"#94a3b8":"#374151", display:"block", marginBottom:6 }}>
                        Provinsi
                      </label>
                      <select value={form.province} onChange={e=>F("province",e.target.value)} style={{
                        width:"100%", padding:"11px 14px", borderRadius:10,
                        border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                        background:dm?"#0f172a":"#f8fafc", color:dm?"#f1f5f9":"#0f172a",
                        fontSize:13, outline:"none", boxSizing:"border-box"
                      }}>
                        <option value="">Pilih...</option>
                        {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:14 }}>
                    <InputField label="Kode Pos" type="text"
                      value={form.zip} onChange={e=>F("zip",e.target.value)}
                      placeholder="12345" dm={dm} />
                    <InputField label="Catatan Kurir" type="text"
                      value={form.notes} onChange={e=>F("notes",e.target.value)}
                      placeholder="Tolong hubungi sebelum diantar..." dm={dm} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div style={{
                background:dm?"#1e293b":"#fff", borderRadius:18, padding:28,
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`
              }}>
                <h3 style={{ fontSize:16, fontWeight:700, color:dm?"#f1f5f9":"#0f172a", marginBottom:22 }}>
                  💳 Metode Pembayaran
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {payMethods.map(m => (
                    <button key={m.id} onClick={() => F("payment",m.id)} style={{
                      display:"flex", alignItems:"center", gap:16, padding:"16px 20px",
                      borderRadius:14, cursor:"pointer", textAlign:"left",
                      border:`2px solid ${form.payment===m.id?"#2563eb":dm?"#334155":"#e2e8f0"}`,
                      background: form.payment===m.id
                        ? (dm?"rgba(37,99,235,.12)":"#eff6ff") : "none",
                      transition:"all .2s"
                    }}>
                      <span style={{ fontSize:26 }}>{m.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>
                          {m.label}
                        </div>
                        <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{m.desc}</div>
                      </div>
                      {form.payment === m.id && (
                        <div style={{
                          width:22, height:22, borderRadius:50,
                          background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff", fontSize:12, fontWeight:900
                        }}>✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div style={{
                background:dm?"#1e293b":"#fff", borderRadius:18, padding:28,
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`
              }}>
                <h3 style={{ fontSize:16, fontWeight:700, color:dm?"#f1f5f9":"#0f172a", marginBottom:22 }}>
                  📋 Ringkasan Pesanan
                </h3>

                {/* Items */}
                <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display:"flex", gap:12, alignItems:"center",
                      padding:14, background:dm?"#0f172a":"#f8fafc", borderRadius:12
                    }}>
                      <img src={item.img} alt={item.name}
                        style={{ width:60, height:46, objectFit:"cover", borderRadius:8, flexShrink:0 }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a", marginBottom:2 }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize:12, color:"#94a3b8" }}>Qty: {item.qty}</div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:800, color:"#1d4ed8" }}>
                        {formatPrice(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment info */}
                <div style={{
                  padding:16, background:dm?"#0f172a":"#f8fafc",
                  borderRadius:12, marginBottom:16
                }}>
                  {[
                    ["Kirim ke",   `${form.address}, ${form.city}`],
                    ["No. HP",     form.phone],
                    ["Pembayaran", payMethods.find(m=>m.id===form.payment)?.label||"—"],
                    ["Ongkir",     shipping===0?"Gratis":formatPrice(shipping)],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <span style={{ fontSize:13, color:"#94a3b8" }}>{k}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:dm?"#e2e8f0":"#0f172a", maxWidth:"55%", textAlign:"right" }}>
                        {v}
                      </span>
                    </div>
                  ))}
                  <div style={{ borderTop:`1px solid ${dm?"#334155":"#e2e8f0"}`, marginTop:10, paddingTop:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:14, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>Total</span>
                      <span style={{ fontSize:18, fontWeight:900, color:"#1d4ed8" }}>
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              {step > 1 && (
                <button onClick={() => { setErr(""); setStep(s=>s-1); }} style={{
                  padding:"13px 24px", borderRadius:12,
                  border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                  background:"none", color:dm?"#e2e8f0":"#374151",
                  fontSize:14, fontWeight:700, cursor:"pointer"
                }}>← Kembali</button>
              )}
              {step < 3 ? (
                <button onClick={next} style={{
                  flex:1, padding:"13px",
                  background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                  color:"#fff", border:"none", borderRadius:12,
                  fontSize:14, fontWeight:700, cursor:"pointer"
                }}>Lanjut →</button>
              ) : (
                <button onClick={() => onNavigate("success")} style={{
                  flex:1, padding:"13px",
                  background:"linear-gradient(135deg,#10b981,#059669)",
                  color:"#fff", border:"none", borderRadius:12,
                  fontSize:15, fontWeight:700, cursor:"pointer",
                  boxShadow:"0 6px 20px rgba(16,185,129,.35)"
                }}>✓ Konfirmasi & Bayar</button>
              )}
            </div>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div style={{ width:280, flexShrink:0 }}>
            <div style={{
              background:dm?"#1e293b":"#fff", borderRadius:16, padding:22,
              border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
              position:"sticky", top:84
            }}>
              <div style={{ fontSize:14, fontWeight:700, color:dm?"#94a3b8":"#374151", marginBottom:16 }}>
                Pesananmu ({cart.reduce((s,i)=>s+i.qty,0)} item)
              </div>
              {cart.map(item => (
                <div key={item.id} style={{ display:"flex", gap:10, marginBottom:12 }}>
                  <img src={item.img} alt="" style={{ width:44, height:34, objectFit:"cover", borderRadius:7, flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:dm?"#e2e8f0":"#374151", lineHeight:1.4 }}>
                      {item.name.slice(0,30)}{item.name.length>30?"...":""}
                    </div>
                    <div style={{ fontSize:12, color:"#94a3b8" }}>×{item.qty}</div>
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#1d4ed8", flexShrink:0 }}>
                    {formatPrice(item.price*item.qty)}
                  </div>
                </div>
              ))}
              <div style={{ borderTop:`1px solid ${dm?"#334155":"#e2e8f0"}`, paddingTop:14, marginTop:6 }}>
                <SumRow label="Subtotal"  value={formatPrice(subtotal)} dm={dm} />
                <div style={{ height:8 }} />
                <SumRow label="Ongkir"    value={shipping===0?"Gratis":formatPrice(shipping)} dm={dm} green={shipping===0} />
                <div style={{ height:8 }} />
                <SumRow label="Total"     value={formatPrice(total)} dm={dm} bold />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type, value, onChange, placeholder, dm }) => (
  <div>
    <label style={{ fontSize:13, fontWeight:600, color:dm?"#94a3b8":"#374151", display:"block", marginBottom:6 }}>
      {label}
    </label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{
      width:"100%", padding:"11px 14px", borderRadius:10,
      border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
      background:dm?"#0f172a":"#f8fafc", color:dm?"#f1f5f9":"#0f172a",
      fontSize:13, outline:"none", boxSizing:"border-box"
    }} />
  </div>
);
