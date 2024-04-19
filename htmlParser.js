const { loadView } = require("./loader");

function parseView(view, data = {}) {
  try {
    const tokenKeys = Object.keys(data);

    if (!!view) {
      tokenKeys.forEach((key) => {
        const item = data[key];
        if (typeof item !== "boolean") {
          view = view.replaceAll(`{{${key}}}`, item);
        } else if (item) {
          // TODO: check which one to use when dealing with checkboxes
          // view = view.replaceAll(`{{${key}}}`, "checked");
          view = view.replace(`{{${key}}}`, "checked");
        }
      });
    }

    return view;
  } catch (error) {
    console.log("Exception on parseView: ", error);
    return "Error rendering!";
  }
}

async function parseAndLoad(fileName, data = {}) {
  try {
    const view = await loadView(fileName);
    return parseView(view, data);
  } catch (error) {
    console.log("Exception on parseAndLoad: ", error);
    return "Error rendering!";
  }
}

module.exports = {
  parseView,
  parseAndLoad,
};
