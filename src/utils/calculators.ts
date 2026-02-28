export interface Calculator {
    title: string;
    description: string;
    href: string;
    icon: string;
    keywords: string[];
    category: 'Health' | 'Finance' | 'Fun' | 'Utility' | 'Chronology';
    isNew?: boolean;
    isPopular?: boolean;
}

export const calculators: Calculator[] = [
    // --- CHRONOLOGY (Updated & Original) ---
    {
        title: 'Days Until Event',
        description: 'Calculate how many days remain until a selected future date for any event or deadline.',
        href: '/days-until',
        icon: '📅',
        keywords: ['days until', 'countdown', 'event', 'deadline', 'date'],
        category: 'Chronology',
        isPopular: true
    },
    {
        title: 'Weeks Between Dates',
        description: 'Calculate the total number of weeks and days between any two specific dates.',
        href: '/weeks-between-dates',
        icon: '🗓️',
        keywords: ['weeks', 'duration', 'between dates', 'planning', 'time'],
        category: 'Chronology'
    },
    {
        title: 'Business Days Calculator',
        description: 'Calculate working days between two dates by automatically excluding weekends.',
        href: '/business-days-calculator',
        icon: '💼',
        keywords: ['business days', 'working days', 'weekends', 'deadline', 'work'],
        category: 'Chronology'
    },
    {
        title: 'Leap Year Checker',
        description: 'Instantly check whether a specific year is a leap year using standard calendar rules.',
        href: '/leap-year-calculator',
        icon: '🌍',
        keywords: ['leap year', 'calendar', 'check', 'year', 'date'],
        category: 'Chronology'
    },
    {
        title: 'Time Duration Calculator',
        description: 'Add or subtract time values in hours, minutes, and seconds for work logs or schedules.',
        href: '/time-duration-calculator',
        icon: '⏱️',
        keywords: ['time', 'duration', 'hours', 'minutes', 'seconds', 'calculate'],
        category: 'Chronology'
    },
    {
        title: 'World Clock Tool',
        description: 'Display and compare current times across multiple world locations seamlessly.',
        href: '/world-clock',
        icon: '🕘',
        keywords: ['world clock', 'timezones', 'cities', 'global', 'current time'],
        category: 'Chronology'
    },
    // Original Chronology tools...
    {
        title: 'Exact Age Calculator',
        description: 'Calculate your precise age in years, months, and days with our free exact age tool.',
        href: '/exact-age',
        icon: '🎂',
        keywords: ['age', 'birthday', 'exact', 'years', 'months', 'days'],
        category: 'Chronology'
    },
    {
        title: 'Age on Specific Date',
        description: 'Calculate your precise age at any point in history or in the future with our versatile date tool.',
        href: '/age-at-date',
        icon: '📅',
        keywords: ['age', 'date', 'future', 'past', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Date Difference',
        description: 'Measure the exact duration between two dates in years, months, weeks, and days.',
        href: '/date-diff',
        icon: '⏳',
        keywords: ['date', 'difference', 'duration', 'time', 'between'],
        category: 'Chronology'
    },
    {
        title: 'Day of the Week',
        description: 'Discover the exact day of the week for any date in history or the future.',
        href: '/day-of-week',
        icon: '📆',
        keywords: ['day', 'week', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        category: 'Chronology'
    },
    {
        title: 'Birthday Information',
        description: 'Unlock fascinating facts and statistics about your birthday and zodiac signs.',
        href: '/birthday-info',
        icon: '🎈',
        keywords: ['birthday', 'zodiac', 'facts', 'star sign', 'fun'],
        category: 'Chronology'
    },
    {
        title: 'Retirement Age Calculator',
        description: 'Determine exactly when you can retire based on your current age and goals.',
        href: '/retirement-age',
        icon: '🏦',
        keywords: ['retirement', 'age', 'work', 'pension', 'finance'],
        category: 'Chronology'
    },
    {
        title: 'Age in Weeks / Days',
        description: 'View your lifetime translated into total weeks and days lived.',
        href: '/age-weeks-days',
        icon: '🗓️',
        keywords: ['age', 'weeks', 'days', 'time', 'life', 'duration'],
        category: 'Chronology'
    },
    {
        title: 'Half Birthday Calculator',
        description: 'Find the exact date of your next half-birthday and celebrate the midpoint.',
        href: '/half-birthday',
        icon: '🍰',
        keywords: ['birthday', 'half', 'date', 'celebrate', '6 months'],
        category: 'Chronology'
    },
    {
        title: 'Age Verification',
        description: 'Instantly verify if a birth date meets a specific minimum age threshold.',
        href: '/age-verification',
        icon: '🔞',
        keywords: ['age', 'verification', '18', 'adult', 'check', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Historical Event Age',
        description: 'Calculate exactly how old a person was during any specific year in history.',
        href: '/historical-age',
        icon: '📜',
        keywords: ['age', 'history', 'event', 'past', 'years', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Age Milestone Reminder',
        description: 'Discover fascinating facts about your upcoming life milestones and celebrate your personal history.',
        href: '/age-milestones',
        icon: '🎖️',
        keywords: ['milestone', 'age', 'reminder', 'life', 'fun'],
        category: 'Chronology',
        isNew: true
    },
    {
        title: 'Age on Specific Date',
        description: 'Calculate your precise age at any specific point in history or future.',
        href: '/age-on-specific-date',
        icon: '📅',
        keywords: ['age', 'date', 'future', 'past', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Day Counter',
        description: 'Count the exact number of days between two dates or from a specific event.',
        href: '/day-counter',
        icon: '🔢',
        keywords: ['days', 'counter', 'time', 'date', 'duration'],
        category: 'Chronology'
    },

    // --- FINANCE (Updated & Original) ---
    {
        title: 'Tax Calculator (Simple %)',
        description: 'Quickly estimate tax amount and net income based on a simple percentage rate.',
        href: '/tax-calculator-simple',
        icon: '💰',
        keywords: ['tax', 'percentage', 'income', 'budget', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Tip Calculator',
        description: 'Calculate the perfect tip and split the total bill easily among friends.',
        href: '/tip-calculator',
        icon: '💸',
        keywords: ['tip', 'bill', 'split', 'restaurant', 'finance'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Salary After Tax',
        description: 'Estimate your real take-home monthly or yearly income after tax deductions.',
        href: '/salary-after-tax',
        icon: '💼',
        keywords: ['salary', 'income', 'tax', 'deductions', 'net pay'],
        category: 'Finance'
    },
    {
        title: 'Monthly Expense Tracker',
        description: 'Track and categorize your monthly spending habits for better financial control.',
        href: '/monthly-expenses-tracker',
        icon: '📊',
        keywords: ['expenses', 'budget', 'tracker', 'spending', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Savings vs Inflation',
        description: 'Visualize how inflation impacts your savings and purchasing power over time.',
        href: '/savings-inflation-calculator',
        icon: '📈',
        keywords: ['inflation', 'savings', 'purchasing power', 'future value', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Bill Splitter',
        description: 'Divide any bill evenly or with custom shares among multiple people accurately.',
        href: '/bill-splitter',
        icon: '🤝',
        keywords: ['bill split', 'share', 'friends', 'trip', 'payment'],
        category: 'Finance'
    },
    // Original Finance tools...
    {
        title: 'Retirement Savings Goal',
        description: 'Determine the exact amount you need to save for a comfortable retirement.',
        href: '/retirement-savings',
        icon: '💰',
        keywords: ['retirement', 'savings', 'goal', 'finance', 'money', 'investment'],
        category: 'Finance'
    },
    {
        title: 'Savings Goal Calculator',
        description: 'Calculate exactly how much you need to save each month to reach your financial target.',
        href: '/savings-goal',
        icon: '🎯',
        keywords: ['savings', 'goal', 'finance', 'budget', 'planning', 'investment'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Savings Goal Time',
        description: 'Discover exactly how long it will take to reach your financial savings goals.',
        href: '/savings-goal-time',
        icon: '⏳',
        keywords: ['savings', 'goal', 'time', 'finance', 'saving', 'plan'],
        category: 'Finance'
    },
    {
        title: 'Compound Interest',
        description: 'Visualize the power of exponential growth on your investments and savings.',
        href: '/compound-interest',
        icon: '📈',
        keywords: ['finance', 'investment', 'interest', 'compound', 'savings', 'money'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Loan EMI Calculator',
        description: 'Calculate your exact monthly installments for any type of loan instantly.',
        href: '/loan-emi',
        icon: '💳',
        keywords: ['loan', 'emi', 'finance', 'payment', 'bank', 'interest'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Inflation Calculator',
        description: 'Understand how the purchasing power of your money changes over time.',
        href: '/inflation-calculator',
        icon: '📉',
        keywords: ['inflation', 'money', 'value', 'finance', 'purchasing power'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Profit Margin Calculator',
        description: 'Determine the exact profitability of your products or services effortlessly.',
        href: '/profit-margin-calculator',
        icon: '📊',
        keywords: ['profit', 'margin', 'business', 'revenue', 'cost', 'finance'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Break-Even Calculator',
        description: 'Find the precise point where your business revenue equals your expenses.',
        href: '/break-even-calculator',
        icon: '🔄',
        keywords: ['break-even', 'units', 'cost', 'business', 'finance', 'sales'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Hourly to Salary Converter',
        description: 'Translate your hourly wage into a comprehensive yearly or monthly salary figure.',
        href: '/salary-converter',
        icon: '💼',
        keywords: ['salary', 'hourly', 'wage', 'income', 'finance', 'pay'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Overtime Pay Calculator',
        description: 'Calculate your total earnings including overtime hours at various pay rates.',
        href: '/overtime-calculator',
        icon: '➕',
        keywords: ['overtime', 'pay', 'salary', 'income', 'finance', 'work'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Debt Payoff Calculator',
        description: 'Visualize your path to financial freedom and calculate how long to clear debts.',
        href: '/debt-payoff-calculator',
        icon: '📉',
        keywords: ['debt', 'payoff', 'finance', 'loans', 'credit card', 'money'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Net Worth Calculator',
        description: 'Get a clear picture of your financial health by calculating assets and liabilities.',
        href: '/net-worth-calculator',
        icon: '💎',
        keywords: ['net worth', 'assets', 'liabilities', 'finance', 'wealth'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Budget Planner Sheet',
        description: 'Take control of your monthly finances and plan for future wealth by tracking income and expenses.',
        href: '/budget-planner',
        icon: '💸',
        keywords: ['budget', 'planner', 'finance', 'expenses', 'saving'],
        category: 'Finance',
        isNew: true
    },
    {
        title: 'Business Loan Calculator',
        description: 'Estimate your monthly payments and total interest for a commercial or business loan.',
        href: '/business-loan-calculator',
        icon: '🏢',
        keywords: ['business', 'loan', 'finance', 'commercial', 'payment'],
        category: 'Finance'
    },
    {
        title: 'Car Payment Calculator',
        description: 'Calculate your monthly auto loan payments based on price, interest, and term.',
        href: '/car-payment-calculator',
        icon: '🏎️',
        keywords: ['car', 'loan', 'auto', 'payment', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Personal Loan Calculator',
        description: 'Quickly estimate monthly payments for personal loans with fixed interest rates.',
        href: '/personal-loan-calculator',
        icon: '💰',
        keywords: ['personal loan', 'finance', 'payment', 'credit'],
        category: 'Finance'
    },
    {
        title: 'Mortgage Payoff Calculator',
        description: 'See how extra payments can shorten your mortgage and save you thousands in interest.',
        href: '/mortgage-payoff-calculator',
        icon: '🏠',
        keywords: ['mortgage', 'payoff', 'house', 'finance', 'interest'],
        category: 'Finance'
    },
    {
        title: 'Daily Spending Limit',
        description: 'Calculate how much you can spend each day to stay within your monthly budget.',
        href: '/daily-spending-limit',
        icon: '💳',
        keywords: ['spending', 'budget', 'limit', 'daily', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Sales Tax Calculator',
        description: 'Find the total price of an item after adding local or state sales tax.',
        href: '/sales-tax-calculator',
        icon: '🛍️',
        keywords: ['sales tax', 'shopping', 'price', 'finance'],
        category: 'Finance'
    },
    {
        title: 'VAT Calculator',
        description: 'Easily calculate Value Added Tax (VAT) for inclusive or exclusive amounts.',
        href: '/vat-calculator',
        icon: '💹',
        keywords: ['vat', 'tax', 'finance', 'business'],
        category: 'Finance'
    },
    {
        title: 'Savings Rate Calculator',
        description: 'Determine the percentage of your income that you are successfully saving each month.',
        href: '/savings-rate-calculator',
        icon: '📈',
        keywords: ['savings', 'rate', 'income', 'finance', 'wealth'],
        category: 'Finance'
    },
    {
        title: 'Commute Cost Calculator',
        description: 'Calculate the true monthly cost of your commute including fuel and maintenance.',
        href: '/commute-cost-calculator',
        icon: '🚗',
        keywords: ['commute', 'cost', 'fuel', 'work', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Price Per Unit',
        description: 'Compare the value of different package sizes by calculating price per weight or volume.',
        href: '/price-per-unit',
        icon: '⚖️',
        keywords: ['price', 'unit', 'shopping', 'comparison', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Tax Bracket Calculator',
        description: 'Estimate which tax bracket you fall into based on your annual taxable income.',
        href: '/tax-bracket-calculator',
        icon: '📊',
        keywords: ['tax bracket', 'income', 'finance', 'irs'],
        category: 'Finance'
    },

    // --- HEALTH (Updated & Original) ---
    {
        title: 'Body Fat Calculator',
        description: 'Estimate your body fat percentage using standard fitness and health formulas.',
        href: '/body-fat-calculator',
        icon: '⚖️',
        keywords: ['body fat', 'fitness', 'health', 'percentage', 'measurements'],
        category: 'Health'
    },
    {
        title: 'Waist-to-Height Ratio',
        description: 'Measure your health risk based on body proportions with this simple metric.',
        href: '/waist-to-height-ratio',
        icon: '📏',
        keywords: ['waist', 'height', 'ratio', 'health', 'risk', 'metric'],
        category: 'Health'
    },
    {
        title: 'Daily Step Goal',
        description: 'Discover your ideal daily step target based on your age and activity level.',
        href: '/daily-step-goal',
        icon: '👟',
        keywords: ['steps', 'goal', 'activity', 'fitness', 'health'],
        category: 'Health'
    },
    {
        title: 'Workout Rest Timer',
        description: 'Manage your exercise rest periods efficiently to improve workout pacing.',
        href: '/workout-rest-timer',
        icon: '⏱️',
        keywords: ['workout', 'rest', 'timer', 'fitness', 'intervals'],
        category: 'Health'
    },
    {
        title: 'Healthy Weight Range',
        description: 'Find your clinically recommended healthy weight range according to BMI standards.',
        href: '/healthy-weight-range',
        icon: '💚',
        keywords: ['weight', 'healthy', 'range', 'bmi', 'fitness', 'health'],
        category: 'Health'
    },
    {
        title: 'Sleep Debt Calculator',
        description: 'Calculate your accumulated sleep deficit to better manage fatigue and rest.',
        href: '/sleep-debt-calculator',
        icon: '😴',
        keywords: ['sleep debt', 'fatigue', 'rest', 'health', 'insomnia'],
        category: 'Health'
    },
    // Original Health tools...
    {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index (BMI) to determine if you are at a healthy weight.',
        href: '/bmi-calculator',
        icon: '⚖️',
        keywords: ['bmi', 'health', 'weight', 'height', 'fitness', 'body'],
        category: 'Health'
    },
    {
        title: 'Ideal Weight Calculator',
        description: 'Find your target healthy body weight based on clinically recognized standards.',
        href: '/ideal-weight',
        icon: '📏',
        keywords: ['weight', 'ideal', 'health', 'fitness', 'body', 'height'],
        category: 'Health'
    },
    {
        title: 'Life Expectancy Estimator',
        description: 'Estimate your potential lifespan based on common health habits and lifestyle.',
        href: '/life-expectancy',
        icon: '🧬',
        keywords: ['life', 'expectancy', 'habits', 'health', 'lifespan', 'age'],
        category: 'Health'
    },
    {
        title: 'Calorie Needs Calculator',
        description: 'Estimate your daily calorie requirements for maintenance or weight goals.',
        href: '/calorie-needs',
        icon: '🍎',
        keywords: ['calorie', 'health', 'fitness', 'diet', 'maintenance', 'energy'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Water Intake Calculator',
        description: 'Determine your ideal daily hydration target based on weight and activity.',
        href: '/water-intake',
        icon: '💧',
        keywords: ['water', 'hydration', 'health', 'fitness', 'drink', 'daily'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Pregnancy Due Date',
        description: 'Estimate your expected delivery date and track your pregnancy journey.',
        href: '/pregnancy-due-date',
        icon: '👶',
        keywords: ['pregnancy', 'baby', 'due date', 'maternity', 'birth', 'parenting'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Ovulation Calculator',
        description: 'Identify your most fertile days and estimate your next ovulation date.',
        href: '/ovulation-calculator',
        icon: '🥚',
        keywords: ['ovulation', 'fertility', 'pregnancy', 'cycle', 'conception'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Macro Nutrient Calculator',
        description: 'Calculate your personalized daily targets for protein, carbohydrates, and fats.',
        href: '/macro-calculator',
        icon: '🥩',
        keywords: ['macro', 'nutrition', 'protein', 'carbs', 'fat', 'diet', 'fitness'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Target Heart Rate',
        description: 'Optimize your cardio workouts by discovering your ideal heart rate zones.',
        href: '/heart-rate-calculator',
        icon: '❤️',
        keywords: ['heart rate', 'fitness', 'exercise', 'cardio', 'health', 'zones'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'BMR Calculator',
        description: 'Discover your Basal Metabolic Rate and understand your daily resting calorie burn.',
        href: '/bmr-calculator',
        icon: '🛌',
        keywords: ['bmr', 'calories', 'metabolic', 'rest', 'health', 'fitness'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Ideal Sleep Calculator',
        description: 'Improve your sleep quality by identifying the best bedtime based on sleep cycles.',
        href: '/sleep-calculator',
        icon: '😴',
        keywords: ['sleep', 'cycles', 'bedtime', 'wake up', 'rest', 'health'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Pace Calculator (Running)',
        description: 'Calculate your exact running pace per kilometer or mile for your next race.',
        href: '/pace-calculator',
        icon: '🏃',
        keywords: ['pace', 'running', 'marathon', 'speed', 'fitness', 'km', 'mile'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Random Workout Generator',
        description: 'Generate fresh, random home workout routines tailored to your fitness objectives.',
        href: '/random-workout',
        icon: '💪',
        keywords: ['workout', 'fitness', 'exercise', 'random', 'health'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Meal Planner Generator',
        description: 'Simplify your nutrition with balanced weekly meal plans that fit your lifestyle.',
        href: '/meal-planner',
        icon: '🍲',
        keywords: ['meal', 'planner', 'diet', 'food', 'health'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Workout Progress Tracker',
        description: 'Monitor your strength journey and celebrate transformation by tracking weights and repetitions.',
        href: '/workout-tracker',
        icon: '🏋️',
        keywords: ['workout', 'tracker', 'fitness', 'progress', 'health'],
        category: 'Health',
        isNew: true
    },
    {
        title: 'Body Measurement Tracker',
        description: 'Track your fitness progress accurately by logging weight and key body measurements over time.',
        href: '/body-measurements',
        icon: '📏',
        keywords: ['body', 'measurements', 'tracker', 'fitness', 'health'],
        category: 'Health',
        isNew: true
    },

    // --- UTILITY (Updated & Original) ---
    {
        title: 'Word Counter',
        description: 'Count words, characters, and analyze text length instantly for any content.',
        href: '/word-counter',
        icon: '🔡',
        keywords: ['word count', 'character count', 'text', 'analysis', 'utility'],
        category: 'Utility',
        isPopular: true
    },
    {
        title: 'Text Reverser',
        description: 'Instantly reverse any text character by character or word by word.',
        href: '/text-reverser',
        icon: '🔄',
        keywords: ['reverse text', 'flip', 'debugging', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Remove Duplicate Lines',
        description: 'Clean up your lists and data by removing all repeated text lines instantly.',
        href: '/remove-duplicate-lines',
        icon: '🧹',
        keywords: ['duplicates', 'clean text', 'list', 'filter', 'utility'],
        category: 'Utility'
    },
    {
        title: 'URL Encoder / Decoder',
        description: 'Safely encode or decode URL strings for web development and SEO tasks.',
        href: '/url-encoder-decoder',
        icon: '🌐',
        keywords: ['url', 'encode', 'decode', 'web', 'developer', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Base64 Converter',
        description: 'Convert any text to and from Base64 format securely in your browser.',
        href: '/base64-converter',
        icon: '🔐',
        keywords: ['base64', 'encode', 'decode', 'binary', 'text', 'utility'],
        category: 'Utility'
    },
    {
        title: 'JSON Formatter',
        description: 'Format messy JSON into a readable structure and validate its syntax.',
        href: '/json-formatter',
        icon: '📦',
        keywords: ['json', 'format', 'validate', 'syntax', 'utility'],
        category: 'Utility'
    },
    // Original Utility tools...
    {
        title: 'Time Zone Difference',
        description: 'Compare city times instantly and find overlapping hours for international meetings.',
        href: '/timezone-diff',
        icon: '🌍',
        keywords: ['timezone', 'time', 'cities', 'difference', 'world', 'clock'],
        category: 'Utility'
    },
    {
        title: 'Percentage Calculator',
        description: 'Solve any percentage problem quickly, from simple increases to complex financial ratios.',
        href: '/percentage-calculator',
        icon: '🔢',
        keywords: ['percentage', 'math', 'percent', 'increase', 'decrease', 'fraction'],
        category: 'Utility'
    },
    {
        title: 'Discount Calculator',
        description: 'Find out exactly how much you will save and the final price of any item.',
        href: '/discount-calculator',
        icon: '🏷️',
        keywords: ['discount', 'sale', 'save', 'price', 'shopping', 'math'],
        category: 'Utility'
    },
    {
        title: 'Grade Calculator',
        description: 'Calculate your final grade percentage and overall GPA effortlessly.',
        href: '/grade-calculator',
        icon: '🎓',
        keywords: ['grade', 'school', 'marks', 'percentage', 'result', 'study'],
        category: 'Utility'
    },
    {
        title: 'School Age Eligibility',
        description: 'Check if your child qualifies for school based on regional age requirements.',
        href: '/school-age-eligibility',
        icon: '🏫',
        keywords: ['school', 'age', 'eligibility', 'admission', 'child', 'education'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'GPA Calculator',
        description: 'Track your academic performance and calculate your Semester and Cumulative GPA.',
        href: '/gpa-calculator',
        icon: '📝',
        keywords: ['gpa', 'grades', 'school', 'university', 'study', 'education'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Study Time Planner',
        description: 'Optimize your academic schedule and divide study hours across subjects efficiently.',
        href: '/study-planner',
        icon: '📚',
        keywords: ['study', 'planner', 'time', 'learning', 'education', 'schedule'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Screen Time Cost',
        description: 'Discover the real value of your time by calculating the cost of daily app usage.',
        href: '/screen-time-cost',
        icon: '📱',
        keywords: ['screen time', 'apps', 'productivity', 'time', 'cost', 'waste'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Electricity Bill Estimator',
        description: 'Estimate your monthly electricity costs based on appliance usage and local rates.',
        href: '/electricity-calculator',
        icon: '⚡',
        keywords: ['electricity', 'bill', 'utility', 'cost', 'energy', 'power'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Fuel Cost Calculator',
        description: 'Calculate your estimated fuel expenses based on distance, gas prices, and efficiency.',
        href: '/fuel-calculator',
        icon: '⛽',
        keywords: ['fuel', 'trip', 'travel', 'cost', 'car', 'distance', 'gas'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Speed Calculator',
        description: 'Determine the exact speed of any object based on distance and time elapsed.',
        href: '/speed-calculator',
        icon: '🏎️',
        keywords: ['speed', 'distance', 'time', 'physics', 'velocity'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Work Hour Calculator',
        description: 'Track your professional time and calculate exact hours worked between clock-ins.',
        href: '/work-hour-calculator',
        icon: '🕙',
        keywords: ['work', 'hours', 'timesheet', 'pay', 'schedule'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Password Strength',
        description: 'Evaluate the resilience of your passwords against modern hacking techniques.',
        href: '/password-strength',
        icon: '🔐',
        keywords: ['password', 'security', 'checker', 'privacy', 'strength'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Character Counter',
        description: 'Achieve the perfect length for your text by counting characters and words.',
        href: '/character-counter',
        icon: '🔡',
        keywords: ['character', 'word', 'counter', 'text', 'analysis'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Text Case Converter',
        description: 'Transform your text into UPPERCASE, lowercase, Title Case, or Sentence Case instantly.',
        href: '/text-converter',
        icon: '🔠',
        keywords: ['text', 'case', 'converter', 'upper', 'lower', 'title'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Password Generator',
        description: 'Generate strong, random, and cryptographically secure passwords for your digital accounts.',
        href: '/password-generator',
        icon: '🔑',
        keywords: ['password', 'security', 'generator', 'random', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Study Timetable Generator',
        description: 'Organize your academic life by automatically distributing subjects across your week.',
        href: '/study-timetable',
        icon: '📅',
        keywords: ['study', 'timetable', 'schedule', 'education', 'planner'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Habit Tracker',
        description: 'Build positive routines and stay committed to your goals with visual streak tracking.',
        href: '/habit-tracker',
        icon: '✅',
        keywords: ['habit', 'tracker', 'streak', 'productivity', 'health'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Goal Breakdown Planner',
        description: 'Transform ambitious dreams into reality by breaking big objectives into actionable steps.',
        href: '/goal-planner',
        icon: '🎯',
        keywords: ['goal', 'planner', 'milestones', 'productivity', 'success'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Pomodoro Timer',
        description: 'Maximize focus and productivity using the proven technique of timed work intervals.',
        href: '/pomodoro-timer',
        icon: '🍅',
        keywords: ['pomodoro', 'timer', 'focus', 'productivity', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Grocery List Builder',
        description: 'Organize your shopping trips by category and store aisle for maximum efficiency.',
        href: '/grocery-list',
        icon: '🛒',
        keywords: ['grocery', 'shopping', 'list', 'organizer', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Text to Morse Code',
        description: 'Encode your messages into Morse code or decode mysterious signals back into readable text.',
        href: '/morse-code',
        icon: '⠂',
        keywords: ['morse', 'code', 'translator', 'text', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Binary to Text Converter',
        description: 'Easily translate binary code into readable text and ASCII characters with our fast conversion tool.',
        href: '/binary-converter',
        icon: '0️⃣1️⃣',
        keywords: ['binary', 'text', 'converter', 'ascii', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Unit Converter',
        description: 'Quickly convert between a wide variety of measurements including length, weight, and volume.',
        href: '/unit-converter',
        icon: '📏',
        keywords: ['unit', 'converter', 'length', 'weight', 'temperature', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Productivity Score',
        description: 'Evaluate your daily performance and optimize your workflow by calculating your productivity percentage.',
        href: '/productivity-score',
        icon: '📈',
        keywords: ['productivity', 'score', 'tasks', 'efficiency', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Text Encryption Tool',
        description: 'Protect your sensitive messages by encrypting your text using classic cryptographic techniques.',
        href: '/text-encryption',
        icon: '🔐',
        keywords: ['encryption', 'security', 'cipher', 'text', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Reading List Tracker',
        description: 'Organize your literary adventures and stay committed to learning goals by tracking every book you read.',
        href: '/reading-list',
        icon: '📚',
        keywords: ['reading', 'books', 'tracker', 'list', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'CSV to JSON Converter',
        description: 'Convert CSV data into clean JSON format instantly in your browser.',
        href: '/csv-to-json-converter',
        icon: '📄',
        keywords: ['csv', 'json', 'converter', 'data', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Epoch Converter',
        description: 'Convert Unix timestamps to human-readable dates and vice versa.',
        href: '/epoch-converter',
        icon: '🕒',
        keywords: ['epoch', 'timestamp', 'unix', 'time', 'utility'],
        category: 'Utility'
    },
    {
        title: 'File Size Converter',
        description: 'Convert between different units of digital storage like MB, GB, and TB.',
        href: '/file-size-converter',
        icon: '💾',
        keywords: ['file size', 'converter', 'bytes', 'mb', 'gb', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Hex to RGB Converter',
        description: 'Translate HEX color codes to RGB and vice versa for web design.',
        href: '/hex-converter',
        icon: '🎨',
        keywords: ['hex', 'rgb', 'color', 'converter', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for your design and development projects.',
        href: '/lorem-ipsum-generator',
        icon: '📝',
        keywords: ['lorem ipsum', 'placeholder', 'text', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Markdown Previewer',
        description: 'Write Markdown on the left and see the rendered HTML on the right in real-time.',
        href: '/markdown-previewer',
        icon: 'Ⓜ️',
        keywords: ['markdown', 'preview', 'html', 'editor', 'utility'],
        category: 'Utility'
    },
    {
        title: 'SQL Formatter',
        description: 'Clean up and beautify your SQL queries for better readability.',
        href: '/sql-formatter',
        icon: '🗄️',
        keywords: ['sql', 'formatter', 'beautify', 'database', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Text Analyzer',
        description: 'Analyze text for readability, sentiment, and keyword density.',
        href: '/text-analyzer',
        icon: '🔍',
        keywords: ['text', 'analyzer', 'readability', 'sentiment', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Week Number Calculator',
        description: 'Find the current week number or calculate the week number for any date.',
        href: '/week-number-calculator',
        icon: '📅',
        keywords: ['week number', 'calendar', 'time', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Daily Planner Printable',
        description: 'Design and print your own custom daily schedule with our professional online planner.',
        href: '/daily-planner',
        icon: '🖨️',
        keywords: ['planner', 'printable', 'daily', 'schedule', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Signature Generator',
        description: 'Create professional digital signatures for your documents and emails with our easy-to-use tool.',
        href: '/signature-generator',
        icon: '✍️',
        keywords: ['signature', 'draw', 'canvas', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Simple QR Generator',
        description: 'Create custom QR codes for your links or text with our secure, locally-running tool.',
        href: '/qr-generator',
        icon: '🔳',
        keywords: ['qr code', 'generator', 'offline', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Habit Streak Counter',
        description: 'Build long-term discipline by tracking your daily winning streaks with our visual habit tool.',
        href: '/habit-streak',
        icon: '🔥',
        keywords: ['habit', 'streak', 'tracker', 'productivity', 'utility'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Image Color Picker',
        description: 'Extract exact HEX/RGB colors from any uploaded image instantly.',
        href: '/color-picker',
        icon: '🎨',
        keywords: ['color', 'picker', 'hex', 'rgb', 'image', 'extract'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Random Gradient Generator',
        description: 'Generate and copy modern CSS linear gradients for your designs.',
        href: '/gradient-generator',
        icon: '🌈',
        keywords: ['gradient', 'css', 'color', 'background', 'generator'],
        category: 'Utility',
        isNew: true
    },
    {
        title: 'Typing Speed Test',
        description: 'Measure your words per minute (WPM) and accuracy with live feedback.',
        href: '/typing-test',
        icon: '⌨️',
        keywords: ['typing', 'speed', 'test', 'wpm', 'accuracy'],
        category: 'Utility',
        isNew: true
    },

    // --- FUN (Updated & Original) ---
    {
        title: 'Reaction Time Tester',
        description: 'Test your reflexes and measure how fast you respond to visual cues.',
        href: '/reaction-time',
        icon: '⚡',
        keywords: ['reaction time', 'reflexes', 'speed', 'test', 'fun'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Speed Math Game',
        description: 'Test your mental math speed and accuracy under pressure in this fun game.',
        href: '/speed-math-game',
        icon: '🧮',
        keywords: ['math', 'speed', 'game', 'mental', 'test', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Word Scramble',
        description: 'Challenge your vocabulary by unscrambling randomized words as fast as possible.',
        href: '/word-scramble-game',
        icon: '🧩',
        keywords: ['scramble', 'word', 'vocabulary', 'guess', 'game', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Would You Rather?',
        description: 'Explore fun dilemmas and make tough choices with this random question generator.',
        href: '/would-you-rather',
        icon: '🤔',
        keywords: ['would you rather', 'dilemma', 'choice', 'generator', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Truth or Dare',
        description: 'Generate fun and engaging prompts for the classic party game instantly.',
        href: '/truth-or-dare',
        icon: '🎲',
        keywords: ['truth or dare', 'prompts', 'game', 'party', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Emoji Fun Generator',
        description: 'Get inspired by generating random emoji combinations for fun and creativity.',
        href: '/emoji-random-generator',
        icon: '🥳',
        keywords: ['emoji', 'random', 'generator', 'creativity', 'fun'],
        category: 'Fun'
    },
    // Original Fun tools...
    {
        title: 'Age on Other Planets',
        description: 'Discover exactly how old you would be on other planets in our solar system.',
        href: '/planetary-age',
        icon: '🚀',
        keywords: ['space', 'age', 'planets', 'mars', 'jupiter', 'astronomy'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Dog Age Calculator',
        description: 'Translate your canine companion\'s age into human years accurately.',
        href: '/dog-age-calculator',
        icon: '🐕',
        keywords: ['dog', 'age', 'pet', 'animal', 'human years'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Countdown Timer',
        description: 'Create a high-precision countdown to any important future event.',
        href: '/countdown-timer',
        icon: '⏱️',
        keywords: ['countdown', 'timer', 'event', 'date', 'reminder'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Wedding Budget Tool',
        description: 'Plan your special day by estimating total wedding expenses across major categories.',
        href: '/wedding-budget',
        icon: '👰',
        keywords: ['wedding', 'budget', 'planner', 'marriage', 'costs'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Travel Budget Planner',
        description: 'Estimate the total cost of your next vacation or business trip easily.',
        href: '/travel-budget',
        icon: '✈️',
        keywords: ['travel', 'trip', 'budget', 'vacation', 'costs'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Age Gap Calculator',
        description: 'Calculate the exact age difference between partners for relationship insights.',
        href: '/age-gap-calculator',
        icon: '💘',
        keywords: ['age gap', 'relationship', 'dating', 'compatibility'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Name Numerology',
        description: 'Discover hidden meanings and personality traits associated with your name.',
        href: '/numerology-calculator',
        icon: '🔮',
        keywords: ['numerology', 'names', 'mystic', 'personality', 'luck'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Random Name Picker',
        description: 'Select a winner or make a fair choice by picking a random name from a list.',
        href: '/name-picker',
        icon: '🎲',
        keywords: ['random', 'picker', 'names', 'draw', 'lucky'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Username Generator',
        description: 'Find the perfect, unique handle for your new social media or gaming profile.',
        href: '/username-generator',
        icon: '👤',
        keywords: ['username', 'social media', 'generator', 'random', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Bio Generator',
        description: 'Craft the perfect professional or social media bio tailored to your personality.',
        href: '/bio-generator',
        icon: '📝',
        keywords: ['bio', 'social media', 'instagram', 'tiktok', 'templates'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Initials Logo Generator',
        description: 'Design a stylish personal brand identity by generating unique initials logos.',
        href: '/initials-logo',
        icon: '🎨',
        keywords: ['logo', 'initials', 'design', 'fonts', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Business Name Generator',
        description: 'Discover creative and memorable brand name ideas based on your core keywords.',
        href: '/business-name',
        icon: '🏢',
        keywords: ['business', 'name', 'brand', 'generator', 'startup'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Hashtag Generator',
        description: 'Boost your social media visibility with relevant and trending hashtags based on your keywords.',
        href: '/hashtag-generator',
        icon: '#️⃣',
        keywords: ['hashtag', 'social media', 'generator', 'tags', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Random Decision Maker',
        description: 'Take the hesitation out of your daily choices by using our fun and interactive decision wheel.',
        href: '/random-decision',
        icon: '🎡',
        keywords: ['decision', 'random', 'spin wheel', 'choice', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Daily Affirmation Generator',
        description: 'Boost your mental wellness and start every morning with a positive mindset.',
        href: '/daily-affirmations',
        icon: '✨',
        keywords: ['affirmation', 'motivation', 'positive', 'daily', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Breakup Recovery Countdown',
        description: 'Monitor your healing journey and track the days since your major life transition.',
        href: '/breakup-recovery',
        icon: '💔',
        keywords: ['breakup', 'recovery', 'countdown', 'time', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Life Timeline Visualizer',
        description: 'Gain a powerful new perspective on your journey by visualizing your life in a grid of weeks.',
        href: '/life-timeline',
        icon: '📊',
        keywords: ['life', 'timeline', 'weeks', 'visualization', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Random Icebreaker Questions',
        description: 'Spark meaningful conversations and build deeper connections with our interactive icebreaker tool.',
        href: '/icebreaker-generator',
        icon: '🧊',
        keywords: ['icebreaker', 'questions', 'conversation', 'social', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Wedding Hashtag Generator',
        description: 'Create a unique digital signature for your big day by generating custom wedding hashtags.',
        href: '/wedding-hashtag',
        icon: '💍',
        keywords: ['wedding', 'hashtag', 'names', 'marriage', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Random Baby Name Generator',
        description: 'Find the perfect name for your newest family member with our creative baby naming tool.',
        href: '/baby-names',
        icon: '👶',
        keywords: ['baby', 'name', 'generator', 'random', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Random Quote Generator',
        description: 'Inspire your daily activities and elevate your mindset with our vast collection of motivational phrases.',
        href: '/random-quote',
        icon: '💬',
        keywords: ['quote', 'inspiration', 'random', 'daily', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Birthday Card Generator',
        description: 'Design and export premium, high-quality birthday cards instantly for your loved ones.',
        href: '/birthday-card',
        icon: '🎂',
        keywords: ['birthday', 'card', 'generator', 'message', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Simple Portfolio Builder',
        description: 'Launch your professional online presence instantly with our clean and polished portfolio builder.',
        href: '/portfolio-builder',
        icon: '💼',
        keywords: ['portfolio', 'builder', 'personal', 'webpage', 'fun'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Spin the Wheel',
        description: 'A customizable decision wheel for random choices, games, or giveaways.',
        href: '/spin-wheel',
        icon: '🎡',
        keywords: ['spin', 'wheel', 'random', 'decision', 'choice'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Dice Roller',
        description: 'Roll one or multiple virtual dice for games or decisions.',
        href: '/dice-roller',
        icon: '🎲',
        keywords: ['dice', 'roll', 'random', 'number', 'game'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Coin Flip Simulator',
        description: 'Simulate a coin flip with realistic 3D-style animations.',
        href: '/coin-flip',
        icon: '🪙',
        keywords: ['coin', 'flip', 'heads', 'tails', 'random'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Yes/No Oracle',
        description: 'Get an instant answer to any yes-or-no question with fun animations.',
        href: '/yes-no-oracle',
        icon: '🔮',
        keywords: ['oracle', 'yes', 'no', 'decision', 'mystic'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Tic Tac Toe',
        description: 'Play the classic game against a friend or a smart computer opponent.',
        href: '/tic-tac-toe',
        icon: '❌',
        keywords: ['tic tac toe', 'game', 'xo', 'strategy', 'multiplayer'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Memory Card Match',
        description: 'Test your memory by finding all matching pairs of cards in the shortest time.',
        href: '/memory-match',
        icon: '🃏',
        keywords: ['memory', 'match', 'cards', 'game', 'brain'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Rock Paper Scissors',
        description: 'Play the timeless decision game against a balanced computer algorithm.',
        href: '/rock-paper-scissors',
        icon: '✊',
        keywords: ['rock', 'paper', 'scissors', 'game', 'choice'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Hangman Game',
        description: 'Guess the hidden words letter by letter before your chances run out.',
        href: '/hangman',
        icon: '🪑',
        keywords: ['hangman', 'game', 'words', 'puzzle', 'letters'],
        category: 'Fun',
        isNew: true
    },
    {
        title: 'Snake Game',
        description: 'Classic arcade snake game with retro-style graphics and high-score tracking.',
        href: '/snake-game',
        icon: '🐍',
        keywords: ['snake', 'game', 'arcade', 'retro', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Moon Phase Calculator',
        description: 'Discover the current phase of the moon and upcoming lunar events.',
        href: '/moon-phase-calculator',
        icon: '🌙',
        keywords: ['moon', 'phase', 'lunar', 'astronomy', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Lucky Number Generator',
        description: 'Generate your personalized lucky numbers for the day based on your energy.',
        href: '/lucky-number',
        icon: '🍀',
        keywords: ['lucky', 'numbers', 'random', 'fortune', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Random Color Generator',
        description: 'Generate random beautiful color palettes and HEX codes instantly.',
        href: '/random-color',
        icon: '🎨',
        keywords: ['color', 'random', 'hex', 'palette', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Sunrise & Sunset Times',
        description: 'Find exact sunrise and sunset times for your location and date.',
        href: '/sunrise-sunset-times',
        icon: '🌅',
        keywords: ['sunrise', 'sunset', 'time', 'daylight', 'fun'],
        category: 'Fun'
    },

];
