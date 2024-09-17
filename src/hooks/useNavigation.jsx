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
    case 'three-d-s-server':
      return 'three-d-s-server';
    case 'acs':
      return 'acs';
    case 'sdks':
      return 'sdks';
    case 'token-requestor':
      return 'token-requestor';
    case 'payment-links':
        return 'payment-links';
    case 'microsites':
        return 'microsites';
    case 'ticket':
      return 'ticket';
    case 'core':
      return 'core';
    case 'account-validator':
      return 'account-validator';
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
    case 'three-d-s-server':
      return TAB_NAVIGATION['three-d-s-server'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'acs':
      return TAB_NAVIGATION.acs[locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'sdks':
      return TAB_NAVIGATION.sdks[locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'token-requestor':
      return TAB_NAVIGATION['token-requestor'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'payment-links':
        return TAB_NAVIGATION['payment-links'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'microsites':
        return TAB_NAVIGATION['microsites'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'ticket':
      return TAB_NAVIGATION['ticket'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'core':
      return TAB_NAVIGATION['core'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
    case 'account-validator':
      return TAB_NAVIGATION['account-validator'][locale].find((item) => item.identifier === tabRouter.active)?.links ?? [];
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
