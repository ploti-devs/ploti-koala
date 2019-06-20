module.exports = ({ brainsRouter }) => {
  brainsRouter.get('/hi', (ctx, next) => {
    ctx.body = 'Hi!';
  });
}
