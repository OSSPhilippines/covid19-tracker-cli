const sayings = [
    "Always wash your hands! Stay safe!",
    "Stay healthy, stay at home...",
    "Play online games with your friends.",
    "Stay in your home!",
    "Avoid fake news...",
    "Eat healthy foods, go to sleep on time.",
    "We will survive!",
    "Code with Love by Waren",
    "COVID-19 is a serious matter!",
    "Wash your hands and don't touch your face!",
    "Social distancing is real...",
    "Developers from the Philippines",
    "Support Open-Source!",
    "Stay at home, play games instead...",
    "Uninstall 2020, virus detected!",
    "Always wear a mask when you go outside.",
    "Watch news to keep updated!",
    "Green apple is better than vitamins!",
    "Health is wealth...",
    "Happiness is the highest form of health",
    "Keep calm and carry on...",
    "Better to be busy than to be busy worrying",
    "Instead of calling it as NCOV, Let's call it as EndCov!",
    "Powered by Coffee!",
    "Powered by the Community!",
    "Wash your hands at least 20 seconds...",
    "Don't worry be happy!",
    "We are not going to die... stay healthy!",
    "Natural foods is better than vitamins...",
    "Let food be thy medicine and medicine be thy food - Hippocrates",
    "Healthy citizens are the greatest asset any country can have - Winston S. Churchill",
    "Wine is the most healthful and most hygienic of beverages - Louis Pasteur",
];

/**
 * @returns A random saying from the array of sayings
 */
export const getSaying: () => string = () => {
    const index = Math.floor(Math.random() * sayings.length);
    return sayings[index];
};
