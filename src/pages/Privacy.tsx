
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Card className="glass-morphism bg-space-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-3xl font-bold heading-highlight text-white">سياسة الخصوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-white/80">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">1. المقدمة</h2>
                <p>
                  أرحب بك في منصة AuraGZ. أنا ملتزم بحماية خصوصيتك وبياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها ومشاركتها عند استخدام منصتي.
                </p>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">2. البيانات التي أجمعها</h2>
                <p className="mb-2">
                  أجمع بعض البيانات الضرورية لتقديم تجربة مخصصة ومحسنة:
                </p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>معلومات الحساب: عنوان البريد الإلكتروني واسم المستخدم وكلمة المرور المشفرة</li>
                  <li>بيانات اللعب: إحصاءات اللعب والنتائج والتقدم</li>
                  <li>تفضيلات المستخدم: إعدادات السمة واللغة والإشعارات</li>
                  <li>بيانات الاستخدام: كيفية تفاعلك مع المنصة، بما في ذلك أوقات الدخول ومدة الاستخدام</li>
                </ul>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">3. كيفية استخدام البيانات</h2>
                <p className="mb-2">
                  أستخدم البيانات التي أجمعها للأغراض التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>توفير وتحسين خدماتي والحفاظ عليها</li>
                  <li>إنشاء وإدارة حسابك على المنصة</li>
                  <li>تخصيص تجربة اللعب وفقًا لمستوى مهاراتك وتفضيلاتك</li>
                  <li>تحليل استخدام المنصة وتحسين ميزاتها</li>
                  <li>منع الأنشطة الاحتيالية أو غير المصرح بها</li>
                </ul>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">4. مشاركة البيانات</h2>
                <p>
                  لا أشارك معلوماتك الشخصية مع أطراف ثالثة باستثناء مزودي الخدمات الذين يساعدونني في تشغيل المنصة (مثل مزودي خدمات الاستضافة ومعالجة الدفع). هؤلاء المزودون ملزمون باتفاقيات سرية وقيود استخدام البيانات.
                </p>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">5. أمان البيانات</h2>
                <p>
                  أنا ملتزم بحماية بياناتك وأستخدم تدابير أمنية معقولة تجاريًا لحماية معلوماتك من الوصول غير المصرح به أو الكشف عنها. ومع ذلك، لا يمكنني ضمان الأمان المطلق لبياناتك عبر الإنترنت.
                </p>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">6. حقوقك</h2>
                <p className="mb-2">
                  تمتلك عدة حقوق فيما يتعلق ببياناتك الشخصية:
                </p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>الوصول إلى بياناتك الشخصية المخزنة لدينا</li>
                  <li>تصحيح أي معلومات غير دقيقة</li>
                  <li>حذف بياناتك (الحق في النسيان)</li>
                  <li>نقل بياناتك إلى خدمة أخرى</li>
                </ul>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">7. التغييرات على سياسة الخصوصية</h2>
                <p>
                  قد أقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سأقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار داخل التطبيق.
                </p>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">8. اتصل بي</h2>
                <p>
                  إذا كانت لديك أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بي، يرجى التواصل معي على البريد الإلكتروني: privacy@auragz.com
                </p>
              </div>
              
              <p className="text-white/60 mt-8 text-sm text-center">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
