import { NAMESPACES_SELECTOR } from "@/constants/navigations";

export const getNamespaceSelectorByLocale = (locale) => {
    return NAMESPACES_SELECTOR[locale];
};