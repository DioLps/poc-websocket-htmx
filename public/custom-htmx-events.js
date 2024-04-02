function cleanElementValueAfterReceiveMessage({
  event,
  sourceTagName,
  sourceId,
  idOfTheElementToBeClean,
}) {
  // Check if the request came from the form with id 'chat'
  if (event.detail.elt.closest(sourceTagName)?.id === sourceId) {
    // Clear the input field
    document.getElementById(idOfTheElementToBeClean).value = "";
  }
}

export default (() => {
  document.body.addEventListener("htmx:wsAfterMessage", function (event) {
    const elementsToClean = [
      {
        event,
        sourceTagName: "section",
        sourceId: "chat",
        idOfTheElementToBeClean: "chat_input",
      },
    ];

    elementsToClean.forEach((ele) => cleanElementValueAfterReceiveMessage(ele));
  });
})();
