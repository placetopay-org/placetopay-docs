import { useRouter } from "next/router";
import { NAMESPACE_ROUTES, TAB_NAVIGATION } from "@/constants/navigations";
import { useLocale } from "@/components/LocaleProvider";
import { useTabRouter } from "@/components/TabProvider";

export const useNamespaceRoute = () => {
  const router = useRouter();
  const paths = router.pathname.split('/', 3);
  const namespace = paths[1] && paths[1].length > 2 ? paths[1] : paths[2];

  if (namespace.startsWith('_error')) {
    return null;
  }

  const routeNamespace = NAMESPACE_ROUTES[namespace];
  if (!routeNamespace) {
    throw new Error(`The namespace route '${namespace}' is not defined, please add it to the NAMESPACE_ROUTES constant in src/constants/navigations.js`);
  }

  return routeNamespace;
}

export const useNavigation = () => {
  const namespaces = useNamespaceRoute();
  const tabRouter = useTabRouter();
  const {locale} = useLocale();

  if (!namespaces || !tabRouter.active) {
    return [];
  }

  const routes = TAB_NAVIGATION[namespaces]?.[locale]?.find((item) => item.identifier === tabRouter.active)?.links ?? [];
  if (routes.length === 0) {
    throw new Error(`The namespace navigation '${namespaces}' is not defined`);
  }

  return routes;
}

export const useAllNavigation = () => {
  const {locale} = useLocale();

  let navigations = [];

  Object.values(NAMESPACE_ROUTES).forEach((namespace) => {
    TAB_NAVIGATION[namespace][locale].forEach((item) => {
      navigations.push(...item.links);
    });
  });

  return navigations;
}
