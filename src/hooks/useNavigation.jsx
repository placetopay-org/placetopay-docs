import { useLocale } from "@/components/LocaleProvider";
import { CHECKOUT_NAVIGATION, GATEWAY_NAVIGATION } from "@/constants/navigations";
import { useRouter } from "next/router";

export const useNamespaceRoute = () => {
  const router = useRouter();
  const paths = router.pathname.split('/', 3);
  const namespace = paths[1] && paths[1].length > 2 ? paths[1] : paths[2];
  return namespace === 'checkout' ? 'checkout' : 'gateway';
}

export const useNavigation = (namespaces) => {
  const {locale} = useLocale();

  switch (namespaces) {
    case 'checkout':
      return CHECKOUT_NAVIGATION[locale];
    case 'gateway':
      return GATEWAY_NAVIGATION[locale];
    default:
      throw new Error(`The namespace navigation '${namespaces}' is not defined`);
  }
}