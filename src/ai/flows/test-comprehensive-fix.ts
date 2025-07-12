import { productQA } from './product-qa-with-gemini';

// Test various question types to ensure AI properly answers specific questions
async function testComprehensiveFix() {
  console.log('🧪 Testing Comprehensive AI Question Handling...\n');
  
  const testCases = [
    // HOW-TO questions
    {
      product: {
        name: "Basmati Rice Premium Grade",
        description: "Premium grade basmati rice sourced from the finest fields. Known for its distinctive nutty flavor, delicate aroma, and fluffy texture when cooked. Perfect for biryani, pilaf, and other rice dishes. Each grain cooks to perfection with separate, non-sticky results."
      },
      question: "How do I prevent the rice from sticking?",
      expectedType: "cooking-instructions",
      shouldContain: ["rinse", "water", "ratio", "cook", "method"]
    },
    
    // Usage questions
    {
      product: {
        name: "Aether-Stride Runners",
        description: "The Aether-Stride Runners are engineered for the dedicated runner seeking a blend of lightweight performance and responsive cushioning. Featuring a breathable mesh upper and a proprietary foam midsole, these shoes provide exceptional energy return and comfort mile after mile."
      },
      question: "How comfortable are these shoes?",
      expectedType: "comfort-assessment",
      shouldContain: ["comfort", "cushioning", "foam", "breathable"]
    },
    
    // Feature questions
    {
      product: {
        name: "SPF 50 Sunscreen Lotion",
        description: "Provides broad-spectrum SPF 50 protection against UVA and UVB rays. This lightweight, non-greasy lotion is water-resistant for up to 80 minutes and suitable for all skin types."
      },
      question: "Is this good for sensitive skin?",
      expectedType: "suitability-assessment",
      shouldContain: ["sensitive", "skin", "suitable", "types"]
    },
    
    // Practical advice questions
    {
      product: {
        name: "Lightweight Rain Jacket",
        description: "This lightweight rain jacket is perfect for layering and provides excellent protection against the rain. It features a waterproof and breathable fabric, adjustable hood, and zippered pockets."
      },
      question: "How do I care for this jacket?",
      expectedType: "care-instructions",
      shouldContain: ["care", "wash", "clean", "maintain", "fabric"]
    }
  ];
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n📋 Test ${i + 1}: ${testCase.expectedType.toUpperCase()}`);
    console.log(`📦 Product: ${testCase.product.name}`);
    console.log(`❓ Question: "${testCase.question}"`);
    
    try {
      const result = await productQA({
        productName: testCase.product.name,
        productDescription: testCase.product.description,
        userQuestion: testCase.question,
      });
      
      console.log(`✅ AI Response: ${result.answer.substring(0, 100)}...`);
      
      // Check if response contains expected keywords
      const answerLower = result.answer.toLowerCase();
      const containsKeywords = testCase.shouldContain.some(keyword => 
        answerLower.includes(keyword.toLowerCase())
      );
      
      // Check if it's not just a generic product description
      const isGeneric = answerLower.includes('premium grade') || 
                       answerLower.includes('engineered for') || 
                       answerLower.includes('provides broad-spectrum') || 
                       answerLower.includes('perfect for layering');
      
      // Check if response is actually answering the question
      const answersQuestion = result.answer.length > 100 && containsKeywords;
      
      if (answersQuestion && !isGeneric) {
        console.log(`✅ PASS: AI answered the specific question properly`);
        passedTests++;
      } else {
        console.log(`❌ FAIL: AI did not answer the question properly`);
        if (isGeneric) {
          console.log(`  - Issue: Generic product description detected`);
        }
        if (!containsKeywords) {
          console.log(`  - Issue: Missing expected keywords: ${testCase.shouldContain.join(', ')}`);
        }
      }
      
    } catch (error) {
      console.error(`❌ ERROR in test ${i + 1}:`, error);
    }
  }
  
  console.log(`\n🔍 FINAL RESULTS:`);
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`📊 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log(`🎉 ALL TESTS PASSED! AI is now properly answering specific user questions.`);
  } else {
    console.log(`⚠️  Some tests failed. AI needs further improvement.`);
  }
}

// Run the comprehensive test
testComprehensiveFix().catch(console.error);
