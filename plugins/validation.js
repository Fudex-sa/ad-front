import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import * as rules from "vee-validate/dist/rules";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);


// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// localize('en', en);
// extend("required", required);
// extend("min", min);
// extend("email", email);


//Importing dictionaries for vee-validate
// import en from 'vee-validate/dist/locale/en';
// import fr from 'vee-validate/dist/locale/fr';
// import VeeValidate, {Validator} from 'vee-validate';

// export default function ({app}) {
//   //Loading languages for Vee
//   Validator.localize('en', en);
//   Validator.localize('fr', fr);

//   //Localizing the app when user refresh or access a localized link
//   Validator.localize((app.i18n.loadedLanguages[0]));

//   //Called everytime language change
//   app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
//     Validator.localize(newLocale);
//   }
// }