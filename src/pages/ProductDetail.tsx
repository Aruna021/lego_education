import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingBag, ArrowLeft, ShieldAlert, BadgeCheck, GraduationCap, Award, Box, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data/content";
import { useApp } from "../context/AppContext";
import { LegoArtwork } from "../components/LegoArtwork";
import ProductCard from "../components/ProductCard";
import { formatUsdToKZT } from "../utils/price";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, showToast } = useApp();
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);

  // Automatically scroll to the top of the page when the product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-black text-2xl text-slate-800">
            Решение LEGO не найдено
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Извините, запрашиваемый учебный набор не существует в нашей демонстрационной витрине.
          </p>
        </div>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 bg-lego-blue hover:bg-lego-blue-dark text-white font-display font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в каталог</span>
        </Link>
      </div>
    );
  }

  // Get related products (same category/subject, excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => (p.category === product.category || p.subject === product.subject) && p.id !== product.id
  ).slice(0, 4);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative inline-block overflow-hidden">
            <Star className="w-4.5 h-4.5 text-gray-300" />
            <div className="absolute top-0 left-0 w-[50%] overflow-hidden h-full">
              <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4.5 h-4.5 text-gray-200" />);
      }
    }
    return stars;
  };

  const handleAddToBag = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setQty(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="product-details-page">
      
      {/* Back button shortcut */}
      <div>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-lego-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>НАЗАД К РЕШЕНИЯМ STEM</span>
        </Link>
      </div>

      {/* Main product showcase section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xs relative">
        
        {/* Ribbon Badges Overlays */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-emerald-500 text-white font-display font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              НОВИНКА
            </span>
          )}
          {product.isExclusive && (
            <span className="bg-lego-blue text-white font-display font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              ЭКСКЛЮЗИВНЫЙ НАБОР
            </span>
          )}
        </div>

        {/* 1. Left Column: Giant detailed artwork render */}
        <div className="lg:col-span-6 aspect-video lg:aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4 relative shadow-inner">
          <LegoArtwork type={product.image} className="w-full h-full object-cover" />
          
          {/* Small tactile visual details */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 opacity-40">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          </div>
        </div>

        {/* 2. Right Column: Pricing, curation, specs, buy action */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Category / Subject focus */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="text-lego-blue">{product.category}</span>
              <span>•</span>
              <span className="text-slate-600">{product.productLine}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {product.subject}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-none">
              {product.title}
            </h1>

            {/* Ratings and reviews bar */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-xs text-slate-800 font-extrabold">{product.rating} / 5.0</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500 font-medium">Проверено педагогами</span>
            </div>

            {/* Age range & pieces metrics box */}
            <div className="grid grid-cols-3 gap-3 max-w-sm pt-2">
              <div className="bg-lego-gray-light rounded-xl p-3 text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Возраст</p>
                <p className="font-display font-black text-slate-800 text-base mt-1.5">{product.ageRange}</p>
              </div>
              <div className="bg-lego-gray-light rounded-xl p-3 text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Детали</p>
                <p className="font-display font-black text-slate-800 text-base mt-1.5">{product.pieceCount}</p>
              </div>
              <div className="bg-lego-gray-light rounded-xl p-3 text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Артикул</p>
                <p className="font-display font-bold text-slate-800 text-xs mt-2 truncate">#{product.id.substring(0, 7).toUpperCase()}</p>
              </div>
            </div>

            {/* Paragraph Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-2">
              {product.description}
            </p>

          </div>

          {/* Pricing & CTA box */}
          <div className="bg-lego-gray-light p-5 rounded-2xl border border-gray-200/60 space-y-4">
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">ЦЕНА ДЛЯ УЧРЕЖДЕНИЙ</p>
                <span className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {formatUsdToKZT(product.price)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 justify-end">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Бесплатная доставка</span>
                </p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">Запасные детали включены</p>
              </div>
            </div>

            <div className="flex gap-4 items-stretch">
              
              {/* Qty picker */}
              <div className="flex items-center border-2 border-gray-200 bg-white rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 hover:bg-slate-50 font-bold text-slate-600 transition-colors"
                  aria-label="Decrease Quantity"
                >
                  -
                </button>
                <span className="px-4 font-display font-black text-sm text-slate-800 select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 hover:bg-slate-50 font-bold text-slate-600 transition-colors"
                  aria-label="Increase Quantity"
                >
                  +
                </button>
              </div>

              {/* Action CTA buy */}
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-lego-red hover:bg-red-700 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transform active:scale-95 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                id="add-to-bag-cta"
              >
                <ShoppingBag className="w-5 h-5 shrink-0" />
                <span>Добавить в корзину</span>
              </button>

            </div>

            <p className="text-[10px] text-gray-400 leading-normal text-center">
              *Только для демонстрационных целей. Нажатие добавляет набор в визуальную корзину.
            </p>

          </div>

        </div>

      </div>

      {/* 3. Detailed Curriculum Benefits Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="curriculum-highlights-split">
        
        {/* Left benefits bullet box */}
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 text-lego-blue font-extrabold text-sm uppercase tracking-wider">
            <GraduationCap className="w-5 h-5" />
            <span>Интеграция в учебный план</span>
          </div>
          
          <h3 className="font-display font-black text-xl text-slate-800 tracking-tight leading-tight">
            Результаты обучения и ключевые особенности набора
          </h3>

          <ul className="space-y-4">
            {product.features.map((feat, index) => (
              <li key={index} className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-lego-blue/10 flex items-center justify-center text-lego-blue text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right certifications sidebar */}
        <div className="md:col-span-5 bg-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-6">
          <div className="flex items-center gap-2 text-lego-yellow font-extrabold text-sm uppercase tracking-wider">
            <Award className="w-5 h-5" />
            <span>Соответствие экосистеме</span>
          </div>

          <h3 className="font-display font-black text-xl tracking-tight leading-tight">
            Программа профессиональной подготовки учителей
          </h3>

          <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
            Каждый набор LEGO® Education поддерживается программами самостоятельного обучения. Педагогам доступны бесплатные видеоуроки, шаблоны оценивания и интерактивные рабочие листы для уверенного запуска учебных клубов.
          </p>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex gap-3.5 items-center">
            <Box className="w-10 h-10 text-lego-yellow shrink-0" />
            <div>
              <p className="text-xs font-bold">Запасные элементы включены</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Потеряли колесо или штифт шестерни? Стандартные наборы включают в себя пакеты с запасными деталями прямо в коробке.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Curated Related products carousel row */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 border-t border-gray-200 pt-12" id="related-solutions-row">
          <div>
            <h3 className="font-display font-black text-xl md:text-2xl tracking-tight text-slate-800">
              Похожие решения для классов
            </h3>
            <p className="text-gray-500 text-sm">
              Дополните экосистему вашего класса этими совместимыми наборами и расширениями.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
