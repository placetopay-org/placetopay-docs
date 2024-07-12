import { useLocale } from "@/components/LocaleProvider";
import { useTabRouter } from "@/components/TabProvider";
import { TAB_NAVIGATION } from "@/constants/navigations";
import { useRouter } from "next/router";

export const useNamespaceRoute = () => {
  const router = useRouter();
  const paths = router.pathname.split('/', 3);
  const namespace = paths[1] && paths[1].length > 2 ? paths[1] : paths[2];
  switch (namespace) {
    case 'checkout':
      return 'checkout';
    case 'three_d_s_server':
      return 'three_d_s_server';
    default:
      return 'gateway';
  }}

export const useNavigation = (namespaces) => {
  const tabRouter = useTabRouter();
  const {locale} = useLocale();

  switch (namespaces) {
    case 'checkout':
      return TAB_NAVIGATION.checkout[locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'gateway':
      return TAB_NAVIGATION.gateway[locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'three_d_s_server':
      return TAB_NAVIGATION.three_d_s_server[locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    default:
      throw new Error(`The namespace navigation '${namespaces}' is not defined`);
  }
}

export const useAllNavigation = () => {
  const {locale} = useLocale();

  let navigations = [];

  for (const namespace in TAB_NAVIGATION) {
    TAB_NAVIGATION[namespace][locale].forEach((item) => {
      navigations.push(...item.links);
    });
  }

  return navigations;
}