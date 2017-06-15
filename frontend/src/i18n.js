/**
 * Local configurations
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import i18n from "i18next";

i18n.init({
  fallbackLng: "es",
  resources: {
    es: {
      translation: {
        hello: "Hola mundano"
      }
    }
  }
});

export default i18n;
