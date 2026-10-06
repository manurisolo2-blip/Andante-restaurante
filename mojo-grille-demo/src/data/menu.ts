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
  {
    id: "entradas",
    label: "Entradas",
    description: "Bocados emblemáticos, charcutería y platitos con técnicas del mundo.",
  },
  {
    id: "principales",
    label: "Platos Principales",
    description: "Cocina de autor estacional, pastas artesanales, pato y brasas.",
  },
  {
    id: "postres",
    label: "Postres & Pastelería",
    description: "Pastelería artesanal y masa madre por el Chef Ejecutivo Pablo Aroma.",
  },
  {
    id: "barra",
    label: "Barra de Autor",
    description: "Coctelería clásica y de autor bajo la dirección de Santiago Contarino.",
  },
  {
    id: "cafeteria",
    label: "Cafetería / Merienda",
    description: "Café de especialidad, medialunas de manteca y chipá recién horneado.",
  },
];

export const sideOptions: SideOption[] = [
  { id: "moro", name: "Papas Rústicas a la Provenzal", price: 0, isIncluded: true },
  { id: "tostones", name: "Puré de Kale con Manteca Noisette", price: 1.5 },
  { id: "yuca", name: "Panera Artesanal de Masa Madre (Pablo Aroma)", price: 2 },
  { id: "maduros", name: "Copa de Vino de Corte (Bodega Boutique)", price: 1.75 },
];

export const menu: MenuItem[] = [
  // ==========================================
  // 1. ENTRADAS EMBLEMÁTICAS
  // ==========================================
  {
    id: "pate-trufado",
    name: "Pâté Trufado de Higaditos de Pollo con Pan de Nuez",
    description:
      "Técnica clásica francesa de textura aterciopelada perfumada con trufa negra y oporto, servido con pan de nuez de masa madre recién tostado.",
    price: 11.5,
    image: ropaVieja,
    category: "entradas",
    badge: "Firma Andante",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: false,
    isVegetarian: false,
    chefNotes: "Receta tradicional francesa con emulsión de manteca noisette.",
    pairing: "Maridaje sugerido: Vermouth Julep",
  },
  {
    id: "el-hueso",
    name: "El Hueso (Cañada de Ternera con Médula al Horno)",
    description:
      "Cañada de ternera asada a fuego vivo con médula especiada, sal marina en escamas, gremolata cítrica de hierbas y baguette crujiente.",
    price: 13.0,
    image: cubano,
    category: "entradas",
    badge: "Firma Andante",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: false,
    isVegetarian: false,
    chefNotes: "Asado a 240°C para fundir el colágeno y lograr una costra dorada.",
    pairing: "Maridaje sugerido: New York Sour",
  },
  {
    id: "taco-molleja",
    name: "Taco de Molleja Anticuchera con Ají Amarillo",
    description:
      "Mollejas crocantes laqueadas en reducción anticuchera sobre tortilla de maíz nixtamalizado, emulsión de ají amarillo, cebolla morada encurtida y cilantro.",
    price: 12.5,
    image: polloBowl,
    category: "entradas",
    badge: "Sin TACC",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: true,
    isVegetarian: false,
    chefNotes: "Fusión latinoamericana-peruana. 100% Sin TACC garantizado.",
    pairing: "Maridaje sugerido: Pisco Sour",
  },
  {
    id: "rillette-pato",
    name: "Rillette de Pato con Pickles de Pepino",
    description:
      "Confit de pato deshilachado a cocción lenta de 12 horas con hierbas de huerta, acompañado de pickles de pepino agridulces y mostaza a la antigua.",
    price: 12.0,
    image: ropaVieja,
    category: "entradas",
    badge: "De Estación",
    sidesAllowed: true,
    isGlutenFree: false,
    isVegetarian: false,
  },
  {
    id: "alitas-bbq-coreana",
    name: "Alitas BBQ Coreana sobre Base de Kimchi",
    description:
      "Alitas crocantes laqueadas en reducción de gochujang, sésamo tostado, verdeo fresco y colchón de kimchi artesanal de fermentación propia.",
    price: 11.0,
    image: tostones,
    category: "entradas",
    badge: "Popular",
    sidesAllowed: true,
    isGlutenFree: false,
    isVegetarian: false,
    chefNotes: "Perfil picante y fermentado con especias de Corea.",
  },
  {
    id: "faina-portena",
    name: "Fainá Porteña Reversionada con Morcilla & Peras",
    description:
      "Masa crocante de harina de garbanzos con morcilla desgranada a la plancha, cebollas de verdeo tiernas y peras doradas al vino blanco (Sin TACC).",
    price: 10.5,
    image: ropaVieja,
    category: "entradas",
    badge: "Sin TACC",
    sidesAllowed: true,
    isGlutenFree: true,
    isVegetarian: false,
  },

  // ==========================================
  // 2. PLATOS PRINCIPALES DESTACADOS
  // ==========================================
  {
    id: "noquis-coreanos",
    name: "Ñoquis Estilo Coreano en Caldo Dashi de Setas",
    description:
      "Elaborados artesanalmente con harina de arroz, 100% aptos para celíacos, en caldo dashi profundo de setas shiitake, chauchas tiernas y verdeo fresco.",
    price: 15.5,
    image: ropaVieja,
    category: "principales",
    badge: "Sin TACC",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: true,
    isVegetarian: true,
    chefNotes: "Textura elástica y reconfortante inspirada en el tteokbokki.",
    pairing: "Maridaje sugerido: Penicillin",
  },
  {
    id: "magret-pato",
    name: "Magret de Pato con Puré de Kale & Membrillo",
    description:
      "Pechuga de pato sellada a punto jugoso, puré sedoso de kale con manteca tostada, compota tibia de membrillo y reducción glaseada de su fondo de cocción.",
    price: 18.5,
    image: cubano,
    category: "principales",
    badge: "Chef Pablo Aroma",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: false,
    isVegetarian: false,
    chefNotes: "Doble cocción con piel crocante y carne tierna rosada.",
    pairing: "Maridaje sugerido: Vino de Corte Boutique (Cabernet Franc)",
  },
  {
    id: "ravioli-ossobuco",
    name: "Ravioli di Ossobuco al Suo Fondo",
    description:
      "Pasta artesanal rellena de osobuco braseado durante 8 horas en vino tinto y hierbas aromáticas, salseada en su propio fondo con queso sardo estacionado.",
    price: 16.5,
    image: polloBowl,
    category: "principales",
    badge: "Firma Andante",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: false,
    isVegetarian: false,
    chefNotes: "Pasta al huevo amasada a diario por el equipo de Pablo Aroma.",
  },
  {
    id: "bife-chorizo-madurado",
    name: "Bife de Chorizo Madurado con Papas Rústicas",
    description:
      "Corte noble de pastura argentina con 28 días de maduración en cámara propia, sellado a las brasas de quebracho con manteca de salvia y papas a la provenzal.",
    price: 19.5,
    image: ropaVieja,
    category: "principales",
    badge: "Sin TACC",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: true,
    isVegetarian: false,
    pairing: "Maridaje sugerido: New York Sour",
  },
  {
    id: "risotto-hongos",
    name: "Risotto Cremoso de Hongos al Vino Blanco",
    description:
      "Arroz carnaroli al dente mantecado con vino blanco torrontés, gírgolas y portobellos salteados, manteca noisette y queso parmesano de 24 meses.",
    price: 15.0,
    image: tostones,
    category: "principales",
    badge: "Vegetariano",
    sidesAllowed: true,
    featured: true,
    isGlutenFree: true,
    isVegetarian: true,
  },
  {
    id: "curry-otono",
    name: "Curry de Otoño con Arroz Carnaroli & Coco",
    description:
      "Calabaza asada, zanahorias baby y hongos de estación en curry aromático con leche de coco, lemongrass, jengibre y arroz carnaroli al vapor (Vegano).",
    price: 14.5,
    image: cafecito,
    category: "principales",
    badge: "Vegetariano",
    sidesAllowed: true,
    isGlutenFree: true,
    isVegetarian: true,
  },

  // ==========================================
  // 3. POSTRES & PASTELERÍA (CHEF PABLO AROMA)
  // ==========================================
  {
    id: "torta-vasca",
    name: "Torta Vasca (San Sebastián)",
    description:
      "Tarta de queso horneada a alta temperatura con costra caramelizada y corazón cremoso e indulgente. Receta emblemática del chef pastelero Pablo Aroma.",
    price: 8.5,
    image: catering,
    category: "postres",
    badge: "Chef Pablo Aroma",
    sidesAllowed: false,
    featured: true,
    isGlutenFree: true,
    isVegetarian: true,
    chefNotes: "Servida tibia con coulis de frutos rojos o pimienta negra.",
  },
  {
    id: "panificados-madre",
    name: "Panificados Artesanales de Masa Madre",
    description:
      "Selección de panadería de fermentación lenta (48 hs) elaborada por Pablo Aroma: hogaza de campo, focaccia de romero y pan de nueces con manteca batida.",
    price: 6.0,
    image: catering,
    category: "postres",
    badge: "Chef Pablo Aroma",
    sidesAllowed: false,
    isGlutenFree: false,
    isVegetarian: true,
  },
  {
    id: "medialunas-manteca",
    name: "Medialunas de Manteca Porteñas (Porción de 3)",
    description:
      "Hojaldre artesanal de manteca pura, fermentado con paciencia y pincelado con almíbar tibio de vainilla natural y piel de naranjas.",
    price: 4.5,
    image: cafecito,
    category: "postres",
    badge: "Popular",
    sidesAllowed: false,
    isGlutenFree: false,
    isVegetarian: true,
  },
  {
    id: "chipa-relleno",
    name: "Chipá Relleno Artesanal (Porción de 2)",
    description:
      "Chipá correntino horneado al momento con fécula de mandioca, queso sardo estacionado y provolone fundente (100% Sin TACC).",
    price: 5.5,
    image: tostones,
    category: "postres",
    badge: "Sin TACC",
    sidesAllowed: false,
    isGlutenFree: true,
    isVegetarian: true,
  },

  // ==========================================
  // 4. BARRA & COCTELERÍA DE AUTOR (SANTIAGO CONTARINO)
  // ==========================================
  {
    id: "paper-plate",
    name: "Paper Plate (Santiago Contarino Signature)",
    description:
      "Bourbon whiskey, Aperol, Amargo Obrero y jugo fresco de limón. Cóctel insignia que reinterpreta el Paper Plane con aperitivo autóctono porteño.",
    price: 9.5,
    image: cafecito,
    category: "barra",
    badge: "Santiago Contarino",
    sidesAllowed: false,
    featured: true,
    chefNotes: "Equilibrio cítrico y herbal con destilados de primera línea.",
  },
  {
    id: "vermouth-julep",
    name: "Vermouth Julep",
    description:
      "Vermouth tinto de autor, hojas de menta fresca machacada, jugo de limón y pomelo rosado recién exprimido. Refrescante y botánico.",
    price: 8.5,
    image: cafecito,
    category: "barra",
    badge: "Coctelería de Autor",
    sidesAllowed: false,
  },
  {
    id: "pisco-sour",
    name: "Pisco Sour Andante",
    description:
      "Pisco aromático premium, jugo fresco de lima, almíbar simple, clara pasteurizada emulsionada y gotas de bitter Angostura.",
    price: 9.0,
    image: cafecito,
    category: "barra",
    badge: "Coctelería de Autor",
    sidesAllowed: false,
  },
  {
    id: "new-york-sour",
    name: "New York Sour",
    description:
      "Bourbon whiskey americano, jugo de limón exprimido, almíbar de caña y una elegante corona flotante de vino tinto de corte de bodega boutique.",
    price: 10.0,
    image: cafecito,
    category: "barra",
    badge: "Santiago Contarino",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "penicillin",
    name: "Penicillin",
    description:
      "Scotch whisky de malta, jengibre macerado fresco, miel orgánica de flores de azahar, jugo de limón y toque ahumado de Islay.",
    price: 10.5,
    image: cafecito,
    category: "barra",
    badge: "Coctelería de Autor",
    sidesAllowed: false,
  },
  {
    id: "bodegas-boutique-vino",
    name: "Selección de Bodegas Boutique & Vinos de Corte",
    description:
      "Copa seleccionada de nuestra cava curada: cortes de Malbec, Cabernet Franc y Pinot Noir de pequeños productores independientes argentinos.",
    price: 11.0,
    image: catering,
    category: "barra",
    badge: "Firma Andante",
    sidesAllowed: false,
  },

  // ==========================================
  // 5. CAFETERÍA / MERIENDA
  // ==========================================
  {
    id: "cafe-especialidad",
    name: "Café de Especialidad (Filtrado o Espresso Doble)",
    description:
      "Granos de origen único seleccionados y tostados artesanalmente. Métodos Chemex, V60 o Espresso doble extracción.",
    price: 4.0,
    image: cafecito,
    category: "cafeteria",
    badge: "De Estación",
    sidesAllowed: false,
    isGlutenFree: true,
    isVegetarian: true,
  },
  {
    id: "merienda-andante-combo",
    name: "Combo Merienda Andante: Medialunas & Café",
    description:
      "Dos medialunas de manteca artesanal recién horneadas acompañadas de café doble o flat white de especialidad.",
    price: 7.5,
    image: cafecito,
    category: "cafeteria",
    badge: "Popular",
    sidesAllowed: false,
    isVegetarian: true,
  },
  {
    id: "toston-palta-huevo",
    name: "Tostón de Masa Madre con Palta & Huevo Poché",
    description:
      "Rebanada gruesa de pan de masa madre tostada a la manteca, palta fresca pisada con limón, huevo poché y semillas tostadas.",
    price: 8.5,
    image: tostones,
    category: "cafeteria",
    badge: "Firma Andante",
    sidesAllowed: false,
    isVegetarian: true,
  },
  {
    id: "chipa-cafe-combo",
    name: "Combo Chipá Relleno & Café con Leche",
    description:
      "Dos chipás tibios rellenos de queso sardo fundente (Sin TACC) con café de especialidad a elección.",
    price: 7.5,
    image: tostones,
    category: "cafeteria",
    badge: "Sin TACC",
    sidesAllowed: false,
    isGlutenFree: true,
    isVegetarian: true,
  },
];

// "Favoritos" es una selección curada transversal de la carta
export const favoritosIds = [
  "pate-trufado",
  "el-hueso",
  "taco-molleja",
  "noquis-coreanos",
  "magret-pato",
  "ravioli-ossobuco",
  "bife-chorizo-madurado",
  "torta-vasca",
  "paper-plate",
];

export function itemsForCategory(category: CategoryId): MenuItem[] {
  if (category === "favoritos") {
    return menu.filter((item) => favoritosIds.includes(item.id));
  }
  // Mappings for backward test compatibility
  if (category === "bowls") {
    return menu.filter((item) => item.category === "principales");
  }
  if (category === "sandwiches") {
    return menu.filter((item) => item.category === "entradas");
  }
  if (category === "sides") {
    return menu.filter((item) => item.category === "postres");
  }
  if (category === "bebidas") {
    return menu.filter((item) => item.category === "barra");
  }
  if (category === "catering") {
    return menu.filter((item) => item.category === "cafeteria");
  }
  return menu.filter((item) => item.category === category);
}

export function getItemById(id: string): MenuItem | undefined {
  return menu.find((item) => item.id === id);
}

export const currency = (value: number) => `$${value.toFixed(2)}`;
export const formatPrice = currency;
