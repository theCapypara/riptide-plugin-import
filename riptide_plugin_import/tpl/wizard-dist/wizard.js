var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
const import_meta = {};
var style = "";
const getSingletonElementInstance = (tag, parentElement = document.body) => {
  let el = document.querySelector(tag);
  if (el) {
    return el;
  }
  el = document.createElement(tag);
  return parentElement.insertBefore(el, parentElement.firstChild);
};
const getSharedResourcesInstance = () => getSingletonElementInstance("ui5-shared-resources", document.head);
const getSharedResource = (namespace, initialValue) => {
  const parts = namespace.split(".");
  let current = getSharedResourcesInstance();
  for (let i2 = 0; i2 < parts.length; i2++) {
    const part = parts[i2];
    const lastPart = i2 === parts.length - 1;
    if (!Object.prototype.hasOwnProperty.call(current, part)) {
      current[part] = lastPart ? initialValue : {};
    }
    current = current[part];
  }
  return current;
};
const IconCollectionsAlias = {
  "SAP-icons-TNT": "tnt",
  "BusinessSuiteInAppSymbols": "business-suite",
  "horizon": "SAP-icons-v5"
};
var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};
var oToken = Object.create(null);
var fnMerge$1 = function() {
  var src, copyIsArray, copy, name2, options, clone, target = arguments[2] || {}, i2 = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? void 0 : oToken;
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i2 < length; i2++) {
    if ((options = arguments[i2]) != null) {
      for (name2 in options) {
        src = target[name2];
        copy = options[name2];
        if (name2 === "__proto__" || target === copy) {
          continue;
        }
        if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && fnIsPlainObject(src) ? src : {};
          }
          target[name2] = fnMerge$1(deep, arguments[1], clone, copy);
        } else if (copy !== skipToken) {
          target[name2] = copy;
        }
      }
    }
  }
  return target;
};
var fnMerge = function() {
  var args = [
    true,
    false
  ];
  args.push.apply(args, arguments);
  return fnMerge$1.apply(null, args);
};
const features = new Map();
const getFeature = (name2) => {
  return features.get(name2);
};
const assetParameters = { "themes": { "default": "sap_fiori_3", "all": ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_exp"] }, "languages": { "default": "en", "all": ["ar", "bg", "ca", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, "locales": { "default": "en", "all": ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } };
const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
let initialized = false;
let initialConfig = {
  animationMode: "full",
  theme: DEFAULT_THEME,
  rtl: null,
  language: null,
  calendarType: null,
  noConflict: false,
  formatSettings: {},
  fetchDefaultLanguage: false
};
const getTheme$1 = () => {
  initConfiguration();
  return initialConfig.theme;
};
const getRTL$1 = () => {
  initConfiguration();
  return initialConfig.rtl;
};
const getLanguage$1 = () => {
  initConfiguration();
  return initialConfig.language;
};
const getFetchDefaultLanguage$1 = () => {
  initConfiguration();
  return initialConfig.fetchDefaultLanguage;
};
const getNoConflict$1 = () => {
  initConfiguration();
  return initialConfig.noConflict;
};
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
const parseConfigurationScript = () => {
  const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
  let configJSON;
  if (configScript) {
    try {
      configJSON = JSON.parse(configScript.innerHTML);
    } catch (err) {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
    }
    if (configJSON) {
      initialConfig = fnMerge(initialConfig, configJSON);
    }
  }
};
const parseURLParameters = () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    const parts = key.split("sap-").length;
    if (parts === 0 || parts === key.split("sap-ui-").length) {
      return;
    }
    applyURLParam(key, value, "sap");
  });
  params.forEach((value, key) => {
    if (!key.startsWith("sap-ui")) {
      return;
    }
    applyURLParam(key, value, "sap-ui");
  });
};
const normalizeParamValue = (param, value) => {
  if (param === "theme" && value.includes("@")) {
    return value.split("@")[0];
  }
  return value;
};
const applyURLParam = (key, value, paramType) => {
  const lowerCaseValue = value.toLowerCase();
  const param = key.split(`${paramType}-`)[1];
  if (booleanMapping.has(value)) {
    value = booleanMapping.get(lowerCaseValue);
  }
  value = normalizeParamValue(param, value);
  initialConfig[param] = value;
};
const applyOpenUI5Configuration = () => {
  const OpenUI5Support = getFeature("OpenUI5Support");
  if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
    return;
  }
  const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
  initialConfig = fnMerge(initialConfig, OpenUI5Config);
};
const initConfiguration = () => {
  if (initialized) {
    return;
  }
  parseConfigurationScript();
  parseURLParameters();
  applyOpenUI5Configuration();
  initialized = true;
};
class EventProvider {
  constructor() {
    this._eventRegistry = new Map();
  }
  attachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!Array.isArray(eventListeners)) {
      eventRegistry.set(eventName, [fnFunction]);
      return;
    }
    if (!eventListeners.includes(fnFunction)) {
      eventListeners.push(fnFunction);
    }
  }
  detachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return;
    }
    const indexOfFnToDetach = eventListeners.indexOf(fnFunction);
    if (indexOfFnToDetach !== -1) {
      eventListeners.splice(indexOfFnToDetach, 1);
    }
    if (eventListeners.length === 0) {
      eventRegistry.delete(eventName);
    }
  }
  fireEvent(eventName, data) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return [];
    }
    return eventListeners.map((fn) => {
      return fn.call(this, data);
    });
  }
  fireEventAsync(eventName, data) {
    return Promise.all(this.fireEvent(eventName, data));
  }
  isHandlerAttached(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return false;
    }
    return eventListeners.includes(fnFunction);
  }
  hasListeners(eventName) {
    return !!this._eventRegistry.get(eventName);
  }
}
const MAX_PROCESS_COUNT = 10;
class RenderQueue {
  constructor() {
    this.list = [];
    this.lookup = new Set();
  }
  add(webComponent) {
    if (this.lookup.has(webComponent)) {
      return;
    }
    this.list.push(webComponent);
    this.lookup.add(webComponent);
  }
  remove(webComponent) {
    if (!this.lookup.has(webComponent)) {
      return;
    }
    this.list = this.list.filter((item) => item !== webComponent);
    this.lookup.delete(webComponent);
  }
  shift() {
    const webComponent = this.list.shift();
    if (webComponent) {
      this.lookup.delete(webComponent);
      return webComponent;
    }
  }
  isEmpty() {
    return this.list.length === 0;
  }
  isAdded(webComponent) {
    return this.lookup.has(webComponent);
  }
  process(callback) {
    let webComponent;
    const stats = new Map();
    webComponent = this.shift();
    while (webComponent) {
      const timesProcessed = stats.get(webComponent) || 0;
      if (timesProcessed > MAX_PROCESS_COUNT) {
        throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
      }
      callback(webComponent);
      stats.set(webComponent, timesProcessed + 1);
      webComponent = this.shift();
    }
  }
}
const setToArray = (s2) => {
  const arr = [];
  s2.forEach((item) => {
    arr.push(item);
  });
  return arr;
};
const VersionInfo = {
  version: "1.1.0",
  major: 1,
  minor: 1,
  patch: 0,
  suffix: "",
  isNext: false,
  buildTime: 1642786011
};
const metaUrl = import_meta.url;
let currentRuntimeIndex;
let currentRuntimeAlias = "";
const compareCache = new Map();
const Runtimes = getSharedResource("Runtimes", []);
const registerCurrentRuntime = () => {
  if (currentRuntimeIndex === void 0) {
    currentRuntimeIndex = Runtimes.length;
    Runtimes.push(__spreadProps(__spreadValues({}, VersionInfo), {
      url: metaUrl,
      alias: currentRuntimeAlias,
      description: `Runtime ${currentRuntimeIndex} - ver ${VersionInfo.version}${""}`
    }));
  }
};
const getCurrentRuntimeIndex = () => {
  return currentRuntimeIndex;
};
const compareRuntimes = (index1, index2) => {
  const cacheIndex = `${index1},${index2}`;
  if (compareCache.has(cacheIndex)) {
    return compareCache.get(cacheIndex);
  }
  const runtime1 = Runtimes[index1];
  const runtime2 = Runtimes[index2];
  if (!runtime1 || !runtime2) {
    throw new Error("Invalid runtime index supplied");
  }
  if (runtime1.isNext || runtime2.isNext) {
    return runtime1.buildTime - runtime2.buildTime;
  }
  const majorDiff = runtime1.major - runtime2.major;
  if (majorDiff) {
    return majorDiff;
  }
  const minorDiff = runtime1.minor - runtime2.minor;
  if (minorDiff) {
    return minorDiff;
  }
  const patchDiff = runtime1.patch - runtime2.patch;
  if (patchDiff) {
    return patchDiff;
  }
  const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
  const result = collator.compare(runtime1.suffix, runtime2.suffix);
  compareCache.set(cacheIndex, result);
  return result;
};
const getAllRuntimes = () => {
  return Runtimes;
};
const Tags = getSharedResource("Tags", new Map());
const Definitions = new Set();
let Failures = {};
let failureTimeout;
const UNKNOWN_RUNTIME = "unknown";
const registerTag = (tag) => {
  Definitions.add(tag);
  Tags.set(tag, getCurrentRuntimeIndex());
};
const isTagRegistered = (tag) => {
  return Definitions.has(tag);
};
const getAllRegisteredTags = () => {
  return setToArray(Definitions);
};
const recordTagRegistrationFailure = (tag) => {
  let tagRegRuntimeIndex = Tags.get(tag);
  if (tagRegRuntimeIndex === void 0) {
    tagRegRuntimeIndex = UNKNOWN_RUNTIME;
  }
  Failures[tagRegRuntimeIndex] = Failures[tagRegRuntimeIndex] || new Set();
  Failures[tagRegRuntimeIndex].add(tag);
  if (!failureTimeout) {
    failureTimeout = setTimeout(() => {
      displayFailedRegistrations();
      Failures = {};
      failureTimeout = void 0;
    }, 1e3);
  }
};
const displayFailedRegistrations = () => {
  const allRuntimes = getAllRuntimes();
  const currentRuntimeIndex2 = getCurrentRuntimeIndex();
  const currentRuntime = allRuntimes[currentRuntimeIndex2];
  let message = `Multiple UI5 Web Components instances detected.`;
  if (allRuntimes.length > 1) {
    message = `${message}
Loading order (versions before 1.1.0 not listed): ${allRuntimes.map((runtime) => `
${runtime.description} ${runtime.url}`).join("")}`;
  }
  Object.keys(Failures).forEach((otherRuntimeIndex) => {
    let comparison;
    let otherRuntime;
    if (otherRuntimeIndex === UNKNOWN_RUNTIME) {
      comparison = 1;
      otherRuntime = {
        description: `Older unknown runtime`
      };
    } else {
      comparison = compareRuntimes(currentRuntimeIndex2, otherRuntimeIndex);
      otherRuntime = allRuntimes[otherRuntimeIndex];
    }
    let compareWord;
    if (comparison > 0) {
      compareWord = "an older";
    } else if (comparison < 0) {
      compareWord = "a newer";
    } else {
      compareWord = "the same";
    }
    message = `${message}

"${currentRuntime.description}" failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`;
    if (comparison > 0) {
      message = `${message}
WARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
    } else {
      message = `${message}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
    }
  });
  message = `${message}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/2-advanced/03-scoping.md.`;
  console.warn(message);
};
const rtlAwareSet = new Set();
const markAsRtlAware = (klass) => {
  rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
  return rtlAwareSet.has(klass);
};
const registeredElements = new Set();
const eventProvider$4 = new EventProvider();
const invalidatedWebComponents = new RenderQueue();
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
const renderDeferred = async (webComponent) => {
  invalidatedWebComponents.add(webComponent);
  await scheduleRenderTask();
};
const renderImmediately = (webComponent) => {
  eventProvider$4.fireEvent("beforeComponentRender", webComponent);
  registeredElements.add(webComponent);
  webComponent._render();
};
const cancelRender = (webComponent) => {
  invalidatedWebComponents.remove(webComponent);
  registeredElements.delete(webComponent);
};
const scheduleRenderTask = async () => {
  if (!queuePromise) {
    queuePromise = new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        invalidatedWebComponents.process(renderImmediately);
        queuePromise = null;
        resolve();
        if (!mutationObserverTimer) {
          mutationObserverTimer = setTimeout(() => {
            mutationObserverTimer = void 0;
            if (invalidatedWebComponents.isEmpty()) {
              _resolveTaskPromise();
            }
          }, 200);
        }
      });
    });
  }
  await queuePromise;
};
const whenDOMUpdated = () => {
  if (renderTaskPromise) {
    return renderTaskPromise;
  }
  renderTaskPromise = new Promise((resolve) => {
    renderTaskPromiseResolve = resolve;
    window.requestAnimationFrame(() => {
      if (invalidatedWebComponents.isEmpty()) {
        renderTaskPromise = void 0;
        resolve();
      }
    });
  });
  return renderTaskPromise;
};
const whenAllCustomElementsAreDefined = () => {
  const definedPromises = getAllRegisteredTags().map((tag) => customElements.whenDefined(tag));
  return Promise.all(definedPromises);
};
const renderFinished = async () => {
  await whenAllCustomElementsAreDefined();
  await whenDOMUpdated();
};
const _resolveTaskPromise = () => {
  if (!invalidatedWebComponents.isEmpty()) {
    return;
  }
  if (renderTaskPromiseResolve) {
    renderTaskPromiseResolve();
    renderTaskPromiseResolve = void 0;
    renderTaskPromise = void 0;
  }
};
const reRenderAllUI5Elements = async (filters) => {
  registeredElements.forEach((element) => {
    const tag = element.constructor.getMetadata().getTag();
    const rtlAware = isRtlAware(element.constructor);
    const languageAware = element.constructor.getMetadata().isLanguageAware();
    const themeAware = element.constructor.getMetadata().isThemeAware();
    if (!filters || filters.tag === tag || filters.rtlAware && rtlAware || filters.languageAware && languageAware || filters.themeAware && themeAware) {
      renderDeferred(element);
    }
  });
  await renderFinished();
};
const themeStyles = new Map();
const loaders$2 = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const registerThemePropertiesLoader = (packageName2, themeName, loader) => {
  loaders$2.set(`${packageName2}/${themeName}`, loader);
  registeredPackages.add(packageName2);
  registeredThemes.add(themeName);
};
const getThemeProperties = async (packageName2, themeName) => {
  const style2 = themeStyles.get(`${packageName2}_${themeName}`);
  if (style2 !== void 0) {
    return style2;
  }
  if (!registeredThemes.has(themeName)) {
    const regThemesStr = [...registeredThemes.values()].join(", ");
    console.warn(`You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`);
    return themeStyles.get(`${packageName2}_${DEFAULT_THEME}`);
  }
  const loader = loaders$2.get(`${packageName2}/${themeName}`);
  if (!loader) {
    console.error(`Theme [${themeName}] not registered for package [${packageName2}]`);
    return;
  }
  let data;
  try {
    data = await loader(themeName);
  } catch (e2) {
    console.error(packageName2, e2.message);
    return;
  }
  const themeProps = data._ || data;
  themeStyles.set(`${packageName2}_${themeName}`, themeProps);
  return themeProps;
};
const getRegisteredPackages = () => {
  return registeredPackages;
};
const isThemeRegistered = (theme2) => {
  return registeredThemes.has(theme2);
};
const createStyleInHead = (cssText, attributes = {}) => {
  const style2 = document.createElement("style");
  style2.type = "text/css";
  Object.entries(attributes).forEach((pair) => style2.setAttribute(...pair));
  style2.textContent = cssText;
  document.head.appendChild(style2);
  return style2;
};
const getStyleId = (name2, value) => {
  return value ? `${name2}|${value}` : name2;
};
const createStyle = (data, name2, value = "") => {
  const content = typeof data === "string" ? data : data.content;
  if (document.adoptedStyleSheets) {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(content);
    stylesheet._ui5StyleId = getStyleId(name2, value);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  } else {
    const attributes = {};
    attributes[name2] = value;
    createStyleInHead(content, attributes);
  }
};
const updateStyle = (data, name2, value = "") => {
  const content = typeof data === "string" ? data : data.content;
  if (document.adoptedStyleSheets) {
    document.adoptedStyleSheets.find((sh) => sh._ui5StyleId === getStyleId(name2, value)).replaceSync(content || "");
  } else {
    document.querySelector(`head>style[${name2}="${value}"]`).textContent = content || "";
  }
};
const hasStyle = (name2, value = "") => {
  if (document.adoptedStyleSheets) {
    return !!document.adoptedStyleSheets.find((sh) => sh._ui5StyleId === getStyleId(name2, value));
  }
  return !!document.querySelector(`head>style[${name2}="${value}"]`);
};
const removeStyle = (name2, value = "") => {
  if (document.adoptedStyleSheets) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((sh) => sh._ui5StyleId !== getStyleId(name2, value));
  } else {
    const styleElement = document.querySelector(`head > style[${name2}="${value}"]`);
    if (styleElement) {
      styleElement.parentElement.removeChild(styleElement);
    }
  }
};
const createOrUpdateStyle = (data, name2, value = "") => {
  if (hasStyle(name2, value)) {
    updateStyle(data, name2, value);
  } else {
    createStyle(data, name2, value);
  }
};
const warnings = new Set();
const getThemeMetadata = () => {
  let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
  if (el) {
    return getComputedStyle(el).backgroundImage;
  }
  el = document.createElement("span");
  el.style.display = "none";
  el.classList.add("sapThemeMetaData-Base-baseLib");
  document.body.appendChild(el);
  let metadata2 = getComputedStyle(el).backgroundImage;
  if (metadata2 === "none") {
    el.classList.add("sapThemeMetaData-UI5-sap-ui-core");
    metadata2 = getComputedStyle(el).backgroundImage;
  }
  document.body.removeChild(el);
  return metadata2;
};
const parseThemeMetadata = (metadataString) => {
  const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
  if (params && params.length >= 2) {
    let paramsString = params[1];
    paramsString = paramsString.replace(/\\"/g, `"`);
    if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
      try {
        paramsString = decodeURIComponent(paramsString);
      } catch (ex) {
        if (!warnings.has("decode")) {
          console.warn("Malformed theme metadata string, unable to decodeURIComponent");
          warnings.add("decode");
        }
        return;
      }
    }
    try {
      return JSON.parse(paramsString);
    } catch (ex) {
      if (!warnings.has("parse")) {
        console.warn("Malformed theme metadata string, unable to parse JSON");
        warnings.add("parse");
      }
    }
  }
};
const processThemeMetadata = (metadata2) => {
  let themeName;
  let baseThemeName;
  try {
    themeName = metadata2.Path.match(/\.([^.]+)\.css_variables$/)[1];
    baseThemeName = metadata2.Extends[0];
  } catch (ex) {
    if (!warnings.has("object")) {
      console.warn("Malformed theme metadata Object", metadata2);
      warnings.add("object");
    }
    return;
  }
  return {
    themeName,
    baseThemeName
  };
};
const getThemeDesignerTheme = () => {
  const metadataString = getThemeMetadata();
  if (!metadataString || metadataString === "none") {
    return;
  }
  const metadata2 = parseThemeMetadata(metadataString);
  return processThemeMetadata(metadata2);
};
const eventProvider$3 = new EventProvider();
const THEME_LOADED = "themeLoaded";
const fireThemeLoaded = (theme2) => {
  return eventProvider$3.fireEvent(THEME_LOADED, theme2);
};
const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";
const isThemeBaseRegistered = () => {
  const registeredPackages2 = getRegisteredPackages();
  return registeredPackages2.has(BASE_THEME_PACKAGE);
};
const loadThemeBase = async (theme2) => {
  if (!isThemeBaseRegistered()) {
    return;
  }
  const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme2);
  if (cssData) {
    createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
  }
};
const deleteThemeBase = () => {
  removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};
const loadComponentPackages = async (theme2) => {
  const registeredPackages2 = getRegisteredPackages();
  registeredPackages2.forEach(async (packageName2) => {
    if (packageName2 === BASE_THEME_PACKAGE) {
      return;
    }
    const cssData = await getThemeProperties(packageName2, theme2);
    if (cssData) {
      createOrUpdateStyle(cssData, "data-ui5-theme-properties", packageName2);
    }
  });
};
const detectExternalTheme = () => {
  const extTheme = getThemeDesignerTheme();
  if (extTheme) {
    return extTheme;
  }
  const OpenUI5Support = getFeature("OpenUI5Support");
  if (OpenUI5Support) {
    const varsLoaded = OpenUI5Support.cssVariablesLoaded();
    if (varsLoaded) {
      return {
        themeName: OpenUI5Support.getConfigurationSettingsObject().theme
      };
    }
  }
};
const applyTheme = async (theme2) => {
  const extTheme = detectExternalTheme();
  if (!extTheme || theme2 !== extTheme.themeName) {
    await loadThemeBase(theme2);
  } else {
    deleteThemeBase();
  }
  const packagesTheme = isThemeRegistered(theme2) ? theme2 : extTheme && extTheme.baseThemeName;
  await loadComponentPackages(packagesTheme);
  fireThemeLoaded(theme2);
};
let theme;
const getTheme = () => {
  if (theme === void 0) {
    theme = getTheme$1();
  }
  return theme;
};
const isTheme = (_theme) => {
  const currentTheme = getTheme();
  return currentTheme === _theme || currentTheme === `${_theme}_exp`;
};
const loaders$1 = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());
const ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";
const registerIconLoader = async (collectionName, loader) => {
  loaders$1.set(collectionName, loader);
};
const _loadIconCollectionOnce = async (collectionName) => {
  if (!iconCollectionPromises.has(collectionName)) {
    if (!loaders$1.has(collectionName)) {
      throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
    }
    const loadIcons = loaders$1.get(collectionName);
    iconCollectionPromises.set(collectionName, loadIcons(collectionName));
  }
  return iconCollectionPromises.get(collectionName);
};
const _fillRegistry = (bundleData2) => {
  Object.keys(bundleData2.data).forEach((iconName) => {
    const iconData = bundleData2.data[iconName];
    registerIcon(iconName, {
      pathData: iconData.path,
      ltr: iconData.ltr,
      accData: iconData.acc,
      collection: bundleData2.collection,
      packageName: bundleData2.packageName
    });
  });
};
const registerIcon = (name2, { pathData: pathData2, ltr: ltr2, accData: accData2, collection: collection2, packageName: packageName2 } = {}) => {
  if (!collection2) {
    collection2 = _getDefaultCollection();
  }
  const key = `${collection2}/${name2}`;
  registry.set(key, {
    pathData: pathData2,
    ltr: ltr2,
    accData: accData2,
    packageName: packageName2
  });
};
const _parseName = (name2) => {
  if (name2.startsWith("sap-icon://")) {
    name2 = name2.replace("sap-icon://", "");
  }
  let collection2;
  [name2, collection2] = name2.split("/").reverse();
  collection2 = collection2 || _getDefaultCollection();
  collection2 = _normalizeCollection(collection2);
  name2 = name2.replace("icon-", "");
  const registryKey = `${collection2}/${name2}`;
  return { name: name2, collection: collection2, registryKey };
};
const getIconDataSync = (nameProp) => {
  const { registryKey } = _parseName(nameProp);
  return registry.get(registryKey);
};
const getIconData = async (nameProp) => {
  const { collection: collection2, registryKey } = _parseName(nameProp);
  let iconData = ICON_NOT_FOUND$1;
  try {
    iconData = await _loadIconCollectionOnce(collection2);
  } catch (e2) {
    console.error(e2.message);
  }
  if (iconData === ICON_NOT_FOUND$1) {
    return iconData;
  }
  if (!registry.has(registryKey)) {
    _fillRegistry(iconData);
  }
  return registry.get(registryKey);
};
const _getDefaultCollection = () => {
  return isTheme("sap_horizon") ? "SAP-icons-v5" : "SAP-icons";
};
const _normalizeCollection = (collectionName) => {
  if (IconCollectionsAlias[collectionName]) {
    return IconCollectionsAlias[collectionName];
  }
  return collectionName;
};
const loadIconsBundle = async (collection2) => {
  let iconData = null;
  if (collection2 === "SAP-icons-v5") {
    iconData = (await import("./SAP-icons.js")).default;
  } else {
    iconData = (await import("./SAP-icons2.js")).default;
  }
  if (typeof iconData === "string" && iconData.endsWith(".json")) {
    throw new Error('[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import "@ui5/webcomponents-icons/dist/Assets-static.js". Check the "Assets" documentation for more information.');
  }
  return iconData;
};
const registerLoaders = () => {
  registerIconLoader("SAP-icons", loadIconsBundle);
  registerIconLoader("SAP-icons-v5", loadIconsBundle);
};
registerLoaders();
const whenDOMReady = () => {
  return new Promise((resolve) => {
    if (document.body) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    }
  });
};
var fontFaceCSS = {
  packageName: "@ui5/webcomponents-base",
  fileName: "FontFace.css",
  content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:local("72"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:local('72-full'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72";font-style:normal;font-weight:700;src:local('72-Bold'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:local('72-Bold-full'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:local('72Black'),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff?ui5-webcomponents) format("woff")}`
};
var overrideFontFaceCSS = {
  packageName: "@ui5/webcomponents-base",
  fileName: "OverrideFontFace.css",
  content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`
};
const insertFontFace = () => {
  const OpenUI5Support = getFeature("OpenUI5Support");
  if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
    insertMainFontFace();
  }
  insertOverrideFontFace();
};
const insertMainFontFace = () => {
  if (!hasStyle("data-ui5-font-face")) {
    createStyle(fontFaceCSS, "data-ui5-font-face");
  }
};
const insertOverrideFontFace = () => {
  if (!hasStyle("data-ui5-font-face-override")) {
    createStyle(overrideFontFaceCSS, "data-ui5-font-face-override");
  }
};
var systemCSSVars = {
  packageName: "@ui5/webcomponents-base",
  fileName: "SystemCSSVars.css",
  content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`
};
const insertSystemCSSVars = () => {
  if (!hasStyle("data-ui5-system-css-vars")) {
    createStyle(systemCSSVars, "data-ui5-system-css-vars");
  }
};
let bootPromise;
const eventProvider$2 = new EventProvider();
const boot = async () => {
  if (bootPromise) {
    return bootPromise;
  }
  bootPromise = new Promise(async (resolve) => {
    registerCurrentRuntime();
    const OpenUI5Support = getFeature("OpenUI5Support");
    const F6Navigation = getFeature("F6Navigation");
    if (OpenUI5Support) {
      await OpenUI5Support.init();
    } else if (F6Navigation) {
      F6Navigation.init();
    }
    await whenDOMReady();
    await applyTheme(getTheme());
    OpenUI5Support && OpenUI5Support.attachListeners();
    insertFontFace();
    insertSystemCSSVars();
    await eventProvider$2.fireEventAsync("boot");
    resolve();
  });
  return bootPromise;
};
class DataType {
  static isValid(value) {
  }
  static attributeToProperty(attributeValue) {
    return attributeValue;
  }
  static propertyToAttribute(propertyValue) {
    return `${propertyValue}`;
  }
  static valuesAreEqual(value1, value2) {
    return value1 === value2;
  }
  static generateTypeAccessors(types) {
    Object.keys(types).forEach((type) => {
      Object.defineProperty(this, type, {
        get() {
          return types[type];
        }
      });
    });
  }
}
const isDescendantOf = (klass, baseKlass, inclusive = false) => {
  if (typeof klass !== "function" || typeof baseKlass !== "function") {
    return false;
  }
  if (inclusive && klass === baseKlass) {
    return true;
  }
  let parent = klass;
  do {
    parent = Object.getPrototypeOf(parent);
  } while (parent !== null && parent !== baseKlass);
  return parent === baseKlass;
};
const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();
const kebabToCamelCase = (string) => {
  if (!kebabToCamelMap.has(string)) {
    const result = toCamelCase(string.split("-"));
    kebabToCamelMap.set(string, result);
  }
  return kebabToCamelMap.get(string);
};
const camelToKebabCase = (string) => {
  if (!camelToKebabMap.has(string)) {
    const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    camelToKebabMap.set(string, result);
  }
  return camelToKebabMap.get(string);
};
const toCamelCase = (parts) => {
  return parts.map((string, index) => {
    return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }).join("");
};
const getSlotName = (node) => {
  if (!(node instanceof HTMLElement)) {
    return "default";
  }
  const slot = node.getAttribute("slot");
  if (slot) {
    const match = slot.match(/^(.+?)-\d+$/);
    return match ? match[1] : slot;
  }
  return "default";
};
const isSlot = (el) => el && el instanceof HTMLElement && el.localName === "slot";
const getSlottedElements = (el) => {
  if (isSlot(el)) {
    return el.assignedNodes({ flatten: true }).filter((item) => item instanceof HTMLElement);
  }
  return [el];
};
const getSlottedElementsList = (elList) => {
  const reducer = (acc, curr) => acc.concat(getSlottedElements(curr));
  return elList.reduce(reducer, []);
};
let suf;
let rulesObj = {
  include: [/^ui5-/],
  exclude: []
};
const tagsCache = new Map();
const getCustomElementsScopingSuffix = () => {
  return suf;
};
const shouldScopeCustomElement = (tag) => {
  if (!tagsCache.has(tag)) {
    const result = rulesObj.include.some((rule) => tag.match(rule)) && !rulesObj.exclude.some((rule) => tag.match(rule));
    tagsCache.set(tag, result);
  }
  return tagsCache.get(tag);
};
const getEffectiveScopingSuffixForTag = (tag) => {
  if (shouldScopeCustomElement(tag)) {
    return getCustomElementsScopingSuffix();
  }
};
class UI5ElementMetadata {
  constructor(metadata2) {
    this.metadata = metadata2;
  }
  getInitialState() {
    if (Object.prototype.hasOwnProperty.call(this, "_initialState")) {
      return this._initialState;
    }
    const initialState = {};
    const slotsAreManaged = this.slotsAreManaged();
    const props = this.getProperties();
    for (const propName in props) {
      const propType = props[propName].type;
      const propDefaultValue = props[propName].defaultValue;
      if (propType === Boolean) {
        initialState[propName] = false;
        if (propDefaultValue !== void 0) {
          console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default");
        }
      } else if (props[propName].multiple) {
        initialState[propName] = [];
      } else if (propType === Object) {
        initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
      } else if (propType === String) {
        initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
      } else {
        initialState[propName] = propDefaultValue;
      }
    }
    if (slotsAreManaged) {
      const slots = this.getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        const propertyName = slotData.propertyName || slotName;
        initialState[propertyName] = [];
      }
    }
    this._initialState = initialState;
    return initialState;
  }
  static validatePropertyValue(value, propData) {
    const isMultiple = propData.multiple;
    if (isMultiple) {
      return value.map((propValue) => validateSingleProperty(propValue, propData));
    }
    return validateSingleProperty(value, propData);
  }
  static validateSlotValue(value, slotData) {
    return validateSingleSlot(value, slotData);
  }
  getPureTag() {
    return this.metadata.tag;
  }
  getTag() {
    const pureTag = this.metadata.tag;
    const suffix = getEffectiveScopingSuffixForTag(pureTag);
    if (!suffix) {
      return pureTag;
    }
    return `${pureTag}-${suffix}`;
  }
  getAltTag() {
    const pureAltTag = this.metadata.altTag;
    if (!pureAltTag) {
      return;
    }
    const suffix = getEffectiveScopingSuffixForTag(pureAltTag);
    if (!suffix) {
      return pureAltTag;
    }
    return `${pureAltTag}-${suffix}`;
  }
  hasAttribute(propName) {
    const propData = this.getProperties()[propName];
    return propData.type !== Object && !propData.noAttribute && !propData.multiple;
  }
  getPropertiesList() {
    return Object.keys(this.getProperties());
  }
  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
  }
  getSlots() {
    return this.metadata.slots || {};
  }
  canSlotText() {
    const defaultSlot = this.getSlots().default;
    return defaultSlot && defaultSlot.type === Node;
  }
  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }
  hasIndividualSlots() {
    return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots);
  }
  slotsAreManaged() {
    return !!this.metadata.managedSlots;
  }
  supportsF6FastNavigation() {
    return !!this.metadata.fastNavigation;
  }
  getProperties() {
    return this.metadata.properties || {};
  }
  getEvents() {
    return this.metadata.events || {};
  }
  isLanguageAware() {
    return !!this.metadata.languageAware;
  }
  isThemeAware() {
    return !!this.metadata.themeAware;
  }
  shouldInvalidateOnChildChange(slotName, type, name2) {
    const config = this.getSlots()[slotName].invalidateOnChildChange;
    if (config === void 0) {
      return false;
    }
    if (typeof config === "boolean") {
      return config;
    }
    if (typeof config === "object") {
      if (type === "property") {
        if (config.properties === void 0) {
          return false;
        }
        if (typeof config.properties === "boolean") {
          return config.properties;
        }
        if (Array.isArray(config.properties)) {
          return config.properties.includes(name2);
        }
        throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
      }
      if (type === "slot") {
        if (config.slots === void 0) {
          return false;
        }
        if (typeof config.slots === "boolean") {
          return config.slots;
        }
        if (Array.isArray(config.slots)) {
          return config.slots.includes(name2);
        }
        throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
      }
    }
    throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
  }
}
const validateSingleProperty = (value, propData) => {
  const propertyType = propData.type;
  if (propertyType === Boolean) {
    return typeof value === "boolean" ? value : false;
  }
  if (propertyType === String) {
    return typeof value === "string" || typeof value === "undefined" || value === null ? value : value.toString();
  }
  if (propertyType === Object) {
    return typeof value === "object" ? value : propData.defaultValue;
  }
  if (isDescendantOf(propertyType, DataType)) {
    return propertyType.isValid(value) ? value : propData.defaultValue;
  }
};
const validateSingleSlot = (value, slotData) => {
  value && getSlottedElements(value).forEach((el) => {
    if (!(el instanceof slotData.type)) {
      throw new Error(`${el} is not of type ${slotData.type}`);
    }
  });
  return value;
};
if (!customElements.get("ui5-static-area")) {
  customElements.define("ui5-static-area", class extends HTMLElement {
  });
}
const executeTemplate = (template, component) => {
  const tagsToScope = component.constructor.getUniqueDependencies().map((dep) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);
  const scope = getCustomElementsScopingSuffix();
  return template(component, tagsToScope, scope);
};
const eventProvider$1 = getSharedResource("CustomStyle.eventProvider", new EventProvider());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";
const attachCustomCSSChange = (listener) => {
  eventProvider$1.attachEvent(CUSTOM_CSS_CHANGE, listener);
};
const customCSSFor = getSharedResource("CustomStyle.customCSSFor", {});
attachCustomCSSChange((tag) => {
  {
    reRenderAllUI5Elements({ tag });
  }
});
const getCustomCSS = (tag) => {
  return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};
const getStylesString = (styles2) => {
  if (Array.isArray(styles2)) {
    return flatten(styles2.filter((style2) => !!style2)).map((style2) => {
      return typeof style2 === "string" ? style2 : style2.content;
    }).join(" ");
  }
  return typeof styles2 === "string" ? styles2 : styles2.content;
};
const flatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};
const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
  effectiveStyleMap.delete(`${tag}_normal`);
});
const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
  const tag = ElementClass.getMetadata().getTag();
  const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
  if (!effectiveStyleMap.has(key)) {
    let effectiveStyle;
    if (forStaticArea) {
      effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
    } else {
      const customStyle = getCustomCSS(tag) || "";
      const builtInStyles = getStylesString(ElementClass.styles);
      effectiveStyle = `${builtInStyles} ${customStyle}`;
    }
    effectiveStyleMap.set(key, effectiveStyle);
  }
  return effectiveStyleMap.get(key);
};
const constructableStyleMap = new Map();
attachCustomCSSChange((tag) => {
  constructableStyleMap.delete(`${tag}_normal`);
});
const getConstructableStyle = (ElementClass, forStaticArea = false) => {
  const tag = ElementClass.getMetadata().getTag();
  const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
  if (!constructableStyleMap.has(key)) {
    const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
    const style2 = new CSSStyleSheet();
    style2.replaceSync(styleContent);
    constructableStyleMap.set(key, [style2]);
  }
  return constructableStyleMap.get(key);
};
const isLegacyBrowser = () => !!window.ShadyDOM;
const updateShadowRoot = (element, forStaticArea = false) => {
  let styleStrOrHrefsArr;
  const template = forStaticArea ? "staticAreaTemplate" : "template";
  const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
  const renderResult = executeTemplate(element.constructor[template], element);
  if (document.adoptedStyleSheets) {
    shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
  } else if (!isLegacyBrowser()) {
    styleStrOrHrefsArr = getEffectiveStyle(element.constructor, forStaticArea);
  }
  element.constructor.render(renderResult, shadowRoot, styleStrOrHrefsArr, { host: element });
};
const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const getEffectiveContentDensity = (el) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);
const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
  eventProvider.attachEvent(LANG_CHANGE, listener);
};
let language;
let fetchDefaultLanguage;
const getLanguage = () => {
  if (language === void 0) {
    language = getLanguage$1();
  }
  return language;
};
const setFetchDefaultLanguage = (fetchDefaultLang) => {
  fetchDefaultLanguage = fetchDefaultLang;
};
const getFetchDefaultLanguage = () => {
  if (fetchDefaultLanguage === void 0) {
    setFetchDefaultLanguage(getFetchDefaultLanguage$1());
  }
  return fetchDefaultLanguage;
};
var getDesigntimePropertyAsArray = (value) => {
  const m2 = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
  return m2 && m2[2] ? m2[2].split(/,/) : null;
};
var detectNavigatorLanguage = () => {
  const browserLanguages = navigator.languages;
  const navigatorLanguage = () => {
    return navigator.language;
  };
  const rawLocale = browserLanguages && browserLanguages[0] || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;
  return rawLocale || DEFAULT_LANGUAGE;
};
const M_ISO639_OLD_TO_NEW = {
  "iw": "he",
  "ji": "yi",
  "in": "id",
  "sh": "sr"
};
const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];
const impliesRTL = (language2) => {
  language2 = language2 && M_ISO639_OLD_TO_NEW[language2] || language2;
  return A_RTL_LOCALES.indexOf(language2) >= 0;
};
const getRTL = () => {
  const configurationRTL = getRTL$1();
  if (configurationRTL !== null) {
    return !!configurationRTL;
  }
  return impliesRTL(getLanguage() || detectNavigatorLanguage());
};
const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
const getEffectiveDir = (element) => {
  const doc = window.document;
  const dirValues = ["ltr", "rtl"];
  const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);
  if (dirValues.includes(locallyAppliedDir)) {
    return locallyAppliedDir;
  }
  if (dirValues.includes(element.dir)) {
    return element.dir;
  }
  if (dirValues.includes(doc.documentElement.dir)) {
    return doc.documentElement.dir;
  }
  if (dirValues.includes(doc.body.dir)) {
    return doc.body.dir;
  }
  return getRTL() ? "rtl" : void 0;
};
class StaticAreaItem extends HTMLElement {
  constructor() {
    super();
    this._rendered = false;
    this.attachShadow({ mode: "open" });
  }
  setOwnerElement(ownerElement) {
    this.ownerElement = ownerElement;
    this.classList.add(this.ownerElement._id);
    if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
      this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable"));
    }
  }
  update() {
    if (this._rendered) {
      this._updateContentDensity();
      this._updateDirection();
      updateShadowRoot(this.ownerElement, true);
    }
  }
  _updateContentDensity() {
    if (getEffectiveContentDensity(this.ownerElement) === "compact") {
      this.classList.add("sapUiSizeCompact");
      this.classList.add("ui5-content-density-compact");
    } else {
      this.classList.remove("sapUiSizeCompact");
      this.classList.remove("ui5-content-density-compact");
    }
  }
  _updateDirection() {
    const dir = getEffectiveDir(this.ownerElement);
    if (dir) {
      this.setAttribute("dir", dir);
    } else {
      this.removeAttribute("dir");
    }
  }
  async getDomRef() {
    this._updateContentDensity();
    if (!this._rendered) {
      this._rendered = true;
      updateShadowRoot(this.ownerElement, true);
    }
    await renderFinished();
    return this.shadowRoot;
  }
  static getTag() {
    const pureTag = "ui5-static-area-item";
    const suffix = getEffectiveScopingSuffixForTag(pureTag);
    if (!suffix) {
      return pureTag;
    }
    return `${pureTag}-${suffix}`;
  }
  static createInstance() {
    if (!customElements.get(StaticAreaItem.getTag())) {
      customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
    }
    return document.createElement(this.getTag());
  }
}
const observers = new WeakMap();
let _createObserver = (node, callback, options) => {
  const observer = new MutationObserver(callback);
  observer.observe(node, options);
  return observer;
};
let _destroyObserver = (observer) => {
  observer.disconnect();
};
const observeDOMNode = (node, callback, options) => {
  const observer = _createObserver(node, callback, options);
  observers.set(node, observer);
};
const unobserveDOMNode = (node) => {
  const observer = observers.get(node);
  if (observer) {
    _destroyObserver(observer);
    observers.delete(node);
  }
};
const excludeList = [
  "value-changed"
];
const shouldFireOriginalEvent = (eventName) => {
  return excludeList.includes(eventName);
};
let noConflict;
const shouldNotFireOriginalEvent = (eventName) => {
  const nc = getNoConflict();
  return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};
const getNoConflict = () => {
  if (noConflict === void 0) {
    noConflict = getNoConflict$1();
  }
  return noConflict;
};
const skipOriginalEvent = (eventName) => {
  const nc = getNoConflict();
  if (shouldFireOriginalEvent(eventName)) {
    return false;
  }
  if (nc === true) {
    return true;
  }
  return !shouldNotFireOriginalEvent(eventName);
};
const allowList = [
  "disabled",
  "title",
  "hidden",
  "role",
  "draggable"
];
const isValidPropertyName = (name2) => {
  if (allowList.includes(name2) || name2.startsWith("aria")) {
    return true;
  }
  const classes = [
    HTMLElement,
    Element,
    Node
  ];
  return !classes.some((klass) => klass.prototype.hasOwnProperty(name2));
};
const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i2 = 0; i2 < arr1.length; i2++) {
    if (arr1[i2] !== arr2[i2]) {
      return false;
    }
  }
  return true;
};
const getClassCopy = (klass, constructorCallback) => {
  return class classCopy extends klass {
    constructor() {
      super();
      constructorCallback && constructorCallback();
    }
  };
};
let autoId = 0;
const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();
function _invalidate(changeInfo) {
  if (this._suppressInvalidation) {
    return;
  }
  this.onInvalidation(changeInfo);
  this._changedState.push(changeInfo);
  renderDeferred(this);
  this._eventProvider.fireEvent("invalidate", __spreadProps(__spreadValues({}, changeInfo), { target: this }));
}
class UI5Element extends HTMLElement {
  constructor() {
    super();
    this._changedState = [];
    this._suppressInvalidation = true;
    this._inDOM = false;
    this._fullyConnected = false;
    this._childChangeListeners = new Map();
    this._slotChangeListeners = new Map();
    this._eventProvider = new EventProvider();
    let deferredResolve;
    this._domRefReadyPromise = new Promise((resolve) => {
      deferredResolve = resolve;
    });
    this._domRefReadyPromise._deferredResolve = deferredResolve;
    this._initializeState();
    this._upgradeAllProperties();
    if (this.constructor._needsShadowDOM()) {
      this.attachShadow({ mode: "open" });
    }
  }
  get _id() {
    if (!this.__id) {
      this.__id = `ui5wc_${++autoId}`;
    }
    return this.__id;
  }
  async connectedCallback() {
    this.setAttribute(this.constructor.getMetadata().getPureTag(), "");
    if (this.constructor.getMetadata().supportsF6FastNavigation()) {
      this.setAttribute("data-sap-ui-fastnavgroup", "true");
    }
    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = true;
    if (slotsAreManaged) {
      this._startObservingDOMChildren();
      await this._processChildren();
    }
    if (!this._inDOM) {
      return;
    }
    renderImmediately(this);
    this._domRefReadyPromise._deferredResolve();
    this._fullyConnected = true;
    if (typeof this.onEnterDOM === "function") {
      this.onEnterDOM();
    }
  }
  disconnectedCallback() {
    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = false;
    if (slotsAreManaged) {
      this._stopObservingDOMChildren();
    }
    if (this._fullyConnected) {
      if (typeof this.onExitDOM === "function") {
        this.onExitDOM();
      }
      this._fullyConnected = false;
    }
    if (this.staticAreaItem && this.staticAreaItem.parentElement) {
      this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
    }
    cancelRender(this);
  }
  _startObservingDOMChildren() {
    const shouldObserveChildren = this.constructor.getMetadata().hasSlots();
    if (!shouldObserveChildren) {
      return;
    }
    const canSlotText = this.constructor.getMetadata().canSlotText();
    const mutationObserverOptions = {
      childList: true,
      subtree: canSlotText,
      characterData: canSlotText
    };
    observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
  }
  _stopObservingDOMChildren() {
    unobserveDOMNode(this);
  }
  async _processChildren() {
    const hasSlots = this.constructor.getMetadata().hasSlots();
    if (hasSlots) {
      await this._updateSlots();
    }
  }
  async _updateSlots() {
    const slotsMap = this.constructor.getMetadata().getSlots();
    const canSlotText = this.constructor.getMetadata().canSlotText();
    const domChildren = Array.from(canSlotText ? this.childNodes : this.children);
    const slotsCachedContentMap = new Map();
    const propertyNameToSlotMap = new Map();
    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      const propertyName = slotData.propertyName || slotName;
      propertyNameToSlotMap.set(propertyName, slotName);
      slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
      this._clearSlot(slotName, slotData);
    }
    const autoIncrementMap = new Map();
    const slottedChildrenMap = new Map();
    const allChildrenUpgraded = domChildren.map(async (child, idx) => {
      const slotName = getSlotName(child);
      const slotData = slotsMap[slotName];
      if (slotData === void 0) {
        const validValues = Object.keys(slotsMap).join(", ");
        console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`);
        return;
      }
      if (slotData.individualSlots) {
        const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
        autoIncrementMap.set(slotName, nextIndex);
        child._individualSlot = `${slotName}-${nextIndex}`;
      }
      if (child instanceof HTMLElement) {
        const localName = child.localName;
        const isCustomElement = localName.includes("-");
        if (isCustomElement) {
          const isDefined = window.customElements.get(localName);
          if (!isDefined) {
            const whenDefinedPromise = window.customElements.whenDefined(localName);
            let timeoutPromise = elementTimeouts.get(localName);
            if (!timeoutPromise) {
              timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1e3));
              elementTimeouts.set(localName, timeoutPromise);
            }
            await Promise.race([whenDefinedPromise, timeoutPromise]);
          }
          window.customElements.upgrade(child);
        }
      }
      child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);
      if (child.isUI5Element && slotData.invalidateOnChildChange) {
        const method = (child.attachInvalidate || child._attachChange).bind(child);
        method(this._getChildChangeListener(slotName));
      }
      if (isSlot(child)) {
        this._attachSlotChange(child, slotName);
      }
      const propertyName = slotData.propertyName || slotName;
      if (slottedChildrenMap.has(propertyName)) {
        slottedChildrenMap.get(propertyName).push({ child, idx });
      } else {
        slottedChildrenMap.set(propertyName, [{ child, idx }]);
      }
    });
    await Promise.all(allChildrenUpgraded);
    slottedChildrenMap.forEach((children, propertyName) => {
      this._state[propertyName] = children.sort((a2, b2) => a2.idx - b2.idx).map((_2) => _2.child);
    });
    let invalidated = false;
    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      const propertyName = slotData.propertyName || slotName;
      if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
        _invalidate.call(this, {
          type: "slot",
          name: propertyNameToSlotMap.get(propertyName),
          reason: "children"
        });
        invalidated = true;
      }
    }
    if (!invalidated) {
      _invalidate.call(this, {
        type: "slot",
        name: "default",
        reason: "textcontent"
      });
    }
  }
  _clearSlot(slotName, slotData) {
    const propertyName = slotData.propertyName || slotName;
    const children = this._state[propertyName];
    children.forEach((child) => {
      if (child && child.isUI5Element) {
        const method = (child.detachInvalidate || child._detachChange).bind(child);
        method(this._getChildChangeListener(slotName));
      }
      if (isSlot(child)) {
        this._detachSlotChange(child, slotName);
      }
    });
    this._state[propertyName] = [];
  }
  attachInvalidate(callback) {
    this._eventProvider.attachEvent("invalidate", callback);
  }
  detachInvalidate(callback) {
    this._eventProvider.detachEvent("invalidate", callback);
  }
  _onChildChange(slotName, childChangeInfo) {
    if (!this.constructor.getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
      return;
    }
    _invalidate.call(this, {
      type: "slot",
      name: slotName,
      reason: "childchange",
      child: childChangeInfo.target
    });
  }
  attributeChangedCallback(name2, oldValue, newValue) {
    const properties = this.constructor.getMetadata().getProperties();
    const realName = name2.replace(/^ui5-/, "");
    const nameInCamelCase = kebabToCamelCase(realName);
    if (properties.hasOwnProperty(nameInCamelCase)) {
      const propertyTypeClass = properties[nameInCamelCase].type;
      if (propertyTypeClass === Boolean) {
        newValue = newValue !== null;
      } else if (isDescendantOf(propertyTypeClass, DataType)) {
        newValue = propertyTypeClass.attributeToProperty(newValue);
      }
      this[nameInCamelCase] = newValue;
    }
  }
  _updateAttribute(name2, newValue) {
    if (!this.constructor.getMetadata().hasAttribute(name2)) {
      return;
    }
    const properties = this.constructor.getMetadata().getProperties();
    const propertyTypeClass = properties[name2].type;
    const attrName = camelToKebabCase(name2);
    const attrValue = this.getAttribute(attrName);
    if (propertyTypeClass === Boolean) {
      if (newValue === true && attrValue === null) {
        this.setAttribute(attrName, "");
      } else if (newValue === false && attrValue !== null) {
        this.removeAttribute(attrName);
      }
    } else if (isDescendantOf(propertyTypeClass, DataType)) {
      this.setAttribute(attrName, propertyTypeClass.propertyToAttribute(newValue));
    } else if (typeof newValue !== "object") {
      if (attrValue !== newValue) {
        this.setAttribute(attrName, newValue);
      }
    }
  }
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  _upgradeAllProperties() {
    const allProps = this.constructor.getMetadata().getPropertiesList();
    allProps.forEach(this._upgradeProperty, this);
  }
  _initializeState() {
    this._state = __spreadValues({}, this.constructor.getMetadata().getInitialState());
  }
  _getChildChangeListener(slotName) {
    if (!this._childChangeListeners.has(slotName)) {
      this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
    }
    return this._childChangeListeners.get(slotName);
  }
  _getSlotChangeListener(slotName) {
    if (!this._slotChangeListeners.has(slotName)) {
      this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
    }
    return this._slotChangeListeners.get(slotName);
  }
  _attachSlotChange(child, slotName) {
    child.addEventListener("slotchange", this._getSlotChangeListener(slotName));
  }
  _detachSlotChange(child, slotName) {
    child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
  }
  _onSlotChange(slotName) {
    _invalidate.call(this, {
      type: "slot",
      name: slotName,
      reason: "slotchange"
    });
  }
  onInvalidation(changeInfo) {
  }
  _render() {
    const hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots();
    this._suppressInvalidation = true;
    if (typeof this.onBeforeRendering === "function") {
      this.onBeforeRendering();
    }
    if (this._onComponentStateFinalized) {
      this._onComponentStateFinalized();
    }
    this._suppressInvalidation = false;
    this._changedState = [];
    if (this.constructor._needsShadowDOM()) {
      updateShadowRoot(this);
    }
    if (this.staticAreaItem) {
      this.staticAreaItem.update();
    }
    if (hasIndividualSlots) {
      this._assignIndividualSlotsToChildren();
    }
    if (typeof this.onAfterRendering === "function") {
      this.onAfterRendering();
    }
  }
  _assignIndividualSlotsToChildren() {
    const domChildren = Array.from(this.children);
    domChildren.forEach((child) => {
      if (child._individualSlot) {
        child.setAttribute("slot", child._individualSlot);
      }
    });
  }
  _waitForDomRef() {
    return this._domRefReadyPromise;
  }
  getDomRef() {
    if (typeof this._getRealDomRef === "function") {
      return this._getRealDomRef();
    }
    if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
      return;
    }
    const children = [...this.shadowRoot.children].filter((child) => !["link", "style"].includes(child.localName));
    if (children.length !== 1) {
      console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`);
    }
    return children[0];
  }
  getFocusDomRef() {
    const domRef = this.getDomRef();
    if (domRef) {
      const focusRef = domRef.querySelector("[data-sap-focus-ref]");
      return focusRef || domRef;
    }
  }
  async getFocusDomRefAsync() {
    await this._waitForDomRef();
    return this.getFocusDomRef();
  }
  async focus() {
    await this._waitForDomRef();
    const focusDomRef = this.getFocusDomRef();
    if (focusDomRef && typeof focusDomRef.focus === "function") {
      focusDomRef.focus();
    }
  }
  fireEvent(name2, data, cancelable = false, bubbles = true) {
    const eventResult = this._fireEvent(name2, data, cancelable, bubbles);
    const camelCaseEventName = kebabToCamelCase(name2);
    if (camelCaseEventName !== name2) {
      return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
    }
    return eventResult;
  }
  _fireEvent(name2, data, cancelable = false, bubbles = true) {
    const noConflictEvent = new CustomEvent(`ui5-${name2}`, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });
    const noConflictEventResult = this.dispatchEvent(noConflictEvent);
    if (skipOriginalEvent(name2)) {
      return noConflictEventResult;
    }
    const normalEvent = new CustomEvent(name2, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });
    const normalEventResult = this.dispatchEvent(normalEvent);
    return normalEventResult && noConflictEventResult;
  }
  getSlottedNodes(slotName) {
    return getSlottedElementsList(this[slotName]);
  }
  get effectiveDir() {
    markAsRtlAware(this.constructor);
    return getEffectiveDir(this);
  }
  get isUI5Element() {
    return true;
  }
  static get observedAttributes() {
    return this.getMetadata().getAttributesList();
  }
  static _needsShadowDOM() {
    return !!this.template;
  }
  static _needsStaticArea() {
    return !!this.staticAreaTemplate;
  }
  getStaticAreaItemDomRef() {
    if (!this.constructor._needsStaticArea()) {
      throw new Error("This component does not use the static area");
    }
    if (!this.staticAreaItem) {
      this.staticAreaItem = StaticAreaItem.createInstance();
      this.staticAreaItem.setOwnerElement(this);
    }
    if (!this.staticAreaItem.parentElement) {
      getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
    }
    return this.staticAreaItem.getDomRef();
  }
  static _generateAccessors() {
    const proto = this.prototype;
    const slotsAreManaged = this.getMetadata().slotsAreManaged();
    const properties = this.getMetadata().getProperties();
    for (const [prop, propData] of Object.entries(properties)) {
      if (!isValidPropertyName(prop)) {
        console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
      }
      if (propData.type === Boolean && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
      }
      if (propData.type === Array) {
        throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      }
      if (propData.type === Object && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
      }
      if (propData.multiple && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
      }
      Object.defineProperty(proto, prop, {
        get() {
          if (this._state[prop] !== void 0) {
            return this._state[prop];
          }
          const propDefaultValue = propData.defaultValue;
          if (propData.type === Boolean) {
            return false;
          } else if (propData.type === String) {
            return propDefaultValue;
          } else if (propData.multiple) {
            return [];
          } else {
            return propDefaultValue;
          }
        },
        set(value) {
          let isDifferent;
          value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);
          const oldState = this._state[prop];
          if (propData.multiple && propData.compareValues) {
            isDifferent = !arraysAreEqual(oldState, value);
          } else if (isDescendantOf(propData.type, DataType)) {
            isDifferent = !propData.type.valuesAreEqual(oldState, value);
          } else {
            isDifferent = oldState !== value;
          }
          if (isDifferent) {
            this._state[prop] = value;
            _invalidate.call(this, {
              type: "property",
              name: prop,
              newValue: value,
              oldValue: oldState
            });
            this._updateAttribute(prop, value);
          }
        }
      });
    }
    if (slotsAreManaged) {
      const slots = this.getMetadata().getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        if (!isValidPropertyName(slotName)) {
          console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        }
        const propertyName = slotData.propertyName || slotName;
        Object.defineProperty(proto, propertyName, {
          get() {
            if (this._state[propertyName] !== void 0) {
              return this._state[propertyName];
            }
            return [];
          },
          set() {
            throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
          }
        });
      }
    }
  }
  static get metadata() {
    return {};
  }
  static get styles() {
    return "";
  }
  static get staticAreaStyles() {
    return "";
  }
  static get dependencies() {
    return [];
  }
  static getUniqueDependencies() {
    if (!uniqueDependenciesCache.has(this)) {
      const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
      uniqueDependenciesCache.set(this, filtered);
    }
    return uniqueDependenciesCache.get(this);
  }
  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map((dep) => dep.define()));
  }
  static async onDefine() {
    return Promise.resolve();
  }
  static async define() {
    await boot();
    await Promise.all([
      this.whenDependenciesDefined(),
      this.onDefine()
    ]);
    const tag = this.getMetadata().getTag();
    const altTag = this.getMetadata().getAltTag();
    const definedLocally = isTagRegistered(tag);
    const definedGlobally = customElements.get(tag);
    if (definedGlobally && !definedLocally) {
      recordTagRegistrationFailure(tag);
    } else if (!definedGlobally) {
      this._generateAccessors();
      registerTag(tag);
      window.customElements.define(tag, this);
      if (altTag && !customElements.get(altTag)) {
        registerTag(altTag);
        window.customElements.define(altTag, getClassCopy(this, () => {
          console.log(`The ${altTag} tag is deprecated and will be removed in the next release, please use ${tag} instead.`);
        }));
      }
    }
    return this;
  }
  static getMetadata() {
    if (this.hasOwnProperty("_metadata")) {
      return this._metadata;
    }
    const metadataObjects = [this.metadata];
    let klass = this;
    while (klass !== UI5Element) {
      klass = Object.getPrototypeOf(klass);
      metadataObjects.unshift(klass.metadata);
    }
    const mergedMetadata = fnMerge({}, ...metadataObjects);
    this._metadata = new UI5ElementMetadata(mergedMetadata);
    return this._metadata;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$3 = globalThis.trustedTypes, s$2 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$3 = `lit$${(Math.random() + "").slice(9)}$`, o$2 = "?" + e$3, n = `<${o$2}>`, l$2 = document, h = (t2 = "") => l$2.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u$2 = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a$2 = />/g, f$1 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m$1 = /"/g, g = /^(?:script|style|textarea)$/i, $ = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), p = $(1), y = $(2), b = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), x = new WeakMap(), w = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$2.createTreeWalker(l$2, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$2;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u3 = d2.exec(s2), u3 !== null); )
      p2 = d2.lastIndex, d2 === c$2 ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a$2 : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f$1) : u3[3] !== void 0 && (d2 = f$1) : d2 === f$1 ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c$2, $2 = -1) : u3[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f$1 : u3[3] === '"' ? m$1 : _) : d2 === m$1 || d2 === _ ? d2 = f$1 : d2 === v || d2 === a$2 ? d2 = c$2 : (d2 = f$1, h2 = void 0);
    const y2 = d2 === f$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$2 ? s2 + n : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e$3 + y2) : s2 + e$3 + ($2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$2 !== void 0 ? s$2.createHTML(u2) : u2, l2];
};
class P {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = P.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$3)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$3), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? k : i3[1] === "@" ? H : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$3), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$2)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$3, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$3.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function V(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class E {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$2).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new I(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = V(this, t2, i2), r(t2) ? t2 === T || t2 == null || t2 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.S(t2) : u$2(t2) ? this.M(t2) : this.$(t2);
  }
  A(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  S(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
  }
  $(t2) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.S(l$2.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = P.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new E(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.S(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = x.get(t2.strings);
    return i2 === void 0 && x.set(t2.strings, i2 = new P(t2)), i2;
  }
  M(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = V(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === T ? t2 = T : t2 !== T && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t2);
  }
  k(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t2) {
    t2 && t2 !== T ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
}
class H extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = V(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : T) === b)
      return;
    const e2 = this._$AH, o2 = t2 === T && e2 !== T || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== T && (e2 === T || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class I {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    V(this, t2);
  }
}
const L = { P: "$lit$", V: e$3, L: o$2, I: 1, N: C, R: E, D: u$2, j: V, H: N, O: S, F: k, B: H, W: M, Z: I }, R = window.litHtmlPolyfillSupport;
R == null || R(P, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.0.1");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = (t2) => ({ _$litStatic$: t2 }), i$2 = new Map(), a$1 = (t2) => (e2, ...o2) => {
  var r2;
  const a2 = o2.length;
  let l2, s2;
  const n2 = [], u2 = [];
  let c2, $2 = 0, v2 = false;
  for (; $2 < a2; ) {
    for (c2 = e2[$2]; $2 < a2 && (s2 = o2[$2], l2 = (r2 = s2) === null || r2 === void 0 ? void 0 : r2._$litStatic$) !== void 0; )
      c2 += l2 + e2[++$2], v2 = true;
    u2.push(s2), n2.push(c2), $2++;
  }
  if ($2 === a2 && n2.push(e2[a2]), v2) {
    const t3 = n2.join("$$lit$$");
    (e2 = i$2.get(t3)) === void 0 && i$2.set(t3, e2 = n2), o2 = u2;
  }
  return t2(e2, ...o2);
}, l$1 = a$1(p), s$1 = a$1(y);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i$1 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { H: i } = L, e$1 = () => document.createComment(""), u$1 = (o2, t2, n2) => {
  var v2;
  const l2 = o2._$AA.parentNode, d2 = t2 === void 0 ? o2._$AB : t2._$AA;
  if (n2 === void 0) {
    const t3 = l2.insertBefore(e$1(), d2), v3 = l2.insertBefore(e$1(), d2);
    n2 = new i(t3, v3, o2, o2.options);
  } else {
    const i2 = n2._$AB.nextSibling, t3 = n2._$AM, r2 = t3 !== o2;
    if (r2) {
      let i3;
      (v2 = n2._$AQ) === null || v2 === void 0 || v2.call(n2, o2), n2._$AM = o2, n2._$AP !== void 0 && (i3 = o2._$AU) !== t3._$AU && n2._$AP(i3);
    }
    if (i2 !== d2 || r2) {
      let o3 = n2._$AA;
      for (; o3 !== i2; ) {
        const i3 = o3.nextSibling;
        l2.insertBefore(o3, d2), o3 = i3;
      }
    }
  }
  return n2;
}, c$1 = (o2, i2, t2 = o2) => (o2._$AI(i2, t2), o2), f = {}, s = (o2, i2 = f) => o2._$AH = i2, a = (o2) => o2._$AH, m = (o2) => {
  var i2;
  (i2 = o2._$AP) === null || i2 === void 0 || i2.call(o2, false, true);
  let t2 = o2._$AA;
  const n2 = o2._$AB.nextSibling;
  for (; t2 !== n2; ) {
    const o3 = t2.nextSibling;
    t2.remove(), t2 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e2, s2, t2) => {
  const r2 = new Map();
  for (let l2 = s2; l2 <= t2; l2++)
    r2.set(e2[l2], l2);
  return r2;
}, c = e$2(class extends i$1 {
  constructor(e2) {
    if (super(e2), e2.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    t2 === void 0 ? t2 = s2 : s2 !== void 0 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t2(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s$12, [t2, r2, c2]) {
    var d2;
    const a$12 = a(s$12), { values: p2, keys: v2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(a$12))
      return this.ct = v2, p2;
    const h2 = (d2 = this.ct) !== null && d2 !== void 0 ? d2 : this.ct = [], m$12 = [];
    let y2, x2, j = 0, k2 = a$12.length - 1, w2 = 0, A2 = p2.length - 1;
    for (; j <= k2 && w2 <= A2; )
      if (a$12[j] === null)
        j++;
      else if (a$12[k2] === null)
        k2--;
      else if (h2[j] === v2[w2])
        m$12[w2] = c$1(a$12[j], p2[w2]), j++, w2++;
      else if (h2[k2] === v2[A2])
        m$12[A2] = c$1(a$12[k2], p2[A2]), k2--, A2--;
      else if (h2[j] === v2[A2])
        m$12[A2] = c$1(a$12[j], p2[A2]), u$1(s$12, m$12[A2 + 1], a$12[j]), j++, A2--;
      else if (h2[k2] === v2[w2])
        m$12[w2] = c$1(a$12[k2], p2[w2]), u$1(s$12, a$12[j], a$12[k2]), k2--, w2++;
      else if (y2 === void 0 && (y2 = u(v2, w2, A2), x2 = u(h2, j, k2)), y2.has(h2[j]))
        if (y2.has(h2[k2])) {
          const e2 = x2.get(v2[w2]), t3 = e2 !== void 0 ? a$12[e2] : null;
          if (t3 === null) {
            const e3 = u$1(s$12, a$12[j]);
            c$1(e3, p2[w2]), m$12[w2] = e3;
          } else
            m$12[w2] = c$1(t3, p2[w2]), u$1(s$12, a$12[j], t3), a$12[e2] = null;
          w2++;
        } else
          m(a$12[k2]), k2--;
      else
        m(a$12[j]), j++;
    for (; w2 <= A2; ) {
      const e2 = u$1(s$12, m$12[A2 + 1]);
      c$1(e2, p2[w2]), m$12[w2++] = e2;
    }
    for (; j <= k2; ) {
      const e2 = a$12[j++];
      e2 !== null && m(e2);
    }
    return this.ct = v2, s(s$12, m$12), b;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = e$2(class extends i$1 {
  constructor(t$12) {
    var i2;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || t$12.name !== "class" || ((i2 = t$12.strings) === null || i2 === void 0 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s2]) {
    var r2, o2;
    if (this.st === void 0) {
      this.st = new Set(), i2.strings !== void 0 && (this.et = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => t2 !== "")));
      for (const t2 in s2)
        s2[t2] && !((r2 = this.et) === null || r2 === void 0 ? void 0 : r2.has(t2)) && this.st.add(t2);
      return this.render(s2);
    }
    const e2 = i2.element.classList;
    this.st.forEach((t2) => {
      t2 in s2 || (e2.remove(t2), this.st.delete(t2));
    });
    for (const t2 in s2) {
      const i3 = !!s2[t2];
      i3 === this.st.has(t2) || ((o2 = this.et) === null || o2 === void 0 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.st.add(t2)) : (e2.remove(t2), this.st.delete(t2)));
    }
    return b;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class StyleMapDirective extends i$1 {
  constructor(partInfo) {
    var _a;
    super(partInfo);
    if (partInfo.type !== t.ATTRIBUTE || partInfo.name !== "style" || ((_a = partInfo.strings) === null || _a === void 0 ? void 0 : _a.length) > 2) {
      throw new Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
  }
  render(styleInfo) {
    return "";
  }
  update(part, [styleInfo]) {
    const { style: style2 } = part.element;
    if (this._previousStyleProperties === void 0) {
      this._previousStyleProperties = new Set();
      for (const name2 in styleInfo) {
        this._previousStyleProperties.add(name2);
      }
    }
    this._previousStyleProperties.forEach((name2) => {
      if (styleInfo[name2] == null) {
        this._previousStyleProperties.delete(name2);
        if (name2.includes("-")) {
          style2.removeProperty(name2);
        } else {
          style2[name2] = "";
        }
      }
    });
    for (const name2 in styleInfo) {
      const value = styleInfo[name2];
      if (value != null) {
        this._previousStyleProperties.add(name2);
        if (name2.includes("-")) {
          style2.setProperty(name2, value);
        } else {
          style2[name2] = value;
        }
      }
    }
    return b;
  }
}
const styleMap = e$2(StyleMapDirective);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = (l2) => l2 != null ? l2 : T;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i$1 {
  constructor(i2) {
    if (super(i2), this.it = T, i2.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === T || r2 == null)
      return this.vt = void 0, this.it = r2;
    if (r2 === b)
      return r2;
    if (typeof r2 != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it)
      return this.vt;
    this.it = r2;
    const s2 = [r2];
    return s2.raw = s2, this.vt = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const litRender = (templateResult, domNode, styleStrOrHrefsArr, { host } = {}) => {
  if (typeof styleStrOrHrefsArr === "string") {
    templateResult = l$1`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
  } else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
    templateResult = l$1`${styleStrOrHrefsArr.map((href) => l$1`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
  }
  w(templateResult, domNode, { host });
};
const scopeTag = (tag, tags, suffix) => {
  const resultTag = suffix && (tags || []).includes(tag) ? `${tag}-${suffix}` : tag;
  return o$1(resultTag);
};
const TitleLevels = {
  H1: "H1",
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  H6: "H6"
};
class TitleLevel extends DataType {
  static isValid(value) {
    return !!TitleLevels[value];
  }
}
TitleLevel.generateTypeAccessors(TitleLevels);
const WrappingTypes = {
  None: "None",
  Normal: "Normal"
};
class WrappingType extends DataType {
  static isValid(value) {
    return !!WrappingTypes[value];
  }
}
WrappingType.generateTypeAccessors(WrappingTypes);
const block0$f = (context, tags, suffix) => l$1`${context.h1 ? block1$b(context) : void 0}${context.h2 ? block2$8(context) : void 0}${context.h3 ? block3$5(context) : void 0}${context.h4 ? block4$5(context) : void 0}${context.h5 ? block5$3(context) : void 0}${context.h6 ? block6$1(context) : void 0}`;
const block1$b = (context, tags, suffix) => l$1`<h1 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h1>`;
const block2$8 = (context, tags, suffix) => l$1`<h2 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h2>`;
const block3$5 = (context, tags, suffix) => l$1`<h3 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h3>`;
const block4$5 = (context, tags, suffix) => l$1`<h4 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h4>`;
const block5$3 = (context, tags, suffix) => l$1`<h5 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h5>`;
const block6$1 = (context, tags, suffix) => l$1`<h6 class="ui5-title-root"><span id="${l(context._id)}-inner"><slot></slot></span></h6>`;
var defaultThemeBase = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_fiori_3/parameters-bundle.css", content: ':root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontLightFamily:"72-Light","72-Lightfull","72","72full",Arial,Helvetica,sans-serif;--sapFontBoldFamily:"72-Bold","72-Boldfull","72","72full",Arial,Helvetica,sans-serif;--sapFontBlackFamily:"72Black","72","72full",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#df6e0c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#df6e0c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#df6e0c;--sapInformativeTextColor:#0a6ed1;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#df6e0c;--sapWarningBorderColor:#df6e0c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#df6e0c;--sapIndicationColor_3_Hover_Background:#d0670b;--sapIndicationColor_3_Active_Background:#c2600a;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_ContrastTextShadow:0 0 0.0625rem rgba(0,0,0,0.7);--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow:none;--sapContent_Selected_Shadow:none;--sapContent_Negative_Shadow:none;--sapContent_Critical_Shadow:none;--sapContent_Positive_Shadow:none;--sapContent_Informative_Shadow:none;--sapContent_Neutral_Shadow:none;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:"72Mono","72Monofull",lucida console,monospace;--sapContent_MonospaceBoldFontFamily:"72Mono-Bold","72Mono-Boldfull",lucida console,monospace;--sapContent_IconFontFamily:"SAP-icons";--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#ccc;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#ccc 0%,#ccc 20%,#999 50%,#ccc 80%,#ccc);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Selected_ForegroundColor:#0854a0;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapContent_Illustrative_Color9:#64edd2;--sapContent_Illustrative_Color10:#e7e9ea;--sapContent_Illustrative_Color11:#f31ded;--sapContent_Illustrative_Color12:#5dc122;--sapContent_Illustrative_Color13:#4ba1f6;--sapContent_Illustrative_Color14:#298ff4;--sapContent_Illustrative_Color15:#e6a400;--sapContent_Illustrative_Color16:#085aaa;--sapContent_Illustrative_Color17:#00a5a8;--sapContent_Illustrative_Color18:#d9ddde;--sapContent_Illustrative_Color19:#ccd0d2;--sapContent_Illustrative_Color20:#bec4c6;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveBackground:#354a5f;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_GroupTitleTextShadow:0 0 0.125rem #fff;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#354a5f;--sapShell_Navigation_SelectedColor:#d1e8ff;--sapShell_Navigation_Selected_TextColor:#d1e8ff;--sapShell_Navigation_TextColor:#fff;--sapShell_Navigation_Hover_Background:#283848;--sapShell_Navigation_Active_Background:#23303e;--sapShell_Navigation_Active_TextColor:#fff;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.4),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapShell_NegativeColor:#f88;--sapShell_CriticalColor:#f8b67d;--sapShell_PositiveColor:#abe2c2;--sapShell_InformativeColor:#b1d6fb;--sapShell_NeutralColor:#d4d6d7;--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_Active_TextColor:#fff;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_Active_TextColor:#fff;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_Active_TextColor:#fff;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#df6e0c;--sapButton_Attention_TextColor:#32363a;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#df6e0c;--sapButton_Attention_Hover_TextColor:#32363a;--sapButton_Attention_Active_Background:#f3801c;--sapButton_Attention_Active_BorderColor:#f3801c;--sapButton_Attention_Active_TextColor:#fff;--sapButton_Attention_Selected_Background:#f3801c;--sapButton_Attention_Selected_BorderColor:#f3801c;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#f48e34;--sapButton_Attention_Selected_Hover_BorderColor:#f48e34;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Negative_Active_TextColor:#fff;--sapButton_Critical_Background:#df6e0c;--sapButton_Critical_BorderColor:#df6e0c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#f3801c;--sapButton_Critical_Hover_BorderColor:#f3801c;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#f5933e;--sapButton_Critical_Active_BorderColor:#f5933e;--sapButton_Critical_Active_TextColor:#fff;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Success_Active_TextColor:#fff;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Neutral_Active_TextColor:#fff;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_InvalidBorderWidth:.125rem;--sapField_InvalidBorderStyle:solid;--sapField_WarningColor:#df6e0c;--sapField_WarningBackground:#fff;--sapField_WarningBorderWidth:.125rem;--sapField_WarningBorderStyle:solid;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_SuccessBorderWidth:.0625rem;--sapField_SuccessBorderStyle:solid;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapField_InformationBorderWidth:.125rem;--sapField_InformationBorderStyle:solid;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e5e5e5;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e5e5e5;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#f2f2f2;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d9d9d9;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d9d9d9;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d9d9d9;--sapList_TableFixedBorderColor:#8c8c8c;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapInfobar_NonInteractive_Background:#e6e6e6;--sapInfobar_TextColor:#fff;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapObjectHeader_Hover_Background:#f5f5f5;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapTile_Interactive_BorderColor:#b3b3b3;--sapTile_OverlayBackground:rgba(0,0,0,0.8);--sapTile_OverlayForegroundColor:#fff;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapAccentBackgroundColor1:#fff3b8;--sapAccentBackgroundColor2:#ffd0e7;--sapAccentBackgroundColor3:#fff0fa;--sapAccentBackgroundColor4:#ffdcf3;--sapAccentBackgroundColor5:#ded3ff;--sapAccentBackgroundColor6:#d1efff;--sapAccentBackgroundColor7:#c2fcee;--sapAccentBackgroundColor8:#ebf5cb;--sapAccentBackgroundColor9:#dafdf5;--sapAccentBackgroundColor10:#eaecee;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}' };
var defaultTheme$1 = { packageName: "@ui5/webcomponents", fileName: "themes/sap_fiori_3/parameters-bundle.css", content: ':root{--_ui5_calendar_height:24.5rem;--_ui5_calendar_width:20.5rem;--_ui5_calendar_padding:0.75rem;--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_checkbox_partially_icon_size:.75rem;--_ui5_custom_list_item_rb_min_width:2.75rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_day_picker_item_justify_content:space-between;--_ui5_color-palette-item-height:1.75rem;--_ui5_color-palette-item-hover-height:2.375rem;--_ui5_color-palette-item-margin:calc(var(--_ui5_color-palette-item-hover-height)/2 - var(--_ui5_color-palette-item-height)/2);--_ui5_color-palette-row-width:12rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_dialog_content_min_height:2.75rem;--_ui5_input_inner_padding:0 0.625rem;--_ui5_input_inner_padding_with_icon:0 0.25rem 0 0.625rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapFontLargeSize);--_ui5_list_item_img_size:3rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2.75rem;--_ui5_list_item_icon_size:1.125rem;--_ui5_group_header_list_item_height:2.75rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_popup_default_header_height:2.75rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_switch_focus_width_size_horizon_exp:calc(100% + 4px);--_ui5_switch_focus_height_size_horizon_exp:calc(100% + 4px);--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_height:4.75rem;--_ui5_tc_item_text_only_height:2.75rem;--_ui5_tc_item_text_only_with_additional_text_height:3.75rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_circle_size:2.75rem;--_ui5_tc_item_icon_size:1.25rem;--_ui5_tc_item_add_text_margin_top:0.375rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5_radio_button_height:2.75rem;--_ui5_radio_button_label_side_padding:.875rem;--_ui5_radio_button_focus_dist:.5rem;--_ui5_radio_button_inner_size:2.75rem;--_ui5_radio_button_svg_size:1.375rem;--_ui5_radio_button_label_width:calc(100% - 2.75rem);--_ui5_radio_button_rtl_focus_right:0.5rem;--_ui5-responsive_popover_header_height:2.75rem;--ui5_side_navigation_item_height:2.75rem;--_ui5_load_more_text_height:2.75rem;--_ui5_load_more_text_font_size:var(--sapFontMediumSize);--_ui5_load_more_desc_padding:0.375rem 2rem 0.875rem 2rem;--ui5_table_header_row_height:2.75rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--_ui5_timeline_tli_indicator_before_bottom:-1.625rem;--_ui5_timeline_tli_indicator_before_right:-1.625rem;--_ui5_timeline_tli_indicator_before_without_icon_bottom:-1.875rem;--_ui5_timeline_tli_indicator_before_without_icon_right:-1.9375rem;--_ui5_segmented_btn_border_radius:0.375rem}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_list_item_selection_btn_margin_top:calc(var(--_ui5_checkbox_wrapper_padding)*-1);--_ui5_token_icon_size:.75rem;--_ui5_token_wrapper_left_padding:0}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_button_icon_font_size:1rem;--_ui5_calendar_height:18rem;--_ui5_calendar_width:17.75rem;--_ui5_calendar_padding:0.5rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_calendar_header_padding:0;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_checkbox_partially_icon_size:.5rem;--_ui5_color-palette-item-height:1.25rem;--_ui5_color-palette-item-focus-height:1rem;--_ui5_color-palette-item-container-sides-padding:0.1875rem;--_ui5_color-palette-item-container-rows-padding:0.8125rem;--_ui5_color-palette-item-hover-height:1.625rem;--_ui5_color-palette-item-margin:calc(var(--_ui5_color-palette-item-hover-height)/2 - var(--_ui5_color-palette-item-height)/2);--_ui5_color-palette-row-width:8.125rem;--_ui5_color-palette-item-hover-margin:0;--_ui5_color-palette-row-height:7.5rem;--_ui5_color-palette-button-height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_day_picker_item_justify_content:flex-end;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_dialog_content_min_height:2.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_popup_default_header_height:2.5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_item_icon_size:1rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_wheelslider_item_width:64px;--_ui5_wheelslider_item_height:32px;--_ui5_wheelslider_height:224px;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2);--_ui5_wheelslider_arrows_visibility:visible;--_ui5_wheelslider_mobile_selection_frame_margin_top:128px;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_no_label_width_horizon:var(--_ui5_switch_compact_no_label_width_horizon);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_switch_root_outline_top_bottom:var(--_ui5_switch_compact_root_outline_top_bottom);--_ui5_switch_root_outline_left_right:var(--_ui5_switch_compact_root_outline_left_right);--_ui5_switch_root_outline_top_bottom_horizon:var(--_ui5_switch_compact_root_outline_top_bottom_horizon);--_ui5_switch_root_outline_left_right_horizon:var(--_ui5_switch_compact_root_outline_left_right_horizon);--_ui5_switch_root_outline_top_bottom_hcb:var(--_ui5_switch_compact_root_outline_top_bottom_hcb);--_ui5_switch_root_outline_left_right_hcb:var(--_ui5_switch_compact_root_outline_left_right_hcb);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_tc_item_height:4rem;--_ui5_tc_item_icon_circle_size:2rem;--_ui5_tc_item_icon_size:1rem;--_ui5_radio_button_min_width:var(--_ui5_radio_button_min_width_compact);--_ui5_radio_button_height:2rem;--_ui5_radio_button_label_side_padding:.5rem;--_ui5_radio_button_focus_dist:.375rem;--_ui5_radio_button_inner_size:2rem;--_ui5_radio_button_svg_size:1rem;--_ui5_radio_button_label_width:calc(100% - 2rem + 1px);--_ui5_radio_button_rtl_focus_right:0.375rem;--_ui5-responsive_popover_header_height:2.5rem;--ui5_side_navigation_item_height:2rem;--_ui5_slider_handle_height:1.25rem;--_ui5_slider_handle_width:1.25rem;--_ui5_slider_handle_top:-0.6425rem;--_ui5_slider_handle_margin_left:-0.7825rem;--_ui5_slider_tooltip_height:1rem;--_ui5_slider_tooltip_padding:0.25rem;--_ui5_slider_tooltip_bottom:1.825rem;--_ui5_slider_progress_outline_offset:-0.625rem;--_ui5_slider_outer_height:1.3125rem;--_ui5_load_more_text_height:2.625rem;--_ui5_load_more_text_font_size:var(--sapFontSize);--_ui5_load_more_desc_padding:0 2rem 0.875rem 2rem;--ui5_table_header_row_height:2rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem;--_ui5_timeline_tli_indicator_before_bottom:-0.5rem;--_ui5_timeline_tli_indicator_before_right:-0.5rem;--_ui5_timeline_tli_indicator_before_without_icon_bottom:-0.75rem;--_ui5_timeline_tli_indicator_before_without_icon_right:-0.8125rem}:root{--ui5-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-avatar-initials-border:none;--ui5-avatar-accent1:var(--sapAccentColor1);--ui5-avatar-accent2:var(--sapAccentColor2);--ui5-avatar-accent3:var(--sapAccentColor3);--ui5-avatar-accent4:var(--sapAccentColor4);--ui5-avatar-accent5:var(--sapAccentColor5);--ui5-avatar-accent6:var(--sapAccentColor6);--ui5-avatar-accent7:var(--sapAccentColor7);--ui5-avatar-accent8:var(--sapAccentColor8);--ui5-avatar-accent9:var(--sapAccentColor9);--ui5-avatar-accent10:var(--sapAccentColor10);--ui5-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-avatar-accent1-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent2-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent3-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent4-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent5-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent6-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent7-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent8-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent9-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent10-color:var(--ui5-avatar-initials-color);--ui5-avatar-placeholder-color:var(--ui5-avatar-initials-color);--_ui5_avatar_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_avatar_focus_offset:1px;--_ui5_avatar_focus_width:1px;--_ui5_avatar_focus_color:var(--sapContent_FocusColor);--_ui5_avatar_fontsize_XS:0.75rem;--_ui5_avatar_fontsize_M:1.625rem;--_ui5_avatar_fontsize_L:2rem;--_ui5_avatar_fontsize_XL:2.75rem;--_ui5_avatar_fontsize_XS:1rem;--_ui5_avatar_fontsize_S:1.125rem;--_ui5_avatar_fontsize_M:1.5rem;--_ui5_avatar_fontsize_L:2.25rem;--_ui5_avatar_fontsize_XL:3rem;--ui5-badge-font-size:0.75em;--_ui5-badge-height:1rem;--_ui5-badge-border:0.0625em solid;--_ui5-badge-left-border:1px solid;--_ui5-badge-border-radius:0.5em;--_ui5-badge-font-weight:bold;--_ui5-badge-text-transform:uppercase;--_ui5-badge-cursor:default;--_ui5_badge_pointer_events:none;--ui5-badge-color-scheme-1-background:var(--sapLegendBackgroundColor1);--ui5-badge-color-scheme-1-hover-background:var(--ui5-badge-color-scheme-1-background);--ui5-badge-color-scheme-1-border:var(--sapAccentColor1);--ui5-badge-color-scheme-1-color:var(--sapAccentColor1);--ui5-badge-color-scheme-2-background:var(--sapLegendBackgroundColor2);--ui5-badge-color-scheme-2-hover-background:var(--ui5-badge-color-scheme-2-background);--ui5-badge-color-scheme-2-border:var(--sapAccentColor2);--ui5-badge-color-scheme-2-color:var(--sapAccentColor2);--ui5-badge-color-scheme-3-background:var(--sapLegendBackgroundColor3);--ui5-badge-color-scheme-3-hover-background:var(--ui5-badge-color-scheme-3-background);--ui5-badge-color-scheme-3-border:var(--sapAccentColor3);--ui5-badge-color-scheme-3-color:var(--sapAccentColor3);--ui5-badge-color-scheme-4-background:var(--sapLegendBackgroundColor5);--ui5-badge-color-scheme-4-hover-background:var(--ui5-badge-color-scheme-4-background);--ui5-badge-color-scheme-4-border:var(--sapAccentColor4);--ui5-badge-color-scheme-4-color:var(--sapAccentColor4);--ui5-badge-color-scheme-5-background:var(--sapLegendBackgroundColor20);--ui5-badge-color-scheme-5-hover-background:var(--ui5-badge-color-scheme-5-background);--ui5-badge-color-scheme-5-border:var(--sapAccentColor5);--ui5-badge-color-scheme-5-color:var(--sapAccentColor5);--ui5-badge-color-scheme-6-background:var(--sapLegendBackgroundColor6);--ui5-badge-color-scheme-6-hover-background:var(--ui5-badge-color-scheme-6-background);--ui5-badge-color-scheme-6-border:var(--sapAccentColor6);--ui5-badge-color-scheme-6-color:var(--sapAccentColor6);--ui5-badge-color-scheme-7-background:var(--sapLegendBackgroundColor7);--ui5-badge-color-scheme-7-hover-background:var(--ui5-badge-color-scheme-7-background);--ui5-badge-color-scheme-7-border:var(--sapAccentColor7);--ui5-badge-color-scheme-7-color:var(--sapAccentColor7);--ui5-badge-color-scheme-8-background:var(--sapLegendBackgroundColor18);--ui5-badge-color-scheme-8-hover-background:var(--ui5-badge-color-scheme-8-background);--ui5-badge-color-scheme-8-border:var(--sapLegendColor18);--ui5-badge-color-scheme-8-color:var(--sapLegendColor18);--ui5-badge-color-scheme-9-background:var(--sapLegendBackgroundColor10);--ui5-badge-color-scheme-9-hover-background:var(--ui5-badge-color-scheme-9-background);--ui5-badge-color-scheme-9-border:var(--sapAccentColor10);--ui5-badge-color-scheme-9-color:var(--sapAccentColor10);--ui5-badge-color-scheme-10-background:var(--sapLegendBackgroundColor9);--ui5-badge-color-scheme-10-hover-background:var(--ui5-badge-color-scheme-10-background);--ui5-badge-color-scheme-10-border:var(--sapAccentColor9);--ui5-badge-color-scheme-10-color:var(--sapAccentColor9);--browser_scrollbar_border_radius:var(--sapElement_BorderCornerRadius);--browser_scrollbar_border:none;--_ui5_busy_indicator_color:var(--sapContent_IconColor);--_ui5_busy_indicator_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_busy_indicator_focus_border_radius:0px;--_ui5_button_base_min_width:2.5rem;--_ui5_button_base_min_compact_width:2rem;--_ui5_button_base_height:2.5rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_border_radius:var(--sapButton_BorderCornerRadius);--_ui5_button_base_padding:0.6875rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_base_icon_margin:0.563rem;--_ui5_button_icon_font_size:1.375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_emphasized_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_emphasized_font_weight:normal;--_ui5_button_text_shadow:var(--sapContent_TextShadow);--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_focus_outline_focus_color:var(--sapContent_ContrastFocusColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_attention_focus_border_color:var(--sapButton_Negative_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_fontFamily:"72override",var(--sapFontFamily);--_ui5_button_emphasized_focused_border_radius:0;--_ui5_button_transparent_hover:transparent;--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_icon_font_size:1rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_button_emphasized_focused_border:0.0625rem dotted var(--sapContent_ContrastFocusColor);--_ui5_button_emphasized_outline:1px solid var(--sapContent_FocusColor);--_ui5_card_box_shadow:var(--sapContent_Shadow0);--_ui5_card_hover_box_shadow:var(--_ui5_card_box_shadow);--_ui5_card_border_color:var(--sapTile_BorderColor);--_ui5_card_border-radius:var(--sapElement_BorderCornerRadius);--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--sapTile_SeparatorColor);--_ui5_card_header_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_card_header_focus_radius:0px;--_ui5_card_header_focus_bottom_radius:0px;--_ui5_card_header_focus_offset:1px;--_ui5_card_header_title_font_family:"72override",var(--sapFontFamily);--_ui5_card_header_title_font_size:var(--sapFontHeader5Size);--_ui5_card_header_title_font_weight:normal;--ui5_carousel_button_size:2.5rem;--ui5_carousel_height:0.25rem;--ui5_carousel_width:0.25rem;--ui5_carousel_margin:0 0.375rem;--ui5_carousel_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5_carousel_dot_border:none;--ui5_carousel_dot_background:var(--sapContent_NonInteractiveIconColor);--_ui5_checkbox_wrapper_padding:.8125rem;--_ui5_checkbox_width_height:3rem;--_ui5_checkbox_box_shadow:none;--_ui5_checkbox_transition:unset;--_ui5_checkbox_focus_border:none;--_ui5_checkbox_border_radius:0;--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_active_background:var(--sapField_Hover_Background);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_focus_position:.6875rem;--_ui5_checkbox_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_checkbox_focus_border_radius:0;--_ui5_checkbox_outer_hover_background:transparent;--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_border:solid .125rem var(--sapField_BorderColor);--_ui5_checkbox_inner_hover_border_color:var(--sapField_HoverBorderColor);--_ui5_checkbox_inner_hover_checked_border_color:var(--sapField_HoverBorderColor);--_ui5_checkbox_inner_selected_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_disabled_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_active_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_border_radius:0;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5_checkbox_inner_information_box_shadow:none;--_ui5_checkbox_inner_warning_box_shadow:none;--_ui5_checkbox_inner_error_box_shadow:none;--_ui5_checkbox_inner_success_box_shadow:none;--_ui5_checkbox_inner_default_box_shadow:none;--_ui5_checkbox_inner_warning_background_hover:var(--sapField_WarningBackground);--_ui5_checkbox_inner_error_background_hover:var(--sapField_InvalidBackground);--_ui5_checkbox_inner_success_background_hover:var(--sapField_SuccessBackground);--_ui5_checkbox_inner_information_background_hover:var(--sapField_InformationBackground);--_ui5_checkbox_inner_success_border:var(--sapField_BorderWidth) solid var(--sapField_SuccessColor);--_ui5_checkbox_inner_readonly_border:0.125rem solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_inner_background:var(--sapField_Background);--_ui5_checkbox_wrapped_focus_padding:.375rem;--_ui5_checkbox_wrapped_content_margin_top:.125rem;--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_compact_wrapped_label_margin_top:-1px;--_ui5_checkbox_label_color:var(--sapContent_LabelColor);--_ui5_checkbox_label_offset_left:var(--_ui5_checkbox_wrapper_padding);--_ui5_checkbox_label_offset_right:0;--_ui5_checkbox_disabled_label_color:var(--sapContent_LabelColor);--_ui5_checkbox_default_focus_border:none;--_ui5_checkbox_focus_outline_display:block;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_color-palette-item-container-sides-padding:0.3125rem;--_ui5_color-palette-item-container-rows-padding:0.6875rem;--_ui5_color-palette-item-focus-height:1.5rem;--_ui5_color-palette-item-container-padding:var(--_ui5_color-palette-item-container-sides-padding) var(--_ui5_color-palette-item-container-rows-padding);--_ui5_color-palette-item-hover-margin:0;--_ui5_color-palette-row-height:9.5rem;--_ui5_color-palette-button-height:3rem;--_ui5_color-palette-item-before-focus-color:0.0625rem solid #fff;--_ui5_color-palette-item-before-focus-offset:0.0625rem;--_ui5_color-palette-item-after-focus-color:0.0625rem dotted #000;--_ui5_color-palette-item-after-focus-offset:0.0625rem;--_ui5_color-palette-item-border-radius:0;--_ui5_color_picker_slider_handle_box_shadow:0.0625rem solid var(--sapField_BorderColor);--_ui5_color_picker_slider_handle_border:0.125rem solid var(--sapField_BorderColor);--_ui5_color_picker_slider_handle_outline_hover:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5_color_picker_slider_handle_outline_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_color_picker_slider_handle_margin_top:0.0625rem;--_ui5_color_picker_slider_handle_focus_margin_top:0.0625rem;--_ui5_datepicker_icon_border:none;--_ui5-datepicker_border_radius:0;--_ui5-datepicker-hover-background:var(--sapField_Hover_Background);--_ui5-datepicker_icon_border_radius:0;--_ui5_daypicker_item_box_shadow:inset 0 0 0 0.0625rem var(--sapContent_Selected_ForegroundColor);--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_selected_border_color:var(--sapList_Background);--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_border_radius:0;--_ui5_daypicker_item_now_inner_border_radius:0;--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_item_now_selected_outline_offset:2px;--_ui5_daypicker_item_now_focus_after_width:calc(100% - 0.25rem);--_ui5_daypicker_item_now_focus_after_height:calc(100% - 0.25rem);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.375rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.375rem);--_ui5_daypicker_item_selected_background:transparent;--_ui5_daypicker_item_selected_box_shadow:var(--_ui5_daypicker_item_box_shadow),var(--_ui5_daypicker_item_box_shadow);--_ui5_daypicker_item_selected_daytext_hover_background:transparent;--_ui5_daypicker_item_outline_focus_after:none;--_ui5_daypicker_item_border_radius_focus_after:none;--_ui5_daypicker_item_border_focus_after:var(--_ui5_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5_daypicker_item_width_focus_after:calc(100% - 0.25rem);--_ui5_daypicker_item_height_focus_after:calc(100% - 0.25rem);--_ui5_daypicker_item_now_border:0.125rem solid var(--sapLegend_CurrentDateTime);--_ui5_daypicker_item_now_outline:none;--_ui5_daypicker_item_now_outline_offset:none;--_ui5_daypicker_item_now_outline_offset_focus_after:var(--_ui5_daypicker_item_now_outline_offset);--_ui5_daypicker_item_selected_between_border:5%;--_ui5_daypicker_item_selected_between_background:transparent;--_ui5_daypicker_item_selected_between_text_background:var(--sapList_SelectionBackgroundColor);--_ui5_daypicker_item_selected_between_text_font:inherit;--_ui5_daypicker_item_selected_between_hover_background:inherit;--_ui5_daypicker_item_now_box_shadow:inset 0 0 0 0.0625rem var(--_ui5_daypicker_item_selected_border_color);--_ui5_daypicker_item_selected_text_outline:none;--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--_ui5_dialog_resize_handle_color:var(--sapButton_Lite_TextColor);--_ui5_dialog_header_focus_width:0.0625rem;--_ui5_dialog_header_focus_offset:-0.1875rem;--_ui5_dialog_outline:var(--_ui5_dialog_header_focus_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_dialog_header_border_radius:0px;--_ui5_dialog_resize_handle_right:-0.25rem;--_ui5_dialog_resize_handle_bottom:-0.0625rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_height:2.5rem;--_ui5_input_compact_height:1.625rem;--_ui5-input-hover-border:1px solid var(--sapField_Hover_BorderColor);--_ui5-input-hover-box-shadow:none;--_ui5-input-focus-box-shadow:none;--_ui5-input-background-color:var(--sapField_Background);--_ui5-input-border-radius:var(--sapField_BorderCornerRadius);--_ui5-input-border:2px solid transparent;--_ui5-input-placeholder-style:italic;--_ui5-input-placeholder-color:var(--sapField_PlaceholderTextColor);--_ui5-input-bottom-border-height:0;--_ui5-input-bottom-border-color:transparent;--_ui5-input-focused-border-color:var(--sapField_Hover_BorderColor);--_ui5-input-focus-outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5-input-focus-outline-offset:-3px;--_ui5_input_state_border_width:0.125rem;--_ui5-input-information_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_information_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_error_warning_text_indent:0;--_ui5_input_information_text_indent:0;--_ui5_input_information_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_ReadOnly_BorderColor);--_ui5-input-disabled-background:var(--sapField_ReadOnly_Background);--_ui5_input_readonly_border_color:var(--sapField_ReadOnly_BorderColor);--_ui5-input-readonly-background:var(--sapField_ReadOnly_Background);--_ui5_input_icon_padding:0.625rem .6875rem;--_ui5_input_disabled_opacity:0.5;--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5-input-value-state-outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5-input-value-state-outline-offset:-4px;--_ui5-input-transition:none;--_ui5-input-value-state-icon-display:none;--_ui5-input-focused-value-state-error-background:var(--sapField_InvalidBackground);--_ui5-input-focused-value-state-warning-background:var(--sapField_WarningBackground);--_ui5-input-focused-value-state-success-background:var(--sapField_SuccessBackground);--_ui5-input-focused-value-state-information-background:var(--sapField_InformationBackground);--_ui5-input-value-state-error-border-color:var(--sapField_InvalidColor);--_ui5-input-focused-value-state-error-border-color:var(--sapField_InvalidColor);--_ui5-input-value-state-warning-border-color:var(--sapField_WarningColor);--_ui5-input-focused-value-state-warning-border-color:var(--sapField_WarningColor);--_ui5-input-value-state-success-border-color:var(--sapField_SuccessColor);--_ui5-input-focused-value-state-success-border-color:var(--sapField_SuccessColor);--_ui5-input-value-state-success-border-width:1px;--_ui5-input-value-state-information-border-color:var(--sapField_InformationColor);--_ui5-input-focused-value-state-information-border-color:var(--sapField_InformationColor);--_ui5-input-value-state-information-border-width:1px;--_ui5-input-background-image:none;--_ui5-input-information-background-image:none;--_ui5-input-success-background-image:none;--_ui5-input-error-background-image:none;--_ui5-input-warning-background-image:none;--_ui5_input_readonly_icon_display:none;--_ui5_input_height:2.25rem;--_ui5-input-border:1px solid var(--sapField_BorderColor);--_ui5_input_disabled_opacity:0.4;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_input_icon_color:var(--sapContent_IconColor);--_ui5_input_icon_pressed_color:var(--sapButton_Active_TextColor);--_ui5_input_icon_pressed_bg:var(--sapButton_Selected_Background);--_ui5_input_icon_hover_bg:var(--sapButton_Lite_Hover_Background);--_ui5_input_icon_border_radius:0;--_ui5_input_icon_box_shadow:none;--_ui5_input_icon_border:1px solid transparent;--_ui5_input_icon_margin:0;--_ui5_link_opacity:0.5;--_ui5_link_border:0.0625rem dotted transparent;--_ui5_link_border_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_link_focus_border-radius:0;--_ui5_link_opacity:0.4;--_ui5_link_text_decoration:none;--_ui5_link_hover_text_decoration:underline;--ui5_list_footer_text_color:var(--sapPageFooter_TextColor);--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--ui5-listitem-active-border-color:var(--sapContent_ContrastFocusColor);--_ui5_listitembase_focus_width:1px;--_ui5-listitembase_disabled_opacity:0.5;--_ui5_product_switch_item_border:none;--_ui5_monthpicker_item_border_radius:0;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_focus_after_border_radius:0;--_ui5_monthpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5_monthpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5_monthpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5_monthpicker_item_selected_box_shadow:none;--_ui5_monthpicker_item_focus_after_outline:none;--_ui5_monthpicker_item_selected_font_wieght:inherit;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_message_strip_icon_width:2.5rem;--_ui5_message_strip_border_radius:0.1875rem;--_ui5_message_strip_success_border_color:var(--sapSuccessBorderColor);--_ui5_message_strip_error_border_color:var(--sapErrorBorderColor);--_ui5_message_strip_warning_border_color:var(--sapWarningBorderColor);--_ui5_message_strip_information_border_color:var(--sapInformationBorderColor);--_ui5_message_strip_button_border_width:0;--_ui5_message_strip_button_border_style:none;--_ui5_message_strip_button_border_color:transparent;--_ui5_message_strip_button_border_radius:0;--_ui5_message_strip_padding:0.4375rem 2.5rem 0.4375rem 2.5rem;--_ui5_message_strip_padding_no_icon:0.4375rem 2.5rem 0.4375rem 1rem;--_ui5_message_strip_button_height:1.625rem;--_ui5_message_strip_border_width:1px;--_ui5_message_strip_close_button_border:none;--_ui5_message_strip_close_button_size:1.625rem;--_ui5_message_strip_icon_top:0.4375rem;--_ui5_message_strip_focus_width:1px;--_ui5_message_strip_focus_offset:-2px;--_ui5_panel_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_panel_header_height:3rem;--_ui5_panel_button_root_width:3rem;--_ui5_panel_background_color:var(--sapGroup_TitleBackground);--_ui5_panel_border_radius:0px;--_ui5_panel_border_radius_expanded:0;--_ui5_panel_border_bottom:1px solid var(--sapGroup_TitleBorderColor);--_ui5_panel_outline_offset:-3px;--_ui5_panel_title_font_weight:normal;--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popup_content_padding:.4375em;--_ui5_popup_viewport_margin:10px;--_ui5-popup-border-radius:0.25rem;--_ui5_popup_header_shadow:var(--sapContent_Shadow0);--_ui5_popup_footer_border_top:1px solid var(--sapPageFooter_BorderColor);--_ui5_popup_header_footer_font_weight:400;--_ui5_progress_indicator_background_none:var(--sapField_Background);--_ui5_progress_indicator_background_error:var(--sapField_Background);--_ui5_progress_indicator_background_warning:var(--sapField_Background);--_ui5_progress_indicator_background_success:var(--sapField_Background);--_ui5_progress_indicator_background_information:var(--sapField_Background);--_ui5_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5_progress_indicator_border_color_error:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_warning:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_success:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_information:var(--sapField_BorderColor);--_ui5_progress_indicator_color:var(--sapTextColor);--_ui5_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5_progress_indicator_bar_border_max:none;--_ui5_progress_indicator_icon_visibility:none;--_ui5_radio_button_min_width:2.75rem;--_ui5_radio_button_min_width_compact:2rem;--_ui5_radio_button_hover_fill:var(--sapField_Hover_Background);--_ui5_radio_button_border_width:1px;--_ui5_radio_button_checked_fill:var(--sapSelectedColor);--_ui5_radio_button_checked_error_fill:var(--sapField_InvalidColor);--_ui5_radio_button_checked_warning_fill:var(--sapField_TextColor);--_ui5_radio_button_warning_error_border_dash:0;--_ui5_radio_button_outer_ring_color:var(--sapField_BorderColor);--_ui5_radio_button_outer_ring_width:1;--_ui5_radio_button_outer_ring_bg:var(--sapField_Background);--_ui5_radio_button_outer_ring_hover_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_active_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_checked_hover_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_padding:0 0.625rem;--_ui5_radio_button_outer_ring_padding_with_label:0 0.625rem;--_ui5_radio_button_outer_ring_padding_rtl:0 0.625rem;--_ui5_radio_button_border_radius:0;--_ui5_radio_button_border:none;--_ui5_radio_button_focus_border:none;--_ui5_radio_button_focus_outline:block;--_ui5_radio_button_hover_shadow:none;--_ui5_radio_button_transition:none;--_ui5_radio_button_hover_background:inherit;--_ui5_radio_button_color:var(--sapField_BorderColor);--_ui5_radio_button_label_offset:1px;--_ui5_radio_button_label_color:var(--sapContent_LabelColor);--_ui5_radio_button_items_align:unset;--_ui5_radio_button_inner_width:initial;--_ui5_radio_button_border_readonly_focus_style:var(--sapContent_FocusStyle);--_ui5_segmented_btn_inner_border:0.0625rem solid var(--sapButton_Selected_BorderColor);--_ui5_segmented_btn_inner_border_odd_child:0;--_ui5_segmented_btn_inner_pressed_border_odd_child:0;--_ui5_segmented_btn_border_radius:0.35rem;--_ui5_segmented_btn_inner_border_radius:0;--_ui5_segmented_btn_background_color:transparent;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_select_label_olor:var(--sapField_TextColor);--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_no_label_width_horizon:3.875rem;--_ui5_switch_root_outline_top_bottom:0.25rem;--_ui5_switch_root_outline_left_right:-0.125rem;--_ui5_switch_root_outline_top_bottom_horizon:0.3125rem;--_ui5_switch_root_outline_left_right_horizon:-0.0625rem;--_ui5_switch_root_outline_top_bottom_hcb:0.1875rem;--_ui5_switch_root_outline_left_right_hcb:-0.1875rem;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_compact_no_label_width_horizon:3.5rem;--_ui5_switch_compact_root_outline_top_bottom:0.0625rem;--_ui5_switch_compact_root_outline_left_right:-0.125rem;--_ui5_switch_compact_root_outline_top_bottom_horizon:0.125em;--_ui5_switch_compact_root_outline_left_right_horizon:-0.125rem;--_ui5_switch_compact_root_outline_top_bottom_hcb:0;--_ui5_switch_compact_root_outline_left_right_hcb:-0.1875rem;--_ui5_switch_foucs_border_size:1px;--_ui5_switch_focus_outline:var(--_ui5_switch_foucs_border_size) dotted var(--sapContent_FocusColor);--_ui5_switch_root_after_boreder:var(--_ui5_switch_outline) dotted var(--sapContent_FocusColor);--_ui5-switch-root-border-radius:0;--_ui5-switch-root-box-shadow:none;--_ui5_switch_root_after_outline:none;--_ui5-switch-focus:"";--_ui5_switch_semantic_button_background:var(--sapButton_Background);--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_no_label_height_horizont:var(--_ui5_switch_track_height);--_ui5-switch-track-border:1px solid;--_ui5-switch-track-border_color:var(--sapContent_ForegroundBorderColor);--_ui5-switch_handle-off-hover_box_shadow:none;--_ui5-switch_handle-on-hover_box_shadow:none;--_ui5_switch_track_semantic_success_backgroud_color:var(--sapSuccessBackground);--_ui5_switch_track_semantic_error_backgroud_color:var(----sapErrorBackground);--_ui5_switch_track_semantic_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_semantic_not_checked_border_color:var(--sapErrorBorderColor);--_ui5_switch_track_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_hover_border_color:var(--sapButton_Hover_BorderColor);--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_hover_background_color:var(--sapButton_Track_Background);--_ui5_switch_track_hover_checked_background_color:var(--sapButton_Track_Selected_Background);--_ui5-switch_track-on-hover-background:var(--_ui5-switch_track-on-background);--_ui5_switch_track_border_radius:0.75rem;--_ui5-switch_track-off-background:var(--sapButton_Track_Background);--_ui5-switch_track-on-background:var(--sapButton_Track_Selected_Background);--_ui5-switch_track-off-hover-color:var(--_ui5-switch_track-off-background);--_ui5-switch-track-transition:none;--_ui5_switch_disabled_opacity:.4;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5-switch-track-icon-display:none;--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5-switch-handle-border:var(--_ui5_switch_handle_border_width) solid var(--sapContent_ForegroundBorderColor);--_ui5-switch-handle-left:-1px;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5-switch-handle-icon-display:none;--_ui5-switch-slider-texts-display:inline;--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height_text_only:var(--_ui5_tc_item_text_only_height);--_ui5_tc_header_height_text_with_additional_text:var(--_ui5_tc_item_text_only_with_additional_text_height);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.125rem solid var(--sapObjectHeader_Background);--_ui5_tc_headeritem_padding:0 1rem;--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItem_text_hover_color:var(--_ui5_tc_headerItem_color);--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headeritem_text_selected_hover_color:var(--sapSelectedColor);--_ui5_tc_headeritem_text_font_weight:normal;--_ui5_tc_headeritem_additional_text_font_weight:normal;--_ui5_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_neutral_selected_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_selected_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_selected_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_selected_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_transition:none;--_ui5_tc_headerItem_hover_border_visibility:hidden;--_ui5_tc_headerItem_focus_offset:0px;--_ui5_tc_headerItemContent_border_radius:0.125rem 0.125rem 0 0;--_ui5_tc_headerItemContent_border_bottom:0.125rem solid var(--sapSelectedColor);--_ui5_tc_headerItemContent_border_bg:transparent;--_ui5_tc_headerItem_neutral_border_bg:transparent;--_ui5_tc_headerItem_positive_border_bg:transparent;--_ui5_tc_headerItem_negative_border_bg:transparent;--_ui5_tc_headerItem_critical_border_bg:transparent;--_ui5_tc_headerItem_hover_border_bg:transparent;--_ui5_tc_headerItem_hover_selected_hover_border_bg:transparent;--_ui5_tc_headerItemContent_border_height:0;--_ui5_tc_headerItemContent_offset:1rem;--_ui5_tc_headerItemContent_focus_offset:1rem;--_ui5_tc_headerItem_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_tc_headerItemContent_padding:0;--_ui5_tc_headerItemContent_focus_border:none;--_ui5_tc_headerItemContent_default_focus_border:none;--_ui5_tc_headerItemContent_focus_border_radius:0;--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_headerItem_focus_border_radius:0px;--_ui5_tc_overflowItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5_tc_overflowItem_focus_border:0px;--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_content_border_bottom:0.125rem solid var(--sapObjectHeader_BorderColor);--_ui5_tc_headerItem_focus_border_offset:-2px;--_ui5_tc_headerItemIcon_focus_border_radius:0}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_tc_header_height:var(--_ui5_tc_item_height)}:root{--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItemContent_border_bottom:0.1875rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapNeutralTextColor);--_ui5_tc_overflowItem_current_color:CurrentColor;--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_state_border_width:0.125rem;--_ui5_textarea_background_image:none;--_ui5_textarea_error_background_image:none;--_ui5_textarea_warning_background_image:none;--_ui5_textarea_information_background_image:none;--_ui_textarea_success_background_image:none;--_ui5_textarea_focus_box_shadow:none;--_ui5_textarea_value_state_warning_focus_box_shadow:none;--_ui5_textarea_value_state_error_focus_box_shadow:none;--_ui5_textarea_value_state_success_focus_box_shadow:none;--_ui5_textarea_hover_box_shadow:none;--_ui5_textarea_inner_border_width:1px;--_ui5_textarea_success_border_width:1px;--_ui5_textarea_focus_outline:var(--_ui5_textarea_focus_after_width) dotted var(--sapContent_FocusColor);--_ui5_textarea_value_state_focus_outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5_textarea_after_element_display:none;--_ui5_textarea_placeholder_font_style:italic;--_ui5_input_warning_font_weight:normal;--_ui5-time_picker_border_radius:0;--_ui5_time_picker_border:0.0625rem solid transparent;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapList_BorderColor);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:240px;--_ui5_wheelslider_mobile_height:432px;--_ui5_wheelslider_item_width:48px;--_ui5_wheelslider_item_height:46px;--_ui5_wheelslider_arrows_visibility:hidden;--_ui_wheelslider_item_expanded_hover_color:var(--sapList_Hover_Background);--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_selected_positive_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_selected_negative_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_selected_attention_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_emphasized_pressed_focussed_hovered:var(--sapContent_FocusColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_border_radius:0;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_focus_after_border_radius:0;--_ui5_yearpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5_yearpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5_yearpicker_item_selected_box_shadow:none;--_ui5_yearpicker_item_focus_after_outline:none;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.25rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.25rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:1px;--_ui5_calendar_header_middle_button_focus_after_left_offset:1px;--_ui5_calendar_header_button_background_color:none;--_ui5_calendar_header_arrow_button_box_shadow:none;--_ui5_calendar_header_middle_button_focus_background:transparent;--_ui5_calendar_header_middle_button_focus_outline:none;--_ui5_calendar_header_middle_button_focus_active_outline:none;--_ui5_calendar_header_middle_button_focus_active_background:var(--sapButton_Active_Background);--_ui5_calendar_header_middle_button_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_bottom_border:1px solid var(--sapList_BorderColor);--ui5_table_header_row_outline_width:1px;--ui5_table_multiselect_column_width:2.75rem;--ui5_table_header_row_font_weight:normal;--ui5_table_row_outline_width:1px;--_ui5_load_more_padding:0;--_ui5_load_more_border:1px top solid transparent;--_ui5_load_more_border_radius:none;--_ui5_load_more_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_Background);--_ui5_token_readonly_background:var(--sapButton_Background);--_ui5_token_border_radius:0.125rem;--_ui5_token_text_color:var(--sapButton_TextColor);--_ui5_token_hover_background:var(--sapButton_Hover_Background);--_ui5_token_hover_border_color:var(--sapButton_Hover_BorderColor);--_ui5_token_top_margin:0;--_ui5_token_bottom_margin:0;--_ui5_token_selected_focus_outline:var(--_ui5_token_focus_outline_width) dotted var(--sapContent_ContrastFocusColor);--_ui5_token_focus_outline:var(--_ui5_token_focus_outline_width) dotted var(--sapContent_FocusColor);--_ui5_token_selected_hover_background:var(--sapButton_Selected_Hover_Background);--_ui5_token_selected_hover_border_color:var(--sapButton_Selected_Hover_BorderColor);--_ui5_token_selected_box_shadow:none;--_ui5_token_focused_border:1px solid var(--sapButton_TokenBorderColor);--_ui5_token_focused_selected_border:1px solid var(--sapButton_Selected_BorderColor);--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_focus_outline_width:0.0625rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5_tokenizer_n_more_indicator_font_weight:normal;--_ui5_tokenizer_n_more_indicator_color:var(--sapField_TextColor);--_ui5_value_state_message_border:none;--_ui5_value_state_message_focus_border_radius:0;--_ui5_input_value_state_icon_display:none;--_ui5_value_state_message_padding:0.5rem;--_ui5_value_state_header_padding:.5625rem 1rem;--_ui5-multi_combobox_token_margin_top:3px;--_ui5-multi_combobox_token_margin_top:1px;--_ui5_slider_progress_container_background:var(--sapField_BorderColor);--_ui5_slider_progress_container_dot_display:none;--_ui5_slider_progress_container_dot_background:var(--sapField_BorderColor);--_ui5_slider_progress_border:none;--_ui5_slider_inner_height:0.25rem;--_ui5_slider_outer_height:1.6875rem;--_ui5_slider_progress_border_radius:0.25rem;--_ui5_slider_progress_background:var(--sapActiveColor);--_ui5_slider_handle_icon_display:none;--_ui5_slider_handle_height:1.625rem;--_ui5_slider_handle_width:1.625rem;--_ui5_slider_handle_border:solid 0.125rem var(--sapField_BorderColor);--_ui5_slider_handle_border_radius:1rem;--_ui5_slider_handle_box_shadow:none;--_ui5_slider_handle_box_shadow_focus:none;--_ui5_slider_handle_background:var(--sapButton_Background);--_ui5_range_slider_handle_background:#fff;--_ui5_slider_handle_top:-0.825rem;--_ui5_slider_handle_margin_left:-0.9725rem;--_ui5_slider_handle_hover_background:var(--sapButton_Hover_Background);--_ui5_slider_handle_hover_border:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5_slider_handle_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_slider_handle_focus_border:var(--_ui5_slider_handle_hover_border);--_ui5_slider_handle_active_border:var(--_ui5_slider_handle_hover_border);--_ui5_slider_handle_focused_top:var(--_ui5_slider_handle_top);--_ui5_slider_handle_focused_margin_left:var(--_ui5_slider_handle_margin_left);--_ui5_slider_handle_outline_offset:0.075rem;--_ui5_slider_icon_left:0.5rem;--_ui5_slider_icon_top:0.125rem;--_ui5_range_slider_handle_hover_background:rgba(var(--sapButton_Background),0.25);--_ui5_range_slider_handle_hover_icon_display:none;--_ui5_slider_progress_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_slider_progress_outline_offset:-0.8125rem;--_ui5_slider_tickmark_top:-0.375rem;--_ui5_slider_disabled_opacity:0.4;--_ui5_slider_tooltip_fontsize:var(--sapFontSmallSize);--_ui5_slider_tooltip_color:var(--sapContent_LabelColor);--_ui5_slider_tooltip_background:var(--sapField_Background);--_ui5_slider_tooltip_border_radius:var(--sapElement_BorderCornerRadius);--_ui5_slider_tooltip_border_color:var(--sapField_BorderColor);--_ui5_slider_tooltip_border:0.0625rem solid var(--_ui5_slider_tooltip_border_color);--_ui5_slider_tooltip_box_shadow:none;--_ui5_slider_tooltip_padding:0.4125rem;--_ui5_slider_tooltip_height:1rem;--_ui5_slider_tooltip_min_width:2rem;--_ui5_slider_tooltip_bottom:2rem;--_ui5_slider_label_fontsize:var(--sapFontSmallSize);--_ui5_slider_label_color:var(--sapContent_LabelColor);--_ui5_range_slider_progress_focus_display:none;--_ui5_range_slider_progress_focus_top:-1.063rem;--_ui5_range_slider_progress_focus_left:-1.438rem;--_ui5_range_slider_progress_focus_padding:0 1.375rem 0 1.438rem;--_ui5_range_slider_progress_focus_height:2rem;--_ui5_range_slider_legacy_progress_focus_display:block;--_ui5_slider_inner_min_width:4rem;--_ui5_suggestions_item_focus_border_radius:0;--_ui5_step_input_input_error_background_color:var(--sapField_InvalidBackground);--_ui5-step_input_button_state_hover_background_color:var(--sapField_Background);--_ui5_step_input_border_style:1px solid var(--sapField_BorderColor);--_ui5_step_input_border_style_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5_step_input_button_background_color:var(--sapField_Background);--_ui5_step_input_input_border:1px solid transparent;--_ui5_step_input_input_margin_top:-0.0625rem;--_ui5_step_input_button_display:inline-block;--_ui5_step_input_button_left:0;--_ui5_step_input_button_right:0;--_ui5_step_input_input_border_focused_after:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5_step_input_input_border_top_bottom_focused_after:0.0625rem;--_ui5_step_input_input_border_radius_focused_after:0;--_ui5_step_input_input_information_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_warning_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_success_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_error_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_disabled_button_background:var(--sapField_ReadOnly_Background);--_ui5_step_input_border_color_hover:var(--sapField_Hover_Background);--_ui5_step_input_border_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5_input_input_background_color:var(--sapField_InvalidBackground)}' };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var titleCss = { packageName: "@ui5/webcomponents", fileName: "themes/Title.css", content: ':host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-size:var(--ui5_title_level_2Size);font-family:"72override",var(--sapFontFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;font-size:inherit;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host([wrapping-type=Normal]) .ui5-title-root{white-space:pre-line}:host([level=H1]){font-size:var(--ui5_title_level_1Size)}:host([level=H2]){font-size:var(--ui5_title_level_2Size)}:host([level=H3]){font-size:var(--ui5_title_level_3Size)}:host([level=H4]){font-size:var(--ui5_title_level_4Size)}:host([level=H5]){font-size:var(--ui5_title_level_5Size)}:host([level=H6]){font-size:var(--ui5_title_level_6Size)}' };
const metadata$e = {
  tag: "ui5-title",
  properties: {
    wrappingType: {
      type: WrappingType,
      defaultValue: WrappingType.None
    },
    level: {
      type: TitleLevel,
      defaultValue: TitleLevel.H2
    }
  },
  slots: {
    "default": {
      type: Node
    }
  }
};
class Title extends UI5Element {
  static get metadata() {
    return metadata$e;
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$f;
  }
  static get styles() {
    return titleCss;
  }
  get normalizedLevel() {
    return this.level.toLowerCase();
  }
  get h1() {
    return this.normalizedLevel === "h1";
  }
  get h2() {
    return this.normalizedLevel === "h2";
  }
  get h3() {
    return this.normalizedLevel === "h3";
  }
  get h4() {
    return this.normalizedLevel === "h4";
  }
  get h5() {
    return this.normalizedLevel === "h5";
  }
  get h6() {
    return this.normalizedLevel === "h6";
  }
}
Title.define();
const KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  OPEN_BRACKET: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
};
const isEnter = (event) => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);
const isSpace = (event) => (event.key ? event.key === "Spacebar" || event.key === " " : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);
const isSpaceShift = (event) => (event.key ? event.key === "Spacebar" || event.key === " " : event.keyCode === KeyCodes.SPACE) && checkModifierKeys(event, false, false, true);
const isLeft = (event) => (event.key ? event.key === "ArrowLeft" || event.key === "Left" : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);
const isRight = (event) => (event.key ? event.key === "ArrowRight" || event.key === "Right" : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);
const isUp = (event) => (event.key ? event.key === "ArrowUp" || event.key === "Up" : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);
const isDown = (event) => (event.key ? event.key === "ArrowDown" || event.key === "Down" : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);
const isUpShift = (event) => (event.key ? event.key === "ArrowUp" || event.key === "Up" : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, false, false, true);
const isDownShift = (event) => (event.key ? event.key === "ArrowDown" || event.key === "Down" : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, false, false, true);
const isLeftShift = (event) => (event.key ? event.key === "ArrowLeft" || event.key === "Left" : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, false, false, true);
const isRightShift = (event) => (event.key ? event.key === "ArrowRight" || event.key === "Right" : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, false, false, true);
const isHome = (event) => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);
const isEnd = (event) => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);
const isEscape = (event) => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);
const isTabPrevious = (event) => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event, false, false, true);
const isPageUp = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event);
const isPageDown = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event);
const hasModifierKeys = (event) => event.shiftKey || event.altKey || getCtrlKey(event);
const getCtrlKey = (event) => !!(event.metaKey || event.ctrlKey);
const checkModifierKeys = (event, bCtrlKey, bAltKey, bShiftKey) => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;
const findNodeOwner = (node) => {
  if (!(node instanceof HTMLElement)) {
    throw new Error("Argument node should be of type HTMLElement");
  }
  const ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
  let currentShadowRootFlag = true;
  let currentCustomElementFlag = true;
  while (node) {
    if (node.toString() === "[object ShadowRoot]") {
      if (currentShadowRootFlag) {
        currentShadowRootFlag = false;
      }
      if (!currentCustomElementFlag && !currentShadowRootFlag) {
        return node;
      }
    } else if (node.tagName && node.tagName.indexOf("-") > -1) {
      if (currentCustomElementFlag) {
        currentCustomElementFlag = false;
      } else {
        return node;
      }
    } else if (ownerTypes.indexOf(node.constructor) > -1) {
      return node;
    }
    node = node.parentNode || node.host;
  }
};
const getEffectiveAriaLabelText = (el) => {
  if (!el.accessibleNameRef) {
    if (el.accessibleName) {
      return el.accessibleName;
    }
    return void 0;
  }
  return getAriaLabelledByTexts(el);
};
const getAriaLabelledByTexts = (el, ownerDocument, readyIds = "") => {
  const ids = readyIds && readyIds.split(" ") || el.accessibleNameRef.split(" ");
  const owner = ownerDocument || findNodeOwner(el);
  let result = "";
  ids.forEach((elementId, index) => {
    const element = owner.querySelector(`[id='${elementId}']`);
    result += `${element ? element.textContent : ""}`;
    if (index < ids.length - 1) {
      result += " ";
    }
  });
  return result;
};
const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
class Locale {
  constructor(sLocaleId) {
    const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
    if (aResult === null) {
      throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
    }
    this.sLocaleId = sLocaleId;
    this.sLanguage = aResult[1] || null;
    this.sScript = aResult[2] || null;
    this.sRegion = aResult[3] || null;
    this.sVariant = aResult[4] && aResult[4].slice(1) || null;
    this.sExtension = aResult[5] && aResult[5].slice(1) || null;
    this.sPrivateUse = aResult[6] || null;
    if (this.sLanguage) {
      this.sLanguage = this.sLanguage.toLowerCase();
    }
    if (this.sScript) {
      this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, (s2) => {
        return s2.toUpperCase();
      });
    }
    if (this.sRegion) {
      this.sRegion = this.sRegion.toUpperCase();
    }
  }
  getLanguage() {
    return this.sLanguage;
  }
  getScript() {
    return this.sScript;
  }
  getRegion() {
    return this.sRegion;
  }
  getVariant() {
    return this.sVariant;
  }
  getVariantSubtags() {
    return this.sVariant ? this.sVariant.split("-") : [];
  }
  getExtension() {
    return this.sExtension;
  }
  getExtensionSubtags() {
    return this.sExtension ? this.sExtension.slice(2).split("-") : [];
  }
  getPrivateUse() {
    return this.sPrivateUse;
  }
  getPrivateUseSubtags() {
    return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
  }
  hasPrivateUseSubtag(sSubtag) {
    return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
  }
  toString() {
    const r2 = [this.sLanguage];
    if (this.sScript) {
      r2.push(this.sScript);
    }
    if (this.sRegion) {
      r2.push(this.sRegion);
    }
    if (this.sVariant) {
      r2.push(this.sVariant);
    }
    if (this.sExtension) {
      r2.push(this.sExtension);
    }
    if (this.sPrivateUse) {
      r2.push(this.sPrivateUse);
    }
    return r2.join("-");
  }
}
const cache = new Map();
const getLocaleInstance = (lang) => {
  if (!cache.has(lang)) {
    cache.set(lang, new Locale(lang));
  }
  return cache.get(lang);
};
const convertToLocaleOrNull = (lang) => {
  try {
    if (lang && typeof lang === "string") {
      return getLocaleInstance(lang);
    }
  } catch (e2) {
  }
};
const getLocale = (lang) => {
  if (lang) {
    return convertToLocaleOrNull(lang);
  }
  if (getLanguage()) {
    return getLocaleInstance(getLanguage());
  }
  return convertToLocaleOrNull(detectNavigatorLanguage());
};
const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
const M_ISO639_NEW_TO_OLD = {
  "he": "iw",
  "yi": "ji",
  "id": "in",
  "sr": "sh"
};
const normalizeLocale = (locale) => {
  let m2;
  if (!locale) {
    return DEFAULT_LOCALE;
  }
  if (typeof locale === "string" && (m2 = localeRegEX.exec(locale.replace(/_/g, "-")))) {
    let language2 = m2[1].toLowerCase();
    let region = m2[3] ? m2[3].toUpperCase() : void 0;
    const script = m2[2] ? m2[2].toLowerCase() : void 0;
    const variants = m2[4] ? m2[4].slice(1) : void 0;
    const isPrivate = m2[6];
    language2 = M_ISO639_NEW_TO_OLD[language2] || language2;
    if (isPrivate && (m2 = SAPSupportabilityLocales.exec(isPrivate)) || variants && (m2 = SAPSupportabilityLocales.exec(variants))) {
      return `en_US_${m2[1].toLowerCase()}`;
    }
    if (language2 === "zh" && !region) {
      if (script === "hans") {
        region = "CN";
      } else if (script === "hant") {
        region = "TW";
      }
    }
    return language2 + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : "");
  }
};
const nextFallbackLocale = (locale) => {
  if (!locale) {
    return DEFAULT_LOCALE;
  }
  if (locale === "zh_HK") {
    return "zh_TW";
  }
  const p2 = locale.lastIndexOf("_");
  if (p2 >= 0) {
    return locale.slice(0, p2);
  }
  return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};
const warningShown = new Set();
const reportedErrors = new Set();
const bundleData = new Map();
const bundlePromises = new Map();
const loaders = new Map();
const _setI18nBundleData = (packageName2, data) => {
  bundleData.set(packageName2, data);
};
const getI18nBundleData = (packageName2) => {
  return bundleData.get(packageName2);
};
const _hasLoader = (packageName2, localeId) => {
  const bundleKey = `${packageName2}/${localeId}`;
  return loaders.has(bundleKey);
};
const _loadMessageBundleOnce = (packageName2, localeId) => {
  const bundleKey = `${packageName2}/${localeId}`;
  const loadMessageBundle = loaders.get(bundleKey);
  if (!bundlePromises.get(bundleKey)) {
    bundlePromises.set(bundleKey, loadMessageBundle(localeId));
  }
  return bundlePromises.get(bundleKey);
};
const _showAssetsWarningOnce = (packageName2) => {
  if (!warningShown.has(packageName2)) {
    console.warn(`[${packageName2}]: Message bundle assets are not configured. Falling back to English texts.`, ` Add \`import "${packageName2}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`);
    warningShown.add(packageName2);
  }
};
const fetchI18nBundle = async (packageName2) => {
  const language2 = getLocale().getLanguage();
  const region = getLocale().getRegion();
  let localeId = normalizeLocale(language2 + (region ? `-${region}` : ``));
  while (localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName2, localeId)) {
    localeId = nextFallbackLocale(localeId);
  }
  const fetchDefaultLanguage2 = getFetchDefaultLanguage();
  if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage2) {
    _setI18nBundleData(packageName2, null);
    return;
  }
  if (!_hasLoader(packageName2, localeId)) {
    _showAssetsWarningOnce(packageName2);
    return;
  }
  try {
    const data = await _loadMessageBundleOnce(packageName2, localeId);
    _setI18nBundleData(packageName2, data);
  } catch (e2) {
    if (!reportedErrors.has(e2.message)) {
      reportedErrors.add(e2.message);
      console.error(e2.message);
    }
  }
};
attachLanguageChange(() => {
  const allPackages = [...bundleData.keys()];
  return Promise.all(allPackages.map(fetchI18nBundle));
});
const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
const formatMessage = (text, values) => {
  values = values || [];
  return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
    if ($1) {
      return "'";
    }
    if ($2) {
      return $2.replace(/''/g, "'");
    }
    if ($3) {
      return String(values[parseInt($3)]);
    }
    throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
  });
};
const I18nBundleInstances = new Map();
class I18nBundle {
  constructor(packageName2) {
    this.packageName = packageName2;
  }
  getText(textObj, ...params) {
    if (typeof textObj === "string") {
      textObj = { key: textObj, defaultText: textObj };
    }
    if (!textObj || !textObj.key) {
      return "";
    }
    const bundle = getI18nBundleData(this.packageName);
    if (bundle && !bundle[textObj.key]) {
      console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`);
    }
    const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText || textObj.key;
    return formatMessage(messageText, params);
  }
}
const getI18nBundleSync = (packageName2) => {
  if (I18nBundleInstances.has(packageName2)) {
    return I18nBundleInstances.get(packageName2);
  }
  const i18nBundle = new I18nBundle(packageName2);
  I18nBundleInstances.set(packageName2, i18nBundle);
  return i18nBundle;
};
const getI18nBundle = async (packageName2) => {
  await fetchI18nBundle(packageName2);
  return getI18nBundleSync(packageName2);
};
const ua = navigator.userAgent;
const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const ie = /(msie|trident)/i.test(ua);
const chrome = !ie && /(Chrome|CriOS)/.test(ua);
const safari = !ie && !chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(ua);
const webkit = !ie && /webkit/.test(ua);
const windows = navigator.platform.indexOf("Win") !== -1;
const iOS = navigator.platform.match(/iPhone|iPad|iPod/) || navigator.userAgent.match(/Mac/) && "ontouchend" in document;
const android = !windows && /Android/.test(ua);
const androidPhone = android && /(?=android)(?=.*mobile)/i.test(ua);
const ipad = /ipad/i.test(ua);
let windowsVersion;
let webkitVersion;
let tablet;
const isWindows8OrAbove = () => {
  if (!windows) {
    return false;
  }
  if (windowsVersion === void 0) {
    const matches = ua.match(/Windows NT (\d+).(\d)/);
    windowsVersion = matches ? parseFloat(matches[1]) : 0;
  }
  return windowsVersion >= 8;
};
const isWebkit537OrAbove = () => {
  if (!webkit) {
    return false;
  }
  if (webkitVersion === void 0) {
    const matches = ua.match(/(webkit)[ /]([\w.]+)/);
    webkitVersion = matches ? parseFloat(matches[1]) : 0;
  }
  return webkitVersion >= 537.1;
};
const detectTablet = () => {
  if (tablet !== void 0) {
    return;
  }
  if (ipad) {
    tablet = true;
    return;
  }
  if (touch) {
    if (isWindows8OrAbove()) {
      tablet = true;
      return;
    }
    if (chrome && android) {
      tablet = !/Mobile Safari\/[.0-9]+/.test(ua);
      return;
    }
    let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1;
    if (android && isWebkit537OrAbove()) {
      densityFactor = 1;
    }
    tablet = Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600;
    return;
  }
  tablet = ie && ua.indexOf("Touch") !== -1 || android && !androidPhone;
};
const isIE = () => ie;
const isSafari = () => safari;
const isChrome = () => chrome;
const isTablet = () => {
  detectTablet();
  return (touch || isWindows8OrAbove()) && tablet;
};
const isPhone = () => {
  detectTablet();
  return touch && !tablet;
};
const isDesktop = () => {
  return !isTablet() && !isPhone() || isWindows8OrAbove();
};
const isCombi = () => {
  return isTablet() && isDesktop();
};
const isIOS = () => {
  return iOS;
};
const ButtonTypes = {
  Default: "Default",
  Positive: "Positive",
  Negative: "Negative",
  Transparent: "Transparent",
  Emphasized: "Emphasized",
  Attention: "Attention"
};
class ButtonDesign extends DataType {
  static isValid(value) {
    return !!ButtonTypes[value];
  }
}
ButtonDesign.generateTypeAccessors(ButtonTypes);
const block0$e = (context, tags, suffix) => l$1`<button type="button" class="ui5-button-root" ?disabled="${context.disabled}" data-sap-focus-ref  dir="${l(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @touchstart="${context._ontouchstart}" @touchend="${context._ontouchend}" tabindex=${l(context.tabIndexValue)} aria-expanded="${l(context.accInfo.ariaExpanded)}" aria-controls="${l(context.accInfo.ariaControls)}" aria-haspopup="${l(context.accInfo.ariaHaspopup)}" aria-label="${l(context.ariaLabelText)}" title="${l(context.accInfo.title)}" part="button">${context.icon ? block1$a(context, tags, suffix) : void 0}<span id="${l(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${context.hasButtonType ? block2$7(context) : void 0}</button> `;
const block1$a = (context, tags, suffix) => l$1`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l(context.icon)}" part="icon" ?show-tooltip=${context.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>`;
const block2$7 = (context, tags, suffix) => l$1`<span class="ui5-hidden-text">${l(context.buttonTypeText)}</span>`;
const block0$d = (context, tags, suffix) => l$1`<svg class="ui5-icon-root" tabindex="${l(context.tabIndex)}" dir="${l(context._dir)}" viewBox="0 0 512 512" role="${l(context.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${l(context.effectiveAccessibleName)}" aria-hidden=${l(context.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick}>${blockSVG1(context)}</svg>`;
const block1$9 = (context, tags, suffix) => s$1`<title id="${l(context._id)}-tooltip">${l(context.effectiveAccessibleName)}</title>`;
const blockSVG1 = (context, tags, suffix) => s$1`${context.hasIconTooltip ? block1$9(context) : void 0}<g role="presentation"><path d="${l(context.pathData)}"/></g>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var iconCss = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css", content: ":host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}.ui5-icon-root{display:flex;outline:none;vertical-align:top}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scaleX(-1);transform-origin:center}" };
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";
const metadata$d = {
  tag: "ui5-icon",
  languageAware: true,
  themeAware: true,
  properties: {
    interactive: {
      type: Boolean
    },
    name: {
      type: String
    },
    accessibleName: {
      type: String
    },
    showTooltip: {
      type: Boolean
    },
    accessibleRole: {
      type: String
    },
    ariaHidden: {
      type: String
    },
    pathData: {
      type: String,
      noAttribute: true
    },
    accData: {
      type: Object,
      noAttribute: true
    },
    focused: {
      type: Boolean
    },
    invalid: {
      type: Boolean
    },
    effectiveAccessibleName: {
      type: String,
      defaultValue: void 0,
      noAttribute: true
    }
  },
  events: {
    click: {}
  }
};
class Icon extends UI5Element {
  static get metadata() {
    return metadata$d;
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$d;
  }
  static get styles() {
    return iconCss;
  }
  static async onDefine() {
    this.createGlobalStyle();
  }
  _onFocusInHandler(event) {
    if (this.interactive) {
      this.focused = true;
    }
  }
  _onFocusOutHandler(event) {
    this.focused = false;
  }
  _onkeydown(event) {
    if (!this.interactive) {
      return;
    }
    if (isEnter(event)) {
      this.fireEvent("click");
    }
    if (isSpace(event)) {
      event.preventDefault();
    }
  }
  _onkeyup(event) {
    if (this.interactive && isSpace(event)) {
      this.fireEvent("click");
    }
  }
  _onClickHandler(event) {
    event.stopPropagation();
    this.fireEvent("click");
  }
  get _dir() {
    if (!this.effectiveDir) {
      return;
    }
    if (this.ltr) {
      return "ltr";
    }
    return this.effectiveDir;
  }
  get effectiveAriaHidden() {
    if (this.ariaHidden === "") {
      if (this.isDecorative) {
        return true;
      }
      return;
    }
    return this.ariaHidden;
  }
  get tabIndex() {
    return this.interactive ? "0" : void 0;
  }
  get isDecorative() {
    return this.effectiveAccessibleRole === PRESENTATION_ROLE;
  }
  get effectiveAccessibleRole() {
    if (this.accessibleRole) {
      return this.accessibleRole;
    }
    if (this.interactive) {
      return "button";
    }
    return this.effectiveAccessibleName ? "img" : PRESENTATION_ROLE;
  }
  static createGlobalStyle() {
    if (isLegacyBrowser()) {
      const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
      if (!styleElement) {
        createStyleInHead(`ui5-icon { display: none !important; }`, { "data-ui5-icon-global": "" });
      }
    }
  }
  static removeGlobalStyle() {
    if (isLegacyBrowser()) {
      const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    }
  }
  async onBeforeRendering() {
    const name2 = this.name;
    if (!name2) {
      return console.warn("Icon name property is required", this);
    }
    let iconData = getIconDataSync(name2);
    if (!iconData) {
      iconData = await getIconData(name2);
    }
    if (iconData === ICON_NOT_FOUND) {
      this.invalid = true;
      return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name2.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
    }
    if (!iconData) {
      this.invalid = true;
      return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
    }
    this.invalid = false;
    this.pathData = iconData.pathData;
    this.accData = iconData.accData;
    this.ltr = iconData.ltr;
    this.packageName = iconData.packageName;
    this._onclick = this.interactive ? this._onClickHandler.bind(this) : void 0;
    this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : void 0;
    this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : void 0;
    if (this.accessibleName) {
      this.effectiveAccessibleName = this.accessibleName;
    } else if (this.accData) {
      const i18nBundle = await getI18nBundle(this.packageName);
      this.effectiveAccessibleName = i18nBundle.getText(this.accData) || void 0;
    }
  }
  get hasIconTooltip() {
    return this.showTooltip && this.effectiveAccessibleName;
  }
  async onEnterDOM() {
    setTimeout(() => {
      this.constructor.removeGlobalStyle();
    }, 0);
  }
}
Icon.define();
const BUTTON_ARIA_TYPE_ACCEPT = { key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action" };
const BUTTON_ARIA_TYPE_REJECT = { key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action" };
const BUTTON_ARIA_TYPE_EMPHASIZED = { key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized" };
const RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON = { key: "RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON", defaultText: "Decline" };
const SEGMENTEDBUTTON_ARIA_DESCRIPTION = { key: "SEGMENTEDBUTTON_ARIA_DESCRIPTION", defaultText: "Segmented button group" };
const SEGMENTEDBUTTON_ARIA_DESCRIBEDBY = { key: "SEGMENTEDBUTTON_ARIA_DESCRIBEDBY", defaultText: "Press SPACE or ENTER to select an item" };
const SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION = { key: "SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION", defaultText: "Segmented button" };
const SWITCH_ON = { key: "SWITCH_ON", defaultText: "On" };
const SWITCH_OFF = { key: "SWITCH_OFF", defaultText: "Off" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var buttonCss = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css", content: '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);line-height:normal;font-family:var(--_ui5_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background);box-shadow:var(--sapContent_Interaction_Shadow)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}:host([design=Emphasized][focused]){outline:var(--_ui5_button_emphasized_outline)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([ui5-button]:not([design=Emphasized])[active]:not([_is-touch])){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);box-shadow:var(--sapContent_Positive_Shadow)}:host([ui5-button][design=Positive][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor);text-shadow:none}:host([design=Positive][focused]:not([_is-touch])){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);box-shadow:var(--sapContent_Negative_Shadow)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([ui5-button][design=Negative][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Attention]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor);box-shadow:var(--sapContent_Critical_Shadow)}:host([ui5-button][design=Attention][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor);text-shadow:none}:host([design=Attention][focused]:not([_is-touch])){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_attention_focus_border_color)}:host([design=Attention][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);box-shadow:var(--sapContent_Informative_Shadow)}:host([ui5-button][design=Empasized][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]) .ui5-button-root:after{content:"";position:absolute;box-sizing:border-box;left:.0625rem;top:.0625rem;right:.0625rem;bottom:.0625rem;border:var(--_ui5_button_emphasized_focused_border);pointer-events:none;border-radius:var(--_ui5_button_emphasized_focused_border_radius)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--sapButton_Lite_BorderColor)}:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--_ui5_button_transparent_hover)}:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered){background-color:var(--_ui5_button_transparent_hover);border-color:var(--sapButton_Lite_Hover_BorderColor);box-shadow:var(--sapContent_Critical_Shadow)}:host([ui5-button][design=Transparent][active]:not([non-interactive])){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--sapButton_Lite_Hover_BorderColor)}' };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var buttonIECss = { packageName: "@ui5/webcomponents", fileName: "themes/Button.ie11.css", content: '[ui5-button][focused]{outline:none}[ui5-button][focused] .ui5-button-root{position:relative}[ui5-button][focused] .ui5-button-root:after{content:"";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}[ui5-button][active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button] [ui5-icon].ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}' };
let isGlobalHandlerAttached = false;
let activeButton = null;
const metadata$c = {
  tag: "ui5-button",
  languageAware: true,
  properties: {
    design: {
      type: ButtonDesign,
      defaultValue: ButtonDesign.Default
    },
    disabled: {
      type: Boolean
    },
    icon: {
      type: String
    },
    iconEnd: {
      type: Boolean
    },
    submits: {
      type: Boolean
    },
    title: {
      type: String
    },
    active: {
      type: Boolean
    },
    iconOnly: {
      type: Boolean
    },
    focused: {
      type: Boolean
    },
    hasIcon: {
      type: Boolean
    },
    accessibleName: {
      type: String,
      defaultValue: void 0
    },
    accessibleNameRef: {
      type: String,
      defaultValue: ""
    },
    ariaExpanded: {
      type: String
    },
    nonInteractive: {
      type: Boolean
    },
    _iconSettings: {
      type: Object
    },
    _buttonAccInfo: {
      type: Object
    },
    _tabIndex: {
      type: String,
      defaultValue: "0",
      noAttribute: true
    },
    _isTouch: {
      type: Boolean
    }
  },
  managedSlots: true,
  slots: {
    "default": {
      type: Node
    }
  },
  events: {
    click: {}
  }
};
class Button extends UI5Element {
  static get metadata() {
    return metadata$c;
  }
  static get styles() {
    return [buttonCss, isLegacyBrowser() && buttonIECss];
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$e;
  }
  static get dependencies() {
    return [Icon];
  }
  constructor() {
    super();
    this._deactivate = () => {
      if (activeButton) {
        activeButton.active = false;
      }
    };
    if (!isGlobalHandlerAttached) {
      document.addEventListener("mouseup", this._deactivate);
      isGlobalHandlerAttached = true;
    }
  }
  onEnterDOM() {
    this._isTouch = (isPhone() || isTablet()) && !isCombi();
  }
  onBeforeRendering() {
    const FormSupport = getFeature("FormSupport");
    if (this.submits && !FormSupport) {
      console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
    this.iconOnly = this.isIconOnly;
    this.hasIcon = !!this.icon;
  }
  _onclick(event) {
    if (this.nonInteractive) {
      return;
    }
    event.isMarked = "button";
    const FormSupport = getFeature("FormSupport");
    if (FormSupport) {
      FormSupport.triggerFormSubmit(this);
    }
    if (isSafari()) {
      this.getDomRef().focus();
    }
  }
  _onmousedown(event) {
    if (this.nonInteractive || this._isTouch) {
      return;
    }
    event.isMarked = "button";
    this.active = true;
    activeButton = this;
  }
  _ontouchstart(event) {
    event.isMarked = "button";
    if (this.nonInteractive) {
      return;
    }
    this.active = true;
  }
  _ontouchend(event) {
    this.active = false;
    if (activeButton) {
      activeButton.active = false;
    }
  }
  _onmouseup(event) {
    event.isMarked = "button";
  }
  _onkeydown(event) {
    event.isMarked = "button";
    if (isSpace(event) || isEnter(event)) {
      this.active = true;
    }
  }
  _onkeyup(event) {
    if (isSpace(event) || isEnter(event)) {
      this.active = false;
    }
  }
  _onfocusout(_event) {
    if (this.nonInteractive) {
      return;
    }
    this.active = false;
    this.focused = false;
  }
  _onfocusin(event) {
    if (this.nonInteractive) {
      return;
    }
    event.isMarked = "button";
    this.focused = true;
  }
  get hasButtonType() {
    return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
  }
  get isIconOnly() {
    return !Array.from(this.childNodes).filter((node) => {
      return node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim().length !== 0);
    }).length;
  }
  get accInfo() {
    return {
      "ariaExpanded": this.ariaExpanded || this._buttonAccInfo && this._buttonAccInfo.ariaExpanded,
      "ariaControls": this._buttonAccInfo && this._buttonAccInfo.ariaControls,
      "ariaHaspopup": this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
      "title": this.title || this._buttonAccInfo && this._buttonAccInfo.title
    };
  }
  static typeTextMappings() {
    return {
      "Positive": BUTTON_ARIA_TYPE_ACCEPT,
      "Negative": BUTTON_ARIA_TYPE_REJECT,
      "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED
    };
  }
  get buttonTypeText() {
    return Button.i18nBundle.getText(Button.typeTextMappings()[this.design]);
  }
  get tabIndexValue() {
    const tabindex = this.getAttribute("tabindex");
    if (tabindex) {
      return tabindex;
    }
    return this.nonInteractive ? "-1" : this._tabIndex;
  }
  get showIconTooltip() {
    return this.iconOnly && !this.title;
  }
  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }
  static async onDefine() {
    Button.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
}
Button.define();
const block0$c = (context, tags, suffix) => l$1`<label class="ui5-label-root" dir="${l(context.effectiveDir)}" @click=${context._onclick} for="${l(context.for)}"><span class="${o(context.classes.textWrapper)}"><bdi id="${l(context._id)}-bdi"><slot></slot></bdi></span><span class="ui5-label-required-colon"></span></label>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var labelCss = { packageName: "@ui5/webcomponents", fileName: "themes/Label.css", content: ':host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}.ui5-label-root{width:100%;cursor:inherit}:host([wrapping-type=Normal]) .ui5-label-root{white-space:normal}:host(:not([wrapping-type=Normal])) .ui5-label-root{display:inline-block;white-space:nowrap}bdi{content:"";padding-right:.075rem}:host(:not([wrapping-type=Normal])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;max-width:100%}:host(:not([wrapping-type=Normal])[required][show-colon]) .ui5-label-text-wrapper,:host(:not([wrapping-type=Normal])[required][show-colon]) .ui5-label-text-wrapper.ui5-label-text-wrapper-safari{max-width:calc(100% - .8rem)}:host(:not([wrapping-type=Normal])[required]) .ui5-label-text-wrapper{max-width:calc(100% - .475rem)}:host(:not([wrapping-type=Normal])[required]) .ui5-label-text-wrapper.ui5-label-text-wrapper-safari{max-width:calc(100% - .425rem)}:host(:not([wrapping-type=Normal])[show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .125rem)}:host([show-colon]) .ui5-label-required-colon{margin-left:-.05rem}:host([show-colon]) .ui5-label-required-colon:before{content:":"}:host([required]) .ui5-label-required-colon:after{content:"*";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-right:0;margin-left:.125rem}:host([required][show-colon]) [dir=rtl] .ui5-label-required-colon:after{margin-right:.125rem;margin-left:0}' };
const metadata$b = {
  tag: "ui5-label",
  properties: {
    required: {
      type: Boolean
    },
    wrappingType: {
      type: WrappingType,
      defaultValue: WrappingType.None
    },
    showColon: {
      type: Boolean
    },
    "for": {
      type: String
    }
  },
  slots: {
    "default": {
      type: Node
    }
  }
};
class Label extends UI5Element {
  static get metadata() {
    return metadata$b;
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$c;
  }
  static get styles() {
    return labelCss;
  }
  get classes() {
    return {
      textWrapper: {
        "ui5-label-text-wrapper": true,
        "ui5-label-text-wrapper-safari": isSafari()
      }
    };
  }
  _onclick() {
    const elementToFocus = document.getElementById(this.for);
    if (elementToFocus) {
      elementToFocus.focus();
    }
  }
}
Label.define();
const name$7 = "accept";
const pathData$7 = "M468.5 106c6 7 9 16 9 24v3c0 9-4 18-11 25l-244 243c-7 7-15 10-24 10-10 0-20-4-28-12l-125-129c-7-7-10-15-10-24 0-10 4-20 12-28 7-6 16-9 24-10 10 0 20 4 28 12l100 103 217-219c7-7 15-10 24-10 10 0 20 4 28 12z";
const ltr$7 = true;
const collection$7 = "SAP-icons-v5";
const packageName$7 = "@ui5/webcomponents-icons";
registerIcon(name$7, { pathData: pathData$7, ltr: ltr$7, collection: collection$7, packageName: packageName$7 });
var pathDataV4$3 = { pathData: pathData$7 };
const name$6 = "accept";
const pathData$6 = "M455.8 94q9 9 3 19l-222 326q-4 8-12 9t-14-5l-151-167q-5-5-4.5-11t5.5-11l25-25q12-12 23 0l96 96q5 5 13 4.5t12-8.5l175-249q4-7 11.5-8t13.5 4z";
const ltr$6 = true;
const collection$6 = "SAP-icons";
const packageName$6 = "@ui5/webcomponents-icons";
registerIcon(name$6, { pathData: pathData$6, ltr: ltr$6, collection: collection$6, packageName: packageName$6 });
var pathDataV5$3 = { pathData: pathData$6 };
isTheme("sap_horizon") ? pathDataV5$3 : pathDataV4$3;
const ICON_DECLINE = { key: "ICON_DECLINE", defaultText: "Decline" };
const name$5 = "decline";
const pathData$5 = "M452.5 417c8 7 12 17 12 26s-4 19-12 26c-7 8-17 12-26 12s-19-4-26-12l-144-143-145 143c-8 8-17 12-26 12-10 0-19-4-27-12-7-7-11-17-11-26s4-19 11-26l145-143-145-146c-7-8-11-17-11-26 0-10 4-19 11-27 8-7 17-11 27-11 9 0 18 4 26 11l145 146 144-146c7-7 17-11 26-11 10 0 19 4 26 11 8 8 12 17 12 27 0 9-4 18-12 26l-144 146z";
const ltr$5 = false;
const accData$1 = ICON_DECLINE;
const collection$5 = "SAP-icons-v5";
const packageName$5 = "@ui5/webcomponents-icons";
registerIcon(name$5, { pathData: pathData$5, ltr: ltr$5, accData: accData$1, collection: collection$5, packageName: packageName$5 });
var pathDataV4$2 = { pathData: pathData$5, accData: accData$1 };
const name$4 = "decline";
const pathData$4 = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z";
const ltr$4 = false;
const accData = ICON_DECLINE;
const collection$4 = "SAP-icons";
const packageName$4 = "@ui5/webcomponents-icons";
registerIcon(name$4, { pathData: pathData$4, ltr: ltr$4, accData, collection: collection$4, packageName: packageName$4 });
var pathDataV5$2 = { pathData: pathData$4, accData };
isTheme("sap_horizon") ? pathDataV5$2 : pathDataV4$2;
const name$3 = "less";
const pathData$3 = "M444 215c21 0 36 15 36 36 0 22-15 37-36 37H69c-22 0-37-15-37-37 0-21 15-36 37-36h375z";
const ltr$3 = false;
const collection$3 = "SAP-icons-v5";
const packageName$3 = "@ui5/webcomponents-icons";
registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });
var pathDataV4$1 = { pathData: pathData$3 };
const name$2 = "less";
const pathData$2 = "M464 224q16 0 16 16v32q0 16-16 16H48q-6 0-11-4.5T32 272v-32q0-7 5-11.5t11-4.5h416z";
const ltr$2 = false;
const collection$2 = "SAP-icons";
const packageName$2 = "@ui5/webcomponents-icons";
registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });
var pathDataV5$1 = { pathData: pathData$2 };
isTheme("sap_horizon") ? pathDataV5$1 : pathDataV4$1;
const SwitchDesigns = {
  Textual: "Textual",
  Graphical: "Graphical"
};
class SwitchDesign extends DataType {
  static isValid(value) {
    return !!SwitchDesigns[value];
  }
}
SwitchDesign.generateTypeAccessors(SwitchDesigns);
const block0$b = (context, tags, suffix) => l$1`<div class="ui5-switch-root ${o(context.classes.main)}" role="checkbox" aria-label="${l(context.ariaLabelText)}" aria-checked="${l(context.checked)}" aria-disabled="${l(context.ariaDisabled)}" aria-labelledby="${l(context._id)}-hiddenText" @click="${context._onclick}" @keyup="${context._onkeyup}" @keydown="${context._onkeydown}" tabindex="${l(context.tabIndex)}" dir="${l(context.effectiveDir)}"><div class="ui5-switch-inner"><div class="ui5-switch-track" part="slider"><div class="ui5-switch-slider">${context.graphical ? block1$8(context, tags, suffix) : block2$6(context, tags, suffix)}<span class="ui5-switch-handle" part="handle"><${scopeTag("ui5-icon", tags, suffix)} name="${l(context.sapNextIcon)}" class="ui5-switch-handle-icon"></${scopeTag("ui5-icon", tags, suffix)}></span></div></div></div><input type='checkbox' ?checked="${context.checked}" class="ui5-switch-input" data-sap-no-tab-ref/><span id="${l(context._id)}-hiddenText" class="ui5-hidden-text">${l(context.hiddenText)}</span></div>`;
const block1$8 = (context, tags, suffix) => l$1`<span class="ui5-switch-text ui5-switch-text--on"><${scopeTag("ui5-icon", tags, suffix)} name="accept" dir="ltr" class="ui5-switch-icon-on"></${scopeTag("ui5-icon", tags, suffix)}></span><span class="ui5-switch-text ui5-switch-text--off"><${scopeTag("ui5-icon", tags, suffix)} name="decline" class="ui5-switch-icon-off"></${scopeTag("ui5-icon", tags, suffix)}></span>`;
const block2$6 = (context, tags, suffix) => l$1`${context.hasNoLabel ? block3$4(context, tags, suffix) : block4$4(context)}`;
const block3$4 = (context, tags, suffix) => l$1`<span class="ui5-switch-text ui5-switch-text--on ui5-switch-no-label-icon" part="text-on"><${scopeTag("ui5-icon", tags, suffix)} name="${l(context.sapNextIcon)}" class="ui5-switch-no-label-icon-on"></${scopeTag("ui5-icon", tags, suffix)}></span><span class="ui5-switch-text ui5-switch-text--off switch-no-label-icon" part="text-off"><${scopeTag("ui5-icon", tags, suffix)} name="${l(context.sapNextIcon)}" class="ui5-switch-no-label-icon-off"></${scopeTag("ui5-icon", tags, suffix)}></span>`;
const block4$4 = (context, tags, suffix) => l$1`<span class="ui5-switch-text ui5-switch-text--on" part="text-on">${l(context._textOn)}</span><span class="ui5-switch-text ui5-switch-text--off" part="text-off">${l(context._textOff)}</span>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var switchCss = { packageName: "@ui5/webcomponents", fileName: "themes/Switch.css", content: '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:not([hidden])){display:inline-block}.ui5-switch-root{position:relative;display:flex;align-items:center;width:100%;height:var(--_ui5_switch_height);min-width:var(--_ui5_switch_width);cursor:pointer;outline:none;border-radius:var(--_ui5-switch-root-border-radius)}.ui5-switch-root.ui5-switch--no-label{min-width:var(--_ui5_switch_no_label_width)}.ui5-switch-inner{display:flex;align-items:center;justify-content:center;height:100%;width:100%;min-width:inherit;overflow:hidden;pointer-events:none;will-change:transform}:host([checked]) .ui5-switch-inner{border-radius:6.25rem;box-shadow:var(--_ui5-switch-root-box-shadow)}.ui5-switch-track{height:var(--_ui5_switch_track_height);width:100%;display:flex;align-items:center;background:var(--_ui5-switch_track-off-background);border:var(--_ui5-switch-track-border);border-color:var(--_ui5-switch-track-border_color);border-radius:var(--_ui5_switch_track_border_radius);box-sizing:border-box;transition:var(--_ui5-switch-track-transition)}.ui5-switch--no-label .ui5-switch-track{height:var(--_ui5_switch_track_no_label_height)}.ui5-switch-slider{position:relative;height:var(--_ui5_switch_height);width:100%;transition:transform .1s ease-in;transform-origin:top left}.ui5-switch-slider>:not(.ui5-switch-handle){display:var(--_ui5-switch-slider-texts-display)}.ui5-switch-handle{position:absolute;display:flex;justify-content:center;align-items:center;left:var(--_ui5-switch-handle-left);width:var(--_ui5_switch_handle_width);height:var(--_ui5_switch_handle_height);background:var(--_ui5_switch_handle_bg);border:var(--_ui5-switch-handle-border);border-radius:var(--_ui5_switch_handle_border_radius);box-sizing:border-box}.ui5-switch-handle-icon{display:var(--_ui5-switch-handle-icon-display);color:var(--_ui5-switch_track-off-background);transition:var(--_ui5-switch-track-transition)}:host([checked]) .ui5-switch-handle-icon{color:var(--_ui5-switch_track-on-background)}.ui5-switch-text{display:flex;justify-content:center;position:absolute;min-width:1.625rem;padding:0 .125rem;font-size:var(--sapFontSmallSize);font-family:"72override",var(--sapFontFamily);text-transform:uppercase;text-align:center;color:var(--sapTextColor);white-space:nowrap;user-select:none;-webkit-user-select:none;-ms-user-select:none}.ui5-switch-text--on{left:var(--_ui5_switch_text_on_left)}.ui5-switch-text--off{right:0}.ui5-switch-handle,.ui5-switch-text{top:50%;transform:translateY(-50%)}.ui5-switch-desktop.ui5-switch-root:focus:after{content:"";position:absolute;left:var(--_ui5_switch_root_outline_left_right);width:var(--_ui5_switch_focus_width_size);height:var(--_ui5_switch_focus_height_size);top:var(--_ui5_switch_root_outline_top_bottom);bottom:var(--_ui5_switch_root_outline_top_bottom);right:var(--_ui5_switch_root_outline_left_right);border:var(--_ui5_switch_focus_outline);border-radius:var(--_ui5_switch_root_after_boreder_radius);pointer-events:none;transition:var(--_ui5-switch-track-transition);outline:var(--_ui5_switch_root_after_outline)}.ui5-switch-root .ui5-switch-input{position:absolute;left:0;width:0;height:0;margin:0;visibility:hidden;-webkit-appearance:none}.ui5-switch-root.ui5-switch--disabled{opacity:var(--_ui5_switch_disabled_opacity);cursor:default}.ui5-switch-root.ui5-switch--disabled.ui5-switch--checked .ui5-switch-handle{background:var(--_ui5_switch_handle_disabled_checked_bg)}.ui5-switch-root.ui5-switch--disabled .ui5-switch-handle{background:var(--_ui5_switch_handle_disabled_bg)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled .ui5-switch-track{background:var(--_ui5_switch_track_disabled_semantic_checked_bg)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled .ui5-switch-handle{background:var(--_ui5_switch_handle_disabled_semantic_checked_bg)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled:not(.ui5-switch--checked) .ui5-switch-track{background:var(--_ui5_switch_track_disabled_semantic_bg)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled:not(.ui5-switch--checked) .ui5-switch-handle{background:var(--_ui5_switch_semantic_button_background)}.ui5-switch-root.ui5-switch--checked .ui5-switch-handle{background:var(--_ui5_switch_handle_checked_bg);border-color:var(--_ui5_switch_handle_checked_border_color)}.ui5-switch-root.ui5-switch--checked .ui5-switch-track{background:var(--_ui5-switch_track-on-background)}.ui5-switch-root.ui5-switch--checked .ui5-switch-slider{transform:var(--_ui5_switch_slide_transform)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--checked:not(.ui5-switch--disabled) .ui5-switch-text--on,.ui5-switch-root.ui5-switch--checked .ui5-switch-text--off{color:var(--sapButton_Track_Selected_TextColor)}.ui5-switch-text .ui5-switch-text--on .ui5-switch-no-label-icon{display:flex;justify-content:center;font-size:var(--sapFontSmallSize)}.ui5-switch--no-label .ui5-switch-no-label-icon-on{color:var(--sapButton_Track_Selected_TextColor);width:.75rem;height:.75rem;display:var(--_ui5-switch-track-icon-display)}.ui5-switch--no-label .ui5-switch-no-label-icon-off{color:var(--sapButton_Track_TextColor);width:.75rem;height:.75rem;display:var(--_ui5-switch-track-icon-display)}.ui5-switch-root.ui5-switch--semantic .ui5-switch-handle{border-color:var(--sapSuccessBorderColor)}.ui5-switch-root.ui5-switch--semantic .ui5-switch-track{border-color:var(--_ui5_switch_track_semantic_border_color);background:var(--_ui5_switch_track_semantic_success_backgroud_color)}.ui5-switch-root.ui5-switch--semantic .ui5-switch-handle{background:var(--_ui5_switch_semantic_button_background)}.ui5-switch-root.ui5-switch--no-label .ui5-switch-text,.ui5-switch-root.ui5-switch--semantic .ui5-switch-text{display:flex;justify-content:center;font-size:var(--sapFontSmallSize)}.ui5-switch-root.ui5-switch--semantic .ui5-switch-icon-off,.ui5-switch-root.ui5-switch--semantic .ui5-switch-icon-on{width:.75rem;height:.75rem}.ui5-switch-root.ui5-switch--semantic .ui5-switch-icon-on{border-color:var(--sapSuccessBorderColor);color:var(--sapPositiveElementColor)}.ui5-switch-root.ui5-switch--semantic .ui5-switch-icon-off{color:var(--sapNegativeElementColor)}.ui5-switch-root.ui5-switch--semantic:not(.ui5-switch--checked) .ui5-switch-track{border-color:var(--_ui5_switch_track_semantic_not_checked_border_color);background:var(--_ui5_switch_track_semantic_error_backgroud_color)}.ui5-switch-root.ui5-switch--semantic:not(.ui5-switch--checked) .ui5-switch-handle{border-color:var(--sapErrorBorderColor);background:var(--_ui5_switch_semantic_button_background)}:host([active]) .ui5-switch-desktop.ui5-switch-root:not(.ui5-switch--disabled) .ui5-switch-track{background:var(--_ui5-switch_track-off-active-background)}:host([active]) .ui5-switch-desktop.ui5-switch-root.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-track{background:var(--_ui5-switch_track-on-active-background)}.ui5-switch-desktop.ui5-switch-root:not(.ui5-switch--disabled):hover .ui5-switch-track{border-color:var(--_ui5_switch_handle_hover_border_color)}.ui5-switch-desktop.ui5-switch-root:not(.ui5-switch--disabled):hover .ui5-switch-handle-icon{color:var(--_ui5-switch_track-off-hover-color)}.ui5-switch-desktop.ui5-switch-root:not(.ui5-switch--disabled):hover .ui5-switch-handle{background:var(--sapButton_Hover_Background);box-shadow:var(--_ui5-switch_handle-off-hover_box_shadow)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-handle{background:var(--sapButton_Selected_Hover_Background);border-color:var(--_ui5_switch_handle_checked_border_color);box-shadow:var(--_ui5-switch_handle-on-hover_box_shadow)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-track{border-color:var(--_ui5_switch_handle_hover_border_color);background:var(--_ui5-switch_track-on-hover-background)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-handle-icon{color:var(--_ui5-switch_track-on-hover-color)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--semantic:not(.ui5-switch--disabled):hover .ui5-switch-handle{background:var(--_ui5_switch_handle_semantic_hover_bg);border-color:var(--_ui5_switch_handle_semantic_hover_border_color);box-shadow:var(--sapContent_Negative_Shadow)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--semantic:not(.ui5-switch--disabled):hover .ui5-switch-track{border-color:var(--_ui5_switch_track_semantic_hover_border_color)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--semantic.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-handle{background:var(--_ui5_switch_handle_semantic_checked_hover_bg);border-color:var(--_ui5_switch_handle_semantic_checked_hover_border_color);box-shadow:var(--sapContent_Informative_Shadow)}.ui5-switch-desktop.ui5-switch-root.ui5-switch--semantic.ui5-switch--checked:not(.ui5-switch--disabled):hover .ui5-switch-track{border-color:var(--_ui5_switch_track_semantic_checked_hover_border_color);background:var(--_ui5_switch_track_semantic_success_backgroud_color)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled .ui5-switch-icon--on,.ui5-switch-root.ui5-switch--semantic:hover .ui5-switch-icon--on{color:var(--_ui5_switch_text_on_semantic_color)}.ui5-switch-root.ui5-switch--semantic.ui5-switch--disabled .ui5-switch-icon--off,.ui5-switch-root.ui5-switch--semantic:hover .ui5-switch-icon--off{color:var(--_ui5_switch_text_off_semantic_color)}[dir=rtl].ui5-switch-root .ui5-switch-handle{left:0;right:-1px}[dir=rtl].ui5-switch-root.ui5-switch--checked .ui5-switch-slider{transform:var(--_ui5_switch_rtl_transform)}[dir=rtl].ui5-switch-root .ui5-switch-text--on{right:var(--_ui5_switch_text_right);left:auto}[dir=rtl].ui5-switch-root .ui5-switch-text--off{right:auto;left:0}' };
const metadata$a = {
  tag: "ui5-switch",
  languageAware: true,
  properties: {
    design: {
      type: SwitchDesign,
      defaultValue: SwitchDesign.Textual
    },
    checked: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    textOn: {
      type: String
    },
    textOff: {
      type: String
    },
    accessibleNameRef: {
      type: String,
      defaultValue: ""
    }
  },
  events: {
    change: {}
  }
};
class Switch extends UI5Element {
  static get metadata() {
    return metadata$a;
  }
  static get styles() {
    return switchCss;
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$b;
  }
  get sapNextIcon() {
    return this.checked ? "accept" : "less";
  }
  _onclick(event) {
    this.toggle();
  }
  _onkeydown(event) {
    if (isSpace(event)) {
      event.preventDefault();
    }
    if (isEnter(event)) {
      this.toggle();
    }
  }
  _onkeyup(event) {
    if (isSpace(event)) {
      this.toggle();
    }
  }
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.fireEvent("change");
      this.fireEvent("value-changed");
    }
  }
  get graphical() {
    return this.design === SwitchDesign.Graphical;
  }
  get hasNoLabel() {
    return !(this.graphical || this.textOn || this.textOff);
  }
  get _textOn() {
    return this.graphical ? "" : this.textOn;
  }
  get _textOff() {
    return this.graphical ? "" : this.textOff;
  }
  get tabIndex() {
    return this.disabled ? void 0 : "0";
  }
  get classes() {
    const hasLabel = this.graphical || this.textOn || this.textOff;
    return {
      main: {
        "ui5-switch-desktop": isDesktop(),
        "ui5-switch--disabled": this.disabled,
        "ui5-switch--checked": this.checked,
        "ui5-switch--semantic": this.graphical,
        "ui5-switch--no-label": !hasLabel
      }
    };
  }
  get ariaDisabled() {
    return this.disabled ? "true" : void 0;
  }
  get accessibilityOnText() {
    return this._textOn || Switch.i18nBundle.getText(SWITCH_ON);
  }
  get accessibilityOffText() {
    return this._textOff || Switch.i18nBundle.getText(SWITCH_OFF);
  }
  get hiddenText() {
    return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
  }
  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }
  static get dependencies() {
    return [Icon];
  }
  static async onDefine() {
    Switch.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
}
Switch.define();
const getActiveElement = () => {
  let element = document.activeElement;
  while (element && element.shadowRoot && element.shadowRoot.activeElement) {
    element = element.shadowRoot.activeElement;
  }
  return element;
};
const NavigationMode = {
  Auto: "Auto",
  Vertical: "Vertical",
  Horizontal: "Horizontal",
  Paging: "Paging"
};
const ItemNavigationBehavior = {
  Static: "Static",
  Cyclic: "Cyclic"
};
class ItemNavigation {
  constructor(rootWebComponent, options = {}) {
    this._setRootComponent(rootWebComponent);
    this._initOptions(options);
  }
  _setRootComponent(rootWebComponent) {
    if (!rootWebComponent.isUI5Element) {
      throw new Error("The root web component must be a UI5 Element instance");
    }
    this.rootWebComponent = rootWebComponent;
    this.rootWebComponent.addEventListener("keydown", this._onkeydown.bind(this));
    this.rootWebComponent._onComponentStateFinalized = () => {
      this._init();
    };
  }
  _initOptions(options) {
    if (typeof options.getItemsCallback !== "function") {
      throw new Error("getItemsCallback is required");
    }
    this._getItems = options.getItemsCallback;
    this._currentIndex = options.currentIndex || 0;
    this._rowSize = options.rowSize || 1;
    this._behavior = options.behavior || ItemNavigationBehavior.Static;
    this._navigationMode = options.navigationMode || NavigationMode.Auto;
    this._affectedPropertiesNames = options.affectedPropertiesNames || [];
    this._skipItemsSize = options.skipItemsSize || null;
  }
  setCurrentItem(current) {
    const currentItemIndex = this._getItems().indexOf(current);
    if (currentItemIndex === -1) {
      console.warn(`The provided item is not managed by ItemNavigation`, current);
      return;
    }
    this._currentIndex = currentItemIndex;
    this._applyTabIndex();
  }
  setRowSize(newRowSize) {
    this._rowSize = newRowSize;
  }
  _init() {
    this._getItems().forEach((item, idx) => {
      item._tabIndex = idx === this._currentIndex ? "0" : "-1";
    });
  }
  _onkeydown(event) {
    if (!this._canNavigate()) {
      return;
    }
    const horizontalNavigationOn = this._navigationMode === NavigationMode.Horizontal || this._navigationMode === NavigationMode.Auto;
    const verticalNavigationOn = this._navigationMode === NavigationMode.Vertical || this._navigationMode === NavigationMode.Auto;
    if (isUp(event) && verticalNavigationOn) {
      this._handleUp();
    } else if (isDown(event) && verticalNavigationOn) {
      this._handleDown();
    } else if (isLeft(event) && horizontalNavigationOn) {
      this._handleLeft();
    } else if (isRight(event) && horizontalNavigationOn) {
      this._handleRight();
    } else if (isHome(event)) {
      this._handleHome();
    } else if (isEnd(event)) {
      this._handleEnd();
    } else if (isPageUp(event)) {
      this._handlePageUp();
    } else if (isPageDown(event)) {
      this._handlePageDown();
    } else {
      return;
    }
    event.preventDefault();
    this._applyTabIndex();
    this._focusCurrentItem();
  }
  _handleUp() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex - this._rowSize >= 0) {
      this._currentIndex -= this._rowSize;
      return;
    }
    if (this._behavior === ItemNavigationBehavior.Cyclic) {
      const firstItemInThisColumnIndex = this._currentIndex % this._rowSize;
      const firstItemInPreviousColumnIndex = firstItemInThisColumnIndex === 0 ? this._rowSize - 1 : firstItemInThisColumnIndex - 1;
      const rows = Math.ceil(itemsLength / this._rowSize);
      let lastItemInPreviousColumnIndex = firstItemInPreviousColumnIndex + (rows - 1) * this._rowSize;
      if (lastItemInPreviousColumnIndex > itemsLength - 1) {
        lastItemInPreviousColumnIndex -= this._rowSize;
      }
      this._currentIndex = lastItemInPreviousColumnIndex;
    } else {
      this._currentIndex = 0;
    }
  }
  _handleDown() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex + this._rowSize < itemsLength) {
      this._currentIndex += this._rowSize;
      return;
    }
    if (this._behavior === ItemNavigationBehavior.Cyclic) {
      const firstItemInThisColumnIndex = this._currentIndex % this._rowSize;
      const firstItemInNextColumnIndex = (firstItemInThisColumnIndex + 1) % this._rowSize;
      this._currentIndex = firstItemInNextColumnIndex;
    } else {
      this._currentIndex = itemsLength - 1;
    }
  }
  _handleLeft() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex > 0) {
      this._currentIndex -= 1;
      return;
    }
    if (this._behavior === ItemNavigationBehavior.Cyclic) {
      this._currentIndex = itemsLength - 1;
    }
  }
  _handleRight() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex < itemsLength - 1) {
      this._currentIndex += 1;
      return;
    }
    if (this._behavior === ItemNavigationBehavior.Cyclic) {
      this._currentIndex = 0;
    }
  }
  _handleHome() {
    const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
    this._currentIndex -= this._currentIndex % homeEndRange;
  }
  _handleEnd() {
    const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
    this._currentIndex += homeEndRange - 1 - this._currentIndex % homeEndRange;
  }
  _handlePageUp() {
    if (this._rowSize > 1) {
      return;
    }
    this._handlePageUpFlat();
  }
  _handlePageDown() {
    if (this._rowSize > 1) {
      return;
    }
    this._handlePageDownFlat();
  }
  _handlePageUpFlat() {
    if (this._skipItemsSize === null) {
      this._currentIndex -= this._currentIndex;
    }
    if (this._currentIndex + 1 > this._skipItemsSize) {
      this._currentIndex -= this._skipItemsSize;
    } else {
      this._currentIndex -= this._currentIndex;
    }
  }
  _handlePageDownFlat() {
    if (this._skipItemsSize === null) {
      this._currentIndex = this._getItems().length - 1;
    }
    const currentToEndRange = this._getItems().length - this._currentIndex - 1;
    if (currentToEndRange > this._skipItemsSize) {
      this._currentIndex += this._skipItemsSize;
    } else {
      this._currentIndex = this._getItems().length - 1;
    }
  }
  _applyTabIndex() {
    const items = this._getItems();
    for (let i2 = 0; i2 < items.length; i2++) {
      items[i2]._tabIndex = i2 === this._currentIndex ? "0" : "-1";
    }
    this._affectedPropertiesNames.forEach((propName) => {
      const prop = this.rootWebComponent[propName];
      this.rootWebComponent[propName] = Array.isArray(prop) ? [...prop] : __spreadValues({}, prop);
    });
  }
  _focusCurrentItem() {
    const currentItem = this._getCurrentItem();
    if (currentItem) {
      currentItem.focus();
    }
  }
  _canNavigate() {
    const currentItem = this._getCurrentItem();
    const activeElement = getActiveElement();
    return currentItem && currentItem === activeElement;
  }
  _getCurrentItem() {
    const items = this._getItems();
    if (!items.length) {
      return null;
    }
    while (this._currentIndex >= items.length) {
      this._currentIndex -= this._rowSize;
    }
    if (this._currentIndex < 0) {
      this._currentIndex = 0;
    }
    const currentItem = items[this._currentIndex];
    if (!currentItem) {
      return;
    }
    if (currentItem.isUI5Element) {
      return currentItem.getFocusDomRef();
    }
    if (!this.rootWebComponent.getDomRef()) {
      return;
    }
    return this.rootWebComponent.getDomRef().querySelector(`#${currentItem.id}`);
  }
}
let resizeObserver;
const observedElements = new Map();
const getResizeObserver = () => {
  if (!resizeObserver) {
    resizeObserver = new window.ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const callbacks = observedElements.get(entry.target);
        callbacks.forEach((callback) => callback());
      });
    });
  }
  return resizeObserver;
};
let observe = (element, callback) => {
  const callbacks = observedElements.get(element) || [];
  if (!callbacks.length) {
    getResizeObserver().observe(element);
  }
  observedElements.set(element, [...callbacks, callback]);
};
let unobserve = (element, callback) => {
  const callbacks = observedElements.get(element) || [];
  if (callbacks.length === 0) {
    return;
  }
  const filteredCallbacks = callbacks.filter((fn) => fn !== callback);
  if (filteredCallbacks.length === 0) {
    getResizeObserver().unobserve(element);
    observedElements.delete(element);
  } else {
    observedElements.set(element, filteredCallbacks);
  }
};
class ResizeHandler {
  static register(element, callback) {
    if (element.isUI5Element) {
      element = element.getDomRef();
    }
    if (element instanceof HTMLElement) {
      observe(element, callback);
    } else {
      console.warn("Cannot register ResizeHandler for element", element);
    }
  }
  static deregister(element, callback) {
    if (element.isUI5Element) {
      element = element.getDomRef();
    }
    if (element instanceof HTMLElement) {
      unobserve(element, callback);
    } else {
      console.warn("Cannot deregister ResizeHandler for element", element);
    }
  }
}
const block0$a = (context, tags, suffix) => l$1`<li role="option" aria-roledescription="${l(context.ariaDescription)}" aria-posinset="${l(context.posInSet)}" aria-setsize="${l(context.sizeOfSet)}" aria-selected="${l(context.pressed)}" class="ui5-button-root" aria-disabled="${l(context.disabled)}" data-sap-focus-ref  dir="${l(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @touchstart="${context._ontouchstart}" @touchend="${context._ontouchend}" tabindex=${l(context.tabIndexValue)} aria-label="${l(context.ariaLabelText)}" title="${l(context.accInfo.title)}">${context.icon ? block1$7(context, tags, suffix) : void 0}<span id="${l(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span></li> `;
const block1$7 = (context, tags, suffix) => l$1`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l(context.icon)}" part="icon" ?show-tooltip=${context.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>`;
const block0$9 = (context, tags, suffix) => l$1`<button type="button" class="ui5-button-root" ?disabled="${context.disabled}" data-sap-focus-ref  aria-pressed="${l(context.pressed)}"  dir="${l(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @touchstart="${context._ontouchstart}" @touchend="${context._ontouchend}" tabindex=${l(context.tabIndexValue)} aria-expanded="${l(context.accInfo.ariaExpanded)}" aria-controls="${l(context.accInfo.ariaControls)}" aria-haspopup="${l(context.accInfo.ariaHaspopup)}" aria-label="${l(context.ariaLabelText)}" title="${l(context.accInfo.title)}" part="button">${context.icon ? block1$6(context, tags, suffix) : void 0}<span id="${l(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${context.hasButtonType ? block2$5(context) : void 0}</button> `;
const block1$6 = (context, tags, suffix) => l$1`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l(context.icon)}" part="icon" ?show-tooltip=${context.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>`;
const block2$5 = (context, tags, suffix) => l$1`<span class="ui5-hidden-text">${l(context.buttonTypeText)}</span>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var toggleBtnCss = { packageName: "@ui5/webcomponents", fileName: "themes/ToggleButton.css", content: ":host(:not([hidden])){display:inline-block}:host([disabled]){pointer-events:none}:host([design=Default][focused][active]),:host([design=Negative][focused][active]),:host([design=Positive][focused][active]),:host([design=Transparent][focused][active]){outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([design=Default][focused]),:host([design=Default][focused]:hover),:host([design=Default][focused][focused]),:host([design=Default][focused][focused][active]){outline-color:var(--_ui5_toggle_button_pressed_focussed_hovered_outline_color)}:host([design=Positive][pressed]),:host([design=Positive][pressed]:hover),:host([design=Positive][pressed][focused]),:host([design=Positive][pressed][focused][active]){background:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--_ui5_toggle_button_selected_positive_text_color);outline-color:var(--_ui5_toggle_button_pressed_focussed_hovered_outline_color)}:host([design=Positive][pressed]:not([active]):not([non-interactive]):not([_is-touch]):hover),:host([design=Positive][pressed][active]){background:var(--sapButton_Accept_Selected_Hover_Background)}:host([design=Negative][pressed]),:host([design=Negative][pressed]:hover),:host([design=Negative][pressed][focused]){background:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--_ui5_toggle_button_selected_negative_text_color);outline-color:var(--_ui5_toggle_button_pressed_focussed_hovered_outline_color)}:host([design=Negative][pressed]:not([active]):not([non-interactive]):not([_is-touch]):hover),:host([design=Negative][pressed][active]){background:var(--sapButton_Reject_Selected_Hover_Background)}:host([design=Transparent][pressed]),:host([design=Transparent][pressed]:hover),:host([pressed]),:host([pressed]:hover),:host([pressed][focused]){background:var(--sapButton_Selected_Background);border-color:var(--sapButton_Selected_BorderColor);color:var(--sapButton_Selected_TextColor);outline-color:var(--_ui5_toggle_button_pressed_focussed_hovered_outline_color)}:host([design=Emphasized][pressed]),:host([design=Emphasized][pressed]:not([active]):not([non-interactive]):not([_is-touch]):hover){outline-color:var(--_ui5_toggle_button_emphasized_pressed_focussed_hovered)}:host([design=Transparent]:hover){border-color:var(--sapButton_Lite_Hover_BorderColor)}:host([pressed]:not([active]):not([non-interactive]):not([_is-touch]):hover),:host([pressed][active]){background:var(--sapButton_Selected_Hover_Background)}:host([design=Emphasized][pressed]:not([active]):not([non-interactive]):not([_is-touch]):hover){box-shadow:var(--sapContent_Informative_Shadow)}:host([design=Positive][pressed]:hover){box-shadow:var(--sapContent_Positive_Shadow)}:host([design=Negative][pressed]:hover){box-shadow:var(--sapContent_Negative_Shadow)}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var toggleBtnIECss = { packageName: "@ui5/webcomponents", fileName: "themes/ToggleButton.ie11.css", content: '[ui5-toggle-button][focused]{outline:none}[ui5-toggle-button][focused] .ui5-button-root{position:relative}[ui5-toggle-button][focused] .ui5-button-root:after{content:"";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}[ui5-toggle-button][active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-toggle-button][design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-toggle-button][design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-toggle-button][design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-toggle-button][design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-toggle-button][design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-toggle-button] [ui5-icon].ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}' };
const metadata$9 = {
  tag: "ui5-toggle-button",
  altTag: "ui5-togglebutton",
  properties: {
    pressed: {
      type: Boolean
    }
  }
};
class ToggleButton extends Button {
  static get metadata() {
    return metadata$9;
  }
  static get template() {
    return block0$9;
  }
  static get styles() {
    return [Button.styles, toggleBtnCss, isLegacyBrowser() && toggleBtnIECss];
  }
  _onclick() {
    this.pressed = !this.pressed;
    if (isSafari()) {
      this.getDomRef().focus();
    }
  }
  _onkeyup(event) {
    if (isSpaceShift(event)) {
      event.preventDefault();
      return;
    }
    super._onkeyup(event);
  }
}
ToggleButton.define();
const metadata$8 = {
  tag: "ui5-segmented-button-item",
  properties: {
    design: {
      type: ButtonDesign,
      defaultValue: ButtonDesign.Default
    },
    iconEnd: {
      type: Boolean
    },
    submits: {
      type: Boolean
    },
    posInSet: {
      type: String
    },
    sizeOfSet: {
      type: String
    }
  }
};
class SegmentedButtonItem extends ToggleButton {
  static get metadata() {
    return metadata$8;
  }
  static get template() {
    return block0$a;
  }
  get ariaDescription() {
    return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
  }
}
SegmentedButtonItem.define();
const block0$8 = (context, tags, suffix) => l$1`<ul @click="${context._onclick}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @focusin="${context._onfocusin}" class="ui5-segmented-button-root" role="listbox" dir="${l(context.effectiveDir)}" aria-multiselectable="true" aria-describedby="${l(context._id)}-invisibleText" aria-roledescription=${l(context.ariaDescription)} aria-label=${l(context.accessibleName)}><slot></slot><span id="${l(context._id)}-invisibleText" class="ui5-hidden-text">${l(context.ariaDescribedBy)}</span></ul>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var SegmentedButtonCss = { packageName: "@ui5/webcomponents", fileName: "themes/SegmentedButton.css", content: ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}.ui5-segmented-button-root{display:flex;margin:0;padding:0;background-color:var(--_ui5_segmented_btn_background_color);border-radius:var(--_ui5_segmented_btn_inner_border_radius)}::slotted([ui5-segmented-button-item]){border-radius:var(--_ui5_segmented_btn_inner_border_radius);height:var(--_ui5_button_base_height);min-width:2.5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:var(--_ui5_segmented_btn_inner_border)}::slotted([ui5-segmented-button-item][pressed]){border:.0625rem solid var(--sapButton_Selected_BorderColor)}::slotted([ui5-segmented-button-item]:nth-child(odd)){border-right:var(--_ui5_segmented_btn_inner_border_odd_child);border-left:var(--_ui5_segmented_btn_inner_border_odd_child)}::slotted([ui5-segmented-button-item][pressed]:nth-child(odd)){border-right:var(--_ui5_segmented_btn_inner_pressed_border_odd_child);border-left:var(--_ui5_segmented_btn_inner_pressed_border_odd_child)}::slotted([ui5-segmented-button-item]:last-child){border-top-right-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-right-radius:var(--_ui5_segmented_btn_border_radius);border-right:var(--_ui5_segmented_btn_inner_border)}::slotted([ui5-segmented-button-item][pressed]:last-child){border-right:.0625rem solid var(--sapButton_Selected_BorderColor)}::slotted([ui5-segmented-button-item]:first-child){border-top-left-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-left-radius:var(--_ui5_segmented_btn_border_radius);border-left:var(--_ui5_segmented_btn_inner_border)}::slotted([ui5-segmented-button-item][pressed]:first-child){border-left:.0625rem solid var(--sapButton_Selected_BorderColor)}[dir=rtl] ::slotted([ui5-segmented-button-item]:first-child){border-top-right-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-right-radius:var(--_ui5_segmented_btn_border_radius);border-top-left-radius:0;border-bottom-left-radius:0;border-right:var(--_ui5_segmented_btn_inner_border)}[dir=rtl] ::slotted([ui5-segmented-button-item][pressed]:first-child){border-right:.0625rem solid var(--sapButton_Selected_BorderColor)}[dir=rtl] ::slotted([ui5-segmented-button-item]:last-child){border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-left-radius:var(--_ui5_segmented_btn_border_radius);border-left:var(--_ui5_segmented_btn_inner_border)}[dir=rtl] ::slotted([ui5-segmented-button-item][pressed]:last-child){border-left:.0625rem solid var(--sapButton_Selected_BorderColor)}[dir=rtl] ::slotted([ui5-segmented-button-item]:only-child){border-top-right-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-right-radius:var(--_ui5_segmented_btn_border_radius);border-top-left-radius:var(--_ui5_segmented_btn_border_radius);border-bottom-left-radius:var(--_ui5_segmented_btn_border_radius)}" };
const metadata$7 = {
  tag: "ui5-segmented-button",
  altTag: "ui5-segmentedbutton",
  languageAware: true,
  properties: {
    accessibleName: {
      type: String,
      defaultValue: void 0
    }
  },
  managedSlots: true,
  slots: {
    "default": {
      propertyName: "items",
      type: HTMLElement
    }
  },
  events: {
    "selection-change": {
      detail: {
        selectedItem: { type: HTMLElement }
      }
    }
  }
};
class SegmentedButton extends UI5Element {
  static get metadata() {
    return metadata$7;
  }
  static get render() {
    return litRender;
  }
  static get template() {
    return block0$8;
  }
  static get styles() {
    return SegmentedButtonCss;
  }
  static get dependencies() {
    return [SegmentedButtonItem];
  }
  static async onDefine() {
    SegmentedButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  constructor() {
    super();
    this._itemNavigation = new ItemNavigation(this, {
      getItemsCallback: () => this.getSlottedNodes("items")
    });
    this.absoluteWidthSet = false;
    this.percentageWidthSet = false;
    this.hasPreviouslyFocusedItem = false;
    this._handleResizeBound = this._doLayout.bind(this);
  }
  onEnterDOM() {
    ResizeHandler.register(this.parentNode, this._handleResizeBound);
  }
  onExitDOM() {
    if (this.parentNode) {
      ResizeHandler.deregister(this.parentNode, this._handleResizeBound);
    }
  }
  onBeforeRendering() {
    const items = this.getSlottedNodes("items");
    items.forEach((item, index, arr) => {
      item.posInSet = index + 1;
      item.sizeOfSet = arr.length;
    });
    this.normalizeSelection();
  }
  async onAfterRendering() {
    await this._doLayout();
  }
  prepareToMeasureItems() {
    this.style.width = "";
    this.items.forEach((item) => {
      item.style.width = "";
    });
  }
  async measureItemsWidth() {
    await renderFinished();
    this.prepareToMeasureItems();
    this.widths = this.items.map((item) => {
      let width = item.offsetWidth + 1;
      if (isIE()) {
        width += 1;
      }
      return width;
    });
  }
  normalizeSelection() {
    this._selectedItem = this.items.filter((item) => item.pressed).pop();
    if (this._selectedItem) {
      this.items.forEach((item) => {
        item.pressed = false;
      });
      this._selectedItem.pressed = true;
    }
  }
  _selectItem(event) {
    if (event.target.disabled || event.target === this.getDomRef()) {
      return;
    }
    if (event.target !== this._selectedItem) {
      if (this._selectedItem) {
        this._selectedItem.pressed = false;
      }
      this._selectedItem = event.target;
      this.fireEvent("selection-change", {
        selectedItem: this._selectedItem
      });
    }
    this._selectedItem.pressed = true;
    this._itemNavigation.setCurrentItem(this._selectedItem);
    return this;
  }
  _onclick(event) {
    this._selectItem(event);
    this.selectedItem.focus();
  }
  _onkeydown(event) {
    if (isEnter(event)) {
      this._selectItem(event);
    } else if (isSpace(event)) {
      event.preventDefault();
    }
  }
  _onkeyup(event) {
    if (isSpace(event)) {
      this._selectItem(event);
    }
  }
  _onfocusin(event) {
    if (this.hasPreviouslyFocusedItem) {
      this._itemNavigation.setCurrentItem(event.target);
      return;
    }
    if (this.selectedItem) {
      this.selectedItem.focus();
      this._itemNavigation.setCurrentItem(this._selectedItem);
      this.hasPreviouslyFocusedItem = true;
    }
  }
  async _doLayout() {
    const itemsHaveWidth = this.widths && this.widths.some((item) => item.offsetWidth > 2);
    if (!itemsHaveWidth) {
      await this.measureItemsWidth();
    }
    const parentWidth = this.parentNode ? this.parentNode.offsetWidth : 0;
    if (!this.style.width || this.percentageWidthSet) {
      this.style.width = `${Math.max(...this.widths) * this.items.length}px`;
      this.absoluteWidthSet = true;
    }
    this.items.forEach((item) => {
      item.style.width = "100%";
    });
    if (parentWidth <= this.offsetWidth && this.absoluteWidthSet) {
      this.style.width = "100%";
      this.percentageWidthSet = true;
    }
  }
  get selectedItem() {
    return this._selectedItem;
  }
  get ariaDescribedBy() {
    return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY);
  }
  get ariaDescription() {
    return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
  }
}
SegmentedButton.define();
class Float extends DataType {
  static isValid(value) {
    return Number(value) === value;
  }
  static attributeToProperty(attributeValue) {
    return parseFloat(attributeValue);
  }
}
const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max);
};
let debounceInterval = null;
const debounce = (fn, delay) => {
  clearTimeout(debounceInterval);
  debounceInterval = setTimeout(() => {
    debounceInterval = null;
    fn();
  }, delay);
};
const isNodeHidden = (node) => {
  if (node.nodeName === "SLOT") {
    return false;
  }
  return node.offsetWidth <= 0 && node.offsetHeight <= 0 || node.style && node.style.visibility === "hidden";
};
const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;
const isNodeClickable = (node) => {
  if (node.disabled) {
    return false;
  }
  const tabIndex = node.getAttribute("tabindex");
  if (tabIndex !== null && tabIndex !== void 0) {
    return parseInt(tabIndex) >= 0;
  }
  return rFocusable.test(node.nodeName) || rClickable.test(node.nodeName) && node.href;
};
const isFocusTrap = (el) => {
  return el.hasAttribute("data-ui5-focus-trap");
};
const getFirstFocusableElement = async (container, startFromContainer) => {
  if (!container || isNodeHidden(container)) {
    return null;
  }
  return findFocusableElement(container, true, startFromContainer);
};
const getLastFocusableElement = async (container, startFromContainer) => {
  if (!container || isNodeHidden(container)) {
    return null;
  }
  return findFocusableElement(container, false, startFromContainer);
};
const isElemFocusable = (el) => {
  return el.hasAttribute("data-ui5-focus-redirect") || !isNodeHidden(el);
};
const findFocusableElement = async (container, forward, startFromContainer) => {
  let child;
  if (container.shadowRoot) {
    child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
  } else if (container.assignedNodes && container.assignedNodes()) {
    const assignedElements = container.assignedNodes();
    child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
  } else if (startFromContainer) {
    child = container;
  } else {
    child = forward ? container.firstElementChild : container.lastElementChild;
  }
  let focusableDescendant;
  while (child) {
    const originalChild = child;
    if (child.isUI5Element) {
      child = await child.getFocusDomRefAsync();
    }
    if (!child) {
      return null;
    }
    if (child.nodeType === 1 && isElemFocusable(child) && !isFocusTrap(child)) {
      if (isNodeClickable(child)) {
        return child && typeof child.focus === "function" ? child : null;
      }
      focusableDescendant = await findFocusableElement(child, forward);
      if (focusableDescendant) {
        return focusableDescendant && typeof focusableDescendant.focus === "function" ? focusableDescendant : null;
      }
    }
    child = forward ? originalChild.nextSibling : originalChild.previousSibling;
  }
  return null;
};
const PopupUtilsData = getSharedResource("PopupUtilsData", {});
PopupUtilsData.currentZIndex = PopupUtilsData.currentZIndex || 100;
const getFocusedElement = () => {
  const element = getActiveElement();
  return element && typeof element.focus === "function" ? element : null;
};
const isFocusedElementWithinNode = (node) => {
  const fe = getFocusedElement();
  if (fe) {
    return isNodeContainedWithin(node, fe);
  }
  return false;
};
const isNodeContainedWithin = (parent, child) => {
  let currentNode = parent;
  if (currentNode.shadowRoot) {
    currentNode = Array.from(currentNode.shadowRoot.children).find((n2) => n2.localName !== "style");
  }
  if (currentNode === child) {
    return true;
  }
  const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;
  if (childNodes) {
    return Array.from(childNodes).some((n2) => isNodeContainedWithin(n2, child));
  }
};
const isPointInRect = (x2, y2, rect) => {
  return x2 >= rect.left && x2 <= rect.right && y2 >= rect.top && y2 <= rect.bottom;
};
const isClickInRect = (event, rect) => {
  let x2;
  let y2;
  if (event.touches) {
    const touch2 = event.touches[0];
    x2 = touch2.clientX;
    y2 = touch2.clientY;
  } else {
    x2 = event.clientX;
    y2 = event.clientY;
  }
  return isPointInRect(x2, y2, rect);
};
const getClosedPopupParent = (el) => {
  const parent = el.parentElement || el.getRootNode && el.getRootNode().host;
  if (parent && (parent.showAt && parent.isUI5Element || parent.open && parent.isUI5Element || parent === document.documentElement)) {
    return parent;
  }
  return getClosedPopupParent(parent);
};
const getNextZIndex = () => {
  const OpenUI5Support = getFeature("OpenUI5Support");
  if (OpenUI5Support && OpenUI5Support.isLoaded()) {
    return OpenUI5Support.getNextZIndex();
  }
  PopupUtilsData.currentZIndex += 2;
  return PopupUtilsData.currentZIndex;
};
const block0$7 = (context, tags, suffix) => l$1`${context._isPhone ? block1$5(context, tags, suffix) : block7(context)}`;
const block1$5 = (context, tags, suffix) => l$1`<${scopeTag("ui5-dialog", tags, suffix)} accessible-name=${l(context.accessibleName)} accessible-name-ref=${l(context.accessibleNameRef)} ?with-padding=${context.withPadding} stretch _disable-initial-focus @ui5-before-open="${l(context._propagateDialogEvent)}" @ui5-after-open="${l(context._afterDialogOpen)}" @ui5-before-close="${l(context._propagateDialogEvent)}" @ui5-after-close="${l(context._afterDialogClose)}">${!context._hideHeader ? block2$4(context, tags, suffix) : void 0}<slot></slot><slot slot="footer" name="footer"></slot></${scopeTag("ui5-dialog", tags, suffix)}>`;
const block2$4 = (context, tags, suffix) => l$1`${context.header.length ? block3$3() : block4$3(context, tags, suffix)}`;
const block3$3 = (context, tags, suffix) => l$1`<slot slot="header" name="header"></slot>`;
const block4$3 = (context, tags, suffix) => l$1`<header class="${o(context.classes.header)}">${context.headerText ? block5$2(context, tags, suffix) : void 0}${!context._hideCloseButton ? block6(context, tags, suffix) : void 0}</header>`;
const block5$2 = (context, tags, suffix) => l$1`<${scopeTag("ui5-title", tags, suffix)} level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${l(context.headerText)}</${scopeTag("ui5-title", tags, suffix)}>`;
const block6 = (context, tags, suffix) => l$1`<${scopeTag("ui5-button", tags, suffix)} icon="decline" design="Transparent" aria-label="${l(context._closeDialogAriaLabel)}" @click="${context.close}"></${scopeTag("ui5-button", tags, suffix)}>`;
const block7 = (context, tags, suffix) => l$1`<section style="${styleMap(context.styles.root)}" class="${o(context.classes.root)}" role="dialog" aria-modal="${l(context._ariaModal)}" aria-label="${l(context._ariaLabel)}" aria-labelledby="${l(context._ariaLabelledBy)}" dir="${l(context.effectiveDir)}" @keydown=${context._onkeydown} @focusout=${context._onfocusout} @mouseup=${context._onmouseup} @mousedown=${context._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(context.styles.arrow)}"></span>${context._displayHeader ? block8(context) : void 0}<div style="${styleMap(context.styles.content)}" class="${o(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${context._displayFooter ? block11(context) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section>`;
const block8 = (context, tags, suffix) => l$1`<header class="ui5-popup-header-root" id="ui5-popup-header">${context.header.length ? block9() : block10(context)}</header>`;
const block9 = (context, tags, suffix) => l$1`<slot name="header"></slot>`;
const block10 = (context, tags, suffix) => l$1`<h2 class="ui5-popup-header-text">${l(context.headerText)}</h2>`;
const block11 = (context, tags, suffix) => l$1`${context.footer.length ? block12() : void 0}`;
const block12 = (context, tags, suffix) => l$1`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;
class Integer extends DataType {
  static isValid(value) {
    return Number.isInteger(value);
  }
  static attributeToProperty(attributeValue) {
    return parseInt(attributeValue);
  }
}
const block0$6 = (context, tags, suffix) => l$1`<section style="${styleMap(context.styles.root)}" class="${o(context.classes.root)}" role="dialog" aria-modal="${l(context._ariaModal)}" aria-label="${l(context._ariaLabel)}" aria-labelledby="${l(context._ariaLabelledBy)}" dir="${l(context.effectiveDir)}" @keydown=${context._onkeydown} @focusout=${context._onfocusout} @mouseup=${context._onmouseup} @mousedown=${context._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><div style="${styleMap(context.styles.content)}" class="${o(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `;
const block0$5 = (context, tags, suffix) => l$1`<div class="ui5-block-layer" ?hidden=${context._blockLayerHidden} tabindex="0" style="${styleMap(context.styles.blockLayer)}" @keydown="${context._preventBlockLayerFocus}" @mousedown="${context._preventBlockLayerFocus}"></div>`;
let openedRegistry$1 = [];
const addOpenedPopup = (instance, parentPopovers = []) => {
  if (!openedRegistry$1.includes(instance)) {
    openedRegistry$1.push({
      instance,
      parentPopovers
    });
  }
  if (openedRegistry$1.length === 1) {
    attachGlobalListener();
  }
};
const removeOpenedPopup = (instance) => {
  openedRegistry$1 = openedRegistry$1.filter((el) => {
    return el.instance !== instance;
  });
  if (!openedRegistry$1.length) {
    detachGlobalListener();
  }
};
const getOpenedPopups = () => {
  return [...openedRegistry$1];
};
const _keydownListener = (event) => {
  if (!openedRegistry$1.length) {
    return;
  }
  if (isEscape(event)) {
    openedRegistry$1[openedRegistry$1.length - 1].instance.close(true);
  }
};
const attachGlobalListener = () => {
  document.addEventListener("keydown", _keydownListener);
};
const detachGlobalListener = () => {
  document.removeEventListener("keydown", _keydownListener);
};
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var styles = { packageName: "@ui5/webcomponents", fileName: "themes/Popup.css", content: ":host{min-width:1px;display:none;position:fixed}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var staticAreaStyles = { packageName: "@ui5/webcomponents", fileName: "themes/PopupStaticAreaStyles.css", content: ".ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;top:-500px;left:-500px;right:-500px;bottom:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var globalStyles = { packageName: "@ui5/webcomponents", fileName: "themes/PopupGlobal.css", content: ".ui5-popup-scroll-blocker{width:100%;height:100%;position:fixed;overflow:hidden}" };
const metadata$6 = {
  managedSlots: true,
  slots: {
    "default": {
      type: HTMLElement,
      propertyName: "content"
    }
  },
  properties: {
    initialFocus: {
      type: String
    },
    preventFocusRestore: {
      type: Boolean
    },
    opened: {
      type: Boolean
    },
    accessibleName: {
      type: String,
      defaultValue: void 0
    },
    accessibleNameRef: {
      type: String,
      defaultValue: ""
    },
    _disableInitialFocus: {
      type: Boolean
    },
    _blockLayerHidden: {
      type: Boolean
    }
  },
  events: {
    "before-open": {},
    "after-open": {},
    "before-close": {
      detail: {
        escPressed: { type: Boolean }
      }
    },
    "after-close": {},
    "scroll": {}
  }
};
const createBlockingStyle = () => {
  if (!hasStyle("data-ui5-popup-scroll-blocker")) {
    createStyle(globalStyles, "data-ui5-popup-scroll-blocker");
  }
};
createBlockingStyle();
const bodyScrollingBlockers = new Set();
class Popup extends UI5Element {
  static get metadata() {
    return metadata$6;
  }
  static get render() {
    return litRender;
  }
  static get styles() {
    return styles;
  }
  static get template() {
    return block0$6;
  }
  static get staticAreaTemplate() {
    return block0$5;
  }
  static get staticAreaStyles() {
    return staticAreaStyles;
  }
  onEnterDOM() {
    if (!this.isOpen()) {
      this._blockLayerHidden = true;
    }
  }
  onExitDOM() {
    if (this.isOpen()) {
      Popup.unblockBodyScrolling(this);
      this._removeOpenedPopup();
    }
  }
  get _displayProp() {
    return "block";
  }
  _preventBlockLayerFocus(event) {
    event.preventDefault();
  }
  static blockBodyScrolling(popup) {
    bodyScrollingBlockers.add(popup);
    if (bodyScrollingBlockers.size !== 1) {
      return;
    }
    if (window.pageYOffset > 0) {
      document.body.style.top = `-${window.pageYOffset}px`;
    }
    document.body.classList.add("ui5-popup-scroll-blocker");
  }
  static unblockBodyScrolling(popup) {
    bodyScrollingBlockers.delete(popup);
    if (bodyScrollingBlockers.size !== 0) {
      return;
    }
    document.body.classList.remove("ui5-popup-scroll-blocker");
    window.scrollTo(0, -parseFloat(document.body.style.top));
    document.body.style.top = "";
  }
  _scroll(e2) {
    this.fireEvent("scroll", {
      scrollTop: e2.target.scrollTop,
      targetRef: e2.target
    });
  }
  _onkeydown(e2) {
    if (e2.target === this._root && isTabPrevious(e2)) {
      e2.preventDefault();
    }
  }
  _onfocusout(e2) {
    if (!e2.relatedTarget) {
      this._shouldFocusRoot = true;
    }
  }
  _onmousedown(e2) {
    this._root.removeAttribute("tabindex");
    if (this.shadowRoot.contains(e2.target)) {
      this._shouldFocusRoot = true;
    } else {
      this._shouldFocusRoot = false;
    }
  }
  _onmouseup() {
    this._root.tabIndex = -1;
    if (this._shouldFocusRoot) {
      if (isChrome()) {
        this._root.focus();
      }
      this._shouldFocusRoot = false;
    }
  }
  async forwardToFirst() {
    const firstFocusable = await getFirstFocusableElement(this);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      this._root.focus();
    }
  }
  async forwardToLast() {
    const lastFocusable = await getLastFocusableElement(this);
    if (lastFocusable) {
      lastFocusable.focus();
    } else {
      this._root.focus();
    }
  }
  async applyInitialFocus() {
    await this.applyFocus();
  }
  async applyFocus() {
    await this._waitForDomRef();
    const element = this.getRootNode().getElementById(this.initialFocus) || document.getElementById(this.initialFocus) || await getFirstFocusableElement(this) || this._root;
    if (element) {
      if (element === this._root) {
        element.tabIndex = -1;
      }
      element.focus();
    }
  }
  isOpen() {
    return this.opened;
  }
  isFocusWithin() {
    return isFocusedElementWithinNode(this.shadowRoot.querySelector(".ui5-popup-root"));
  }
  async _open(preventInitialFocus) {
    const prevented = !this.fireEvent("before-open", {}, true, false);
    if (prevented) {
      return;
    }
    if (this.isModal && !this.shouldHideBackdrop) {
      this.getStaticAreaItemDomRef();
      this._blockLayerHidden = false;
      Popup.blockBodyScrolling(this);
    }
    this._zIndex = getNextZIndex();
    this.style.zIndex = this._zIndex;
    this._focusedElementBeforeOpen = getFocusedElement();
    this._show();
    if (!this._disableInitialFocus && !preventInitialFocus) {
      this.applyInitialFocus();
    }
    this._addOpenedPopup();
    this.opened = true;
    await renderFinished();
    this.fireEvent("after-open", {}, false, false);
  }
  _addOpenedPopup() {
    addOpenedPopup(this);
  }
  close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
    if (!this.opened) {
      return;
    }
    const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
    if (prevented) {
      return;
    }
    if (this.isModal) {
      this._blockLayerHidden = true;
      Popup.unblockBodyScrolling(this);
    }
    this.hide();
    this.opened = false;
    if (!preventRegistryUpdate) {
      this._removeOpenedPopup();
    }
    if (!this.preventFocusRestore && !preventFocusRestore) {
      this.resetFocus();
    }
    this.fireEvent("after-close", {}, false, false);
  }
  _removeOpenedPopup() {
    removeOpenedPopup(this);
  }
  resetFocus() {
    if (!this._focusedElementBeforeOpen) {
      return;
    }
    this._focusedElementBeforeOpen.focus();
    this._focusedElementBeforeOpen = null;
  }
  _show() {
    this.style.display = this._displayProp;
  }
  hide() {
    this.style.display = "none";
  }
  get isModal() {
  }
  get shouldHideBackdrop() {
  }
  get _ariaLabelledBy() {
  }
  get _ariaModal() {
  }
  get _ariaLabel() {
    return getEffectiveAriaLabelText(this);
  }
  get _root() {
    return this.shadowRoot.querySelector(".ui5-popup-root");
  }
  get styles() {
    return {
      root: {},
      content: {},
      blockLayer: {
        "zIndex": this._zIndex - 1
      }
    };
  }
  get classes() {
    return {
      root: {
        "ui5-popup-root": true
      },
      content: {
        "ui5-popup-content": true
      }
    };
  }
}
const PopoverPlacementTypes = {
  Left: "Left",
  Right: "Right",
  Top: "Top",
  Bottom: "Bottom"
};
class PopoverPlacementType extends DataType {
  static isValid(value) {
    return !!PopoverPlacementTypes[value];
  }
}
PopoverPlacementType.generateTypeAccessors(PopoverPlacementTypes);
const PopoverVerticalAligns = {
  Center: "Center",
  Top: "Top",
  Bottom: "Bottom",
  Stretch: "Stretch"
};
class PopoverVerticalAlign extends DataType {
  static isValid(value) {
    return !!PopoverVerticalAligns[value];
  }
}
PopoverVerticalAlign.generateTypeAccessors(PopoverVerticalAligns);
const PopoverHorizontalAligns = {
  Center: "Center",
  Left: "Left",
  Right: "Right",
  Stretch: "Stretch"
};
class PopoverHorizontalAlign extends DataType {
  static isValid(value) {
    return !!PopoverHorizontalAligns[value];
  }
}
PopoverHorizontalAlign.generateTypeAccessors(PopoverHorizontalAligns);
let updateInterval = null;
const intervalTimeout = 300;
const openedRegistry = [];
const repositionPopovers = (event) => {
  openedRegistry.forEach((popover) => {
    popover.instance.reposition();
  });
};
const attachGlobalScrollHandler = () => {
  document.body.addEventListener("scroll", repositionPopovers, true);
};
const detachGlobalScrollHandler = () => {
  document.body.removeEventListener("scroll", repositionPopovers, true);
};
const runUpdateInterval = () => {
  updateInterval = setInterval(() => {
    repositionPopovers();
  }, intervalTimeout);
};
const stopUpdateInterval = () => {
  clearInterval(updateInterval);
};
const attachGlobalClickHandler = () => {
  document.addEventListener("mousedown", clickHandler);
};
const detachGlobalClickHandler = () => {
  document.removeEventListener("mousedown", clickHandler);
};
const clickHandler = (event) => {
  const openedPopups = getOpenedPopups();
  const isTopPopupPopover = openedPopups[openedPopups.length - 1].instance.showAt;
  if (openedPopups.length === 0 || !isTopPopupPopover) {
    return;
  }
  for (let i2 = openedPopups.length - 1; i2 !== -1; i2--) {
    const popup = openedPopups[i2].instance;
    if (popup.isModal || popup.isOpenerClicked(event)) {
      return;
    }
    if (isClickInRect(event, popup.getBoundingClientRect())) {
      break;
    }
    popup.close();
  }
};
const attachScrollHandler = (popover) => {
  popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, true);
};
const detachScrollHandler = (popover) => {
  popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers);
};
const addOpenedPopover = (instance) => {
  const parentPopovers = getParentPopoversIfNested(instance);
  addOpenedPopup(instance, parentPopovers);
  openedRegistry.push({
    instance,
    parentPopovers
  });
  attachScrollHandler(instance);
  if (openedRegistry.length === 1) {
    attachGlobalScrollHandler();
    attachGlobalClickHandler();
    runUpdateInterval();
  }
};
const removeOpenedPopover = (instance) => {
  const popoversToClose = [instance];
  for (let i2 = 0; i2 < openedRegistry.length; i2++) {
    const indexOfCurrentInstance = openedRegistry[i2].parentPopovers.indexOf(instance);
    if (openedRegistry[i2].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
      popoversToClose.push(openedRegistry[i2].instance);
    }
  }
  for (let i2 = popoversToClose.length - 1; i2 >= 0; i2--) {
    for (let j = 0; j < openedRegistry.length; j++) {
      let indexOfItemToRemove;
      if (popoversToClose[i2] === openedRegistry[j].instance) {
        indexOfItemToRemove = j;
      }
      if (indexOfItemToRemove >= 0) {
        removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
        detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
        const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
        itemToClose[0].instance.close(false, true);
      }
    }
  }
  if (!openedRegistry.length) {
    detachGlobalScrollHandler();
    detachGlobalClickHandler();
    stopUpdateInterval();
  }
};
const getParentPopoversIfNested = (instance) => {
  let currentElement = instance.parentNode;
  const parentPopovers = [];
  while (currentElement.parentNode) {
    for (let i2 = 0; i2 < openedRegistry.length; i2++) {
      if (currentElement && currentElement === openedRegistry[i2].instance) {
        parentPopovers.push(currentElement);
      }
    }
    currentElement = currentElement.parentNode;
  }
  return parentPopovers;
};
const block0$4 = (context, tags, suffix) => l$1`<section style="${styleMap(context.styles.root)}" class="${o(context.classes.root)}" role="dialog" aria-modal="${l(context._ariaModal)}" aria-label="${l(context._ariaLabel)}" aria-labelledby="${l(context._ariaLabelledBy)}" dir="${l(context.effectiveDir)}" @keydown=${context._onkeydown} @focusout=${context._onfocusout} @mouseup=${context._onmouseup} @mousedown=${context._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(context.styles.arrow)}"></span>${context._displayHeader ? block1$4(context) : void 0}<div style="${styleMap(context.styles.content)}" class="${o(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${context._displayFooter ? block4$2(context) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `;
const block1$4 = (context, tags, suffix) => l$1`<header class="ui5-popup-header-root" id="ui5-popup-header">${context.header.length ? block2$3() : block3$2(context)}</header>`;
const block2$3 = (context, tags, suffix) => l$1`<slot name="header"></slot>`;
const block3$2 = (context, tags, suffix) => l$1`<h2 class="ui5-popup-header-text">${l(context.headerText)}</h2>`;
const block4$2 = (context, tags, suffix) => l$1`${context.footer.length ? block5$1() : void 0}`;
const block5$1 = (context, tags, suffix) => l$1`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var browserScrollbarCSS = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css", content: "::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}::-webkit-scrollbar-thumb{border-radius:var(--browser_scrollbar_border_radius);background-color:var(--sapScrollBar_FaceColor)}::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var PopupsCommonCss = { packageName: "@ui5/webcomponents", fileName: "themes/PopupsCommon.css", content: ':host{display:none;position:fixed;background:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow2);border-radius:var(--_ui5-popup-border-radius);min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;outline:none}@media screen and (-ms-high-contrast:active){.ui5-popup-root{border:1px solid var(--sapPageFooter_BorderColor)}}.ui5-popup-root .ui5-popup-header-root{box-shadow:var(--_ui5_popup_header_shadow);margin-bottom:.125rem}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:var(--_ui5_popup_footer_border_top);color:var(--sapPageFooter_TextColor)}.ui5-popup-footer-root,.ui5-popup-header-root,:host([header-text]) .ui5-popup-header-text{margin:0;color:var(--sapPageHeader_TextColor);font-size:1rem;font-family:"72override",var(--sapFontFamily);display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5_popup_header_footer_font_weight)}.ui5-popup-content{overflow:auto;padding:var(--_ui5_popup_content_padding);box-sizing:border-box}:host([no-padding]) .ui5-popup-content{padding:0}:host([header-text]) .ui5-popup-header-text{padding:0 .25rem;text-align:center;min-height:var(--_ui5_popup_default_header_height);max-height:var(--_ui5_popup_default_header_height);line-height:var(--_ui5_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}' };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var PopoverCss = { packageName: "@ui5/webcomponents", fileName: "themes/Popover.css", content: '.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow3);transform:rotate(-45deg)}:host{max-width:calc(100% - var(--_ui5_popup_viewport_margin)*2)}:host([opened][actual-placement-type=Top]){margin-top:var(--_ui5-popover-margin-bottom)}:host([opened][actual-placement-type=Bottom]){margin-top:var(--_ui5-popover-margin-top)}:host([actual-placement-type=Bottom]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type=Bottom]) .ui5-popover-arrow:after{margin:.1875rem 0 0 .1875rem}:host([actual-placement-type=Left]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type=Left]) .ui5-popover-arrow:after{margin:.1875rem 0 0 -.375rem}:host([actual-placement-type=Left]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem .25rem 0 0}:host([actual-placement-type=Bottom]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem .125rem 0 0}:host([actual-placement-type=Top]) [dir=rtl] .ui5-popover-arrow:after{margin:-.4375rem .125rem 0 0}:host([actual-placement-type=Top]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement-type=Top]) .ui5-popover-arrow:after{margin:-.375rem 0 0 .125rem}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type=Right]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type=Right]) .ui5-popover-arrow:after{margin:.125rem 0 0 .25rem}:host(:not([actual-placement-type])) [dir=rtl] .ui5-popover-arrow:after,:host([actual-placement-type=Right]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem -.375rem 0 0}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}' };
const arrowSize = 8;
const metadata$5 = {
  tag: "ui5-popover",
  properties: {
    headerText: {
      type: String
    },
    placementType: {
      type: PopoverPlacementType,
      defaultValue: PopoverPlacementType.Right
    },
    horizontalAlign: {
      type: PopoverHorizontalAlign,
      defaultValue: PopoverHorizontalAlign.Center
    },
    verticalAlign: {
      type: PopoverVerticalAlign,
      defaultValue: PopoverVerticalAlign.Center
    },
    modal: {
      type: Boolean
    },
    hideBackdrop: {
      type: Boolean
    },
    hideArrow: {
      type: Boolean
    },
    allowTargetOverlap: {
      type: Boolean
    },
    disableScrolling: {
      type: Boolean
    },
    arrowTranslateX: {
      type: Integer,
      defaultValue: 0,
      noAttribute: true
    },
    arrowTranslateY: {
      type: Integer,
      defaultValue: 0,
      noAttribute: true
    },
    actualPlacementType: {
      type: PopoverPlacementType,
      defaultValue: PopoverPlacementType.Right
    },
    _maxHeight: {
      type: Integer,
      noAttribute: true
    },
    _maxWidth: {
      type: Integer,
      noAttribute: true
    }
  },
  managedSlots: true,
  slots: {
    header: {
      type: HTMLElement
    },
    footer: {
      type: HTMLElement
    }
  },
  events: {}
};
class Popover extends Popup {
  constructor() {
    super();
    this._handleResize = this.handleResize.bind(this);
  }
  static get metadata() {
    return metadata$5;
  }
  static get styles() {
    return [browserScrollbarCSS, PopupsCommonCss, PopoverCss];
  }
  static get template() {
    return block0$4;
  }
  static get VIEWPORT_MARGIN() {
    return 10;
  }
  static get ARROW_MARGIN() {
    return 6;
  }
  onEnterDOM() {
    ResizeHandler.register(this, this._handleResize);
  }
  onExitDOM() {
    ResizeHandler.deregister(this, this._handleResize);
  }
  isOpenerClicked(event) {
    const target = event.target;
    return target === this._opener || target.getFocusDomRef && target.getFocusDomRef() === this._opener || event.composedPath().indexOf(this._opener) > -1;
  }
  async showAt(opener, preventInitialFocus = false) {
    if (!opener || this.opened) {
      return;
    }
    this._opener = opener;
    this._openerRect = opener.getBoundingClientRect();
    await super._open(preventInitialFocus);
  }
  _addOpenedPopup() {
    addOpenedPopover(this);
  }
  _removeOpenedPopup() {
    removeOpenedPopover(this);
  }
  shouldCloseDueToOverflow(placement, openerRect) {
    const threshold = 32;
    const limits = {
      "Right": openerRect.right,
      "Left": openerRect.left,
      "Top": openerRect.top,
      "Bottom": openerRect.bottom
    };
    const closedPopupParent = getClosedPopupParent(this._opener);
    let overflowsBottom = false;
    let overflowsTop = false;
    if (closedPopupParent.showAt) {
      const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
      overflowsBottom = openerRect.top > contentRect.top + contentRect.height;
      overflowsTop = openerRect.top + openerRect.height < contentRect.top;
    }
    return limits[placement] < 0 || limits[placement] + threshold > closedPopupParent.innerHeight || overflowsBottom || overflowsTop;
  }
  shouldCloseDueToNoOpener(openerRect) {
    return openerRect.top === 0 && openerRect.bottom === 0 && openerRect.left === 0 && openerRect.right === 0;
  }
  handleResize() {
    if (this.opened) {
      this.reposition();
    }
  }
  reposition() {
    this._show();
  }
  _show() {
    let placement;
    const popoverSize = this.getPopoverSize();
    if (popoverSize.width === 0 || popoverSize.height === 0) {
      return;
    }
    if (this.isOpen()) {
      this._openerRect = this._opener.getBoundingClientRect();
    }
    if (this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin()) {
      placement = this._oldPlacement;
    } else {
      placement = this.calcPlacement(this._openerRect, popoverSize);
    }
    const stretching = this.horizontalAlign === PopoverHorizontalAlign.Stretch;
    if (this._preventRepositionAndClose) {
      return this.close();
    }
    this._oldPlacement = placement;
    this.actualPlacementType = placement.placementType;
    let left = clamp(this._left, Popover.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover.VIEWPORT_MARGIN);
    if (this.actualPlacementType === PopoverPlacementType.Right) {
      left = Math.max(left, this._left);
    }
    let top = clamp(this._top, Popover.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover.VIEWPORT_MARGIN);
    if (this.actualPlacementType === PopoverPlacementType.Bottom) {
      top = Math.max(top, this._top);
    }
    const isVertical = this.actualPlacementType === PopoverPlacementType.Top || this.actualPlacementType === PopoverPlacementType.Bottom;
    const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
    const arrow = this._clampArrowPlacement(placement.arrow, isVertical, this._top, this._left, popoverSize, borderRadius);
    this.arrowTranslateX = arrow.x;
    this.arrowTranslateY = arrow.y;
    top = this._adjustForIOSKeyboard(top);
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`
    });
    super._show();
    if (stretching && this._width) {
      this.style.width = this._width;
    }
  }
  _clampArrowPlacement({ x: x2, y: y2 }, isVertical, top, left, { width, height }, borderRadius) {
    const maxY = this._getArrowRange(height, borderRadius);
    const maxX = this._getArrowRange(width, borderRadius);
    if (isVertical) {
      const popoverOnLeftBorderOffset = Popover.VIEWPORT_MARGIN - left;
      const popoverOnRightBorderOffset = left + width + Popover.VIEWPORT_MARGIN - document.documentElement.clientWidth;
      if (popoverOnLeftBorderOffset > 0) {
        x2 = Math.max(x2 - popoverOnLeftBorderOffset, -maxX);
      } else if (popoverOnRightBorderOffset > 0) {
        x2 = Math.min(x2 + popoverOnRightBorderOffset, maxX);
      }
    }
    if (!isVertical) {
      const popoverOnTopBorderOffset = Popover.VIEWPORT_MARGIN - top;
      const popoverOnBottomBorderOffset = top + height + Popover.VIEWPORT_MARGIN - document.documentElement.clientHeight;
      if (popoverOnTopBorderOffset > 0) {
        y2 = Math.max(y2 - popoverOnTopBorderOffset, -maxY);
      } else if (popoverOnBottomBorderOffset > 0) {
        y2 = Math.min(y2 + popoverOnBottomBorderOffset, maxY);
      }
    }
    return {
      x: Math.round(x2),
      y: Math.round(y2)
    };
  }
  _getArrowRange(dimension, borderRadius) {
    return Math.floor(dimension / 2 - (borderRadius + Popover.ARROW_MARGIN));
  }
  _adjustForIOSKeyboard(top) {
    if (!isIOS()) {
      return top;
    }
    const actualTop = Math.ceil(this.getBoundingClientRect().top);
    return top + (Number.parseInt(this.style.top || "0") - actualTop);
  }
  getPopoverSize() {
    if (!this.opened) {
      Object.assign(this.style, {
        display: "block",
        top: "-10000px",
        left: "-10000px"
      });
    }
    const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
    return { width, height };
  }
  get contentDOM() {
    return this.shadowRoot.querySelector(".ui5-popup-content");
  }
  get arrowDOM() {
    return this.shadowRoot.querySelector(".ui5-popover-arrow");
  }
  calcPlacement(targetRect, popoverSize) {
    let left = 0;
    let top = 0;
    const allowTargetOverlap = this.allowTargetOverlap;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    let maxHeight = clientHeight;
    let maxWidth = clientWidth;
    const placementType = this.getActualPlacementType(targetRect, popoverSize);
    this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);
    const isVertical = placementType === PopoverPlacementType.Top || placementType === PopoverPlacementType.Bottom;
    if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
      popoverSize.width = targetRect.width;
      this._width = `${targetRect.width}px`;
    } else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
      popoverSize.height = targetRect.height;
    }
    const arrowOffset = this.hideArrow ? 0 : arrowSize;
    switch (placementType) {
      case PopoverPlacementType.Top:
        left = this.getVerticalLeft(targetRect, popoverSize);
        top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
        if (!allowTargetOverlap) {
          maxHeight = targetRect.top - arrowOffset;
        }
        break;
      case PopoverPlacementType.Bottom:
        left = this.getVerticalLeft(targetRect, popoverSize);
        top = targetRect.bottom + arrowOffset;
        if (allowTargetOverlap) {
          top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
        } else {
          maxHeight = clientHeight - targetRect.bottom - arrowOffset;
        }
        break;
      case PopoverPlacementType.Left:
        left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
        top = this.getHorizontalTop(targetRect, popoverSize);
        if (!allowTargetOverlap) {
          maxWidth = targetRect.left - arrowOffset;
        }
        break;
      case PopoverPlacementType.Right:
        left = targetRect.left + targetRect.width + arrowOffset;
        top = this.getHorizontalTop(targetRect, popoverSize);
        if (allowTargetOverlap) {
          left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
        } else {
          maxWidth = clientWidth - targetRect.right - arrowOffset;
        }
        break;
    }
    if (isVertical) {
      if (popoverSize.width > clientWidth || left < 0) {
        left = 0;
      } else if (left + popoverSize.width > clientWidth) {
        left -= left + popoverSize.width - clientWidth;
      }
    } else {
      if (popoverSize.height > clientHeight || top < 0) {
        top = 0;
      } else if (top + popoverSize.height > clientHeight) {
        top -= top + popoverSize.height - clientHeight;
      }
    }
    this._maxHeight = Math.round(maxHeight - Popover.VIEWPORT_MARGIN);
    this._maxWidth = Math.round(maxWidth - Popover.VIEWPORT_MARGIN);
    if (this._left === void 0 || Math.abs(this._left - left) > 1.5) {
      this._left = Math.round(left);
    }
    if (this._top === void 0 || Math.abs(this._top - top) > 1.5) {
      this._top = Math.round(top);
    }
    const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical);
    return {
      arrow: arrowPos,
      top: this._top,
      left: this._left,
      placementType
    };
  }
  getArrowPosition(targetRect, popoverSize, left, top, isVertical) {
    let arrowXCentered = this.horizontalAlign === PopoverHorizontalAlign.Center || this.horizontalAlign === PopoverHorizontalAlign.Stretch;
    if (this.horizontalAlign === PopoverHorizontalAlign.Right && left <= targetRect.left) {
      arrowXCentered = true;
    }
    if (this.horizontalAlign === PopoverHorizontalAlign.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
      arrowXCentered = true;
    }
    let arrowTranslateX = 0;
    if (isVertical && arrowXCentered) {
      arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
    }
    let arrowTranslateY = 0;
    if (!isVertical) {
      arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
    }
    return {
      x: Math.round(arrowTranslateX),
      y: Math.round(arrowTranslateY)
    };
  }
  fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
    if (targetRect.left > popoverSize.width) {
      return PopoverPlacementType.Left;
    }
    if (clientWidth - targetRect.right > targetRect.left) {
      return PopoverPlacementType.Right;
    }
    if (clientHeight - targetRect.bottom > popoverSize.height) {
      return PopoverPlacementType.Bottom;
    }
    if (clientHeight - targetRect.bottom < targetRect.top) {
      return PopoverPlacementType.Top;
    }
  }
  getActualPlacementType(targetRect, popoverSize) {
    const placementType = this.placementType;
    let actualPlacementType = placementType;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    switch (placementType) {
      case PopoverPlacementType.Top:
        if (targetRect.top < popoverSize.height && targetRect.top < clientHeight - targetRect.bottom) {
          actualPlacementType = PopoverPlacementType.Bottom;
        }
        break;
      case PopoverPlacementType.Bottom:
        if (clientHeight - targetRect.bottom < popoverSize.height && clientHeight - targetRect.bottom < targetRect.top) {
          actualPlacementType = PopoverPlacementType.Top;
        }
        break;
      case PopoverPlacementType.Left:
        if (targetRect.left < popoverSize.width) {
          actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
        }
        break;
      case PopoverPlacementType.Right:
        if (clientWidth - targetRect.right < popoverSize.width) {
          actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
        }
        break;
    }
    return actualPlacementType;
  }
  getVerticalLeft(targetRect, popoverSize) {
    let left;
    switch (this.horizontalAlign) {
      case PopoverHorizontalAlign.Center:
      case PopoverHorizontalAlign.Stretch:
        left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
        break;
      case PopoverHorizontalAlign.Left:
        left = targetRect.left;
        break;
      case PopoverHorizontalAlign.Right:
        left = targetRect.right - popoverSize.width;
        break;
    }
    return left;
  }
  getHorizontalTop(targetRect, popoverSize) {
    let top;
    switch (this.verticalAlign) {
      case PopoverVerticalAlign.Center:
      case PopoverVerticalAlign.Stretch:
        top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
        break;
      case PopoverVerticalAlign.Top:
        top = targetRect.top;
        break;
      case PopoverVerticalAlign.Bottom:
        top = targetRect.bottom - popoverSize.height;
        break;
    }
    return top;
  }
  get isModal() {
    return this.modal;
  }
  get shouldHideBackdrop() {
    return this.hideBackdrop;
  }
  get _ariaLabelledBy() {
    return this._ariaLabel ? void 0 : "ui5-popup-header";
  }
  get _ariaModal() {
    return true;
  }
  get styles() {
    return __spreadProps(__spreadValues({}, super.styles), {
      root: {
        "max-height": `${this._maxHeight}px`,
        "max-width": `${this._maxWidth}px`
      },
      arrow: {
        transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`
      }
    });
  }
  get classes() {
    const allClasses = super.classes;
    allClasses.root["ui5-popover-root"] = true;
    return allClasses;
  }
  get _displayHeader() {
    return this.header.length || this.headerText;
  }
  get _displayFooter() {
    return true;
  }
}
Popover.define();
const name$1 = "resize-corner";
const pathData$1 = "M386.5 305c6-5 13-8 19-8 7 0 14 3 19 8 5 6 8 12 8 19s-3 13-8 19l-161 161c-6 5-12 8-19 8s-13-3-19-8c-5-5-8-12-8-18 0-7 3-14 8-20zm38-134c5 5 8 12 8 19 0 6-3 13-8 18l-296 296c-5 5-12 8-18 8-7 0-14-3-19-8-6-5-8-12-8-19s2-13 8-19l295-295c6-6 13-8 19-8 7 0 14 2 19 8z";
const ltr$1 = false;
const collection$1 = "SAP-icons-v5";
const packageName$1 = "@ui5/webcomponents-icons";
registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });
var pathDataV4 = { pathData: pathData$1 };
const name = "resize-corner";
const pathData = "M384 224v32q0 12-10 22L182 470q-10 10-22 10h-32zM224 480l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
const ltr = false;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";
registerIcon(name, { pathData, ltr, collection, packageName });
var pathDataV5 = { pathData };
isTheme("sap_horizon") ? pathDataV5 : pathDataV4;
const block0$3 = (context, tags, suffix) => l$1`<section style="${styleMap(context.styles.root)}" class="${o(context.classes.root)}" role="dialog" aria-modal="${l(context._ariaModal)}" aria-label="${l(context._ariaLabel)}" aria-labelledby="${l(context._ariaLabelledBy)}" dir="${l(context.effectiveDir)}" @keydown=${context._onkeydown} @focusout=${context._onfocusout} @mouseup=${context._onmouseup} @mousedown=${context._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span>${context._displayHeader ? block1$3(context) : void 0}<div style="${styleMap(context.styles.content)}" class="${o(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${context.footer.length ? block4$1() : void 0}${context._showResizeHandle ? block5(context, tags, suffix) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `;
const block1$3 = (context, tags, suffix) => l$1`<header class="ui5-popup-header-root" id="ui5-popup-header" tabindex="${l(context._headerTabIndex)}" @keydown="${context._onDragOrResizeKeyDown}" @mousedown="${context._onDragMouseDown}">${context.header.length ? block2$2() : block3$1(context)}</header>`;
const block2$2 = (context, tags, suffix) => l$1`<slot name="header"></slot>`;
const block3$1 = (context, tags, suffix) => l$1`<h2 id="ui5-popup-header-text" class="ui5-popup-header-text">${l(context.headerText)}</h2>`;
const block4$1 = (context, tags, suffix) => l$1`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;
const block5 = (context, tags, suffix) => l$1`<${scopeTag("ui5-icon", tags, suffix)} name="resize-corner" dir="${l(context.effectiveDir)}" class="ui5-popup-resize-handle" @mousedown="${context._onResizeMouseDown}"></${scopeTag("ui5-icon", tags, suffix)}>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var dialogCSS = { packageName: "@ui5/webcomponents", fileName: "themes/Dialog.css", content: ":host{min-width:20rem;min-height:6rem;max-height:94%;max-width:90%;flex-direction:column;box-shadow:var(--sapContent_Shadow3)}:host([stretch]){width:90%;height:94%}:host([stretch][on-phone]){width:100%;height:100%;max-height:100%;max-width:100%;border-radius:0}.ui5-popup-header-root{background:var(--sapPageHeader_Background)}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot=header]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}.ui5-popup-header-root:focus{outline:var(--_ui5_dialog_outline);border-radius:var(--_ui5_dialog_header_border_radius);outline-offset:var(--_ui5_dialog_header_focus_offset)}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}:host([stretch]) .ui5-popup-content{width:100%;height:100%}.ui5-popup-content{min-height:var(--_ui5_dialog_content_min_height);flex:1 1 auto}.ui5-popup-resize-handle{position:absolute;bottom:var(--_ui5_dialog_resize_handle_bottom);right:var(--_ui5_dialog_resize_handle_right);cursor:se-resize;color:var(--_ui5_dialog_resize_handle_color)}.ui5-popup-resize-handle[dir=rtl]{left:-.25rem;right:unset;cursor:sw-resize}" };
const STEP_SIZE = 16;
const metadata$4 = {
  tag: "ui5-dialog",
  slots: {
    header: {
      type: HTMLElement
    },
    footer: {
      type: HTMLElement
    }
  },
  properties: {
    headerText: {
      type: String
    },
    stretch: {
      type: Boolean
    },
    draggable: {
      type: Boolean
    },
    resizable: {
      type: Boolean
    },
    onPhone: {
      type: Boolean
    },
    onDesktop: {
      type: Boolean
    }
  }
};
class Dialog extends Popup {
  constructor() {
    super();
    this._screenResizeHandler = this._center.bind(this);
    this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
    this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
    this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
    this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
  }
  static get metadata() {
    return metadata$4;
  }
  static get dependencies() {
    return [
      Icon
    ];
  }
  static get template() {
    return block0$3;
  }
  static get styles() {
    return [browserScrollbarCSS, PopupsCommonCss, dialogCSS];
  }
  static _isHeader(element) {
    return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
  }
  async show(preventInitialFocus = false) {
    await super._open(preventInitialFocus);
  }
  get isModal() {
    return true;
  }
  get shouldHideBackdrop() {
    return false;
  }
  get _ariaLabelledBy() {
    let ariaLabelledById;
    if (this.headerText !== "" && !this._ariaLabel) {
      ariaLabelledById = "ui5-popup-header-text";
    }
    return ariaLabelledById;
  }
  get _ariaModal() {
    return true;
  }
  get _displayProp() {
    return "flex";
  }
  get _displayHeader() {
    return this.header.length || this.headerText || this.draggable || this.resizable;
  }
  get _movable() {
    return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
  }
  get _headerTabIndex() {
    return this._movable ? "0" : void 0;
  }
  get _showResizeHandle() {
    return this.resizable && this.onDesktop;
  }
  _show() {
    super._show();
    this._center();
  }
  onBeforeRendering() {
    this._isRTL = this.effectiveDir === "rtl";
    this.onPhone = isPhone();
    this.onDesktop = isDesktop();
    this._detachResizeHandlers();
  }
  onAfterRendering() {
    this._attachResizeHandlers();
  }
  onExitDOM() {
    super.onExitDOM();
    this._detachResizeHandlers();
  }
  _attachResizeHandlers() {
    ResizeHandler.register(this, this._screenResizeHandler);
    ResizeHandler.register(document.body, this._screenResizeHandler);
    this._resizeHandlersAttached = true;
  }
  _detachResizeHandlers() {
    if (this._resizeHandlersAttached) {
      ResizeHandler.deregister(this, this._screenResizeHandler);
      ResizeHandler.deregister(document.body, this._screenResizeHandler);
      this._resizeHandlersAttached = false;
    }
  }
  _center() {
    const height = window.innerHeight - this.offsetHeight, width = window.innerWidth - this.offsetWidth;
    Object.assign(this.style, {
      top: `${Math.round(height / 2)}px`,
      left: `${Math.round(width / 2)}px`
    });
  }
  _revertSize() {
    Object.assign(this.style, {
      top: "",
      left: "",
      width: "",
      height: ""
    });
    this.removeEventListener("ui5-before-close", this._revertSize);
  }
  _onDragMouseDown(event) {
    if (!this._movable || !this.draggable || !Dialog._isHeader(event.target)) {
      return;
    }
    event.preventDefault();
    const {
      top,
      left
    } = this.getBoundingClientRect();
    const {
      width,
      height
    } = window.getComputedStyle(this);
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`,
      width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
      height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`
    });
    this._x = event.clientX;
    this._y = event.clientY;
    this._attachMouseDragHandlers();
  }
  _onDragMouseMove(event) {
    event.preventDefault();
    const calcX = this._x - event.clientX;
    const calcY = this._y - event.clientY;
    const {
      left,
      top
    } = this.getBoundingClientRect();
    Object.assign(this.style, {
      left: `${Math.floor(left - calcX)}px`,
      top: `${Math.floor(top - calcY)}px`
    });
    this._x = event.clientX;
    this._y = event.clientY;
  }
  _onDragMouseUp() {
    this._x = null;
    this._y = null;
    this._detachMouseDragHandlers();
  }
  _onDragOrResizeKeyDown(event) {
    if (!this._movable || !Dialog._isHeader(event.target)) {
      return;
    }
    if (this.draggable && [isUp, isDown, isLeft, isRight].some((key) => key(event))) {
      this._dragWithEvent(event);
      return;
    }
    if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some((key) => key(event))) {
      this._resizeWithEvent(event);
    }
  }
  _dragWithEvent(event) {
    const {
      top,
      left,
      width,
      height
    } = this.getBoundingClientRect();
    let newPos, posDirection;
    switch (true) {
      case isUp(event):
        newPos = top - STEP_SIZE;
        posDirection = "top";
        break;
      case isDown(event):
        newPos = top + STEP_SIZE;
        posDirection = "top";
        break;
      case isLeft(event):
        newPos = left - STEP_SIZE;
        posDirection = "left";
        break;
      case isRight(event):
        newPos = left + STEP_SIZE;
        posDirection = "left";
        break;
    }
    newPos = clamp(newPos, 0, posDirection === "left" ? window.innerWidth - width : window.innerHeight - height);
    this.style[posDirection] = `${newPos}px`;
  }
  _resizeWithEvent(event) {
    this._detachResizeHandlers();
    this.addEventListener("ui5-before-close", this._revertSize);
    const { top, left } = this.getBoundingClientRect(), style2 = window.getComputedStyle(this), minWidth = Number.parseFloat(style2.minWidth), minHeight = Number.parseFloat(style2.minHeight), maxWidth = window.innerWidth - left, maxHeight = window.innerHeight - top;
    let width = Number.parseFloat(style2.width), height = Number.parseFloat(style2.height);
    switch (true) {
      case isUpShift(event):
        height -= STEP_SIZE;
        break;
      case isDownShift(event):
        height += STEP_SIZE;
        break;
      case isLeftShift(event):
        width -= STEP_SIZE;
        break;
      case isRightShift(event):
        width += STEP_SIZE;
        break;
    }
    width = clamp(width, minWidth, maxWidth);
    height = clamp(height, minHeight, maxHeight);
    Object.assign(this.style, {
      width: `${width}px`,
      height: `${height}px`
    });
  }
  _attachMouseDragHandlers() {
    this._detachResizeHandlers();
    window.addEventListener("mousemove", this._dragMouseMoveHandler);
    window.addEventListener("mouseup", this._dragMouseUpHandler);
  }
  _detachMouseDragHandlers() {
    window.removeEventListener("mousemove", this._dragMouseMoveHandler);
    window.removeEventListener("mouseup", this._dragMouseUpHandler);
  }
  _onResizeMouseDown(event) {
    if (!this._movable || !this.resizable) {
      return;
    }
    event.preventDefault();
    const {
      top,
      left
    } = this.getBoundingClientRect();
    const {
      width,
      height,
      minWidth,
      minHeight
    } = window.getComputedStyle(this);
    this._initialX = event.clientX;
    this._initialY = event.clientY;
    this._initialWidth = Number.parseFloat(width);
    this._initialHeight = Number.parseFloat(height);
    this._initialTop = top;
    this._initialLeft = left;
    this._minWidth = Number.parseFloat(minWidth);
    this._minHeight = Number.parseFloat(minHeight);
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`
    });
    this._attachMouseResizeHandlers();
  }
  _onResizeMouseMove(event) {
    const { clientX, clientY } = event;
    let newWidth, newLeft;
    if (this._isRTL) {
      newWidth = clamp(this._initialWidth - (clientX - this._initialX), this._minWidth, this._initialLeft + this._initialWidth);
      newLeft = clamp(this._initialLeft + (clientX - this._initialX), 0, this._initialX + this._initialWidth - this._minWidth);
    } else {
      newWidth = clamp(this._initialWidth + (clientX - this._initialX), this._minWidth, window.innerWidth - this._initialLeft);
    }
    const newHeight = clamp(this._initialHeight + (clientY - this._initialY), this._minHeight, window.innerHeight - this._initialTop);
    Object.assign(this.style, {
      height: `${newHeight}px`,
      width: `${newWidth}px`,
      left: newLeft ? `${newLeft}px` : void 0
    });
  }
  _onResizeMouseUp() {
    this._initialX = null;
    this._initialY = null;
    this._initialWidth = null;
    this._initialHeight = null;
    this._initialTop = null;
    this._initialLeft = null;
    this._minWidth = null;
    this._minHeight = null;
    this._detachMouseResizeHandlers();
  }
  _attachMouseResizeHandlers() {
    this._detachResizeHandlers();
    window.addEventListener("mousemove", this._resizeMouseMoveHandler);
    window.addEventListener("mouseup", this._resizeMouseUpHandler);
    this.addEventListener("ui5-before-close", this._revertSize);
  }
  _detachMouseResizeHandlers() {
    window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
    window.removeEventListener("mouseup", this._resizeMouseUpHandler);
  }
}
Dialog.define();
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme$1);
var ResponsivePopoverCss = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopover.css", content: ":host{--_ui5_input_width:100%;min-width:6.25rem;min-height:2rem}:host(:not([with-padding])){--_ui5_popup_content_padding:0}:host([opened]){display:inline-block}.ui5-responsive-popover-header{height:var(--_ui5-responsive_popover_header_height);display:flex;justify-content:space-between;align-items:center;padding:0 1rem;box-shadow:var(--sapContent_HeaderShadow)}:host [dir=rtl] .ui5-responsive-popover-header{padding:0 1rem 0 0}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}" };
const metadata$3 = {
  tag: "ui5-responsive-popover",
  properties: {
    withPadding: {
      type: Boolean
    },
    contentOnlyOnDesktop: {
      type: Boolean
    },
    _hideHeader: {
      type: Boolean
    },
    _hideCloseButton: {
      type: Boolean
    }
  }
};
class ResponsivePopover extends Popover {
  constructor() {
    super();
  }
  static get metadata() {
    return metadata$3;
  }
  static get styles() {
    return [Popover.styles, ResponsivePopoverCss];
  }
  get classes() {
    const allClasses = super.classes;
    allClasses.header = {
      "ui5-responsive-popover-header": true,
      "ui5-responsive-popover-header-no-title": !this.headerText
    };
    return allClasses;
  }
  static get template() {
    return block0$7;
  }
  static get dependencies() {
    return [
      ...Popover.dependencies,
      Button,
      Dialog,
      Title
    ];
  }
  async showAt(opener, preventInitialFocus = false) {
    if (!isPhone()) {
      await super.showAt(opener, preventInitialFocus);
    } else {
      this.style.display = "contents";
      this.style.zIndex = getNextZIndex();
      await this._dialog.show(preventInitialFocus);
    }
  }
  close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
    if (!isPhone()) {
      super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
    } else {
      this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
    }
  }
  toggle(opener) {
    if (this.isOpen()) {
      return this.close();
    }
    this.showAt(opener);
  }
  isOpen() {
    return isPhone() ? this._dialog.isOpen() : super.isOpen();
  }
  get _dialog() {
    return this.shadowRoot.querySelector("[ui5-dialog]");
  }
  get _isPhone() {
    return isPhone();
  }
  get _displayHeader() {
    return (this._isPhone || !this.contentOnlyOnDesktop) && super._displayHeader;
  }
  get _displayFooter() {
    return this._isPhone || !this.contentOnlyOnDesktop;
  }
  get _closeDialogAriaLabel() {
    return ResponsivePopover.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
  }
  _afterDialogOpen(event) {
    this.opened = true;
    this._propagateDialogEvent(event);
  }
  _afterDialogClose(event) {
    this.opened = false;
    this._propagateDialogEvent(event);
  }
  _propagateDialogEvent(event) {
    const type = event.type.replace("ui5-", "");
    this.fireEvent(type, event.detail);
  }
  static async onDefine() {
    ResponsivePopover.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
}
ResponsivePopover.define();
const WIZARD_NAV_ARIA_LABEL = { key: "WIZARD_NAV_ARIA_LABEL", defaultText: "Wizard Progress Bar" };
const WIZARD_LIST_ARIA_LABEL = { key: "WIZARD_LIST_ARIA_LABEL", defaultText: "Wizard Steps" };
const WIZARD_LIST_ARIA_DESCRIBEDBY = { key: "WIZARD_LIST_ARIA_DESCRIBEDBY", defaultText: "To activate, press the space bar or Enter" };
const WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL = { key: "WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL", defaultText: "Steps" };
const WIZARD_OPTIONAL_STEP_ARIA_LABEL = { key: "WIZARD_OPTIONAL_STEP_ARIA_LABEL", defaultText: "Optional" };
const WIZARD_STEP_ACTIVE = { key: "WIZARD_STEP_ACTIVE", defaultText: "Active" };
const WIZARD_STEP_INACTIVE = { key: "WIZARD_STEP_INACTIVE", defaultText: "Inactive" };
const WIZARD_STEP_ARIA_LABEL = { key: "WIZARD_STEP_ARIA_LABEL", defaultText: "Step {0}" };
const WIZARD_NAV_ARIA_ROLE_DESCRIPTION = { key: "WIZARD_NAV_ARIA_ROLE_DESCRIPTION", defaultText: "Wizard" };
const WIZARD_NAV_STEP_DEFAULT_HEADING = { key: "WIZARD_NAV_STEP_DEFAULT_HEADING", defaultText: "Step" };
const block0$2 = (context, tags, suffix) => l$1`<div class="ui5-wiz-step-root" role="listitem" tabindex="${l(context.tabIndex)}" aria-current="${l(context.accInfo.ariaCurrent)}" aria-setsize="${l(context.accInfo.ariaSetsize)}" aria-posinset="${l(context.accInfo.ariaPosinset)}" aria-disabled="${l(context.accInfo.ariaDisabled)}" aria-label="${l(context.accInfo.ariaLabel)}" @click="${context._onclick}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @focusin="${context._onfocusin}"><div class="ui5-wiz-step-main"><div class="ui5-wiz-step-icon-circle">${context.icon ? block1$2(context, tags, suffix) : block2$1(context)}</div>${context.hasTexts ? block3(context) : void 0}</div>${!context.hideSeparator ? block4() : void 0}</div>`;
const block1$2 = (context, tags, suffix) => l$1`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-wiz-step-icon" name="${l(context.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>`;
const block2$1 = (context, tags, suffix) => l$1`<span class="ui5-wiz-step-number">${l(context.number)}</span>`;
const block3 = (context, tags, suffix) => l$1`<div class="ui5-wiz-step-texts"><div class="ui5-wiz-step-title-text">${l(context.titleText)}</div><div class="ui5-wiz-step-subtitle-text">${l(context.subtitleText)}</div></div>`;
const block4 = (context, tags, suffix) => l$1`<div class="ui5-wiz-step-hr"></div>`;
var defaultTheme = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/sap_fiori_3/parameters-bundle.css", content: ":root{--_ui5_bar_base_height:2.75rem;--_ui5_bar_subheader_height:3rem}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_bar_base_height:2.5rem;--_ui5_bar_subheader_height:2.25rem}:root{--_ui5_fcl_solid_bg:var(--sapShell_Background);--_ui5_fcl_column_border:none;--_ui5_fcl_decoration_top:linear-gradient(0deg,var(--sapHighlightColor),#f3f4f5);--_ui5_fcl_decoration_bottom:linear-gradient(180deg,var(--sapHighlightColor),#f3f4f5);--sapIllus_BrandColorPrimary:var(--sapContent_Illustrative_Color1);--sapIllus_BrandColorSecondary:var(--sapContent_Illustrative_Color2);--sapIllus_StrokeDetailColor:var(--sapContent_Illustrative_Color4);--sapIllus_Layering1:var(--sapContent_Illustrative_Color5);--sapIllus_Layering2:var(--sapContent_Illustrative_Color6);--sapIllus_BackgroundColor:var(--sapContent_Illustrative_Color7);--sapIllus_ObjectFillColor:var(--sapContent_Illustrative_Color8);--sapIllus_AccentColor:var(--sapContent_Illustrative_Color3);--sapIllus_NoColor:none;--sapIllus_PatternShadow:url(#sapIllus_PatternShadow);--sapIllus_PatternHighlight:url(#sapIllus_PatternHighlight);--_ui5_media_gallery_overflow_btn_background:var(--sapButton_Neutral_Background);--_ui5_media_gallery_overflow_btn_color:var(--sapBaseColor);--_ui5_media_gallery_overflow_btn_border:none;--_ui5_media_gallery_thumbnail_border:1px solid var(--sapContent_ForegroundColor);--_ui5_media_gallery_thumbnail_selected_border:2px solid var(--sapSelectedColor);--_ui5_media_gallery_thumbnail_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_media_gallery_item_overlay_box_shadow:inset 0px 0px 80px rgba(0,0,0,0.2);--_ui5_page_list_bg:var(--sapGroup_ContentBackground);--_ui5_product_switch_item_width:11.25rem;--_ui5_product_switch_item_height:7rem;--_ui5_product_switch_item_outline_width:.0625rem;--_ui5_product_switch_item_outline_color:var(--sapContent_FocusColor);--_ui5_product_switch_item_outline:var(--_ui5_product_switch_item_outline_width) var(--_ui5_product_switch_item_outline_color) dotted;--_ui5_product_switch_item_active_outline_color:var(--sapContent_ContrastFocusColor);--_ui5_product_switch_item_outline_offset:-.1875rem;--_ui5_product_switch_item_outline_offset_positive:.1875rem;--_ui5_shellbar_logo_outline_color:var(--sapContent_ContrastFocusColor);--_ui5_shellbar_logo_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--_ui5_shellbar_logo_outline_color);--_ui5_shellbar_outline_offset:-0.0625rem;--_ui5_shellbar_button_box_shadow:none;--_ui5_shellbar_button_active_color:var(--sapShell_Active_TextColor);--_ui5_shellbar_logo_outline_border_radius:0;--_ui5_shellbar_copilot_stop_color1:#c0d9f2;--_ui5_shellbar_copilot_stop_color2:#fff;--_ui5_TimelineItem_arrow_size:1.625rem;--_ui5_TimelineItem_bubble_border_width:0.0625rem;--_ui5_TimelineItem_bubble_border_style:dotted;--_ui5_TimelineItem_bubble_border_radius:0;--_ui5_TimelineItem_bubble_border_top:-0.125rem;--_ui5_TimelineItem_bubble_border_right:-0.125rem;--_ui5_TimelineItem_bubble_border_bottom:-0.125rem;--_ui5_TimelineItem_bubble_border_left:-0.625rem;--_ui5_TimelineItem_bubble_rtl_left_offset:-0.125rem;--_ui5_TimelineItem_bubble_rtl_right_offset:-0.625rem;--ui5_upload_collection_drag_overlay_border:0.125rem dashed var(--sapContent_ForegroundBorderColor);--ui5_upload_collection_drop_overlay_border:0.125rem solid var(--sapContent_DragAndDropActiveColor);--ui5_upload_collection_drop_overlay_background:transparent;--_ui5_wiz_tab_focus_outline:1px dotted var(--sapContent_FocusColor);--_ui5_wiz_tab_selected_bg:var(--sapSelectedColor);--_ui5_wiz_tab_border:1px solid var(--sapSelectedColor);--_ui5_wiz_tab_selection_line:var(--sapSelectedColor);--_ui5_wiz_tab_icon_color:var(--sapSelectedColor);--_ui5_wiz_tab_active_separator_color:var(--sapSelectedColor);--_ui5_wiz_tab_title_color:var(--sapContent_LabelColor);--_ui5_wiz_tab_title_font_weight:normal;--_ui5_wiz_tab_focus_border_radius:0}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => defaultTheme);
var WizardTabCss = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/WizardTab.css", content: ':host(:not([hidden])){min-width:1px}:host([selected]:not([disabled])) .ui5-wiz-step-icon-circle{background:var(--_ui5_wiz_tab_selected_bg)}:host([selected]:not([disabled])) .ui5-wiz-step-icon-circle:after{content:"";position:absolute;border-bottom:.25rem solid var(--_ui5_wiz_tab_selection_line);border-top-left-radius:.1875rem;border-top-right-radius:.1875rem;left:0;right:0;bottom:-1rem}:host([selected]:not([disabled])) .ui5-wiz-step-icon{color:var(--sapContent_ContrastIconColor)}:host([selected]:not([disabled])) .ui5-wiz-step-number{color:var(--sapContent_ContrastTextColor)}:host([disabled]) .ui5-wiz-step-icon-circle{border-color:var(--sapList_BorderColor);background:var(--sapObjectHeader_Background)}:host([disabled]) .ui5-wiz-step-icon{color:var(--sapContent_LabelColor)}:host([disabled]) .ui5-wiz-step-number{color:var(--sapContent_LabelColor)}.ui5-wiz-step-root{display:flex;align-items:center;flex-direction:row;font-size:var(--sapFontSize);font-family:var(--sapFontFamily);outline:none}.ui5-wiz-step-main{text-align:center;white-space:nowrap}:host(:not([disabled])) .ui5-wiz-step-main{cursor:pointer}.ui5-wiz-step-root:focus .ui5-wiz-step-main{outline:var(--_ui5_wiz_tab_focus_outline);outline-offset:1px;border-radius:var(--_ui5_wiz_tab_focus_border_radius)}.ui5-wiz-step-icon-circle{display:inline-flex;box-sizing:border-box;vertical-align:middle;justify-content:center;align-items:center;text-align:center;width:2rem;height:2rem;margin:0 .1875rem;line-height:1.875rem;border-radius:50%;background:var(--sapObjectHeader_Background);border:var(--_ui5_wiz_tab_border);position:relative}.ui5-wiz-step-icon{width:1rem;height:1rem;color:var(--_ui5_wiz_tab_icon_color);pointer-events:none}.ui5-wiz-step-number{color:var(--_ui5_wiz_tab_icon_color)}.ui5-wiz-step-texts{display:inline-block;vertical-align:middle;text-align:left;padding:0 .5rem 0 .1875rem;max-height:3rem;overflow:hidden;background:var(--sapObjectHeader_Background)}.ui5-wiz-step-subtitle-text,.ui5-wiz-step-title-text{color:var(--_ui5_wiz_tab_title_color);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ui5-wiz-step-title-text{font-weight:var(--_ui5_wiz_tab_title_font_weight)}:host([data-ui5-wizard-expanded-tab-prev=true]) .ui5-wiz-step-subtitle-text,:host([data-ui5-wizard-expanded-tab-prev=true]) .ui5-wiz-step-title-text,:host([data-ui5-wizard-expanded-tab=false]) .ui5-wiz-step-subtitle-text,:host([data-ui5-wizard-expanded-tab=false]) .ui5-wiz-step-texts,:host([data-ui5-wizard-expanded-tab=false]) .ui5-wiz-step-title-text{display:none}.ui5-wiz-step-subtitle-text{font-size:var(--sapFontSmallSize)}.ui5-wiz-step-hr{display:inline-block;border-bottom-color:var(--sapList_BorderColor);border-bottom-width:1px;border-bottom-style:solid;height:1px;flex-grow:1;margin-right:.25rem}:host([active-separator]) .ui5-wiz-step-hr{border-bottom-color:var(--_ui5_wiz_tab_active_separator_color)}:host([branching-separator]) .ui5-wiz-step-hr{border-bottom-style:dashed}[ui5-wizard-tab] .ui5-wiz-step-main{pointer-events:none}:host([data-ui5-wizard-expanded-tab=false]) .ui5-wiz-step-root{display:inline;position:absolute;top:0}:host([data-ui5-wizard-after-current-tab=true]) .ui5-wiz-step-root{right:0}:host([data-ui5-wizard-expanded-tab=false]) .ui5-wiz-step-hr{display:none}' };
const metadata$2 = {
  tag: "ui5-wizard-tab",
  properties: {
    icon: {
      type: String
    },
    titleText: {
      type: String
    },
    subtitleText: {
      type: String
    },
    number: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    selected: {
      type: Boolean
    },
    hideSeparator: {
      type: Boolean
    },
    activeSeparator: {
      type: Boolean
    },
    branchingSeparator: {
      type: Boolean
    },
    _tabIndex: {
      type: String,
      defaultValue: "-1"
    },
    _wizardTabAccInfo: {
      type: Object
    }
  },
  slots: {},
  events: {
    "selection-change-requested": {}
  }
};
class WizardTab extends UI5Element {
  static get metadata() {
    return metadata$2;
  }
  static get render() {
    return litRender;
  }
  static get styles() {
    return WizardTabCss;
  }
  static get template() {
    return block0$2;
  }
  static get dependencies() {
    return [Icon];
  }
  _onclick() {
    if (!this.disabled) {
      this.fireEvent("selection-change-requested");
    }
  }
  _onkeyup(event) {
    if (this.disabled) {
      return;
    }
    if ((isSpace(event) || isEnter(event)) && !isSpaceShift(event)) {
      event.preventDefault();
      this.fireEvent("selection-change-requested");
    }
  }
  _onfocusin() {
    this.fireEvent("focused");
  }
  get tabIndex() {
    return this._tabIndex;
  }
  get hasTexts() {
    return this.titleText || this.subtitleText;
  }
  get accInfo() {
    return {
      "ariaSetsize": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaSetsize,
      "ariaPosinset": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaPosinset,
      "ariaLabel": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaLabel,
      "ariaCurrent": this.selected ? "true" : void 0,
      "ariaDisabled": this.disabled ? "true" : void 0
    };
  }
}
WizardTab.define();
const metadata$1 = {
  tag: "ui5-wizard-step",
  properties: {
    titleText: {
      type: String
    },
    subtitleText: {
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    selected: {
      type: Boolean
    },
    branching: {
      type: Boolean
    }
  },
  slots: {
    "default": {
      type: Node
    }
  },
  events: {}
};
class WizardStep extends UI5Element {
  static get metadata() {
    return metadata$1;
  }
}
WizardStep.define();
const block0$1 = (context, tags, suffix) => l$1`<div class="ui5-wiz-root" aria-label="${l(context.ariaLabelText)}" role="region"><nav class="ui5-wiz-nav" aria-label="${l(context.navAriaLabelText)}" tabindex="-1"><div class="ui5-wiz-nav-list" role="list" aria-label="${l(context.listAriaLabelText)}" aria-describedby="wiz-nav-descr" aria-controls="${l(context._id)}-wiz-content">${c(context._stepsInHeader, (item, index) => item._id || index, (item, index) => block1$1(item, index, context, tags, suffix))}</div></nav><span id="wiz-nav-descr" class="ui5-hidden-text">${l(context.navAriaDescribedbyText)}</span><div id="${l(context._id)}-wiz-content" class="ui5-wiz-content" @scroll="${context.onScroll}">${c(context._steps, (item, index) => item._id || index, (item, index) => block2(item))}</div></div>`;
const block1$1 = (item, index, context, tags, suffix) => l$1`<${scopeTag("ui5-wizard-tab", tags, suffix)} title-text="${l(item.titleText)}" subtitle-text="${l(item.subtitleText)}" icon="${l(item.icon)}" number="${l(item.number)}" ?disabled="${item.disabled}" ?selected="${item.selected}" ?hide-separator="${item.hideSeparator}" ?active-separator="${item.activeSeparator}" ?branching-separator="${item.branchingSeparator}" ._wizardTabAccInfo="${l(item.accInfo)}" data-ui5-content-ref-id="${l(item.refStepId)}" data-ui5-index="${l(item.pos)}" _tab-index="${l(item.tabIndex)}" @ui5-selection-change-requested="${l(context.onSelectionChangeRequested)}" @ui5-focused="${l(context.onStepInHeaderFocused)}" @click="${context._onGroupedTabClick}" style=${styleMap(item.styles)}></${scopeTag("ui5-wizard-tab", tags, suffix)}>`;
const block2 = (item, index, context, tags, suffix) => l$1`<div class="ui5-wiz-content-item" ?hidden="${item.disabled}" ?selected="${item.selected}" ?stretch="${item.stretch}" aria-label="${l(item.stepContentAriaLabel)}" role="region" data-ui5-content-item-ref-id="${l(item._id)}"><slot name="${l(item._individualSlot)}"></slot></div>`;
const block0 = (context, tags, suffix) => l$1`<${scopeTag("ui5-responsive-popover", tags, suffix)} horizontal-align="Center" placement-type="Bottom" aria-label="${l(context.actionSheetStepsText)}" class="${o(context.classes.popover)}" @ui5-after-close=${l(context._afterClosePopover)} content-only-on-desktop prevent-focus-restore with-padding _hide-header><ul class="ui5-wizard-responsive-popover-list">${c(context._groupedTabs, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix))}</ul><div slot="footer" class="ui5-responsive-popover-footer"><${scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${context._closeRespPopover}">Cancel</${scopeTag("ui5-button", tags, suffix)}></div></${scopeTag("ui5-responsive-popover", tags, suffix)}>`;
const block1 = (item, index, context, tags, suffix) => l$1`<li><${scopeTag("ui5-button", tags, suffix)} icon="${l(item.icon)}" ?disabled="${item.disabled}" design="Transparent" data-ui5-header-tab-ref-id="${l(item.accInfo.ariaPosinset)}" @click="${context._onOverflowStepButtonClick}">${l(item.titleText)}</${scopeTag("ui5-button", tags, suffix)}></li>`;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => defaultTheme);
var WizardCss = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/Wizard.css", content: ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:block;height:100%;width:100%;overflow:auto}.ui5-wiz-root{height:100%;width:100%;position:relative}.ui5-wiz-content{position:relative;overflow:auto;height:calc(100% - 4rem);box-sizing:border-box;background:var(--sapBackgroundColor)}.ui5-wiz-content-item{display:block;box-sizing:border-box;padding:1rem 2rem}.ui5-wiz-content-item[hidden]{display:none}.ui5-wiz-content-item[stretch]{min-height:calc(100% + 2rem)}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=true]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:2rem;padding-left:.5rem}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:.25rem;padding:0}.ui5-wiz-nav-list{display:table;table-layout:fixed;position:relative;list-style:none;margin:0;box-sizing:border-box;width:100%;height:2rem;padding:0}[ui5-wizard-tab]{display:table-cell;position:relative}.ui5-wiz-nav{box-sizing:border-box;height:4rem;padding:.875rem 2rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:var(--sapObjectHeader_Background);font-size:.875rem;box-shadow:var(--sapContent_HeaderShadow);outline:none;display:flex;align-items:center}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:.25rem}[ui5-wizard-tab][data-ui5-wizard-expanded-tab-prev=true],[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab-prev=true]{width:2rem;padding-right:.75rem}" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => defaultTheme);
var WizardPopoverCss = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/WizardPopover.css", content: ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}.ui5-wizard-responsive-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-wizard-responsive-popover-list{list-style:none;margin:0;padding:0}.ui5-wizard-popover .ui5-wizard-responsive-popover-list [ui5-button]{width:200px}.ui5-wizard-dialog .ui5-wizard-responsive-popover-list [ui5-button]{width:100%}" };
const MIN_STEP_WIDTH_NO_TITLE = 64;
const MIN_STEP_WIDTH_WITH_TITLE = 200;
const EXPANDED_STEP = "data-ui5-wizard-expanded-tab";
const AFTER_EXPANDED_STEP = "data-ui5-wizard-expanded-tab-next";
const AFTER_CURRENT_STEP = "data-ui5-wizard-after-current-tab";
const BEFORE_EXPANDED_STEP = "data-ui5-wizard-expanded-tab-prev";
const STEP_SWITCH_THRESHOLDS = {
  MIN: 0.5,
  DEFAULT: 0.7,
  MAX: 1
};
const metadata = {
  tag: "ui5-wizard",
  managedSlots: true,
  fastNavigation: true,
  properties: {
    width: {
      type: Float
    },
    stepSwitchThreshold: {
      type: Float,
      defaultValue: STEP_SWITCH_THRESHOLDS.DEFAULT
    },
    contentHeight: {
      type: Float
    },
    _groupedTabs: {
      type: String,
      multiple: true
    }
  },
  slots: {
    "default": {
      propertyName: "steps",
      type: HTMLElement,
      "individualSlots": true,
      invalidateOnChildChange: true
    }
  },
  events: {
    "step-change": {
      detail: {
        step: { type: HTMLElement },
        previousStep: { type: HTMLElement },
        changeWithClick: { Boolean }
      }
    }
  }
};
class Wizard extends UI5Element {
  constructor() {
    super();
    this.stepScrollOffsets = [];
    this._groupedTabs = [];
    this.selectedStepIndex = 0;
    this.previouslySelectedStepIndex = 0;
    this.selectionRequestedByClick = false;
    this._prevWidth = 0;
    this._prevContentHeight = 0;
    this.selectionRequestedByScroll = false;
    this._itemNavigation = new ItemNavigation(this, {
      navigationMode: NavigationMode.Auto,
      getItemsCallback: () => this.enabledStepsInHeaderDOM
    });
    this._onStepResize = this.onStepResize.bind(this);
  }
  static get metadata() {
    return metadata;
  }
  static get render() {
    return litRender;
  }
  get classes() {
    return {
      popover: {
        "ui5-wizard-responsive-popover": true,
        "ui5-wizard-popover": !isPhone(),
        "ui5-wizard-dialog": isPhone()
      }
    };
  }
  static get styles() {
    return WizardCss;
  }
  static get staticAreaStyles() {
    return WizardPopoverCss;
  }
  static get template() {
    return block0$1;
  }
  static get dependencies() {
    return [
      WizardTab,
      WizardStep,
      ResponsivePopover,
      Button
    ];
  }
  static async onDefine() {
    Wizard.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
  }
  static get PHONE_BREAKPOINT() {
    return 599;
  }
  static get SCROLL_DEBOUNCE_RATE() {
    return 25;
  }
  static get staticAreaTemplate() {
    return block0;
  }
  onExitDOM() {
    this.detachStepsResizeObserver();
  }
  onBeforeRendering() {
    this.syncSelection();
  }
  onAfterRendering() {
    this.storeStepScrollOffsets();
    if (this.previouslySelectedStepIndex !== this.selectedStepIndex) {
      this.scrollToSelectedStep();
    }
    this.attachStepsResizeObserver();
    this.previouslySelectedStepIndex = this.selectedStepIndex;
  }
  syncSelection() {
    if (this.stepsCount === 0) {
      return;
    }
    if (this.selectedStepsCount === 0) {
      this.selectFirstStep();
      console.warn("Selecting the first step: no selected step is defined.");
    }
    if (this.selectedStepsCount > 1) {
      this.selectLastSelectedStep();
      console.warn(`Selecting the last step defined as selected: multiple selected steps are defined.`);
    }
    if (this.selectedStep && this.selectedStep.disabled) {
      console.warn("The selected step is disabled: you need to enable it in order to interact with the step.");
    }
    this.selectedStepIndex = this.getSelectedStepIndex();
  }
  selectFirstStep() {
    this.deselectAll();
    this.slottedSteps[0].selected = true;
    this.slottedSteps[0].disabled = false;
  }
  selectLastSelectedStep() {
    const lastSelectedStep = this.lastSelectedStep;
    if (lastSelectedStep) {
      this.deselectAll();
      lastSelectedStep.selected = true;
      lastSelectedStep.disabled = false;
    }
  }
  deselectAll() {
    this.slottedSteps.forEach((step) => {
      step.selected = false;
    });
  }
  storeStepScrollOffsets() {
    this.stepScrollOffsets = this.slottedSteps.map((step) => {
      const contentItem = this.getStepWrapperByRefId(step._id);
      return contentItem.offsetTop + contentItem.offsetHeight;
    });
  }
  onSelectionChangeRequested(event) {
    this.selectionRequestedByClick = true;
    this.changeSelectionByStepAction(event.target);
  }
  onScroll(event) {
    if (this.selectionRequestedByClick) {
      this.selectionRequestedByClick = false;
      return;
    }
    debounce(this.changeSelectionByScroll.bind(this, event.target.scrollTop), Wizard.SCROLL_DEBOUNCE_RATE);
  }
  onStepInHeaderFocused(event) {
    this._itemNavigation.setCurrentItem(event.target);
  }
  onStepResize() {
    this.width = this.getBoundingClientRect().width;
    this.contentHeight = this.getContentHeight();
    if (this._prevWidth !== this.width || this.contentHeight !== this._prevContentHeight) {
      this._closeRespPopover();
    }
    this._prevWidth = this.width;
    this._prevContentHeight = this.contentHeight;
  }
  attachStepsResizeObserver() {
    this.stepsDOM.forEach((stepDOM) => {
      ResizeHandler.deregister(stepDOM, this._onStepResize);
      ResizeHandler.register(stepDOM, this._onStepResize);
    });
  }
  detachStepsResizeObserver() {
    this.stepsDOM.forEach((stepDOM) => {
      ResizeHandler.deregister(stepDOM, this._onStepResize);
    });
  }
  _adjustHeaderOverflow() {
    let counter = 0;
    let isForward = true;
    const iWidth = this.width;
    const iCurrStep = this.getSelectedStepIndex();
    const iStepsToShow = this.steps.length ? Math.floor(iWidth / MIN_STEP_WIDTH_WITH_TITLE) : Math.floor(iWidth / MIN_STEP_WIDTH_NO_TITLE);
    const tabs = this.shadowRoot.querySelectorAll("[ui5-wizard-tab]");
    if (!tabs.length) {
      return;
    }
    [].forEach.call(tabs, (step, index) => {
      step.setAttribute(EXPANDED_STEP, false);
      step.setAttribute(BEFORE_EXPANDED_STEP, false);
      step.setAttribute(AFTER_EXPANDED_STEP, false);
      if (index > iCurrStep) {
        tabs[index].setAttribute(AFTER_CURRENT_STEP, true);
      } else {
        tabs[index].removeAttribute(AFTER_CURRENT_STEP);
      }
    });
    if (tabs[iCurrStep]) {
      tabs[iCurrStep].setAttribute(EXPANDED_STEP, true);
    }
    for (let i2 = 1; i2 < iStepsToShow; i2++) {
      if (isForward) {
        counter += 1;
      }
      if (isForward && tabs[iCurrStep + counter]) {
        tabs[iCurrStep + counter].setAttribute(EXPANDED_STEP, true);
        isForward = !isForward;
      } else if (!isForward && tabs[iCurrStep - counter]) {
        tabs[iCurrStep - counter].setAttribute(EXPANDED_STEP, true);
        isForward = !isForward;
      } else if (tabs[iCurrStep + counter + 1]) {
        counter += 1;
        tabs[iCurrStep + counter].setAttribute(EXPANDED_STEP, true);
        isForward = true;
      } else if (tabs[iCurrStep - counter]) {
        tabs[iCurrStep - counter].setAttribute(EXPANDED_STEP, true);
        counter += 1;
        isForward = false;
      }
    }
    for (let i2 = 0; i2 < tabs.length; i2++) {
      if (tabs[i2].getAttribute(EXPANDED_STEP) === "true" && tabs[i2 - 1] && tabs[i2 - 1].getAttribute(EXPANDED_STEP) === "false") {
        tabs[i2 - 1].setAttribute(BEFORE_EXPANDED_STEP, true);
      }
      if (tabs[i2].getAttribute(EXPANDED_STEP) === "false" && tabs[i2 - 1] && tabs[i2 - 1].getAttribute(EXPANDED_STEP) === "true") {
        tabs[i2].setAttribute(AFTER_EXPANDED_STEP, true);
        break;
      }
    }
  }
  _isGroupAtStart(selectedStep) {
    const iStepNumber = this.stepsInHeaderDOM.indexOf(selectedStep);
    return selectedStep.getAttribute(EXPANDED_STEP) === "false" && selectedStep.getAttribute(BEFORE_EXPANDED_STEP) === "true" && iStepNumber > 0;
  }
  _isGroupAtEnd(selectedStep) {
    const iStepNumber = this.stepsInHeaderDOM.indexOf(selectedStep);
    return selectedStep.getAttribute(EXPANDED_STEP) === "false" && selectedStep.getAttribute(AFTER_EXPANDED_STEP) === "true" && iStepNumber + 1 < this.steps.length;
  }
  async _showPopover(oDomTarget, bAtStart) {
    const tabs = Array.from(this.shadowRoot.querySelectorAll("[ui5-wizard-tab]"));
    this._groupedTabs = [];
    const iFromStep = bAtStart ? 0 : this.stepsInHeaderDOM.indexOf(oDomTarget);
    const iToStep = bAtStart ? this.stepsInHeaderDOM.indexOf(oDomTarget) : tabs.length - 1;
    for (let i2 = iFromStep; i2 <= iToStep; i2++) {
      this._groupedTabs.push(tabs[i2]);
    }
    const responsivePopover = await this._respPopover();
    responsivePopover.showAt(oDomTarget);
  }
  async _onGroupedTabClick(event) {
    if (this._isGroupAtStart(event.target)) {
      return this._showPopover(event.target, true);
    }
    if (this._isGroupAtEnd(event.target)) {
      return this._showPopover(event.target, false);
    }
  }
  _onOverflowStepButtonClick(event) {
    const tabs = Array.from(this.shadowRoot.querySelectorAll("[ui5-wizard-tab]"));
    const stepRefId = event.target.getAttribute("data-ui5-header-tab-ref-id");
    const stepToSelect = this.slottedSteps[stepRefId - 1];
    const selectedStep = this.selectedStep;
    const newlySelectedIndex = this.slottedSteps.indexOf(stepToSelect);
    this.switchSelectionFromOldToNewStep(selectedStep, stepToSelect, newlySelectedIndex, true);
    this._closeRespPopover();
    tabs[newlySelectedIndex].focus();
  }
  async _closeRespPopover() {
    const responsivePopover = await this._respPopover();
    responsivePopover && responsivePopover.close();
  }
  async _respPopover() {
    const staticAreaItem = await this.getStaticAreaItemDomRef();
    return staticAreaItem.querySelector(`.ui5-wizard-responsive-popover`);
  }
  changeSelectionByScroll(scrollPos) {
    const newlySelectedIndex = this.getClosestStepIndexByScrollPos(scrollPos);
    if (this.selectedStepIndex === newlySelectedIndex) {
      return;
    }
    if (newlySelectedIndex >= 0 && newlySelectedIndex <= this.stepsCount - 1) {
      const stepToSelect = this.slottedSteps[newlySelectedIndex];
      this.switchSelectionFromOldToNewStep(this.selectedStep, stepToSelect, newlySelectedIndex, false);
      this.selectionRequestedByScroll = true;
    }
  }
  async changeSelectionByStepAction(stepInHeader) {
    const stepRefId = stepInHeader.getAttribute("data-ui5-content-ref-id");
    const selectedStep = this.selectedStep;
    const stepToSelect = this.getStepByRefId(stepRefId);
    const bExpanded = stepInHeader.getAttribute(EXPANDED_STEP) === "true";
    const newlySelectedIndex = this.slottedSteps.indexOf(stepToSelect);
    const firstFocusableElement = await getFirstFocusableElement(stepToSelect.firstElementChild);
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
    if (selectedStep === stepToSelect) {
      this.scrollToContentItem(this.selectedStepIndex);
      return;
    }
    if (bExpanded || !bExpanded && (newlySelectedIndex === 0 || newlySelectedIndex === this.steps.length - 1)) {
      this.switchSelectionFromOldToNewStep(selectedStep, stepToSelect, newlySelectedIndex, true);
    }
  }
  getContentHeight() {
    let contentHeight = 0;
    this.stepsDOM.forEach((step) => {
      contentHeight += step.getBoundingClientRect().height;
    });
    return contentHeight;
  }
  getStepAriaLabelText(step, ariaLabel) {
    return Wizard.i18nBundle.getText(WIZARD_STEP_ARIA_LABEL, ariaLabel);
  }
  get stepsDOM() {
    return Array.from(this.shadowRoot.querySelectorAll(".ui5-wiz-content-item"));
  }
  get _stepsInHeader() {
    return this.getStepsInfo();
  }
  get _steps() {
    const lastEnabledStepIndex = this.getLastEnabledStepIndex();
    const stepsInfo = this.getStepsInfo();
    return this.steps.map((step, idx) => {
      step.stretch = idx === lastEnabledStepIndex;
      step.stepContentAriaLabel = `${this.navStepDefaultHeading} ${stepsInfo[idx].number} ${stepsInfo[idx].titleText}`;
      return step;
    });
  }
  get stepsCount() {
    return this.slottedSteps.length;
  }
  get selectedStep() {
    if (this.selectedStepsCount) {
      return this.selectedSteps[0];
    }
    return null;
  }
  get lastSelectedStep() {
    if (this.selectedStepsCount) {
      return this.selectedSteps[this.selectedStepsCount - 1];
    }
    return null;
  }
  get selectedSteps() {
    return this.slottedSteps.filter((step) => step.selected);
  }
  get enabledSteps() {
    return this.slottedSteps.filter((step) => !step.disabled);
  }
  get selectedStepsCount() {
    return this.selectedSteps.length;
  }
  get slottedSteps() {
    return this.getSlottedNodes("steps");
  }
  get contentDOM() {
    return this.shadowRoot.querySelector(`.ui5-wiz-content`);
  }
  get stepsInHeaderDOM() {
    return Array.from(this.shadowRoot.querySelectorAll("[ui5-wizard-tab]"));
  }
  get enabledStepsInHeaderDOM() {
    return this.stepsInHeaderDOM;
  }
  get phoneMode() {
    if (isPhone()) {
      return true;
    }
    return this.width <= Wizard.PHONE_BREAKPOINT;
  }
  get navAriaRoleDescription() {
    return Wizard.i18nBundle.getText(WIZARD_NAV_ARIA_ROLE_DESCRIPTION);
  }
  get navAriaLabelText() {
    return Wizard.i18nBundle.getText(WIZARD_NAV_ARIA_LABEL);
  }
  get navAriaDescribedbyText() {
    return Wizard.i18nBundle.getText(WIZARD_LIST_ARIA_DESCRIBEDBY);
  }
  get listAriaLabelText() {
    return Wizard.i18nBundle.getText(WIZARD_LIST_ARIA_LABEL);
  }
  get actionSheetStepsText() {
    return Wizard.i18nBundle.getText(WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL);
  }
  get navStepDefaultHeading() {
    return Wizard.i18nBundle.getText(WIZARD_NAV_STEP_DEFAULT_HEADING);
  }
  get optionalStepText() {
    return Wizard.i18nBundle.getText(WIZARD_OPTIONAL_STEP_ARIA_LABEL);
  }
  get activeStepText() {
    return Wizard.i18nBundle.getText(WIZARD_STEP_ACTIVE);
  }
  get inactiveStepText() {
    return Wizard.i18nBundle.getText(WIZARD_STEP_INACTIVE);
  }
  get ariaLabelText() {
    return Wizard.i18nBundle.getText(WIZARD_NAV_ARIA_ROLE_DESCRIPTION);
  }
  get effectiveStepSwitchThreshold() {
    return clamp(this.stepSwitchThreshold, STEP_SWITCH_THRESHOLDS.MIN, STEP_SWITCH_THRESHOLDS.MAX);
  }
  getStepsInfo() {
    const lastEnabledStepIndex = this.getLastEnabledStepIndex();
    const stepsCount = this.stepsCount;
    const selectedStepIndex = this.getSelectedStepIndex();
    let inintialZIndex = this.steps.length + 10;
    let accInfo;
    this._adjustHeaderOverflow();
    return this.steps.map((step, idx) => {
      const pos = idx + 1;
      const hideSeparator = idx === stepsCount - 1 && !step.branching;
      const isOptional = step.subtitleText ? this.optionalStepText : "";
      const stepStateText = step.disabled ? this.inactiveStepText : this.activeStepText;
      const ariaLabel = (step.titleText ? `${pos} ${step.titleText} ${stepStateText} ${isOptional}` : `${this.navStepDefaultHeading} ${pos} ${stepStateText} ${isOptional}`).trim();
      const isAfterCurrent = idx > selectedStepIndex;
      accInfo = {
        "ariaSetsize": stepsCount,
        "ariaPosinset": pos,
        "ariaLabel": this.getStepAriaLabelText(step, ariaLabel)
      };
      return {
        icon: step.icon,
        titleText: step.titleText,
        subtitleText: step.subtitleText,
        number: pos,
        selected: step.selected,
        disabled: step.disabled,
        hideSeparator,
        activeSeparator: idx < lastEnabledStepIndex && !step.disabled,
        branchingSeparator: step.branching,
        pos,
        accInfo,
        refStepId: step._id,
        tabIndex: this.selectedStepIndex === idx ? "0" : "-1",
        styles: {
          zIndex: isAfterCurrent ? --inintialZIndex : 1
        }
      };
    });
  }
  getSelectedStepIndex() {
    if (this.selectedStep) {
      return this.slottedSteps.indexOf(this.selectedStep);
    }
    return 0;
  }
  getLastEnabledStepIndex() {
    let lastEnabledStepIndex = 0;
    this.slottedSteps.forEach((step, idx) => {
      if (!step.disabled) {
        lastEnabledStepIndex = idx;
      }
    });
    return lastEnabledStepIndex;
  }
  getStepByRefId(refId) {
    return this.slottedSteps.find((step) => step._id === refId);
  }
  getStepWrapperByRefId(refId) {
    return this.shadowRoot.querySelector(`[data-ui5-content-item-ref-id=${refId}]`);
  }
  getStepWrapperByIdx(idx) {
    return this.getStepWrapperByRefId(this.steps[idx]._id);
  }
  scrollToSelectedStep() {
    if (!this.selectionRequestedByScroll) {
      this.scrollToContentItem(this.selectedStepIndex);
    }
    this.selectionRequestedByScroll = false;
  }
  scrollToContentItem(stepIndex) {
    this.contentDOM.scrollTop = this.getClosestScrollPosByStepIndex(stepIndex);
  }
  getClosestScrollPosByStepIndex(stepIndex) {
    if (stepIndex === 0) {
      return 0;
    }
    for (let closestStepIndex = stepIndex - 1; closestStepIndex >= 0; closestStepIndex--) {
      if (this.stepScrollOffsets[closestStepIndex] > 0) {
        return this.stepScrollOffsets[closestStepIndex];
      }
    }
    return 0;
  }
  getClosestStepIndexByScrollPos(scrollPos) {
    for (let closestStepIndex = 0; closestStepIndex <= this.stepScrollOffsets.length - 1; closestStepIndex++) {
      const stepScrollOffset = this.stepScrollOffsets[closestStepIndex];
      const step = this.getStepWrapperByIdx(closestStepIndex);
      const switchStepBoundary = step.offsetTop + step.offsetHeight * this.effectiveStepSwitchThreshold;
      if (stepScrollOffset > 0 && scrollPos < stepScrollOffset) {
        if (scrollPos > switchStepBoundary) {
          return closestStepIndex + 1;
        }
        return closestStepIndex;
      }
    }
    return this.selectedStepIndex;
  }
  switchSelectionFromOldToNewStep(selectedStep, stepToSelect, stepToSelectIndex, changeWithClick) {
    if (selectedStep && stepToSelect) {
      if (!stepToSelect.disabled) {
        selectedStep.selected = false;
        stepToSelect.selected = true;
      }
      this.fireEvent("step-change", {
        step: stepToSelect,
        previousStep: selectedStep,
        changeWithClick
      });
      this.selectedStepIndex = stepToSelectIndex;
    }
  }
  sortAscending(a2, b2) {
    if (a2 < b2) {
      return -1;
    }
    if (a2 > b2) {
      return 1;
    }
    return 0;
  }
}
Wizard.define();
const app = document.querySelector("#app");
app.innerHTML = `
<ui5-wizard id="wiz">
     <ui5-wizard-step icon="product" title-text="Product type" selected>
          <ui5-title>1. Product Type</ui5-title>

          <!-- Move to step 2 -->
          <ui5-button id="toStep2">Step 2</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="hint" title-text="Product Information" disabled>
          <ui5-title>2. Product Information</ui5-title>

          <div>
               <ui5-label>5 years guarantee included</ui5-label>
               <ui5-switch id="sw"></ui5-switch>
          </div>

          <!-- Move to step 3 -->
          <ui5-button id="toStep3" hidden>Step 3</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="action-settings" title-text="Options" disabled>
          <ui5-title>3. Options</ui5-title><br>

          <ui5-segmented-button id="sb">
               <ui5-toggle-button icon="employee" pressed>Small</ui5-toggle-button>
               <ui5-toggle-button>Medium</ui5-toggle-button>
               <ui5-toggle-button>Large</ui5-toggle-button>
          </ui5-segmented-button>

          <!-- Move to step 4 -->
          <ui5-button id="toStep4" hidden>Step 4</ui5-button>
     </ui5-wizard-step>

     <ui5-wizard-step icon="lead" title-text="Pricing" disabled>
          <ui5-title>4. Pricing</ui5-title><br>
          <ui5-button id="finalize">Finalize</ui5-button>
     </ui5-wizard-step>
</ui5-wizard>
`;
const wizard = document.querySelector("#wiz");
const toStep2 = document.querySelector("#toStep2");
const toStep3 = document.querySelector("#toStep3");
const sw = document.querySelector("#sw");
const moveToStep = (idx) => {
  const step = getStep(idx);
  step.selected = true;
  step.disabled = false;
};
const getStep = (idx) => {
  return Array.from(wizard.children)[idx];
};
const deselectAllSteps = () => {
  Array.from(wizard.children).forEach(function(step) {
    step.selected = false;
  });
};
toStep2.addEventListener("click", function() {
  deselectAllSteps();
  moveToStep(1);
});
toStep3.addEventListener("click", function() {
  deselectAllSteps();
  moveToStep(2);
});
sw.addEventListener("change", function() {
  toStep3.removeAttribute("hidden");
});
