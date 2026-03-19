exports.index = (req, res) => {
  res.render('index', { title: 'Simple MVC App', message: 'Welcome to the simple MVC app!' });
};
