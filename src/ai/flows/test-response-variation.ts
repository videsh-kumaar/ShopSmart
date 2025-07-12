// Test simulation for response variation validation
// This file simulates real input scenarios to ensure AI responses vary properly

import { productQA } from './product-qa-with-gemini';
import { getFollowUpQuestionSuggestions } from './follow-up-question-suggestions';

// Mock product data for testing
const testProduct = {
  name: "Aether-Stride Runners",
  longDescription: "The Aether-Stride Runners are engineered for the dedicated runner seeking a blend of lightweight performance and responsive cushioning. Featuring a breathable mesh upper and a proprietary foam midsole, these shoes provide exceptional energy return and comfort mile after mile. The durable rubber outsole offers superior traction on various surfaces, making them perfect for both road and track."
};

// Test scenarios that should produce different responses
const testScenarios = [
  {
    id: 'scenario1',
    question: "How comfortable are these shoes?",
    expected: "Should focus on comfort aspects"
  },
  {
    id: 'scenario2', 
    question: "Are these good for running?",
    expected: "Should focus on running performance"
  },
  {
    id: 'scenario3',
    question: "What's the durability like?",
    expected: "Should focus on durability and materials"
  },
  {
    id: 'scenario4',
    question: "How do they fit?",
    expected: "Should focus on sizing and fit"
  },
  {
    id: 'scenario5',
    question: "Are they worth the price?",
    expected: "Should focus on value proposition"
  }
];

// Test suggested questions (these should behave like normal user input)
const suggestedQuestions = [
  "What's the best running surface for these shoes?",
  "How do they compare to other running shoes?",
  "What's the break-in period like?"
];

export async function testResponseVariation() {
  console.log('🧪 Testing AI Response Variation...\n');
  
  const responses: {[key: string]: string} = {};
  const followUpQuestions: {[key: string]: string[]} = {};
  
  // Test same question multiple times to ensure variation
  console.log('\n🔄 Testing Same Question Multiple Times for Variation...');
  const repeatQuestion = "How comfortable are these shoes?";
  const repeatResponses: string[] = [];
  
  for (let i = 0; i < 5; i++) {
    console.log(`\n📋 Repeat Test ${i + 1}: "${repeatQuestion}"`);
    
    try {
      const result = await productQA({
        productName: testProduct.name,
        productDescription: testProduct.longDescription,
        userQuestion: repeatQuestion,
      });
      
      repeatResponses.push(result.answer);
      console.log(`✅ Response ${i + 1}: ${result.answer.substring(0, 80)}...`);
      
      // Small delay to ensure timestamp variation
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error in repeat test ${i + 1}:`, error);
    }
  }
  
  // Check repeat response variation
  const uniqueRepeatResponses = new Set(repeatResponses);
  console.log(`\n🔍 REPEAT TEST ANALYSIS:`);
  console.log(`Total repeat responses: ${repeatResponses.length}`);
  console.log(`Unique repeat responses: ${uniqueRepeatResponses.size}`);
  
  if (uniqueRepeatResponses.size === repeatResponses.length) {
    console.log('✅ SUCCESS: All repeat responses are unique!');
  } else {
    console.log('❌ ISSUE: Some repeat responses are duplicated!');
  }
  
  // Test main questions
  console.log('\n\n📋 Testing Different Questions...');
  for (const scenario of testScenarios) {
    console.log(`\n📋 Testing Scenario: ${scenario.id}`);
    console.log(`❓ Question: "${scenario.question}"`);
    
    try {
      const result = await productQA({
        productName: testProduct.name,
        productDescription: testProduct.longDescription,
        userQuestion: scenario.question,
      });
      
      responses[scenario.id] = result.answer;
      console.log(`✅ Response: ${result.answer.substring(0, 100)}...`);
      
      // Get follow-up questions
      const followUpResult = await getFollowUpQuestionSuggestions({
        productName: testProduct.name,
        productDescription: testProduct.longDescription,
        productQuestion: scenario.question,
      });
      
      followUpQuestions[scenario.id] = followUpResult.suggestedQuestions;
      console.log(`📋 Follow-up Questions: ${followUpResult.suggestedQuestions.join(', ')}`);
      
    } catch (error) {
      console.error(`❌ Error in scenario ${scenario.id}:`, error);
    }
  }
  
  // Test suggested questions as user input
  console.log('\n\n🔄 Testing Suggested Questions as User Input...');
  for (const suggestedQ of suggestedQuestions) {
    console.log(`\n❓ Suggested Question: "${suggestedQ}"`);
    
    try {
      const result = await productQA({
        productName: testProduct.name,
        productDescription: testProduct.longDescription,
        userQuestion: suggestedQ,
      });
      
      console.log(`✅ Response: ${result.answer.substring(0, 100)}...`);
      
    } catch (error) {
      console.error(`❌ Error with suggested question "${suggestedQ}":`, error);
    }
  }
  
  // Validate variation
  console.log('\n\n🔍 VALIDATION RESULTS:');
  
  // Check if responses are different
  const responseValues = Object.values(responses);
  const uniqueResponses = new Set(responseValues);
  
  console.log(`📊 Total responses: ${responseValues.length}`);
  console.log(`🎯 Unique responses: ${uniqueResponses.size}`);
  
  if (uniqueResponses.size === responseValues.length) {
    console.log('✅ SUCCESS: All responses are unique!');
  } else {
    console.log('❌ FAILURE: Some responses are repeated!');
    
    // Find duplicates
    const seen = new Set();
    const duplicates = new Set();
    
    for (const response of responseValues) {
      if (seen.has(response)) {
        duplicates.add(response);
      } else {
        seen.add(response);
      }
    }
    
    console.log('🔍 Duplicate responses found:', Array.from(duplicates));
  }
  
  // Check follow-up question variation
  const allFollowUps = Object.values(followUpQuestions).flat();
  const uniqueFollowUps = new Set(allFollowUps);
  
  console.log(`📊 Total follow-up questions: ${allFollowUps.length}`);
  console.log(`🎯 Unique follow-up questions: ${uniqueFollowUps.size}`);
  
  if (uniqueFollowUps.size === allFollowUps.length) {
    console.log('✅ SUCCESS: All follow-up questions are unique!');
  } else {
    console.log('❌ FAILURE: Some follow-up questions are repeated!');
  }
  
  return {
    responseVariationSuccess: uniqueResponses.size === responseValues.length,
    followUpVariationSuccess: uniqueFollowUps.size === allFollowUps.length,
    responses,
    followUpQuestions
  };
}

// Export for use in testing
export { testScenarios, suggestedQuestions };
