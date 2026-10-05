import ropaVieja from "@/assets/mojo-bowl-ropa-vieja.jpg";
import cubano from "@/assets/mojo-cubano.jpg";
import tostones from "@/assets/mojo-tostones.jpg";
import polloBowl from "@/assets/mojo-pollo-bowl.jpg";
import cafecito from "@/assets/mojo-cafecito.jpg";
import catering from "@/assets/mojo-catering.jpg";

import type {
  Category,
  CategoryId,
  MenuItem,
  BadgeType,
  SideOption,
} from "@/types/mojo";

// Re-export type contracts for seamless module interoperability
export type { Category, CategoryId, MenuItem, BadgeType, SideOption };

/**
 * Categorías oficiales de la carta de Andante Restaurante Bar
 * Palermo Hollywood, Buenos Aires.
 */
export const categories: Category[] = [
  { id: "favoritos", label: "Firma Andante / Favoritos" },
  { id: "bowls", label: "Cocina de Mercado & Principales" },
  { id: "sandwiches", label: "Bistró & Bocados de Autor" },
  { id: "sides", label: "Guarniciones & Entradas" },
  { id: "bebidas", label: "Café de Especialidad & Coctelería" },
  { id: "catering", label: "Ciclos de Jazz & Cava Privada" },
];

export const sideOptions: SideOption[] = [
  { id: "moro", name: "Guarnición Estacional (Milhojas de Papa / Puré Trufado)", price: 0, isIncluded: true },
  { id: "tostones", name: "Ensalada Tibia de Hojas de Huerta & Vinagreta", price: 1.5 },
  { id: "yuca", name: "Panera Artesanal Sin TACC & Manteca de Salvia", price: 2 },
  { id: "maduros", name: "Copa de Vino de Autor (Pinot Noir de la Patagonia)", price: 1.75 },
];

export const menu: MenuItem[] = [
  // --- Cocina de Mercado & Principales (100% Sin TACC garantizado) ---
  {
    id: "ropa-vieja-bowl",
    name: "Bife de Chorizo Madurado con Manteca de Salvia",
    description:
      "Corte seleccionado madurado a las brasas con manteca de salvia fresca, milhojas de papas crocantes, demi-glace artesanal y emulsión de hongos silvestres. 100% libre de gluten garantizado.",
    price: 16.95,
    image: ropaVieja,
    category: "bowls",
    badge: "Firma Andante",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "lechon-asado-bowl",
    name: "Risotto de Hongos Silvestres & Aceite de Trufa",
    description:
      "Arroz carnaroli al dente cocinado a fuego pausado con gírgolas de mercado, manteca noisette, queso parmesano estacionado 24 meses y gotas de trufa negra fresca (Sin TACC).",
    price: 15.95,
    image: ropaVieja,
    category: "bowls",
    badge: "Sin TACC",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "pollo-mojo-bowl",
    name: "Pesca del Día a la Plancha con Puré de Coliflor",
    description:
      "Pesca fresca de anzuelo sellada al sartén de hierro, puré aterciopelado de coliflor asada, crocante de alcaparras baby y emulsión cítrica de hierbas frescas de huerta.",
    price: 15.5,
    image: polloBowl,
    category: "bowls",
    badge: "De Estación",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "vaca-frita-bowl",
    name: "Carpaccio de Lomo Curado & Focaccia Sin TACC",
    description:
      "Finas láminas de lomo de pastura curado, reducción de aceto balsámico de Módena, emulsión de dijón en grano, rúcula selvática y escamas de queso sardo con focaccia artesanal tibia.",
    price: 17.5,
    image: ropaVieja,
    category: "bowls",
    badge: "Popular",
    sidesAllowed: true,
  },

  // --- Bistró & Bocados de Autor ---
  {
    id: "cubano-prensado",
    name: "Sándwich Andante de Panceta Confitada & Gruyère",
    description:
      "Panceta braseada a fuego lento durante 8 horas, queso gruyère fundido, mostaza en grano a la antigua y pepinillos agridulces en pan crujiente tostado con manteca.",
    price: 14.95,
    image: cubano,
    category: "sandwiches",
    badge: "Firma Andante",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "media-noche",
    name: "Brioche Tostado con Jamón Crudo & Stracciatella",
    description:
      "Pan brioche artesanal dorado a la plancha, jamón crudo de guarda 18 meses, stracciatella cremosa, higos frescos glaseados y hojas tiernas de albahaca morada.",
    price: 13.95,
    image: cubano,
    category: "sandwiches",
    badge: "Top Seller",
    sidesAllowed: true,
  },
  {
    id: "pan-con-lechon",
    name: "Bocado de Osobuco Braseado & Tuétano",
    description:
      "Osobuco cocido a baja temperatura con vino tinto y mirepoix aromático, servido en pan crocante de masa madre con emulsión tibia de tuétano y cebollas moradas encurtidas.",
    price: 13.95,
    image: cubano,
    category: "sandwiches",
    badge: "Popular",
    sidesAllowed: true,
  },

  // --- Guarniciones & Entradas ---
  {
    id: "tostones-mojo",
    name: "Burrata Cremosa de Tandil & Higos Asados",
    description:
      "Burrata fresca con corazón de crema, tomates reliquia confitados, pesto de albahaca fresca y pistachos tostados con lluvia de sal marina (Sin TACC).",
    price: 7.5,
    image: tostones,
    category: "sides",
    badge: "Sin TACC",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "yuca-con-mojo",
    name: "Croquetas de Jamón de Bellota & Alioli Suave",
    description:
      "Cuatro piezas doradas de bechamel sedosa infusionada con jamón ibérico, fritas al momento y acompañadas de alioli de ajo asado al rescoldo.",
    price: 6.95,
    image: tostones,
    category: "sides",
    badge: "Popular",
    sidesAllowed: false,
  },
  {
    id: "platanos-maduros",
    name: "Papas Rústicas Rotas al Romero & Flor de Sal",
    description:
      "Papas de campo crocantes y doradas, perfumadas con romero fresco de nuestra huerta orgánica y cristales de sal marina.",
    price: 5.5,
    image: tostones,
    category: "sides",
    badge: "Popular",
    sidesAllowed: false,
  },
  {
    id: "arroz-moro-side",
    name: "Zanahorias Glaseadas al Horno de Barro & Queso de Cabra",
    description:
      "Zanahorias de mercado glaseadas con miel de monte y tomillo fresco, servidas sobre base tibia de queso de cabra artesanal desgranado.",
    price: 5.0,
    image: tostones,
    category: "sides",
    badge: "Fresco del día",
    sidesAllowed: false,
  },

  // --- Café de Especialidad & Coctelería de Autor ---
  {
    id: "cafecito-cubano",
    name: "Espresso Doble de Especialidad (Huila, Colombia)",
    description:
      "Extracción calibrada en máquina espresso La Marzocco. Tostado medio, acidez brillante y notas a chocolate amargo y avellanas.",
    price: 3.5,
    image: cafecito,
    category: "bebidas",
    badge: "Firma Andante",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "cafecito-pastelito",
    name: "Flat White Andante & Financier Sin TACC",
    description:
      "Espresso de especialidad doble con leche texturizada sedosa, acompañado de un mini financier tibio de almendras y manteca noisette sin TACC.",
    price: 5.95,
    image: cafecito,
    category: "bebidas",
    badge: "Popular",
    sidesAllowed: false,
  },
  {
    id: "flan-tradicional",
    name: "Cóctel de Autor 'Compás 76' (Bourbon & Cacao)",
    description:
      "Bourbon añejo macerado en nibs de cacao criollo, vermut rosso artesanal, bitter aromático de la casa y piel de naranja flameada.",
    price: 9.5,
    image: cafecito,
    category: "bebidas",
    badge: "Coctelería de Autor",
    sidesAllowed: false,
  },
  {
    id: "batido-mamey",
    name: "Cóctel 'Nocturno en Palermo' (Gin & Sauco)",
    description:
      "Gin botánico de destilería local, licor de flor de sauco, pomelo rosado clarificado y una rama de romero quemado al servicio.",
    price: 9.0,
    image: cafecito,
    category: "bebidas",
    badge: "Coctelería de Autor",
    sidesAllowed: false,
  },

  // --- Ciclos de Jazz & Cava Privada ---
  {
    id: "bandeja-familiar",
    name: "Experiencia Jazz & Cena Degustación (5 Pasos)",
    description:
      "Mesa reservada para noche de jazz en vivo en Palermo Hollywood. Menú de cinco pasos estacionales con maridaje de vinos de autor y café de especialidad.",
    price: 129,
    image: catering,
    category: "catering",
    badge: "Firma Andante",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "cubano-party-platter",
    name: "Cata Exclusiva en Cava Subsuelo (Hasta 12 Personas)",
    description:
      "Uso exclusivo de nuestra cava histórica en Arévalo 1677 con sommelier personal, selección de quesos de guarda y charcutería artesanal.",
    price: 89,
    image: catering,
    category: "catering",
    badge: "De Estación",
    sidesAllowed: false,
  },
];

// "Favoritos" es una selección curada transversal de la carta
export const favoritosIds = [
  "ropa-vieja-bowl",
  "cubano-prensado",
  "lechon-asado-bowl",
  "pollo-mojo-bowl",
  "tostones-mojo",
  "cafecito-cubano",
];

export function itemsForCategory(category: CategoryId): MenuItem[] {
  if (category === "favoritos") {
    return menu.filter((item) => favoritosIds.includes(item.id));
  }
  return menu.filter((item) => item.category === category);
}

export function getItemById(id: string): MenuItem | undefined {
  return menu.find((item) => item.id === id);
}

export const currency = (value: number) => `$${value.toFixed(2)}`;
export const formatPrice = currency;
