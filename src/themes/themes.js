// Exemplo de uso:
//  color: theme.colors.details,


const theme = {
  colors: {
    // tons de amarelos
    bgYellowPrimary: "##FCD562",
    bgYellowSecondary: "#f5c330",
    bgYellowTertiary: "#f5c330",
    bgYellowGolden: "#f5c330",

    //cores complementares
    textOne: "#150f02",
    textTwo: "#f7f5f5",
    details: "#757575",
    detailsTwo: "#E9E9E9",

    // ERROS/AVISO/CONFIRMAÇÃO

    // ERRO
    msgErro: "#A92525",
    containerError: "rgba(251, 80, 80, 0.25)",

    // Confirmação
    msgConfirmation: "#307555",
    containerConfirmation: "rgba(76, 187, 136, 0.5)",

    // Aviso
    notice: "#FB7950",
  },
  fonts: {
    small: 10,
    medium: 16,
    large: 20,
    extraLarge: 24,
    bold: "700",
    regular: "400",
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  },
  radii: {
    small: 5,
    medium: 10,
    large: 20,
  },
};

export default theme;
