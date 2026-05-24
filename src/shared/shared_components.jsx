// ============================================================
//  LAPSTORE — SHARED COMPONENTS
//  Digunakan oleh semua orang (1–5)
// ============================================================
import { useState } from "react";
import { formatPrice } from "./shared_data";

// ─── ICON ────────────────────────────────────────────────────
export const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    search:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    cart:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    heart:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    star:         <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    user:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    menu:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x:            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="15 18 9 12 15 6"/></svg>,
    package:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    tag:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    help:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    logout:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    shield:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    truck:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    zap:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    trash:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    plus:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    minus:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    home:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    grid:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    arrowRight:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    edit:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    message:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    phone:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.53 2 2 0 0 1 3.62 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.15 6.15l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    settings:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    bell:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    mail:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    globe:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    award:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  };
  return icons[name] || null;
};

// ─── STARS ───────────────────────────────────────────────────
export const Stars = ({ rating }) => (
  <div style={{ display:"flex", alignItems:"center", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= Math.floor(rating) ? "#f59e0b" : "#d1d5db", fontSize:12 }}>★</span>
    ))}
    <span style={{ fontSize:12, color:"#6b7280", marginLeft:4 }}>{rating}</span>
  </div>
);

// ─── BADGE ───────────────────────────────────────────────────
export const Badge = ({ text }) => {
  const colors = {
    "Best Seller":"#10b981","Premium":"#6366f1","Flash Sale":"#ef4444",
    "New":"#3b82f6","Top Pick":"#f59e0b","Pro Gaming":"#dc2626",
    "Lightweight":"#06b6d4","Ultra":"#8b5cf6"
  };
  return (
    <span style={{
      background: colors[text] || "#3b82f6", color:"#fff",
      fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20,
      letterSpacing:"0.05em", textTransform:"uppercase"
    }}>{text}</span>
  );
};

// ─── PRODUCT CARD ────────────────────────────────────────────
export const ProductCard = ({ laptop, onNavigate, onAddToCart, onWishlist, wishlist }) => {
  const [hovered, setHovered] = useState(false);
  const isWished  = wishlist.includes(laptop.id);
  const discount  = Math.round((1 - laptop.price / laptop.originalPrice) * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#fff", borderRadius:16, overflow:"hidden",
        boxShadow: hovered ? "0 20px 40px rgba(59,130,246,0.15)" : "0 2px 12px rgba(0,0,0,0.06)",
        transition:"all 0.3s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-4px)" : "none",
        cursor:"pointer", border:"1px solid",
        borderColor: hovered ? "#bfdbfe" : "#f1f5f9",
        position:"relative", display:"flex", flexDirection:"column"
      }}
    >
      {laptop.badge && (
        <div style={{ position:"absolute", top:12, left:12, zIndex:2 }}>
          <Badge text={laptop.badge} />
        </div>
      )}
      <button
        onClick={e => { e.stopPropagation(); onWishlist(laptop.id); }}
        style={{
          position:"absolute", top:10, right:10, zIndex:2,
          background:"rgba(255,255,255,0.9)", border:"none", borderRadius:50,
          width:34, height:34, display:"flex", alignItems:"center",
          justifyContent:"center", cursor:"pointer", backdropFilter:"blur(4px)"
        }}
      >
        <span style={{ color: isWished ? "#ef4444" : "#9ca3af", fontSize:16 }}>
          {isWished ? "❤️" : "🤍"}
        </span>
      </button>
      <div
        onClick={() => onNavigate("product", laptop)}
        style={{
          height:180, background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",
          display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"
        }}
      >
        <img
          src={laptop.img} alt={laptop.name}
          style={{
            width:"100%", height:"100%", objectFit:"cover",
            transition:"transform 0.4s", transform: hovered ? "scale(1.06)" : "scale(1)"
          }}
        />
      </div>
      <div style={{ padding:"14px 16px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ fontSize:11, color:"#6b7280", fontWeight:600, letterSpacing:"0.05em" }}>
          {laptop.brand} · {laptop.category}
        </div>
        <div
          onClick={() => onNavigate("product", laptop)}
          style={{ fontSize:14, fontWeight:700, color:"#0f172a", lineHeight:1.4, cursor:"pointer" }}
        >
          {laptop.name}
        </div>
        <Stars rating={laptop.rating} />
        <div style={{ fontSize:11, color:"#94a3b8" }}>
          {laptop.reviews} reviews · {laptop.sold.toLocaleString()} sold
        </div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:2 }}>
          {[
            laptop.specs.cpu.split(" ").slice(0,3).join(" "),
            laptop.specs.ram,
            laptop.specs.gpu.split(" ").slice(0,2).join(" ")
          ].map((s,i) => (
            <span key={i} style={{
              background:"#f1f5f9", color:"#475569",
              fontSize:10, padding:"2px 7px", borderRadius:6, fontWeight:500
            }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop:"auto", paddingTop:8 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ fontSize:16, fontWeight:800, color:"#1d4ed8" }}>{formatPrice(laptop.price)}</span>
            <span style={{ fontSize:11, color:"#94a3b8", textDecoration:"line-through" }}>{formatPrice(laptop.originalPrice)}</span>
            <span style={{ fontSize:11, color:"#10b981", fontWeight:700 }}>-{discount}%</span>
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onAddToCart(laptop); }}
          disabled={!laptop.inStock}
          style={{
            marginTop:8, width:"100%", padding:"9px", borderRadius:10,
            border:"none", cursor: laptop.inStock ? "pointer" : "not-allowed",
            background: laptop.inStock ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "#e2e8f0",
            color: laptop.inStock ? "#fff" : "#9ca3af",
            fontSize:13, fontWeight:700,
            transition:"all 0.2s",
            transform: hovered && laptop.inStock ? "scale(1.02)" : "none"
          }}
        >
          {laptop.inStock ? "🛒 Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────
export const Navbar = ({ page, onNavigate, cartCount, wishlistCount, user, darkMode, setDarkMode, allowedPages = null }) => {
  const dm = darkMode;
  const [searchVal, setSearchVal] = useState("");
  const allNavLinks = [
    { label:"Home", page:"home" },
    { label:"Products", page:"catalog" },
    { label:"Categories", page:"category" },
    { label:"Promos", page:"promos" },
    { label:"Help", page:"help" },
  ];
  const canOpen = (target) => !allowedPages || allowedPages.includes(target);
  const navLinks = allNavLinks.filter(l => canOpen(l.page));

  return (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: dm ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${dm ? "#1e293b" : "#e2e8f0"}`,
      padding:"0 20px",
    }}>
      <div style={{
        maxWidth:1280, margin:"0 auto", height:64,
        display:"flex", alignItems:"center", gap:20
      }}>
        {/* Logo */}
        <div
          onClick={() => onNavigate("home")}
          style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}
        >
          <div style={{
            width:32, height:32, borderRadius:9,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            display:"flex", alignItems:"center", justifyContent:"center"
          }}>
            <span style={{ color:"#fff", fontWeight:900, fontSize:16 }}>L</span>
          </div>
          <span style={{
            fontSize:18, fontWeight:900,
            background:"linear-gradient(135deg,#2563eb,#06b6d4)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
          }}>LapStore</span>
        </div>

        {/* Nav Links */}
        <div style={{ display:"flex", gap:4, flexShrink:0 }}>
          {navLinks.map(l => (
            <button
              key={l.page}
              onClick={() => onNavigate(l.page)}
              style={{
                padding:"6px 12px", borderRadius:8, border:"none",
                background: page === l.page ? (dm ? "rgba(37,99,235,0.15)" : "#eff6ff") : "none",
                color: page === l.page ? "#2563eb" : dm ? "#94a3b8" : "#475569",
                fontSize:13, fontWeight:600, cursor:"pointer"
              }}
            >{l.label}</button>
          ))}
        </div>

        {/* Search */}
        <div style={{ flex:1, maxWidth:360, position:"relative" }}>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && searchVal.trim()) {
                onNavigate("search", { query: searchVal });
                setSearchVal("");
              }
            }}
            placeholder="Search laptops, brands..."
            style={{
              width:"100%", padding:"9px 40px 9px 16px", borderRadius:10,
              border:`1.5px solid ${dm ? "#334155" : "#e2e8f0"}`,
              background: dm ? "#1e293b" : "#f8fafc",
              color: dm ? "#f1f5f9" : "#0f172a",
              fontSize:13, outline:"none", boxSizing:"border-box"
            }}
          />
          <button
            onClick={() => { if (searchVal.trim()) { onNavigate("search", { query: searchVal }); setSearchVal(""); } }}
            style={{
              position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer",
              color: dm ? "#64748b" : "#9ca3af"
            }}
          >
            <Icon name="search" size={16} />
          </button>
        </div>

        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:4, marginLeft:"auto" }}>
          {canOpen("wishlist") && <NavIconBtn icon="heart" count={wishlistCount} onClick={() => onNavigate("wishlist")} dm={dm} />}
          {canOpen("cart") && <NavIconBtn icon="cart"  count={cartCount}     onClick={() => onNavigate("cart")}     dm={dm} />}
          {user ? (
            <button
              onClick={() => onNavigate(canOpen("profile") ? "profile" : "home")}
              style={{
                display:"flex", alignItems:"center", gap:8, padding:"6px 14px",
                borderRadius:10, border:`1.5px solid ${dm ? "#334155" : "#e2e8f0"}`,
                background: dm ? "#1e293b" : "#fff",
                color: dm ? "#e2e8f0" : "#374151",
                fontSize:13, fontWeight:600, cursor:"pointer"
              }}
            >
              <div style={{
                width:26, height:26, borderRadius:50,
                background:"linear-gradient(135deg,#2563eb,#06b6d4)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:800, color:"#fff"
              }}>
                {user.name[0].toUpperCase()}
              </div>
              {user.name.split(" ")[0]}
            </button>
          ) : (
            <button
              onClick={() => onNavigate(canOpen("login") ? "login" : "home")}
              style={{
                padding:"7px 16px", borderRadius:10,
                background:"linear-gradient(135deg,#2563eb,#3b82f6)",
                color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer"
              }}
            >Sign In</button>
          )}
          <button
            onClick={() => setDarkMode(!dm)}
            style={{
              background:"none", border:`1px solid ${dm ? "#334155" : "#e2e8f0"}`,
              borderRadius:8, padding:"6px 8px", cursor:"pointer",
              color: dm ? "#f1f5f9" : "#475569", fontSize:14
            }}
          >{dm ? "☀️" : "🌙"}</button>
        </div>
      </div>
    </nav>
  );
};

const NavIconBtn = ({ icon, count, onClick, dm }) => (
  <button
    onClick={onClick}
    style={{
      position:"relative", background:"none", border:"none",
      cursor:"pointer", padding:8, borderRadius:10,
      color: dm ? "#94a3b8" : "#475569", display:"flex"
    }}
  >
    <Icon name={icon} size={20} />
    {count > 0 && (
      <span style={{
        position:"absolute", top:2, right:2, background:"#ef4444",
        color:"#fff", fontSize:9, fontWeight:800, minWidth:16, height:16,
        borderRadius:50, display:"flex", alignItems:"center", justifyContent:"center"
      }}>{count}</span>
    )}
  </button>
);

// ─── FOOTER ──────────────────────────────────────────────────
export const Footer = ({ onNavigate, dm, allowedPages = null }) => {
  const canOpen = (target) => !allowedPages || allowedPages.includes(target);
  const footerColumns = [
    { title:"Shop",    links:["Home","All Laptops","Categories","Promos"] },
    { title:"Support", links:["Help Center","Track Order","Returns","Warranty"] },
    { title:"Company", links:["About Us","Blog","Careers","Press"] },
  ];
  const toPage = (l) => (
    l === "Home" ? "home" : l === "All Laptops" ? "catalog" :
    l === "Categories" ? "category" : l === "Promos" ? "promos" :
    l === "Help Center" ? "help" : l === "Track Order" ? "orders" : "home"
  );
  return (
  <footer style={{
    background:"#0f172a",
    borderTop:"1px solid #1e293b",
    padding:"40px 20px 24px"
  }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
        gap:32, marginBottom:32
      }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div style={{
              width:28, height:28, borderRadius:7,
              background:"linear-gradient(135deg,#2563eb,#06b6d4)",
              display:"flex", alignItems:"center", justifyContent:"center"
            }}>
              <span style={{ color:"#fff", fontWeight:900, fontSize:12 }}>L</span>
            </div>
            <span style={{
              fontSize:16, fontWeight:800,
              background:"linear-gradient(135deg,#2563eb,#06b6d4)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
            }}>LapStore</span>
          </div>
          <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>
            Indonesia's trusted laptop marketplace. Premium quality, guaranteed authentic.
          </p>
        </div>
        {footerColumns.map(col => ({ ...col, links: col.links.filter(l => canOpen(toPage(l))) })).filter(col => col.links.length > 0).map(col => (
          <div key={col.title}>
            <div style={{
              fontSize:13, fontWeight:700, color:"#94a3b8",
              marginBottom:12, textTransform:"uppercase", letterSpacing:"0.08em"
            }}>{col.title}</div>
            {col.links.map(l => (
              <button
                key={l}
                onClick={() => onNavigate(toPage(l))}
                style={{
                  display:"block", background:"none", border:"none",
                  color:"#64748b", fontSize:13, padding:"3px 0",
                  cursor:"pointer", textAlign:"left"
                }}
              >{l}</button>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop:"1px solid #1e293b", paddingTop:20,
        display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:12
      }}>
        <span style={{ fontSize:12, color:"#475569" }}>© 2026 LapStore. All rights reserved.</span>
        <span style={{ fontSize:12, color:"#475569" }}>🔒 Secure payments · 🚚 Fast delivery · ✅ Authentic guarantee</span>
      </div>
    </div>
  </footer>
  );
};

// ─── AUTH INPUT ──────────────────────────────────────────────
export const AuthInput = ({ label, type, value, onChange, placeholder, dm }) => (
  <div style={{ marginBottom:16 }}>
    <label style={{ fontSize:13, fontWeight:600, color: dm ? "#94a3b8" : "#374151", display:"block", marginBottom:6 }}>
      {label}
    </label>
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width:"100%", padding:"11px 14px", borderRadius:10,
        border:`1.5px solid ${dm ? "#334155" : "#e2e8f0"}`,
        background: dm ? "#0f172a" : "#f8fafc",
        color: dm ? "#f1f5f9" : "#0f172a",
        fontSize:14, outline:"none", boxSizing:"border-box"
      }}
    />
  </div>
);

// ─── SECTION TITLE ───────────────────────────────────────────
export const SectionTitle = ({ title, sub, dm, action }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:20 }}>
    <div>
      <h2 style={{ fontSize:22, fontWeight:800, color: dm ? "#f1f5f9" : "#0f172a", marginBottom:4 }}>{title}</h2>
      {sub && <p style={{ fontSize:13, color:"#94a3b8" }}>{sub}</p>}
    </div>
    {action && (
      <button
        onClick={action}
        style={{
          background:"none", border:"none", color:"#2563eb",
          fontSize:13, fontWeight:700, cursor:"pointer",
          display:"flex", alignItems:"center", gap:4
        }}
      >View all <Icon name="arrowRight" size={14} /></button>
    )}
  </div>
);

// ─── BREADCRUMB ──────────────────────────────────────────────
export const Breadcrumb = ({ items, onNavigate, dm }) => (
  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:24 }}>
    {items.map((item, i) => (
      <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
        {i < items.length - 1 ? (
          <>
            <button
              onClick={() => onNavigate(item.toLowerCase())}
              style={{
                background:"none", border:"none",
                color:"#2563eb", fontSize:13, fontWeight:600, cursor:"pointer", padding:0
              }}
            >{item}</button>
            <span style={{ color: dm ? "#475569" : "#94a3b8", fontSize:13 }}>/</span>
          </>
        ) : (
          <span style={{ fontSize:13, fontWeight:600, color: dm ? "#94a3b8" : "#475569" }}>{item}</span>
        )}
      </span>
    ))}
  </div>
);

// ─── FILTER SECTION ──────────────────────────────────────────
export const FilterSection = ({ title, dm, children }) => (
  <div style={{ marginBottom:20 }}>
    <div style={{
      fontSize:12, fontWeight:700, color:"#94a3b8",
      textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10
    }}>{title}</div>
    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{children}</div>
  </div>
);

export const FilterBtn = ({ label, active, onClick, dm }) => (
  <button
    onClick={onClick}
    style={{
      padding:"6px 12px", borderRadius:8, border:"none",
      background: active ? "linear-gradient(135deg,#2563eb,#3b82f6)" : (dm ? "#1e293b" : "#f1f5f9"),
      color: active ? "#fff" : (dm ? "#94a3b8" : "#475569"),
      fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.15s"
    }}
  >{label}</button>
);
