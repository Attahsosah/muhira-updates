/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-img":
          "url('https://cdn.discordapp.com/attachments/817048198022430761/1166252141632028672/pexels-photomix-company-101808.jpg?ex=6549cff2&is=65375af2&hm=9e03ec3a397f40bc619e2d43093582e7c14eb2c27160c9d08deabc82038eda26&')",

        "hero-img-2":
          "url('https://cdn.discordapp.com/attachments/817048198022430761/1179328166871965756/handshake-4011419_1280.jpg?ex=657961f1&is=6566ecf1&hm=4ed898c4356bb76132f9ba0c38fb936d8ad8bbd90b79530d19bc84af12abfd32&')",
      },
    },
  },
  plugins: [],
};
