import { products } from "./data/products";

// In-memory conversation context storage (in production, use Redis or similar)
const conversationContexts = new Map<string, { 
  previousQuestions: string[], 
  responses: string[], 
  usedVariationSeeds: string[],
  lastActivity: number 
}>();

// Mock AI response generator with variation for demo purposes
function generateMockAIResponse(product: any, userQuestion: string, previousResponses: string[] = []): string {
  const questionLower = userQuestion.toLowerCase();
  const productName = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  
  // Generate variation seed based on timestamp and question
  const variationSeed = Math.floor(Date.now() / 1000) % 4;
  const hasAskedBefore = previousResponses.some(resp => resp.includes(userQuestion.slice(0, 10)));
  
  // Rice/Pantry products
  if (category.includes('pantry') || productName.includes('rice')) {
    if (questionLower.includes('cook') || questionLower.includes('prevent') || questionLower.includes('stick')) {
      const responses = [
        `To prevent your ${product.name} from sticking, rinse the rice thoroughly before cooking to remove excess starch. Use a ratio of 1.5 cups of water per 1 cup of rice, and avoid lifting the lid during cooking to maintain consistent temperature and steam. After cooking, fluff gently with a fork instead of stirring vigorously.`,
        `The key to non-sticky ${product.name} is proper rinsing! Wash the rice until the water runs clear, then use the absorption method with 1.5 cups water per cup of rice. Keep the lid on during cooking and let it steam for 10 minutes after cooking for perfect texture.`,
        `For fluffy ${product.name}, start by soaking the rice for 30 minutes, then rinse well. Use slightly less water (1.25 cups per cup of rice) and cook on low heat. The soaking helps achieve separate, non-sticky grains.`,
        `Here's a chef's tip for ${product.name}: toast the rice lightly in a dry pan before adding water. This creates a protective layer around each grain. Then add your water (1.5:1 ratio) and cook covered without stirring.`
      ];
      return responses[variationSeed];
    }
    if (questionLower.includes('biryani')) {
      const responses = [
        `Yes, ${product.name} is excellent for biryani! This premium basmati rice has the perfect long grains that remain separate when cooked, giving you that authentic biryani texture. The aromatic quality and fluffy texture make it ideal for absorbing the rich flavors of biryani spices.`,
        `Absolutely! ${product.name} is actually one of the best choices for biryani. The long grains stay distinct and fluffy, and the natural aroma complements the spices beautifully. Many professional chefs prefer this variety for authentic biryani.`,
        `${product.name} is perfect for biryani! The aged grains expand beautifully and don't break during the layering process. The subtle nutty flavor enhances the overall taste without overpowering the spices.`,
        `This ${product.name} is ideal for biryani preparation. The grains have excellent elongation properties and maintain their individual identity even after dum cooking, which is essential for perfect biryani texture.`
      ];
      return responses[variationSeed];
    }
    if (questionLower.includes('water')) {
      const responses = [
        `For ${product.name}, use a 1:1.5 ratio of rice to water. This ensures perfectly cooked, fluffy rice every time. Bring to a boil, then reduce heat and simmer covered for 18-20 minutes.`,
        `The perfect water ratio for ${product.name} is 1.5 cups of water per cup of rice. Some prefer 1.25 cups for firmer grains. Always bring to a boil first, then simmer on low heat.`,
        `I recommend 1.5 cups of water per cup of ${product.name}. If you prefer slightly firmer rice, try 1.25 cups. The key is maintaining gentle heat after the initial boil.`,
        `For ${product.name}, start with 1.5 cups water per cup of rice. You can adjust based on your texture preference - less water for firmer grains, slightly more for softer texture.`
      ];
      return responses[variationSeed];
    }
  }
  
  // Running shoes
  if (category.includes('running') || category.includes('shoes')) {
    if (questionLower.includes('running') || questionLower.includes('distance') || questionLower.includes('comfort')) {
      const responses = [
        `${product.name} are designed for comfort during running with features like breathable mesh upper, responsive foam midsole, and durable rubber outsole for excellent traction. They provide great energy return and cushioning for daily runs and longer distances.`,
        `These ${product.name} excel in comfort with their advanced cushioning system. The breathable design keeps feet cool, while the responsive midsole provides excellent energy return for efficient running.`,
        `${product.name} offer superior comfort through their engineered mesh upper and plush midsole. The outsole pattern provides reliable grip, making them suitable for various running surfaces and distances.`,
        `The comfort level of ${product.name} is exceptional, thanks to their anatomical design and premium materials. The cushioning adapts to your stride, providing support where you need it most.`
      ];
      return responses[variationSeed];
    }
    if (questionLower.includes('fit')) {
      const responses = [
        `${product.name} typically fit true to size. They feature a comfortable, secure fit with adequate toe room. The breathable upper adapts to your foot shape for a personalized feel during runs.`,
        `The fit of ${product.name} is generally true to size, with a secure heel and roomy toe box. The upper material conforms to your foot shape over time for a custom-like fit.`,
        `${product.name} have a reliable fit that's true to size. The lacing system allows for customization, and the upper provides a snug yet comfortable embrace around your foot.`,
        `These ${product.name} fit as expected size-wise. The engineered upper provides a secure fit without being restrictive, and there's adequate space in the toe area for natural foot movement.`
      ];
      return responses[variationSeed];
    }
  }
  
  // Sunscreen/skincare
  if (category.includes('sunscreen') || category.includes('cream')) {
    if (questionLower.includes('sensitive') || questionLower.includes('skin')) {
      const responses = [
        `${product.name} is formulated to be gentle on sensitive skin. It provides broad-spectrum protection without harsh chemicals that can cause irritation. The lightweight formula absorbs quickly without leaving a greasy residue.`,
        `Yes, ${product.name} is excellent for sensitive skin. It uses mineral-based ingredients that are less likely to cause reactions. The formula is fragrance-free and hypoallergenic.`,
        `${product.name} is specifically designed for sensitive skin types. It contains soothing ingredients and avoids common irritants. Many dermatologists recommend this formula for reactive skin.`,
        `This ${product.name} is gentle enough for sensitive skin. The non-comedogenic formula won't clog pores and includes calming ingredients to reduce potential irritation.`
      ];
      return responses[variationSeed];
    }
    if (questionLower.includes('reapply') || questionLower.includes('often')) {
      const responses = [
        `For optimal protection with ${product.name}, reapply every 2 hours when outdoors, or immediately after swimming, sweating, or toweling off. This ensures continuous protection throughout the day.`,
        `Reapply ${product.name} every 2 hours during sun exposure. If you're swimming or sweating heavily, reapply immediately after. Don't forget to apply generously for full protection.`,
        `The general rule for ${product.name} is reapplication every 2 hours. However, if you're active or in water, you'll need to reapply more frequently to maintain protection.`,
        `With ${product.name}, stick to the 2-hour reapplication rule. For beach days or outdoor activities, consider reapplying every 90 minutes and always after water exposure.`
      ];
      return responses[variationSeed];
    }
  }
  
  // Jacket/clothing
  if (category.includes('jacket') || category.includes('clothing')) {
    if (questionLower.includes('warm') || questionLower.includes('temperature')) {
      const responses = [
        `${product.name} is designed to keep you warm in cold conditions. The insulation provides excellent heat retention while remaining breathable. It's suitable for temperatures down to freezing, depending on layering.`,
        `This ${product.name} offers excellent warmth retention. The insulation technology traps body heat efficiently while allowing moisture to escape. Great for cold weather activities.`,
        `${product.name} provides reliable warmth in cold conditions. The thermal properties are enhanced by the design, which minimizes heat loss while maintaining comfort during movement.`,
        `The warmth level of ${product.name} is impressive. The insulation works well in cold temperatures, and the design helps retain body heat without causing overheating during activity.`
      ];
      return responses[variationSeed];
    }
    if (questionLower.includes('waterproof') || questionLower.includes('water')) {
      const responses = [
        `${product.name} features water-resistant technology that repels light rain and moisture. While it provides good protection against light precipitation, it's designed more for wind and cold weather protection.`,
        `This ${product.name} has water-resistant properties that handle light rain and snow. For heavy downpours, you might want additional rain protection, but it's great for everyday weather.`,
        `${product.name} offers water resistance that's effective against light moisture and drizzle. The coating helps shed water while maintaining breathability for comfort.`,
        `The water resistance of ${product.name} is designed for moderate conditions. It handles light rain well and dries quickly, making it versatile for changing weather.`
      ];
      return responses[variationSeed];
    }
  }
  
  // Generic fallback with variation
  const genericResponses = [
    `${product.name} is a high-quality product in our ${product.category} category. ${product.description} It's designed to meet your needs with excellent performance and value. The product features premium materials and construction for durability and satisfaction.`,
    `This ${product.name} stands out in the ${product.category} category. ${product.description} The attention to detail and quality construction make it a reliable choice for your needs.`,
    `${product.name} represents excellent value in the ${product.category} space. ${product.description} The thoughtful design and quality materials ensure long-lasting performance.`,
    `You'll find ${product.name} to be a solid choice in ${product.category}. ${product.description} The combination of quality and functionality makes it a popular option among customers.`
  ];
  
  return genericResponses[variationSeed];
}

// Generate contextual follow-up questions
function generateFollowUpQuestions(product: any, userQuestion: string): string[] {
  const category = product.category.toLowerCase();
  const questionLower = userQuestion.toLowerCase();
  
  if (category.includes('pantry') || category.includes('rice')) {
    if (questionLower.includes('cook') || questionLower.includes('stick')) {
      return [
        "What spices work best with this rice?",
        "How long should I let it rest after cooking?",
        "Can I use this rice for other dishes?"
      ];
    }
    return [
      "What's the best way to cook this rice?",
      "How much water should I use?",
      "Is this good for biryani?"
    ];
  }
  
  if (category.includes('running') || category.includes('shoes')) {
    return [
      "What's the durability like?",
      "Are these good for different terrains?",
      "How does the cushioning compare to other brands?"
    ];
  }
  
  if (category.includes('sunscreen') || category.includes('cream')) {
    return [
      "Does it leave a white residue?",
      "Is this water resistant?",
      "What's the SPF level?"
    ];
  }
  
  // Generic fallback
  return [
    "What are the main features?",
    "How does this compare to similar products?",
    "What do customers say about this?"
  ];
}

export async function aiProductQA(productId: string, userQuestion: string, sessionId?: string) {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");
  
  // Create session key for conversation tracking
  const contextKey = sessionId || `${productId}-${Date.now()}`;
  
  // Get or initialize conversation context
  let context = conversationContexts.get(contextKey) || { 
    previousQuestions: [], 
    responses: [], 
    usedVariationSeeds: [], 
    lastActivity: Date.now() 
  };
  
  // Debug logging
  console.log('🔍 AI Product QA - Starting:', {
    productId,
    productName: product.name,
    productCategory: product.category,
    userQuestion,
    previousQuestionsCount: context.previousQuestions.length,
    timestamp: new Date().toISOString()
  });
  
  // Validate product data
  if (!product.name) {
    throw new Error(`Invalid product data for ID: ${productId}`);
  }
  
  try {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate mock AI response with variation
    const answer = generateMockAIResponse(product, userQuestion, context.responses);
    
    // Update conversation context
    context.previousQuestions.push(userQuestion);
    context.responses.push(answer);
    
    // Keep only last 5 interactions to prevent memory bloat
    if (context.previousQuestions.length > 5) {
      context.previousQuestions = context.previousQuestions.slice(-5);
      context.responses = context.responses.slice(-5);
    }
    
    conversationContexts.set(contextKey, context);
    
    // Generate follow-up questions
    const followUpQuestions = generateFollowUpQuestions(product, userQuestion);
    
    // If answer suggests issues, provide alternatives
    let alternatives: typeof products = [];
    if (/not|no|doesn't|isn't|cannot|can't|unsuitable|bad/i.test(answer)) {
      alternatives = products.filter(
        (p) => p.category === product.category && p.id !== product.id
      ).slice(0, 3);
    }
    
    console.log('✅ AI Product QA - Success:', {
      productName: product.name,
      answerLength: answer.length,
      followUpCount: followUpQuestions.length,
      alternativesCount: alternatives.length
    });
    
    return { 
      answer, 
      confidence: 0.95, 
      followUpQuestions, 
      alternatives 
    };
  } catch (error) {
    console.error('❌ AI Product QA - Error:', error);
    throw error;
  }
}
