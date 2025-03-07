
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const faqs = [
  {
    id: "faq-1",
    question: "ما هي منصة AuraGZ؟",
    answer: "AuraGZ هي منصة ألعاب تعتمد على الذكاء الاصطناعي وتقدم تجارب ألعاب تفاعلية وتكيفية. تتميز الألعاب بقدرتها على التعلم من أسلوب لعبك وتوفير تحديات مخصصة تناسب مستوى مهاراتك."
  },
  {
    id: "faq-2",
    question: "هل يلزم إنشاء حساب للعب الألعاب؟",
    answer: "لا، يمكنك لعب العديد من الألعاب الأساسية دون الحاجة إلى حساب. ومع ذلك، فإن إنشاء حساب مجاني يتيح لك حفظ تقدمك، والمشاركة في لوحات المتصدرين، وتخصيص تجربتك على المنصة."
  },
  {
    id: "faq-3",
    question: "كيف يتم استخدام الذكاء الاصطناعي في الألعاب؟",
    answer: "أستخدم تقنيات الذكاء الاصطناعي المتقدمة، مثل التعلم العميق والشبكات العصبية، لإنشاء خصوم تكيفية تتعلم من أسلوب لعبك وتتكيف معه. يمكن للذكاء الاصطناعي تحليل استراتيجياتك، وضبط مستوى الصعوبة ديناميكيًا، وإنشاء محتوى فريد بناءً على تفضيلاتك."
  },
  {
    id: "faq-4",
    question: "هل يمكنني اللعب على الأجهزة المحمولة؟",
    answer: "نعم، منصة AuraGZ متوافقة تمامًا مع الأجهزة المحمولة. تم تصميم جميع الألعاب للعمل بسلاسة على أجهزة الجوال والأجهزة اللوحية، مما يسمح لك باللعب في أي وقت وفي أي مكان."
  },
  {
    id: "faq-5",
    question: "كيف يتم تصنيف اللاعبين في لوحة المتصدرين؟",
    answer: "يعتمد تصنيف اللاعبين على نظام تقييم معقد يأخذ في الاعتبار عوامل متعددة، بما في ذلك عدد الانتصارات، ومستوى الخصوم الذين هزمتهم، وصعوبة الألعاب التي تلعبها. يتم تحديث الترتيب في الوقت الفعلي مع كل مباراة تلعبها."
  },
  {
    id: "faq-6",
    question: "هل الألعاب مجانية للعب؟",
    answer: "نعم، جميع الألعاب الأساسية مجانية للعب. في المستقبل، قد أقدم محتوى إضافي متميز أو ميزات خاصة من خلال نموذج اشتراك، ولكن سيظل المحتوى الأساسي مجانيًا دائمًا."
  },
  {
    id: "faq-7",
    question: "كيف يمكنني تخصيص إعدادات حسابي؟",
    answer: "يمكنك تخصيص إعدادات حسابك من خلال الانتقال إلى صفحة الإعدادات. هناك يمكنك تغيير سمة المنصة، واللغة المفضلة، وتفضيلات الإشعارات، والمزيد."
  },
  {
    id: "faq-8",
    question: "هل يمكنني اللعب ضد أصدقائي؟",
    answer: "هذه الميزة قيد التطوير حاليًا. قريبًا، ستتمكن من تحدي أصدقائك ولعب المباريات معهم مباشرة. تابع التحديثات للحصول على المزيد من المعلومات حول موعد إطلاق هذه الميزة."
  },
  {
    id: "faq-9",
    question: "كيف يمكنني الإبلاغ عن مشكلة أو اقتراح ميزة جديدة؟",
    answer: "يمكنك إرسال تعليقاتك أو اقتراحاتك باستخدام نموذج التعليقات الموجود في تذييل الموقع، أو يمكنك التواصل معي مباشرة عبر البريد الإلكتروني على feedback@auragz.com."
  },
  {
    id: "faq-10",
    question: "هل ستضيف المزيد من الألعاب في المستقبل؟",
    answer: "نعم، أعمل باستمرار على تطوير وإضافة ألعاب جديدة ومثيرة إلى المنصة. ترقب الإعلانات عن الألعاب القادمة والتحديثات الجديدة!"
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { playSound } = useSoundEffects();
  
  const filteredFaqs = faqs.filter((faq) => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Card className="glass-morphism bg-space-900/50 border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold heading-highlight text-white">الأسئلة الشائعة</CardTitle>
              <p className="text-white/70 mt-2">اعثر على إجابات لأكثر الأسئلة شيوعًا حول منصة AuraGZ</p>
              
              <div className="relative max-w-md mx-auto mt-6">
                <Input
                  type="text"
                  placeholder="ابحث عن سؤال..."
                  className="bg-white/5 border-white/10 pr-10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              </div>
            </CardHeader>
            
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id} 
                      className="border border-white/10 bg-white/5 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger 
                        className="px-4 py-3 text-white hover:no-underline hover:bg-white/10 text-right"
                        onClick={() => playSound('button')}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 text-white/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/70">لم يتم العثور على نتائج لـ "{searchQuery}"</p>
                    <p className="text-white/50 text-sm mt-2">حاول استخدام كلمات بحث مختلفة أو تصفح جميع الأسئلة الشائعة</p>
                  </div>
                )}
              </Accordion>
              
              <p className="text-white/60 mt-12 text-center">
                هل لديك سؤال لم تجد إجابته هنا؟ تواصل معي عبر البريد الإلكتروني 
                <a 
                  href="mailto:support@auragz.com" 
                  className="text-aura-400 hover:text-aura-300 mx-1"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('button')}
                >
                  support@auragz.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
