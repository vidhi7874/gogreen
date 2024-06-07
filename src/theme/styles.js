import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      900: "#45464E",
      800: "#636363",
      700: "#1f2733",
      600: "#ADB8CC",
      500: "#344054",
      400: "#667085",
      300: "#9F9F9F", //Placeholder color
      200: "#F8F8F8", // Input box color
      100: "#f3f3f3",
      50: "#f4f5fa",
      10: "#c3c3c3",
    },

    primary: {
      700: "#A6CE39",
      100: "#FAFFEE",
    },

    secondary: {
      500: "#F08F1A",
      100: "#FEF4E8",
    },

    border_light: {
      100: "#E2E8F0",
    },
    CheckBoxPrimary: {
      500: "#A6CE39",
    },
    radioBoxPrimary: {
      500: "#A6CE39", // Replace with your custom color value
    },
    switchColor: {
      500: "#A6CE39", // Color for the switch component
    },

    aqua: {
      100: "#DBFFF5",
    },
  },

  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            color: "CheckBoxPrimary.500", // Apply the custom color to the checked state
          },
        },
      },
    },
  },

  //These is for the Radio button

  Radio: {
    baseStyle: {
      control: {
        _checked: {
          color: "radioBoxPrimary.500", // Apply the custom color to the checked state
        },
      },
    },
  },

  //These is for the Switch button
  Switch: {
    baseStyle: {
      control: {
        _checked: {
          color: "switchColor.500", // Apply the custom color to the checked state
        },
      },
    },
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
    p: "'Poppins', sans-serif",
    mono: "'Poppins', monospace",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: "'Poppins', sans-serif",
      },
      html: {
        fontFamily: "'Poppins', sans-serif",
      },
      h1: {
        fontFamily: "heading",
        fontWeight: "semibold",
      },
      p: {
        fontFamily: "body",
        fontWeight: "medium",
      },
    }),
  },
  components: {
    Input: {
      baseStyle: {
        fontWeight: "semibold", // Set the default fontWeight for Input component globally
      },
    },
  },
};
