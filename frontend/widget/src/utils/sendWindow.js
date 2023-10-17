const sendWindow = {
    createCardLocation: (widget) => {
        widget.render_template({
            body: '',
            caption: {
                class_name: 'reon-mailer-card-location__wrapper'
            },
            render: `<div class="reon-mailer-card-location__container">
                        <button class="reon-mailer-card-location__btn-open">Написать письмо</button>
                        <button class="reon-mailer-card-location__btn-settings">
                            <svg width="35" height="35" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="5" fill="#5dbc8a"></rect>
                                <path d="M21 13.25H18" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13 13.25H11" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M15 15C15.9665 15 16.75 14.2165 16.75 13.25C16.75 12.2835 15.9665 11.5 15 11.5C14.0335 11.5 13.25 12.2835 13.25 13.25C13.25 14.2165 14.0335 15 15 15Z" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M21 18.75H19" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M14 18.75H11" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M17 20.5C17.9665 20.5 18.75 19.7165 18.75 18.75C18.75 17.7835 17.9665 17 17 17C16.0335 17 15.25 17.7835 15.25 18.75C15.25 19.7165 16.0335 20.5 17 20.5Z" stroke="#fff" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>`
        }, {});
        const parentNode = document.querySelector('.reon-mailer-card-location__container').parentNode
        parentNode.style.background = 'rgb(255, 255, 255)'; //покрасить бэкграунд кнопки отправления письма в белый цвет
        parentNode.style.cursor = 'default';
        parentNode.style.margin = '0';
    }

}

export default sendWindow;