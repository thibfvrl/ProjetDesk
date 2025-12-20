import { MD3LightTheme } from "react-native-paper";
// Brand colour palette
const brandColors = {
 primary: "#3949ab",
 secondary: "#ff7043",
 background: "#f5f5f5",
};
// Material theme
const theme = {
 ...MD3LightTheme,
 colors: {
 ...MD3LightTheme.colors,
 primary: brandColors.primary,
 secondary: brandColors.secondary,
 background: brandColors.background,
 },
 roundness: 8, // global border radius for components
};
export { brandColors };
export default theme;