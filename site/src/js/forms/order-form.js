import ApiService from "../services/api-service";
import { Fancybox } from "@fancyapps/ui";
import IMask from 'imask';

export class OrderForm {
  constructor() {
    this.formEl = document.querySelector("#form-modal");
    this.mastersSelect = this.formEl.elements.masterId;
    this.servicesSelect = this.formEl.elements.serviceId;
    this.loader = document.querySelector('.loader-spinner');
    this.resultMessage = document.querySelector('.result-message')
    this.phoneField = this.formEl.elements.phone;
    this.nameField = this.formEl.elements.name;
    this.allFormFields = document.querySelectorAll('.contact-form__input')

    this._init();
    this._bindEvents();
  }

  _init() {
    this._buildMastersSelect();
    this._buildServicesSelect();
    this.addInputMask();
  }

  _bindEvents() {
    this.formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!this.validateForm()){
        return
      }
      const data = new FormData(this.formEl);
      this.loader.classList.toggle('loader-spinner_visible');
      let response = await ApiService.createOrder(Object.fromEntries(data));

      this.resultMessage.classList.toggle('result-message_visible');

      this.loader.classList.toggle('loader-spinner_visible');
      setTimeout(() => {
        this.clearForm();
        Fancybox.close();
        this.resultMessage.classList.toggle('result-message_visible');
      }, "3000")
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

  addInputMask () {
    let maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    let mask = IMask(this.phoneField, maskOptions);
  }

  validateForm() {
    this.phoneField.classList.toggle('contact-form__input_error', false)
    this.nameField.classList.toggle('contact-form__input_error', false)
    let isNameValidated = true;
    let isPhoneValidated = true;

    if (this.nameField.value == "") {
      this.nameField.classList.toggle('contact-form__input_error', true)
      this.nameField.placeholder = "Введите имя";
      isNameValidated = false
    }

    if (this.phoneField.value.length < 16 || this.phoneField.value == "") {
      this.phoneField.classList.toggle('contact-form__input_error', true)
      this.phoneField.placeholder = "Введите номер телефона";
      isPhoneValidated = false
    }
    return isNameValidated && isPhoneValidated && true;
  }

  clearForm() {
    this.allFormFields.forEach(field => {
      field.value = "";
    })
    }

}
