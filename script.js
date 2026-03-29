function setupSceneLoader() {
  const loadButton = document.getElementById("load-scene");
  const viewerStage = document.getElementById("viewer-stage");
  const sceneTabs = document.querySelectorAll("[data-scene]");
  const sceneTitle = document.getElementById("sample-scene-title");
  const sceneText = document.getElementById("sample-scene-text");

  if (!loadButton || !viewerStage || !sceneTitle || !sceneText || !sceneTabs.length) {
    return;
  }

  const scenes = {
    large: {
      title: "Large Dataset",
      text: "Default public sample",
      src: "https://superspl.at/s?id=306bbd50",
    },
    small: {
      title: "Small Dataset",
      text: "Existing public sample",
      src: "https://superspl.at/s?id=9550345b",
    },
  };

  let isLoaded = false;
  let currentScene = "large";
  let viewerFrame = null;

  const updateTabState = () => {
    sceneTabs.forEach((tab) => {
      const isActive = tab.dataset.scene === currentScene;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  };

  const updateSceneText = () => {
    sceneTitle.textContent = scenes[currentScene].title;
    sceneText.textContent = scenes[currentScene].text;
  };

  const renderScene = () => {
    if (!viewerFrame) {
      viewerFrame = document.createElement("iframe");
      viewerFrame.id = "viewer";
      viewerFrame.className = "scene-frame";
      viewerFrame.width = "800";
      viewerFrame.height = "500";
      viewerFrame.allow = "fullscreen; xr-spatial-tracking";
      viewerFrame.loading = "lazy";
      viewerFrame.title = "SuperSplat 3DGS Scene";
    }

    viewerFrame.src = scenes[currentScene].src;
    viewerStage.replaceChildren(viewerFrame);
  };

  loadButton.addEventListener("click", () => {
    if (isLoaded) {
      return;
    }

    renderScene();
    loadButton.textContent = "Loaded";
    loadButton.disabled = true;
    isLoaded = true;
  });

  sceneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextScene = tab.dataset.scene;

      if (!nextScene || !scenes[nextScene]) {
        return;
      }

      currentScene = nextScene;
      updateTabState();
      updateSceneText();

      if (isLoaded) {
        renderScene();
      }
    });
  });

  updateTabState();
  updateSceneText();
}

window.addEventListener("DOMContentLoaded", () => {
  setupSceneLoader();
});
