app.get('/blog', (req, res) => {
    const blogs = Array.from({ length: 50 }, (_, i) => ({
        title: `Blog Post ${i + 1}`,
        content: `This is the content of blog post ${i + 1}.`,
        author: `Author ${i + 1}`,
    }));

    res.render('blog', { blogs });
});
