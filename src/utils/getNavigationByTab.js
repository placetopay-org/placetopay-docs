import { NAMESPACE_ROUTES, TAB_NAVIGATION } from "@/constants/navigations";

export const getNavigationByTab = (baseRoute, locale) => {
    const namespace = NAMESPACE_ROUTES[baseRoute];
    if (!namespace) {
        throw new Error(`The namespace route '${baseRoute}' is not defined, please add it to the NAMESPACE_ROUTES constant in src/constants/navigations.js`);
    }

    const navigation = TAB_NAVIGATION[namespace][locale];
    if (!navigation) {
        throw new Error(`The namespace navigation '${namespace}' is not defined`);
    }

    return navigation;
}