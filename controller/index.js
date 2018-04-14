/**
 * Created by lyk on 2018/4/14 0014.
 */


module.exports = {

    'GET /': async (ctx, next) => {
        await next();
        ctx.render("index.html");
    }
};
