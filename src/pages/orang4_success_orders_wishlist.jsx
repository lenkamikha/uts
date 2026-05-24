// ============================================================
//  SALEEM.ID — ORANG 4
//  Interface: Payment Success · Order History · Wishlist Page
// ============================================================
import { useState } from "react";
import { LAPTOPS, formatPrice } from "../shared/shared_data";
import { Icon, Stars, ProductCard, Breadcrumb } from "../shared/shared_components";

// ─── PAYMENT SUCCESS PAGE ────────────────────────────────────
export const SuccessPage = ({ onNavigate, cart, dm }) => {
  const orderId   = "SLD-" + Math.random().toString(36).substring(2,8).toUpperCase();
  const orderDate = new Date().toLocaleDateString("id-ID", {
    day:"numeric", month:"long", year:"numeric"
  });
  const total = (cart||[]).reduce((s,i) => s + i.price*i.qty, 0);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { label:"Pesanan Diterima",    icon:"✅", done:true,  time:"Baru saja" },
    { label:"Verifikasi Pembayaran",icon:"🔍", done:true,  time:"~5 menit" },
    { label:"Dikemas",             icon:"📦", done:false, time:"1–2 jam" },
    { label:"Dikirim",             icon:"🚚", done:false, time:"1–3 hari" },
    { label:"Tiba di Tujuan",      icon:"🏠", done:false, time:"Estimasi 3 hari" },
  ];

  return (
    <div style={{
      background: dm ? "#0f172a" : "#f0fdf4",
      minHeight:"100vh", padding:"40px 20px"
    }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>

        {/* Success Hero */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          {/* Animated checkmark */}
          <div style={{
            width:88, height:88, borderRadius:50,
            background:"linear-gradient(135deg,#10b981,#059669)",
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 20px",
            boxShadow:"0 12px 36px rgba(16,185,129,.35)"
          }}>
            <Icon name="check" size={40} className="" style={{ color:"#fff", strokeWidth:3 }} />
          </div>

          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"#dcfce7", borderRadius:20, padding:"6px 18px",
            marginBottom:16
          }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#16a34a" }}>
              🎉 Pembayaran Berhasil!
            </span>
          </div>

          <h1 style={{ fontSize:28, fontWeight:900, color:dm?"#f1f5f9":"#0f172a", marginBottom:10 }}>
            Terima Kasih, Pesananmu<br />Sudah Dikonfirmasi!
          </h1>
          <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.75 }}>
            Kami akan segera memproses pesananmu. Konfirmasi telah dikirim ke emailmu.
          </p>
        </div>

        {/* Order ID Card */}
        <div style={{
          background:dm?"#1e293b":"#fff", borderRadius:20, padding:28,
          border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
          boxShadow:"0 4px 20px rgba(0,0,0,.06)", marginBottom:20
        }}>
          {/* ID row */}
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            marginBottom:24, flexWrap:"wrap", gap:10
          }}>
            <div>
              <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>Nomor Pesanan</div>
              <div style={{
                fontSize:22, fontWeight:900, color:"#2563eb",
                fontFamily:"monospace", letterSpacing:".05em"
              }}>{orderId}</div>
            </div>
            <button onClick={copyId} style={{
              display:"flex", alignItems:"center", gap:8,
              background: copied?"#dcfce7":"linear-gradient(135deg,#eff6ff,#dbeafe)",
              color: copied?"#16a34a":"#2563eb",
              border:"none", borderRadius:10, padding:"9px 18px",
              fontSize:13, fontWeight:700, cursor:"pointer", transition:"all .2s"
            }}>
              {copied ? "✓ Disalin!" : "📋 Salin ID"}
            </button>
          </div>

          {/* Info grid */}
          <div style={{
            display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:16, marginBottom:24
          }}>
            {[
              ["Tanggal Pesanan", orderDate],
              ["Status",          "Diproses ⚙️"],
              ["Estimasi Tiba",   "3 Hari Kerja 🚚"],
              ["Total Bayar",     total > 0 ? formatPrice(total) : "—"],
              ["Metode Bayar",    "Transfer Bank 🏦"],
              ["Garansi",         "1 Tahun Resmi ✅"],
            ].map(([k,v]) => (
              <div key={k} style={{
                padding:"12px 14px",
                background:dm?"#0f172a":"#f8fafc", borderRadius:12
              }}>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k}</div>
                <div style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Items summary */}
          {cart && cart.length > 0 && (
            <div>
              <div style={{
                fontSize:13, fontWeight:700, color:dm?"#94a3b8":"#374151",
                marginBottom:12, textTransform:"uppercase", letterSpacing:".05em"
              }}>Item Pesanan</div>
              {cart.map(item => (
                <div key={item.id} style={{
                  display:"flex", gap:12, alignItems:"center",
                  marginBottom:10, padding:12,
                  background:dm?"#0f172a":"#f8fafc", borderRadius:12
                }}>
                  <img src={item.img} alt={item.name}
                    style={{ width:52, height:40, objectFit:"cover", borderRadius:8, flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontSize:14, fontWeight:800, color:"#1d4ed8" }}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Tracking Timeline */}
        <div style={{
          background:dm?"#1e293b":"#fff", borderRadius:20, padding:28,
          border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
          marginBottom:20
        }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:dm?"#f1f5f9":"#0f172a", marginBottom:24 }}>
            🗺️ Status Pengiriman
          </h3>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display:"flex", gap:16, marginBottom: i<steps.length-1?20:0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:36, flexShrink:0 }}>
                <div style={{
                  width:36, height:36, borderRadius:50, fontSize:16,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: s.done
                    ? "linear-gradient(135deg,#10b981,#059669)"
                    : i===2?"linear-gradient(135deg,#f59e0b,#d97706)"
                    : dm?"#334155":"#e2e8f0",
                  boxShadow: s.done ? "0 4px 12px rgba(16,185,129,.3)" : "none"
                }}>{s.icon}</div>
                {i < steps.length-1 && (
                  <div style={{
                    width:2, flex:1, minHeight:20, marginTop:6,
                    background: s.done ? "#10b981" : dm?"#334155":"#e2e8f0"
                  }} />
                )}
              </div>
              <div style={{ paddingTop:6 }}>
                <div style={{
                  fontSize:14, fontWeight:700,
                  color: s.done?"#10b981":i===2?"#f59e0b":dm?"#64748b":"#94a3b8"
                }}>{s.label}</div>
                <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{s.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button onClick={() => onNavigate("orders")} style={{
            flex:1, padding:"13px 24px",
            background:"linear-gradient(135deg,#2563eb,#3b82f6)",
            color:"#fff", border:"none", borderRadius:12,
            fontSize:14, fontWeight:700, cursor:"pointer", minWidth:160
          }}>Lacak Pesanan 📦</button>

          <button onClick={() => onNavigate("home")} style={{
            flex:1, padding:"13px 24px",
            border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
            background:"none", color:dm?"#e2e8f0":"#374151",
            borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", minWidth:160
          }}>Belanja Lagi →</button>
        </div>

        {/* Share / Invite */}
        <div style={{
          textAlign:"center", marginTop:24,
          padding:18, background:dm?"#1e293b":"#fff",
          borderRadius:14, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
        }}>
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:12 }}>
            Puas belanja di Saleem.id? Ajak temanmu dan dapat bonus!
          </p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {["WhatsApp","Telegram","Instagram","Twitter"].map(s => (
              <button key={s} style={{
                padding:"7px 16px",
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                background:"none", borderRadius:20, cursor:"pointer",
                fontSize:12, fontWeight:600, color:dm?"#94a3b8":"#475569"
              }}>Share ke {s}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ORDER HISTORY PAGE ──────────────────────────────────────
export const OrdersPage = ({ onNavigate, dm }) => {
  const [filter, setFilter] = useState("Semua");
  const [expanded, setExpanded] = useState(null);

  const statusList = ["Semua","Diproses","Dikirim","Selesai","Dibatalkan"];

  const orders = [
    {
      id:"SLD-ABC123", date:"15 Mei 2026", product:LAPTOPS[0],
      total:LAPTOPS[0].price, status:"Selesai", statusColor:"#10b981",
      tracking:"JNE-001234567890", courier:"JNE Express"
    },
    {
      id:"SLD-DEF456", date:"28 Apr 2026", product:LAPTOPS[1],
      total:LAPTOPS[1].price, status:"Dikirim", statusColor:"#f59e0b",
      tracking:"SICEPAT-9876543210", courier:"SiCepat Ekspres"
    },
    {
      id:"SLD-GHI789", date:"02 Apr 2026", product:LAPTOPS[2],
      total:LAPTOPS[2].price, status:"Diproses", statusColor:"#3b82f6",
      tracking:"—", courier:"Menunggu pickup"
    },
    {
      id:"SLD-JKL012", date:"10 Mar 2026", product:LAPTOPS[4],
      total:LAPTOPS[4].price, status:"Selesai", statusColor:"#10b981",
      tracking:"ANTERAJA-1122334455", courier:"Anteraja"
    },
    {
      id:"SLD-MNO345", date:"20 Feb 2026", product:LAPTOPS[6],
      total:LAPTOPS[6].price, status:"Dibatalkan", statusColor:"#ef4444",
      tracking:"—", courier:"—"
    },
  ];

  const filtered = filter === "Semua" ? orders : orders.filter(o => o.status === filter);

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <Breadcrumb items={["Home","Riwayat Pesanan"]} onNavigate={onNavigate} dm={dm} />
        <h1 style={{ fontSize:24, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
          Riwayat Pesanan
        </h1>
        <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>
          Pantau semua pesananmu di satu tempat
        </p>

        {/* Stats row */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",
          gap:12, marginBottom:28
        }}>
          {[
            { label:"Total Pesanan", value:orders.length, color:"#2563eb" },
            { label:"Selesai",       value:orders.filter(o=>o.status==="Selesai").length,    color:"#10b981" },
            { label:"Sedang Proses", value:orders.filter(o=>o.status==="Diproses"||o.status==="Dikirim").length, color:"#f59e0b" },
            { label:"Dibatalkan",    value:orders.filter(o=>o.status==="Dibatalkan").length, color:"#ef4444" },
          ].map(s => (
            <div key={s.label} style={{
              padding:"16px 14px", borderRadius:14, textAlign:"center",
              background:dm?"#1e293b":"#fff",
              border:`1px solid ${dm?"#334155":"#e2e8f0"}`
            }}>
              <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
          {statusList.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding:"8px 18px", borderRadius:20, fontWeight:700, fontSize:13, cursor:"pointer",
              border:`1.5px solid ${filter===s?"#2563eb":dm?"#334155":"#e2e8f0"}`,
              background: filter===s?"linear-gradient(135deg,#2563eb,#3b82f6)":"none",
              color: filter===s?"#fff":dm?"#94a3b8":"#475569"
            }}>{s}</button>
          ))}
        </div>

        {/* Order list */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map(o => {
            const isExpanded = expanded === o.id;
            return (
              <div key={o.id} style={{
                background:dm?"#1e293b":"#fff", borderRadius:18,
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,.04)"
              }}>
                {/* Header */}
                <div style={{ padding:"18px 20px", display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
                  <div style={{ flex:1, minWidth:180 }}>
                    <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>Nomor Pesanan</div>
                    <div style={{
                      fontSize:15, fontWeight:800, color:"#2563eb",
                      fontFamily:"monospace", letterSpacing:".04em"
                    }}>{o.id}</div>
                  </div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>{o.date}</div>
                  <span style={{
                    background:`${o.statusColor}20`, color:o.statusColor,
                    padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:700
                  }}>{o.status}</span>
                </div>

                {/* Product row */}
                <div style={{
                  padding:"0 20px 18px",
                  borderTop:`1px solid ${dm?"#334155":"#f1f5f9"}`
                }}>
                  <div style={{ display:"flex", gap:14, alignItems:"center", paddingTop:16, flexWrap:"wrap" }}>
                    <img src={o.product.img} alt={o.product.name}
                      style={{ width:70, height:54, objectFit:"cover", borderRadius:10, flexShrink:0 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:dm?"#e2e8f0":"#0f172a", marginBottom:4 }}>
                        {o.product.name}
                      </div>
                      <div style={{ fontSize:12, color:"#94a3b8" }}>
                        {o.product.brand} · {o.product.category}
                      </div>
                    </div>
                    <div style={{ fontWeight:800, fontSize:17, color:"#1d4ed8" }}>
                      {formatPrice(o.total)}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{
                      marginTop:16, padding:14,
                      background:dm?"#0f172a":"#f8fafc", borderRadius:12
                    }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                        {[
                          ["Kurir", o.courier],
                          ["No. Resi", o.tracking],
                          ["Pembayaran", "Transfer Bank"],
                          ["Garansi", "1 Tahun Resmi"],
                        ].map(([k,v]) => (
                          <div key={k}>
                            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:3 }}>{k}</div>
                            <div style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                    <button onClick={() => setExpanded(isExpanded?null:o.id)} style={{
                      padding:"7px 16px", borderRadius:9,
                      border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                      background:"none", color:dm?"#94a3b8":"#475569",
                      fontSize:12, fontWeight:600, cursor:"pointer"
                    }}>{isExpanded?"Sembunyikan ↑":"Detail ↓"}</button>

                    {o.status === "Dikirim" && (
                      <button style={{
                        padding:"7px 16px", borderRadius:9, border:"none",
                        background:"#eff6ff", color:"#2563eb",
                        fontSize:12, fontWeight:700, cursor:"pointer"
                      }}>📍 Lacak Pengiriman</button>
                    )}

                    {o.status === "Selesai" && (
                      <>
                        <button style={{
                          padding:"7px 16px", borderRadius:9, border:"none",
                          background:"#eff6ff", color:"#2563eb",
                          fontSize:12, fontWeight:700, cursor:"pointer"
                        }}>⭐ Beri Ulasan</button>
                        <button onClick={() => { /* add to cart */ onNavigate("catalog"); }} style={{
                          padding:"7px 16px", borderRadius:9, border:"none",
                          background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                          color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer"
                        }}>🔁 Beli Lagi</button>
                      </>
                    )}

                    {o.status === "Diproses" && (
                      <button style={{
                        padding:"7px 16px", borderRadius:9,
                        border:"1px solid #fee2e2", background:"none",
                        color:"#ef4444", fontSize:12, fontWeight:600, cursor:"pointer"
                      }}>❌ Batalkan</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:60, color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
              <p>Tidak ada pesanan dengan status "{filter}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── WISHLIST PAGE ───────────────────────────────────────────
export const WishlistPage = ({ wishlist, onNavigate, onAddToCart, onWishlist, dm }) => {
  const [sortBy, setSortBy] = useState("default");
  const items = LAPTOPS.filter(l => wishlist.includes(l.id));

  let sorted = [...items];
  if (sortBy === "priceLow")  sorted.sort((a,b) => a.price - b.price);
  if (sortBy === "priceHigh") sorted.sort((a,b) => b.price - a.price);
  if (sortBy === "rating")    sorted.sort((a,b) => b.rating - a.rating);

  const totalSaved = items.reduce((s,l) => s + (l.originalPrice - l.price), 0);

  if (items.length === 0) return (
    <div style={{
      background:dm?"#0f172a":"#f8fafc", minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:18
    }}>
      <div style={{ fontSize:80 }}>❤️</div>
      <h2 style={{ fontSize:24, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>
        Wishlistmu Kosong
      </h2>
      <p style={{ color:"#94a3b8", fontSize:14, textAlign:"center", maxWidth:320, lineHeight:1.7 }}>
        Simpan laptop yang kamu suka dengan menekan ikon ❤️ di setiap produk. Mereka akan tersimpan di sini!
      </p>
      <button onClick={() => onNavigate("catalog")} style={{
        background:"linear-gradient(135deg,#2563eb,#3b82f6)",
        color:"#fff", border:"none", borderRadius:12,
        padding:"13px 30px", fontSize:15, fontWeight:700, cursor:"pointer"
      }}>Temukan Laptop Impianmu →</button>
    </div>
  );

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Breadcrumb items={["Home","Wishlist"]} onNavigate={onNavigate} dm={dm} />

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
              Wishlist Saya ❤️
            </h1>
            <p style={{ fontSize:13, color:"#94a3b8" }}>
              {items.length} produk tersimpan
            </p>
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            padding:"9px 14px", borderRadius:9,
            border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
            background:dm?"#1e293b":"#fff", color:dm?"#e2e8f0":"#374151",
            fontSize:13, outline:"none"
          }}>
            <option value="default">Urutan Default</option>
            <option value="priceLow">Harga Terendah</option>
            <option value="priceHigh">Harga Tertinggi</option>
            <option value="rating">Rating Terbaik</option>
          </select>
        </div>

        {/* Savings banner */}
        <div style={{
          background:"linear-gradient(135deg,#fdf2f8,#fce7f3)",
          border:"1px solid #fbcfe8", borderRadius:14, padding:"14px 20px",
          marginBottom:28, display:"flex", alignItems:"center", gap:14
        }}>
          <span style={{ fontSize:28 }}>💰</span>
          <div>
            <div style={{ fontWeight:700, fontSize:14, color:"#be185d" }}>
              Kamu bisa hemat hingga {formatPrice(totalSaved)}!
            </div>
            <div style={{ fontSize:12, color:"#9d174d", marginTop:2 }}>
              Beli semua item wishlistmu sekarang dan nikmati diskon terbaik.
            </div>
          </div>
          <button onClick={() => items.forEach(l => onAddToCart(l))} style={{
            marginLeft:"auto", background:"linear-gradient(135deg,#db2777,#ec4899)",
            color:"#fff", border:"none", borderRadius:10,
            padding:"10px 20px", fontSize:13, fontWeight:700,
            cursor:"pointer", flexShrink:0
          }}>Tambah Semua ke Keranjang</button>
        </div>

        {/* Grid */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
          gap:22
        }}>
          {sorted.map(l => (
            <div key={l.id} style={{ position:"relative" }}>
              <ProductCard
                laptop={l}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
                wishlist={wishlist}
              />
              {/* Remove from wishlist overlay hint */}
              <div style={{
                position:"absolute", top:52, right:10,
                fontSize:10, color:"#94a3b8", background:dm?"rgba(15,23,42,.8)":"rgba(255,255,255,.9)",
                padding:"2px 7px", borderRadius:10, pointerEvents:"none"
              }}>Klik ❤️ untuk hapus</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign:"center", marginTop:40 }}>
          <p style={{ fontSize:14, color:"#94a3b8", marginBottom:16 }}>
            Temukan lebih banyak laptop impianmu
          </p>
          <button onClick={() => onNavigate("catalog")} style={{
            background:"none", border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
            color:dm?"#e2e8f0":"#374151", borderRadius:12,
            padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer"
          }}>Jelajahi Semua Produk →</button>
        </div>
      </div>
    </div>
  );
};
