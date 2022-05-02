import ApiService from "../services/api-service";

export class OrderForm {
  constructor() {
    this.formEl = document.querySelector("#form-modal");
    this.mastersSelect = this.formEl.elements.masterId;
    this.servicesSelect = this.formEl.elements.serviceId;
    this.loader = document.querySelector('.await-loader');

    this._init();
    this._bindEvents();
  }

  _init() {
    this._buildMastersSelect();
    this._buildServicesSelect();
  }

  _bindEvents() {
    this.formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(this.formEl);
      this.loader.classList.toggle('visible');
      let response = await ApiService.createOrder(Object.fromEntries(data));
      this.loader.classList.toggle('visible');
      //fancybox close modal

      
    });
  }

  async _buildMastersSelect() {
    const masters = await ApiService.getMasters();

    masters.forEach((master) => {
      const option = document.createElement("option");
      option.value = master.id;
      option.textContent = master.fullName;
      this.mastersSelect.add(option);
    });
  }

  async _buildServicesSelect() {
    const services = await ApiService.getServices();

    services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service.id;
      option.textContent = service.name;
      this.servicesSelect.add(option);
    });
  }
}
