import { useContext } from "react"
import { NavigationGroupContext } from "@/components/contexts/NavigationGroupContext"

/**
 * 
 * @returns {Object} The context value
 */
export const useNavigationGroupContext = () => {
    const context = useContext(NavigationGroupContext)

    if (!context) {
        throw new Error("useNavigationGroup must be used within a NavigationGroupProvider")
    }

    return context;
}