class TabItem {
    constructor(link, content) {
      this.link = link;
      this.content = content;
    }
  
    onClick(callback) {
      this.link.addEventListener("click", () => callback());
    }
  
    activate() {
      this._toggle(true);
    }
  
    deactivate() {
      this._toggle(false);
    }
  
    _toggle(activate) {
      this.link.classList.toggle("active-item", activate);
      this.content.classList.toggle("active-table", activate);
    }
  }
  
  class TabsManager {
    constructor(tabsElem) {
      this.tabs = [];
      this.activeTab = null;
  
      this.init(tabsElem);
      this.activateTab(this.tabs[0]);
    }
  
    init(tabsElem) {
      const links = tabsElem.querySelectorAll(".prices__navigation li");
      const contents = tabsElem.querySelectorAll(".prices__table");
  
      for (let i = 0; i < links.length; i++) {
        const tab = new TabItem(links[i], contents[i]);
        this.tabs.push(tab);
  
        tab.onClick(() => this.activateTab(tab));
      }
    }
  
    activateTab(tab) {
      if (this.activeTab) {
        this.activeTab.deactivate();
      }
      this.activeTab = tab;
      this.activeTab.activate();
    }
  }
  
  window.onload = function () {
    const tabsElem = document.querySelector(".prices__content");
    new TabsManager(tabsElem);
  };