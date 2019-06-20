module.exports = ({ plotiRouter }) => {
  plotiRouter.get('/api/status', (ctx, next) => {
    ctx.body = 'HOLA';
  });
}
