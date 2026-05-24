// ============================================================
//  SALEEM.ID — ORANG 2
//  Interface: Product Catalog · Product Detail · Search Result
// ============================================================
import { useState } from "react";
import { LAPTOPS, BRANDS, CATEGORIES, formatPrice } from "../shared/shared_data";
import { Icon, Stars, Badge, ProductCard, Breadcrumb, AuthInput, SectionTitle, FilterSection, FilterBtn } from "../shared/shared_components";

// ─── PRODUCT CATALOG PAGE ────────────────────────────────────
export const CatalogPage = ({ onNavigate, onAddToCart, onWishlist, wishlist, dm }) => {
  const [brand,    setBrand]    = useState("All");
  const [category, setCategory] = useState("All");
  const [sort,     setSort]     = useState("featured");
  const [priceMax, setPriceMax] = useState(65000000);
  const [viewMode, setViewMode] = useState("grid");

  let filtered = LAPTOPS.filter(l =>
    (brand    === "All" || l.brand    === brand)    &&
    (category === "All" || l.category === category) &&
    l.price <= priceMax
  );
  if (sort === "priceLow")  filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sort === "priceHigh") filtered = [...filtered].sort((a,b) => b.price - a.price);
  if (sort === "rating")    filtered = [...filtered].sort((a,b) => b.rating - a.rating);
  if (sort === "newest")    filtered = [...filtered].sort((a,b) => b.id - a.id);

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>

        {/* Page header */}
        <Breadcrumb items={["Home","Semua Laptop"]} onNavigate={onNavigate} dm={dm} />
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
            Semua Laptop 2025
          </h1>
          <p style={{ fontSize:13, color:"#94a3b8" }}>
            {filtered.length} produk ditemukan · Harga terbaik, garansi resmi
          </p>
        </div>

        <div style={{ display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* ── Sidebar Filter ── */}
          <div style={{ width:224, flexShrink:0 }}>

            {/* Active filters chips */}
            {(brand !== "All" || category !== "All") && (
              <div style={{ marginBottom:14, display:"flex", gap:6, flexWrap:"wrap" }}>
                {brand !== "All" && (
                  <span style={{
                    background:"#eff6ff", color:"#2563eb", fontSize:12, fontWeight:700,
                    padding:"3px 10px", borderRadius:20, display:"flex", alignItems:"center", gap:6
                  }}>
                    {brand}
                    <button onClick={() => setBrand("All")} style={{
                      background:"none", border:"none", color:"#2563eb",
                      cursor:"pointer", fontWeight:900, padding:0, lineHeight:1
                    }}>×</button>
                  </span>
                )}
                {category !== "All" && (
                  <span style={{
                    background:"#f0fdf4", color:"#16a34a", fontSize:12, fontWeight:700,
                    padding:"3px 10px", borderRadius:20, display:"flex", alignItems:"center", gap:6
                  }}>
                    {category}
                    <button onClick={() => setCategory("All")} style={{
                      background:"none", border:"none", color:"#16a34a",
                      cursor:"pointer", fontWeight:900, padding:0, lineHeight:1
                    }}>×</button>
                  </span>
                )}
              </div>
            )}

            <FilterSection title="Brand" dm={dm}>
              {BRANDS.map(b => (
                <FilterBtn key={b} label={b} active={brand===b}
                  onClick={() => setBrand(b)} dm={dm} />
              ))}
            </FilterSection>

            <FilterSection title="Kategori" dm={dm}>
              {CATEGORIES.map(c => (
                <FilterBtn key={c} label={c} active={category===c}
                  onClick={() => setCategory(c)} dm={dm} />
              ))}
            </FilterSection>

            <FilterSection title="Harga Maksimum" dm={dm}>
              <input type="range" min={5000000} max={65000000} step={1000000}
                value={priceMax}
                onChange={e => setPriceMax(+e.target.value)}
                style={{ width:"100%", accentColor:"#2563eb" }}
              />
              <div style={{
                display:"flex", justifyContent:"space-between",
                fontSize:12, color:"#94a3b8", marginTop:8
              }}>
                <span>Rp 5 Jt</span>
                <span style={{ fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>
                  {formatPrice(priceMax)}
                </span>
              </div>
            </FilterSection>

            {/* In-stock toggle */}
            <div style={{
              background:dm?"#1e293b":"#fff", borderRadius:12, padding:16,
              border:`1px solid ${dm?"#334155":"#e2e8f0"}`
            }}>
              <div style={{ fontSize:13, fontWeight:700, color:dm?"#94a3b8":"#374151", marginBottom:10, textTransform:"uppercase", letterSpacing:".05em" }}>
                Ketersediaan
              </div>
              {["Semua","Tersedia","Habis"].map(s => (
                <FilterBtn key={s} label={s} active={false} onClick={()=>{}} dm={dm} />
              ))}
            </div>
          </div>

          {/* ── Product Grid ── */}
          <div style={{ flex:1, minWidth:0 }}>

            {/* Toolbar */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:10
            }}>
              <span style={{ fontSize:13, color:"#94a3b8" }}>
                Menampilkan <strong style={{ color:dm?"#e2e8f0":"#0f172a" }}>{filtered.length}</strong> produk
              </span>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                {/* View toggle */}
                <div style={{
                  display:"flex", border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                  borderRadius:8, overflow:"hidden"
                }}>
                  {["grid","list"].map(v => (
                    <button key={v} onClick={() => setViewMode(v)} style={{
                      padding:"7px 12px", background: viewMode===v
                        ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "none",
                      border:"none", cursor:"pointer",
                      color: viewMode===v ? "#fff" : "#94a3b8", fontSize:13
                    }}>
                      {v === "grid" ? "⊞" : "☰"}
                    </button>
                  ))}
                </div>

                <select value={sort} onChange={e => setSort(e.target.value)} style={{
                  padding:"8px 14px", borderRadius:9,
                  border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                  background:dm?"#1e293b":"#fff", color:dm?"#e2e8f0":"#374151",
                  fontSize:13, outline:"none"
                }}>
                  <option value="featured">Unggulan</option>
                  <option value="newest">Terbaru</option>
                  <option value="priceLow">Harga: Rendah ke Tinggi</option>
                  <option value="priceHigh">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:80, color:"#94a3b8" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                <h3 style={{ fontSize:18, color:dm?"#e2e8f0":"#374151", marginBottom:8 }}>
                  Tidak ada produk
                </h3>
                <p>Coba ubah filter pencarian</p>
                <button onClick={() => { setBrand("All"); setCategory("All"); setPriceMax(65000000); }} style={{
                  marginTop:16, background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                  color:"#fff", border:"none", borderRadius:10,
                  padding:"10px 22px", fontWeight:700, cursor:"pointer"
                }}>Reset Filter</button>
              </div>
            ) : viewMode === "grid" ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
                {filtered.map(l => (
                  <ProductCard key={l.id} laptop={l} onNavigate={onNavigate}
                    onAddToCart={onAddToCart} onWishlist={onWishlist} wishlist={wishlist} />
                ))}
              </div>
            ) : (
              /* List view */
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {filtered.map(l => {
                  const disc = Math.round((1 - l.price/l.originalPrice)*100);
                  return (
                    <div key={l.id} style={{
                      display:"flex", gap:16, background:dm?"#1e293b":"#fff",
                      borderRadius:14, overflow:"hidden",
                      border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                      boxShadow:"0 2px 8px rgba(0,0,0,.04)"
                    }}>
                      <img src={l.img} alt={l.name} style={{
                        width:140, height:110, objectFit:"cover", flexShrink:0
                      }} />
                      <div style={{ padding:"14px 16px 14px 0", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                        <div>
                          <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, marginBottom:4 }}>
                            {l.brand} · {l.category}
                          </div>
                          <div style={{ fontSize:15, fontWeight:700, color:dm?"#e2e8f0":"#0f172a", marginBottom:6 }}>
                            {l.name}
                          </div>
                          <Stars rating={l.rating} />
                        </div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10, flexWrap:"wrap", gap:8 }}>
                          <div>
                            <span style={{ fontSize:18, fontWeight:800, color:"#1d4ed8" }}>
                              {formatPrice(l.price)}
                            </span>
                            <span style={{ fontSize:12, color:"#94a3b8", textDecoration:"line-through", marginLeft:8 }}>
                              {formatPrice(l.originalPrice)}
                            </span>
                            <span style={{ fontSize:12, color:"#10b981", fontWeight:700, marginLeft:6 }}>
                              -{disc}%
                            </span>
                          </div>
                          <div style={{ display:"flex", gap:8 }}>
                            <button onClick={() => onNavigate("product", l)} style={{
                              padding:"8px 16px", borderRadius:9,
                              border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                              background:"none", color:dm?"#e2e8f0":"#374151",
                              fontSize:13, fontWeight:600, cursor:"pointer"
                            }}>Detail</button>
                            <button onClick={() => onAddToCart(l)} style={{
                              padding:"8px 16px", borderRadius:9, border:"none",
                              background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                              color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer"
                            }}>+ Keranjang</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────
export const ProductDetailPage = ({ product, onAddToCart, onNavigate, onWishlist, wishlist, dm }) => {
  const [qty,      setQty]      = useState(1);
  const [tab,      setTab]      = useState("specs");
  const [imgIdx,   setImgIdx]   = useState(0);
  const [reviewed, setReviewed] = useState(false);

  const p        = product || LAPTOPS[0];
  const isWished = wishlist.includes(p.id);
  const discount = Math.round((1 - p.price/p.originalPrice)*100);

  /* Extra product images – cycle same img for demo */
  const images = [p.img, p.img, p.img];

  const reviews = [
    { name:"Budi S.",     avatar:"B", rating:5, date:"Jan 2026",  verified:true,
      text:"Laptop gaming terbaik yang pernah saya beli! Performa RTX 5080-nya luar biasa untuk render 3D dan gaming 4K. Build quality premium banget." },
    { name:"Dewi R.",     avatar:"D", rating:4, date:"Des 2025",  verified:true,
      text:"Sangat puas! Harga sesuai spek. Pengiriman cepat, pengemasan aman. Satu-satunya kekurangan, baterainya agak boros saat gaming." },
    { name:"Arif M.",     avatar:"A", rating:5, date:"Nov 2025",  verified:false,
      text:"Recommended banget untuk kreator konten dan gamer. Display OLED-nya tajam dan warnanya akurat." },
    { name:"Sinta W.",    avatar:"S", rating:4, date:"Okt 2025",  verified:true,
      text:"Fast response dari CS Saleem.id, produk original sesuai deskripsi. Beli lagi pasti!" },
  ];

  const related = LAPTOPS.filter(l => l.category === p.category && l.id !== p.id).slice(0, 4);

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <Breadcrumb items={["Home","Produk",p.brand,p.name]} onNavigate={onNavigate} dm={dm} />

        <div style={{ display:"flex", gap:36, flexWrap:"wrap", marginBottom:44 }}>

          {/* ── Left: Gallery ── */}
          <div style={{ flex:"0 0 420px", maxWidth:"100%" }}>
            <div style={{
              background:dm?"#1e293b":"#fff", borderRadius:20, overflow:"hidden",
              aspectRatio:"4/3", border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
              position:"relative"
            }}>
              {p.badge && (
                <div style={{ position:"absolute", top:14, left:14, zIndex:2 }}>
                  <Badge text={p.badge} />
                </div>
              )}
              <img src={images[imgIdx]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            {/* Thumbnail strip */}
            <div style={{ display:"flex", gap:10, marginTop:12 }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  width:72, height:54, borderRadius:10, overflow:"hidden", cursor:"pointer",
                  border:`2px solid ${imgIdx===i?"#2563eb":dm?"#334155":"#e2e8f0"}`,
                  padding:0, background:"none"
                }}>
                  <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              <Badge text={p.badge || "Featured"} />
              {!p.inStock && (
                <span style={{
                  background:"#fee2e2", color:"#dc2626", fontSize:11,
                  fontWeight:700, padding:"2px 10px", borderRadius:20
                }}>STOK HABIS</span>
              )}
              {p.inStock && (
                <span style={{
                  background:"#dcfce7", color:"#16a34a", fontSize:11,
                  fontWeight:700, padding:"2px 10px", borderRadius:20
                }}>✓ TERSEDIA</span>
              )}
            </div>

            <h1 style={{ fontSize:22, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:10, lineHeight:1.3 }}>
              {p.name}
            </h1>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:4 }}>
              <Stars rating={p.rating} />
              <span style={{ fontSize:12, color:"#94a3b8" }}>
                {p.reviews} ulasan · {p.sold.toLocaleString()} terjual
              </span>
            </div>

            {/* Price box */}
            <div style={{
              margin:"18px 0", padding:20,
              background:dm?"#1e293b":"#fff",
              borderRadius:14, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
            }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, flexWrap:"wrap" }}>
                <span style={{ fontSize:28, fontWeight:900, color:"#1d4ed8" }}>
                  {formatPrice(p.price)}
                </span>
                <span style={{ fontSize:14, color:"#94a3b8", textDecoration:"line-through" }}>
                  {formatPrice(p.originalPrice)}
                </span>
                <span style={{
                  background:"#dcfce7", color:"#16a34a",
                  fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20
                }}>Hemat {discount}%</span>
              </div>
              <p style={{ fontSize:12, color:"#94a3b8", marginTop:6 }}>
                Sudah termasuk pajak & garansi resmi 1 tahun
              </p>
              {/* Installment hint */}
              <div style={{
                marginTop:10, padding:"8px 12px",
                background:dm?"#0f172a":"#eff6ff", borderRadius:8
              }}>
                <span style={{ fontSize:12, color:"#2563eb", fontWeight:600 }}>
                  💳 Cicilan 0% mulai {formatPrice(Math.round(p.price/12))}/bln (12 bulan)
                </span>
              </div>
            </div>

            {/* Specs grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:20 }}>
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} style={{
                  padding:"10px 12px",
                  background:dm?"#1e293b":"#fff",
                  borderRadius:10, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
                }}>
                  <div style={{ fontSize:9, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".07em", marginBottom:3 }}>
                    {k}
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Qty + wishlist */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{
                display:"flex", alignItems:"center",
                border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                borderRadius:10, overflow:"hidden"
              }}>
                <button onClick={() => setQty(q => Math.max(1,q-1))} style={{
                  padding:"9px 16px", background:"none", border:"none",
                  cursor:"pointer", color:dm?"#e2e8f0":"#374151", fontSize:18
                }}>−</button>
                <span style={{
                  padding:"9px 18px", fontSize:15, fontWeight:700,
                  color:dm?"#e2e8f0":"#0f172a",
                  borderLeft:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                  borderRight:`1px solid ${dm?"#334155":"#e2e8f0"}`
                }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{
                  padding:"9px 16px", background:"none", border:"none",
                  cursor:"pointer", color:dm?"#e2e8f0":"#374151", fontSize:18
                }}>+</button>
              </div>
              <button onClick={() => onWishlist(p.id)} style={{
                padding:"10px 12px", borderRadius:10,
                border:`1.5px solid ${isWished?"#ef4444":dm?"#334155":"#e2e8f0"}`,
                background: isWished?"#fee2e2":"none",
                cursor:"pointer", color:isWished?"#ef4444":"#94a3b8",
                display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600
              }}>
                <Icon name="heart" size={16} /> {isWished?"Wishlisted":"Wishlist"}
              </button>
            </div>

            {/* CTA buttons */}
            <div style={{ display:"flex", gap:10 }}>
              <button
                onClick={() => { for(let i=0;i<qty;i++) onAddToCart(p); onNavigate("cart"); }}
                disabled={!p.inStock}
                style={{
                  flex:1, padding:"14px", borderRadius:12, border:"none",
                  cursor:p.inStock?"pointer":"not-allowed",
                  background:p.inStock?"linear-gradient(135deg,#2563eb,#3b82f6)":"#e2e8f0",
                  color:p.inStock?"#fff":"#9ca3af", fontSize:15, fontWeight:700
                }}>
                {p.inStock ? "Beli Sekarang" : "Stok Habis"}
              </button>
              <button onClick={() => { for(let i=0;i<qty;i++) onAddToCart(p); }} disabled={!p.inStock} style={{
                padding:"14px 18px", borderRadius:12,
                border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                background:"none", cursor:"pointer",
                color:dm?"#e2e8f0":"#374151", fontSize:14, fontWeight:600,
                display:"flex", alignItems:"center", gap:7
              }}>
                <Icon name="cart" size={16} /> Keranjang
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display:"flex", gap:12, marginTop:18, flexWrap:"wrap" }}>
              {["✅ Garansi 1 Tahun","🚚 Gratis Ongkir","🔒 Bayar Aman","↩️ Retur 14 Hari"].map(t => (
                <span key={t} style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Specs / Reviews ── */}
        <div style={{
          background:dm?"#1e293b":"#fff", borderRadius:18,
          border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
          overflow:"hidden", marginBottom:44
        }}>
          <div style={{ display:"flex", borderBottom:`1px solid ${dm?"#334155":"#e2e8f0"}` }}>
            {["specs","reviews","delivery"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding:"15px 28px", background:tab===t
                  ? "linear-gradient(135deg,#eff6ff,#dbeafe)":"none",
                border:"none", cursor:"pointer", fontSize:14, fontWeight:700,
                color:tab===t?"#2563eb":dm?"#94a3b8":"#6b7280",
                textTransform:"capitalize",
                borderBottom:`2.5px solid ${tab===t?"#2563eb":"transparent"}`
              }}>
                {t==="specs"?"Spesifikasi":t==="reviews"?"Ulasan":"Pengiriman"}
              </button>
            ))}
          </div>

          <div style={{ padding:28 }}>
            {tab === "specs" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14 }}>
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} style={{
                    padding:"14px 18px",
                    background:dm?"#0f172a":"#f8fafc", borderRadius:12
                  }}>
                    <div style={{ fontSize:11, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>
                      {k}
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:dm?"#e2e8f0":"#0f172a" }}>{v}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div>
                {/* Summary */}
                <div style={{ display:"flex", gap:24, marginBottom:28, flexWrap:"wrap" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:52, fontWeight:900, color:"#f59e0b" }}>{p.rating}</div>
                    <Stars rating={p.rating} />
                    <div style={{ fontSize:12, color:"#94a3b8", marginTop:4 }}>
                      dari {p.reviews} ulasan
                    </div>
                  </div>
                  <div style={{ flex:1, minWidth:200 }}>
                    {[5,4,3,2,1].map(star => (
                      <div key={star} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:12, color:"#94a3b8", width:10 }}>{star}</span>
                        <span style={{ fontSize:12 }}>★</span>
                        <div style={{
                          flex:1, height:7, borderRadius:4,
                          background:dm?"#334155":"#e2e8f0", overflow:"hidden"
                        }}>
                          <div style={{
                            height:"100%", borderRadius:4, background:"#f59e0b",
                            width: star===5?"70%":star===4?"20%":star===3?"6%":"2%"
                          }} />
                        </div>
                        <span style={{ fontSize:12, color:"#94a3b8" }}>
                          {star===5?"70%":star===4?"20%":star===3?"6%":star===2?"2%":"2%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {reviews.map((r, i) => (
                    <div key={i} style={{
                      padding:18, background:dm?"#0f172a":"#f8fafc",
                      borderRadius:14, border:`1px solid ${dm?"#334155":"#e2e8f0"}`
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                        <div style={{
                          width:38, height:38, borderRadius:50,
                          background:"linear-gradient(135deg,#2563eb,#06b6d4)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff", fontWeight:700, fontSize:14, flexShrink:0
                        }}>{r.avatar}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontWeight:700, fontSize:13, color:dm?"#e2e8f0":"#0f172a" }}>
                              {r.name}
                            </span>
                            {r.verified && (
                              <span style={{
                                background:"#dcfce7", color:"#16a34a",
                                fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:20
                              }}>✓ Verified</span>
                            )}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:2 }}>
                            <Stars rating={r.rating} />
                            <span style={{ fontSize:11, color:"#94a3b8" }}>{r.date}</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:dm?"#94a3b8":"#475569", lineHeight:1.75 }}>{r.text}</p>
                    </div>
                  ))}
                </div>

                {!reviewed && (
                  <button onClick={() => setReviewed(true)} style={{
                    marginTop:20, background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                    color:"#fff", border:"none", borderRadius:10,
                    padding:"11px 24px", fontWeight:700, cursor:"pointer"
                  }}>Tulis Ulasan</button>
                )}
                {reviewed && (
                  <div style={{
                    marginTop:20, padding:20,
                    background:dm?"#1e293b":"#fff", borderRadius:14,
                    border:`1px solid ${dm?"#334155":"#e2e8f0"}`
                  }}>
                    <p style={{ fontSize:13, fontWeight:700, color:dm?"#e2e8f0":"#0f172a", marginBottom:10 }}>
                      Tulis Ulasan Anda
                    </p>
                    <textarea rows={3} placeholder="Bagikan pengalaman Anda..." style={{
                      width:"100%", padding:"10px 14px", borderRadius:10,
                      border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`,
                      background:dm?"#0f172a":"#f8fafc", color:dm?"#f1f5f9":"#0f172a",
                      fontSize:13, resize:"vertical", boxSizing:"border-box"
                    }} />
                    <button onClick={() => setReviewed(false)} style={{
                      marginTop:10, background:"linear-gradient(135deg,#10b981,#059669)",
                      color:"#fff", border:"none", borderRadius:9,
                      padding:"10px 22px", fontWeight:700, cursor:"pointer"
                    }}>Kirim Ulasan</button>
                  </div>
                )}
              </div>
            )}

            {tab === "delivery" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  { icon:"🚚", title:"Gratis Ongkir", desc:"Berlaku untuk pembelian di atas Rp 500.000 ke seluruh Indonesia." },
                  { icon:"⚡", title:"Same-Day Delivery", desc:"Pesan sebelum pukul 13.00 WIB, tiba hari ini (Jakarta, Surabaya, Bandung)." },
                  { icon:"📦", title:"Pengemasan Aman", desc:"Dikemas dengan foam anti-guncangan dan pelindung sudut khusus laptop." },
                  { icon:"↩️",  title:"Retur 14 Hari",  desc:"Tidak puas? Kembalikan dalam 14 hari tanpa biaya apapun." },
                ].map(d => (
                  <div key={d.title} style={{
                    display:"flex", gap:16, padding:18,
                    background:dm?"#0f172a":"#f8fafc", borderRadius:12
                  }}>
                    <div style={{ fontSize:28 }}>{d.icon}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:dm?"#e2e8f0":"#0f172a", marginBottom:4 }}>
                        {d.title}
                      </div>
                      <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.65 }}>{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <>
            <SectionTitle title="Produk Serupa" sub="" dm={dm} action={() => onNavigate("catalog")} />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
              {related.map(l => (
                <ProductCard key={l.id} laptop={l} onNavigate={onNavigate}
                  onAddToCart={onAddToCart} onWishlist={onWishlist} wishlist={wishlist} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── SEARCH RESULT PAGE ──────────────────────────────────────
export const SearchPage = ({ query, onNavigate, onAddToCart, onWishlist, wishlist, dm }) => {
  const [sort, setSort] = useState("relevance");
  const q = (query || "").toLowerCase().trim();

  const score = l => {
    let s = 0;
    if (l.name.toLowerCase().includes(q))     s += 3;
    if (l.brand.toLowerCase().includes(q))    s += 2;
    if (l.category.toLowerCase().includes(q)) s += 1;
    Object.values(l.specs).forEach(v => { if (v.toLowerCase().includes(q)) s += 1; });
    return s;
  };

  let results = q ? LAPTOPS.filter(l => score(l) > 0) : [...LAPTOPS];
  if (sort === "priceLow")  results = [...results].sort((a,b) => a.price - b.price);
  if (sort === "priceHigh") results = [...results].sort((a,b) => b.price - a.price);
  if (sort === "rating")    results = [...results].sort((a,b) => b.rating - a.rating);
  if (sort === "relevance") results = [...results].sort((a,b) => score(b) - score(a));

  const suggestions = ["ASUS ROG","MacBook M4","ThinkPad","RTX 5080","Ultrabook","Gaming","Creator"];

  return (
    <div style={{ background:dm?"#0f172a":"#f8fafc", minHeight:"100vh", padding:"32px 20px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <button onClick={() => onNavigate("home")} style={{
              background:"none", border:"none", color:"#94a3b8",
              cursor:"pointer", fontSize:13, fontWeight:600
            }}>← Kembali</button>
          </div>
          <h1 style={{ fontSize:24, fontWeight:800, color:dm?"#f1f5f9":"#0f172a", marginBottom:6 }}>
            {q
              ? <>Hasil pencarian untuk <span style={{ color:"#2563eb" }}>"{query}"</span></>
              : "Semua Produk"}
          </h1>
          <p style={{ fontSize:13, color:"#94a3b8" }}>
            {results.length} produk ditemukan
          </p>
        </div>

        {/* Suggestion chips */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, color:"#94a3b8", marginBottom:10, fontWeight:600 }}>
            Pencarian populer:
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => onNavigate("search", { query:s })} style={{
                padding:"6px 14px", borderRadius:20,
                border:`1.5px solid ${q===s.toLowerCase()?"#2563eb":dm?"#334155":"#e2e8f0"}`,
                background:q===s.toLowerCase()?"#eff6ff":"none",
                color:q===s.toLowerCase()?"#2563eb":dm?"#94a3b8":"#475569",
                fontSize:12, fontWeight:600, cursor:"pointer"
              }}>{s}</button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🔍</div>
            <h2 style={{ fontSize:22, fontWeight:700, color:dm?"#e2e8f0":"#0f172a", marginBottom:8 }}>
              Tidak ada hasil untuk "{query}"
            </h2>
            <p style={{ color:"#94a3b8", marginBottom:24, lineHeight:1.7 }}>
              Coba periksa ejaan atau gunakan kata kunci lain.<br />
              Misalnya: nama brand, kategori, atau spesifikasi.
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => onNavigate("catalog")} style={{
                background:"linear-gradient(135deg,#2563eb,#3b82f6)", color:"#fff",
                border:"none", borderRadius:12, padding:"12px 24px",
                fontWeight:700, cursor:"pointer"
              }}>Lihat Semua Produk</button>
              <button onClick={() => onNavigate("home")} style={{
                border:`1.5px solid ${dm?"#334155":"#e2e8f0"}`, background:"none",
                color:dm?"#e2e8f0":"#374151", borderRadius:12, padding:"12px 24px",
                fontWeight:700, cursor:"pointer"
              }}>Kembali ke Beranda</button>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:10
            }}>
              <span style={{ fontSize:13, color:"#94a3b8" }}>
                Menampilkan <strong style={{ color:dm?"#e2e8f0":"#0f172a" }}>{results.length}</strong> hasil
              </span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{
                padding:"8px 14px", borderRadius:9,
                border:`1px solid ${dm?"#334155":"#e2e8f0"}`,
                background:dm?"#1e293b":"#fff", color:dm?"#e2e8f0":"#374151",
                fontSize:13, outline:"none"
              }}>
                <option value="relevance">Relevansi</option>
                <option value="priceLow">Harga: Rendah ke Tinggi</option>
                <option value="priceHigh">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
              {results.map(l => (
                <ProductCard key={l.id} laptop={l} onNavigate={onNavigate}
                  onAddToCart={onAddToCart} onWishlist={onWishlist} wishlist={wishlist} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
