import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        if (file.originalname.endsWith('.xlsx')) {
            cb(null, file.originalname.replace('.xlsx', '.csv'))

        } else if (file.originalname.endsWith('.pdf')) {
            cb(null, 'menu.pdf')
        }
        else {
            cb(null, file.originalname)
        }
    }
})

export const upload = multer({ storage: storage })