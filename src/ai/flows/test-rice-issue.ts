import { productQA } from './product-qa-with-gemini';

// Test the specific rice sticking issue
async function testRiceStickingIssue() {
  console.log('🧪 Testing Rice Sticking Issue...\n');
  
  // Basmati Rice Premium Grade product
  const riceProduct = {
    name: "Basmati Rice Premium Grade",
    longDescription: "Premium grade basmati rice sourced from the finest fields. Known for its distinctive nutty flavor, delicate aroma, and fluffy texture when cooked. Perfect for biryani, pilaf, and other rice dishes. Each grain cooks to perfection with separate, non-sticky results."
  };
  
  const question = "How do I prevent the rice from sticking?";
  
  console.log(`📦 Product: ${riceProduct.name}`);
  console.log(`❓ Question: "${question}"`);
  console.log(`📋 Expected: Practical cooking advice for preventing rice from sticking`);
  console.log(`🚫 Problem: AI might give generic product description instead of answering the specific question\n`);
  
  try {
    const result = await productQA({
      productName: riceProduct.name,
      productDescription: riceProduct.longDescription,
      userQuestion: question,
    });
    
    console.log(`✅ AI Response:`);
    console.log(result.answer);
    console.log(`\n📏 Response Length: ${result.answer.length} characters`);
    
    // Analyze if the response actually answers the question
    const answerLower = result.answer.toLowerCase();
    const answersQuestion = 
      answerLower.includes('rinse') || 
      answerLower.includes('wash') || 
      answerLower.includes('ratio') || 
      answerLower.includes('water') || 
      answerLower.includes('stir') || 
      answerLower.includes('cook') || 
      answerLower.includes('method') || 
      answerLower.includes('technique') || 
      answerLower.includes('prevent') || 
      answerLower.includes('avoid') || 
      answerLower.includes('tip') || 
      answerLower.includes('instruction');
    
    const isGenericDescription = 
      answerLower.includes('premium quality') || 
      answerLower.includes('distinctive nutty flavor') || 
      answerLower.includes('delicate aroma') || 
      answerLower.includes('sourced from the finest fields');
    
    console.log(`\n🔍 ANALYSIS:`);
    console.log(`📝 Contains cooking advice: ${answersQuestion ? '✅ YES' : '❌ NO'}`);
    console.log(`📦 Is generic product description: ${isGenericDescription ? '❌ YES' : '✅ NO'}`);
    
    if (answersQuestion && !isGenericDescription) {
      console.log(`🎉 SUCCESS: AI properly answered the specific question!`);
    } else if (isGenericDescription) {
      console.log(`❌ ISSUE: AI gave generic product description instead of answering the question`);
    } else {
      console.log(`❌ ISSUE: AI response doesn't contain relevant cooking advice`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the test
testRiceStickingIssue().catch(console.error);
