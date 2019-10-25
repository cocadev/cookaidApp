//////////////////// CONFIG APP

const isStandAloneApp = "standalone";

const ConfigApp = {

  // backend url
  URL: "/",


  //facebook page url
  FACEBOOK: "",

  SKYPE: "",

  WEB: "",

  EMAIL: "",

  // banner admob unit id, Replace with your-admob-unit-id
  BANNER_ID: "",



  // testdevice id, DON'T CHANGE IT
  TESTDEVICE_ID: isStandAloneApp ? "EMULATOR" : "EMULATOR",
  SPOONACULAR_API_URL: "",
  SPOONACULAR_API_KEY: "",
  //SPOONACULAR_API_KEY: "",
  HOME_MAX_RANDOM_RECIPES: 600,
};

export default ConfigApp;
