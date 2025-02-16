const checkFileType = (file, fileTypes = []) => {
    const uploadedFileType = file
    const allowedTypes = fileTypes
    
    if (allowedTypes.includes(uploadedFileType)) {
        return true
    } else {
        return false
    }
}

export default checkFileType