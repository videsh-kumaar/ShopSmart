// Test script to validate that product context is properly handled
import { productQA } from './product-qa-with-gemini';
import { getFollowUpQuestionSuggestions } from './follow-up-question-suggestions';
import { products } from '@/lib/data';

interface TestResult {
  productId: string;
  productName: string;
  question: string;
  answer: string;
  isCorrectContext: boolean;
  followUpQuestions: string[];
}

async function validateProductContext() {
  console.log('🧪 Testing Product Context Accuracy...\n');
  
  const testResults: TestResult[] = [];
  
  // Test cases with specific products
  const testCases = [
    {
      productId: '30', // Basmati Rice Premium Grade
      question: 'Is this rice good for making biryani?',
      expectedContext: 'rice',
      expectedKeywords: ['rice', 'biryani', 'grains', 'cooking']
    },
    {
      productId: '1', // Aether-Stride Runners
      question: 'How comfortable are these shoes?',
      expectedContext: 'shoes',
      expectedKeywords: ['shoes', 'running', 'comfort', 'performance']
    },
    {
      productId: '14', // SPF 50 Sunscreen Lotion
      question: 'Is this good for sensitive skin?',
      expectedContext: 'sunscreen',
      expectedKeywords: ['sunscreen', 'skin', 'SPF', 'protection']
    },
    {
      productId: '9', // Lightweight Rain Jacket
      question: 'Is this waterproof?',
      expectedContext: 'jacket',
      expectedKeywords: ['jacket', 'waterproof', 'rain', 'clothing']
    }
  ];
  
  console.log('🔍 Running Product Context Validation Tests...\n');
  
  for (const testCase of testCases) {
    const product = products.find(p => p.id === testCase.productId);
    
    if (!product) {
      console.error(`❌ Product not found: ${testCase.productId}`);
      continue;
    }
    
    console.log(`\n📋 Testing Product: ${product.name} (ID: ${testCase.productId})`);
    console.log(`❓ Question: "${testCase.question}"`);
    console.log(`🎯 Expected Context: ${testCase.expectedContext}`);
    
    try {
      // Test the AI response
      const result = await productQA({
        productName: product.name,
        productDescription: product.longDescription,
        userQuestion: testCase.question,
      });
      
      // Check if the response is about the correct product
      const isCorrectContext = checkContextAccuracy(
        result.answer, 
        product, 
        testCase.expectedKeywords
      );
      
      // Get follow-up questions
      const followUpResult = await getFollowUpQuestionSuggestions({
        productName: product.name,
        productDescription: product.longDescription,
        productQuestion: testCase.question,
      });
      
      const testResult: TestResult = {
        productId: testCase.productId,
        productName: product.name,
        question: testCase.question,
        answer: result.answer,
        isCorrectContext,
        followUpQuestions: followUpResult.suggestedQuestions
      };
      
      testResults.push(testResult);
      
      console.log(`✅ Response: ${result.answer.substring(0, 100)}...`);
      console.log(`🎯 Context Correct: ${isCorrectContext ? '✅ YES' : '❌ NO'}`);
      console.log(`📋 Follow-up Questions: ${followUpResult.suggestedQuestions.join(', ')}`);
      
      if (!isCorrectContext) {
        console.log(`🚨 CONTEXT MISMATCH DETECTED for product ${product.name}!`);
      }
      
    } catch (error) {
      console.error(`❌ Error testing ${product.name}:`, error);
    }
  }
  
  // Generate summary report
  console.log('\n\n📊 VALIDATION SUMMARY:');
  console.log('=' .repeat(50));
  
  const totalTests = testResults.length;
  const correctContextTests = testResults.filter(r => r.isCorrectContext).length;
  const successRate = totalTests > 0 ? (correctContextTests / totalTests * 100).toFixed(1) : '0';
  
  console.log(`Total tests: ${totalTests}`);
  console.log(`Correct context: ${correctContextTests}`);
  console.log(`Success rate: ${successRate}%`);
  
  if (correctContextTests === totalTests) {
    console.log('\n🎉 SUCCESS: All products returned contextually correct responses!');
  } else {
    console.log('\n⚠️  ISSUES DETECTED: Some products returned incorrect context');
    
    const failedTests = testResults.filter(r => !r.isCorrectContext);
    console.log('\nFailed tests:');
    failedTests.forEach(test => {
      console.log(`- ${test.productName} (${test.productId}): "${test.question}"`);
      console.log(`  Response: ${test.answer.substring(0, 80)}...`);
    });
  }
  
  return {
    totalTests,
    correctContextTests,
    successRate: parseFloat(successRate),
    testResults
  };
}

function checkContextAccuracy(answer: string, product: any, expectedKeywords: string[]): boolean {
  const answerLower = answer.toLowerCase();
  const productNameLower = product.name.toLowerCase();
  
  // Check if the answer mentions the correct product name
  const mentionsProductName = answerLower.includes(productNameLower);
  
  // Check if the answer contains relevant keywords for the product category
  const containsRelevantKeywords = expectedKeywords.some(keyword => 
    answerLower.includes(keyword.toLowerCase())
  );
  
  // Check if the answer is NOT about running shoes when it should be about other products
  const isNotRunningShoeResponse = !(
    answerLower.includes('running shoes') && 
    !productNameLower.includes('runner') && 
    !productNameLower.includes('shoe')
  );
  
  // Check if the answer is NOT about rice when it should be about other products
  const isNotRiceResponse = !(
    answerLower.includes('rice') && 
    !productNameLower.includes('rice') &&
    product.category.toLowerCase() !== 'pantry'
  );
  
  return mentionsProductName && containsRelevantKeywords && isNotRunningShoeResponse && isNotRiceResponse;
}

// Run the validation
if (require.main === module) {
  validateProductContext()
    .then(results => {
      console.log('\n🏁 Validation complete!');
      process.exit(results.correctContextTests === results.totalTests ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Validation failed:', error);
      process.exit(1);
    });
}

export { validateProductContext };
