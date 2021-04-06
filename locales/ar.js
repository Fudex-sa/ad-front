import ar from '@/node_modules/vee-validate/dist/locale/ar'

const messages = {
  validation: ar.messages,
  hello: 'مرحباً',
  home: "الرئيسية",
  login: "تسجيل دخول",
  signup: "حساب جديد",
  logout: "تسجيل خروج",
  advertiser: 'المعلنين',
  benefits: "المستفيدين",
  about: "من نحن",
  terms_conditions: "الشروط & الاحكام",
  privacy_policy: "سياسة الخصوصية",
  contactus: "اتصل بنا",
  change_lang: "جاري تغيير اللغة",
  overview_about_us: "نبذة مختصرة عنا",
  vision: "رؤيتنا",
  mission: "مهمتنا",
  our_happy_clients: "عملائنا",
  we_are_proud_of_our_partner: "نحن نفتخر بعملائنا",
  call_us_now: "اتصل الان",
  email: "البريد الالكتروني",
  service: "الخدمات",
  extras: "إضافات",
  my_account: "حسابي",
  download_our_app: "حمل تطبيقاتنا",
  subscription: "النشرة البريدية",
  subscripe: "إشتراك",
  about_description: "مزيد من التفاصيل حول شركتنا",
  last_name: "الاسم الاخير",
  campaign_title_ar: "اسم الحملة",

  ads: {
    campaign: "حملة",
    clicks: "عدد الضغطاط",
    status: "الحالة",
    budget: "الميزانية",
    start_at: "تاريخ البداية",
    created: "تاريخ الإنشاء",
    actions: "العمليات",
    description: "الوصف",
    title: "العنوان",
    title_en: "العنوان انجليزي",
    action: {
      edit: "تعديل",
      view: "مشاهدة",
      statistics: "الاحصائيات",
    }
  },
  ad_content: "محتوي الإعلان",
  ad_content_en: " محتوي الإعلان انجليزي",
  home: "الرئيسية",
  review_ads: "مراجعة الإعلانات",
  campaigns: "الحملات",
  users: "المستخدمين",
  Users: "المستخدمين",
  library: "المكتبة",
  tasks: "المهام",
  settings: "الإعدادات",
  Settings: "الإعدادات",
  wallet: "المحفظة",
  logout: "تسجيل الخروج",
  admin_dashboard: "لوحة التحكم",
  ads_count: "عدد الإعلانات",
  budget: "الميزانية",
  clicks: "عدد الضغطاط",
  type: "نوع الحملة",
  click: "ضغطة",
  sar: "ريال",
  ad: "إعلان",
  username: "اسم المستخدم",
  email: "البريد الإلكتروني",
  role: "الصلاحية",
  create_new: "إنشاء جديد",
  cancel: "إلغاء",
  create_category: "إنشاء قسم",
  title: "العنوان",
  title_en: "العنوان باللغة الانجليزية",
  category_cover_image: "صورة الغلاف للقسم",
  save_data: "حفظ البيانات",
  ad_title: "عنوان الإعلان",
  ad_content: "محتوي الإعلان",
  ad_created_at: "تاريخ إنشاء الاعلان",
  start_date: "تاريخ بداية الإعلان",
  budget: "الميزانية",
  remaining_budget: "الميزانية المتبقية",
  gender: "النوع",
  status: "الحالة",
  campaign: "الحملة",
  call_of_action_text: "نص الزر ",
  call_of_action_link: "رابط الاعلان",
  ages: "الاعمار",
  targeted_audience: "الإهتمامات",
  countries: "الدول",
  cities: "المدن",
  language: "اللغة",
  media_type: "نوع الملفات",
  payment_id: "رقم العملية",
  amount_paid: "التكلفة",
  payment_date: "تاريخ الدفع",
  card: "البطاقة",
  Categories: "المكتبة",
  card_holder: "حامل البطاقة",
  payment_method: "طريقة الدفع",
  'Payment Status': 'حالة الدفع',
  'Advertisement Details' : "تفاصيل الإعلان",
  ad_payment_info: "تفاصيل الدفع",


  'About us AR' : "من نحن",
  'About us EN' : "من نحن EN",

  'Vision AR' : "رؤيتنا",
  'Vision EN' : "رؤيتنا EN",

  'Address' : "عنوان المؤسسة",
  'Address profile' : "عنوان",
  'Mission AR' : "مهمتنا",
  'Mission EN' : "مهمتنا EN",
  'Intro Video': "فيديو المقدمة",
  'Contact Us Data'  :"بيانات التواصل",
  'Email' : "البريد الإلكتروني",
  'mobile' : "رقم الجوال",
  'facebook_link' : "رابط الفيس بوك",
  'instagram_link': "رابط انستجرام",
  'twitter_link': "رابط تويتر",
  'Campaigns & Ads Constrains': "الحملات والقيود علي الاعلانات",
  'Campaign Min Duration' : "اقل وقت للحملة",
  'Campaign MinBudget' : "اقل ميزانية للحملة",
  'Ad Min Budget': "اقل ميزانية للإعلانات",
  'Task Min Click Price' : " سعر الضغطة",
  'Update Settings' : "حفظ الإعدادات ",
  'Create User' : "مستخدم جديد",
  'Create Campaign': "إنشاء حملة",
  'campaign_title_ar': "اسم الحملة - AR",
  'campaign_title_en': "اسم الحملة - EN",
  'Search': "بحث",
  'Tasks Level' : "المرحلة",
  'Phone': "رقم الجوال",
  'Username' : "اسم المستخدم",
  'Edit Profile' : "تعديل الملف الشخصي",
  'Current Password' : "كلمة المرور الحالية",
  'Password' : "كلمة المرور",
  'Password Confirmation' : "تأكيد كلمة المرور",
  'Edit Profile Picture': 'الصورة الشخصية',
  'Image Ideal Dimension': "أبعاد الصورة المثالية هي أكثر من 200 × 200 مع امتدادات (jpg ، jpeg ، png)",
  'Update': 'تعديل',
  'Dashboard': "الرئيسية",
  'Campaigns': "الحملات",
  'Ads' : "الإعلانات",
  'Billing': 'المدفوعات',
  'Profile': "الملف الشخصي",
  'Logout': "تسجيل الخروج",
  'Genders': "الأجناس",
  'Ages' : "الاعمار",
  'Targeted Audience': "الجمهور المستهدف",
  'Countries': 'الدول',
  'Country': "الدولة",
  'Visitors number': 'عدد الزوار',
  'Total Clicks': 'إجمالي عدد الضغطات',
  'Clicks For This Month': "عدد الضغطاط الشهرية",
  'Tasks' : "المهام",
  'Wallet' : "المحفظة الإلكترونية",
  'Library' : "المكتبة",
  'Enter Your Data to Continue' : "أدخل بياناتك للمتابعة",
  'Login': "تسجيل الدخول",
  'Enter Your Email': "ادخل بريدك الالكتروني",
  "Enter password": "ادخل كلمة المرور",
  'Remember me': "تذكرني",
  'Forgot Password' :"نسيت كلمة المرور!",
  'Sign up': "تسجيل جديد",
  'Dont have an account' : "ليس لديك حساب",
  'Send Password Reset Link': "إستعادة كلمة المرور",
  'Reset Password' : "إستعادة كملة المرور",
  'Confirm Password' : "تأكيد كملة المرور",
  "Register" : "تسجيل",
  'Already have an account': "لديك حساب بالفعل",
  'Advertiser sign up': "تسجيل كمعلن",
  'Soldier sign up': "تسجيل كمستخدم",
  min_ad_view_duration: 'أقل مدة للإعلان',
  solider_ad_max_profit: 'أقصى قيمة للإعلان'




};
export default messages;

