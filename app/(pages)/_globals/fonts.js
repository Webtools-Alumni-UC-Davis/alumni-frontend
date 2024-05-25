import { Inter, Montserrat, Sunflower, Josefin_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin_sans",
});

const sunflower = Sunflower({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-sunflower",
});

const fonts = [inter, montserrat, josefinSans, sunflower];

const font_variables = fonts.map((font) => font.variable);
const font_string = font_variables.join(" ");
export default font_string;
