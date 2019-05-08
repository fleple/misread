const white = 'rgb(243,243,243)';
const black = 'rgb(30,30,30)';
const gray = '#cccccc';
const greyBright = 'rgba(255, 255, 255, 0.2)';
const switcherThemeDark = '#ccc';
const switcherThemeLight = '#eee';

const lightTheme = {
  color: black,
  bg: white,
  theadBg: gray,
  borderColor: gray,
  switcher: switcherThemeDark
};

const darkTheme = {
  color: white,
  bg: black,
  theadBg: greyBright,
  borderColor: greyBright,
  switcher: switcherThemeLight
};

export default () => {
  let theme = darkTheme;
  const rootStyle = document.documentElement.style;
  if(rootStyle.getPropertyValue('--bg') === white) {
    theme = darkTheme;
    localStorage.misreadTheme = 'dark';
  } else {
    theme = lightTheme;
    localStorage.misreadTheme = 'light';
  }

  Object.keys(theme).forEach(prop => {
    rootStyle.setProperty(`--${prop}`, theme[prop]);  
  });
}