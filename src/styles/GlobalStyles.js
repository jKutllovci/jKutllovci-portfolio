import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background-color: #272828;  /* Updated dark color */
    color: #ffffff;
  }

  h1, h2, h3, h4, h5, h6 {
    color: white;  /* Updated green color */
  }

  p {
    color: #c5c6c7;
  }

  a {
    color: #2F9F84;
    text-decoration: none;
  }

  .container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  header, section {
    background: rgba(39, 43, 41, 0.9);  /* Updated semi-transparent dark background */
    padding: 20px;
    margin: 20px auto;
    border-radius: 10px;
    max-width: 1000px;
    width: 100%;
  }
`;

export default GlobalStyles;
