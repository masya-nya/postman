<script>
    export default {}
</script>

<style lang="scss">
@import url('./zero.scss');

* {
    font-family: Arial, Helvetica, sans-serif;
}

// ----> Переменные
$color-green: #18a058;
$shadow-green: rgba(24, 160, 88, 0.03) 0px 4px 12px;
$color-red: #d67d7d;
$color-blue: #1b94d7;
$color-blue-slight: rgba(24, 160, 88, 0.05);
$color-blue-light: rgba(24, 160, 88, 0.1);
$color-font: #2e3640;
$color-border: #ccc;
$color-font-light: rgb(151, 151, 151);
$color-font-label: #a1aaae;

$max-width-editor-body: 1070px;

// ------------>
// ----> Миксины
@mixin flex-column {
    display: flex;
    flex-direction: column;
}

@mixin not-selected {
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

// ------------>
// ----> SCSS
body {
    display: flex;
    align-items: center;
    justify-content: center;
}


.reon-mailer {
    background: #f7f7f7;
    width: 100%;

    & * {
        box-sizing: border-box;
    }

    &__wrapper {
        @include flex-column;
        min-height: 100vh;
    }

    &__content {
        flex: 1 1 auto;
        display: flex;
    }

    & .reon-mailer-pattern-page {
        width: 100%;
        display: flex;

        & .reon-mailer-pattern-sidebar {
            width: 210px;
            height: 100%;
            background: #f8f8f8;
            border-right: 1px solid $color-border;
            overflow-y: auto;

            &__title {
                height: 64px;
                border-bottom: 1px solid $color-border;
                font-size: 15px;
                display: flex;
                padding: 15px;
                justify-content: space-between;
                align-items: center;

                &--add {
                    border: 1px dashed $color-border;
                    border-radius: 5px;
                    width: 29px;
                    height: 29px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #888;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        border-color: $color-green;
                        background-color: rgba(24, 160, 88, 0.01);
                        color: $color-green;
                    }

                    &:active {
                        background-color: rgba(24, 160, 88, 0.05);
                        box-shadow: 0 0 5px 2px rgba(24, 160, 88, 0.1);
                    }
                }
            }

            & .reon-mailer-pattern-list {
                @include flex-column;
                padding: 10px;

                &__search {
                    margin: 0 0 5px 0;

                    & input {
                        width: 100%;
                        border: 1px solid $color-border;
                        border-radius: 3px;
                        padding: 7px 10px 6px 10px;
                        box-sizing: border-box;

                        &:focus {
                            border-color: $color-green;
                        }
                    }
                }

                &__body {
                    margin: 5px 0 0 0;
                    padding: 0 5px 0 0;
                    max-height: 80vh;
                    overflow: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);

                    &::-webkit-scrollbar {
                        width: 3px;
                        height: 0;
                    }

                    &::-webkit-scrollbar-track {
                        background: #eaeaea;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 3px;
                        background: #cdcdcd;
                    }

                    &>:not(:last-child) {
                        margin: 0 0 10px 0;
                    }
                }

                &__group {

                    &--name {
                        font-weight: 700;
                        color: $color-green;
                        margin: 0 0 5px 0;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }

                &__list {
                    padding: 0 0 0 10px;

                    &>:not(:last-child) {
                        margin: 0 0 3px 0;
                    }
                }

                &__item {
                    border: 1px solid $color-border;
                    color: $color-font;
                    padding: 10px;
                    border-radius: 3px;
                    overflow: hidden;
                    cursor: pointer;

                    &--active {
                        border-color: $color-green;
                        color: #000;
                    }

                    &--add {
                        text-align: center;
                        font-size: 12px;
                        font-weight: 700;
                        color: $color-font-light;
                        border: 1px dashed $color-border;
                        transition: all 0.3s ease;

                        &:hover {
                            color: $color-green;
                            border-color: $color-green;
                        }

                        &:active {
                            border-style: solid;
                        }
                    }
                }

                &__name {
                    text-overflow: ellipsis;
                    font-weight: 700;
                    overflow: hidden;
                    white-space: nowrap;
                }

                &__author {
                    font-size: 12px;
                    margin: 5px 0 0 3px;
                    color: #aaa;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }

        & .reon-mailer-pattern-editor {
            @include flex-column;
            width: 100%;
            max-width: $max-width-editor-body;

            &__label {
                font-size: 12px;
                text-transform: uppercase;
                color: #a1aaae;
                margin: 0 0 4px 5px;
                display: inline-block;
            }

            &__row {
                display: flex;
                justify-content: space-between;
                width: 100%;

                &--left {
                    flex: 0 0 44%;
                    display: flex;
                    align-items: flex-start;
                }

                &--right {
                    flex: 0 0 55%;
                    display: flex;
                    align-items: flex-start;
                }

                &--top {}

                &--bottom {
                    display: flex;
                    width: 100%;

                    &>:not(:last-child) {
                        margin: 0 3px 0 0;
                    }
                }
            }

            &__title {
                border-bottom: 1px solid $color-border;
                display: flex;
                justify-content: space-between;
                height: 64px;

                &>span {
                    line-height: 64px;
                    text-indent: 30px;
                    font-size: 15px;
                }
            }

            &__heading {
                @include flex-column;

                &>:not(:last-child) {
                    margin: 0 0 10px;
                }
            }

            &__body {
                padding: 20px 0px 5px 20px;

                &>:not(:last-child) {
                    margin: 0 0 10px;
                }
            }

            &__btns {
                display: flex;
                justify-content: space-between;
                margin: 25px 0 0 0;

                &--left {
                    &>:not(:last-child) {
                        margin: 0 15px 0 0;
                    }
                }
            }
        }
    }

    & .reon-mailer-users-page {
        width: 100%;

        &__title {
            height: 64px;
            border-bottom: 1px solid $color-border;
            font-size: 15px;
            display: flex;
            padding: 15px 15px 15px 30px;
            justify-content: space-between;
            align-items: center;
        }

        &__search {
            background: inherit;
            padding: 5px 10px 5px 0;
            font-size: 16px;
            width: 100%;
            color: #555;
        }

        &__list {
            @include flex-column;
            overflow-y: scroll;
            max-height: 90vh;
            scrollbar-width: thin;
            scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);

            &::-webkit-scrollbar {
                width: 7px;
                height: 0;
            }

            &::-webkit-scrollbar-track {
                background: #eaeaea;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 3px;
                background: #cdcdcd;
            }
        }

        & .reon-mailer-users-user {
            display: flex;
            padding: 20px 30px;
            font-size: 16px;
            border-bottom: 1px solid $color-border;

            & .reon-mailer-users-email {
                width: 100%;

                &__body {
                    display: flex;
                    align-items: center;
                    background: $color-blue-slight;
                    padding: 10px 20px 10px 10px;
                    border-radius: 3px;
                    cursor: pointer;

                    &:hover {
                        background: $color-blue-light;
                    }
                }

                &__status {
                    margin: 0 10px 0 0;
                }

                &__email {
                    margin: 0 0 4px 0;
                }

                &__servers {
                    font-size: 12px;
                    color: $color-font-light;
                }

                &__editor {
                    padding: 0px 20px 5px 20px;
                }
            }

            & .reon-mailer-users-editor {
                display: inline-flex;
                flex-direction: column;

                &__body {
                    display: flex;
                    margin: 10px 0 10px 0;

                    &>:not(:last-child) {
                        margin: 0 10px 0 0;
                    }
                }

                &__svg {
                    padding: 0 0 0 1px;
                    display: flex;
                    align-items: center;

                    &>:not(:last-child) {
                        margin: 0 5px 0 0;
                    }

                    &>* {
                        cursor: pointer;

                        &:hover {
                            transform: scale(1.05);
                        }

                        &:active {
                            transform: scale(0.95);
                        }
                    }
                }

                &__btns {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    &>:not(:last-child) {
                        margin: 0 10px 0 0;
                    }
                }

                &__message {
                    color: #d67d7d;
                    font-weight: 700;
                    font-size: 13px;
                    & a {
                        color: inherit;
                        text-decoration: underline;
                    }
                }

                &__label {
                    margin: 0 0 5px 5px;
                    display: inline-block;
                    color: $color-font-light;
                    font-weight: 700;
                }

                &__container {
                    &>:not(:last-child) {
                        margin: 0 0 5px 0;
                    }
                }

                &__top {
                    display: flex;

                    &>:not(:last-child) {
                        margin: 0 5px 0 0;
                    }
                }

                &__bottom {
                    display: flex;

                    &>:not(:last-child) {
                        margin: 0 5px 0 0;
                    }
                }

                &__smtpserv {
                    flex: 0 0 80%;
                }

                &__login {
                    flex: 0 0 60%;
                }
            }

            &__name {
                font-weight: 700;
                white-space: nowrap;
            }
            &__group-name {
                font-size: 12px;
                color: #888;
            }

            &--left {
                flex: 0 0 40%;
                @include flex-column;
                align-items: flex-start;
                margin: 0 5px 0 0;
                overflow: hidden;
            }

            &--right {
                flex: 0 0 60%;
                @include flex-column;
                align-items: flex-start;

                &>:not(:last-child) {
                    margin: 0 0 5px 0;
                }
            }

            &__add {
                margin: 7px 0 0 0;
                cursor: pointer;
                font-size: 12px;
                color: $color-font-light;
                text-decoration: underline;
            }
        }
    }

    & .reon-mailer-sidebar {
        @include flex-column;
        min-width: 200px;
        border-right: 1px solid $color-border;
        background: #f7f7f7;

        &__title {
            height: 64px;
            border-bottom: 1px solid $color-border;
            line-height: 64px;
            text-indent: 30px;
            font-size: 15px;
            font-weight: 700;
        }

        &__nav {
            @include flex-column;
        }

        &__item {
            border-bottom: 1px solid $color-border;
        }

        &__link {
            color: #2e3640;
            display: block;
            text-transform: uppercase;
            font-size: 14px;
            padding: 14px 0 14px 30px;
            text-decoration: none;
            cursor: pointer;

            &--close {
                color: $color-red;
            }

            &--active {
                font-weight: 700;
                color: $color-blue;
            }
        }
    }

    & .reon-mailer-signature-page {
        display: grid;
        width: 100%;
        grid-template-columns: 210px 1fr;

        & .reon-mailer-signature-list {
            width: 210px;
            height: 100%;
            border-right: 1px solid $color-border;

            &__title {
                display: flex;
                height: 64px;
                font-size: 15px;
                padding: 15px;
                border-bottom: 1px solid #ccc;
                justify-content: space-between;
                align-items: center;
            }
            &__search {
                background: inherit;
                font-size: 16px;
                padding: 5px 5px 5px 0;
                width: 100%;
                color: #555;
            }

            &__body {
                padding: 7px 7px 10px 10px;
                max-height: 85vh;
                margin: 3px 3px 0 0;
                overflow: auto;
                scrollbar-width: thin;
                scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);

                &::-webkit-scrollbar {
                    width: 5px;
                    height: 0;
                }

                &::-webkit-scrollbar-track {
                    background: #eaeaea;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 3px;
                    background: #cdcdcd;
                }
                &>:not(:last-child) {
                    margin: 0 0 3px 0;
                }
            }

            &__item {
                padding: 5px 5px 5px 5px;
                cursor: pointer;
                color: $color-font-light;
                border: 1px solid $color-border;
                border-radius: 3px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &--active {
                    border-color: $color-green;
                    color: $color-green;
                }
            }
        }

        & .reon-mailer-signature-editor {
            width: 100%;
            max-width: $max-width-editor-body;

            &__title {
                display: flex;
                justify-content: space-between;
                height: 64px;
                border-bottom: 1px solid #ccc;

                &>span {
                    line-height: 64px;
                    text-indent: 30px;
                    font-size: 15px;
                }
            }

            &__body {
                padding: 5px 0 5px 5px;
            }

            &__btns {
                padding: 10px 5px;

                &>:not(:last-child) {
                    margin: 0 10px 0 0;
                }
            }
        }
    }

    &__open {
        &__link {
            text-decoration: none;
            color: #111;
        }
    }
}

.reon-mailer-sender {
    & .reon-mailer-send-window {
        height: 100vh;
        overflow-y: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        &__wrapper {
            width: 1040px;
            border: 1px solid $color-border;
            border-radius: 3px;
            padding: 20px;
            background: #f7f7f7;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 45px;
        }

        &__content {
            &>:not(:last-child) {
                margin: 0 0 20px 0;
            }
        }

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__title {
            font-size: 18px;
            font-weight: 700;
            color: $color-font;
        }

        &__from-to {
            &>:not(:last-child) {
                margin: 0 0 5px 0;
            }
        }

        &__leads {
            margin: 0 0 20px 0;
        }

        &__deal-select {
            flex: 0 0 50%;
        }

        &__input-left-label {
            display: flex;
            align-items: center;
            max-width: 600px;

            &>label {
                flex: 0 0 10%;
                color: $color-font-light;
                padding: 0 0 0 5px;
            }
        }

        &__theme {
            @include flex-column;
            align-items: flex-start;
            flex: 0 0 70%;

            &-label {
                font-size: 12px;
                text-transform: uppercase;
                color: $color-font-label;
                margin: 0 0 4px 5px;
                display: inline-block;
            }
        }

        &__pattern {
            @include flex-column;
            align-items: flex-start;
            flex: 0 0 29%;

            &-label {
                font-size: 12px;
                text-transform: uppercase;
                color: $color-font-label;
                margin: 0 0 4px 5px;
                display: inline-block;
            }
        }

        &__editor-head {
            display: flex;
            justify-content: space-between;
        }

        &__files-send {
            display: flex;
            justify-content: space-between;
        }
    }
}

.reon-mailer-interpolation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & .reon-mailer-interpolation-group {
        margin: 5px 0 0 0;
        @include flex-column;

        &__title {
            font-weight: 700;
            color: $color-font;
            font-size: 15px;
        }

        &__list {
            @include flex-column;
            padding: 3px 2px;
        }

        & .reon-mailer-interpolation-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            padding: 0 3px;

            &:hover {
                background-color: #eee;
                cursor: pointer;
                border-radius: 2px;
            }

            &__name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 0 0 70%;
                line-height: 20px;
            }

            &__entity {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: $color-font-light;
            }
        }
    }

    &__title {
        padding: 3px 0 6px 0px;
        font-weight: 700;
        font-size: 16px;
    }

    &__container {
        padding: 10px;
        position: absolute;
        top: 30px;
        right: -345px;
        box-shadow: rgba(151, 151, 151, 0.3) 0px 0px 25px;
        background: #fff;
        z-index: 100;
        width: 340px;
        border: 1px solid #eee;
        border-radius: 5px;
    }

    &__body {
        margin: 0 0 5px 0;

        &>:not(:last-child) {
            margin: 0 0 5px 0;
        }
    }

    &__output {
        position: relative;
    }

    &__copy {
        position: absolute;
        top: 5px;
        right: 6px;

        & svg {
            cursor: pointer;
        }
    }

    &__list {
        @include flex-column;
        max-height: 350px;
        overflow: auto;
        margin: 5px 0;
        scrollbar-width: thin;
        scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);

        &::-webkit-scrollbar {
            width: 7px;
            height: 0;
        }

        &::-webkit-scrollbar-track {
            background: #eaeaea;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: #cdcdcd;
        }
    }

    &__btn {
        border: 1px solid #ccc;
        text-align: center;
        padding: 7px 6px 9px 6px;
        border-radius: 5px;
        cursor: pointer;
        color: #2e3640;
    }
}

//! НЕ ПЕРЕНОСИТЬ
.reon-mailer-setting {
    width: 593px;
}

.reon-mailer-settings {
    &__menu {
        &-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid $color-border
        }
        &-item {
            padding: 12px 0px;
            width: 100%;
            text-align: center;
            border-bottom: 3px solid rgba(0, 0, 0, 0);
            text-transform: uppercase;
            cursor: pointer;
            color: $color-font-light;
            &--active {
                border-color: rgb(76, 139, 247);
                color: rgb(76, 139, 247);
                font-weight: 700;
            }
        }
    }
    &__body {
        margin: 20px 0 0 0;
    }
    &__amo {
        &-label {
            font-weight: 700;
        }
        &-field {
            padding: 5px 0 10px 0;
        }
    }
    &__forward {
        padding: 10px;
        border: 1px solid #dedee0;
        color: #737373;
        font-size: 14px;
        margin-bottom: 5px;
        border-radius: 4px;

        & span {
            width: 100%;
            text-align: center;
            display: block;

            & a {
                color: #4d85e6;
            }
        }
    }
    &__price {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0 10px 0;

        &-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 10px 0 15px 0;

            &>:not(:last-child) {
                margin: 0 0 5px 0;
            }
        }

        &-item {
            width: 100%;
            border-radius: 3px;
            padding: 10px 0;
            background: #f7f7f7;
            cursor: pointer;

            &:hover:not(.reon-mailer-settings__price-item--active) {
                background: #f1f1f1;
            }

            &--active {
                background: #4d85e6;
                color: #ececec;
            }

            &-title {
                font-size: 14px;
                margin: 0 0 5px 0;
                padding: 0 10px;
            }

            &-body {
                display: flex;
                justify-content: space-between;
                padding: 0 10px;
            }
        }

        &-period {
            font-size: 17px;
        }

        &-value {
            font-size: 15px;
        }
    }
    &__footer {
        padding: 15px 0 17px 0;
        background-color: #2b3538;
        color: #ececec;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-shadow: 0 0 5px rgb(0 0 0 / 50%);
        &--relative {
            position: relative;
            padding-bottom: 120px;
        }
        &-text {
            text-align: center;
        }
        &-contacts {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;

            &-item {
                & a {
                    color: inherit;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                & img {
                    max-width: 95px;
                    margin: 6px 0 0 0;
                }
            }
        }
    }
}

.reon-mailer-flex-column {
    @include flex-column;
}

.reon-pointer-none {
    pointer-events: none;
    opacity: 0.5;
}
.reon-mailer-settings--visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    -webkit-clip-path: inset(100%);
            clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
}

.ql-editor {
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);

    &::-webkit-scrollbar {
        width: 7px;
        height: 0;
    }

    &::-webkit-scrollbar-track {
        background: #eaeaea;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #cdcdcd;
    }
}

.ql-toolbar {
    border-radius: 3px 3px 0 0;
}

.ql-container {
    border-radius: 0 0 3px 3px;

    & ol {
        margin: revert;
        padding: revert;
        font-size: revert;
        font-weight: revert;
    }
    & h1 {
        margin: revert;
        padding: revert;
        font-size: revert;
        font-weight: revert;
    }
}

button {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
}</style>
// ------------>
// ----> Animation
// ------------>