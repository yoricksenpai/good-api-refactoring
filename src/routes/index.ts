import { Request, Response, NextFunction, Express } from 'express';
import productRoutes from '../modules/products/product.route';
import authRoutes from '../modules/auth/auth.routes'
import userRoutes from '../modules/users/user.route'

const routes = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    // res.setHeader( "Access-Control-Allow-Credentials", true );
    res.removeHeader("X-Powered-By");
    next();
  });

  app.use("/product", productRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);

};

export default routes;