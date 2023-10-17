 const settingREON = {
    createRootContainer: () => {
        const widgetSettingsSpace = document.querySelector('.widget_settings_block__fields');
        widgetSettingsSpace.insertAdjacentHTML('afterbegin', '<div class="reon-mailer-settings-body" id="reon-mailer-settings-body"></div>');
    },
    hideSystemFields: () => {
        const amoSettingsFields = document.querySelectorAll('.widget_settings_block__item_field');
        amoSettingsFields.forEach(field => field.style.display = 'none');
    },
    createFooter : () => {
        const settingsSection = document.querySelector('.widget-settings__desc-space');
        settingsSection.style.marginBottom  = '60px';
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
                    <a href="https://reon.pro/email2" target="_blank" >
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

export default settingREON;