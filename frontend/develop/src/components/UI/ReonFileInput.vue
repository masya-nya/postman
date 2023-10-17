<template>
    <div class="reon-file-input">
        <div 
            class="reon-file-input__container"
            @click="uploadFiles"
            @dragover.prevent="dragOver"
            @dragleave="dragLeave"
            @drop.prevent="drop"
        >

            <input 
                @change="onChange" 
                :multiple="multiple"
                ref="fileInput" 
                type="file" 
                class="reon-file-input__input">

            <label 
                class="reon-file-input__label reon-file-input--nodrag">
                
                <div 
                    v-if="isDragging" 
                    draggable="false"
                    class="reon-file-input--nodrag"
                >Отпустите, чтобы прикерпить файлы</div>
                <div 
                    v-else 
                    draggable="false"
                    class="reon-file-input--nodrag"
                >Перенесите файлы или нажмите для загрузки</div>
            </label>
        </div>
        <div v-if="error" class="reon-file-input__error">
            Максимальное кол-во файлов - {{ filesLimit }}.
        </div>
        <div class="reon-file-input__preview" v-if="files.length">
            <div 
                v-for="file in files" :key="file.name" 
                class="reon-file-input__preview-card">

                <div class="reon-file-input__preview-filename">
                    <span>
                        {{ file.name }}
                    </span>
                </div>
                <div class="reon-file-input__preview-filetype">
                    <span>
                        {{ fileType(file.name) }}
                    </span>
                </div>
                <div
                    class="reon-file-input__preview-remove"
                    type="button"
                    @click="remove(file.name)"
                    title="Remove file"
                >
                    <!-- Это крестик -->
                    <b>&#10006;</b> 
                </div>
                <div
                    class="reon-file-input__preview-size">
                    {{ fileSize(file.size) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils/utils.js'
export default {
    name: 'reon-file-input',
    emits: ['files'],
    props: {
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        filesLinks: {
            type: Array,
            required: false
        },
        filesLimit: {
            type: Number, 
            required: false,
            default: 20
        }
    },
    mounted() {
        this.files = this.filesLinks;
    },
    data() {
        return {
            isDragging: false,
            error: false,
            files: [],
            animationErrorTime: 1500
        }
    },
    methods: {
        fileSize(size) {
            return utils.formatSizeUnits(size)
        },
        fileType(name) {
            return name.split('.').at(-1)
        },
        errorTrigger() {
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, this.animationErrorTime)
        },
        emitFiles(files) {
            this.$emit('files', files)
        },
        onChange() {
            const newFilesList = this.files.concat([...this.$refs.fileInput.files])
            if(newFilesList.length <= this.filesLimit) {
                this.files = newFilesList;
                this.emitFiles(this.files)
            } else {
                this.errorTrigger();
            }
        },
        uploadFiles() {
            this.$refs.fileInput.click();
        },
        dragOver() {
            this.isDragging = true;
        },
        dragLeave() {
            this.isDragging = false
        },
        drop(e) {
            this.$refs.fileInput.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },
        remove(fileKey) {
            this.files = this.files.filter(file => file.name !== fileKey)
            this.emitFiles(this.files)
        }
    },
    watch: {
        'filesLinks': function() {
            this.files = this.filesLinks;
        }
    }

}
</script>

<style scoped>
.reon-file-input {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: rgb(51, 54, 57);
    max-width: 700px;
}
.reon-file-input >:not(:last-child) {
    margin: 0 0 5px 0;
}
.reon-file-input__error {
    color: tomato;
}
.reon-file-input__container {
    width: 400px;
    cursor: pointer;
    padding: 35px 10px;
    background: #f9f9f9;
    border: 1px dashed #ddd;
    margin: 0 0 5px 0;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 4px 12px;
    transition: all .3s ease;
}
.reon-file-input__container:hover {
    border-color: #18a058;
    background-color: rgba(24, 160, 88, 0.01);
}
.reon-file-input__input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}
.reon-file-input__label {
    font-size: 16px;
    display: block;
    cursor: pointer;
}
.reon-file-input__preview-card {
    position: relative;
    border: 1px solid #dfdfdf;
    padding: 5px 20px 5px 10px;
    border-radius: 5px;
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
}
.reon-file-input__preview-card:hover .reon-file-input__preview-remove {
    opacity: 1;
}
.reon-file-input__preview {
    display: flex;
    flex-wrap: wrap;
}
.reon-file-input__preview >*  {
    margin: 5px 5px 0 0;
}
.reon-file-input__preview-remove {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 4px;
    transition: all .3s ease;
}
.reon-file-input__preview-size {
    position: absolute;
    bottom: 1px;
    right: 2px;
    color: #999;
    font-size: 10px;
}
.reon-file-input__preview-remove b {
    font-size: 12px;
    color: #d67d7d;
}
.reon-file-input__preview-filename {
    overflow: hidden;
    width: 100%;
    font-size: 14px;
}
.reon-file-input__preview-filetype {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    font-size: 10px;
    line-height: 16px;
    padding: 2px;
    text-transform: uppercase;
    max-width: 100%;
    margin: 0 5px 0 0;
}
.reon-file-input__preview-filetype span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.reon-file-input__preview-filename span {
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-align: start;
}
.reon-file-input--upload-btn {
    cursor: pointer;
    pointer-events: all;
}
.reon-file-input--nodrag {
    pointer-events: none;
}
</style>