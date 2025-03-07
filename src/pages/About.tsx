
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">عن AURAGZ</h1>
            <p className="text-xl text-white/70">منصة الألعاب الذكية المدعومة بالذكاء الاصطناعي</p>
            <Separator className="mt-8 mb-12 bg-aura-500/30 mx-auto max-w-md" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="glass-morphism bg-space-900/40 h-full border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">رسالتنا</h2>
                  <p className="text-white/80 leading-relaxed">
                    هدفنا في AURAGZ هو إعادة تعريف تجربة الألعاب من خلال تقديم منصة مدعومة بالذكاء الاصطناعي،
                    حيث تتكيف كل لعبة مع أسلوب اللعب الفردي، مما يوفر تحديات فريدة ومخصصة. 
                    نحن نؤمن بأن مستقبل الألعاب يكمن في التفاعل الشخصي والتعلم المستمر.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="glass-morphism bg-space-900/40 h-full border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">رؤيتنا</h2>
                  <p className="text-white/80 leading-relaxed">
                    نتطلع لبناء مجتمع عالمي من اللاعبين الذين يستمتعون بالتحديات المخصصة 
                    التي تقدمها تقنيات الذكاء الاصطناعي المتقدمة. نهدف لتحويل طريقة تفاعل
                    الناس مع الألعاب، من خلال تقديم تجارب تعليمية وممتعة تطور المهارات
                    المعرفية والاستراتيجية.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <Card className="glass-morphism bg-space-900/40 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">من نحن</h2>
                <div className="space-y-6 text-center">
                  <p className="text-white/80 leading-relaxed">
                    تم إنشاء AURAGZ بواسطة زياد حلواني (BXZ.9)، مبرمج شغوف بالألعاب والذكاء الاصطناعي، 
                    يبلغ من العمر 16 عاماً. من خلال الجمع بين شغفه بالبرمجة والألعاب، طور زياد منصة
                    فريدة تجمع بين أحدث تقنيات الذكاء الاصطناعي وتجارب الألعاب التفاعلية.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    تهدف المنصة لتقديم تجربة ألعاب مميزة باللغة العربية، مع التركيز على تطوير
                    مهارات اللاعبين من خلال خوارزميات ذكية تتكيف مع أسلوب اللعب الفردي.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">إنضم إلينا اليوم!</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              كن جزءاً من رحلتنا لتغيير مستقبل الألعاب مع الذكاء الاصطناعي. سجل الآن وابدأ اللعب مع AURAGZ!
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
