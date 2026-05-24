// ============================================================
//  LAPSTORE MARKETPLACE — ORANG 2 - CATALOG DETAIL SEARCH
//  Base + file pembagian orang ini saja
// ============================================================
import { useState } from "react";
import { CatalogPage, ProductDetailPage, SearchPage } from "./pages/orang2_catalog_detail_search";
import { LAPTOPS } from "./shared/shared_data";
import { Navbar, Footer, Icon } from "./shared/shared_components";

const MODE_LABEL = "ORANG2";
const MODE_DESC = "Product Catalog, Product Detail, dan Search Result.";
const START_PAGE = "catalog";
const ALLOWED_PAGES = ["base", "catalog", "product", "search"];

function BaseHome({ dm, onNavigate }) {
  const card = dm ? "#1e293b" : "#ffffff";
  const border = dm ? "#334155" : "#e2e8f0";
  const text = dm ? "#f1f5f9" : "#0f172a";
  const sub = "#94a3b8";

  return (
    <div style={{ minHeight:"calc(100vh - 64px)", padding:"48px 20px", background:dm?"#0f172a":"#f8fafc" }}>
      <div style={{ maxWidth:980, margin:"0 auto" }}>
        <div style={{
          borderRadius:26, padding:"40px 34px",
          background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 62%,#06b6d4 100%)",
          boxShadow:"0 24px 70px rgba(37,99,235,.28)",
          position:"relative", overflow:"hidden", marginBottom:24,
        }}>
          <div style={{ position:"absolute", right:30, top:20, fontSize:90, opacity:.08 }}>💻</div>
          <div style={{ position:"relative" }}>
            <span style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"7px 16px", borderRadius:999,
              background:"rgba(255,255,255,.12)", color:"#e0f2fe",
              fontSize:13, fontWeight:800,
            }}>
              <Icon name="shield" size={15} /> LapStore Base Project
            </span>
            <h1 style={{ color:"#fff", fontSize:"clamp(2rem,5vw,3.6rem)", lineHeight:1.1, margin:"22px 0 12px", fontWeight:900 }}>
              Base siap untuk {MODE_LABEL}.
            </h1>
            <p style={{ color:"#bfdbfe", fontSize:16, lineHeight:1.7, maxWidth:700 }}>
              ZIP ini berisi base utama, shared data, shared components, dan file interface khusus pembagian orang ini saja.
            </p>
            <button onClick={() => onNavigate(START_PAGE)} style={{
              marginTop:22, border:"none", borderRadius:14, padding:"13px 28px", cursor:"pointer",
              background:"linear-gradient(135deg,#2563eb,#06b6d4)", color:"#fff", fontWeight:900,
              boxShadow:"0 10px 28px rgba(37,99,235,.35)"
            }}>Buka halaman {MODE_LABEL} →</button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
          {[
            ["src/App.jsx", "Router sederhana, state global, guard halaman, Navbar, Footer."],
            ["src/shared/shared_data.js", "Data laptop, promo, brand, kategori, dan format harga."],
            ["src/shared/shared_components.jsx", "Komponen umum seperti Navbar, ProductCard, Footer, Breadcrumb."],
            ["src/pages/orang2_catalog_detail_search.jsx", MODE_DESC],
          ].map(([title, desc]) => (
            <div key={title} style={{ background:card, border:`1px solid ${border}`, borderRadius:18, padding:20 }}>
              <div style={{ color:"#2563eb", fontWeight:900, fontSize:14, marginBottom:8 }}>{title}</div>
              <div style={{ color:sub, fontSize:13, lineHeight:1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModeBanner({ dm, onNavigate }) {
  return (
    <div style={{
      background: dm ? "#020617" : "#eff6ff",
      borderBottom: `1px solid ${dm ? "#1e293b" : "#bfdbfe"}`,
      padding: "9px 20px", textAlign: "center", fontSize: 12,
      color: dm ? "#93c5fd" : "#1d4ed8", fontWeight: 700,
    }}>
      Mode: {MODE_LABEL} — {MODE_DESC} · <button onClick={() => onNavigate("base")} style={{ border:"none", background:"transparent", color:"inherit", fontWeight:900, textDecoration:"underline", cursor:"pointer" }}>lihat base</button>
    </div>
  );
}

function PageLocked({ target, onNavigate, dm }) {
  return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:dm?"#0f172a":"#f8fafc" }}>
      <div style={{ maxWidth:520, textAlign:"center", background:dm?"#1e293b":"#fff", border:`1px solid ${dm?"#334155":"#e2e8f0"}`, borderRadius:22, padding:32 }}>
        <div style={{ fontSize:54, marginBottom:12 }}>🚧</div>
        <h2 style={{ color:dm?"#f1f5f9":"#0f172a", fontSize:22, fontWeight:900, marginBottom:8 }}>
          Halaman “{target}” tidak ikut ZIP {MODE_LABEL}
        </h2>
        <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.7, marginBottom:20 }}>
          Ini sengaja dipisah supaya tiap orang cuma pegang base dan bagian tugasnya sendiri.
        </p>
        <button onClick={() => onNavigate(START_PAGE)} style={{
          border:"none", borderRadius:12, padding:"12px 22px", cursor:"pointer",
          background:"linear-gradient(135deg,#2563eb,#06b6d4)", color:"#fff", fontWeight:800,
        }}>Balik ke halaman {MODE_LABEL}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(START_PAGE);
  const [pageParams, setPageParams] = useState(null);
  const [blockedPage, setBlockedPage] = useState(null);

  const navigate = (target, params = null) => {
    if (!ALLOWED_PAGES.includes(target)) {
      setBlockedPage(target);
      setPage("locked");
      setPageParams(null);
      window.scrollTo(0, 0);
      return;
    }
    setBlockedPage(null);
    setPage(target);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const demoUser = { name:"Mika Saleem", email:"mika@student.demo" };
  const demoCart = LAPTOPS.slice(0, 2).map((item, idx) => ({ ...item, qty: idx + 1 }));

  const [user, setUser] = useState("orang2" === "orang5" ? demoUser : null);
  const [cart, setCart] = useState(["orang3", "orang4"].includes("orang2") ? demoCart : []);
  const [wishlist, setWishlist] = useState("orang2" === "orang4" ? LAPTOPS.slice(0, 4).map(l => l.id) : []);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (laptop) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === laptop.id);
      if (existing) return prev.map(i => i.id === laptop.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...laptop, qty: 1 }];
    });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishlistCount = wishlist.length;

  const pageProps = {
    onNavigate: navigate,
    onAddToCart: addToCart,
    onWishlist: toggleWishlist,
    wishlist,
    cart,
    setCart,
    user,
    onLogin: setUser,
    onLogout: () => setUser(null),
    darkMode,
    setDarkMode,
    dm: darkMode,
  };

  const renderPage = () => {
    switch (page) {
      case "base": return <BaseHome dm={darkMode} onNavigate={navigate} />;
      case "locked": return <PageLocked target={blockedPage} onNavigate={navigate} dm={darkMode} />;
      case "catalog": return <CatalogPage {...pageProps} />;
      case "product": return <ProductDetailPage product={pageParams || LAPTOPS[0]} {...pageProps} />;
      case "search": return <SearchPage query={pageParams?.query || "asus"} {...pageProps} />;
      default: return <BaseHome dm={darkMode} onNavigate={navigate} />;
    }
  };

  const hideNavbarFooter = ["login", "register"].includes(page);
  const hideFooter = ["checkout", "success"].includes(page);

  return (
    <div style={{
      minHeight:"100vh",
      background: darkMode ? "#0f172a" : "#f8fafc",
      fontFamily:"Inter, system-ui, -apple-system, sans-serif",
      color: darkMode ? "#f1f5f9" : "#0f172a",
    }}>
      {!hideNavbarFooter && (
        <Navbar
          page={page}
          onNavigate={navigate}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          allowedPages={ALLOWED_PAGES}
        />
      )}

      <ModeBanner dm={darkMode} onNavigate={navigate} />
      <main>{renderPage()}</main>

      {!hideNavbarFooter && !hideFooter && (
        <Footer onNavigate={navigate} dm={darkMode} allowedPages={ALLOWED_PAGES} />
      )}
    </div>
  );
}
