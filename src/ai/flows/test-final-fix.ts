import { aiProductQA } from '../../../src/app/actions';

async function testFinalFix() {
  console.log('🧪 Final Test: Rice Sticking Issue Fix\n');
  
  try {
    // Test the exact rice sticking question that was failing
    const result = await aiProductQA("30", "How do I prevent the rice from sticking?", "test-session");
    
    console.log('✅ AI Response:');
    console.log(result.answer);
    console.log(`\n📏 Response Length: ${result.answer.length} characters`);
    console.log(`🎯 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`📋 Follow-up Questions: ${result.followUpQuestions.length}`);
    
    // Analyze if the response answers the question
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
      console.log(`\n🎉 SUCCESS: Issue is FIXED! AI now properly answers specific user questions!`);
      console.log(`\n📋 Follow-up Questions Generated:`);
      result.followUpQuestions.forEach((q, i) => {
        console.log(`${i + 1}. ${q}`);
      });
    } else {
      console.log(`\n❌ ISSUE: Problem still exists`);
      if (isGenericDescription) {
        console.log(`  - Still giving generic product descriptions`);
      }
      if (!answersQuestion) {
        console.log(`  - Not providing relevant cooking advice`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testFinalFix().catch(console.error);
