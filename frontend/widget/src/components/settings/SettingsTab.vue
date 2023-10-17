<template>
  <div class="reon-mailer-settings__settings-tab">
    <div class="reon-mailer__settings-input">
      <h2 class="reon-mailer__settings-input__title">Введите ваше имя:</h2>
      <input
        type="text"
        class="text-input"
        @input="changeHideInputNameValue"
        v-model="nameInputValue"
      />
    </div>
    <div class="reon-mailer__settings-input">
      <h2 class="reon-mailer__settings-input__title">
        Введите ваш номер телефона:
      </h2>
      <input
        type="text"
        class="text-input"
        @input="changeHideInputPhoneValue"
        v-model="phoneInputValue"
        
      />
    </div>
    <div>
      <input type="checkbox" id="agreement" name="agreement" v-model="isAgree" true-value="true" false-value="false" @change="changeHideInputAgreementValue"/>
      <label for="agreement" class="reon-mailer-settings__checkbox">Я прочитал(-а)
        <a href="https://drive.google.com/file/d/13HBl0vCbeyxANlA3VszC57_xZP-IJbpw/view" target="_blank">Условия</a>  соглашения и согласен(-на) с условиями
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAgree: document.querySelector(`[name=terms_of_use]`).value,
      nameInputValue: document.querySelector(`[name=client_name]`).value,
      phoneInputValue: document.querySelector(`[name=phone_number]`).value,
    };
  },
  methods: {
    changeHideInputNameValue() {
      const hideInput = document.querySelector(`[name=client_name]`);
      hideInput.value = this.nameInputValue;
    },
    changeHideInputPhoneValue() {
      const hideInput = document.querySelector(`[name=phone_number]`);
      hideInput.value = this.phoneInputValue;
    },
    changeHideInputAgreementValue() {
      const hideInput = document.querySelector(`[name=terms_of_use]`);
      hideInput.value = this.isAgree;
    },
  },
};
</script>

<style>
.reon-mailer__settings-input {
  margin-bottom: 20px;
}

.reon-mailer__settings-input__title {
  margin-bottom: 5px;
}

.reon-mailer-settings__checkbox {
  margin-left: 10px;
}
</style>