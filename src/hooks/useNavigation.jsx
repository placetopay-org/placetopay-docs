import { useLocale } from "@/components/LocaleProvider";
import { CHECKOUT_NAVIGATION } from "@/constants/navigations";

export const useNavigation = (namespaces) => {
  const {locale} = useLocale();

  switch (namespaces) {
    case 'checkout':
      return CHECKOUT_NAVIGATION[locale];
    default:
      throw new Error(`The namespace navigation '${namespaces}' is not defined`);
  }
}