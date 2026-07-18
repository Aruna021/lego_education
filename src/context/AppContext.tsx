import React, { createContext, useContext, useState, useEffect } from "react";
import { Creation, Product } from "../types";

interface Notification {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  cartCount: number;
  cartItems: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  creations: Creation[];
  addCreation: (title: string, caption: string, displayName: string, imageSrc: string) => void;
  notifications: Notification[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Vector graphic placeholders for seeded creations
const SEEDED_CREATIONS: Creation[] = [
  {
    id: "creation-1",
    title: "Экологичная ветряная турбина и умная сеть",
    caption: "Построено с использованием SPIKE Prime и расширения «Возобновляемые источники энергии»! Мы запрограммировали смарт-хаб направлять лопасти прямо на поток воздуха от вентилятора, генерируя до 2,4 В для питания световых кубиков LEGO. Моему 5-му классу очень понравилось тестировать разные углы!",
    displayName: "5-й класс г-жи Сары",
    imageSrc: "creation-wind-grid",
    uploadedAt: "2026-07-10"
  },
  {
    id: "creation-2",
    title: "Марсоход SPIKE с манипулятором распознавания цвета",
    caption: "Мы построили марсоход на дистанционном управлении, который использует ультразвуковой датчик для обхода препятствий, а также манипулятор с датчиком цвета, захватывающий полезные желтые блоки и игнорирующий опасные серые. Код Scratch использует продвинутые циклы!",
    displayName: "Лиам и Джессика (11 лет)",
    imageSrc: "creation-mars-rover",
    uploadedAt: "2026-07-14"
  },
  {
    id: "creation-3",
    title: "Американские горки DUPLO в парке аттракционов",
    caption: "Мы объединили шестеренки из набора «Парк STEAM» со стандартными рельсами DUPLO, чтобы построить горку, которая звенит в колокольчик в самом низу! Малыши узнали об уклоне, скорости и причинно-следственных связях.",
    displayName: "Игровая группа Центра раннего развития",
    imageSrc: "creation-rollercoaster",
    uploadedAt: "2026-07-08"
  },
  {
    id: "creation-4",
    title: "Баскетбольный автомат BricQ",
    caption: "Научный проект без экранов, изучающий рычаги! Мы добавили утяжеленные кубики к пусковой установке, чтобы увидеть, как вес меняет дальность полета наших оранжевых мячиков LEGO. 9 из 10 бросков попадают точно в цель!",
    displayName: "Робототехнический клуб",
    imageSrc: "creation-basketball-machine",
    uploadedAt: "2026-07-15"
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from localStorage if present
  useEffect(() => {
    const savedCreations = localStorage.getItem("lego_education_creations");
    if (savedCreations) {
      try {
        setCreations(JSON.parse(savedCreations));
      } catch (e) {
        setCreations(SEEDED_CREATIONS);
      }
    } else {
      setCreations(SEEDED_CREATIONS);
    }

    const savedCart = localStorage.getItem("lego_education_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  const saveCreationsToStorage = (updated: Creation[]) => {
    setCreations(updated);
    localStorage.setItem("lego_education_creations", JSON.stringify(updated));
  };

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto dismiss
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      localStorage.setItem("lego_education_cart", JSON.stringify(updated));
      return updated;
    });
    showToast(`Набор "${product.title}" добавлен в корзину!`, "success");
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      localStorage.setItem("lego_education_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("lego_education_cart");
  };

  const addCreation = (title: string, caption: string, displayName: string, imageSrc: string) => {
    const newCreation: Creation = {
      id: "creation-" + Date.now(),
      title,
      caption,
      displayName: displayName || "Анонимный изобретатель",
      imageSrc,
      uploadedAt: new Date().toISOString().split("T")[0]
    };

    const updated = [newCreation, ...creations];
    saveCreationsToStorage(updated);
    showToast("Ура! Ваше изобретение добавлено в галерею!", "success");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        creations,
        addCreation,
        notifications,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
