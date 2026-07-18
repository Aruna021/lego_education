import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, PlusCircle, Menu, X, Trash2, GraduationCap, ChevronRight, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatUsdToKZT } from "../utils/price";

export default function Header() {
  const { cartCount, cartItems, addToCart, removeFromCart, clearCart, showToast } = useApp();
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleQuickSearch = (term: string) => {
    navigate(`/catalog?search=${encodeURIComponent(term)}`);
    setIsMobileMenuOpen(false);
  };

  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Top informational bar */}
      <div className="bg-lego-dark text-white text-xs py-2 px-4 flex justify-between items-center font-medium z-50 relative">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-lego-yellow" />
          <span>Вдохновляя строителей будущего • Демонстрационный сайт LEGO® Education</span>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <span className="text-gray-300">Надежность учебного класса</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-gray-300">Учебный план в комплекте</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 transition-all duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center select-none group" id="header-logo-link">
              {/* LEGO Brand Box */}
              <div className="bg-lego-red w-14 h-14 rounded-lg flex flex-col items-center justify-center font-display font-black text-white text-lg tracking-tight shadow-md transition-transform group-hover:scale-105 active:scale-95 duration-200 relative overflow-hidden">
                {/* Simulated Stud circles inside logo for lego visual texture */}
                <span className="leading-none text-[15px] font-black uppercase text-center block" style={{ textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000" }}>
                  LEGO
                </span>
                <span className="text-[7px] font-bold tracking-widest text-lego-yellow uppercase block mt-0.5 leading-none">
                  education
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 rounded-full text-slate-700 hover:text-lego-red font-display font-bold text-sm tracking-wide transition-colors"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                className="px-4 py-2 rounded-full text-slate-700 hover:text-lego-red font-display font-bold text-sm tracking-wide transition-colors"
              >
                Решения для обучения
              </Link>
              <Link
                to="/gallery"
                className="px-4 py-2 rounded-full text-slate-700 hover:text-lego-red font-display font-bold text-sm tracking-wide transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-lego-yellow fill-lego-yellow animate-pulse" />
                <span>Галерея изобретений</span>
              </Link>
            </nav>
          </div>

          {/* Search, Action Tools, Cart */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Поиск STEM-наборов, spike, программирование..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-sm pl-4 pr-10 py-2.5 rounded-full border border-transparent focus:border-lego-blue outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-lego-blue p-1 transition-colors"
                aria-label="Search Submit"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Icons Bar */}
          <div className="flex items-center gap-4">
            {/* Gallery Upload Link Shortcut */}
            <Link
              to="/gallery"
              className="hidden sm:flex items-center gap-1.5 bg-lego-blue hover:bg-lego-blue-dark text-white px-4 py-2.5 rounded-full text-xs font-display font-bold transition-all hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Поделиться поделкой</span>
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="relative p-3 text-slate-700 hover:bg-slate-100 rounded-full transition-colors group"
              id="shopping-bag-toggle"
              aria-label="Toggle Shopping Bag"
            >
              <ShoppingBag className="w-6 h-6 group-hover:text-lego-blue transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lego-red text-white font-display font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white py-4 px-6 space-y-4 shadow-inner animate-fade-in">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Поиск решений и кубиков..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 pl-4 pr-10 py-2.5 rounded-full outline-none text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500" aria-label="Search Mobile">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-col gap-2 font-display font-bold text-sm tracking-wide">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-gray-100 text-slate-700 hover:text-lego-red transition-colors flex justify-between items-center"
              >
                <span>Главная</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-gray-100 text-slate-700 hover:text-lego-red transition-colors flex justify-between items-center"
              >
                <span>Каталог решений для классов</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-gray-100 text-slate-700 hover:text-lego-red transition-colors flex justify-between items-center"
              >
                <span className="flex items-center gap-1.5 text-lego-blue">
                  <Sparkles className="w-4 h-4 fill-lego-yellow text-lego-yellow animate-pulse" />
                  <span>Галерея изобретений</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Популярные решения</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickSearch("SPIKE Prime")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-lego-yellow/10 hover:text-lego-blue text-xs rounded-full font-medium transition-colors"
                >
                  SPIKE™ Prime
                </button>
                <button
                  onClick={() => handleQuickSearch("BricQ Motion")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-lego-yellow/10 hover:text-lego-blue text-xs rounded-full font-medium transition-colors"
                >
                  BricQ™ Motion
                </button>
                <button
                  onClick={() => handleQuickSearch("Программирование")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-lego-yellow/10 hover:text-lego-blue text-xs rounded-full font-medium transition-colors"
                >
                  Программирование
                </button>
                <button
                  onClick={() => handleQuickSearch("DUPLO")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-lego-yellow/10 hover:text-lego-blue text-xs rounded-full font-medium transition-colors"
                >
                  DUPLO® Education
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-lego-blue text-white py-3 rounded-full font-display font-bold text-center block hover:bg-lego-blue-dark transition-all text-sm"
              >
                Опубликовать изобретение класса
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Shopping Bag Drawer (Visual Only, Premium Feel) */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="shopping-bag-drawer">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsBagOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-all duration-300">
              
              {/* Header */}
              <div className="px-6 py-5 bg-lego-gray-light border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-lego-blue" />
                  <h2 className="text-lg font-display font-black tracking-tight text-slate-800">Ваша корзина</h2>
                  <span className="bg-lego-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className="p-2 text-slate-500 hover:text-lego-red hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Close Bag Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Showcase Banner */}
              <div className="bg-lego-yellow/10 border-b border-lego-yellow/30 px-6 py-2.5 text-xs text-amber-900 font-semibold flex items-center justify-between">
                <span>⚡ ДЕМОНСТРАЦИОННЫЙ РЕЖИМ</span>
                <span className="text-[10px] bg-lego-yellow text-slate-900 px-2 py-0.5 rounded-full font-bold uppercase">Без реальной оплаты</span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-800 text-lg">Ваша корзина пуста</h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                        Обучение строится на сотрудничестве и творчестве! Добавьте STEM-наборы, чтобы начать проектирование.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsBagOpen(false);
                        navigate("/catalog");
                      }}
                      className="px-6 py-2.5 bg-lego-red hover:bg-red-700 text-white rounded-full font-display font-bold text-xs tracking-wide shadow-md transform active:scale-95 transition-all"
                    >
                      Перейти в каталог STEM
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100 group">
                      {/* Product Thumbnail with Brick Look */}
                      <div className="w-20 h-20 bg-slate-50 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 relative">
                        {/* Interactive mini representation or visual badge */}
                        <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-gray-400 font-mono">
                          {item.product.productLine}
                        </div>
                        {/* Dynamic Stud graphic in corner */}
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-lego-yellow/60 rounded-full" />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-lego-blue transition-colors">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Возраст: {item.product.ageRange} • Деталей: {item.product.pieceCount}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-extrabold text-slate-900">
                            {formatUsdToKZT(item.product.price * item.quantity)}
                          </span>
                          
                          {/* Small Quantity display & controls */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-400">Кол-во:</span>
                            <span className="text-sm font-bold bg-slate-100 px-2.5 py-1 rounded text-slate-800 border border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1.5 text-slate-400 hover:text-lego-red hover:bg-red-50 rounded transition-colors"
                              title="Удалить"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 bg-lego-gray-light p-6 space-y-4">
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex justify-between font-medium">
                      <span>Предварительная стоимость</span>
                      <span className="font-bold text-slate-900">{formatUsdToKZT(totalCartPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Доставка и сборка</span>
                      <span className="text-emerald-600 font-semibold">БЕСПЛАТНО (демо-акция)</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold border-t border-gray-200 pt-3 text-slate-800">
                      <span>Итоговая демо-сумма</span>
                      <span className="text-lego-red">{formatUsdToKZT(totalCartPrice)}</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => {
                        showToast("Демо-заказ: решения LEGO зарезервированы для ознакомления!", "info");
                        setIsBagOpen(false);
                      }}
                      className="w-full bg-lego-red hover:bg-red-700 text-white font-display font-black py-3.5 rounded-full shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>Оформить демо-заказ</span>
                    </button>
                    <button
                      onClick={() => {
                        clearCart();
                        showToast("Корзина очищена!", "info");
                      }}
                      className="w-full py-2.5 text-xs text-gray-500 hover:text-lego-red hover:underline font-semibold text-center transition-all"
                    >
                      Очистить корзину
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    *Это <strong>демонстрационный прототип</strong>. Никакие денежные средства не списываются, и реальная доставка наборов не производится. Приятного изучения наборов LEGO Education!
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
