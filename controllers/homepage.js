const {
    getAllBooks,
    getAllCategories,
    getBooksBySpecCategoryId,
    getSpecCategoryNameById,
    getBooksByCategoryName
} = require('../models/books')

exports.renderHomepage = async(req, res) => {
    const books = await getAllBooks()


    const categories = await getAllCategories()
    res.render('home', { books: books, categories: categories })
}

exports.renderHomeWithFilter = async(req, res) => {
    const categories = await getAllCategories()
    const category = req.params.cname;

    if (req.params.scid) {
        const books = await getBooksBySpecCategoryId(req.params.scid)
        Promise.resolve(getSpecCategoryNameById(req.params.scid))
            .then(sc => {
                console.log(sc)
                res.render('home', { books: books, categories: categories, title: `Tất cả sách/${category}/${sc[0].name}` });
            })
    } else {
        const books = await getBooksByCategoryName(req.params.cname)
        res.render('home', { books: books, categories: categories, title: `Tất cả sách/${category}` });
    }
}


exports.renderCart = async(req, res) => {
    const books = await getAllBooks()
    const categories = await getAllCategories()

    res.render('cart', { books: books, categories: categories })

}

