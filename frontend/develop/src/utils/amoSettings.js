export default function settingREONConstructor(self) {
    const createTwigCheckbox = (options) => {
        return self.render({ ref: '/tmpl/controls/checkbox.twig' }, options);
    }
    const findSettingsField = (name, clear) => {
        const field = document.querySelector(`input[name="${name}"]`);
        const block = field.closest('.widget_settings_block__item_field');
        const title = block.querySelector(".widget_settings_block__title_field");
        title.classList.add("reon-mailer-settings--visually-hidden");
        field.classList.add("reon-mailer-settings--visually-hidden");
        if (clear) {
            block.classList.add("reon-mailer-settings--visually-hidden");
        }
        block.classList.remove('widget_settings_block__item_field')
        block.classList.add('reon-mailer-settings__amo-field')
        block.remove()
        return { block, field }
    }
    const checkboxTemplateParams = (field) => {
        return {
            class_name: "reon-mailer-settings__checkbox",
            input_class_name: `reon-mailer-settings__checkbox-${field.name}`,
            name: `${field.name}-checkbox-item`,
            text: "Я прочитал(-а) ",
            value: field.value,
            checked: field.value === 'true' ? true : false
        }
    }
    const renderFieldFunc = (place, block, field, text) => {
        place.insertAdjacentElement('beforeend', block)
        const checkboxTemplate = createTwigCheckbox(checkboxTemplateParams(field));
        block.insertAdjacentHTML('beforeend', checkboxTemplate)
        const checkboxText = block.querySelector('.control-checkbox__text');
        checkboxText.textContent = '';
        checkboxText.style = "display: block; font-size: 14px;";
        checkboxText.insertAdjacentHTML('beforeend', text)
        const checkbox = block.querySelector('.reon-mailer-settings__checkbox');
        checkbox.addEventListener('change', e => {
            field.value = e.target.checked;
        })
    }
    this.returnAndRemoveStandartSettingsInput = (name, hide = false) => {
        const input = document.querySelector(`[name="${name}"]`);
        const inputBody = input.closest('.widget_settings_block__item_field')
        const title = inputBody.querySelector('.widget_settings_block__title_field');
        title.classList.add('reon-mailer-settings__amo-label')
        inputBody.classList.remove('widget_settings_block__item_field')
        inputBody.classList.add('reon-mailer-settings__amo-field')
        if (hide) {
            inputBody.classList.add('reon-mailer-settings--visually-hidden')
        }
        inputBody.remove()
        return inputBody
    }
    this.createCheckbox = (place, name, text) => {
        const { block: blockByName, field: fieldByName } = findSettingsField(name)
        renderFieldFunc(place, blockByName, fieldByName, text)
    }
    this.insertFooterLinksBlock = () => {
        const settingsBlock = document.querySelector('.widget-settings__wrap-desc-space');
        settingsBlock.classList.add('reon-mailer-settings__footer--relative')
        settingsBlock.insertAdjacentHTML('beforeend',
            `
        <div class="reon-mailer-settings__footer">
            <div class="reon-mailer-settings__footer-text">
                Напишите нам и мы найдем решение вашей задачи.
            </div>
            <div class="reon-mailer-settings__footer-contacts">
                <div class="reon-mailer-settings__footer-contacts-item">
                    <a href="https://reon.pro/interface_amocrm" target="_blank" >
                        <img src="https://thumb.tildacdn.com/tild3866-3438-4139-b137-323134633338/-/resize/175x/-/format/webp/Component_4.png" alt="reon.pro">
                    </a>
                </div>
                <div class="reon-mailer-settings__footer-contacts-item">
                    <a href="mailto:reon.helpdesk@gmail.com" target="_blank">reon.helpdesk@gmail.com</a>
                </div>
                <div class="reon-mailer-settings__footer-contacts-item">
                    <a href="tel:+79381083338" target="_blank">+7(938)-108-33-38</a>
                </div>
            </div>
        </div>
        `)
    }
}