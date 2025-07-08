import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Aether-Stride Runners",
    description: "Lightweight and responsive for daily runs.",
    longDescription:
      "The Aether-Stride Runners are engineered for the dedicated runner seeking a blend of lightweight performance and responsive cushioning. Featuring a breathable mesh upper and a proprietary foam midsole, these shoes provide exceptional energy return and comfort mile after mile. The durable rubber outsole offers superior traction on various surfaces, making them perfect for both road and track.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ab?auto=format&fit=crop&w=800&q=60",
    category: "Running Shoes",
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        comfort: 95,
        fit: 91,
        quality: 89,
      },
    },
    dataAiHint: "running shoe",
  },
  {
    id: "2",
    name: "Terra-Trek Hikers",
    description: "Durable and waterproof for rugged trails.",
    longDescription:
      "Conquer any trail with the Terra-Trek Hikers. Built with a rugged, waterproof membrane and a high-traction outsole, these boots keep your feet dry and secure in all conditions. The cushioned insole and supportive ankle collar ensure all-day comfort, while the reinforced toe cap protects against rocks and debris. Ideal for serious hikers and outdoor adventurers.",
    price: 179.99,
    image:
      "https://images.unsplash.com/photo-1520219321354-08a7b9853934?auto=format&fit=crop&w=800&q=60",
    category: "Waterproof Hiking Boots",
    sentiment: {
      positive: 95,
      negative: 5,
      aspects: {
        comfort: 92,
        fit: 94,
        quality: 98,
      },
    },
    dataAiHint: "hiking boot",
  },
  {
    id: "3",
    name: "Urban-Ease Loafers",
    description: "Classic style meets modern comfort.",
    longDescription:
      "The Urban-Ease Loafers redefine casual sophistication. Crafted from premium full-grain leather and featuring a cushioned footbed, they offer unparalleled comfort for all-day wear. The timeless design pairs effortlessly with both casual and semi-formal attire, making them a versatile staple for any wardrobe. A flexible rubber sole provides durability and grip.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=60",
    category: "Casual Loafers",
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: {
        comfort: 90,
        fit: 85,
        quality: 91,
      },
    },
    dataAiHint: "leather loafer",
  },
  {
    id: "4",
    name: "Gym-Flex Trainers",
    description: "Versatile support for any workout.",
    longDescription:
      "Maximize your performance with the Gym-Flex Trainers. Designed for versatility, these shoes provide a stable base for lifting, flexibility for agility drills, and cushioning for high-impact activities. The breathable upper keeps your feet cool, while the multi-directional tread pattern ensures grip during dynamic movements. Your perfect all-in-one gym companion.",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1595950653106-60904f39b8f2?auto=format&fit=crop&w=800&q=60",
    category: "Cross-Training Shoes",
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        comfort: 93,
        fit: 90,
        quality: 89,
      },
    },
    dataAiHint: "training shoe",
  },
  {
    id: "5",
    name: "Cloud-Comfort Sandals",
    description: "Plush sandals for ultimate relaxation.",
    longDescription:
      "Experience walking on clouds with the Cloud-Comfort Sandals. Featuring a contoured footbed made from ultra-soft recovery foam, these sandals are perfect for post-workout or casual strolls. The adjustable strap ensures a secure fit, while the lightweight design makes them easy to wear all day long.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1603487742131-4128386834ab?auto=format&fit=crop&w=800&q=60",
    category: "Sandals",
    sentiment: {
      positive: 96,
      negative: 4,
      aspects: {
        comfort: 99,
        fit: 94,
        quality: 92,
      },
    },
    dataAiHint: "comfort sandal",
  },
  {
    id: "6",
    name: "Stealth-Fit Aqua Socks",
    description: "Barefoot feel, maximum protection.",
    longDescription:
      "Protect your feet without sacrificing performance with the Stealth-Fit Aqua Socks. Ideal for water sports, beach-going, and pool use, these socks feature a thin but durable sole to guard against sharp objects, and a quick-drying, four-way stretch upper for a snug, comfortable fit. They are so lightweight you will forget you are wearing them.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1589412499202-e889a14b53a4?auto=format&fit=crop&w=800&q=60",
    category: "Waterproof Socks",
    sentiment: {
      positive: 85,
      negative: 15,
      aspects: {
        comfort: 88,
        fit: 92,
        quality: 81,
      },
    },
    dataAiHint: "water sock",
  },
  {
    id: "7",
    name: "Executive Dress Shoes",
    description: "Timeless elegance for formal occasions.",
    longDescription:
      "Make a statement with the Executive Dress Shoes. Meticulously crafted from polished Italian leather, these shoes feature a classic Oxford design, welt construction, and a leather sole for a distinguished look. A memory foam insole provides surprising comfort for a shoe this elegant, making them suitable for long days at the office or formal events.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1449505291416-248c82375171?auto=format&fit=crop&w=800&q=60",
    category: "Formal Shoes",
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: {
        comfort: 85,
        fit: 90,
        quality: 97,
      },
    },
    dataAiHint: "dress shoe",
  },
  {
    id: "8",
    name: "Trailblazer Boots",
    description: "All-weather boot for the urban explorer.",
    longDescription:
      "The Trailblazer Boots blend rugged functionality with street-ready style. Made from weather-resistant materials and featuring a cushioned collar and lightweight lug sole, these boots are as comfortable as they are durable. Whether you are navigating city streets or light trails, the Trailblazers offer the perfect combination of style and performance.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1608256249259-8367ca9b2c89?auto=format&fit=crop&w=800&q=60",
    category: "Lifestyle Boots",
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        comfort: 91,
        fit: 88,
        quality: 94,
      },
    },
    dataAiHint: "lifestyle boot",
  },
  {
    id: "9",
    name: "Lightweight Rain Jacket",
    description: "Stay dry and comfortable in unexpected showers.",
    longDescription:
      "This lightweight rain jacket is perfect for layering and provides excellent protection against the rain. It features a waterproof and breathable fabric, adjustable hood, and zippered pockets. Easily packable for on-the-go convenience.",
    price: 65.5,
    image:
      "https://images.unsplash.com/photo-1628427255527-e1c4e1a1a6d2?auto=format&fit=crop&w=800&q=60",
    category: "Jackets",
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        quality: 92,
        waterproof: 95,
        comfort: 90,
      },
    },
    dataAiHint: "rain jacket",
  },
  {
    id: "10",
    name: "Insulated Puffer Jacket",
    description: "Warm and cozy for cold weather.",
    longDescription:
      "Stay warm during the colder months with this insulated puffer jacket. It features a durable outer shell, synthetic insulation for excellent warmth, and a comfortable lining. Perfect for everyday wear in chilly conditions.",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1613715642502-735a725f522c?auto=format&fit=crop&w=800&q=60",
    category: "Jackets",
    sentiment: {
      positive: 94,
      negative: 6,
      aspects: {
        warmth: 96,
        comfort: 93,
        quality: 95,
      },
    },
    dataAiHint: "puffer jacket",
  },
  {
    id: "11",
    name: "Softshell Jacket",
    description: "Windproof and water-resistant for outdoor activities.",
    longDescription:
      "This versatile softshell jacket offers excellent protection against wind and light rain while providing breathability for active use. It features a soft fleece lining for added comfort and warmth, and multiple pockets for storage. Ideal for hiking, cycling, and other outdoor adventures.",
    price: 78.0,
    image:
      "https://images.unsplash.com/photo-1605405450891-9e4170801e91?auto=format&fit=crop&w=800&q=60",
    category: "Jackets",
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        windproof: 92,
        comfort: 88,
        quality: 87,
      },
    },
    dataAiHint: "softshell jacket",
  },
  {
    id: "12",
    name: "Denim Jacket",
    description: "Classic and stylish for casual wear.",
    longDescription:
      "A timeless denim jacket that adds a touch of casual style to any outfit. Made from durable denim fabric, it features a button-front closure, chest pockets, and adjustable cuffs. Perfect for layering over t-shirts and sweaters.",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1587113302602-f5572944b521?auto=format&fit=crop&w=800&q=60",
    category: "Jackets",
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: {
        style: 95,
        quality: 90,
        fit: 91,
      },
    },
    dataAiHint: "denim jacket",
  },
  {
    id: "13",
    name: "Fleece Jacket",
    description: "Warm and comfortable mid-layer.",
    longDescription:
      "This soft and cozy fleece jacket is perfect as a mid-layer for added warmth or as a standalone jacket in milder weather. It features a full-zip front, hand pockets, and a stand-up collar. Made from recycled materials.",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1562894088-5c7980677037?auto=format&fit=crop&w=800&q=60",
    category: "Jackets",
    sentiment: {
      positive: 96,
      negative: 4,
      aspects: {
        warmth: 94,
        comfort: 98,
        quality: 95,
      },
    },
    dataAiHint: "fleece jacket",
  },
  {
    id: "14",
    name: "SPF 50 Sunscreen Lotion",
    description: "High-protection sunscreen for face and body.",
    longDescription:
      "Provides broad-spectrum SPF 50 protection against UVA and UVB rays. This lightweight, non-greasy lotion is water-resistant for up to 80 minutes and suitable for all skin types. Helps prevent sunburn and reduces the risk of skin cancer.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1625729509978-5465a2a9d1b5?auto=format&fit=crop&w=800&q=60",
    category: "Sunscreen Cream",
    sentiment: {
      positive: 95,
      negative: 5,
      aspects: {
        protection: 98,
        texture: 93,
        effectiveness: 96,
      },
    },
    dataAiHint: "SPF 50 sunscreen lotion",
  },
  {
    id: "15",
    name: "Mineral Sunscreen Stick",
    description: "Convenient and easy-to-apply sun protection.",
    longDescription:
      "This mineral sunscreen stick offers broad-spectrum SPF 30 protection and is perfect for targeted application on the face, ears, and other exposed areas. Made with zinc oxide and titanium dioxide, it is gentle on sensitive skin and water-resistant.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1627381915033-f5f29d67250e?auto=format&fit=crop&w=800&q=60",
    category: "Sunscreen Cream",
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        convenience: 96,
        sensitivity: 94,
        protection: 91,
      },
    },
    dataAiHint: "mineral sunscreen stick",
  },
  {
    id: "16",
    name: "After Sun Lotion with Aloe Vera",
    description: "Soothe and hydrate skin after sun exposure.",
    longDescription:
      "Replenish moisture and calm sun-exposed skin with this soothing after sun lotion. Infused with natural aloe vera and vitamin E, it helps to cool, hydrate, and nourish the skin. Non-greasy formula absorbs quickly.",
    price: 6.75,
    image:
      "https://images.unsplash.com/photo-1624113366690-a121c3c5a1e3?auto=format&fit=crop&w=800&q=60",
    category: "Sunscreen Cream",
    sentiment: {
      positive: 97,
      negative: 3,
      aspects: {
        soothing: 99,
        hydration: 97,
        smell: 95,
      },
    },
    dataAiHint: "after sun lotion",
  },
  {
    id: "17",
    name: "Kids Sunscreen Spray SPF 45",
    description: "Easy-to-apply sun protection for kids.",
    longDescription:
      "Keep your kids protected from the sun with this broad-spectrum SPF 45 sunscreen spray. The continuous spray allows for easy and quick application, even on squirming kids. Water-resistant and pediatrician-tested.",
    price: 10.2,
    image:
      "https://images.unsplash.com/photo-1625729512010-e56d89a21180?auto=format&fit=crop&w=800&q=60",
    category: "Sunscreen Cream",
    sentiment: {
      positive: 94,
      negative: 6,
      aspects: {
        ease_of_application: 98,
        protection: 95,
        gentleness: 92,
      },
    },
    dataAiHint: "kids sunscreen spray",
  },
  {
    id: "18",
    name: "Face Sunscreen SPF 30",
    description: "Lightweight and non-comedogenic face sunscreen.",
    longDescription:
      "This facial sunscreen provides SPF 30 protection without clogging pores. The lightweight, oil-free formula is ideal for daily use under makeup. Contains antioxidants to help protect against environmental damage.",
    price: 15.0,
    image:
      "https://images.unsplash.com/photo-1608432611600-f348862a222f?auto=format&fit=crop&w=800&q=60",
    category: "Sunscreen Cream",
    sentiment: {
      positive: 96,
      negative: 4,
      aspects: {
        texture: 97,
        non_greasy: 95,
        protection: 96,
      },
    },
    dataAiHint: "face sunscreen",
  },
  {
    id: "19",
    name: "Fresh Carrots (1 lb bag)",
    description: "Sweet and crunchy, perfect for snacking and cooking.",
    longDescription:
      "Naturally sweet and packed with vitamins, these fresh carrots are a versatile addition to your kitchen. Enjoy them raw as a healthy snack, add them to salads, soups, stews, or use them in stir-fries and roasted vegetable dishes.",
    price: 1.49,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9f523e1e0?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables",
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        freshness: 95,
        taste: 93,
        quality: 91,
      },
    },
    dataAiHint: "carrots",
    tags: [
      "ingredient: fried rice",
      "ingredient: soup",
      "ingredient: stew",
      "ingredient: snack",
    ],
  },
  {
    id: "20",
    name: "Broccoli Florets (12 oz bag)",
    description: "Convenient pre-cut broccoli florets.",
    longDescription:
      "Save time on meal prep with these pre-washed and pre-cut broccoli florets. A great source of vitamins and fiber, they are perfect for steaming, stir-frying, roasting, or adding to casseroles and pasta dishes.",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1580310532853-c6910449b44c?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables",
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        convenience: 96,
        freshness: 89,
        quality: 90,
      },
    },
    dataAiHint: "broccoli florets",
    tags: [
      "ingredient: fried rice",
      "ingredient: stir fry",
      "ingredient: steaming",
    ],
  },
  {
    id: "21",
    name: "Yellow Onion (each)",
    description: "A kitchen staple for adding flavor to dishes.",
    longDescription:
      "These versatile yellow onions provide a pungent and sweet flavor when cooked, making them a fundamental ingredient in countless recipes. Use them as a base for soups, stews, sauces, stir-fries, and more.",
    price: 0.79,
    image:
      "https://images.unsplash.com/photo-1614231736603-797931f93168?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables",
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: {
        freshness: 95,
        flavor: 94,
        quality: 92,
      },
    },
    dataAiHint: "yellow onion",
    tags: [
      "ingredient: fried rice",
      "ingredient: soup base",
      "ingredient: stir fry",
      "ingredient: sautéing",
    ],
  },
  {
    id: "22",
    name: "Green Bell Pepper (each)",
    description: "Crisp and slightly bitter, adds color and flavor.",
    longDescription:
      "Green bell peppers offer a crisp texture and a slightly bitter taste that complements many savory dishes. They are excellent in stir-fries, salads, fajitas, and stuffed pepper recipes. A good source of Vitamin C.",
    price: 1.2,
    image:
      "https://images.unsplash.com/photo-1598512751244-34566f3e6b22?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables",
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        freshness: 93,
        flavor: 90,
        quality: 92,
      },
    },
    dataAiHint: "green bell pepper",
    tags: [
      "ingredient: fried rice",
      "ingredient: stir fry",
      "ingredient: fajitas",
      "ingredient: salad",
    ],
  },
  {
    id: "23",
    name: "Frozen Peas (10 oz bag)",
    description: "Convenient and versatile frozen peas.",
    longDescription:
      "Quickly add sweetness and vibrant color to your meals with these frozen peas. They are already shelled and ready to use in soups, stews, pasta dishes, rice dishes, and as a simple side vegetable. Flash-frozen to preserve nutrients.",
    price: 1.8,
    image:
      "https://images.unsplash.com/photo-1619776620430-0b528b41984c?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables",
    sentiment: {
      positive: 94,
      negative: 6,
      aspects: {
        convenience: 97,
        sweetness: 95,
        quality: 93,
      },
    },
    dataAiHint: "frozen peas",
    tags: [
      "ingredient: fried rice",
      "ingredient: soup",
      "ingredient: stew",
      "ingredient: side dish",
    ],
  },
  {
    id: "24",
    name: "Ginger (fresh, per lb)",
    description: "Aromatic and zesty, essential for many cuisines.",
    longDescription:
      "Add a warm, spicy, and pungent flavor to your cooking with fresh ginger root. Use it grated, sliced, or minced in stir-fries, curries, marinades, and baked goods. Known for its potential health benefits.",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1589381993212-936677022efb?auto=format&fit=crop&w=800&q=60",
    category: "Vegetables", // Often categorized with spices/herbs but fits here for recipe ingredients
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        freshness: 94,
        flavor: 96,
        quality: 90,
      },
    },
    dataAiHint: "fresh ginger",
    tags: [
      "ingredient: fried rice",
      "ingredient: stir fry",
      "ingredient: curry",
      "ingredient: marinade",
    ],
  },
  {
    id: "25",
    name: "Jasmine Rice (5 lb bag)",
    description: "Fragrant long-grain rice, perfect for Asian dishes.",
    longDescription:
      "Premium quality jasmine rice with a delicate floral aroma and soft, fluffy texture. Ideal for fried rice, curries, and stir-fries.",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60",
    category: "Pantry",
    sentiment: {
      positive: 94,
      negative: 6,
      aspects: {
        freshness: 96,
        taste: 95,
        quality: 93,
      },
    },
    dataAiHint: "jasmine rice",
    tags: ["ingredient: fried rice", "ingredient: curry", "pantry staple"],
  },
  {
    id: "26",
    name: "Soy Sauce (500ml)",
    description: "Classic soy sauce for Asian cooking.",
    longDescription:
      "A must-have condiment for stir-fries, fried rice, and marinades. This soy sauce is brewed for a rich, umami flavor and deep color.",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=60",
    category: "Pantry",
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        flavor: 95,
        quality: 91,
      },
    },
    dataAiHint: "soy sauce",
    tags: ["ingredient: fried rice", "ingredient: stir fry", "pantry staple"],
  },
  {
    id: "27",
    name: "Vegetable Oil (1L)",
    description: "Neutral oil for cooking and frying.",
    longDescription:
      "A versatile, neutral-flavored oil perfect for sautéing, frying, and baking. High smoke point and light taste.",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=60",
    category: "Pantry",
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        quality: 89,
      },
    },
    dataAiHint: "vegetable oil",
    tags: ["ingredient: fried rice", "ingredient: stir fry", "pantry staple"],
  },
  {
    id: "28",
    name: "Large Eggs (12 count)",
    description: "Farm-fresh large eggs for all your cooking needs.",
    longDescription:
      "Grade A large eggs, perfect for breakfast, baking, and as a protein boost in fried rice and other dishes.",
    price: 2.79,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=60",
    category: "Dairy & Eggs",
    sentiment: {
      positive: 95,
      negative: 5,
      aspects: {
        freshness: 97,
        taste: 94,
        quality: 96,
      },
    },
    dataAiHint: "eggs",
    tags: ["ingredient: fried rice", "ingredient: breakfast", "protein"],
  },
  {
    id: "29",
    name: "Boneless Chicken Breast (1 lb)",
    description: "Lean, skinless chicken breast for healthy meals.",
    longDescription:
      "High-protein, low-fat boneless chicken breast, perfect for stir-fries, salads, and grilled dishes. No antibiotics or added hormones.",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=60",
    category: "Meat & Seafood",
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: {
        freshness: 95,
        quality: 94,
      },
    },
    dataAiHint: "chicken breast",
    tags: ["ingredient: fried rice", "ingredient: stir fry", "protein"],
  },
  {
    id: "30",
    name: "Basmati Rice Premium Grade",
    description: "Premium quality basmati rice with exceptional aroma and texture.",
    longDescription:
      "Premium grade basmati rice sourced from the finest fields. Known for its distinctive nutty flavor, delicate aroma, and fluffy texture when cooked. Perfect for biryani, pilaf, and other rice dishes. Each grain cooks to perfection with separate, non-sticky results.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e30c?auto=format&fit=crop&w=800&q=60",
    category: "Pantry",
    sentiment: {
      positive: 96,
      negative: 4,
      aspects: {
        aroma: 98,
        texture: 97,
        quality: 95,
      },
    },
    dataAiHint: "premium basmati rice",
    tags: ["ingredient: biryani", "ingredient: pilaf", "rice variety", "premium grain"],
  },
];

