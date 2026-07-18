import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, GraduationCap, Github, Linkedin, Twitter, Youtube, Award } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(`Спасибо! Электронный адрес "${email}" добавлен в список нашей рассылки.`, "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-lego-dark text-white pt-16 pb-12 border-t-8 border-lego-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main upper split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand & Promo pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-lego-red w-11 h-11 rounded-md flex flex-col items-center justify-center font-display font-black text-white text-sm tracking-tight shadow-md">
                <span className="leading-none text-[12px] font-black uppercase text-center block">
                  LEGO
                </span>
                <span className="text-[5px] font-bold tracking-widest text-lego-yellow uppercase block mt-0.5 leading-none">
                  education
                </span>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight">
                LEGO® Education <span className="text-lego-yellow">Solutions</span>
              </span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              LEGO® Education предлагает увлекательные практические занятия в сфере STEAM, которые пробуждают любопытство на уроках, развивают критическое мышление и укрепляют уверенность учащихся в своих силах от детского сада до средней школы.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-full">
                <Award className="w-4 h-4 text-lego-yellow" />
                <span>Стандарты обучения ISTE</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-full">
                <GraduationCap className="w-4 h-4 text-lego-blue" />
                <span>Одобрено учителями</span>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Solutions & Resources (No corporate, only student/teacher links) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-lego-yellow uppercase tracking-wider">
                Решения STEAM
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/catalog?category=Программирование%20и%20робототехника" className="hover:text-white hover:underline transition-all">
                    Робототехника
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?category=Естественные%20науки%20(STEM)" className="hover:text-white hover:underline transition-all">
                    Естественные науки (STEM)
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?category=Раннее%20развитие" className="hover:text-white hover:underline transition-all">
                    Раннее развитие DUPLO
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?category=Решения%20для%20классов" className="hover:text-white hover:underline transition-all">
                    Решения для классов
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-lego-yellow uppercase tracking-wider">
                Для учителей
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#lesson-plans" onClick={() => showToast("Планы уроков доступны в нашей демонстрационной библиотеке!", "info")} className="hover:text-white hover:underline transition-all">
                    Планы занятий и уроков
                  </a>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white hover:underline transition-all">
                    Галерея изобретений
                  </Link>
                </li>
                <li>
                  <a href="#prof-dev" onClick={() => showToast("Обучение в Академии учителей симулируется онлайн!", "info")} className="hover:text-white hover:underline transition-all">
                    Повышение квалификации
                  </a>
                </li>
                <li>
                  <a href="#standards" onClick={() => showToast("Соответствие стандартам математики и естественных наук включено в документацию!", "info")} className="hover:text-white hover:underline transition-all">
                    Образовательные стандарты
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-lego-yellow uppercase tracking-wider">
              Рассылка для педагогов
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Подпишитесь, чтобы получать бесплатные рабочие листы для классов, руководства по сборке роботов и анонсы кампаний STEM.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="teacher@school.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white pl-4 pr-12 py-3 rounded-lg text-xs border border-transparent focus:border-lego-blue outline-none transition-all placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-lego-blue hover:bg-lego-blue-dark text-white px-3 rounded-md transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Lower row: Copyright and legal notice */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          
          <div className="space-y-2 text-center md:text-left">
            <p className="font-semibold text-gray-400">
              © {new Date().getFullYear()} Демо-витрина LEGO® Education. Создано в маркетинговых целях.
            </p>
            <p className="max-w-2xl text-gray-600 leading-relaxed">
              <strong>Отказ от ответственности:</strong> Данное приложение является демонстрационным прототипом. Все товарные знаки, знаки обслуживания, логотипы, фирменные цвета и авторские права LEGO принадлежат их соответствующим владельцам. Коммерческая связь или одобрение не подразумеваются.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 hover:bg-lego-blue text-gray-400 hover:text-white rounded-full transition-all"
              aria-label="GitHub Link"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 hover:bg-lego-blue text-gray-400 hover:text-white rounded-full transition-all"
              aria-label="LinkedIn Link"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 hover:bg-lego-blue text-gray-400 hover:text-white rounded-full transition-all"
              aria-label="Twitter Link"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 hover:bg-lego-blue text-gray-400 hover:text-white rounded-full transition-all"
              aria-label="YouTube Link"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
