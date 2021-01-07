const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
    ],
};

const purgecss = require("@fullhuman/postcss-purgecss")({
    content: [
        "./src/**/*.html",
        "./src/**/*.vue",
        "./src/**/*.jsx",
        "./src/**/*.js",
    ],
});
module.exports = {
    plugins: [
        require("tailwindcss"),
        require("autoprefixer")
        , ...(process.env.NODE_ENV == "production" ? [purgecss] : []),],
};