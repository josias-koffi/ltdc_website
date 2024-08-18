import {createTheme} from "@mui/material/styles";

export const themeOptions: any = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#642775",
        },
        secondary: {
            main: "#EDA26B",
        },
    },
    typography: {
        fontFamily: ["Montserrat"].join(",")
    },
});
