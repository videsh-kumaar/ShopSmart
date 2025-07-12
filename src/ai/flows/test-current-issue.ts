import { productQA } from './product-qa-with-gemini';

const testProduct = {
  name: "Aether-Stride Runners",
  longDescription: "The Aether-Stride Runners are engineered for the dedicated runner seeking a blend of lightweight performance and responsive cushioning. Featuring a breathable mesh upper and a proprietary foam midsole, these shoes provide exceptional energy return and comfort mile after mile. The durable rubber outsole offers superior traction on various surfaces, making them perfect for both road and track."
};

async function testCurrentIssue() {
  console.log('🧪 Testing Current AI Response Issue...\n');
  
  // Test same question multiple times to see if responses vary
  const questions = [
    "How comfortable are these shoes?",
    "How comfortable are these shoes?",
    "How comfortable are these shoes?",
    "Are these good for running?",
    "Are these good for running?",
    "Are these good for running?",
  ];
  
  const responses: string[] = [];
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(`\n📋 Test ${i + 1}: "${question}"`);
    
    try {
      const result = await productQA({
        productName: testProduct.name,
        productDescription: testProduct.longDescription,
        userQuestion: question,
      });
      
      responses.push(result.answer);
      console.log(`✅ Response: ${result.answer.substring(0, 100)}...`);
      
    } catch (error) {
      console.error(`❌ Error in test ${i + 1}:`, error);
    }
  }
  
  // Check for repeated responses
  console.log('\n🔍 ANALYSIS:');
  console.log(`Total responses: ${responses.length}`);
  
  const uniqueResponses = new Set(responses);
  console.log(`Unique responses: ${uniqueResponses.size}`);
  
  if (uniqueResponses.size < responses.length) {
    console.log('❌ ISSUE CONFIRMED: Some responses are repeated!');
    
    // Find which responses are duplicated
    const responseCounts = new Map<string, number>();
    responses.forEach(response => {
      responseCounts.set(response, (responseCounts.get(response) || 0) + 1);
    });
    
    console.log('\nDuplicate responses:');
    responseCounts.forEach((count, response) => {
      if (count > 1) {
        console.log(`- "${response.substring(0, 50)}..." (appeared ${count} times)`);
      }
    });
  } else {
    console.log('✅ No duplicates found - responses are unique!');
  }
}

testCurrentIssue().catch(console.error);
