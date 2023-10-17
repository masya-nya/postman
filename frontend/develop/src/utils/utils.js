export default {
    // функция которая возвращаяет размер приврепляемого файла(получает размер файла в битах, возвращает приведенный размер в Кб, Мб, Гб)
    formatSizeUnits(bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        return bytes;
    }
}