// ============================================================
//  LAPSTORE MARKETPLACE — MAIN APP (BASE)
//  Router + State management untuk semua 5 orang
// ============================================================
import { useState } from "react";

// Pages — Orang 1
import { HomePage, LoginPage, RegisterPage }                   from "./pages/orang1_home_login_register";
// Pages — Orang 2
import { CatalogPage, ProductDetailPage, SearchPage }          from "./pages/orang2_catalog_detail_search";
// Pages — Orang 3
import { CategoryPage, CartPage, CheckoutPage }                from "./pages/orang3_category_cart_checkout";
// Pages — Orang 4
import { SuccessPage, OrdersPage, WishlistPage }               from "./pages/orang4_success_orders_wishlist";
// Pages — Orang 5
import { ProfilePage, PromosPage, HelpPage }                   from "./pages/orang5_profile_promos_help";

// Shared
import { Navbar, Footer } from "./shared/shared_components";

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  // ── Navigation state ──
  const [page,       setPage]       = useState("home");
  const [pageParams, setPageParams] = useState(null);

  const navigate = (p, params = null) => {
    setPage(p);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  // ── Global state ──
  const [user,      setUser]      = useState(null);
  const [cart,      setCart]      = useState([]);
  const [wishlist,  setWishlist]  = useState([]);
  const [darkMode,  setDarkMode]  = useState(false);

  // ── Cart helpers ──
  const addToCart = (laptop) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === laptop.id);
      if (existing) return prev.map(i => i.id === laptop.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...laptop, qty: 1 }];
    });
  };

  const cartCount     = cart.reduce((s, i) => s + i.qty, 0);
  const wishlistCount = wishlist.length;

  // ── Wishlist helpers ──
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // ── Props bundle ──
  const pageProps = {
    onNavigate:   navigate,
    onAddToCart:  addToCart,
    onWishlist:   toggleWishlist,
    wishlist,
    cart,
    setCart,
    user,
    onLogin:      setUser,
    onLogout:     () => setUser(null),
    darkMode,
    setDarkMode,
    dm:           darkMode,
  };

  // ── Page renderer ──
  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage     {...pageProps} />;
      case "login":    return <LoginPage    {...pageProps} />;
      case "register": return <RegisterPage {...pageProps} />;
      case "catalog":  return <CatalogPage  {...pageProps} />;
      case "product":  return <ProductDetailPage product={pageParams} {...pageProps} />;
      case "search":   return <SearchPage   query={pageParams?.query} {...pageProps} />;
      case "category": return <CategoryPage params={pageParams}       {...pageProps} />;
      case "cart":     return <CartPage     {...pageProps} />;
      case "checkout": return <CheckoutPage {...pageProps} />;
      case "success":  return <SuccessPage  {...pageProps} />;
      case "orders":   return <OrdersPage   {...pageProps} />;
      case "wishlist": return <WishlistPage {...pageProps} />;
      case "profile":  return <ProfilePage  {...pageProps} />;
      case "promos":   return <PromosPage   {...pageProps} />;
      case "help":     return <HelpPage     {...pageProps} />;
      default:         return <HomePage     {...pageProps} />;
    }
  };

  const hideNavbarFooter = ["login", "register"].includes(page);
  const hideFooter       = ["checkout", "success"].includes(page);

  return (
    <div style={{
      minHeight:"100vh",
      background: darkMode ? "#0f172a" : "#f8fafc",
      fontFamily:"Inter, system-ui, -apple-system, sans-serif",
      color: darkMode ? "#f1f5f9" : "#0f172a"
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
        />
      )}

      <main>{renderPage()}</main>

      {!hideNavbarFooter && !hideFooter && (
        <Footer onNavigate={navigate} dm={darkMode} />
      )}
    </div>
  );
}
